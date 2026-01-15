"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";

// Types
interface CardData {
  heading: string;
  paragraph: string;
  image: string;
}

// Constants
const CARD_DATA: CardData[] = [
  {
    heading: "John Rylands Library",
    paragraph: "Often compared to Hogwarts, this stunning neo-Gothic landmark on Deansgate is breathtaking inside and out. It houses rare manuscripts and offers a quiet escape from the city buzz.",
    image: "/assets/home-images/top-section-img-1.png"
  },
  {
    heading: "Science and Industry Museum",
    paragraph: "Manchester is the world's first industrial city, and this is where that story comes to life. Explore the interactive exhibits on engineering and innovation that defined a revolution.",
    image: "/assets/home-images/top-section-img-2.png"
  },
  {
    heading: "Manchester Art Gallery",
    paragraph: "A sanctuary for art lovers in the heart of the city, featuring an impressive collection of Pre-Raphaelite paintings and contemporary design.",
    image: "/assets/home-images/top-section-img-3.png"
  },
  {
    heading: "Manchester Museum",
    paragraph: "Located on Oxford Road, this is a must-visit for families. From the towering T-Rex skeleton to the ancient Egypt galleries, it brings natural history to life.",
    image: "/assets/home-images/top-section-img-4.png"
  },
  {
    heading: "Old Trafford & The Etihad",
    paragraph: "Whether you are a Red or a Blue, match days are electric but chaotic. Skip the crowded trams and traffic jams; we will drop you close to the stadium for your tour or game, ensuring a VIP start to the day.",
    image: "/assets/home-images/top-section-img-5.png"
  },
  {
    heading: "AO Arena",
    paragraph: "As one of Europe's largest indoor venues, parking here after a concert can be a nightmare. Let your driver pick you up at a convenient spot nearby, skipping the car park gridlock entirely.",
    image: "/assets/home-images/top-section-img-6.png"
  },
  {
    heading: "Spinningfields",
    paragraph: "The luxury heart of the city. Known as the \"Canary Wharf of the North,\" this is the place for high-end dining and business. Arriving here in a Mercedes S-Class sets the perfect tone for a power lunch or evening cocktails.",
    image: "/assets/home-images/top-section-img-7.png"
  },
  {
    heading: "The Northern Quarter",
    paragraph: "Manchester's creative soul. Ask your driver to drop you off here to explore the maze of independent vinyl shops, vintage boutiques, and hidden speakeasy bars.",
    image: "/assets/home-images/top-section-img-8.png"
  },
  {
    heading: "Manchester Arndale",
    paragraph: "Right in the city centre, this is your go-to hub for high-street fashion and international brands, all under one roof.",
    image: "/assets/home-images/top-section-img-9.png"
  },
  {
    heading: "The Trafford Centre",
    paragraph: "A shopper's paradise with spectacular architecture and high-end stores like Selfridges. Avoid the stress of the massive car parks and let your chauffeur drop you right at the Grand Hall entrance for a luxury retail experience.",
    image: "/assets/home-images/top-section-img-10.png",
  },
];

const SWIPER_SPACE_BETWEEN = 24;
const AUTOPLAY_DELAY = 3000;
const CARDS_PER_VIEW = 3;
const GAP_MD = 16;
const GAP_LG = 24;

