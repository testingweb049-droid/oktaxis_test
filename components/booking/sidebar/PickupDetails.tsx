"use client";

import { brandColor } from "@/lib/colors";
import useFormStore from "@/stores/FormStore";
import { ArrowRight, Calendar, Clock, Users, ShoppingBag, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function PickupTripDetails() {
  const { formData, category } = useFormStore();
  const { fromLocation, toLocation, stops, duration, date, time, passengers, bags, distance } = formData
  
  const locations = [
    fromLocation,
    ...stops,
  ].filter(Boolean);

  if(category==='hourly'){
    locations.push({...duration, value:duration.value + " Hours"})
  } else {
    locations.push(toLocation)
  }

  // Format date
  const formattedDate = date?.value ? format(new Date(date.value), "dd MMM yyyy") : null;
  
  // Format time (HH:mm to 12h format)
  const formatTime = (timeStr: string) => {
    if (!timeStr) return null;
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };
  const formattedTime = time?.value ? formatTime(time.value) : null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 max-w-md">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="p-2 rounded-md"
          style={{ backgroundColor: brandColor }}
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
          const color = isLast ? brandColor : "black";

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

      {/* Passengers and Bags - After distance */}
      {(passengers?.value || bags?.value) && (
        <div className="space-y-2 mt-4">
          {passengers?.value && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700 font-medium">
                {passengers.value} {passengers.value === "1" ? "Passenger" : "Passengers"}
              </span>
            </div>
          )}
          {bags?.value && (
            <div className="flex items-center gap-2 text-sm">
              <ShoppingBag className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700 font-medium">
                {bags.value} {bags.value === "1" ? "Bag" : "Bags"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
