import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import { FaCar, FaShieldAlt, FaWifi, FaCalendarAlt } from "react-icons/fa";
import { Check } from "lucide-react";
import Seo from "@/components/Seo";
export default function ChauffeurServices() {
  return (
    <>
      <Seo
        title="Chauffeur Services in Manchester | OKTaxis"
        description="Book professional chauffeur services in Manchester for airport transfers, corporate events, and luxury rides. 24/7 service with licensed drivers and premium amenities."
        url="https://oktaxis.co.uk/chauffeur-services"
        image="https://oktaxis.co.uk/blog6.webp"
         breadcrumbs={[
          { position: 1, name: "Chauffeur Services", item: "https://oktaxis.co.uk/chauffeur-services" },
          { position: 2, name: "Chauffeur Services" }
        ]}
      />
      <HeroSection2
        bgImage="/blog6.webp"
        title="Professional Chauffeur Services in Manchester Cooperate, Business & More"
      // description="Experience the highest level of comfort and class with OKTaxis' chauffeur services. Whether you're a corporate client, a tourist, or attending an important event, our professional drivers ensure a premium travel experience. From executive travel to Manchester airport, we provide punctual, discreet, and luxurious transport tailored to your needs."
      />
      <Offer />
    <ImageTextSection
            imageSrc="/chauffeur--.jpg"
            imageAlt="Manchester Airport Transfers"
            imagePosition="left"
            headingAs="h2"
    
            text={
              <>
                <p>
                 At OKTaxis, we deliver top-tier chauffeur services in Manchester, perfect for executive travel, business meetings, or leisurely explorations. Our fleet boasts luxurious Mercedes and BMWs, ensuring every journey is smooth, dependable, and comfortable. With vetted drivers who know the city intimately and always arrive punctually, we handle airport transfers, events, and more, prioritising your safety and ease. 
                </p>
                <p className="mt-4">
                  Available 24/7, our green hybrid cars, live tracking apps, and transparent pricing set us apart in the Manchester transport scene. As a seasoned, family-oriented service, we tailor rides for professionals and families, drawing on years of expertise to provide reliable, friendly experiences that build loyalty and trust.
                </p>
              </>
            }
    
          />
          <div className="container mx-auto px-4 max-w-7xl">
    
           
    
            <ul className="mt-6 space-y-3 text-gray-800">
              {[
                "Luxurious Mercedes and BMW fleet",
                "Vetted, punctual local drivers",
                "24/7 availability for all journeys",
                "Hybrid cars for eco-friendly travel",
                "Transparent, fair upfront pricing",
                "Tailored services for pros and families"
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
