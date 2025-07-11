import HeroSection from "@/components/home/hero-section";
import Services from "@/components/home/services";
import FleetClasses from "@/components/home/fleet";
import ReadyToBook from "@/components/home/read-to-book";
import Testimonials from "@/components/home/testimonials";
import AboutSection from "@/components/home/about";
import LuxuryExperience from "@/components/home/luxury-experience";
import ImageTextSection from "@/components/ui/ImageTextSection";
import Seo from "../../components/Seo";
// home
export default function Home() {
  return (
    <>
    <Seo
        title="OkTaxis | Premier Manchester Airport Taxi & Chauffeur Service"
        description="Book reliable airport transfers and local rides with OkTaxis. Serving Manchester 24/7 with luxury cars, professional drivers, and flat pricing."
        url="https://oktaxis.com"
        image="https://oktaxis.com/og-image.jpg"
      />
      <main className="min-h-screen">
        <HeroSection />
        <Services />

        <ImageTextSection
          imageSrc="/OKTaxis In Manchester.webp"
          imageAlt="Executive Airport Transfer"
          title="Premier Luxury Chauffeur and Taxi"
          text="OK Taxis is Manchester’s premier luxury chauffeur and taxi service, providing an unparalleled travel experience for business executives, VIPs, and discerning travellers..."
          bgColor="bg-white"
          imagePosition="right"
        />

        <ImageTextSection
          imageSrc="/Taxi To Manchester Airport.jpg"
          imageAlt="Executive Airport Transfer"
          title="Flexible Rides In Manchester"
          text="Based in Manchester, OKTaxis offers 24/7 availability and flexible scheduling..."
          bgColor="bg-white"
          imagePosition="left"
        />

        <ImageTextSection
          imageSrc="/Manchester Taxi Service.jpg"
          imageAlt="Executive Airport Transfer"
          title="Trusted Taxi Company"
          text="As a trusted private hire company, we take pride in our Manchester heritage and deep local knowledge..."
          bgColor="bg-white"
          imagePosition="left"
        />

        <AboutSection />
        <LuxuryExperience />
        <FleetClasses />
        <ReadyToBook />
        <Testimonials />
      </main>
    </>
  );
}
