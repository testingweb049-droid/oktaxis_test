"use client";

import Image from "next/image";
import React from "react";
import Heading from "@/components/Heading";

interface PageFeatureSectionProps {
  image: string;
  imageAlt: string;
  heading: string;
  text?: React.ReactNode | React.ReactNode[];
  bulletPoints?: React.ReactNode[];
  imagePosition?: "left" | "right";
}

const CheckmarkIcon: React.FC = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
    >
      <path
        d="M31.1841 15.8401C31.1841 24.315 24.314 31.1851 15.8391 31.1851C7.36431 31.1851 0.494141 24.315 0.494141 15.8401C0.494141 7.36528 7.36431 0.495117 15.8391 0.495117C24.314 0.495117 31.1841 7.36528 31.1841 15.8401ZM14.0642 23.9652L25.4492 12.5802C25.8358 12.1936 25.8358 11.5667 25.4492 11.1801L24.0492 9.78008C23.6626 9.39342 23.0357 9.39342 22.649 9.78008L13.3641 19.0649L9.02924 14.73C8.64264 14.3434 8.01579 14.3434 7.62913 14.73L6.22909 16.1301C5.84249 16.5167 5.84249 17.1435 6.22909 17.5301L12.6641 23.9651C13.0507 24.3518 13.6775 24.3518 14.0642 23.9652Z"
        fill="#FFB400"
      />
    </svg>
  );
};

export default function PageFeatureSection({
  image,
  imageAlt,
  heading,
  text,
  bulletPoints,
  imagePosition = "left",
}: PageFeatureSectionProps) {
  const isImageLeft = imagePosition === "left";
  const paragraphs = React.Children.toArray(text).filter(
    (paragraph) =>
      !(
        typeof paragraph === "string" && paragraph.trim().length === 0
      )
  );

  return (
    // Section with a font-montserrat class
    <section className="font-montserrat">
      <div className="">

        <div
          className={`flex flex-col ${
            isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
          } items-stretch min-h-[400px] md:min-h-[500px] lg:min-h-[600px]`}
        >
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-[700px]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              className=""
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text Panel Section */}
          <div className="w-full md:w-1/2 bg-heading-black flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-20 py-10 sm:py-10 md:py-12 lg:py-16">
            {/* Heading */}
            <Heading
              as="h2"
              align="left"
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-tight"
            >
              {heading}
            </Heading>

            {/* Text Content */}
            {paragraphs.length > 0 && (
              <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <div className="space-y-5 sm:space-y-6 md:space-y-7">
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-text-gray text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Bullet Points */}
            {bulletPoints && bulletPoints.length > 0 && (
              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                {bulletPoints.map((bullet, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <CheckmarkIcon />
                    </div>
                    <p className="text-primary-yellow text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
