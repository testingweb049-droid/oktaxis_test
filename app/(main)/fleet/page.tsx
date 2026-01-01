import { Metadata } from "next";
import FleetsOfferSection from "@/components/fleets-offer-section";
import StructuredData from "@/components/structured-data";
import MainBanner from "@/components/main-banner";
import PageAboutSection from "@/components/page-about-section";
import OurServicesSection from "@/components/our-services-section";
import LuxuryFleetSection from "@/components/luxury-fleet-section";
import {
  generateMetadata as generateSEOMetadata,
  generateWebPageSchema,
  generateServiceSchema,
} from "@/lib/seo";
import ReviewsSection from "@/components/Sections/reviews";

const FLEET_HEADING =
  "Our Services & Fleet | OKTaxis Chauffeur Service Manchester";
const FLEET_DESCRIPTION =
  "Explore the OKTaxis fleet. From Executive Mercedes E-Class to XL Passenger Vans. Premium chauffeur services in Manchester and Liverpool.";

export const metadata: Metadata = generateSEOMetadata({
  title: FLEET_HEADING,
  description: FLEET_DESCRIPTION,
  pageUrl: "/fleet",
  keywords: [
    "fleet manchester",
    "executive car fleet manchester",
    "chauffeur fleet manchester",
    "mercedes chauffeur vehicles",
    "xl passenger vans manchester",
  ],
});

export default function Fleet() {
  const breadcrumbs = [
    { name: "Home", url: "https://oktaxis.co.uk/" },
    { name: "Our Fleet", url: "https://oktaxis.co.uk/fleet" },
  ];

  return (
    <>
      <StructuredData
        data={[
          generateWebPageSchema({
            title: `${FLEET_HEADING} | OKTaxis`,
            description: FLEET_DESCRIPTION,
            url: "https://oktaxis.co.uk/fleet",
            breadcrumbs,
          }),
          generateServiceSchema({
            name: "OKTaxis Chauffeur Fleet Manchester",
            description: FLEET_DESCRIPTION,
            areaServed: "Manchester, Liverpool, Greater Manchester, Merseyside",
            serviceType: "Chauffeur Service",
          }),
        ]}
        id="fleet-schema"
      />

      <MainBanner heading={FLEET_HEADING} text={FLEET_DESCRIPTION} />
      <FleetsOfferSection />

      <LuxuryFleetSection />
     

      <OurServicesSection
        headline="Key Fleet Features"
        servicesClassName="!gap-20"

        services={[
          {
            icon: (
              <svg
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.0013 21.6667L8.66797 26L21.668 39L43.3346 17.3333L39.0013 13L21.668 30.3333L13.0013 21.6667Z"
                  fill="currentColor"
                />
              </svg>
            ),
            title: "Connectivity",
            description: "Wi-Fi and USB charging points to keep you connected.",
            className:
              "w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[18rem]",
          },
          {
            icon: (
              <svg
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.0013 21.6667L8.66797 26L21.668 39L43.3346 17.3333L39.0013 13L21.668 30.3333L13.0013 21.6667Z"
                  fill="currentColor"
                />
              </svg>
            ),
            title: "Comfort",
            description:
              "Roomy interiors with ample legroom for long-distance travel.",
            className:
              "w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[18rem]",
          },
          {
            icon: (
              <svg
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.0013 21.6667L8.66797 26L21.668 39L43.3346 17.3333L39.0013 13L21.668 30.3333L13.0013 21.6667Z"
                  fill="currentColor"
                />
              </svg>
            ),
            title: "Safety",
            description:
              "Top-tier safety kits including advanced crash avoidance technology.",
            className:
              "w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[18rem]",
          },
          {
            icon: (
              <svg
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.0013 21.6667L8.66797 26L21.668 39L43.3346 17.3333L39.0013 13L21.668 30.3333L13.0013 21.6667Z"
                  fill="currentColor"
                />
              </svg>
            ),
            title: "Flexibility",
            description:
              "Optional extras like child seats available upon request.",
            className:
              "w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[18rem]",
          },
        ]}

      />
 <div className="bg-light-background py-2 md:py-8">
        <PageAboutSection
          heading="Dependable UK-Wide Coverage"
          text={[
            "Here at OKTaxis, we focus on giving you dependable, custom trips right across the UK.",
            "While our heart is in the North West (Manchester, Liverpool, Leeds), our reach extends to Birmingham, London, and Edinburgh.",
            "Our drivers know the UK motorway network inside out. We ensure you're on time with live tracking and round-the-clock help via our 24/7 support line on +44 7788 710290 or info@oktaxis.co.uk.",
          ]}
          image="/assets/fleets-images/fleet-about-img.png"
          imageAlt="Dependable UK-wide chauffeur coverage by OKTaxis"
          imagePosition="right"
         
        />
      </div>

      <ReviewsSection />
    </>
  );
}
