"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GoPeople } from "react-icons/go";
import { PiSuitcase } from "react-icons/pi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { FleetType } from "@/lib/fleet-data";

// Constants
const SWIPER_SPACE_BETWEEN = 24;
const SWIPER_BREAKPOINTS = {
  640: {
    slidesPerView: 2,
    spaceBetween: SWIPER_SPACE_BETWEEN,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: SWIPER_SPACE_BETWEEN,
  },
};

// Reusable Components
const NavigationButtons = ({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) => (
  <div className="flex gap-2 sm:gap-3 self-end sm:self-auto">
    <button
      onClick={onPrev}
      className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:border-gray-300"
      aria-label="Previous fleet"
    >
      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
    </button>
    <button
      onClick={onNext}
      className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:border-gray-300"
      aria-label="Next fleet"
    >
      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
    </button>
  </div>
);

const FleetCard = ({ vehicle }: { vehicle: FleetType }) => (
  <div className="flex flex-col h-full overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
    {/* Image Section */}
    <div className="relative w-full flex items-center justify-center py-6 sm:py-8 px-4 sm:px-6">
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
    <div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 flex-1">
      <div className="flex flex-col gap-1 sm:gap-1.5">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 uppercase leading-tight">
          {vehicle.name}
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          {vehicle.cars}
        </p>
      </div>

      {/* Capacity Icons */}
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-gray-700">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <GoPeople
            size={18}
            className="sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary-yellow flex-shrink-0"
          />
          <span className="text-sm sm:text-base md:text-lg font-medium">
            {vehicle.passengers} passengers
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5">
          <PiSuitcase
            size={18}
            className="sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary-yellow flex-shrink-0"
          />
          <span className="text-sm sm:text-base md:text-lg font-medium">
            {vehicle.suitcases} suitcases
          </span>
        </div>
      </div>
    </div>
  </div>
);

const LoadingState = () => (
  <div className="text-center text-base sm:text-lg md:text-xl text-gray-600 py-8 sm:py-12 w-full">
    Loading fleet...
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="text-center text-base sm:text-lg md:text-xl text-red-600 py-8 sm:py-12 w-full">
    {message}
  </div>
);

const EmptyState = () => (
  <div className="text-center text-base sm:text-lg md:text-xl text-gray-600 py-8 sm:py-12 w-full">
    No fleet vehicles available.
  </div>
);

export default function FleetClasses() {
  const swiperRef = useRef<SwiperType>();
  const [fleets, setFleets] = useState<FleetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFleets = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/fleets");
        if (!res.ok) {
          throw new Error("Failed to load fleets");
        }
        const data = await res.json();
        setFleets(data.fleets || []);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load fleets";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadFleets();
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black">
              Experience <span className="text-brand">Luxury with Our</span>{" "}
              <br className="md:hidden" />
              Chauffeur <span className="text-brand">Services</span>
            </h2>
          </div>

          {/* Navigation Arrows - Top Right (Visible on all screens) */}
          <NavigationButtons
            onPrev={() => swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
          />
        </div>

        {/* Swiper Slider - Mobile and Desktop */}
        <div className="relative">
          {loading && <LoadingState />}
          {error && !loading && <ErrorState message={error} />}
          {!loading && !error && fleets.length === 0 && <EmptyState />}
          {!loading && !error && fleets.length > 0 && (
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={SWIPER_SPACE_BETWEEN}
              slidesPerView={1}
              loop={true}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={SWIPER_BREAKPOINTS}
              className="fleet-swiper !pb-12"
            >
              {fleets.map((vehicle, index) => (
                <SwiperSlide key={`${vehicle.name}-${index}`}>
                  <FleetCard vehicle={vehicle} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}
