import React from "react";
import useCustomForm from "@/hooks/useFormContext";
import Image from "next/image";
import { GoPeople } from "react-icons/go";
import { PiSuitcase } from "react-icons/pi";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Executive from "@/assets/vehicles/Mercedes-S-Class-cutout.png";
import Economy from "@/assets/vehicles/Econamy.png";
import ExecutivePremium from "@/assets/vehicles/Tesla Model S.png";
import LuxuryVan from "@/assets/vehicles/Mercedes-V-Class-cutout.png";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const fleetFeatures = [
  "30 mins free waiting",
  "Licensed, courteous drivers",
  "24/7 customer support",
  "Door-to-door transfer",
];

export const fleets = [
  {
    name: "Economy",
    cars: "Skoda Octavia | Toyota Prius",
    price: 1.2,
    minimumFare: 52,
    image: Economy,
    bags: 3,
    persons: 4,
    specailRequest: false,
    hourly: 1,
    stop: 10,
  },
  {
    name: "Executive",
    cars: "BMW 5 Series | Mercedes E-Class",
    price: 1.3,
    minimumFare: 62,
    image: Executive,
    bags: 3,
    persons: 4,
    specailRequest: false,
    hourly: 120,
    stop: 10,
  },
  {
    name: "Executive Premium",
    cars: "Tesla Model S",
    price: 2.0,
    minimumFare: 87,
    image: ExecutivePremium,
    bags: 3,
    persons: 4,
    specailRequest: false,
    hourly: 150,
    stop: 10,
  },
  {
    name: "Luxury Van",
    cars: "XL Passenger Van",
    price: 2.0,
    minimumFare: 95,
    image: LuxuryVan,
    bags: 6,
    persons: 6,
    specailRequest: false,
    hourly: 180,
    stop: 15,
  },
];

