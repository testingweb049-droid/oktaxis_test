"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CardData {
  heading: string
  paragraph: string
  image: string
}

const cardData: CardData[] = [
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
    image: "/assets/home-images/top-section-img-10.png"
  }
]

export default function TopThingsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileContainerRef = useRef<HTMLDivElement>(null)


  // Handle scroll events for carousel on large screens
  useEffect(() => {
    const container = cardsContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const containerWidth = container.offsetWidth
      const cardWidth = containerWidth / 3
      const gap = 24 // gap-6 = 24px
      const newIndex = Math.round(scrollLeft / (cardWidth + gap))
      setCurrentIndex(Math.max(0, Math.min(newIndex, cardData.length - 3)))
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToIndex = (index: number) => {
    if (cardsContainerRef.current) {
      const container = cardsContainerRef.current
      const containerWidth = container.offsetWidth
      const cardWidth = containerWidth / 3
      const gap = 24
      const scrollPosition = index * (cardWidth + gap)
      
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      })
      setCurrentIndex(index)
    }
  }

  const scrollPrev = () => {
    const newIndex = Math.max(0, currentIndex - 1)
    scrollToIndex(newIndex)
  }

  const scrollNext = () => {
    const maxIndex = Math.max(0, cardData.length - 3)
    const newIndex = Math.min(maxIndex, currentIndex + 1)
    scrollToIndex(newIndex)
  }

  const canScrollPrev = currentIndex > 0
  const canScrollNext = currentIndex < cardData.length - 3


  // Card component to avoid duplication
  const Card = ({ card, index }: { card: CardData; index: number }) => (
    <div
      className={cn(
        "relative bg-white rounded-lg overflow-hidden shadow-lg",
        "transition-all duration-300 ease-out",
        "cursor-pointer"
      )}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
    >
      <div className="relative w-full h-[400px] md:h-[450px]">
        <Image
          src={card.image}
          alt={card.heading}
          fill
          className="object-cover"
        />

        {/* Overlay - appears on hover/click */}
        <div
          className={cn(
            "absolute inset-0 bg-black transition-opacity duration-500 ease-out",
            hoveredIndex === index ? "opacity-40" : "opacity-0"
          )}
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {/* Heading - always visible */}
          <div className="relative z-10">
            <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
              {card.heading}
            </h3>
            {/* Yellow underline */}
            <div className="h-1 w-12 bg-brand mb-4" />
          </div>

          {/* Paragraph - appears on hover/click */}
          <div
            className={cn(
              "relative z-10 transition-all duration-500 ease-out",
              hoveredIndex === index
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            )}
            style={{
              maxHeight: hoveredIndex === index ? "500px" : "0",
              overflow: hoveredIndex === index ? "visible" : "hidden",
              transitionDelay: hoveredIndex === index ? "150ms" : "0ms"
            }}
          >
            <p className="text-white text-sm md:text-base leading-relaxed">
              {card.paragraph}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section className="font-montserrat bg-gray-800 py-16 lg:py-20">
      <div className="full-width-section mx-auto px-4 md:px-6">
        {/* Title and Description */}
        <div className="mb-4 md:mb-6 text-white text-center flex flex-col  gap-3 items-center justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
            TOP 10 Things to see & do in Manchester
          </h2>
          {/* <p className="text-base md:text-lg max-w-5xl text-center">
            Manchester is a city of contrast, history, and unbeatable energy, but navigating it on your own can be a headache. Forget hunting for expensive parking spaces or navigating one-way systems. With our Executive Chauffeur Hire, you can sit back and simply enjoy the ride. Whether you are hosting clients in Spinningfields or taking the family to the football, we provide effortless door-to-door service to the city's best spots.
          </p> */}
        </div>

        {/* Cards Container with Navigation */}
        <div className="relative">
          {/* Navigation Arrows - Desktop (top-right) */}
          <div className="hidden md:flex absolute -top-16 right-0 gap-2 z-10">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={cn(
                "p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "text-white border border-white/20"
              )}
              aria-label="Previous cards"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={cn(
                "p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "text-white border border-white/20"
              )}
              aria-label="Next cards"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Small screens: Stacked sticky cards - Progressive stacking like ui-layouts Framer Stacking */}
          <div className="md:hidden">
            {cardData.map((card, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className="sticky w-full"
                style={{
                  top: '20px',
                  zIndex: index + 1, // Higher index = appears on top when scrolling
                  marginBottom: index < cardData.length - 1 ? '450px' : '0',
                  marginTop: index === 0 ? '0' : '-430px' // Overlap cards to create stack
                }}
              >
                <Card card={card} index={index} />
              </div>
            ))}
          </div>

          {/* Large screens: Horizontal carousel */}
          <div
            ref={cardsContainerRef}
            className="hidden md:flex overflow-x-auto scroll-smooth gap-6 pb-4 no-scrollbar"
          >
            {cardData.map((card, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[calc(33.333%-16px)]"
              >
                <Card card={card} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
