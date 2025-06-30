import HeroSection from "@/components/home/hero-section";
import Services from "@/components/home/services";
import FleetClasses from "@/components/home/fleet";
import ReadyToBook from "@/components/home/read-to-book";
import Testimonials from "@/components/home/testimonials";
import AboutSection from "@/components/home/about";
import LuxuryExperience from "@/components/home/luxury-experience";
import ImageTextSection from "@/components/ui/ImageTextSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <Services />
      <ImageTextSection
        imageSrc="/OKTaxis In Manchester.webp"
        imageAlt="Executive Airport Transfer"
        title="Premier Luxury Chauffeur and Taxi"
        text="OK Taxis is Manchester’s premier luxury chauffeur and taxi service, providing an unparalleled travel experience for business executives, VIPs, and discerning travellers. We offer a comprehensive range of premium transportation options across Manchester and beyond, including executive airport transfers, corporate travel, and stylish city journeys. Our professional chauffeurs deliver a five-star service in modern, immaculate vehicles, ensuring every ride is comfortable, punctual, and tailored to your needs. With OKTaxis, expect nothing less than exceptional service and total peace of mind on every trip.

                      "
        bgColor="bg-white"
        imagePosition="right"
      />

      <ImageTextSection
        imageSrc="/Taxi To Manchester Airport.jpg"
        imageAlt="Executive Airport Transfer"
        title="Flexible Rides In Manchester"
        text="Based in Manchester, OKTaxis offers 24/7 availability and flexible scheduling. Whether you need a swift private car hire for city centre travel or a long-distance executive chauffeur ride to Liverpool, Leeds or London, we have the right vehicle and driver for you. Each chauffeur is fully licensed, meticulously vetted and highly trained to ensure reliability, discretion and courtesy. Our state-of-the-art booking system and transparent pricing mean there are no surprises – you always know the exact fare and details in advance. From airport pickups to wedding transfers, OKTaxis redefines comfort and convenience in luxury transportation.
                      "
        bgColor="bg-white"
        imagePosition="left"
      />
      <ImageTextSection
        imageSrc="/Manchester Taxi Service.jpg"
        imageAlt="Executive Airport Transfer"
        title="Trusted Taxi Company"
        text="As a trusted private hire company, we take pride in our Manchester heritage and deep local knowledge. Our chauffeurs know every twist and turn of the city to beat traffic and find the most efficient routes. When you choose OK Taxis, you benefit from fast, worry-free journeys whether you’re heading to a meeting in Spinningfields, catching a train from Piccadilly Station, or enjoying a night out in the theatre district. Experience the difference of an executive taxi service that puts your comfort, safety and schedule first.
                      "
        bgColor="bg-white"
        imagePosition="left"
      />
      <AboutSection />

      <LuxuryExperience />

      <FleetClasses />
      <ReadyToBook />
      <Testimonials />
    </main>
  );
}
