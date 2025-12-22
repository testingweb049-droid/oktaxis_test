"use client";

import Image from "next/image";
import QuoteButton from "@/components/QuoteButton";

interface PageBannerProps {
  heading: string;
  text?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function PageBanner({
  heading,
  text,
  image = "/assets/airport-transfer-images/airport-banner-img.png",
  buttonText = "Get an Instant Quote",
  buttonLink = "#",
}: PageBannerProps) {
  return (
    <section className="font-montserrat relative w-full min-h-[600px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[100vh] flex items-end md:items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={image}
        alt="Banner Background"
        fill
        priority
        className="object-cover "
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content Container */}
      <div className="relative z-10 full-width-section mx-auto px-4 sm:px-6 lg:px-8 pb-6 pb-8 md:pb-12 lg:py-18 w-full">
        <div className="flex flex-col items-center gap-4 text-center mx-auto max-w-4xl px-3 mb-10 md:mb-0 md:px-0">
          {/* Heading */}
          <div className="w-full mb-3 sm:mb-4 md:mb-6">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold !leading-snug">
            {heading}
          </h1>
          </div>
     

          {/* Description Text */}
          {text && (
            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-4 sm:mb-5 md:mb-6 lg:mb-8 !leading-relaxed w-full px-2 sm:px-0">
              {text}
            </p>
          )}

          {/* Call-to-Action Button */}
          {buttonText && (
            <div className="w-full md:w-auto md:inline-block">
              <QuoteButton
                label={buttonText}
                href={buttonLink}
                className="w-full md:w-auto text-center"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

