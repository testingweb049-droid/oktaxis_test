"use client";

import Image from "next/image";
import Heading from "@/components/heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousal";

const CHECK_ICON = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.75 9.33333L1 12L9.25 20L23 6.66667L20.25 4L9.25 14.6667L3.75 9.33333Z"
      fill="black"
    />
  </svg>
);

const FLEET_CARDS = [
  {
    id: 1,
    title: "1. Economy Class",
    image: "/assets/cars/economy-vehical-img.png",
    details: [
      {
        label: "Models:",
        text: "Skoda Octavia, Toyota Prius",
      },
      {
        label: "Best For:",
        text: "Daily airport runs and cost-effective city travel.",
      },
      {
        label: "Details:",
        text: "Thrifty on fuel and solid on reliability. These vehicles are ideal for solo travellers or couples needing a quick, budget-friendly transfer without sacrificing cleanliness or punctuality.",
      },
    ],
  },
  {
    id: 2,
    title: "2. Executive Class",
    image: "/assets/cars/premium-vehical-img.png",
    details: [
      {
        label: "Models:",
        text: "BMW 5 Series, Mercedes E-Class",
      },
      {
        label: "Best For:",
        text: "Business meetings and corporate travel.",
      },
      {
        label: "Details:",
        text: "Step up a notch with our Executive range. Featuring leather seats, superior soundproofing, and a smooth drive, these are perfect for professionals who need a smart, productive environment on the move.",
      },
    ],
  },
  {
    id: 3,
    title: "3. Executive Premium",
    image: "/assets/cars/executive-premium-vehical-img.png",
    details: [
      {
        label: "Models:",
        text: "Tesla Model S",
      },
      {
        label: "Best For:",
        text: "VIP arrivals and eco-conscious travelers.",
      },
      {
        label: "Details:",
        text: "Experience the future of travel. The Tesla Model S offers near-silent electric power and zero emissions, ensuring you arrive in sophisticated style while minimizing your carbon footprint.",
      },
    ],
  },
  {
    id: 4,
    title: "4. Luxury Van & Group Vehicles",
    image: "/assets/cars/luxury-van-vehical-img.png",
    details: [
      {
        label: "Models:",
        text: "Mercedes V-Class",
      },
      {
        label: "Best For:",
        text: "Families, Roadshows, and Golf Trips.",
      },
      {
        label: "Details:",
        text: "If you are travelling with a team or family, our XL Passenger Vans offer loads of space for up to 8 passengers plus luggage. Flexible seating arrangements make this brilliant for airport transfers or group days out.",
      },
    ],
  },
];

export default function LuxuryFleetSection() {
  return (
    <section className="font-montserrat py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center pb-5">
          <Heading as="h2" align="center">
            Our Luxury Fleet Comfort, Safety &amp; Style
          </Heading>
          <p className="mt-2 sm:mt-4 text-lg text-text-gray">
            Our fleet mixes executive comfort with modern efficiency. Every
            vehicle undergoes strict safety checks and daily valeting. From
            eco-friendly hybrids for city centres to spacious vans for airport
            runs, we have the perfect vehicle for your journey.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 lg:mt-14">
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            className="relative container mx-auto px-4 sm:px-6 lg:px-8"
          >
            <CarouselContent>
              {FLEET_CARDS.map((card, index) => (
                <CarouselItem key={card.id}>
                  <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
                    {/* Text column */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                      <Heading
                        as="h3"
                        align="left"
                        className="mb-4 lg:mb-6 text-heading-black"
                      >
                        {card.title}
                      </Heading>

                      <div className="space-y-4">
                        {card.details.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-1 flex flex-shrink-0 items-start justify-center">
                              {CHECK_ICON}
                            </span>
                            <p className="text-base sm:text-lg text-text-gray">
                              <span className="font-semibold text-heading-black">
                                {item.label}{" "}
                              </span>
                              <span>{item.text}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image column */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                      <div className="w-full max-w-3xl rounded-md border border-light-background bg-white px-4 py-6 sm:px-8 sm:py-10 flex items-center justify-center">
                        <div className="relative w-full aspect-[16/6] md:aspect-[16/8]">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            sizes="(min-width:1024px) 50vw, 100vw"
                            className="object-cover"
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom navigation arrows */}
            <CarouselPrevious
              variant="ghost"
              size="icon"
              className="hidden sm:flex border-none bg-transparent hover:bg-transparent -left-10 md:-left-16 top-1/2 -translate-y-1/2"
            >
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.7213 16.4988C27.7213 22.7028 22.7053 27.7188 16.5013 27.7188C10.2973 27.7188 5.28125 22.7028 5.28125 16.4988C5.28125 10.2948 10.2973 5.27875 16.5013 5.27875C22.7053 5.27875 27.7213 10.2948 27.7213 16.4988ZM6.60125 16.4988C6.60125 21.9768 11.0233 26.3988 16.5013 26.3988C21.9793 26.3988 26.4013 21.9768 26.4013 16.4988C26.4013 11.0208 21.9793 6.59875 16.5013 6.59875C11.0233 6.59875 6.60125 11.0208 6.60125 16.4988Z"
                  fill="black"
                />
                <path
                  d="M17.6229 11.0223L12.1449 16.5003L17.6229 21.9783L16.6989 22.9023L10.2969 16.5003L16.6989 10.0983L17.6229 11.0223Z"
                  fill="black"
                />
                <path
                  d="M11.2188 17.1602L11.2188 15.8402L22.4388 15.8402L22.4388 17.1602L11.2188 17.1602Z"
                  fill="black"
                />
              </svg>
            </CarouselPrevious>

            <CarouselNext
              variant="ghost"
              size="icon"
              className="hidden sm:flex border-none bg-transparent hover:bg-transparent -right-10 md:-right-16 top-1/2 -translate-y-1/2"
            >
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.27875 16.4988C5.27875 22.7028 10.2948 27.7188 16.4987 27.7188C22.7027 27.7188 27.7188 22.7028 27.7188 16.4988C27.7188 10.2948 22.7028 5.27875 16.4988 5.27875C10.2948 5.27875 5.27875 10.2948 5.27875 16.4988ZM26.3988 16.4988C26.3988 21.9768 21.9767 26.3988 16.4987 26.3988C11.0208 26.3988 6.59875 21.9768 6.59875 16.4988C6.59875 11.0208 11.0208 6.59875 16.4988 6.59875C21.9768 6.59875 26.3988 11.0208 26.3988 16.4988Z"
                  fill="black"
                />
                <path
                  d="M15.3771 11.0223L20.8551 16.5003L15.3771 21.9783L16.3011 22.9023L22.7031 16.5003L16.3011 10.0983L15.3771 11.0223Z"
                  fill="black"
                />
                <path
                  d="M21.7812 17.1602L21.7813 15.8402L10.5612 15.8402L10.5612 17.1602L21.7812 17.1602Z"
                  fill="black"
                />
              </svg>
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </section>
  );
}


