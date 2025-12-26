import Services from "@/components/home/services";
import FleetClasses from "@/components/home/fleet";
import SEO from "@/components/SEO";
import NewHeroSection from "./book-ride/NewHeroSection";
import WhyChoose from "@/components/Sections/WhyChoose";
import TopThingsSection from "@/components/Sections/TopThingsSection";
import ReviewsSection from "@/components/Sections/reviews";

export default function Home() {
  return (
    <>
      <SEO
        title="Premium Chauffeur Services Manchester | Airport Transfers & Wedding Hire | OKTaxis"
        description="Book premium chauffeur services in Manchester with OKTaxis. Luxury airport transfers, hourly hire, city tours, wedding chauffeurs, and stadium transfers. 24/7 reliable service."
        url="https://oktaxis.com"
        image="https://oktaxis.com/og-image.jpg"
        breadcrumbs={[
          { position: 1, name: "Home" }
        ]}
      />
      <main className="min-h-screen">
        <NewHeroSection/>
        <Services />
        <WhyChoose/>
        <TopThingsSection/>
        <FleetClasses />
        <ReviewsSection/>
      </main>
    </>
  );
}


