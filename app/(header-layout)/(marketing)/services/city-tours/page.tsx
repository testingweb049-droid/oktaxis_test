import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import BusImage from "@/assets/vehicles/xlvan.jpg";
import { FaLandmark, FaCity, FaMapMarkedAlt, FaMountain, FaCarSide } from "react-icons/fa";
import ImageTextSection from "@/components/ui/ImageTextSection";
import FleetClasses from "@/components/home/fleet";
import Image from "next/image";

export default function CityTour() {
  return (
    <>
      <HeroSection2
        bgImage='/city.jpg'
        title="Explore Manchester & Liverpool with a Chauffeured City Tour"
        // description="Explore the best of the North with our exclusive city tours of Manchester, Liverpool, and the surrounding areas. Our expert chauffeurs will take you to iconic landmarks as well as hidden gems, providing a rich and authentic local experience in complete comfort. Ideal for visitors arriving via Manchester Airport, we also offer seamless chauffeur services to and from London, Birmingham, and Leeds, ensuring your journey is smooth and stylish every step of the way."
      />
      <Offer />
      <ImageTextSection
        imageSrc="/city.jpg"
        imageAlt="Manchester city tour"
        title="Discover Manchester in Executive Comfort"
        text="Discover Manchester and nearby cities in executive comfort with OK Taxis' private city tours. Whether you're a first-time visitor or a local exploring new corners, our luxury chauffeur-driven tours offer a relaxing and enriching experience. From historical landmarks and vibrant cultural spots to boutique shopping and stunning countryside, we'll design a bespoke itinerary tailored to your interests. Our professional chauffeurs have in-depth knowledge of Manchester and surrounding areas, ensuring your tour is both informative and enjoyable."
        bgColor="bg-white"
        imagePosition="left"
      />

      <ImageTextSection
        imageSrc="/Manchester To London.jpg"
        imageAlt="Liverpool city tour"
        title="Explore Beyond Manchester"
        text="Beyond Manchester, we offer guided tours to nearby cities including Liverpool, Leeds, Chester, York, and Sheffield. Explore the Beatles' legacy in Liverpool, the Roman walls of Chester, the historic architecture of York, or the arts and nightlife of Leeds—all while traveling in a premium vehicle like a Mercedes E-Class or Tesla Model S. Prefer nature? Ask about our luxury excursions to the Peak District, Lake District, or scenic Cheshire villages. With complimentary refreshments, Wi-Fi, and a professional driver at your disposal, OK Taxis makes sightseeing a five-star experience."
        bgColor="bg-white"
        imagePosition="right"
      />

       <section className="flex flex-col gap-12 md:flex-row items-center justify-between container px-4 py-32">
             <div className="md:w-1/2 relative h-64 w-full md:h-80">
              <Image
                src="/Manchester To London.webp" 
                alt="Car service in Manchester"
                width={600}
                    height={400}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: `600px`,
                      maxHeight: `400px`
                    }}
                    className="rounded-lg shadow-xl object-cover"
                    priority={false}
              />
            </div>
            {/* Left side content */}
            <div className="flex flex-col space-y-6 md:w-1/2">
              <h2 className="text-3xl text-brand font-semibold flex items-center gap-3">
                <FaCarSide className="text-brand" /> Advantages of Opting for a Long-Distance Chauffeur Service
              </h2>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li>
                  <strong>Privacy and Ease:</strong> <br />Unlike busy buses or trains, our executive car service provides a private environment where you can unwind, catch up on work, or simply enjoy the journey without distractions.
                </li>
                <li>
                  <strong>Direct and Efficient Journeys:</strong> <br />Bypass the delays and diversions common with public transport. Our professional drivers take the quickest, most direct routes to ensure you reach your destination promptly.
                </li>
                <li>
                  <strong>Assistance with Luggage:</strong> <br />Travel stress-free knowing our chauffeurs will handle your luggage with care, helping you load and unload to guarantee its safety throughout your trip.
                </li>
                <li>
                  <strong>Convenient Door-to-Door Transfers:</strong><br /> Forget the hassle of getting to and from stations or airports. Our bespoke airport transfer service collects you from your doorstep and delivers you precisely where you need to be.
                </li>
              </ul>
            </div>
      
            {/* Right side image */}
           
          </section>
      
      <FleetClasses />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand mb-12">
            Our Tour Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaLandmark className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Manchester Sightseeing</h3>
              <p className="text-gray-600">
                Explore top spots like Old Trafford, Manchester Cathedral, The Lowry, and the Northern Quarter in VIP comfort.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaCity className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nearby City Excursions</h3>
              <p className="text-gray-600">
                Enjoy seamless travel to Liverpool, Chester, Leeds, York and more — all in one of our luxury vehicles.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMapMarkedAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bespoke Itineraries</h3>
              <p className="text-gray-600">
                Build your ideal tour day with multiple stops and flexible pickup/drop-off locations.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMountain className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nature & Heritage Tours</h3>
              <p className="text-gray-600">
                Travel to the Peak District, Lake Windermere or historic market towns for a relaxing countryside escape.
              </p>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}