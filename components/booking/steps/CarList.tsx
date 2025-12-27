"use client";

import React from "react";
import Image from "next/image";
import { GoPeople } from "react-icons/go";
import { PiSuitcase } from "react-icons/pi";
import { cn } from "@/lib/utils";
import useFormStore from "@/stores/FormStore";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { fleets } from "./fleets-data";

function CarList() {
  const { formData, category, setFormData, changeStep, formLoading } = useFormStore();
  const router = useRouter();

  const handleSelect = async (item: (typeof fleets)[0], price: number) => {
    setFormData("car", item.name, '');
    setFormData("price", price.toString(), '');
    const isValid = await changeStep(true, 2);
    if (isValid) {
      router.push('/book-ride/passenger-details');
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5">
      {fleets.map((item) => {
        let price = '0';
        if (category === 'hourly') {
          price = (Number(formData.duration.value) * item.hourly).toFixed()
        } else {
          const distance = formData.distance.value - 10;
          price = ((Number(distance) * item.price) + item.price10Miles).toFixed()
        }
        return <div
          key={item.name}
          className={cn(
            "flex flex-col bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden",
            "hover:shadow-md transition-shadow duration-200"
          )}
        >
          {/* Content Section */}
          <div className="flex flex-col gap-1.5 sm:gap-2 p-2.5 sm:p-3 md:p-3.5">
            {/* Row 1: Image, Title and Car Description */}
            <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4">
              {/* Image Section */}
              <div className="flex-shrink-0 w-16 sm:w-20 md:w-24 flex justify-center items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="object-contain w-full h-auto max-h-16 sm:max-h-20"
                  width={140}
                  height={100}
                />
              </div>
              
              {/* Title and Description */}
              <div className="flex flex-col items-start justify-center gap-0.5 flex-1 min-w-0 flex-wrap">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 uppercase leading-tight">
                  {item.name}
                </h2>
                <p className="text-sm sm:text-sm md:text-base text-gray-600">{item.cars}</p>
              </div>
            </div>

            {/* Row 2: Capacity Icons and Price */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-gray-700 text-sm sm:text-sm md:text-base">
              <div className="flex items-center gap-1">
                <GoPeople size={14} className="sm:w-3.5 sm:h-3.5" style={{ color: '#FFB400' }} />
                <span>{item.passengers}</span>
              </div>
              <div className="flex items-center gap-1">
                <PiSuitcase size={14} className="sm:w-3.5 sm:h-3.5" style={{ color: '#FFB400' }} />
                <span>{item.suitcases}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
                <div className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                  £{price}
                </div>
                <div className="text-xs text-red-500 line-through">
                  £{(Number(price) + (Number(price) / 10)).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t border-gray-200">
            {formLoading && formData.car.value === item.name ? (
              <div className="w-full bg-brand text-black font-semibold rounded-b-xl px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 flex justify-center items-center gap-1.5">
                <Loader className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-sm md:text-base">Loading</span>
              </div>
            ) : (
              <button
                onClick={() => handleSelect(item, Number(price))}
                className="w-full bg-brand hover:bg-primary-yellow/90 text-black font-semibold rounded-b-xl px-2 sm:px-2.5 md:px-3 py-3 sm:py-2 md:py-2 transition-all duration-200 flex justify-center items-center"
              >
                <span className="text-sm sm:text-sm md:text-base">Select Vehicle</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
        </div>
      })}
    </div>
  );
}

export default CarList;
