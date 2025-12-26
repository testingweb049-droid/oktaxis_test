"use client";
import React, { useEffect } from "react";
import FullWidthSectionLayout from "@/components/NewBookingForm/FullWidthSectionLayout";
import useCustomForm from "@/hooks/useFormContext";
import CarList from "@/components/NewBookingForm/CarList";
import { useRouter } from "next/navigation";
import Step3Form from "@/components/NewBookingForm/Step3Form";
import HourlyNoteDialog from "@/components/NewBookingForm/HourlyNoteDialog";
import BookingStepper from "@/components/NewBookingForm/BookingStepper";
import GoogleMapsRoute from "@/components/NewBookingForm/GoogleMap";
function Page() {
  const { category, step, form } = useCustomForm();
  const { watch } = form;
  const router = useRouter();

  useEffect(() => {
    if (step === 1) {
      router.push("/");
    }
  }, [step]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);


  return (
    <div className=" w-full pb-10 bg-[#EBF1F5]">
      <div className="w-full h-16 sm:h-20 mb-4 bg-black/80"></div>
      <FullWidthSectionLayout>
        <div className="flex flex-col gap-5 w-full">
          {/* <div
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
          </div> */}
          {/* <div className="w-full max-w-screen-sm grid grid-cols-2 items-center mx-auto">
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
          </div>  */}

          <BookingStepper />
        </div>
        <div>
          <div className="w-full lg:col-span-5 flex justify-center">
            <div className="w-full max-w-6xl">

              <GoogleMapsRoute
                fromCoords={{
                  lng: Number(watch('pickup_location_lag_alt')?.split(',')[1] ?? 0),
                  lat: Number(watch('pickup_location_lag_alt')?.split(',')[0] ?? 0),
                }}
                toCoords={{
                  lng: Number(watch('dropoff_location_lag_alt')?.split(',')[1] ?? 0),
                  lat: Number(watch('dropoff_location_lag_alt')?.split(',')[0] ?? 0),
                }}
              />

              {step === 2 && <GoogleMapsRoute
                fromCoords={{
                  lng: Number(watch('pickup_location_lag_alt')?.split(',')[1] ?? 0),
                  lat: Number(watch('pickup_location_lag_alt')?.split(',')[0] ?? 0),
                }}
                toCoords={{
                  lng: Number(watch('dropoff_location_lag_alt')?.split(',')[1] ?? 0),
                  lat: Number(watch('dropoff_location_lag_alt')?.split(',')[0] ?? 0),
                }}
              />}


              {step === 2 && <CarList />}
              {step === 3 && <Step3Form />}

            </div>
          </div>

        </div>
        {category === "hourly" && <HourlyNoteDialog />}
      </FullWidthSectionLayout>
    </div>
  );
}

export default Page;
