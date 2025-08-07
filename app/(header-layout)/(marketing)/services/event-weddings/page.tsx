import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import {
  FaGlassCheers,
  FaBriefcase,
  FaBirthdayCake,
  FaUsers,
} from "react-icons/fa";
import Seo from "../../../../../components/Seo";
export default function EventWedding() {
  return (
    <>
      <Seo
        title="Luxury Wedding & Event Transfers | OKTaxis Manchester"
        description="Arrive in style with OKTaxis' luxury wedding and event transfer service in Manchester. Elegant vehicles, professional chauffeurs, and seamless group travel."
        url="https://oktaxis.co.uk/services/event-wedding"
        image="https://oktaxis.co.uk/Luxury%20Wedding%20&%20Event%20Transfers.jpg"
      />
      <HeroSection2
        bgImage="/wedding.png"
        title="Luxury Wedding & Event Transfers — Arrive in Style"
      // description="At OKTaxis, we specialize in providing luxury wedding and event transfers that make your special day truly unforgettable. From elegant arrivals to seamless departures, our fleet of premium vehicles and professional chauffeurs ensure you and your guests travel in comfort, style, and punctuality. Whether it's a grand wedding, corporate event, or private celebration, OKTaxis delivers a first-class experience tailored to your needs, so you can focus on creating beautiful memories."
      />

      <Offer />

      <ImageTextSection
        imageSrc="/Luxury Wedding Manchester.png"
        imageAlt="Grand wedding entrance"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">

            Unforgettable{' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Grand Entrances</span>{' '}

          </span>
        }
        text="Make your event extraordinary with OKTaxis’ luxury wedding car hire and event transportation in Manchester. From perfectly timed routes to bespoke decorations, we plan every detail to ensure a flawless and memorable journey, whether for a wedding, gala, or milestone celebration."
        bgColor="bg-white"
        imagePosition="left"
      />

      <ImageTextSection
        imageSrc="/Luxury Wedding & Event Transfers.png"
        imageAlt="Corporate event transportation"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">
            Versatile Event {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">and Corporate Transport</span>{' '}

          </span>
        }
        text="Our chauffeur services extend to corporate events, conferences, and private parties in Manchester. Impress clients with VIP airport transfers in sleek Mercedes or BMWs, complete with complimentary refreshments and privacy. For large groups, we offer coordinated transport with professional signage and reliable pick-ups, letting you focus on the occasion."
        bgColor="bg-white"
        imagePosition="right"
      />

      <FleetClasses />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center  mb-12">

            {
              <span className="text-3xl md:text-4xl font-bold">
                Our   <span className="text-brand text-3xl md:text-4xl font-bold">Specialized</span>{' '} Event{' '}
                <span className="text-brand text-3xl md:text-4xl font-bold">Services</span>{' '}

              </span>
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaGlassCheers className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Weddings</h3>
              <p className="text-gray-600">
                Arrive at your Manchester ceremony or reception in luxurious style with our decorated vehicles and timely service.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaBriefcase className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Corporate Events</h3>
              <p className="text-gray-600">
                Impress with VIP transport for business meetings, conferences, or award ceremonies in Manchester.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaBirthdayCake className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Parties & Celebrations
              </h3>
              <p className="text-gray-600">
                Enjoy seamless rides for birthdays, anniversaries, or concerts across Manchester.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaUsers className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Group Transport</h3>
              <p className="text-gray-600">
                 Coordinated multi-vehicle services for wedding parties, corporate teams, or tour groups, ensuring everyone arrives together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
