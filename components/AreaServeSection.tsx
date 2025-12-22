import React from "react";
import { MapPin, LucideIcon } from "lucide-react";
import Heading from "@/components/Heading";

export interface AreaCard {
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  heading: string;
  text: string;
}

interface AreaServeSectionProps {
  heading: string;
  cards: AreaCard[];
}

export default function AreaServeSection({
  heading,
  cards,
}: AreaServeSectionProps) {
  return (
    <section className="font-montserrat py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="full-width-section mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-6 md:gap-8">
          {/* Section Heading */}
          <Heading
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-heading-black text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
          >
            {heading}
          </Heading>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {cards.map((card, index) => {
              const IconComponent = card.icon || MapPin;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 sm:p-6 md:p-8 lg:p-10"
                  style={{
                    boxShadow: `
                      0px 2.67px 5.33px -2.67px #0000001A,
                      0px 5.33px 8px -1.33px #0000001A
                    `,
                  }}
                >
                  {/* Icon Container */}
                  <div className="flex mb-3 sm:mb-4 md:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-light-background flex items-center justify-center">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary-yellow" />
                    </div>
                  </div>

                  {/* Card Heading */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-heading-black mb-3 sm:mb-4">
                    {card.heading}
                  </h3>

                  {/* Card Text */}
                  <p className="text-base sm:text-lg md:text-xl text-text-gray leading-6 sm:leading-7 md:leading-8 lg:leading-relaxed">
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

