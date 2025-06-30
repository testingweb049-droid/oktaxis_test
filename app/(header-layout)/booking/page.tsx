"use client";
import React, { useEffect } from "react";
import ContainerLayout from "@/components/NewBookingForm/ContainerLayout";
import useCustomForm from "@/hooks/useFormContext";
import CarList from "@/components/NewBookingForm/CarList";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IoArrowBackOutline } from "react-icons/io5";
import Step3Form from "@/components/NewBookingForm/Step3Form";
import { FaUserTie } from "react-icons/fa";
import { FaTint } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import HourlyNoteDialog from "@/components/NewBookingForm/HourlyNoteDailog";
import { format } from "date-fns";
function formatTime12(hour?: number, minute?: number): string {
  if (hour == null || minute == null) return "";
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = ((hour + 11) % 12) + 1;
  const paddedHour = hour12.toString().padStart(2, "0");
  const paddedMinute = minute.toString().padStart(2, "0");
  return `${paddedHour}:${paddedMinute} ${period}`;
}

// re deploye
function Page() {
  const { form, category, step, Step2, Step1 } = useCustomForm();
  const { getValues, watch } = form;
  const router = useRouter();

  useEffect(() => {
    if (step === 1) {
      router.push("/");
    }
  }, [step]);

  useEffect(() => {
    if (step === 3) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  return (
    <div className=" w-full pb-10 ">
      <div className="w-full h-16 sm:h-20 mb-4 bg-black/80"></div>
      <ContainerLayout>
        <div className="flex flex-col gap-5 w-full">
          <div
            onClick={() => {
              if (step === 2) {
                Step1();
              }
              if (step === 3) {
                Step2();
              }
            }}
            className="cursor-pointer flex items-center gap-2"
          >
            {" "}
            <IoArrowBackOutline className="text-xl" />{" "}
            <span id="back-button">Back</span>
          </div>
          <div className="w-full max-w-screen-sm grid grid-cols-2 items-center mx-auto">
            <div className="pt-5 w-full border-t-2 border-brand text-gray-700 text-center">
              Select Fleet
            </div>
            <div
              className={cn(
                "pt-5 w-full border-t-2 text-center text-gray-700 ",
                step === 3 ? "border-brand" : "border-gray-500"
              )}
            >
              Confirm Order
            </div>
          </div>
        </div>
        <div className="pt-10 lg:pt-20 w-full grid lg:grid-cols-7 gap-5">
          <div className="w-full hidden lg:flex flex-col gap-10 lg:col-span-2">
            <div className="w-full p-4 flex flex-col gap-5 bg-gray-100  h-fit rounded-xl">
              <div className="flex items-center justify-between w-full">
                <div className="text-2xl">Summary</div>
                <Link href="/">
                  <CiEdit className="text-2xl" />
                </Link>
              </div>
              <div className="flex flex-col divide-y w-full ">
                <div className="flex flex-col gap-1 py-2">
                  <p className="text-gray-500 text-sm">Service Type</p>
                  <p className="font-medium">{category.toUpperCase()}</p>
                </div>
                <div className="flex flex-col gap-1 py-2">
                  <p className="text-gray-500 text-sm">Pickup Location</p>
                  <p className="font-medium">{getValues("pickup_location")}</p>
                </div>
                {category === "trips" ? (
                  <div className="flex flex-col gap-1 py-2">
                    <p className="text-gray-500 text-sm">Drop Off</p>
                    <p className="font-medium">
                      {getValues("dropoff_location")}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 py-2">
                    <p className="text-gray-500 text-sm">Duration</p>
                    <p className="font-medium">{getValues("duration")} Hours</p>
                  </div>
                )}
                <div className="flex flex-col gap-1 py-2">
                  <p className="text-gray-500 text-sm">Pickup Date</p>
                  <p className="font-medium">
                    {getValues("pickup_date")
                      ? format(getValues("pickup_date"), "dd/MM/yyyy")
                      : ""}
                  </p>
                </div>
                <div className="flex flex-col gap-1 py-2">
                  <p className="text-gray-500 text-sm">Pickup Time</p>
                  <p className="font-medium">
                    {formatTime12(
                      getValues("pickup_time")?.hour,
                      getValues("pickup_time")?.minute
                    )}
                  </p>
                </div>
                {getValues("car") && (
                  <div className="flex flex-col gap-1 py-2">
                    <p className="text-gray-500 text-sm">Car</p>
                    <p className="font-medium">{getValues("car")}</p>
                  </div>
                )}
                {getValues("price") && (
                  <div className="flex flex-col gap-1 py-2">
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="font-medium">
                      {getValues("price") +
                        (watch("flight_track") ? 7 : 0) +
                        (watch("meet_greet") ? 15 : 0)}
                      £
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full p-4 flex flex-col gap-5 bg-gray-100 lg:col-span-2 h-fit rounded-xl">
              <div className="flex items-center justify-between w-full">
                <div className="text-2xl">ALL CLASSES INCLUDES</div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-5">
                  <FaUserTie className="size-6" />
                  <p className="text-lg">
                    <span className="font-semibold">First Class</span>{" "}
                    professional chauffeur
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <FaTint className="size-6" />
                  <p className="text-lg">
                    <span className="font-semibold">Complimentary water</span>{" "}
                    inside the vehicle
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <AiOutlineClockCircle className="size-6" />
                  <p className="text-lg">
                    <span className="font-semibold">Cancel free</span> up to 48
                    Hours before pickup
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:col-span-5">
            {step === 2 && <CarList />}
            {step === 3 && <Step3Form />}
          </div>
        </div>
        {category === "hourly" && <HourlyNoteDialog />}
      </ContainerLayout>
    </div>
  );
}

export default Page;