const discounts = {
  "Economy": 3,
  "Executive": 5,
  "Executive Premium": 5,
  "Luxury Van": 7,
};
// carlist
function CarList() {
  const {
    category,
    form: { getValues, setValue },
    NextStep,
  } = useCustomForm();

  const distance = Number(getValues("distance") ?? 0);
  const hours = Number(getValues("duration") ?? 0);

  return (

    <div className="w-full flex flex-col gap-6">


     {fleets.map((item) => {
          let price = 0;

          if (category === "hourly") {
            price = Number((hours * item.hourly).toFixed(2));
          } else if (category === "trips") {
            if (item.name === "Economy") {
              price = distance <= 43 ? 52 : 52 + (distance - 43) * 1.2;
            } else if (item.name === "Executive") {
              price = distance <= 47 ? 62 : 62 + (distance - 47) * 1.3;
            } else if (item.name === "Executive Premium") {
              price = distance <= 44 ? 87 : 87 + (distance - 44) * 2.0;
            } else if (item.name === "Luxury Van") {
              price = distance <= 47 ? 95 : 95 + (distance - 47) * 2.0;
            }
          }

          price = Number(price.toFixed(2));

          const discountPercent =
            category === "trips" && item.name in discounts
              ? discounts[item.name as keyof typeof discounts]
              : 0;


          const returnPrice =
            category === "trips"
              ? Number((price * 2 - ((price * 2 * discountPercent) / 100)).toFixed(2))
              : 0;

          return (

            <div
              key={item.name}
              className={cn(
                "w-full bg-white rounded-xl  shadow-md flex flex-col md:flex-row overflow-hidden",
                item.name === getValues("car") ? "ring-2 ring-black" : ""
              )}
            >


              <div className="flex flex-col gap-3 w-full">
                <div className="px-5 mt-3 hidden md:block py-1 text-black font-medium">
                  <p className="text-[#121212] font-bold text-xl">{item.cars}</p>

                  <div className="flex mt-2 w-full gap-8 items-center text-[#121212] text-sm font-medium ">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <Image
                        src="/icon-1.png"
                        alt="adults"
                        width={18}
                        height={18}
                        className="object-contain"
                      />
                      <span className="leading-none"> {item.persons} adults </span>
                    </div>

                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <Image
                        src="/icon-2.png"
                        alt="suitcases"
                        width={18}
                        height={18}
                        className="object-contain"
                      />
                      <span className="leading-none"> {item.bags} suitcases </span>
                    </div>

                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <Image
                        src="/icon-3.png"
                        alt="carry bags"
                        width={18}
                        height={18}
                        className="object-contain"
                      />
                      <span className="leading-none"> 2 carry bags </span>
                    </div>

                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <Image
                        src="/icon-4.png"
                        alt="wifi"
                        width={18}
                        height={18}
                        className="object-contain"
                      />
                      <span className="leading-none"> WiFi </span>
                    </div>
                  </div>

                </div>

                <div className="flex  md:flex-row items-center justify-between w-full px-2 pt-4  gap-5">
                  {/* LEFT: Car Image */}
                  <div className="flex w-35 justify-center bg-white">

                    <Image
                      src={item.image}
                      alt={item.cars}
                      className="object-contain w-40 h-16 md:w-[400px] md:h-[240px]"
                    />

                  </div>

                  {/* RIGHT: Title + Features */}
                  <div className=" block md:hidden">
                    <p className="text-[#121212] font-bold text-lg md:text-xl mb-2">
                      {item.cars}
                    </p>

                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-[#121212] text-sm font-medium">
                      <div className="flex items-center gap-1">
                        <Image src="/icon-1.png" alt="adults" width={16} height={16} />
                        <span>{item.persons} adults</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Image src="/icon-2.png" alt="suitcases" width={16} height={16} />
                        <span>{item.bags} suitcases</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Image src="/icon-3.png" alt="carry bags" width={16} height={16} />
                        <span>2 carry bags</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Image src="/icon-4.png" alt="wifi" width={16} height={16} />
                        <span>WiFi</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>


              <div className="px-5 py-2 md:py-3 w-full flex flex-col gap-1 md:gap-3 md:col-span-2">
                {/* <p className="text-2xl font-semibold">{item.name}</p>
                <p className="text-gray-700 text-lg">{item.cars} or similar</p> */}

                <div className="hidden md:flex flex-col gap-2 mt-32">

                  <div className="space-y-3">
                    {fleetFeatures.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
                          <IoCheckmarkDoneCircleOutline className="w-4 h-4 text-black" />
                        </div>
                        <span className="text-gray-700 font-medium text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full px-4 py-3 md:py-3 flex flex-col p-6 justify-center gap-5 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200">
                {!item.specailRequest ? (
                  <div className="flex flex-row  justify-between nowhitespace  md:flex-col md:gap-4 ">
                    <div className="flex flex-col gap-1 w-full">
                      {category === "trips" && (
                        <p className="text-center font-bold">One Way</p>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setValue("is_return", false);
                          setValue("car", item.cars);
                          setValue("price", price);
                          NextStep();
                        }}
                        className="w-full md:w-full bg-black text-white px-4 py-3 rounded-xl text-center font-bold cursor-pointer"
                      >
                        £ {price}
                      </button>
                    </div>


                    {category === "trips" && (
                      <div className="flex flex-col gap-1">
                        <p className="text-center font-bold">Return Way</p>
                        <button
                          type="button"
                          onClick={() => {
                            setValue("is_return", true);
                            setValue("car", item.cars);
                            setValue("price", returnPrice);
                            NextStep();
                          }}
                          className="relative  w-full bg-black text-white px-4 py-3 rounded-xl text-center font-bold cursor-pointer"
                        >
                          £ {returnPrice}
                          {discountPercent > 0 && (
                            <span className="absolute top-1 right-1 sm:top-1 sm:right-1 px-1.5  text-[7px] sm:text-xs sm:px-2 sm:py-1 bg-brand rounded-lg text-white font-semibold z-10">
                              {discountPercent}% off
                            </span>


                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/contact"
                    className="w-full bg-black text-white px-4 py-2 rounded-xl text-center font-bold"
                  >
                    Request
                  </Link>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default CarList;
