"use client"

import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/pagination"

const services = [
  {
    id: 1,
    slug: "airport-transfer",
    path: "/airport-transfer",
    title: "Premium Manchester Airport Chauffeur Services",
    category: "AIRPORT TRANSFERS",
    description:
      "Book our reliable Manchester Airport transfers for a smooth start. Enjoy flight tracking and meet and greet services with ease. Contact us for a...",
    image: "/images/airport-transfer.png",
    size: "large",
  },
  {
    id: 2,
    slug: "hourly-chauffeur",
    path: "/hourly-chauffeur",
    title: "Convenient Hourly Chauffeur Hire in Manchester",
    category: "HOURLY CHAUFFEUR SERVICE",
    description:
      "Hire our hourly chauffeur service for flexible travel in Manchester. Get dedicated support and luxury vehicles at your pace. Book now for a tailored s...",
    image: "/images/hourly-service.png",
    size: "large",
  },
  {
    id: 3,
    slug: "event-weddings",
    path: "/event-weddings",
    title: "Wedding Chauffeur Services in Manchester",
    category: "EVENT & WEDDINGS",
    description:
      "Choose our event & weddings service for special moments. We offer wedding car hire with champagne and expert event logistics. Reach us for perfect car...",
    image: "/wedding.png",
    size: "small",
  },
  {
    id: 4,
    slug: "chauffeur-services",
    path: "/chauffeur-services",
    title: "Corporate Chauffeur Services in Manchester",
    category: "CORPORATE CHAUFFEUR SERVICES",
    description:
      "Trust our chauffeur services for all your travel needs. Experience executive chauffeur-driven vehicles with discretion and comfort. Explore our premiu...",
    image: "/cooporate-chauffeur.png",
    size: "small",
  },
  {
    id: 5,
    slug: "chauffeur-service-manchester",
    path: "/chauffeur-service-manchester",
    title: "Chauffeur Service Manchester",
    category: "CHAUFFEUR SERVICES",
    description:
      "Explore Manchester with our city tours in style. Visit Northern Quarter and Spinningfields with expert guides. Book today for a memorable journey.",
    image: "/chauffeur-manchester.jpg",
    size: "small",
  },
]


export default function Services() {
  const renderDescription = (service: typeof services[number]) => {
    return (
      <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-64 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 mt-0 group-hover:mt-4 pointer-events-none group-hover:pointer-events-auto">
        <p className="text-xs sm:text-sm text-gray-300 mb-2">
          {service.description}
        </p>
        <span className="text-xs sm:text-sm text-brand font-medium inline-block">
          Read more →
        </span>
      </div>
    )
  }

  const renderServiceCard = (service: typeof services[number], isLarge?: boolean) => {
    return (
      <Link href={service.path} key={service.id}>
        {/* <div className="group relative bg-red-500 cursor-pointer"> */}
          <div className={`group relative relative w-full overflow-hidden overflow-hidden rounded-lg flex flex-col ${isLarge ? 'h-[600px]' : 'h-[280px] sm:h-[300px] md:h-[320px] lg:h-[290px]'}`}>
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 ease-out" />

            {/* Category badge and Title at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white z-10">
              <div className="transition-transform duration-500 ease-out will-change-transform">
                <p className="mb-1 sm:mb-2 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-brand transition-transform duration-500 ease-out transform translate-y-0 group-hover:-translate-y-1">
                  {service.category}
                </p>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold transition-transform duration-500 ease-out transform translate-y-0 group-hover:-translate-y-2">
                  {service.title}
                </h3>
                {renderDescription(service)}
              </div>
            </div>
          </div>
        {/* </div> */}
      </Link>
    )
  }

  return (
    <section id="services" className="font-montserrat">
        <div className="container mx-auto px-4 sm:px-6 md:px-6 py-20 pb-0">
        {/* Header with navigation arrows */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-14 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-2">
              <span className="text-brand">Our </span> Chauffeur{" "}
              <span className="text-brand">Services</span> in Manchester
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-4 max-w-4xl">
              Discover OKTaxis' range of luxury services tailored for Manchester and the North West. Whether you need Manchester airport chauffeur transfers or a wedding chauffeur in Manchester, our professional drivers and luxury fleet (Mercedes, BMW, Audi) guarantee comfort and reliability.
            </p>
          </div>

        </div>

        {/* Services Grid - Desktop only */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:grid-rows-3 gap-6 items-start">
          {/* First row: Large card on left (spans 7 columns, 2 rows), two smaller cards stacked vertically on right */}
          <div className="col-span-7 row-span-2 row-start-1">
            {renderServiceCard(services[0], true)}
          </div>
          <div className="col-start-8 col-span-5 row-start-1">
            {renderServiceCard(services[1])}
          </div>
          <div className="col-start-8 col-span-5 row-start-2">
            {renderServiceCard(services[2])}
          </div>
          {/* Third row: Two cards side by side, each taking 6 columns (half width) */}
          <div className="col-start-1 col-span-6 row-start-3">
            {renderServiceCard(services[3])}
          </div>
          <div className="col-start-7 col-span-6 row-start-3">
            {renderServiceCard(services[4])}
          </div>
        </div>

        {/* Services Slider - Mobile and Tablet only */}
        <div className="relative lg:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            touchEventsTarget="container"
            allowTouchMove={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
            }}
            className="services-swiper !pb-12"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                {renderServiceCard(service)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
