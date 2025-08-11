import { useFormikContext } from "formik";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BMW from "@/assets/vehicles/bmw.jpg";
import Skoda from "@/assets/vehicles/skoda.jpg";
import Tesla from "@/assets/vehicles/tesla.jpg";
import XLVan from "@/assets/vehicles/xlvan.jpg";

interface Car {
  image: StaticImageData;
  title: string;
  seats: number;
  bags: number;
  category: string;
}

const CarList: Car[] = [
  {
    image: Skoda,
    title: "Skoda Octavia | ToyotaPrius",
    category: "Economy",
    seats: 4,
    bags: 3,
  },
  {
    image: BMW,
    title: "BMW 5 Series | MERC E Class",
    category: "Executive",
    seats: 4,
    bags: 3,
  },
  {
    image: Tesla,
    title: "Tesla Model S",
    category: "Executive Premium",
    seats: 4,
    bags: 3,
  },
  {
    image: XLVan,
    title: "XL Passenger Van",
    category: "Luxury Van",
    seats: 6,
    bags: 6,
  },
];

export const fareStructure: Record<string, any> = {
  Economy: {
    baseRate: 25,
    perMile: 1.3,
    perStop: 10,
    perHour: 15,
  },
  Executive: {
    baseRate: 35,
    perMile: 1.45,
    perStop: 10,
    perHour: 17,
  },
  "Executive Premium": {
    baseRate: 45,
    perMile: 1.6,
    perStop: 10,
    perHour: 20,
  },
  "Luxury Van": {
    baseRate: 65,
    perMile: 1.8,
    perStop: 15,
    perHour: 30,
  },
};

interface VehicleSelectorProps {
  onBookNow: () => void;
}

export default function VehicleSelector({
  onBookNow,
  
}: VehicleSelectorProps) {
  const { values ,setFieldValue } = useFormikContext<any>();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const calculatePrice = (
    category: string,
    distance: number,
    stops: number,
    hourlyCharter: number,
    bookingType: string
  ): number => {
    const fareDetails = fareStructure[category];
    if (!fareDetails) return 0;
  
    let totalPrice = 0; // Base rate applies to all types

    if (bookingType !== "hourly") {
      totalPrice = fareDetails.baseRate;
    }
  
    // Add distance charges only for To Airport, From Airport, and Point to Point
    if (["to", "from", "point"].includes(bookingType)) {
      if (distance > 10) {
        const extraMiles = distance - 10;
        const extraMileCharge = extraMiles * fareDetails.perMile;
        totalPrice += extraMileCharge;
      }
    }
  
    // Add stop charges only if "Add Stop" option is valid
    if (stops > 0) {
      const stopCharge = stops * fareDetails.perStop;
      totalPrice += stopCharge;
    }
    
  
    // Add hourly charges only for "Hourly Charter" type
    if (bookingType === "hourly" && hourlyCharter >= 2) {
      const hourlyCharge = hourlyCharter * fareDetails.perHour;
      totalPrice += hourlyCharge;
    }
  
    console.log(`Booking Type: ${bookingType}, Total Price: £${totalPrice}`);
    return Math.round(totalPrice * 100); // Return price in cents
  };
  

  // const calculatePrice = (
  //   category: string,
  //   distance: number,
  //   stops: number,
  //   hourlyCharter: number
  // ): number => {
  //   const fareDetails = fareStructure[category];
  //   if (!fareDetails) return 0;

  //   // Calculate base rate
  //   let totalPrice = fareDetails.baseRate;

  //   if (distance <= 10 ) {
  //     totalPrice = fareDetails.baseRate;
  //   }

  //   // Add extra charges for distance above 10 miles
  //   if (distance > 10) {
  //     totalPrice += (distance - 10) * fareDetails.perMile;
  //   }

  //    // Add extra charges for stops if provided
  //    if (stops > 0) {
  //     console.log(`Adding stop charges: ${stops} stops @ £${fareDetails.perStop}`);
  //     totalPrice += stops * fareDetails.perStop;
  //   }

  //    // Add extra charges for stops if provided
  //    if (hourlyCharter >= 2) {
  //     console.log(`Adding hourly charges: ${hourlyCharter} hours @ £${fareDetails.perHour}`);
  //     totalPrice += hourlyCharter * fareDetails.perHour;
  //   }
  //   const totalPriceInCents = Math.round(totalPrice * 100);

  //   console.log("Total Price in Cents:", totalPriceInCents);
  
  //   return totalPriceInCents; // Return price in cents
    
  // };

  const handleBookNow = (
    vehicleTitle: string,
    seats: number,
    bags: number,
    category: string
  ) => {
    setSelectedVehicle(vehicleTitle);
  
    // Calculate the total price
    const totalPrice = calculatePrice(
      category,
      values.distance,
      values.stops?.length || 0,
      values.hourlyCharter || 0,
      values.bookingType
    );
  
    // Set values in Formik context
    setFieldValue("selectedVehicle", vehicleTitle);
    setFieldValue("seats", seats);
    setFieldValue("bags", bags);
    setFieldValue("category", category);
    setFieldValue("totalPrice", Number((totalPrice / 100 ).toFixed(2))); // Update totalPrice in Formik
  
    onBookNow();
  };


  

  return (
    <div className="w-full">
      <div className="w-full px-2 md:px-0 md:max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {CarList.map((car, index) => {
           const price = calculatePrice(
            car.category,
            values.distance,
            values.stops?.length || 0,
            values.hourlyCharter || 0,
            values.bookingType
          );

          console.log("PRICE+====>>>", price)


            return (
              <Card
                key={index}
                className="w-full hover:shadow-2xl flex flex-col justify-between"
              >
                <CardHeader className="p-2 flex text-center gap-0">
                  <CardTitle className="text-lg font-semibold">
                    {car.title}
                  </CardTitle>
                  <CardTitle className="text-base font-medium text-gray-500 leading-none">
                    {car.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Image
                    src={car.image}
                    alt={car.title}
                    className="w-full h-auto mb-4 rounded"
                  />
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                      <UserRound className="w-4 h-4 mr-1" />
                      <span className="text-base">{car.seats} Seats</span>
                    </div>
                    <div className="flex items-center">
                      <UserRound className="w-4 h-4 mr-1" />
                      <span className="text-base">{car.bags} Bags</span>
                    </div>
                  </div>
                  <div className="text-center mt-2 font-medium">
                  Price: £{(price / 100).toFixed(2)} 
                  </div>
                </CardContent>
                <CardFooter className="p-2 pt-0">
                  <Button
                    className="w-full bg-brand hover:bg-brand"
                    onClick={() =>
                      handleBookNow(car.title, car.seats, car.bags, car.category)
                    }
                    disabled={selectedVehicle === car.title}
                  >
                    {selectedVehicle === car.title ? "Selected" : "Select"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
