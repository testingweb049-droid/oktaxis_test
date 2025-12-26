"use client";

import Image from "next/image";
import React from "react";
import Heading from "@/components/Heading";

interface ConnectionAreaCard {
  title: React.ReactNode;
  description?: React.ReactNode | React.ReactNode[];
  imageSrc: string;
  imageAlt: string;
}

interface ConnectionAreasSectionProps {
  heading: React.ReactNode;
  cards: ConnectionAreaCard[];
  className?: string;
}

export function ConnectionAreasSection({
  heading,
  cards,
  className,
}: ConnectionAreasSectionProps) {
  return (
    <section
      className={`font-montserrat py-10 sm:py-14 md:py-20 ${
        className ? className : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <Heading
          as="h2"
          align="center"
          className="text-heading-black mb-8 sm:mb-10 md:mb-16"
        >
          {heading}
        </Heading>

        <div className="space-y-8 sm:space-y-10 md:space-y-14 lg:space-y-16">
          {cards.map((card, index) => {
            const isEven = index % 2 === 1;
            const layoutClass = isEven ? "md:flex-row" : "md:flex-row-reverse";
            const paragraphs = React.Children.toArray(
              card.description
            ).filter((paragraph) => {
              if (typeof paragraph === "string") {
                return paragraph.trim().length > 0;
              }
              return paragraph !== null && paragraph !== undefined;
            });

            return (
              <article
                key={index}
                className={`flex flex-col ${layoutClass} items-stretch gap-6 sm:gap-8 md:gap-10 lg:gap-16`}
              >
                {/* Image first for mobile */}
                <div className="relative w-full md:w-1/2 h-[220px] sm:h-[260px] md:h-[320px] lg:h-[450px] rounded-lg overflow-hidden">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    className=""
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>

                {/* Text content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-heading-black mb-3 sm:mb-4 md:mb-5">
                    {card.title}
                  </h3>

                  {paragraphs.length > 0 && (
                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                      {paragraphs.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-text-gray text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ConnectionAreasSection;


