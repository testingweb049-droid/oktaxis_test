"use client";

import { useState, useEffect, useMemo, memo } from "react";
import useFormStore from "@/stores/form-store";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FleetWithPrice } from "@/hooks/api/useFleetsWithPrices";
import { useFleetsWithPrices } from "@/hooks/api/useFleetsWithPrices";
import { HourlyInfoDialog } from "./hourly-info-dialog";
import { VehicleCard } from "./vehicle-card";
import { VehicleCardSkeleton } from "./vehicle-card-skeleton";
import { Button } from "@/components/ui/button";

function Step2CarSelection() {
  const { formData, category, selectedFleet, setSelectedVehicle, changeStep, formLoading } = useFormStore();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const distance = category === 'trip' ? Number(formData.distance.value) || 0 : undefined;
  const duration = category === 'hourly' ? Number(formData.duration.value) || 0 : undefined;
  

  const { data: fleetList, isLoading: isLoading, error: fleetsError } = useFleetsWithPrices({
    distance,
    duration,
    date: formData.date?.value,
    time: formData.time?.value,
    category,
    isActive: true,
    limit: 100,
  });
  console.log(fleetList);

  const handleSelect = async (item: FleetWithPrice, price: number) => {
    setSelectedVehicle(item, price);
    try {
      const isValid = await changeStep(true, 2);
      if (isValid) {
        router.push('/book-ride/passenger-details');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleCardClick = (item: FleetWithPrice, price: number) => {
    setSelectedVehicle(item, price);
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
  const filteredFleets = useMemo<FleetWithPrice[]>(() => {
    return fleetList || []
      .filter((item: FleetWithPrice) => item.passengers >= passengerCount)
      .reverse();
  }, [fleetList, passengerCount]);

  useEffect(() => {
    if (!isLoading && filteredFleets.length > 0 && !selectedFleet) {
      const firstVehicle = filteredFleets[0];
      const firstPrice = firstVehicle.pricingBreakdown?.finalPrice || firstVehicle.calculatedPrice || 0;
      setSelectedVehicle(firstVehicle, firstPrice);
    }
  }, [isLoading, filteredFleets, selectedFleet, setSelectedVehicle]);

  return (
    <>
      <HourlyInfoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleDialogConfirm}
      />

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
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <VehicleCardSkeleton key={`skeleton-${index}`} />
            ))}
          </>
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
          const finalPrice = item.pricingBreakdown?.finalPrice || item.calculatedPrice || 0;
          const pricingBreakdown = item.pricingBreakdown;
          const selectedCarName = selectedFleet?.name || '';
          const isVehicleLoading = formLoading && selectedFleet?.name === item.name;
          
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
