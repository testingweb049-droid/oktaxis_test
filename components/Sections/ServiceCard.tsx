import Image from "next/image"
import { homePageData } from "@/constants/homePageData"

interface Service {
  title: string
  image: string
  href: string
  description: string
}

export default function sServiceCard() {
  const { servicesSection } = homePageData

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="full-width-section px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="text-brand">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Premium Transportation Solutions Tailored to Your Needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesSection.services.map((service, index) => (
            <div
              key={index}
              className="group relative h-[400px] overflow-hidden rounded-xl"
            >
              <Image
                src={service.image}
                alt={service.title}
                quality={50}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Dark overlay that becomes more visible on hover */}
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/75" />
              
              {/* Content full-width-section */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-transform duration-500">
                {/* Title full-width-section with skewed edge */}
                <div className="relative bg-primary/90 py-3 px-6 transform -translate-y-6 transition-transform duration-500 group-hover:translate-y-0 w-auto max-w-[90%]">
                  <h3 className="text-xl font-semibold text-brand text-center">
                    {service.title}
                  </h3>
                 
                </div>
                
                {/* Description with fade in animation */}
                <p className="text-white text-center mt-4 opacity-0 transform translate-y-8 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 px-6">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

