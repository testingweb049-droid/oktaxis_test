"use client";

import Image from "next/image";
import QuoteButton from "@/components/quote-button";

interface MainBannerProps {
  heading: string;
  text?: string;
  image?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  /** Optional: override default height / spacing for specific pages */
  minHeightClass?: string;
  /** Optional: hide primary CTA button (e.g. contact page banner) */
  showButton?: boolean;
}

/**
 * Reusable hero/banner section with background image and primary CTA.
 *
 * Example:
 * <MainBanner
 *   heading="Our Services & Luxury Fleet | OKTaxis Chauffeur Service Manchester"
 *   text="Explore the OKTaxis luxury fleet. From Executive Mercedes E-Class to XL Passenger Vans. Premium chauffeur services in Manchester and Liverpool."
 *   buttonText="Get an instant Quote"
 *   buttonHref="/book-ride"
 * />
 */
export default function MainBanner({
  heading,
  text,
  image = "/assets/airport-transfer-images/airport-banner-img.png",
  buttonText,
  buttonHref,
  onButtonClick,
  minHeightClass,
  showButton = true,
}: MainBannerProps) {
  return (
    <section
      className={`font-montserrat relative w-full ${
        minHeightClass
          ? minHeightClass
          : "min-h-[600px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[100vh]"
      } flex items-center justify-center overflow-hidden`}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt="Banner Background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center gap-4 sm:gap-6 md:gap-8 py-16 sm:py-20 md:py-24 lg:py-32">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold max-w-5xl">
              {heading}
            </h1>

            {text && (
              <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium !leading-relaxed max-w-2xl">
                {text}
              </p>
            )}
            {showButton && (
              <div className="mt-4">
                <QuoteButton
                  label={buttonText}
                  href={buttonHref}
                  onClick={onButtonClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


