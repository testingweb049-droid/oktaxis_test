"use client";

import Image from "next/image";
import Step1Form from "@/components/booking/steps/step1-form";

interface PageBannerProps {
  heading: string;
  text?: string;
  image?: string;
  maxWidthClass?: string;
}

export default function PageBanner({
  heading,
  text,
  image = "/assets/airport-transfer-images/airport-banner-img.png",
  maxWidthClass = "max-w-4xl",
}: PageBannerProps) {
  return (
    <section className="font-montserrat relative w-full min-h-[600px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={image}
        alt="Banner Background"
        fill
        priority
        className="object-cover "
      />

{/*  */}
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/*  */}

      {/* Content Container */}
      <div className="relative z-10 w-full max-lg:rounded-b-3xl">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3 pt-12 pb-0 sm:py-16 md:py-20 lg:py-24 xl:py-32 lg:px-5 w-full">
            {/* Left Content: Heading & Text */}
            <div
              className={`flex flex-col gap-4 items-start justify-center h-full w-full xl:col-span-2 max-lg:px-4 ${maxWidthClass}`}
            >
              <div className="w-full mb-2 sm:mb-3 md:mb-4">
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold ">
                  {heading}
                </h1>
              </div>

              {text && (
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium !leading-relaxed max-w-2xl">
                  {text}
                </p>
              )}
            </div>

            {/* Right Content: Booking Form */}
            <div className="flex items-center justify-center h-full w-full mt-6 sm:mt-8 lg:mt-0 max-lg:col-span-full max-lg:mb-0">
              <div className="w-full max-w-xl">
                <Step1Form />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

