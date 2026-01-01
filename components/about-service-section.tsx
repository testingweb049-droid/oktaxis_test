import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Heading from "@/components/heading"

interface AboutServiceCard {
  title: string
  description: string
  imageSrc: string
  imageAlt?: string
  badge?: string
}

interface AboutServiceSectionProps {
  heading: string
  description: string
  cards: [AboutServiceCard, AboutServiceCard]
  className?: string
}

export function AboutServiceSection({
  heading,
  description,
  cards,
  className,
}: AboutServiceSectionProps) {
  return (
    <section
      className={cn(
        " py-10 sm:py-20 lg:py-24 font-montserrat",
        className,
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center ">
          <Heading as="h2" className="!mb-8">
            {heading}
          </Heading>
          <p className="text-base sm:text-lg md:text-xl text-text-gray leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <article
              key={card.title + index}
              className="flex flex-col"
            >
              <div className="relative w-full aspect-[16/9] rounded-xl shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A] overflow-hidden bg-white">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt ?? card.title}
                  fill
                  className="object-cover"
                />

                {card.badge && (
                  <div className="absolute left-4 top-8">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold tracking-wide uppercase",
                        index === 0
                          ? "bg-white text-heading-black shadow-[0px_12px_30px_rgba(15,23,42,0.18)]"
                          : "bg-heading-black/90 text-white",
                      )}
                    >
                      {card.badge}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 px-3 sm:px-6 py-6 sm:py-7">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-heading-black mb-3">
                  {card.title}
                </h3>
                <p className="text-base sm:text-xl text-text-gray leading-relaxed">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutServiceSection


