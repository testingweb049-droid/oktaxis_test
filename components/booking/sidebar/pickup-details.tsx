"use client";

import useFormStore from "@/stores/form-store";
import { ArrowRight } from "lucide-react";

const PRIMARY_COLOR = "#FFB400"; // Approved color: --color-primary

function pickupTripDetails() {
  const { formData, category } = useFormStore();
  const { fromLocation, toLocation, stops, duration } = formData
  
  const locations = [
    fromLocation,
    ...stops,
  ].filter(Boolean);

  if(category==='hourly'){
    locations.push({...duration, value:duration.value + " Hours"})
  } else {
    locations.push(toLocation)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 max-w-md">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="p-2 rounded-md bg-primary-yellow"
        >
          <ArrowRight className="text-black w-4 h-4" />
        </div>
        <h2 className="font-semibold text-lg text-gray-900">
          Pickup {category === 'trip' ? 'Trip' : 'Hourly'} Details
        </h2>
      </div>

      <hr className="mb-4" />

      {/* Location List - First */}
      <div className="flex flex-col ">
        {locations.map((loc, index) => {
          const isFirst = index === 0;
          const isLast = index === locations.length - 1;
          const isStop = !isFirst && !isLast;
          const color = isLast ? PRIMARY_COLOR : "#1A1A1A"; // heading-black

          return (
            <div key={index} className="flex gap-3 items-start relative">
           
              <div className="flex flex-col items-center mt-1">
                <div
                  className="w-5 h-5 rounded-full border-4"
                  style={{
                    borderColor: color,
                    backgroundColor: "white",
                  }}
                />
                {!isLast && <div className={`w-0.5 bg-gray-400 ${loc?.value.length>105 ? 'h-16' : loc?.value.length>70 ? 'h-12' : loc?.value.length>35 ? 'h-8' : 'h-4'}`} />}
              </div>

             
              <div>
                <h3 className="font-semibold text-gray-900">
                  {loc?.value || "N/A"}
                </h3>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const PickupTripDetails = pickupTripDetails;
export default PickupTripDetails;
