"use client"

import { useRef } from "react"
import Image from "next/image"
import { Users, Briefcase, ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { fleets } from "../NewBookingForm/CarList"

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
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
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
                <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-64 w-full">
                    <Image 
                      src={vehicle.image || "/placeholder.svg"} 
                      alt={vehicle.name || vehicle.cars} 
                      fill 
                      className="object-cover object-center" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">{vehicle.cars}</h3>
                    <div className="flex items-center justify-start space-x-6">
                      <div className="flex items-center text-brand">
                        <Users className="mr-2 h-5 w-5" />
                        <span className="text-sm">{vehicle.persons} passengers</span>
                      </div>
                      <div className="flex items-center text-brand">
                        <Briefcase className="mr-2 h-5 w-5" />
                        <span className="text-sm">{vehicle.bags} suitcases</span>
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
