import React from "react"
import { cn } from "@/lib/utils"
import Heading from "@/components/Heading"

export interface ServiceItem {
  icon: React.ReactNode
  title: string
  description: string
}

interface OurServicesSectionProps {
  headline: string
  services: ServiceItem[]
  className?: string
}

export function OurServicesSection({
  headline,
  services,
  className,
}: OurServicesSectionProps) {
  return (
    <section
      className={cn(
        "font-montserrat bg-heading-black py-16 md:py-20 ",
        "text-center",
        className,
      )}
    >
        <div className="full-width-section">
        <div className="  px-4 md:px-6">
        {/* Main Heading */}
        <Heading
          as="h2"
          className="font-semibold text-white leading-relaxed"
        >
          {headline}
        </Heading>

        {/* Services Grid */}
        <div className="">
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              {/* Icon Circle */}
              <div className="flex items-center justify-center h-16 w-16 md:h-18 md:w-18 rounded-full border border-dark-border bg-dark-background">
                <div className="text-primary-yellow text-xl sm:text-2xl transform scale-150 md:scale-200">
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
          ))}
        </div>
        </div>
     
      </div>
        </div>
     
    </section>
  )
}

export default OurServicesSection


