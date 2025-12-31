"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoPeople } from "react-icons/go";
import { PiSuitcase } from "react-icons/pi";
import { cn } from "@/lib/utils";
import useFormStore from "@/stores/FormStore";
import { ArrowRight, Loader, Building, CarFront, Ruler, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { fleets } from "./fleets-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function CarList() {
  const { formData, category, setFormData, changeStep, formLoading } = useFormStore();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Show dialog by default when component mounts and category is hourly
  useEffect(() => {
    if (category === 'hourly') {
      setDialogOpen(true);
    }
  }, [category]);

  const handleSelect = async (item: (typeof fleets)[0], price: number) => {
    setFormData("car", item.name, '');
    setFormData("price", price.toString(), '');
    const isValid = await changeStep(true, 2);
    if (isValid) {
      router.push('/book-ride/passenger-details');
    }
  };

  const handleDialogConfirm = () => {
    setDialogOpen(false);
  };

  // Filter vehicles based on passenger count
  const passengerCount = Number(formData.passengers.value) || 1;
  const filteredFleets = fleets.filter((item) => item.passengers >= passengerCount);

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Important Information</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 mt-4">
            {/* Distance Included */}
            <div className="flex gap-3">
              <Ruler className="text-gray-700 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lg">Distance Included</h3>
                <p className="text-gray-600 text-base">
                  Your ride includes <strong>15 miles/hour</strong> booked. Extra distance or time will result in extra charges.
                </p>
              </div>
            </div>

            {/* Return Location */}
            <div className="flex gap-3">
              <Building className="text-gray-700 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lg">Return Location</h3>
                <p className="text-gray-600 text-base">
                  Bookings must end in the same city or metropolitan area as the pickup location, or a vehicle-return fee will apply. For inter-city travel, choose one-way.
                </p>
              </div>
            </div>

            {/* Capacity Limits */}
            <div className="flex gap-3">
              <Users className="text-gray-700 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lg">Capacity Limits</h3>
                <p className="text-gray-600 text-base">
                  Respect guest/luggage capacity for safety. Choose a larger class if unsure—chauffeurs may decline if limits are exceeded.
                </p>
              </div>
            </div>

            {/* Vehicle Assignment */}
            <div className="flex gap-3">
              <CarFront className="text-gray-700 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lg">Vehicle Assignment</h3>
                <p className="text-gray-600 text-base">
                  Vehicle images are examples. A similar-quality vehicle may be assigned.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleDialogConfirm}
            className="w-full mt-6 bg-brand hover:bg-primary-yellow/90 text-black font-semibold"
          >
            GOT IT
          </Button>
        </DialogContent>
      </Dialog>

      <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5">
        {filteredFleets.map((item) => {
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
              <div className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 flex justify-center items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="object-contain w-full h-auto"
                  width={140}
                  height={200}
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
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900">
                  £{price}
                </div>
                {(item.name === "Premium" || item.name === "Executive Premium") && (
                  <div className="text-xs text-red-500 line-through">
                    £{(Number(price) + (Number(price) / 10)).toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            {/* Features Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`features-${item.name}`} className="border-0">
                <AccordionTrigger className="py-1 text-sm font-medium text-gray-700 hover:no-underline">
                  <span>Included Features</span>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-3">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></div>
                      <span>Free 40 minutes of wait time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></div>
                      <span>Complimentary bottle of water</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></div>
                      <span>Complimentary in-vehicle WiFi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></div>
                      <span>Tissues and sanitizer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></div>
                      <span>Android and iPhone chargers</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
    </>
  );
}

export default CarList;
