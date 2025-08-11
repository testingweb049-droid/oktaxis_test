import React from "react";
import { Car, Briefcase, ChartBarStacked, RockingChair   } from "lucide-react";

interface StepTwoSummaryProps {
  selectedVehicle: string | null;
  seats: number | null;
  bags: number | null;
  category: string | null;
  totalPrice: number | null; 
}

const StepTwoSummary = ({
  selectedVehicle,
  seats,
  bags,
  category,
  totalPrice,
}: StepTwoSummaryProps) => {
  return (
    <div className="w-[320px] lg:w-full bg-white shadow-lg rounded-lg px-6 py-2 text-gray-800 space-y-2">
      <h2 className="text-[16px] font-bold mb-3 border-b pb-1">Vehicle Info Summary</h2>

      <div className="flex items-center gap-2">
        <Car className="text-gray-500 w-4 h-4" />
        <p className="font-semibold text-base">Selected Vehicle:</p>
        <span className="text-base">{selectedVehicle || "No Vehicle Selected"}</span>
      </div>

      <div className="flex items-center gap-2">
        <RockingChair className="text-blue-500 w-4 h-4" />
        <p className="font-semibold text-base">Seats:</p>
        <span className="text-base">{seats !== null ? seats : "Not Specified"}</span>
      </div>

      <div className="flex items-center gap-2">
        <Briefcase className="text-gray-500 w-4 h-4" />
        <p className="font-semibold text-base">Bags:</p>
        <span className="text-base">{bags !== null ? bags : "Not Specified"}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <ChartBarStacked className="text-brand w-4 h-4" />
        <p className="font-semibold text-base">Category:</p>
        <span className="text-base">{category !== null ? category : "Not Specified"}</span>
      </div>
      <div className="flex items-center gap-2">
        <ChartBarStacked className="text-brand w-4 h-4" />
        <p className="font-semibold text-base">Total Price:</p>
        <span className="text-base">{totalPrice !== null ? `£${totalPrice}` : "N/A"}</span>
      </div>
    </div>
  );
};

export default StepTwoSummary;
