"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoPeople } from "react-icons/go";
import { PiSuitcase } from "react-icons/pi";
import { cn } from "@/lib/utils";
import Economy from "@/assets/vehicles/Econamy.png";
import Executive from "@/assets/vehicles/Mercedes-S-Class-cutout.png";
import ExecutivePremium from "@/assets/vehicles/Tesla Model S.png";
import LuxuryVan from "@/assets/vehicles/Mercedes-V-Class-cutout.png";
import useFormStore from "@/stores/FormStore";
import { brandColor } from "@/lib/colors";

// Fleet data
export const fleets = [
  {
    name: "Economy",
    cars: "Skoda Octavia | Toyota Prius",
    price: 58.51,
    hourly: 60.51,
    passengers: 4,
    suitcases: 3,
    image: Economy,
  },
  {
    name: "Premium",
    cars: "BMW 5 Series | Mercedes E-Class",
    price: 62.98,
    hourly: 60.51,
    passengers: 4,
    suitcases: 3,
    image: Executive,
  },
  {
    name: "Executive Premium",
    cars: "Tesla Model S",
    price: 87.0,
    hourly: 60.51,
    passengers: 4,
    suitcases: 3,
    image: ExecutivePremium,
  },
  {
    name: "Luxury Van",
    cars: "XL Passenger Van",
    price: 95.0,
    hourly: 60.51,
    passengers: 6,
    suitcases: 6,
    image: LuxuryVan,
  },
];

function CarList() {
  const { formData, category, setFormData, changeStep,  } = useFormStore();

  const handleSelect = (item: (typeof fleets)[0],price:number) => {
    setFormData("car", item.name, '');
    setFormData("price", price.toString(), '');
    changeStep(true);
  };

  return (
    <div className="w-full flex flex-col gap-2 md:gap-4">
      {fleets.map((item) => {
        let price = 0;
        if(category==='hourly'){
           price = Number(formData.duration.value) * item.hourly
        } else{
          price = Number(formData.distance.value) * item.price
        }
        return <div
          key={item.name}
          className={cn(
            "grid max-md:grid-cols-6 grid-cols-4 gap-1 lg:gap-5 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-2 md:p-3",
            "hover:shadow-md transition-shadow duration-200"
          )}
        >
          {/* Image Section */}
          <div className=" bg-white flex justify-center items-center w-full max-md:col-span-2">
            <Image
              src={item.image}
              alt={item.name}
              className="object-contain w-full"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center gap-1 col-span-2 max-md:col-span-3 w-full">
            <h2 className="text-base max-md:leading-4 md:text-xl font-semibold text-gray-900 uppercase">
              {item.name}
            </h2>
            <p className="text-gray-600 text-[12px] ">{item.cars}</p>

            <div className="flex items-center gap-3 md:gap-5  text-gray-700 text-sm">
              <div className="flex items-center gap-1">
                <GoPeople size={14} color={brandColor} />
                <span>{item.passengers} </span>
              </div>
              <div className="flex items-center gap-1">
                <PiSuitcase size={14} color={brandColor} />
                <span>{item.suitcases} <span className="max-md:hidden">Suitcases</span></span>
              </div>
            </div>
            <div className="flex  items-center gap-1 md:gap-3 w-full">
              <div className="text-xl md:text-3xl font-bold text-gray-900">
                £{price.toFixed(2)}
              </div>
              <div className="text-sm text-red-500 line-through">
                £{(price+(price/10)).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Price and Action Section */}
          <div className="flex justify-center items-end w-full">
            
            <button
              onClick={() => handleSelect(item,price)}
              className={`bg-brand hover:bg-[#ffb300] text-black rounded-md p-1 md:px-4 md:py-2 transition-all max-md:text-sm w-full`}
            >
              Select <span className="max-md:hidden">Vehicle</span>
            </button>
          </div>
        </div>
      })}
       <div onClick={()=>{changeStep(false);}} className='p-2 rounded-lg border border-gray-500 w-full text-center text-gray-700 font-semibold cursor-pointer'>
                    Back 
         </div>
    </div>
  );
}

export default CarList;
