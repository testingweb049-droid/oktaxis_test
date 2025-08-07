import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import {
  FaClock,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaBriefcase,
} from "react-icons/fa";
import Seo from "../../../../../components/Seo";
export default function CityCenter() {
  return (
    <>
      <Seo
        title="Taxi Manchester City Centre | 24/7 Executive City Transfers"
        description="Book premium taxis in Manchester city centre with OKTaxis. Enjoy fixed rates, executive cars, and fast pickups for shopping, business or night outs."
        url="https://oktaxis.co.uk/services/city-centre"
        image="https://oktaxis.co.uk/Luxury%20Chauffeur%20Service%20(2).webp"
      />
      <HeroSection2
        bgImage="/Luxury Chauffeur Service (2).webp"
        title="Luxury City Centre Taxi Services in Manchester"
      // description="Whether you're having a laid-back shopping trip or a night out in central Manchester, avoid the hassle of driving and public transport. Reserve your taxi ahead of time online or whenever you need through the OKTaxis website. Budget-friendly taxis available whenever you need them."
      />
      <Offer />
      <ImageTextSection
        imageSrc="/Luxury Chauffeur Service (2).png"
        imageAlt="Manchester city taxi"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">
            Premium City Centre{' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Transfers</span>{' '}

          </span>
        }
        text="For short trips across Manchester, our luxury city transfers Manchester outshine standard cabs. Skip crowded buses or unreliable taxis—book an OKTaxis sedan or SUV for a direct, chauffeur-driven ride to MediaCityUK, Manchester Convention Centre, or AO Arena. Our local expertise ensures a smooth, efficient journey through the city centre."
        bgColor="bg-white"
        imagePosition="left"
      />

      <ImageTextSection
        imageSrc="/Taxi in Manchester City Centre (1).png"
        imageAlt="Comfortable city taxi"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">
            Effortless and  <span className="text-brand text-3xl md:text-4xl font-bold">Comfortable</span>{' '}  City{' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Travel</span>{' '}

          </span>
        }

        text="Enjoy door-to-door Manchester city taxi service in a cleaner, quieter, and more comfortable vehicle than a typical cab. Our friendly chauffeurs assist with luggage or shopping bags, making every ride relaxing. Available 24/7 for late-night airport transfers, early hotel pickups, or daytime outings, our fixed-rate transfers from Piccadilly to Deansgate or beyond ensure transparency and comfort."
        bgColor="bg-white"
        imagePosition="right"
      />
      <FleetClasses />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            
              {
          <span className="text-3xl md:text-4xl font-bold">
            Why Choose Our{' '}
            <span className="text-brand text-3xl md:text-4xl font-bold"> City Taxis Services</span>{' '}

          </span>
        }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaClock className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Pickups</h3>
              <p className="text-gray-600">
                A pristine executive car arrives at your location in minutes, 24/7.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMapMarkedAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Knowledgeable Chauffeurs
              </h3>
              <p className="text-gray-600">
                 Expert navigation through Manchester’s traffic and roadworks for the fastest routes.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMoneyBillWave className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Fixed Fares</h3>
              <p className="text-gray-600">
                No surprises—just clear, upfront quotes for rides from Piccadilly to Deansgate or any city destination.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaBriefcase className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Ideal for Business & Leisure
              </h3>
              <p className="text-gray-600">
                 Perfect for trips between hotels, restaurants, offices, or events in Manchester.

              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
