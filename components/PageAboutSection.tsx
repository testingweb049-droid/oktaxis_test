"use client";

import Image from "next/image";
import React, { ReactNode } from "react";

interface PageAboutSectionProps {
  heading: string | ReactNode;
  text?: ReactNode | ReactNode[];
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  imagePriority?: boolean;
  className?: string;
  headingClassName?: string;
  textClassName?: string;
  imageClassName?: string;
  imageHeight?: string; // Tailwind height classes, e.g., "h-[300px] md:h-[400px] lg:h-[496px]"
}

export default function PageAboutSection({
  heading,
  text,
  image,
  imageAlt,
  imagePosition = "right",
  imagePriority = false,
  className = "",
  headingClassName = "",
  textClassName = "",
  imageClassName = "",
  imageHeight,
}: PageAboutSectionProps) {
  const paragraphs = React.Children.toArray(text).filter(
    (paragraph) =>
      !(
        typeof paragraph === "string" && paragraph.trim().length === 0
      )
  );

  return (
    <div className="my-16 md:my-20">
    <section className={`full-width-section${className}`}>
      <div className="full-width-section mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-24 items-center ${
            imagePosition === "right" ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          {/* Text Content */}
          <div className="flex-1 w-full min-w-0 lg:max-w-3xl flex flex-col gap-3 sm:gap-4 md:gap-5">
            <h2
              className={`font-montserrat text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-heading-black mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight ${headingClassName}`}
            >
              {heading}
            </h2>

            <div>
              {paragraphs.length > 0 && (
                <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  <div className="space-y-5 sm:space-y-6 md:space-y-7">
                    {paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className={`text-text-gray text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed ${textClassName}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
         
          </div>

          {/* Image */}
          <div className="flex-1 w-full lg:w-auto lg:flex-shrink-0">
            <div
              className={`relative w-full rounded-lg overflow-hidden ${
                imageHeight || "h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[496px]"
              } ${imageClassName || ""}`}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority={imagePriority}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

