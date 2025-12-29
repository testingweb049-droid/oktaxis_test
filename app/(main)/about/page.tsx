import { Metadata } from "next";
import MainBanner from "@/components/MainBanner";
import PageAboutSection from "@/components/PageAboutSection";
import OurServicesSection from "@/components/OurServicesSection";
import AboutExperienceSection from "@/components/AboutExperienceSection";
import { generateMetadata as generateSEOMetadata, generateWebPageSchema } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";
import ReviewsSection from "@/components/Sections/reviews";

export const metadata: Metadata = generateSEOMetadata({
  title: "About Ok Taxis | Premium Chauffeur Service in Manchester",
  description:
    "Learn about OkTaxis, Manchester's trusted chauffeur and private taxi service. Discover our values of punctuality, safety, and customer care.",
  pageUrl: "/about",
  keywords: [
    "about oktaxis",
    "manchester taxi company",
    "chauffeur service history",
    "reliable taxi manchester",
  ],
});

// about
// about
export default function About() {
  const breadcrumbs = [
    { name: "Home", url: "https://oktaxis.co.uk/" },
    { name: "About", url: "https://oktaxis.co.uk/about" },
  ];

  return (
    <>
      <StructuredData
        data={generateWebPageSchema({
          title: "About Ok Taxis | Premium Chauffeur Service in Manchester | OKTaxis",
          description:
            "Learn about OkTaxis, Manchester's trusted chauffeur and private taxi service. Discover our values of punctuality, safety, and customer care.",
          url: "https://oktaxis.co.uk/about",
          breadcrumbs,
        })}
        id="about-schema"
      />
      <MainBanner
        heading="About OkTaxis | Premier Chauffeur Service in Manchester"
        text="Learn about OkTaxis, Manchester's trusted family-run chauffeur service. Established in 2015, we provide professional executive travel with a personal touch."
        buttonText="Get an instant Quote"
        buttonHref="/book-ride"
      />
      <PageAboutSection
        heading="About OkTaxis: Manchester’s Trusted Chauffeur Service"
        text={[
          "Founded in 2015, OKTaxis began with a simple mission: to provide a level of service that standard taxis and ride-share apps simply cannot match. We are a family-run business based in Wythenshawe, deeply rooted in the Manchester community.",
          "Over the years, we have grown from a single vehicle into a premier Manchester chauffeur company, serving hundreds of business executives, VIPs, and private clients across the North West.",
          "Unlike faceless nationwide agencies, we know our city, we know our roads, and most importantly, we know our clients by name.",
        ]}
        image="/assets/about-images/about-img.png"
        imageAlt="OKTaxis chauffeur service car driving across a bridge"
        imagePosition="right"
        imagePriority
      />
      <OurServicesSection
        headline="The OKTaxis Difference"
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
                  fill="#FFB400"
                />
              </svg>
            ),
            title: "Family Values",
            description:
              "As a family-run business, we take every booking personally. We don’t just “send a driver”; we ensure you are looked after by a professional who cares about your journey.",
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
                  fill="#FFB400"
                />
              </svg>
            ),
            title: "Rigorous Training",
            description:
              "Our drivers are more than just license holders. They receive training in customer etiquette, safety protocols, and defensive driving.",
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
                  fill="#FFB400"
                />
              </svg>
            ),
            title: "Local Concierge",
            description:
              "Our drivers are locals. Need a dinner recommendation in Spinningfields? Need to know the quickest entrance to the AO Arena? We share insider tips to make your trip effortless.",
          },
        ]}
      />
      <AboutExperienceSection />
      <OurServicesSection
        headline="Our Commitment to Safety & Reliability"
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
                  fill="#FFB400"
                />
              </svg>
            ),
            title: "Flight Tracking",
            description:
              "We use intuitive technology to track your arrival, ensuring we are there when you land.",
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
                  fill="#FFB400"
                />
              </svg>
            ),
            title: "Transparent Pricing",
            description:
              "We maintain affordable, fixed prices without compromising on quality.",
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
                  fill="#FFB400"
                />
              </svg>
            ),
            title: "24/7 Support",
            description:
              "We anticipate your needs, from luggage assistance to traffic avoidance, keeping you informed every step of the way.",
          },
        ]}
      />

      <ReviewsSection />
    </>
  );
}
