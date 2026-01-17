"use client";

import { useState, useEffect, useMemo, memo } from "react";
import Image from "next/image";
import { GoPeople } from "react-icons/go";
import { PiSuitcase } from "react-icons/pi";
import { cn } from "@/lib/utils";
import useFormStore from "@/stores/form-store";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FleetType } from "@/types/fleet.types";
import { useFleets } from "@/hooks/useFleets";
import { formatPrice } from "@/lib/utils/pricing";
import { HourlyInfoDialog } from "./hourly-info-dialog";
import { FleetFeaturesAccordion } from "./fleet-features-accordion";

function CarList() {
  const { formData, category, setFormData, changeStep, formLoading } = useFormStore();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const distance = category === 'trip' ? Number(formData.distance.value) || 0 : undefined;
  const duration = category === 'hourly' ? Number(formData.duration.value) || 0 : undefined;
  const { data: fleetsData, isLoading: fleetsLoading, error: fleetsError } = useFleets({
    distance,
    duration,
  });

  useEffect(() => {
    if (category === 'hourly') {
      setDialogOpen(true);
    }
  }, [category]);
  const fleetList: FleetType[] = (fleetsData as FleetType[] | undefined) || [];

  const handleSelect = async (item: FleetType, price: number) => {
    setFormData("car", item.name, '');
    setFormData("price", price.toString(), '');
    const isValid = await changeStep(true, 2);
    if (isValid) {
      router.push('/book-ride/passenger-details');
    }
  };

  const handleDialogConfirm = () => {
    setDialogOpen(false);
  };

  const passengerCount = Number(formData.passengers.value) || 1;
  const filteredFleets = useMemo<FleetType[]>(() => {
    return fleetList
      .filter((item: FleetType) => item.passengers >= passengerCount)
      .reverse();
  }, [fleetList, passengerCount]);

  return (
    <>
      <HourlyInfoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleDialogConfirm}
      />

      <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5">
        {fleetsLoading && (
          <div className="text-center text-gray-600 py-8">
            <Loader className="animate-spin w-6 h-6 mx-auto mb-2" />
            <p>Loading vehicles...</p>
          </div>
        )}
        {fleetsError && !fleetsLoading && (
          <div className="text-center text-red-600 py-4 px-4 rounded-lg bg-red-50 border border-red-200">
            <p className="font-medium">Failed to load vehicles</p>
            <p className="text-sm mt-1">
              {(fleetsError as any)?.message || "Please try refreshing the page or contact support if the problem persists."}
            </p>
          </div>
        )}
        {!fleetsLoading && !fleetsError && filteredFleets.length === 0 && (
          <div className="text-center text-gray-600 py-8 px-4 rounded-lg bg-gray-50 border border-gray-200">
            <p className="font-medium">No vehicles available</p>
            <p className="text-sm mt-1">
              No vehicles match your passenger count. Please adjust your selection.
            </p>
          </div>
        )}
        {filteredFleets.map((item) => {
        const price = (item as any).calculatedPrice || 0;
        const priceString = formatPrice(price);
        
        return <div
          key={item.name}
          className={cn(
            "flex flex-col bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden",
            "hover:shadow-md transition-shadow duration-200"
          )}
        >
          <div className="flex flex-col gap-1.5 sm:gap-2 p-2.5 sm:p-3 md:p-3.5">
            <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4">
              <div className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 flex justify-center items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="object-contain w-full h-auto"
                  width={140}
                  height={200}
                />
              </div>
              
              <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 flex-wrap">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 uppercase leading-tight">
                  {item.name}
                </h2>
                <p className="text-sm sm:text-sm md:text-base text-gray-600">{item.cars}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-gray-700 text-sm sm:text-sm md:text-base">
              <div className="flex items-center gap-1">
                <GoPeople size={14} className="sm:w-3.5 sm:h-3.5 text-primary-yellow" />
                <span>{item.passengers}</span>
              </div>
              <div className="flex items-center gap-1">
                <PiSuitcase size={14} className="sm:w-3.5 sm:h-3.5 text-primary-yellow" />
                <span>{item.suitcases}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900">
                  £{priceString}
                </div>
                {(item.name === "Business Class" || item.name === "First Class") && (
                  <div className="text-xs text-red-500 line-through">
                    £{(price * 1.1).toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            <FleetFeaturesAccordion fleetName={item.name} />
          </div>
          <div className="w-full border-t border-gray-200">
            {formLoading && formData.car.value === item.name ? (
              <div className={cn(
                "w-full font-semibold rounded-b-xl px-2 sm:px-2.5 md:px-3 py-3 sm:py-2 md:py-2 flex justify-center items-center gap-1.5",
                "bg-primary-yellow hover:bg-primary-yellow/90 text-heading-black font-semibold transition-all duration-200",
                "px-3 py-1.5 text-sm rounded-md"
              )}>
                <Loader className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-sm md:text-base">Loading</span>
              </div>
            ) : (
              <button
                onClick={() => handleSelect(item, price)}
                disabled={formLoading}
                aria-label={`Select ${item.name} vehicle`}
                className={cn(
                "w-full rounded-b-xl px-2 sm:px-2.5 md:px-3 py-3 sm:py-2 md:py-2 transition-all duration-200 flex justify-center items-center gap-2",
                "bg-primary-yellow hover:bg-primary-yellow/90 text-heading-black font-semibold transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              >
                <span className="text-sm sm:text-sm md:text-base">Select Vehicle</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      })}
      </div>
    </>
  );
}

export default memo(CarList);
