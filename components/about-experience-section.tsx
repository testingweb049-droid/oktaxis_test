"use client";

import Image from "next/image";

export default function AboutExperienceSection() {
  return (
    <section className="font-montserrat py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:gap-20 lg:grid-cols-2 items-center lg:items-stretch">
          {/* Image */}
          <div className="w-full">
            <div
              className="relative w-full h-[260px] sm:h-[320px] lg:h-full min-h-[260px] rounded-md overflow-hidden"
              style={{
                boxShadow:
                  "0px 10.67px 13.33px -8px #0000001A, 0px 26.67px 33.33px -6.67px #0000001A",
              }}
            >
              <Image
                src="/assets/about-images/about-experience-img.png"
                alt="Chauffeur driving through a scenic route near Manchester"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Text content */}
          <div className="w-full flex flex-col  gap-4 md:gap-8">
            <h2 className="text-heading-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Experience Manchester in
              <span className="block">Comfort &amp; Style</span>
            </h2>

            <div className="mt-4 space-y-3 text-lg text-text-gray leading-relaxed">
              <p>
                We believe travel should be the most relaxing part of your day.
                Whether you are navigating the buzzing streets of the Northern
                Quarter or heading to a match at Old Trafford, our goal is to
                provide a sanctuary on wheels.
              </p>
              <p>
                Our fleet of Mercedes-Benz, BMW, Tesla, and Toyota vehicles is
                maintained to showroom standards. Inside every vehicle, you will
                find:
              </p>
            </div>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
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
                    Executive Comfort:{" "}
                  </span>
                  <span>
                    Plush leather seating and climate control as standard.
                  </span>
                </p>
              </li>

              <li className="flex items-start gap-3">
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
                    Connectivity:{" "}
                  </span>
                  <span>
                    Complimentary Wi-Fi so you can work or stream on the go.
                  </span>
                </p>
              </li>

              <li className="flex items-start gap-3">
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
                    Privacy:{" "}
                  </span>
                  <span>
                    A discreet, quiet environment perfect for taking calls or
                    decompressing after a flight.
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


