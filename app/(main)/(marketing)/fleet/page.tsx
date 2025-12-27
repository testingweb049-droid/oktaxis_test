import { Metadata } from "next";
import FleetClasses from "@/components/home/fleet";
import WhyChoose from "@/components/ui/ChooseWhy";
import OfferSection from "@/components/ui/OfferSection";
import HeroSection2 from "@/components/ui/HeroSection2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import { homePageData } from "@/constants/homePageData";
import { Check } from "lucide-react";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Our Fleet | OKTaxis Manchester Chauffeur Services",
  description:
    "Explore OKTaxis' premium fleet including executive sedans, spacious vans, and luxury vehicles. Impeccably maintained for every journey in Manchester and beyond.",
  pageUrl: "/fleet",
  keywords: [
    "fleet manchester",
    "luxury car fleet",
    "executive car fleet",
    "chauffeur fleet",
    "vehicle fleet",
  ],
});

export default function Fleet() {
  const { bgImg } = homePageData.ourFleets || [];
  return (
    <>  
      <HeroSection2
        bgImage={bgImg.src}
        title="Our Fleet"
      />

      <OfferSection />
      <ImageTextSection
        imageSrc="/chauffeur.jpg"
        imageAlt="Manchester Airport Transfers"
        imagePosition="left"
        headingAs="h2"

        text={
          <>
            <p>
              Here at OKTaxis, we focus on giving you dependable, custom trips right across the UK. We cover places like Manchester, Liverpool, London, Leeds, Birmingham, and Edinburgh, where our drivers really know the roads well. We make sure you're on time with live tracking and round-the-clock help on +44 7788 710290 or info@oktaxis.co.uk. Safety and comfort come first, based on our long track record of reliable service.
            </p>
            <p className="mt-4">
              We give you choices that suit any budget, whether you're going alone or with mates. Our cars come with Wi-Fi, spots to charge your phone, and plenty of room for bags. Our qualified drivers can share tips on the best ways to go and what's good locally. You get fair prices with no hidden extras—just straightforward, easy travel.
            </p>
          </>
        }

      />

      <ImageTextSection
        imageSrc="/Taxi In Manchester Taxi Service.png"
        imageAlt="Executive Airport Transfer"
        title={
          <span className="text-3xl md:text-4xl font-bold">
            Our{" "}
            <span className="text-brand text-3xl md:text-4xl font-bold">
              Luxury{" "}
            </span>{" "}
            Fleet at{" "}
            <span className="text-brand text-3xl md:text-4xl font-bold">
              OKTaxis
            </span>
          </span>
        }
        text={
          <>
            <p>
              Our fleet mixes comfort, good looks, and smart running for all
              sorts of travellers. Every car gets strict checks to keep it super
              safe. From green hybrids to big vans, they're spot on for busy
              city streets in London or the ups and downs in Edinburgh. We keep
              things fresh by listening to what you say and adding new bits.
            </p>
            <p className="mt-4">
              We match what you want, be it cheap or posh, in our selection.
              Here's the key stuff that makes it great:
            </p>


          </>
        }
        bgColor="bg-white"
        imagePosition="right"
      />

      <div className="w-full max-w-7xl mx-auto px-4">




        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Roomy insides for comfy long trips.",
            "Top safety kit like crash avoidance.",
            "Green choices that cut emissions.",
            "Extras you can add, like baby seats.",

          ].map((item, i) => (
            <li key={i} className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="ml-3 text-base md:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <WhyChoose />
      <FleetClasses />
    </>
  );
}
