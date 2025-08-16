"use client";
import useCustomForm from "@/hooks/useFormContext";
import { cn } from "@/lib/utils";

export default function BookingStepper() {
  const { step } = useCustomForm();

  const steps = [
    { number: 1, label: "Locations" },
    { number: 2, label: "Cars" },
    { number: 3, label: "Your Details" },
    { number: 4, label: "Payment" },
  ];

  const getStatus = (index: number) => {
    if (index + 1 < step) return "completed";
    if (index + 1 === step) return "current";
    return "upcoming";
  };

  const totalSteps = steps.length;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="w-full mb-5 max-w-6xl mx-auto ">
      {/* ✅ Mobile Version */}
      <div className="bg-gray-100 px-5 py-6 rounded-md sm:hidden">
        <div className="flex items-center gap-4">
          {/* Circle Progress */}
          <div className="relative w-14 h-14 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              {/* Background Circle (Black) */}
              <path
                className="text-black"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Progress Circle (Yellow) */}
              <path
                className="text-brand"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${(progress / 100) * 100}, 100`}
                fill="none"
                d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-brand">
              {step} of {totalSteps}
            </div>
          </div>

          {/* Dynamic Headings */}
          <div>
            {step === 2 && (
              <>
                <h2 className="text-lg font-semibold uppercase text-black">
                  Select Your Car
                </h2>
                <p className="text-md uppercase text-gray-500">
                  Select your luxury driven car
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="text-lg font-semibold uppercase text-black">
                  Booking Details
                </h2>
                <p className="text-md uppercase text-gray-500">
                  Confirm your booking details
                </p>
              </>
            )}
            {step === 4 && (
              <>
                <h2 className="text-lg font-semibold uppercase text-black">
                  Payment Details
                </h2>
                <p className="text-md uppercase text-gray-500">
                  Enter your billing details
                </p>
              </>
            )}

          </div>
        </div>
      </div>


      {/* ✅ Desktop Version */}

      {/* ✅ Desktop Version */}
      <div
        className={cn(
          "hidden sm:block py-6 px-5",
          (step === 3 || step === 4) ? "text-center" : "text-left"
        )}
      >

        {/* Dynamic Titles */}
        {step === 2 && (
          <>
            <h2 className="text-5xl text-gray-900 uppercase">Select Your Car</h2>
            <p className="text-gray-600 text-2xl mt-2 uppercase">
              Select your luxury driven car
            </p>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-5xl text-gray-900 uppercase">Booking Details</h2>
            <p className="text-gray-600 text-2xl mt-2 uppercase">
              Confirm your booking details
            </p>
          </>
        )}
        {step === 4 && (
          <>
            <h2 className="text-5xl text-gray-900 uppercase">Payment Details</h2>
            <p className="text-gray-600 text-2xl mt-2 uppercase">
              Enter your billing details
            </p>
          </>
        )}


        {/* Stepper */}
        <div
          className={cn(
            "mt-6 flex items-center overflow-x-auto max-w-full",
            step === 3 || step ===4? "justify-center" : "justify-start"
          )}
        >
          {steps.map((stepItem, index) => {
            const status = getStatus(index);
            return (
              <div key={stepItem.number} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold border transition-all duration-200 ${status === "completed" || status === "current"
                      ? "bg-black text-white border-blue-500"
                      : "text-gray-500 border-gray-300 bg-white"
                      }`}
                  >
                    {stepItem.number}
                  </div>
                  <span
                    className={`ml-3 font-medium ${status === "completed" || status === "current"
                      ? "text-gray-900"
                      : "text-gray-500"
                      }`}
                  >
                    {stepItem.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="w-16 h-0.5 bg-gray-300 mx-6"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
}
