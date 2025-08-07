import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import BusImage from "@/assets/vehicles/xlvan.jpg";
import {
  FaLandmark,
  FaCity,
  FaMapMarkedAlt,
  FaMountain,
  FaCarSide,
} from "react-icons/fa";
import ImageTextSection from "@/components/ui/ImageTextSection";
import FleetClasses from "@/components/home/fleet";
import Image from "next/image";
import Seo from "../../../../../components/Seo";
export default function CityTour() {
  return (
    <>
      <Seo
        title="Manchester & Liverpool City Tours | Luxury Chauffeur Sightseeing"
        description="Explore Manchester, Liverpool, and nearby UK cities with OKTaxis’ premium city tour service. Enjoy bespoke itineraries, executive cars, and expert local chauffeurs."
        url="https://oktaxis.co.uk/services/city-tour"
        image="https://oktaxis.co.uk/city.jpg"
      />
      <HeroSection2
        bgImage="/city.jpg"
        title="Explore Manchester & Liverpool with a Chauffeured City Tour"
      // description="Explore the best of the North with our exclusive city tours of Manchester, Liverpool, and the surrounding areas. Our expert chauffeurs will take you to iconic landmarks as well as hidden gems, providing a rich and authentic local experience in complete comfort. Ideal for visitors arriving via Manchester Airport, we also offer seamless chauffeur services to and from London, Birmingham, and Leeds, ensuring your journey is smooth and stylish every step of the way."
      />
      <Offer />
      <ImageTextSection
        imageSrc="/city.jpg"
        imageAlt="Manchester city tour"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">
            Explore Manchester in  {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Luxury</span>{' '}

          </span>
        }
        text="Discover Manchester in executive comfort with OKTaxis’ private city tours. From first-time visitors to locals, our luxury chauffeur-driven tours visit iconic spots like Old Trafford, Manchester Cathedral, and the Northern Quarter. With bespoke itineraries tailored to your interests, our knowledgeable chauffeurs make every tour informative and enjoyable."
        bgColor="bg-white"
        imagePosition="left"
      />

      <ImageTextSection
        imageSrc="/Manchester To London.png"
        imageAlt="Liverpool city tour"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">
            Excursions Beyond {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Manchester</span>{' '}

          </span>
        }
        text="Venture to Liverpool, Chester, Leeds, York, or Sheffield with our guided city tours. Explore the Beatles’ legacy, Chester’s Roman walls, or the Peak District’s natural beauty in a premium Mercedes E-Class or Tesla Model S. Enjoy complimentary Wi-Fi, refreshments, and a professional chauffeur for a five-star sightseeing experience."
        bgColor="bg-white"
        imagePosition="right"
      />

      <section className="flex flex-col gap-12 md:flex-row items-start justify-between container px-4 py-32">
        {/* Left side image */}
        <div className="md:w-1/2 relative h-64 w-full md:h-80">
          <Image
            src="/Manchester.png"
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
            <FaCarSide className="text-brand text-3xl mt-1" />
            <h2 className="text-3xl  font-semibold leading-snug">

              {
                <span className="text-3xl md:text-4xl font-bold">
                  Benefits of {' '}
                  <span className="text-brand text-3xl md:text-4xl font-bold"> Our</span>{' '}
                  Long-Distance  {' '}
                  <span className="text-brand text-3xl md:text-4xl font-bold">Chauffeur Service</span>{' '}
                </span>
              }
            </h2>
          </div>
          <ul className="space-y-6 text-gray-700 text-lg">
            <li className="leading-relaxed">
              <strong>Privacy and Comfort:</strong>
              <br />
              Unlike crowded trains or buses, our executive car service Manchester offers a private, distraction-free environment to relax or work during your journey.
            </li>
            <li className="leading-relaxed">
              <strong>Direct and Efficient Travel:</strong>
              <br />
              Avoid public transport delays with our chauffeurs’ direct routes, ensuring prompt arrivals for Manchester airport transfers or city tours.
            </li>
            <li className="leading-relaxed">
              <strong>Luggage Assistance:</strong>
              <br />
              Our chauffeurs handle your bags with care, loading and unloading to ensure a stress-free trip.
            </li>
            <li className="leading-relaxed">
              <strong>Door-to-Door Convenience:</strong>
              <br />
              Skip the hassle of stations or airports with our bespoke service, picking you up and dropping you off exactly where you need to be.
            </li>
          </ul>
        </div>

      </section>

      <FleetClasses />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center  mb-12">
            {
              <span className="text-3xl md:text-4xl font-bold">
                Our Tour  {' '}
                <span className="text-brand text-3xl md:text-4xl font-bold">Services</span>{' '}

              </span>
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaLandmark className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Manchester Sightseeing
              </h3>
              <p className="text-gray-600">
                Visit Old Trafford, Manchester Cathedral, The Lowry, and the Northern Quarter in VIP comfort.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaCity className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Nearby City Excursions
              </h3>
              <p className="text-gray-600">
                Travel seamlessly to Liverpool, Chester, Leeds, York, or Sheffield in luxury vehicles.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMapMarkedAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
               Bespoke Itineraries
              </h3>
              <p className="text-gray-600">
                Customize your tour with multiple stops and flexible pickup/drop-off locations.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMountain className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Nature & Heritage Tours
              </h3>
              <p className="text-gray-600">
                Escape to the Peak District, Lake Windermere, or historic Cheshire villages for a serene getaway.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
