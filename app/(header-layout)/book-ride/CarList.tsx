"use client";

import React from "react";
import Image from "next/image";
import { GoPeople } from "react-icons/go";
import { PiSuitcase } from "react-icons/pi";
import { cn } from "@/lib/utils";
import Economy from "@/assets/vehicles/Econamy.png";
import Executive from "@/assets/vehicles/Mercedes-S-Class-cutout.png";
import ExecutivePremium from "@/assets/vehicles/Tesla Model S.png";
import LuxuryVan from "@/assets/vehicles/Mercedes-V-Class-cutout.png";
import useFormStore from "@/stores/FormStore";
import { brandColor } from "@/lib/colors";
import { ArrowRight } from "lucide-react";
import LoadingButton from "./LoadingButton";

// Fleet data
export const fleets = [
  {
    name: "Economy",
    cars: "Skoda Octavia | Toyota Prius",
    price10Miles: 58,
    price: 2.2,
    hourly: 80,
    passengers: 4,
    suitcases: 3,
    image: Economy,
  },
  {
    name: "Executive Premium",
    cars: "Tesla Model S",
    price10Miles: 70,
    price: 2.5,
    hourly: 100,
    passengers: 4,
    suitcases: 3,
    image: ExecutivePremium,
  },
  {
    name: "Premium",
    cars: "BMW 5 Series | Mercedes E-Class",
    price10Miles: 80,
    price: 2.9,
    hourly: 120,
    passengers: 4,
    suitcases: 3,
    image: Executive,
  },
  
  {
    name: "Luxury Van",
    cars: "XL Passenger Van",
    price10Miles: 100,
    price: 3,
    hourly: 160,
    passengers: 6,
    suitcases: 6,
    image: LuxuryVan,
  },
];

function CarList() {
  const { formData, category, setFormData, changeStep, formLoading } = useFormStore();

  const handleSelect = (item: (typeof fleets)[0],price:number) => {
    setFormData("car", item.name, '');
    setFormData("price", price.toString(), '');
    changeStep(true,2);
  };

  return (
    <div className="w-full flex flex-col gap-2 md:gap-4">
      {fleets.map((item) => {
        let price = '0';
        if(category==='hourly'){
           price = (Number(formData.duration.value) * item.hourly).toFixed()
        } else{
          const distance = formData.distance.value - 10;
          price = ((Number(distance) * item.price) + item.price10Miles).toFixed()
        }
        return <div
          key={item.name}
          className={cn(
            "grid max-md:grid-cols-8 grid-cols-8 gap-1 lg:gap-5 bg-white border  rounded-xl shadow-sm overflow-hidden p-2 md:p-3",
            "hover:shadow-md transition-shadow duration-200" , item.name===formData.car.value ? 'border-brand' : 'border-gray-200'
          )}
        >
          {/* Image Section */}
          <div className=" bg-white flex justify-center items-center w-full col-span-2">
            <Image
              src={item.image}
              alt={item.name}
              className="object-contain w-full"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center gap-1 col-span-4 w-full">
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
            <div className="flex items-start gap-1 md:gap-3 w-full">
              <div className="text-xl md:text-3xl font-bold text-gray-900">
                £{price}
              </div>
              <div className="text-[10px] lg:text-sm text-red-500 line-through">
                £{(Number(price)+(Number(price)/10)).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Price and Action Section */}
          <div className="flex justify-center items-end w-full col-span-2">
            {formLoading && formData.car.value===item.name ? <LoadingButton/>  :
            <button
              onClick={() => handleSelect(item,Number(price))}
              className={`bg-brand hover:bg-[#ffb300] text-black rounded-md p-1 md:px-4 md:py-2 transition-all max-md:text-base w-fit flex justify-center items-center gap-1 `}
            >
              <span>Select</span> <span className="max-md:hidden">Vehicle</span>
              <ArrowRight className="max-lg:hidden text-2xl" size={20}/>
              <ArrowRight className="lg:hidden" size={15}/>
            </button>}
          </div>
        </div>
      })}
       <div onClick={()=>{changeStep(false,2);}} className='p-2 rounded-lg border border-gray-500 w-full text-center text-gray-700 font-semibold cursor-pointer'>
                    Back 
         </div>
    </div>
  );
}

export default CarList;
