"use client"

import { useRef } from "react"
import Image from "next/image"
import { GoPeople } from "react-icons/go"
import { PiSuitcase } from "react-icons/pi"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { fleets } from "../booking/steps/fleets-data"

export default function FleetClasses() {
  const swiperRef = useRef<SwiperType>()

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-6">
        <div className="mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Experience <span className="text-brand">Luxury with Our</span> <br className="md:hidden" />
              Chauffeur  <span className="text-brand">Services</span>
            </h2>
          </div>
          
          {/* Navigation Arrows - Top Right (Visible on all screens) */}
          <div className="flex gap-2 self-end sm:self-auto">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
              aria-label="Previous fleet"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
              aria-label="Next fleet"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Swiper Slider - Mobile and Desktop */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="fleet-swiper !pb-12"
          >
            {fleets.map((vehicle, index) => (
              <SwiperSlide key={`${vehicle.name}-${index}`}>
                <div className="flex flex-col h-full overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
                  {/* Image Section */}
                  <div className="relative w-full flex items-center justify-center py-6 px-4">
                    <div className="relative w-full aspect-[4/2] flex items-center justify-center">
                      <Image 
                        src={vehicle.image || "/placeholder.svg"} 
                        alt={vehicle.name || vehicle.cars} 
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain object-center" 
                      />
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex flex-col gap-2 p-4 sm:p-5 flex-1">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 uppercase leading-tight">
                        {vehicle.name}
                      </h3>
                      <p className="text-sm sm:text-sm md:text-base text-gray-600">
                        {vehicle.cars}
                      </p>
                    </div>
                    
                    {/* Capacity Icons */}
                    <div className="flex items-center gap-4 sm:gap-6 text-gray-700">
                      <div className="flex items-center gap-1.5">
                        <GoPeople size={16} className="sm:w-5 sm:h-5" style={{ color: '#FFB400' }} />
                        <span className="text-sm sm:text-base font-medium">{vehicle.passengers} passengers</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <PiSuitcase size={16} className="sm:w-5 sm:h-5" style={{ color: '#FFB400' }} />
                        <span className="text-sm sm:text-base font-medium">{vehicle.suitcases} suitcases</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
