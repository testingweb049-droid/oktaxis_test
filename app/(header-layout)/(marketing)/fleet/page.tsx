import FleetClasses from "@/components/home/fleet";
import WhyChoose from "@/components/ui/ChooseWhy";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import { homePageData } from "@/constants/homePageData";
import Seo from "../../../../components/Seo";
import { Check } from "lucide-react";

export default function Fleet() {
  const { bgImg } = homePageData.ourFleets || [];
  return (
    <>
      <Seo
        title="Our Fleet | OKTaxis Manchester Chauffeur Services"
        description="Explore OKTaxis’ premium fleet including executive sedans, spacious vans, and luxury vehicles. Impeccably maintained for every journey in Manchester and beyond."
        url="https://oktaxis.co.uk/fleet"
        image="https://oktaxis.com/og-fleet.jpg" // Replace with actual hosted image
      />

      <HeroSection2
        bgImage={bgImg.src}
        title="Our Fleet"
      />

      <Offer />

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
   
  <div className="container mx-auto px-4 max-w-7xl">

      
       

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
