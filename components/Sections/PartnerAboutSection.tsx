"use client";

import React from "react";
import Image from "next/image";
import Heading from "@/components/Heading";

interface PartnerAboutSectionProps {
  onApplyClick?: () => void;
}

export default function PartnerAboutSection({
  onApplyClick,
}: PartnerAboutSectionProps) {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 font-montserrat">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
        {/* Left content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start gap-4 lg:gap-6">
          <Heading
            as="h2"
            align="left"
            className="!mb-1 text-heading-black"
          >
            Why chauffeur with us?
          </Heading>

          <p className="font-montserrat text-2xl text-primary-yellow">
            Make your life richer than ever before
          </p>

          <p className="font-montserrat text-lg text-text-gray leading-relaxed max-w-xl">
            Clients choose us again and again for one reason: exceptional
            chauffeurs. From first interaction to final drop-off, we deliver
            professional, attentive service with consistency you can trust. For
            nearly two decades, we&apos;ve built lasting relationships, served
            high-value clients, and earned multiple industry awards through
            reliability and excellence.
          </p>

          <button
            type="button"
            onClick={onApplyClick}
            className="mt-4 inline-flex items-center justify-center px-8 py-2 text-xl font-semibold bg-heading-black text-primary-yellow rounded-full shadow-sm hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-yellow/70"
          >
            Apply
          </button>
        </div>

        {/* Right image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative max-w-md w-full rounded-md overflow-hidden shadow-[0px_10.67px_13.33px_-8px_rgba(0,0,0,0.1),0px_26.67px_33.33px_-6.67px_rgba(0,0,0,0.1)]">
            <Image
              src="/assets/partner-images/partner-about-img.png"
              alt="Professional chauffeur standing next to a luxury car"
              width={640}
              height={400}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


