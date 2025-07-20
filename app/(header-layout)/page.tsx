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
              Why Choose{" "}
              <span className="text-brand text-3xl md:text-4xl font-bold">OKTaxis:</span>{" "}
              Premier Luxury <span className="text-brand text-3xl md:text-4xl font-bold"> Chauffeur</span> and Taxi in{" "}
              <span className="text-brand text-3xl md:text-4xl font-bold">Manchester</span>
            </span>
          }
          text="OKTaxis is Manchester’s premier luxury chauffeur and taxi service, providing an unparalleled travel experience for business executives, VIPs, and discerning travellers."
          bgColor="bg-white"
          imagePosition="right"
        />




        <ImageTextSection
          imageSrc="/Taxi To Manchester Airport.png"
          imageAlt="Executive Airport Transfer"
          title={
            <span className="text-3xl md:text-4xl font-bold">
              <span className="text-brand text-3xl md:text-4xl font-bold">Flexible Rides In</span>{' '}
              Manchester
            </span>
          }
          text={
            <>
              <p className="mb-3">
                Based in Manchester, we offer 24/7 availability and flexible scheduling across the wider UK.
              </p>
              <div className="space-y-3 text-md text-gray-700">
                <div className="flex items-start">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="flex-1">
                    <strong>Seamless Service:</strong> Flight monitoring for delays or early arrivals, with meet-and-greet assistance for a smooth, stress-free experience.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="flex-1">
                    <strong>Transparent Pricing:</strong> Fixed, competitive rates with no surprise charges – the price you see is the price you pay.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="flex-1">
                    <strong>Premium Experience:</strong> Travel in style with our fleet of luxurious vehicles, including Mercedes, BMW, Audi sedans, and SUVs.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="flex-1">
                    <strong>Tailored for Your Needs:</strong> Customized for airport transfers, business travel, special events, hourly hire, and more.
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
                We are a trusted taxi company committed to safe, reliable, and professional transportation. With years of experience, we pride ourselves on punctuality, clean vehicles, and courteous drivers who prioritize your comfort. Whether heading to the airport, attending an event, or needing a ride across town, count on us for a smooth journey.

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
