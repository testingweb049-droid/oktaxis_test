import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import Image from "next/image";
import Link from "next/link";
import {
  FaWifi,
  FaCoffee,
  FaCar,
  FaClock,
  FaBell,
  FaSuitcase,
  FaHeadset,
  FaStar,
} from "react-icons/fa";
import { Check } from "lucide-react";
import Seo from "@/components/Seo";
export default function AirportTransfer() {
  return (
    <>
      <Seo
        title="Manchester Airport Transfers | Reliable Taxi & Chauffeur Service"
        description="Book seamless Manchester airport transfers with OKTaxis. Enjoy executive chauffeur service, flight tracking, and 24/7 pickups from Manchester, Liverpool, and UK airports. Stress-free travel starts here."
        url="https://oktaxis.co.uk/services/airport-transfer"
        image="https://oktaxis.co.uk/images/airport-transfer.png"
      />

      <HeroSection2
        bgImage="/images/airport-transfer.png"
        title="Premier Chauffeur Service at Manchester Airport for Luxury Transfers"

      />

      <Offer />
      <ImageTextSection
        imageSrc="/chauffeur.jpg"
        imageAlt="Manchester Airport Transfers"
        imagePosition="left"
        headingAs="h2"

        text={
          <>
            <p>
              When you need a reliable chauffeur service at Manchester Airport, <strong className="text-brand underline"> OKTaxis</strong> stands out for its luxury, professionalism, and trust, making every journey smooth and stress-free. With years of experience chauffeuring business leaders, VIPs, and families since 2007, we turn hectic airport trips into calm experiences.
            </p>
            <p className="mt-4">
              Based at 0B Portway, Wythenshaw, Manchester, we handle the third-busiest hub in the UK, serving 27 million passengers to 200 destinations with exceptional care. Our 5 stars on Google reflect our commitment to excellence, ensuring confidence for corporate or leisure travellers.
            </p>
          </>
        }

      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          Our licensed chauffeurs, trained with advanced driving credentials, deliver elite standards with security and discretion — perfect for overseas delegations or high-profile clients. Unlike non-compliant providers risking fines or reputational damage, we’re fully compliant with regulations, insurance, and GDPR-assured data protection.


        </p>
        <p className=" text-lg  text-gray-700 pb-4 leading-relaxed">
          Clients like Sully from Derby and Jane praise our courteous, immaculate presentation, while our personalised care — including female chauffeurs on request — makes us the best chauffeur service at Manchester Airport. Book via <strong className="text-brand underline">OKTaxis.co.uk</strong>  or call <strong className="text-brand"> +44 7788 710290</strong> for tailored airport transfers in Manchester.




        </p>

        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Trusted Expertise: Over 15 years of professional service with 5-star ratings.",
            "Safe and Discreet: Licensed, insured drivers with privacy-first options.",
            "Personalised Service: Bespoke transfers for business or family needs.",
            "Compliant Operations: Full adherence to regulations for peace of mind.",
            "Local Knowledge: Navigating Northwest England for smooth, timely rides."
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
      <ImageTextSection
        imageSrc="/images/airport-transfer.png"
        imageAlt="Manchester Airport Transfers"
        imagePosition="right"
        headingAs="h2"
        title={
          <>
            Simple Steps to Book a Luxury Chauffeur at{" "}
            <span className="text-brand">Manchester Airport</span>
          </>
        }
        text={
          <>
            <p>
              Securing a luxury chauffeur service at Manchester Airport couldn't be simpler or more reassuring, especially for those juggling packed schedules and needing dependable airport transfers Manchester. From my long history managing high-end executive rides, I always advise kicking off with our user-friendly online platform at OKTaxis—just key in your flight info, terminal, and endpoint for a prompt quote.
            </p>
            <p className="mt-4">
              This approach shines during rush periods at this bustling UK hub with its massive passenger volumes. Our attentive staff promises on-time collections, easing any post-flight fatigue.
            </p>
          </>
        }

      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          Dial +44 7788 710290 or drop a line to <strong className="text-brand underline">info@oktaxis.co.uk </strong> for bespoke setups like varied routes or special offers across Greater Manchester.


        </p>
        <p className=" text-lg  text-gray-700 pb-4 leading-relaxed">
          Operating from our Wythenshawe spot at 0B Portway, Manchester, we've streamlined arrangements for professionals and loved ones, featuring live flight tracking to adapt to any shifts. This thoughtful strategy earns loyalty, as mirrored in our strong 4.9 Google feedback. We aim to make your entire experience straightforward and utterly reliable.




        </p>

        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Quick Online Quote: Instant, clear pricing options.",
            "Flexible Booking Options: Hourly or return hires.",
            "Personal Support Team: Phone advice for preferences.",
            "Secure and Simple Process: GDPR-safe easy bookings.",
            "Real-Time Adjustments: Tracking for smooth arrivals."
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


      <ImageTextSection
        imageSrc="/Manchester Taxis.png"
        imageAlt="Executive"
        imagePosition="left"
        headingAs="h2"

        title={
          <>
            Key Benefits of <span className="text-brand">Executive Transfers</span> with Safety and Discretion
          </>
        }
        text={
          <>
            <p>
              Selecting executive airport transfers Manchester puts a premium on safety and discretion, vital for VIPs and business pros at Manchester Airport. Through my transport insights gained since 2007, our credentialed licensed chauffeurs with security expertise set elite benchmarks, dodging pitfalls from unlicensed outfits like penalties or legal troubles.
            </p>
            <p className="mt-4">
              Strict alignment with regulations, insurance, and protection protocols safeguards your standing and personnel.
            </p>
          </>
        }

      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          That's why top finance entities count on our subtle handling. We excel in tense scenarios, from private aircraft links to nocturnal drives, with quiet modes preserving confidentiality.

        </p>
        <p className=" text-lg  text-gray-700 pb-4 leading-relaxed">

          Bolstered by thorough preparation and tools like contact masking, we guarantee total serenity, establishing us as the top chauffeur service at Manchester Airport.


        </p>

        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Top Safety Features: Insured vehicles, skilled drivers.",
            "Discreet Handling: Privacy modes for comfort.",
            "Compliant Operations: Full licensing, data safeguards.",
            "Personalised Security: Female drivers available.",
            "Proven Trust: 4.9 ratings for reliability."
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
      <ImageTextSection
        imageSrc="/images/airport-transfer.png"
        imageAlt="Stress-Free Travel Experience"
        imagePosition="right"
        headingAs="h3"
        title={
          <>
            Exclusive <span className="text-brand font-bold">Chauffeur Transfers</span>{" "}
            <span className="text-brand font-bold">from Manchester Airport</span> to Key Cities
          </>
        }
        text={
          <>
            <p>
              Our premium chauffeur transfers from Manchester Airport to places like Leeds and Liverpool blend elegance with efficiency, perfect for work or relaxation. Based on my direct dealings with global teams, we master Northwest pathways, sidestepping morning jams for a brisk 30-minute centre reach.
            </p>
            <p className="mt-4">
              Extending to areas like Stockport and Cheshire, we connect seamlessly to highlights such as Grand Theatre or Albert Dock. This dependable timing fosters assurance in each outing. For elite excursions to Royal Armouries Museum or Beatles Story, our licensed crew ensures private rides that uphold reputations.
            </p>
          </>
        }

      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          Accolades from Ravi celebrate our route savvy in BMWs for corporate events, making trips truly pleasant. With mapping aids and online tools, we manage exact timings for all flights. As specialists in airport transfers Leeds to Manchester, we offer outstanding worth.


        </p>


        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Tailored City Routes: Straight to Leeds, Liverpool.",
            "Peak Time Expertise: Avoid crowds for speed.",
            "Landmark Stops: Dock or museum inclusions.",
            "Regional Reach: High Peak, Saddleworth covered.",
            "Trusted Journeys: Pro handling for all."
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
      <ImageTextSection
        imageSrc="/images/mercedes.png"
        imageAlt="Luxury Vehicles and Meet & Greet"
        imagePosition="left"
        headingAs="h2"
        title={
          <>
            Luxury Vehicles and{" "}
            <span className="text-brand">Meet &amp; Greet</span> for Smooth{" "}
            <span className="text-brand">Airport Journeys</span>
          </>
        }
        text={
          <>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Dive into luxury vehicles and meet-and-greet at Manchester Airport for flawlessly smooth airport journeys, shifting landings into calm welcomes. Having driven in pristine Mercedes E-Class with plush interiors, I've observed how our elite selections grant ample space and relief after travels. Our V-Class variants include seating setups and chillers, suited for teams.


              </p>
              <p>
                Featuring a free 60-minute wait plus perks like water, we cut down on hassles. Our polished meet-greet involves a warm driver at arrivals with iPad signage, aiding with bags and guiding to your ride.
              </p>
            </div>

            {/* ✅ Feature Highlights */}

          </>
        }
      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          My know-how in flight ops syncs perfectly via supports like Signature, flexing for changes. Cleaned cabins with kid seats and papers bring extra warmth. This fine-tuned care sets us apart in executive car service.
        </p>

        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Premium Meet Service: Signs, luggage help.",
            "Free Waiting Time: Hour post-landing grace.",
            "Comfortable Features: Space, chillers, clean.",
            "Vehicle Choices: Mercedes E-Class, V-Class.",
            "Logistics Mastery: Monitoring for precision."
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
      <ImageTextSection
        imageSrc="/images/hourly-service.png"            // <- swap to any fleet image you like
        imageAlt="Premium Chauffeur Fleet in Manchester"
        imagePosition="right"
        headingAs="h2"

        title={
          <>
            Our Premium in Manchester —{" "}
            <span className="text-brand">Fleet & Easy Booking</span> for{" "}
            <span className="text-brand">Chauffeur Service</span> in Manchester
          </>
        }
        text={
          <>
            <p>
              Uncover our premium fleet for chauffeur service in Manchester, pairing high-end rides with hassle-free booking for peak convenience. Options like Mercedes E-Class and estates boast roomy storage for gear, kept impeccably through regular upkeep. Since launching in 2007, I've guided fleets radiating class and polish, securing 4.9 stars on FreeIndex. Complete with sanitisers, refreshments, and sharply dressed drivers, each trip exudes warmth and sophistication.

            </p>

          </>
        }

      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          Booking eases via <strong className="text-brand underline">OK Taxis </strong> GET PRICES for straightforward distance or hourly fees. My routing skills dodge spots like Junction 21 for traffic-free paths, adding live updates for accuracy. Slip in stops for basics like groceries, with our sharp crew handling last details. This leads to happy faces and unforgettable ventures.

        </p>


        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Varied Fleet Selection: Luxury models for sizes.",
            "Effortless Online Booking: Quick site quotes.",
            "Timely Route Planning: Navigation skips delays.",
            "Thoughtful Extras: Tracking, custom stops.",
            "Expert Driver Support: Qualified for style."
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
      <FleetClasses />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key Features of Our <span className="text-brand">Manchester Airport Chauffeur Services</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Complimentary Waiting */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaClock className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Complimentary Waiting</h3>
              <p className="text-gray-600">
                Generous free wait time for delayed flights—essential for busy airports like Manchester.
              </p>
            </div>

            {/* Luggage Assistance */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaSuitcase className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Luggage Assistance</h3>
              <p className="text-gray-600">
                Chauffeurs handle all baggage, getting you settled quickly.
              </p>
            </div>

            {/* 24/7 Availability */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaCar className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
              <p className="text-gray-600">
                Round-the-clock service for any flight to Manchester, Liverpool, or other UK airports.
              </p>
            </div>

            {/* Customized Rides */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customized Rides</h3>
              <p className="text-gray-600">
                Tailored for weddings, corporate events, stadium transfers, or city tours in Manchester.
              </p>
            </div>
          </div>

          {/* Summary Text Below Grid */}
          <p className="text-center text-gray-700 text-lg mt-12 max-w-3xl mx-auto">
            These perks ensure every ride is memorable and stress-free.
          </p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Benefits of Booking <span className="text-brand">Airport Transfers with OKTaxis</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Time-Saving */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
              <p className="text-gray-700">
                Avoid queues with direct meet-and-greet and pre-booked rides.
              </p>
            </div>

            {/* Cost-Effective */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Cost-Effective</h3>
              <p className="text-gray-700">
                Competitive fixed rates beat surge pricing from apps.
              </p>
            </div>

            {/* Safety First */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-700">
                Fully licensed chauffeurs and vehicles with GPS tracking.
              </p>
            </div>

            {/* Eco-Friendly Options */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly Options</h3>
              <p className="text-gray-700">
                Hybrid and electric vehicles like the Tesla Model S for sustainable travel.
              </p>
            </div>

            {/* Wide Coverage */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
              <p className="text-gray-700">
                Transfers from Manchester to Old Trafford, city centers, or nationwide destinations.
              </p>
            </div>

            {/* Business Travelers */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Ideal for Business Travelers</h3>
              <p className="text-gray-700">
                Our executive airport transfer Manchester service includes productivity features like Wi-Fi for on-the-go work.
              </p>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
