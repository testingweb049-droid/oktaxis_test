import React from "react"
import { cn } from "@/lib/utils"
import Heading from "@/components/Heading"

export interface ServiceItem {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

interface OurServicesSectionProps {
  headline: string
  services: ServiceItem[]
  className?: string
  servicesClassName?: string
}

export function OurServicesSection({
  headline,
  services,
  className,
  servicesClassName,
}: OurServicesSectionProps) {
  return (
    <section
      className={cn(
        "font-montserrat bg-heading-black py-16 md:py-20 ",
        "text-center",
        className,
      )}
    >
        <div className="container mx-auto px-4">
        <div className="  px-4 md:px-6">
        {/* Main Heading */}
        <Heading
          as="h2"
          className="font-semibold text-white leading-relaxed max-w-4xl mx-auto"
        >
          {headline}
        </Heading>

        {/* Services Grid */}
        <div
          className={cn(
            "mt-12 flex flex-wrap justify-center gap-10 md:gap-12",
            servicesClassName,
          )}
        >
          {services.map((service, index) => {
            const defaultCardClasses =
              "flex flex-col items-center text-center";

            return (
              <div
                key={index}
                className={cn(defaultCardClasses, service.className)}
              >
                {/* Icon Circle */}
                <div className="flex items-center justify-center h-16 w-16 md:h-18 md:w-18 rounded-full border border-dark-border bg-dark-background">
                  <div className="text-primary-yellow !text-xl sm:text-2xl">
                    {service.icon}
                  </div>
                </div>

                {/* Service Heading */}
                <h3 className="mt-6 text-2xl md:text-3xl font-semibold text-white">
                  {service.title}
                </h3>

                {/* Service Text */}
                <p className="mt-4 text-lg text-light-gray leading-relaxed max-w-[27rem]">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
        </div>
     
    </section>
  )
}

export default OurServicesSection


