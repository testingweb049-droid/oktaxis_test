import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading";

export interface InfoCard {
  image?: string;
  imageAlt?: string;
  heading?: string;
  text?: string;
  linkText?: string;
  linkHref?: string;
}

interface InfoCardsProps {
  title?: string;
  cards: InfoCard[];
}

export default function InfoCards({ title, cards }: InfoCardsProps) {
  return (
    <section className="font-montserrat py-8 sm:py-12 md:py-16 lg:py-18 bg-light-background mb-8 md:mb-14">
      <div className="full-width-section mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        {title && (
          <Heading
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-heading-black text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20"
          >
            {title}
          </Heading>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden"
              style={{
                boxShadow: `
                  0px 2.67px 5.33px -2.67px #0000001A,
                  0px 5.33px 8px -1.33px #0000001A
                `,
              }}
            >
              {/* Card Image */}
              {card.image && (
                <div className="relative w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.imageAlt || card.heading || "Card image"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Card Content */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                {/* Heading */}
                {card.heading && (
                  <Heading
                    as="h3"
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-heading-black"
                  >
                    {card.heading}
                  </Heading>
                )}

                {/* Text */}
                {card.text && (
                  <p className="text-base sm:text-lg md:text-xl font-normal text-text-gray leading-6 sm:leading-7 md:leading-8 lg:leading-[34px]">
                    {card.text}
                  </p>
                )}

                {/* Link */}
                {card.linkText && card.linkHref && (
                  <div className="pt-1 sm:pt-2">
                    <Link
                      href={card.linkHref}
                      className="text-base sm:text-lg text-primary-yellow hover:opacity-80 transition-opacity inline-flex items-center gap-2"
                    >
                      {card.linkText}
                      <span className="text-primary-yellow">›</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

