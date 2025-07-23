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
import Seo from "../../../../../components/Seo";
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
        title="Reliable Manchester Airport Transfers & Executive Chauffeur Services"
        description={
          <>
            Looking for dependable <strong>Manchester airport transfers</strong>? At OKTaxis, we specialize in premium <strong>airport taxi Manchester</strong> services across Manchester, Liverpool, and the UK. Whether you're arriving at Manchester Airport (MAN) or heading to Liverpool John Lennon Airport, our professional chauffeurs ensure a luxurious, punctual journey. With real-time flight tracking, meet-and-greet service, and a fleet of executive vehicles, we make airport travel effortless for business professionals, families, and tourists.
            <br /><br />
            As a trusted <strong>airport taxi Manchester</strong> provider, we've served thousands of passengers with 5-star rated transfers. Book now for fixed rates, no hidden fees, and ultimate comfort.
            <br /><br />
            <div className="mb-8">
              <Link href="#booking-form" className="text-brand underline font-semibold">Book Your Transfer</Link>{" "}
              |{" "}
              <Link href="/contact" className="text-brand underline font-semibold">Contact Us</Link>
            </div>
          </>
        }
      />

      <Offer />
      <ImageTextSection
        imageSrc="/Manchester Taxis.png"
        imageAlt="Executive"
        title={
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Executive <span className="text-brand">Airport</span> Transfer Services
          </h2>
        }
        text={
          <>
            <p className="mb-4">
              Travel in style with our Manchester airport taxi options. We offer 24/7 transfers to and from major UK airports, including Manchester, Liverpool, Leeds Bradford, Birmingham, and London hubs.
            </p>
            <h3 className="text-xl md:text-2xl font-bold mt-6 mb-2">
              Seamless Pickups and Drop-Offs
            </h3>
            <p>
              Our chauffeurs track your flight in real-time for hassle-free airport transfers Manchester. You'll be greeted by name, assisted with luggage, and escorted to a premium vehicle. Ideal for early mornings or late nights—count on us for punctuality and comfort.
            </p>
          </>
        }
        bgColor="bg-white"
        imagePosition="left"
      />
      <ImageTextSection
        imageSrc="/images/airport-transfer.png"
        imageAlt="Stress-Free Travel Experience"
        title={
           
          <h3 className="text-3xl md:text-4xl font-bold">
            Seamless {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Pickups and Drop-Offs</span>{' '}

          </h3>
        }
        text="Our chauffeurs track your flight in real-time for hassle-free airport transfers Manchester. You'll be greeted by name, assisted with luggage, and escorted to a premium vehicle. Ideal for early mornings or late nights—count on us for punctuality and comfort.

"
        bgColor="bg-white"
        imagePosition="right"
      />

      <ImageTextSection
        imageSrc="/images/mercedes.png"
        imageAlt="Stress-Free Travel Experience"
        title={
          <span className="text-3xl md:text-4xl font-bold">
            Stress-Free Travel {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Experience</span>{' '}

          </span>
        }
        text="Say goodbye to travel worries. Our fleet includes spacious sedans and SUVs with complimentary Wi-Fi, refreshments, and climate control. Fixed pricing means no traffic surcharges. We also handle transfers to Liverpool John Lennon Airport and beyond, ensuring a smooth journey wherever you land in the UK.
"
        bgColor="bg-white"
        imagePosition="left"
      />
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