// Reusable Components
const ThingCard = ({ card }: { card: CardData }) => (
  <div className="group relative w-full overflow-hidden rounded-lg flex flex-col h-[320px] sm:h-[350px] md:h-[380px] lg:h-[450px]">
    <Image
      src={card.image}
      alt={card.heading}
      fill
      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 ease-out" />

    {/* Content Overlay */}
    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 lg:p-7 text-white z-10">
      <div className="transition-transform duration-500 ease-out will-change-transform">
        {/* Heading - always visible */}
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-transform duration-500 ease-out transform translate-y-0 group-hover:-translate-y-2 mb-2 sm:mb-3">
          {card.heading}
        </h3>
        {/* Yellow underline */}
        <div className="h-0.5 sm:h-1 md:h-1.5 w-12 sm:w-14 md:w-16 bg-brand mb-3 sm:mb-4 md:mb-5" />

        {/* Paragraph - always visible on mobile, appears on hover on desktop */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-out",
            // Mobile: always visible
            "max-h-64 opacity-100 translate-y-0 mt-4 pointer-events-auto",
            // Desktop: hidden by default, show on hover
            "md:max-h-0 md:opacity-0 md:translate-y-2 md:mt-0 md:pointer-events-none",
            "md:group-hover:max-h-64 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:mt-4 md:group-hover:pointer-events-auto"
          )}
        >
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
            {card.paragraph}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const NavigationButtons = ({
  onPrev,
  onNext,
  canScrollPrev,
  canScrollNext,
}: {
  onPrev: () => void;
  onNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}) => (
  <div className="hidden md:flex absolute -top-12 sm:-top-14 md:-top-16 right-0 gap-2 sm:gap-3 z-10">
    <button
      onClick={onPrev}
      disabled={!canScrollPrev}
      className={cn(
        "p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "text-white border border-white/20"
      )}
      aria-label="Previous cards"
    >
      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
    </button>
    <button
      onClick={onNext}
      disabled={!canScrollNext}
      className={cn(
        "p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "text-white border border-white/20"
      )}
      aria-label="Next cards"
    >
      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
    </button>
  </div>
);

export default function TopThingsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll events for carousel on large screens
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const cardWidth = containerWidth / CARDS_PER_VIEW;
      const gap = window.innerWidth >= 1024 ? GAP_LG : GAP_MD;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(
        Math.max(0, Math.min(newIndex, CARD_DATA.length - CARDS_PER_VIEW))
      );
    };

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    if (cardsContainerRef.current) {
      const container = cardsContainerRef.current;
      const containerWidth = container.offsetWidth;
      const cardWidth = containerWidth / CARDS_PER_VIEW;
      const gap = window.innerWidth >= 1024 ? GAP_LG : GAP_MD;
      const scrollPosition = index * (cardWidth + gap);

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const scrollPrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollNext = () => {
    const maxIndex = Math.max(0, CARD_DATA.length - CARDS_PER_VIEW);
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < CARD_DATA.length - CARDS_PER_VIEW;

  return (
    <section className="font-montserrat bg-black py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Title and Description */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-white text-center flex flex-col gap-4 sm:gap-5 md:gap-6 items-center justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight text-white">
            <span className="text-brand">TOP 10</span> Things to see & do in{" "}
            <span className="text-brand">Manchester</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-5xl text-center leading-relaxed">
            Manchester is a city of contrast, history, and unbeatable energy, but navigating it on your own can be a headache. Forget hunting for expensive parking spaces or navigating one-way systems. With our Executive Chauffeur Hire, you can sit back and simply enjoy the ride. Whether you are hosting clients in Spinningfields or taking the family to the football, we provide effortless door-to-door service to the city's best spots.
          </p>
        </div>

        {/* Cards Container with Navigation */}
        <div className="relative">
          {/* Navigation Arrows - Desktop (top-right) */}
          <NavigationButtons
            onPrev={scrollPrev}
            onNext={scrollNext}
            canScrollPrev={canScrollPrev}
            canScrollNext={canScrollNext}
          />

          {/* Mobile and Tablet: Swiper Slider */}
          <div className="relative md:hidden">
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
              className="top-things-swiper !pb-12"
            >
              {CARD_DATA.map((card, index) => (
                <SwiperSlide key={index}>
                  <ThingCard card={card} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Large screens: Horizontal carousel */}
          <div
            ref={cardsContainerRef}
            className="hidden md:flex overflow-x-auto scroll-smooth gap-4 lg:gap-6 pb-4 no-scrollbar"
          >
            {CARD_DATA.map((card, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[calc(33.333%-11px)] lg:w-[calc(33.333%-16px)]"
              >
                <ThingCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
