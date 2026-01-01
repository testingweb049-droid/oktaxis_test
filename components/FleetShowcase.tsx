"use client"
import React, { useRef } from "react";
import { CarFrontIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface FleetItem {
    icon?: React.ReactNode;
    title: string;
    description: string;
}

interface FleetShowcaseProps {
    mainTitle?: string;
    highlightText?: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    fleetItems?: FleetItem[];
    iconBgColor?: string;
    highlightColor?: string;
}

const FleetShowcase: React.FC<FleetShowcaseProps> = ({
    mainTitle = "Our Fleet:",
    highlightText = "The Right Car",
    subtitle = "for Every Occasion",
    description = "Our modern fleet is designed to meet a variety of travel needs. Every vehicle is impeccably clean, regularly maintained, and equipped for a comfortable ride.",
    imageUrl = "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=80",
    imageAlt = "Luxury Car",
    fleetItems = [
        {
            title: "Saloon Cars",
            description: "Ideal for up to 4 passengers for city trips and airport runs.",
        },
        {
            title: "Estate Cars",
            description:
                "Offering additional luggage capacity for travelers with extra bags.",
        },
        {
            title: "MPV / People Carriers",
            description: "Seating up to 8 passengers comfortably for group travel.",
        },
        {
            title: "Executive & Luxury",
            description:
                "Top-of-the-range models from brands like Mercedes-Benz and BMW for the ultimate travel experience.",
        },
    ],
    iconBgColor = "bg-yellow-500",
    highlightColor = "text-yellow-500",
}) => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 pt-20">
            <div className="px-4 sm:px-6 lg:px-8 pt-20">

                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        {mainTitle}{" "}
                        <span className={`${highlightColor}`}>{highlightText}</span>{" "}
                        {subtitle}
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Main Image */}
                <div className="mb-12 md:mb-16">
                    <div className="relative w-full max-w-5xl mx-auto">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
                {/* ✅ Mobile Carousel */}
                <div className="relative block sm:hidden">
                    {/* Navigation Buttons */}
                    <div
                        ref={prevRef}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 transition"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </div>
                    <div
                        ref={nextRef}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 transition"
                    >
                        <ArrowRight className="w-5 h-5 text-gray-700" />
                    </div>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{
                            clickable: true,
                            el: ".fleet-pagination",
                        }}
                        onInit={(swiper) => {
                            // @ts-ignore
                            swiper.params.navigation.prevEl = prevRef.current;
                            // @ts-ignore
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}
                        className="pb-14"
                    >
                        {fleetItems.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white rounded-3xl border p-8 text-center mx-auto max-w-sm transition-transform duration-300 hover:-translate-y-1">
                                    {/* Icon */}
                                    <div
                                        className={`inline-flex items-center justify-center w-16 h-16 ${iconBgColor} rounded-full mb-5 shadow-md`}
                                    >
                                        {item.icon || (
                                            <CarFrontIcon className="w-8 h-8 text-white" />
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* ✅ Custom Pagination */}
                    <div className="fleet-pagination flex justify-center gap-2 mt-6"></div>

                    {/* Custom pagination styles */}
                    <style>{`
            .fleet-pagination .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              background-color: theme('colors.light-background');
              opacity: 1;
              border-radius: 50%;
              transition: all 0.3s ease;
            }
            .fleet-pagination .swiper-pagination-bullet-active {
              background-color: theme('colors.primary-yellow');
              transform: scale(1.2);
            }
          `}</style>
                </div>

                {/* ✅ Desktop Grid */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {fleetItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-8 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1"
                        >
                            <div
                                className={`inline-flex items-center justify-center w-16 h-16 ${iconBgColor} rounded-full mb-5 shadow-md`}
                            >
                                {item.icon || <CarFrontIcon className="w-8 h-8 text-white" />}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FleetShowcase;
