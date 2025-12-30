"use client";

import Image from "next/image";

const bulletPoints = [
  {
    title: "30 Minutes Free Wait Time:",
    description:
      "Change your destination mid-ride? No problem. Our flexible car service adapts instantly to your needs.",
  },
  {
    title: "Flight Tracking:",
    description:
      "We monitor your flight status in real-time to ensure on-time pickup, even if you are delayed.",
  },
  {
    title: "Meet and Greet:",
    description:
      "Your chauffeur welcomes you inside the arrivals hall with a personalized name sign and assistance with your luggage.",
  },
  {
    title: "Multilingual Chauffeurs:",
    description:
      "Our team includes courteous chauffeurs fluent in multiple languages to assist international guests.",
  },
  {
    title: "Transparent Pricing:",
    description:
      "No hidden fees, clear, upfront fixed pricing always.",
  },
];

export default function FleetsOfferSection() {
  return (
    <section className="font-montserrat py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 items-center lg:items-stretch">
          {/* Text content */}
          <div>
            <h2 className="text-heading-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              What Do We Offer at OKTaxis?{" "}
              <span className="block">
                Premium Chauffeur Services Designed for You
              </span>
            </h2>

            <div className="mt-4 space-y-3 text-lg text-text-gray max-w-xl">
              <p>
                We have designed our services to prioritize your comfort and
                peace of mind.
              </p>
              <p>
                Whether you are travelling for business in Manchester or leisure
                in London, here is what sets OKTaxis apart:
              </p>
            </div>

            <ul className="mt-6 space-y-4">
              {bulletPoints.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-1 flex flex-shrink-0 items-start justify-center">
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
                  </span>
                  <p className="text-lg text-text-gray">
                    <span className="font-semibold text-heading-black">
                      {item.title}{" "}
                    </span>
                    <span>{item.description}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="w-full">
            <div className="relative w-full h-[260px] sm:h-[320px] lg:h-full min-h-[260px] rounded-2xl overflow-hidden shadow-[0px_10.67px_13.33px_-8px_#0000001A,0px_26.67px_33.33px_-6.67px_#0000001A]">
              <Image
                src="/assets/fleets-images/fleet-offer-img.png"
                alt="Premium chauffeur services at OKTaxis"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


