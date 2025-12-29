import { Metadata } from "next";
import OfferSection from "@/components/ui/OfferSection";
import HeroSection2 from "@/components/ui/HeroSection2";
import BusImage from "@/assets/vehicles/xlvan.jpg";
import {
  FaLandmark,
  FaCity,
  FaMapMarkedAlt,
  FaMountain,
  FaCarSide,
} from "react-icons/fa";
import ImageTextSection from "@/components/ui/ImageTextSection";
import FleetClasses from "@/components/home/fleet";
import Image from "next/image";
import { Check, Link } from "lucide-react";
import {
  generateMetadata as generateSEOMetadata,
  generateWebPageSchema,
  generateServiceSchema,
} from "@/lib/seo";
import StructuredData from "@/components/StructuredData";
import PageAboutSection from "@/components/PageAboutSection";
import PageBanner from "@/components/PageBanner";
import ConnectionAreasSection from "@/components/ConnectionAreasSection";
import ServiceDetailSection from "@/components/ServiceDetailSection";
import OurServicesSection from "@/components/OurServicesSection";
import FAQSection from "@/components/FAQSection";
import ReviewsSection from "@/components/Sections/reviews";

export const metadata: Metadata = generateSEOMetadata({
  title:
    "Chauffeur Service Manchester | Luxury City & Regional Travel by OKTaxis",
  description:
    "Book a professional chauffeur service in Manchester for city, airport, and regional travel. Executive vehicles, fixed pricing, and expert local drivers.",
  pageUrl: "/chauffeur-service-manchester",
  keywords: [
    "chauffeur service manchester",
    "executive travel manchester",
    "city to city chauffeur manchester",
    "manchester liverpool chauffeur",
    "luxury chauffeur manchester",
  ],
});

