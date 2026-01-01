import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Heading from "@/components/heading"

type ServingCard = {
  title: string
  description: string
  imageSrc: string
  imageAlt?: string
}

export const SERVING_CARDS_DEFAULT: ServingCard[] = [
  {
    title: "Liverpool City Centre",
    description:
      "Direct transfers to the Albert Dock, The Titanic Hotel, or the commercial district.",
    imageSrc: "/assets/liverpool-images/serving-img-1.png",
    imageAlt: "Liverpool city waterfront and Albert Dock skyline",
  },
  {
    title: "Chester & North Wales",
    description:
      "Quick link down the A55 for clients heading to Chester Racecourse or North Wales.",
      imageSrc: "/assets/liverpool-images/serving-img-2.png",
      imageAlt: "Historic city walls and castle near Chester",
  },
  {
    title: "Wirral & St Helens",
    description:
      "Reliable local transfers for residents and businesses in the wider region.",
      imageSrc: "/assets/liverpool-images/serving-img-3.png",
      imageAlt: "Traditional brick buildings on a town street",
  },
]

interface ServingCardsSectionProps {
  heading?: string
  cards?: ServingCard[]
  className?: string
}

export function ServingCardsSection({
  heading = "Serving Merseyside & Cheshire",
  cards = SERVING_CARDS_DEFAULT,
  className,
}: ServingCardsSectionProps) {
  return (
    <section
      className={cn(
        "bg-heading-black font-montserrat py-16 sm:py-20 lg:py-24",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Heading as="h2" align="center" className="text-white">
            {heading}
          </Heading>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col"
            >
              <div className="relative w-full h-72 md:h-80 lg:h-serving-card rounded-xl overflow-hidden">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt ?? card.title}
                  fill
                  className=""
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute inset-x-6 bottom-12">
                  <h3 className="text-2xl md:text-3xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <div className="mt-3 h-0.5 w-12 bg-primary-yellow" />
                </div>
              </div>

              <div className="flex-1 px-1 sm:px-1.5 md:px-2 lg:px-2 pt-5 md:pt-6">
                <p className="text-base sm:text-xl text-light-background leading-relaxed">
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

export default ServingCardsSection


