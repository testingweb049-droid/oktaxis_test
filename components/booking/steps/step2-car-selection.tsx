"use client";

import { useState, useEffect, useMemo, memo } from "react";
import useFormStore from "@/stores/form-store";
import { Loader, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FleetType } from "@/types/fleet.types";
import { useFleets } from "@/hooks/useFleets";
import { HourlyInfoDialog } from "./hourly-info-dialog";
import { VehicleCard } from "./vehicle-card";
import { Button } from "@/components/ui/button";

function Step2CarSelection() {
  const { formData, category, setFormData, changeStep, formLoading, cachedFleets, isCacheValid } = useFormStore();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectingVehicle, setSelectingVehicle] = useState<string | null>(null);
  const distance = category === 'trip' ? Number(formData.distance.value) || 0 : undefined;
  const duration = category === 'hourly' ? Number(formData.duration.value) || 0 : undefined;
  const shouldFetchFromAPI = !cachedFleets || !isCacheValid();
  const { data: fleetsData, isLoading: fleetsLoading, error: fleetsError } = useFleets({
    distance,
    duration,
    date: formData.date?.value,
    time: formData.time?.value,
    category,
  }, {
    enabled: shouldFetchFromAPI,
  });
  const fleetList: FleetType[] = (cachedFleets && isCacheValid()) 
    ? cachedFleets 
    : ((fleetsData as FleetType[] | undefined) || []);
  
  const isLoading = shouldFetchFromAPI && fleetsLoading;

  const handleSelect = async (item: FleetType, price: number) => {
    setSelectingVehicle(item.name);
    setFormData("car", item.name, '');
    setFormData("price", price.toString(), '');
    try {
      const isValid = await changeStep(true, 2);
      if (isValid) {
        router.push('/book-ride/passenger-details');
      } else {
        setSelectingVehicle(null);
      }
    } catch (error) {
      setSelectingVehicle(null);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleCardClick = (item: FleetType, price: number) => {
    setFormData("car", item.name, '');
    setFormData("price", price.toString(), '');
  };

  useEffect(() => {
    if (category === 'hourly') {
      setDialogOpen(true);
    }
  }, [category]);

  const handleDialogConfirm = () => {
    setDialogOpen(false);
  };

  const passengerCount = Number(formData.passengers.value) || 1;
  const filteredFleets = useMemo<FleetType[]>(() => {
    return fleetList
      .filter((item: FleetType) => item.passengers >= passengerCount)
      .reverse();
  }, [fleetList, passengerCount]);

  useEffect(() => {
    if (!isLoading && filteredFleets.length > 0 && !formData.car.value) {
      const firstVehicle = filteredFleets[0];
      const firstPrice = firstVehicle.calculatedPrice || 0;
      setFormData("car", firstVehicle.name, '');
      setFormData("price", firstPrice.toString(), '');
    }
  }, [isLoading, filteredFleets, formData.car.value, setFormData]);

  return (
    <>
      <HourlyInfoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleDialogConfirm}
      />

      {/* Back Button */}
      <div className="mb-4 sm:mb-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToHome}
          className="flex items-center gap-2 text-text-gray hover:text-heading-black"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back to Home</span>
        </Button>
      </div>

      <div className="w-full flex flex-col gap-5 sm:gap-4 md:gap-5">
        {isLoading && (
          <div className="text-center text-gray-600 py-8">
            <Loader className="animate-spin w-6 h-6 mx-auto mb-2" />
            <p>Loading vehicles...</p>
          </div>
        )}
        {fleetsError && !isLoading && (
          <div className="text-center text-red-600 py-4 px-4 rounded-lg bg-red-50 border border-red-200">
            <p className="font-medium">Failed to load vehicles</p>
            <p className="text-sm mt-1">
              {(fleetsError as any)?.message || "Please try refreshing the page or contact support if the problem persists."}
            </p>
          </div>
        )}
        {!isLoading && !fleetsError && filteredFleets.length === 0 && (
          <div className="text-center text-gray-600 py-8 px-4 rounded-lg bg-gray-50 border border-gray-200">
            <p className="font-medium">No vehicles available</p>
            <p className="text-sm mt-1">
              No vehicles match your passenger count. Please adjust your selection.
            </p>
          </div>
        )}
        {filteredFleets.map((item) => {
          const finalPrice = item.calculatedPrice || 0;
          const pricingBreakdown = item.pricingBreakdown;
          // Show loader if this vehicle is being selected (immediate feedback)
          const isVehicleLoading = selectingVehicle === item.name || (formLoading && formData.car.value === item.name);
          // Use selectingVehicle name if set, otherwise use formData.car.value to ensure immediate selection state
          const selectedCarName = selectingVehicle === item.name ? item.name : formData.car.value;
          
          return (
            <VehicleCard
              key={item.name}
              item={item}
              finalPrice={finalPrice}
              pricingBreakdown={pricingBreakdown}
              formLoading={isVehicleLoading}
              selectedCarName={selectedCarName}
              onSelect={handleSelect}
              onCardClick={handleCardClick}
            />
          );
        })}
      </div>
    </>
  );
}

export default memo(Step2CarSelection);
