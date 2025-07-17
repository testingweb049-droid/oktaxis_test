import HeroSection from "@/components/home/hero-section";
import Services from "@/components/home/services";
import FleetClasses from "@/components/home/fleet";
import ReadyToBook from "@/components/home/read-to-book";
import Testimonials from "@/components/home/testimonials";
import AboutSection from "@/components/home/about";
import LuxuryExperience from "@/components/home/luxury-experience";
import ImageTextSection from "@/components/ui/ImageTextSection";
import Seo from "../../components/Seo";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";
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
          imageSrc="/OKTaxis In Manchester.png"
          imageAlt="Executive Airport Transfer"
          title={
            <span className="text-3xl md:text-4xl font-bold">
              <span className="text-brand text-3xl md:text-4xl font-bold">Premier Luxury </span>
              Chauffeur
              <span className="text-brand text-3xl md:text-4xl font-bold"> and Taxi</span>
            </span>
          }

          text="OK Taxis is Manchester’s premier luxury chauffeur and taxi service, providing an unparalleled travel experience for business executives, VIPs, and discerning travellers..."
          bgColor="bg-white"
          imagePosition="right"
        />



        <ImageTextSection
          imageSrc="/Taxi To Manchester Airport.png"
          imageAlt="Executive Airport Transfer"

          title={
            <span className="text-3xl md:text-4xl font-bold">
              <span className="text-brand text-3xl md:text-4xl font-bold">Flexible Rides In</span>
              {' '} Manchester{' '}

              
            </span>
          }
          text={
            <>
              <p className="mb-3">
                Based in Manchester, OKTaxis offers 24/7 availability and flexible scheduling:
              </p>
              <div className="space-y-3">
                <div className="flex items-start text-gray-700 text-md">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-amber-100">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="flex-1">
                    Enjoy hassle-free, on-demand rides across Manchester with our flexible booking options.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-amber-100">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    Whether it’s a quick trip or a full-day hire, we adapt to your schedule and needs.
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-amber-100">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="flex-1">
                    Travel comfortably with professional drivers and modern vehicles, anytime, anywhere in Manchester.
                  </p>
                </div>
              </div>
            </>
          }
          bgColor="bg-white"
          imagePosition="left"
        />



        <ImageTextSection
          imageSrc="/Manchester Taxi Service.png"
          imageAlt="Executive Airport Transfer"
          title={
            <span className="text-3xl md:text-4xl font-bold">
              <span className="text-brand text-3xl md:text-4xl font-bold">Trusted</span>
              {' '} Taxi{' '}

              <span className="text-brand text-3xl md:text-4xl font-bold">Company</span>
            </span>
          }

          text={
            <>
              <p className="mb-2">
                We are a trusted taxi company committed to providing safe, reliable, and professional
                transportation services. With years of experience in the industry, we pride ourselves
                on punctuality, clean vehicles, and courteous drivers who prioritize your comfort.
                Whether you're heading to the airport, attending an event, or need a ride across town,
                you can count on us for a smooth and stress-free journey.
              </p>
              <Link
                href="/#herosection"
                className="mt-4 inline-flex items-center rounded-md bg-brand px-6 py-3 text-white transition-colors hover:bg-amber-600"
              >
                Book Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </>
          }
          bgColor="bg-white"
          imagePosition="right"
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
