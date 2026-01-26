"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GoPeople } from "react-icons/go";
import { PiSuitcase } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader } from "lucide-react";
import type { FleetType } from "@/types/fleet.types";
import { FleetFeaturesAccordion } from "./fleet-features-accordion";

interface VehicleCardProps {
  item: FleetType;
  finalPrice: number;
  pricingBreakdown?: FleetType["pricingBreakdown"];
  formLoading: boolean;
  selectedCarName: string;
  onSelect: (item: FleetType, price: number) => void;
  onCardClick?: (item: FleetType, price: number) => void;
}

export function VehicleCard({
  item,
  finalPrice,
  pricingBreakdown,
  formLoading,
  selectedCarName,
  onSelect,
  onCardClick,
}: VehicleCardProps) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  
  const showDiscount = pricingBreakdown?.displayDiscount && pricingBreakdown.displayDiscount > 0;
  const originalPrice = item.totalCalculatedPrice || pricingBreakdown?.originalPrice || finalPrice;
  const isSelected = selectedCarName === item.name;
  // Show loader when button is clicked OR when formLoading is true AND vehicle is selected
  const isLoading = isButtonLoading || (formLoading && isSelected);

  // Reset button loading state when formLoading completes or vehicle is no longer selected
  useEffect(() => {
    if (!formLoading || !isSelected) {
      setIsButtonLoading(false);
    }
  }, [formLoading, isSelected]);

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(item, finalPrice);
    }
  };

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsButtonLoading(true);
    onSelect(item, finalPrice);
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "flex flex-col bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden",
        "hover:shadow-md transition-shadow duration-200",
        "cursor-pointer"
      )}
    >
      <div className="flex flex-col px-2.5 sm:px-3 md:px-3.5 py-3">
        <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4">
          {/* Car Image - Left */}
          <div className="flex-shrink-0 w-28 sm:w-36 md:w-40 lg:w-48 flex justify-center items-center">
            <Image
              src={item.image}
              alt={item.name}
              className="object-contain w-full h-auto"
              width={120}
              height={150}
            />
          </div>
          {/* Vehicle Details - Middle */}
          <div className="flex flex-col items-start justify-center gap-1.5 flex-1 min-w-0">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 uppercase leading-tight">
              {item.name}
            </h2>
            
            {/* Capacity Information */}
            <div className="flex items-center gap-1 sm:gap-2 text-gray-700 text-sm sm:text-sm md:text-base">
            <span className="text-gray-500">Up to</span>
              <div className="flex items-center gap-1.5">
                <GoPeople size={16} className="sm:w-4 sm:h-4 text-gray-600" />
                <span>{item.passengers}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PiSuitcase size={16} className="sm:w-4 sm:h-4 text-gray-600" />
                <span>{item.suitcases}</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm md:text-sm text-gray-600">{item.cars}</p>
          </div>
          {/* Price Information - Right */}
          <div className="flex flex-col items-end justify-center gap-0.5 flex-shrink-0">
            <div className="flex flex-col items-end gap-0.5">
              {showDiscount && (
                <div className="text-xs sm:text-sm text-red-500 line-through">
                  £{originalPrice.toFixed(2)}
                </div>
              )}
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900">
                £{finalPrice.toFixed(2)}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Total price</p>
          </div>
        </div>
        <FleetFeaturesAccordion fleetName={item.name} />
      </div>
      <div className="w-full border-t border-gray-200">
        {isLoading ? (
          <div className={cn(
            "w-full font-semibold px-2 sm:px-2.5 md:px-3 py-2 sm:py-2 md:py-2 flex justify-center items-center gap-1.5",
            "bg-primary-yellow hover:bg-primary-yellow/90 text-heading-black font-semibold transition-all duration-200"
          )}>
            <Loader className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-sm sm:text-sm md:text-base">Loading</span>
          </div>
        ) : (
          <button
            onClick={handleSelect}
            disabled={isLoading || formLoading}
            aria-label={`Select ${item.name} vehicle`}
            className={cn(
              "w-full px-2 sm:px-2.5 md:px-3 py-2 sm:py-2 md:py-2 transition-all duration-200 flex justify-center items-center gap-2",
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
  );
}

