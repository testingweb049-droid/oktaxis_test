import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import Image from "next/image";
import Link from "next/link";
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
        title="Hourly Chauffeur Manchester | Luxury Hire by the Hour or Day
"
        description="Book flexible hourly chauffeur in Manchester with OKTaxis. Enjoy luxury vehicles, professional drivers, and transparent pricing for business, leisure, or events. Free cancellation up to 48 hours."
        url="https://oktaxis.co.uk/services/hourly-chauffeur"
        image="https://oktaxis.co.uk/images/hourly-service.png"
      />
      <HeroSection2
        bgImage="/images/hourly-service.png"
        title="Flexible Hourly Chauffeur in Manchester for Business & Leisure"

      />


      <Offer />
      <ImageTextSection
        imageSrc="/images/hourly-service.png"
        imageAlt="Hourly Chauffeur Manchester"
        title={
          <h2 className="text-3xl md:text-4xl font-bold">
            Reliable <span className="text-brand">Hourly Chauffeurs</span> in Manchester
          </h2>
        }
        text={
          <>
            <p className="mb-4">
              Searching for reliable <strong>hourly chauffeur Manchester</strong> services? OKTaxis offers premium <strong>Manchester hourly chauffeur service</strong> tailored to your schedule. Whether you need a chauffeur by the hour for meetings, city tours, shopping, or full-day hires, our executive fleet and professional drivers ensure luxury and convenience across Manchester and the UK.
            </p>
            <p className="mb-6">
              As a leading provider of <strong>luxury chauffeur hire Manchester</strong>, we specialize in on-demand rides with no hidden fees. Perfect for corporate events, weddings, stadium transfers, or sightseeing—book now for punctual, stress-free travel.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#booking-form"
                className="inline-block bg-brand hover:bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Book Your Hourly Chauffeur
              </Link>
              {/* <Link
                href="/contact"
                className="inline-block text-brand underline font-semibold py-3 px-4"
              >
                Contact Us
              </Link> */}
            </div>
          </>
        }
        bgColor="bg-white"
        imagePosition="right"
      />

      <ImageTextSection
        imageSrc="/stadium transfers to manchester united.png"
        imageAlt="Hourly chauffeur service"
        title=
        {

          <h2 className="text-3xl md:text-4xl font-bold">
            Our Luxury Hourly  {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Chauffeur</span>{' '}
            Services in <span className="text-brand text-3xl md:text-4xl font-bold">Manchester</span>{' '}
          </h2>
        }
        text="Discover the convenience of Manchester hourly chauffeur service with OKTaxis. We provide on-demand chauffeurs for any occasion, from business meetings to leisure outings.
"
        bgColor="bg-white"
        imagePosition="left"
      />

      <ImageTextSection
        imageSrc="/Manchester Airpot.png"
        imageAlt="Chauffeur convenience"
        title=
        {

          <h3 className="text-3xl md:text-4xl font-bold">
            Book by the Hour for {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold"> Ultimate Flexibility</span>{' '}

          </h3>
        }
        text="Hire a dedicated chauffeur for as little as one hour or extend to a full day. Ideal for multi-stop trips, corporate events, or exploring Manchester's attractions like Old Trafford or the city center. Our drivers handle navigation, parking, and logistics, letting you focus on what matters.
"
        bgColor="bg-white"
        imagePosition="right"
      />

      <section className="flex flex-col gap-12 md:flex-row items-start justify-between container px-4 py-32">
        {/* Left side image */}
        <div className="md:w-1/2 relative h-64 w-full md:h-80">
          <Image
            src="/Hourly Serives in Manchester.png"
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
            {/* <FaCarSide className="text-brand mt-1" /> */}
            <h3 className="text-3xl md:text-4xl font-bold">
              Premium Features  for a{' '}
              <span className="text-brand text-3xl md:text-4xl font-bold"> Seamless Experience</span>{' '}

            </h3>

          </div>
          <p className="text-lg text-gray-600 mb-8">
            Enjoy door-to-door service in pristine vehicles. With free cancellation up to 48 hours and wait-and-return options, our luxury chauffeur hire Manchester is designed for busy professionals and tourists alike. Vehicles are equipped for comfort, making long hours feel effortless.

          </p>
          <div>
            <Link
              href="/contact"
              className="inline-block bg-brand text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition"
            >
              Get a Free Quote Now
            </Link>
          </div>
          {/* <ul className="space-y-4 text-gray-700 text-lg">
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
          </ul> */}
        </div>
      </section>

      <FleetClasses />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-3xl md:text-4xl font-bold">
              Key Benefits of Our Manchester Hourly{' '}
              <span className="text-brand text-3xl md:text-4xl font-bold">Chauffeur Service</span>
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/Group 7.png"
                  alt="Customized itinerary"
                  width={600}
                  height={400}
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customized Itineraries</h3>
              <p className="text-gray-600">
                Change plans mid-journey—our chauffeurs adapt instantly to your evolving schedule.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/Group 5.png"
                  alt="Multiple stops"
                  width={600}
                  height={400}
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Stops & Waits</h3>
              <p className="text-gray-600">
                Perfect for shopping, appointments, or events with built-in flexibility at every step.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/Group 6.png"
                  alt="Transparent pricing"
                  width={600}
                  height={400}
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Hidden Fees</h3>
              <p className="text-gray-600">
                Upfront hourly pricing ensures complete transparency and peace of mind from booking to drop-off.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/Group 8.png"
                  alt="Concierge service"
                  width={600}
                  height={400}
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Concierge Service</h3>
              <p className="text-gray-600">
                Chauffeurs in uniform offer door-opening, luggage handling, and local tips with professionalism.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/Group 10.png"
                  alt="Complimentary perks"
                  width={600}
                  height={400}
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complimentary Perks</h3>
              <p className="text-gray-600">
                Wi-Fi, bottled water, tissues, and more—all to make your ride more relaxing and productive.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/Group 9.png"
                  alt="UK-wide chauffeur service"
                  width={600}
                  height={400}
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
              <p className="text-gray-600">
                Available across Manchester and UK-wide. Ideal for local errands or long-distance luxury travel.
              </p>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto text-center text-gray-700 text-lg">
            <p>
              For business users, our service supports productivity on the move—perfect for executives
              needing reliable, luxury chauffeur hire in Manchester.
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
