import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import Image from "next/image";
import {
  FaRoute,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUserTie,
  FaCarSide,
} from "react-icons/fa";
import Seo from "../../../../../components/Seo";
export default function HourlyChauffeur() {
  return (
    <>
      <Seo
        title="Hourly Chauffeur Service in Manchester | OKTaxis"
        description="Book flexible hourly chauffeur services in Manchester with OKTaxis. Perfect for errands, meetings, or city tours. Affordable rates, luxury cars, and professional drivers."
        url="https://oktaxis.co.uk/services/hourly-chauffeur"
        image="https://oktaxis.co.uk/images/hourly-service.png"
      />
      <HeroSection2
        bgImage="/images/hourly-service.png"
        title="Flexible Hourly Chauffeurs for Business or Leisure Travel"
        // description="Need on-demand travel? With OKTaxis, enjoy flexible hourly chauffeur services ideal for city errands, business meetings, or leisurely trips. Whether you're navigating Manchester airport or planning a day around town, our experienced chauffeurs ensure you travel efficiently in comfort and style."
      />
      <Offer />
      <ImageTextSection
        imageSrc="/stadium transfers to manchester united.webp"
        imageAlt="Hourly chauffeur service"
        title="Premium Hourly Chauffeur Service"
        text="Our flexible hourly chauffeur service allows you to hire a luxury vehicle and driver by the hour or day. Simply tell us your schedule and destinations, and we'll handle the driving. This service is ideal for day-long business meetings, shopping trips, city tours or any occasion where you need a dedicated chauffeur on demand. You avoid parking, directions or waiting – we're at your disposal to take you anywhere on your itinerary."
        bgColor="bg-white"
        imagePosition="left"
      />

      <ImageTextSection
        imageSrc="/Manchester Airpot.webp"
        imageAlt="Chauffeur convenience"
        title="Ultimate Convenience & Privacy"
        text="Enjoy the ultimate convenience and privacy with our chauffeur-by-the-hour option. Our professional drivers arrive in full uniform, opening doors and ensuring a seamless experience from start to finish. Vehicle interiors are stocked with amenities like bottled water, tissues, and charging ports. Whether you need a few hours or a full day, OK Taxis gives you total flexibility and peace of mind, all backed by our punctuality guarantee and premium service standards."
        bgColor="bg-white"
        imagePosition="right"
      />

      <section className="flex flex-col gap-12 md:flex-row items-start justify-between container px-4 py-32">
        {/* Left side image */}
        <div className="md:w-1/2 relative h-64 w-full md:h-80">
          <Image
            src="/Hourly Serives in Manchester.jpg"
            alt="Car service in Manchester"
            width={600}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: `600px`,
              maxHeight: `400px`,
            }}
            className="rounded-lg shadow-xl object-cover"
            priority={false}
          />
        </div>

        {/* Right side content */}
        <div className="flex flex-col space-y-6 md:w-1/2">
          <div className="flex items-start gap-3">
            <FaCarSide className="text-brand mt-1" />
            <h2 className="text-3xl text-brand font-semibold">
              Affordable Hourly Rates for Quality Car Services In Manchester UK
            </h2>
          </div>
          <ul className="space-y-4 text-gray-700 text-lg">
            <li className="flex items-start gap-3">
              <FaMoneyBillWave className="mt-1 text-brand" />
              <span>
                <strong>Economy Car:</strong> £40 per hour — Reliable and
                budget-friendly transportation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaMoneyBillWave className="mt-1 text-brand" />
              <span>
                <strong>Executive Car:</strong> £60 per hour — Comfortable and
                stylish rides for business or leisure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaMoneyBillWave className="mt-1 text-brand" />
              <span>
                <strong>Executive Premium Car:</strong> £80 per hour — Premium
                vehicles for a superior travel experience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaMoneyBillWave className="mt-1 text-brand" />
              <span>
                <strong>Luxury Van:</strong> £120 per hour — Spacious and
                luxurious vans perfect for group travel.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <FleetClasses />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand mb-12">
            Hourly Chauffeur Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaRoute className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Customized Itinerary
              </h3>
              <p className="text-gray-600">
                Change plans on the go without worrying about timing or routes.
                Our chauffeurs adapt to your schedule.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Stops</h3>
              <p className="text-gray-600">
                Run errands, attend meetings or make stops – our service is
                truly door-to-door.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMoneyBillWave className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Hidden Fees</h3>
              <p className="text-gray-600">
                Hourly hire comes with transparent pricing, so you know the cost
                of each hour upfront.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaUserTie className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Professional Service
              </h3>
              <p className="text-gray-600">
                Enjoy complimentary refreshments, Wi-Fi and all the comforts of
                our luxury fleet throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
