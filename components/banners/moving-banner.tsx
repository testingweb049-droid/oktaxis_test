"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MovingBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] rounded-2xl overflow-hidden">
          <Image
            src="/blackbannerbg.png"
            alt="Background pattern"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 flex">
            {/* Car Animation - z-0 to stay behind text */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
              <div className={`h-full flex items-center justify-center ${isVisible ? "animate-car-slide-once" : "opacity-0"}`}>
                <Image
                  src="/carmove.png"
                  alt="Luxury car"
                  width={280}
                  height={120}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            {/* Left Section with Text - z-10 to stay above car, animates with car */}
            <div className={`w-[55%] sm:w-[50%] md:w-[55%] flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 z-10 ${isVisible ? "animate-text-slide-once" : "opacity-0"}`}>
              <h2 className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold italic leading-tight">
                Want To Experience OKTaxis With Every Mile You Travel?
              </h2>
            </div>

            <div className="w-[45%] sm:w-[50%] md:w-[45%]">
              <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-6 md:pr-10 lg:pr-16 z-10">
                <Link
                  href="/"
                  className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 border-2 border-white text-white text-xs sm:text-sm md:text-base font-medium rounded-full hover:bg-white hover:text-heading-black transition-all duration-300"
                >
                  BOOK NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles - Single movement */}
      <style jsx>{`
        @keyframes carSlideOnce {
          0% {
            transform: translateX(calc(-50vw - 50%));
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes textSlideOnce {
          0% {
            transform: translateX(calc(-100% - 50vw));
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-car-slide-once {
          animation: carSlideOnce 2s ease-out forwards;
        }

        .animate-text-slide-once {
          animation: textSlideOnce 2s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
