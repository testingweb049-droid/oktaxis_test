"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

// Types
interface Review {
  name: string;
  date: string;
  platform: "google" | "facebook" | "spotify";
  review: string;
  rating: number;
  image?: string;
}

// Constants
const REVIEWS: Review[] = [
  {
    name: "Marvin McKinney",
    date: "12/15/2024",
    platform: "google",
    review:
      "Absolutely brilliant service! The driver arrived right on time, and the car was immaculate. The fixed pricing gave me peace of mind, and the journey was smooth and comfortable.",
    rating: 5,
    image: "/assets/clients/client-1.jpg",
  },
  {
    name: "Bessie Cooper",
    date: "09/25/2025",
    platform: "facebook",
    review: "Smooth experience, great car, fair price. A top-notch experience.",
    rating: 5,
  },
  {
    name: "Dianne Russell",
    date: "11/18/2024",
    platform: "google",
    review:
      "Absolutely brilliant service! The driver arrived right on time, and the car was immaculate. The fixed pricing gave me peace of mind, and the journey was smooth and comfortable.",
    rating: 5,
    image: "/assets/clients/client-2.jpg",
  },
  {
    name: "John Doe",
    date: "01/15/2025",
    platform: "spotify",
    review:
      "Absolutely brilliant service! The driver arrived right on time, and the car was immaculate. The fixed pricing gave me peace of mind, and the journey was smooth and comfortable.",
    rating: 5,
  },
];

const SWIPER_SPACE_BETWEEN = 24;

// Reusable Components
const StarIcon = ({ className }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.06342 1.3563L5.28467 4.96282L1.30497 5.54303C0.591294 5.64654 0.305279 6.52638 0.822831 7.03031L3.70205 9.83599L3.02107 13.7993C2.89849 14.5157 3.65302 15.0524 4.28498 14.7173L7.8452 12.846L11.4054 14.7173C12.0374 15.0496 12.7919 14.5157 12.6693 13.7993L11.9883 9.83599L14.8676 7.03031C15.3851 6.52638 15.0991 5.64654 14.3854 5.54303L10.4057 4.96282L8.62697 1.3563C8.30827 0.713449 7.38485 0.705278 7.06342 1.3563Z"
      className="fill-primary-yellow"
    />
  </svg>
);

// Platform Logo Component
const PlatformLogo = ({
  platform,
}: {
  platform: "google" | "facebook" | "spotify";
}) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case "google":
        return (
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="flex-shrink-0 text-primary-yellow"
            >
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>
        );
      case "facebook":
        return (
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-sm sm:text-base font-bold text-white">f</span>
          </div>
        );
      case "spotify":
        return (
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="white"
              className="flex-shrink-0"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute -bottom-0.5 -right-0.5 border-2 border-white rounded-full">
      {getPlatformIcon()}
    </div>
  );
};

// Verification Checkmark Component
const VerifiedBadge = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <circle cx="8" cy="8" r="8" className="fill-green-500" />
    <path
      d="M5.5 8L7 9.5L10.5 6"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="bg-white rounded-lg p-5 sm:p-6 md:p-7 shadow-sm border border-gray-100 flex flex-col h-[280px] sm:h-[300px] md:h-[320px] lg:h-[340px]">
    {/* User Info */}
    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
      {/* Avatar with Platform Logo */}
      <div className="relative flex-shrink-0">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {review.image ? (
            <Image
              src={review.image}
              alt={review.name}
              width={120}
              height={120}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl sm:text-2xl font-semibold text-gray-600">
              {review.name.charAt(0)}
            </span>
          )}
        </div>
        <PlatformLogo platform={review.platform} />
      </div>

      {/* Name and Date */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black truncate">
            {review.name}
          </h3>
          <VerifiedBadge />
        </div>
        <p className="text-sm sm:text-base text-gray-600">{review.date}</p>
      </div>
    </div>

    {/* Review Text */}
    <p className="text-sm sm:text-base md:text-lg text-black mb-4 sm:mb-5 flex-1 leading-relaxed">
      {review.review}
    </p>

    {/* Star Rating */}
    <div className="flex items-center gap-1 sm:gap-1.5">
      {Array.from({ length: review.rating }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  </div>
);

const NavigationButtons = ({
  prevRef,
  nextRef,
}: {
  prevRef: React.RefObject<HTMLDivElement>;
  nextRef: React.RefObject<HTMLDivElement>;
}) => (
  <div className="flex items-center justify-end gap-3 sm:gap-4">
    <div
      ref={prevRef}
      className="reviews-prev inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm cursor-pointer transition hover:bg-gray-100 hover:border-gray-300"
      aria-label="Previous reviews"
    >
      <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
    </div>
    <div
      ref={nextRef}
      className="reviews-next inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm cursor-pointer transition hover:bg-gray-100 hover:border-gray-300"
      aria-label="Next reviews"
    >
      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
    </div>
  </div>
);

export default function Reviews() {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="font-montserrat py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Header with navigation arrows */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-3 sm:mb-4">
              Latest reviews from <span className="text-brand">our</span>{" "}
              customers
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black text-left">
              Hear what our clients say about their experience.
            </p>
          </div>

          {/* Navigation arrows */}
          <NavigationButtons prevRef={prevRef} nextRef={nextRef} />
        </div>

        {/* Reviews Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={SWIPER_SPACE_BETWEEN}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {REVIEWS.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
