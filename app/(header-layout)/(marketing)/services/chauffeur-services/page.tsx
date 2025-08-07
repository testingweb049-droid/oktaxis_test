import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import { FaCar, FaShieldAlt, FaWifi, FaCalendarAlt } from "react-icons/fa";
import Seo from "../../../../../components/Seo";
export default function ChauffeurServices() {
  return (
    <>
      <Seo
        title="Chauffeur Services in Manchester | OKTaxis"
        description="Book professional chauffeur services in Manchester for airport transfers, corporate events, and luxury rides. 24/7 service with licensed drivers and premium amenities."
        url="https://oktaxis.co.uk/services/chauffeur-services"
        image="https://oktaxis.co.uk/blog6.webp"
      />
      <HeroSection2
        bgImage="/blog6.webp"
        title="Professional Chauffeur Services in Manchester Cooperate, Business & More"
      // description="Experience the highest level of comfort and class with OKTaxis' chauffeur services. Whether you're a corporate client, a tourist, or attending an important event, our professional drivers ensure a premium travel experience. From executive travel to Manchester airport, we provide punctual, discreet, and luxurious transport tailored to your needs."
      />
      <Offer />
      <ImageTextSection
        imageSrc="/luxury chauffeur service.png"
        imageAlt="Premium chauffeur service"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">
            Premium Chauffeur Service for {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Every Occasion</span>{' '}

          </span>
        }
        text="Experience unmatched comfort with OKTaxis’ luxury chauffeur service Manchester. From Manchester airport transfers to corporate events or private tours, our professional chauffeurs and diverse fleet—ranging from fuel-efficient sedans to spacious SUVs—cater to every requirement with elegance and ease."
        bgColor="bg-white"
        imagePosition="left"
      />

      <ImageTextSection
        imageSrc="/blog6.png"
        imageAlt="Professional chauffeur"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">

            <span className="text-brand text-3xl md:text-4xl font-bold">White-Glove</span>{' '}
            Chauffeur Experience
          </span>
        }
        text="Our chauffeurs are trained professionals dedicated to delivering a white-glove experience. Uniformed, knowledgeable about Manchester’s roads, and committed to safety, they ensure you arrive relaxed and on time. All vehicles are fully insured, sanitized before each trip, and equipped with Wi-Fi and bottled water for your comfort. With transparent pricing and easy booking, OKTaxis makes luxury travel in Manchester seamless."
        bgColor="bg-white"
        imagePosition="right"
      />
      <FleetClasses />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">

            {
              <span className="text-3xl md:text-4xl font-bold">
                Why Choose Our {' '}
                <span className="text-brand text-3xl md:text-4xl font-bold">Chauffeur Service</span>{' '}

              </span>
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaCar className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Versatile Travel</h3>
              <p className="text-gray-600">
                Tailored for Manchester airport transfers, corporate travel, social events, or private tours.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaWifi className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Amenities</h3>
              <p className="text-gray-600">
                Enjoy complimentary bottled water, Wi-Fi, and climate-controlled interiors for a luxurious ride.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">
                 All vehicles and drivers meet UK licensing and insurance standards for your peace of mind.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaCalendarAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Effortless Booking</h3>
              <p className="text-gray-600">
                Book online or contact us directly for quick confirmation and hassle-free chauffeur services in Manchester.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
