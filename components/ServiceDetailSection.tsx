import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Heading from "@/components/Heading";

interface ServiceDetailBullet {
  title: string;
  description: string;
  linkLabel?: string;
  linkHref?: string;
}

interface ServiceDetailSectionProps {
  heading: string;
  intro: string;
  bullets: ServiceDetailBullet[];
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export function ServiceDetailSection({
  heading,
  intro,
  bullets,
  imageSrc,
  imageAlt,
  className,
}: ServiceDetailSectionProps) {
  return (
    <section
      className={cn(
        "font-montserrat bg-heading-black text-white",
        className,
      )}
    >
      <div className="flex flex-col lg:flex-row items-stretch gap-0">
        {/* Image */}
        <div className="relative w-full lg:w-1/2 h-[260px] sm:h-[320px] md:h-[380px] lg:h-auto overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 bg-heading-black text-white flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-10 sm:py-12 lg:py-20">
          <Heading
            as="h2"
            align="left"
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-tight"
          >
            {heading}
          </Heading>

          <p className="text-text-gray text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
            {intro}
          </p>

          <ul className="space-y-5 sm:space-y-6">
            {bullets.map((bullet) => (
              <li key={bullet.title} className="flex items-start gap-4">
                <span className="mt-1.5 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary-yellow" />
                <div className="space-y-1">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-text-gray">
                    <span className="block text-white font-semibold">
                      {bullet.title}
                    </span>
                    <span className="block">
                      {bullet.description}
                      {bullet.linkHref && bullet.linkLabel && (
                        <>
                          {" "}
                          <a
                            href={bullet.linkHref}
                            className="text-white font-semibold underline underline-offset-4"
                          >
                            {bullet.linkLabel}
                          </a>
                        </>
                      )}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ServiceDetailSection;


