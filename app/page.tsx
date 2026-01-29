import { Metadata } from "next";
import Services from "@/components/home/services";
import FleetClasses from "@/components/home/fleet";
import NewHeroSection from "./book-ride/new-hero-section";
import WhyChoose from "@/components/Sections/why-choose";
import TopThingsSection from "@/components/Sections/top-things-section";
import ReviewsSection from "@/components/Sections/reviews";
import { generateMetadata as generateSEOMetadata, generateWebPageSchema } from "@/lib/seo";
import StructuredData from "@/components/structured-data";
import MovingBanner from "@/components/banners/moving-banner";

export const metadata: Metadata = generateSEOMetadata({
  title: "Chauffeur Services Manchester | Airport Transfers & Wedding Hire",
  description:
    "Book chauffeur services in Manchester with OKTaxis. Luxury airport transfers, hourly hire, city tours, wedding chauffeurs, and stadium transfers. 24/7 reliable service.",
  pageUrl: "/",
  keywords: [
    "chauffeur manchester",
    "airport transfer manchester",
    "wedding car hire",
    "luxury taxi service",
    "executive car service manchester",
  ],
});

export default function Home() {
  const breadcrumbs = [
    { name: "Home", url: "https://oktaxis.co.uk/" },
  ];

  return (
    <>
      <StructuredData
        data={generateWebPageSchema({
          title: "Chauffeur Services Manchester | Airport Transfers & Wedding Hire | OKTaxis",
          description:
            "Book chauffeur services in Manchester with OKTaxis. Luxury airport transfers, hourly hire, city tours, wedding chauffeurs, and stadium transfers. 24/7 reliable service.",
          url: "https://oktaxis.co.uk/",
          breadcrumbs,
        })}
        id="homepage-schema"
      />
      <main className="min-h-screen">
        <NewHeroSection/>
        <Services />
        <WhyChoose/>
        <FleetClasses />
        {/* <MovingBanner/> */}
        <TopThingsSection/>
        <ReviewsSection/>
      </main>
    </>
  );
}