export default function ChauffeurServiceManchester() {
  const breadcrumbs = [
    { name: "Home", url: "https://oktaxis.co.uk/" },
    {
      name: "Chauffeur Service Manchester",
      url: "https://oktaxis.co.uk/chauffeur-service-manchester",
    },
  ];

  return (
    <>
      <StructuredData
        data={[
          generateWebPageSchema({
            title:
              "Chauffeur Service Manchester | Luxury City & Regional Travel | OKTaxis",
            description:
              "Premium chauffeur service for Manchester and Liverpool with executive vehicles, fixed pricing, and expert local drivers.",
            url: "https://oktaxis.co.uk/chauffeur-service-manchester",
            breadcrumbs,
          }),
          generateServiceSchema({
            name: "Chauffeur Service Manchester",
            description:
              "Executive chauffeur service for Manchester, Liverpool, and surrounding regions. Fixed-price travel, airport transfers, and bespoke itineraries.",
            areaServed: "Manchester, Liverpool, Greater Manchester, Merseyside",
            serviceType: "Chauffeur Service",
          }),
        ]}
        id="chauffeur-service-manchester-schema"
      />
      <PageBanner
        heading="Chauffeur Service Manchester | Luxury Travel for Manchester"
        text="Professional chauffeur service in the North West. We provide luxury executive transport in Manchester and Liverpool. Fixed-price city-to-city travel and airport transfers."
      />
      <PageAboutSection
        heading="Taxi Manchester City Centre"
        text={[
          "OKTaxis offers reliable, executive taxis throughout Manchester city centre, perfect for shopping trips, business meetings, and nights out. Our professional drivers know the city’s busiest streets, shortcuts, and hotspots, ensuring you arrive on time and in comfort.",
          "Enjoy fixed-rate journeys, clean modern vehicles, and 24/7 availability for both local and longer-distance trips. Whether you’re heading to the office, the arena, or a hotel, we provide a smooth and stress-free travel experience across Manchester and beyond.",
        ]}
        image="/assets/city-center-images/city-center-about-img.png"
        imageAlt="Executive taxi service in Manchester city centre"
      />
      <ConnectionAreasSection
        heading="Luxury Chauffeur Services North West Areas"
        cards={[
          {
            title: "1. Our Key Service Areas",
            description: [
              "As the commercial capital of the North, Manchester requires a driver who knows the local motorway network. Our Manchester chauffeur service is rated highly for punctuality and local knowledge.",
            ],
            imageSrc: "/assets/city-center-images/city-center-connection-img-1.png",
            imageAlt: "Chauffeur opening car door in Manchester city centre",
            children: (
              <ul className="list-disc pl-5 space-y-2 text-text-gray text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed">
                <li>
                  <span className="font-semibold">Airport Transfers:</span> We
                  provide a private chauffeur service from Manchester Airport
                  that meets you in the arrivals hall, avoiding the confusion of
                  the pick-up zones.
                </li>
                <li>
                  <span className="font-semibold">City &amp; Stadiums:</span>{" "}
                  Whether it is a meeting at MediaCityUK or match day transport
                  to Old Trafford, our chauffeur car service Manchester gets you
                  there in comfort.
                </li>
                <li>
                  <span className="font-semibold">Pricing:</span> We offer
                  transparent pricing for our Manchester chauffeur service with
                  no hidden pickup fees.
                </li>
                <li>
                  <Link
                    href="/manchester-airport"
                    className="font-semibold text-primary-yellow hover:underline underline-offset-2"
                  >
                    View Manchester Airport Service
                  </Link>
                </li>
              </ul>
            ),
          },
          {
            title: "2. Chauffeur Service Liverpool",
            description: [
              "Liverpool is a thriving city with complex one-way systems and tunnels. Our chauffeur service Liverpool team specialises in moving executives through Merseyside efficiently.",
            ],
            imageSrc: "/assets/city-center-images/city-center-connection-img-2.png",
            imageAlt: "Chauffeur service vehicle in Liverpool",
            children: (
              <ul className="list-disc pl-5 space-y-2 text-text-gray text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed">
                <li>
                  <span className="font-semibold">
                    Corporate &amp; Financial:
                  </span>{" "}
                  We provide corporate transport for meetings at the Liver
                  Building, St. Paul’s Square, and the Knowledge Quarter.
                </li>
                <li>
                  <span className="font-semibold">Hourly Hire:</span> Need a
                  driver for the day? Our hourly chauffeur service is perfect
                  for visiting multiple sites or shopping at Liverpool ONE.
                </li>
                <li>
                  <span className="font-semibold">Airport Connections:</span> We
                  handle every major transfer, including the popular route from
                  Liverpool John Lennon Airport to Manchester.
                </li>
                <li>
                  <Link
                    href="/liverpool-airport"
                    className="font-semibold text-primary-yellow hover:underline underline-offset-2"
                  >
                    View Liverpool Airport Service
                  </Link>
                </li>
              </ul>
            ),
          },
        ]}
      />
      <ServiceDetailSection
        heading="Regional Connections"
        intro="We bridge the gap between the cities. Our service covers the 'Golden Triangle' of Wilmslow, Alderley Edge, and Knutsford, as well as providing reliable links across the Pennines to Leeds. Domestic trains across the North are often overcrowded or cancelled. Our city-to-city chauffeur service is the stress-free alternative. We turn travel time into billable work time."
        imageSrc="/assets/city-center-images/city-center-feature-img.png"
        imageAlt="Regional city-to-city chauffeur service interior"
        bullets={[
          {
            title: "Manchester to Liverpool",
            description:
              "This is our most popular route. Instead of switching trains at Oxford Road or Lime Street, you relax in the back of a Mercedes E-Class. The 50-minute drive via the M62 becomes a mobile office.",
          },
          {
            title: "Cost Efficiency",
            description:
              "When you ask about long distance chauffeur costs, consider the value of your time. For a team of four, hiring a Mercedes E-Class is often comparable to the price of four peak-time train tickets, but with door-to-door service included.",
          },
        ]}
      />

      <FleetClasses />
      <OurServicesSection
        headline="Why Choose OKTaxis?"
        services={[
          {
            icon: (
              <svg
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8"
                aria-hidden="true"
              >
                <path
                  d="M0 21C0 9.40202 9.40202 0 21 0C32.598 0 42 9.40202 42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21Z"
                  fill="#FFB400"
                />
                <path
                  d="M14.0004 22.0005L18.0004 26.0005L28.0004 16.0005"
                  stroke="#1A1A1A"
                  strokeWidth="1.99993"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "Professional Chauffeurs",
            description:
              "Every driver is licensed, background-checked, and dressed in a suit and tie. We provide executive chauffeur services that understand corporate etiquette.",
          },
          {
            icon: (
              <svg
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8"
                aria-hidden="true"
              >
                <path
                  d="M0 21C0 9.40202 9.40202 0 21 0C32.598 0 42 9.40202 42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21Z"
                  fill="#FFB400"
                />
                <path
                  d="M21.0004 17.0005C19.3434 17.0005 18.0004 17.8955 18.0004 19.0005C18.0004 20.1055 19.3434 21.0005 21.0004 21.0005C22.6574 21.0005 24.0004 21.8955 24.0004 23.0005C24.0004 24.1055 22.6574 25.0005 21.0004 25.0005M21.0004 17.0005C22.1104 17.0005 23.0804 17.4025 23.5994 18.0005M21.0004 17.0005V16.0005M21.0004 17.0005V25.0005M21.0004 25.0005V26.0005M21.0004 25.0005C19.8904 25.0005 18.9204 24.5985 18.4014 24.0005M30.0004 21.0005C30.0004 22.1824 29.7676 23.3527 29.3153 24.4446C28.8631 25.5366 28.2001 26.5287 27.3644 27.3644C26.5287 28.2002 25.5365 28.8631 24.4446 29.3154C23.3526 29.7677 22.1823 30.0005 21.0004 30.0005C19.8185 30.0005 18.6482 29.7677 17.5563 29.3154C16.4643 28.8631 15.4722 28.2002 14.6365 27.3644C13.8007 26.5287 13.1378 25.5366 12.6855 24.4446C12.2332 23.3527 12.0004 22.1824 12.0004 21.0005C12.0004 18.6135 12.9486 16.3244 14.6365 14.6365C16.3243 12.9487 18.6135 12.0005 21.0004 12.0005C23.3874 12.0005 25.6766 12.9487 27.3644 14.6365C29.0522 16.3244 30.0004 18.6135 30.0004 21.0005Z"
                  stroke="#1A1A1A"
                  strokeWidth="1.99993"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "Fixed Pricing",
            description:
              "Whether it is a Liverpool Airport transfer or a cross-country trip, the price we quote is final.",
          },
          {
            icon: (
              <svg
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8"
                aria-hidden="true"
              >
                <path
                  d="M0 21C0 9.40202 9.40202 0 21 0C32.598 0 42 9.40202 42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21Z"
                  fill="#FFB400"
                />
                <path
                  d="M21.0004 17.0005V21.0005L24.0004 24.0005M30.0004 21.0005C30.0004 22.1824 29.7676 23.3527 29.3153 24.4446C28.863 25.5366 28.2001 26.5287 27.3643 27.3644C26.5286 28.2002 25.5364 28.8631 24.4445 29.3154C23.3526 29.7677 22.1823 30.0005 21.0004 30.0005C19.8185 30.0005 18.6481 29.7677 17.5562 29.3154C16.4643 28.8631 15.4721 28.2002 14.6364 27.3644C13.8007 26.5287 13.1377 25.5366 12.6855 24.4446C12.2332 23.3527 12.0004 22.1824 12.0004 21.0005C12.0004 18.6135 12.9486 16.3244 14.6364 14.6365C16.3242 12.9487 18.6134 12.0005 21.0004 12.0005C23.3873 12.0005 25.6765 12.9487 27.3643 14.6365C29.0522 16.3244 30.0004 18.6135 30.0004 21.0005Z"
                  stroke="#1A1A1A"
                  strokeWidth="1.99993"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "24/7 Availability",
            description:
              "Our private chauffeur services in Manchester and Liverpool operate around the clock to suit international flight schedules.",
          },
        ]}
      />
      <FAQSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "How much does a chauffeur service Manchester to Liverpool cost?",
            answer:
              "Prices vary based on the vehicle class (E-Class vs XL Passenger Van). Contact us for a fixed quote. We offer competitive rates for city-to-city transfers compared to last-minute train fares.",
          },
          {
            question: "Do you offer hourly hire in Liverpool as well as Manchester?",
            answer:
              'Yes. We offer the same "As Directed" service in both cities. You can book a driver for a full day of meetings in Liverpool or a tour of the Wirral.',
          },
          {
            question: "What is the difference between a taxi and your executive service?",
            answer:
              "A taxi is a curbside pickup. Our executive chauffeur service includes a dedicated driver, a guaranteed high-spec Mercedes vehicle, a meet-and-greet service, and flight tracking.",
          },
          {
            question: "Can you handle wedding transport?",
            answer:
              "Yes. We provide a wedding chauffeur service for Manchester, Liverpool, and Cheshire. Our cars arrive freshly valeted with ribbons upon request.",
          },
        ]}
      />
      <ReviewsSection />
    </>
  );
}


