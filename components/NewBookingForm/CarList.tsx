import React from "react";
import useCustomForm from "@/hooks/useFormContext";
import Image from "next/image";
import { GoPeople } from "react-icons/go";
import { PiSuitcase } from "react-icons/pi";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Executive from "@/assets/vehicles/Executive.png";
import Economy from "@/assets/vehicles/Economy.png";
import ExecutivePremium from "@/assets/vehicles/ExecutivePremium.png";
import LuxuryVan from "@/assets/vehicles/luxuryVan.png";
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
    cars: "BMW 5 Series | MERC E Class",
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

function CarList() {
  const {
    category,
    form: { getValues, setValue },
    NextStep,
  } = useCustomForm();

  const distance = Number(getValues("distance") ?? 0);
  const hours = Number(getValues("duration") ?? 0);

  return (
    <div className="w-full flex flex-col gap-5">
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
              "w-full rounded-xl border border-black/50 grid md:grid-cols-4 divide-y md:divide-x",
              item.name === getValues("car") ? "bg-gray-100" : "bg-white"
            )}
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="px-3 w-fit mt-3 py-1 text-green-800 border-r border-t border-b border-green-800 font-medium bg-green-200 rounded-r-xl">
                Free Cancelation
              </div>
              <div className="flex flex-col gap-2 w-full px-3 pb-3">
                <div className="w-full h-32 md:h-44 rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center w-full gap-5">
                  <div className="flex items-center gap-1">
                    <GoPeople className="text-brand size-5 font-bold" />
                    <div>max {item.persons}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PiSuitcase className="text-brand size-5 font-black" />
                    <div>max {item.bags}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-3 py-2 md:py-3 w-full flex flex-col gap-1 md:gap-3 md:col-span-2">
              <p className="text-2xl font-semibold">{item.name}</p>
              <p className="text-gray-700 text-lg">{item.cars} or similar</p>

              <div className="flex flex-col gap-2">
                {fleetFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-gray-600 text-sm">
                    <IoCheckmarkDoneCircleOutline />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full px-3 py-2 md:py-3 flex flex-col justify-center gap-5">
              {!item.specailRequest ? (
                <div className="flex flex-col gap-3 md:gap-5">
                  <div className="flex flex-col gap-1">
                    <p>One Way</p>
                    <button
                      type="button"
                      onClick={() => {
                        setValue("is_return", false);
                        setValue("car", item.name);
                        setValue("price", price);
                        NextStep();
                      }}
                      className="w-full bg-black text-white px-4 py-3 rounded-xl text-center font-bold cursor-pointer"
                    >
                      £ {price}
                    </button>
                  </div>

                  {category === "trips" && (
                    <div className="flex flex-col gap-1">
                      <p>Return Way</p>
                      <button
                        type="button"
                        onClick={() => {
                          setValue("is_return", true);
                          setValue("car", item.name);
                          setValue("price", returnPrice);
                          NextStep();
                        }}
                        className="w-full bg-black text-white px-4 py-3 rounded-xl text-center font-bold cursor-pointer relative"
                      >
                        £ {returnPrice}
                        {discountPercent > 0 && (
                          <span className="absolute top-1 right-1 px-2 py-1 bg-green-500 rounded-lg text-white text-xs">
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
