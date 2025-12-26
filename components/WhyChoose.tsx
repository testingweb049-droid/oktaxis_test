"use client"
import React, { useRef } from "react";
import {
    Plane,
    Shield,
    User,
    DollarSign,
    ArrowLeft,
    ArrowRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface FeatureItem {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface WhyChooseUsProps {
    badge?: string;
    title?: string;
    description?: string;
    features?: FeatureItem[];
    badgeColor?: string;
    iconBgColor?: string;
    iconColor?: string;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
    badge = "Why Choose Us",
    title = "The Premier Choice for Taxi Services in Birmingham",
    description = "Welcome to OK Taxis, where we redefine travel in and around Birmingham...",
    features = [
        {
            icon: <Plane className="w-8 h-8" />,
            title: "Airport & Long Distance Experts",
            description:
                "We specialize in seamless Birmingham Airport transfers and comfortable long-distance journeys across the UK.",
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Executive & Luxury Fleet",
            description:
                "Travel in style. Our fleet includes premium and luxury vehicles perfect for corporate travel and special occasions.",
        },
        {
            icon: <User className="w-8 h-8" />,
            title: "Professional & Vetted Drivers",
            description:
                "Your journey is handled by licensed, experienced, and courteous drivers committed to your safety and comfort.",
        },
        {
            icon: <DollarSign className="w-8 h-8" />,
            title: "Transparent Fixed Pricing",
            description:
                "Receive a clear, upfront price for your journey. With our fixed fares, you'll never face unexpected costs.",
        },
    ],
    badgeColor = "text-yellow-500",
    iconBgColor = "bg-yellow-400",
    iconColor = "text-white",
}) => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full py-12 md:py-16 lg:py-20">
           {/* whole compoennt  */}
            <div className="container mx-auto px-6 py-20">

                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <p className={`${badgeColor} text-sm font-medium mb-3 uppercase tracking-wide`}>
                        {badge}
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 max-w-3xl mx-auto">
                        {title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>
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
                            el: ".custom-pagination",
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
                        {features.map((feature, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white border rounded-3xl p-8 text-center mx-auto max-w-sm transition-transform duration-300 hover:-translate-y-1">
                                    <div className="flex justify-center mb-5">
                                        <div
                                            className={`w-16 h-16 ${iconBgColor} ${iconColor} rounded-full flex items-center justify-center shadow-md`}
                                        >
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* ✅ Custom Pagination */}
                    <div className="custom-pagination flex justify-center gap-2 mt-6"></div>

                    {/* ✅ Custom pagination styles */}
                    <style>{`
            .custom-pagination .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              background-color: theme('colors.light-gray');
              opacity: 1;
              border-radius: 50%;
              transition: all 0.3s ease;
            }
            .custom-pagination .swiper-pagination-bullet-active {
              background-color: theme('colors.primary-yellow');
              transform: scale(1.2);
            }
          `}</style>
                </div>

                {/* ✅ Desktop Grid */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-8 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex justify-center mb-5">
                                <div
                                    className={`w-16 h-16 ${iconBgColor} ${iconColor} rounded-full flex items-center justify-center shadow-md`}
                                >
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
