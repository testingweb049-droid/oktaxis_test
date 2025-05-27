import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import BusImage from "@/assets/vehicles/xlvan.jpg";
import { FaLandmark, FaCity, FaMapMarkedAlt, FaMountain } from "react-icons/fa";
import ImageTextSection from "@/components/ui/ImageTextSection";
import FleetClasses from "@/components/home/fleet";

export default function CityTour() {
  return (
    <>
      <HeroSection2
        bgImage='/city.jpg'
        title="Explore Manchester & Liverpool with a Chauffeured City Tour"
        description="Explore the best of the North with our exclusive city tours of Manchester, Liverpool, and the surrounding areas. Our expert chauffeurs will take you to iconic landmarks as well as hidden gems, providing a rich and authentic local experience in complete comfort. Ideal for visitors arriving via Manchester Airport, we also offer seamless chauffeur services to and from London, Birmingham, and Leeds, ensuring your journey is smooth and stylish every step of the way."
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
        imageSrc="/City Tour's From Manchester.jpg"
        imageAlt="Liverpool city tour"
        title="Explore Beyond Manchester"
        text="Beyond Manchester, we offer guided tours to nearby cities including Liverpool, Leeds, Chester, York, and Sheffield. Explore the Beatles' legacy in Liverpool, the Roman walls of Chester, the historic architecture of York, or the arts and nightlife of Leeds—all while traveling in a premium vehicle like a Mercedes E-Class or Tesla Model S. Prefer nature? Ask about our luxury excursions to the Peak District, Lake District, or scenic Cheshire villages. With complimentary refreshments, Wi-Fi, and a professional driver at your disposal, OK Taxis makes sightseeing a five-star experience."
        bgColor="bg-white"
        imagePosition="right"
      />
      <FleetClasses />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand mb-12">
            Our Tour Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaLandmark className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Manchester Sightseeing</h3>
              <p className="text-gray-600">
                Explore top spots like Old Trafford, Manchester Cathedral, The Lowry, and the Northern Quarter in VIP comfort.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaCity className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nearby City Excursions</h3>
              <p className="text-gray-600">
                Enjoy seamless travel to Liverpool, Chester, Leeds, York and more — all in one of our luxury vehicles.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMapMarkedAlt className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bespoke Itineraries</h3>
              <p className="text-gray-600">
                Build your ideal tour day with multiple stops and flexible pickup/drop-off locations.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMountain className="text-blue-600 text-xl" />
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