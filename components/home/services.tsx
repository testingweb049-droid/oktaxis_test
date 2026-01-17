"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

// Types
interface Service {
  id: number;
  slug: string;
  path: string;
  title: string;
  category: string;
  description: string;
  image: string;
  size: "large" | "small";
}

// Constants
const SERVICES: Service[] = [
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
    image: "/man-with-computer-car.jpg",
    size: "small",
  },
];

const AUTOPLAY_DELAY = 3000;
const SWIPER_SPACE_BETWEEN = 24;


// Reusable Components
const ServiceDescription = ({ description }: { description: string }) => (
  <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-64 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 mt-0 group-hover:mt-4 pointer-events-none group-hover:pointer-events-auto">
    <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-2 sm:mb-3">
      {description}
    </p>
    <span className="text-sm sm:text-base md:text-lg text-brand font-medium inline-block">
      Read more →
    </span>
  </div>
);

const ServiceCard = ({
  service,
  isLarge = false,
}: {
  service: Service;
  isLarge?: boolean;
}) => (
  <Link href={service.path}>
    <div
      className={`group relative w-full overflow-hidden rounded-lg flex flex-col ${
        isLarge
          ? "h-[500px] sm:h-[550px] md:h-[600px]"
          : "h-[300px] sm:h-[320px] md:h-[340px] lg:h-[290px]"
      }`}
    >
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 ease-out" />

      {/* Category badge and Title at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 lg:p-6 text-white z-10">
        <div className="transition-transform duration-500 ease-out will-change-transform">
          <p className="mb-2 sm:mb-3 text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider text-brand transition-transform duration-500 ease-out transform translate-y-0 group-hover:-translate-y-1">
            {service.category}
          </p>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-transform duration-500 ease-out transform translate-y-0 group-hover:-translate-y-2">
            {service.title}
          </h3>
          <ServiceDescription description={service.description} />
        </div>
      </div>
    </div>
  </Link>
);

export default function Services() {

  return (
    <section id="services" className="font-montserrat">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 pb-0">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-3 sm:mb-4">
              <span className="text-brand">Our </span> Chauffeur{" "}
              <span className="text-brand">Services</span> in Manchester
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mt-4 sm:mt-6 max-w-4xl mx-auto lg:mx-0">
              Discover OKTaxis' range of luxury services tailored for Manchester and the North West. Whether you need Manchester airport chauffeur transfers or a wedding chauffeur in Manchester, our professional drivers and luxury fleet (Mercedes, BMW, Audi) guarantee comfort and reliability.
            </p>
          </div>
        </div>

        {/* Services Grid - Desktop only */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:grid-rows-3 gap-4 md:gap-6 items-start">
          {/* First row: Large card on left (spans 7 columns, 2 rows), two smaller cards stacked vertically on right */}
          <div className="col-span-7 row-span-2 row-start-1">
            <ServiceCard service={SERVICES[0]} isLarge={true} />
          </div>
          <div className="col-start-8 col-span-5 row-start-1">
            <ServiceCard service={SERVICES[1]} />
          </div>
          <div className="col-start-8 col-span-5 row-start-2">
            <ServiceCard service={SERVICES[2]} />
          </div>
          {/* Third row: Two cards side by side, each taking 6 columns (half width) */}
          <div className="col-start-1 col-span-6 row-start-3">
            <ServiceCard service={SERVICES[3]} />
          </div>
          <div className="col-start-7 col-span-6 row-start-3">
            <ServiceCard service={SERVICES[4]} />
          </div>
        </div>

        {/* Services Slider - Mobile and Tablet only */}
        <div className="relative lg:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={SWIPER_SPACE_BETWEEN}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: AUTOPLAY_DELAY,
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
            {SERVICES.map((service) => (
              <SwiperSlide key={service.id}>
                <ServiceCard service={service} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
