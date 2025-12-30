"use client";

import Heading from "./Heading";
export default function ContactTeamSection() {
  return (
    <section className="bg-light-background py-16 sm:py-20 md:py-24 font-montserrat">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
         <Heading as="h2" className="text-xl sm:text-2xl md:text-3xl font-semibold text-heading-black">Customer Support Team</Heading>
          <p className="mt-3 text-base sm:text-lg text-text-gray">
            Our friendly customer support team is available around the clock to
            assist with last-minute bookings or special requests.
          </p>
        </div>

        {/* Support items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Phone */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-heading-black">
              <CheckIcon />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-heading-black">
                Phone (24/7)
              </h3>
              <p className="mt-2 text-base text-text-gray">
                +44 7342 193341
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-heading-black">
              <CheckIcon />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-heading-black">
                Email
              </h3>
              <p className="mt-2 text-base text-text-gray break-all">
                info@oktaxis.co.uk
              </p>
            </div>
          </div>

          {/* Service Areas */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-heading-black">
              <CheckIcon />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-heading-black">
                Service Areas
              </h3>
              <p className="mt-2 text-base text-text-gray">
                Manchester, Liverpool,
                <br className="hidden sm:block" />
                All UK Airports
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 52 52"
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-7 sm:w-9 sm:h-9"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0013 21.6667L8.66797 26L21.668 39L43.3346 17.3333L39.0013 13L21.668 30.3333L13.0013 21.6667Z"
        fill="#FFB400"
      />
    </svg>
  );
}


