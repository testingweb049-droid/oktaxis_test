import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Heading from "@/components/Heading"

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
        "full-width-section bg-light-background py-16 sm:py-20 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Heading as="h2" className="mb-4">
            {heading}
          </Heading>
          <p className="text-xl text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <article
              key={card.title + index}
              className="bg-white rounded-xl shadow-[0px_18px_45px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt ?? card.title}
                  fill
                  className="object-cover"
                />

                {card.badge && (
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center rounded-full bg-heading-black/90 px-4 py-1 text-xs font-semibold tracking-wide uppercase text-white">
                      {card.badge}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 px-5 sm:px-6 py-6 sm:py-7">
                <h3 className="text-3xl font-semibold text-heading-black mb-3">
                  {card.title}
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed">
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


