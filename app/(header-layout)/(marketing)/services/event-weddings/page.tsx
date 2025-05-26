import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import { FaGlassCheers, FaBriefcase, FaBirthdayCake, FaUsers } from "react-icons/fa";

export default function EventWedding() {
    return (
        <>
            <HeroSection2
                bgImage='/images/event.png'
                title="Luxury Wedding & Event Transfers — Arrive in Style"
                description="At OKTaxis, we specialize in providing luxury wedding and event transfers that make your special day truly unforgettable. From elegant arrivals to seamless departures, our fleet of premium vehicles and professional chauffeurs ensure you and your guests travel in comfort, style, and punctuality. Whether it's a grand wedding, corporate event, or private celebration, OKTaxis delivers a first-class experience tailored to your needs, so you can focus on creating beautiful memories."
            />

            <Offer />

            <ImageTextSection
                imageSrc="/Taxi In Manchester.png"
                imageAlt="Grand wedding entrance"
                title="Make a Grand Entrance"
                text="Make a grand entrance on your special day with OK Taxis' premium event and wedding transportation. Our elegant cars and professional chauffeurs will ensure you arrive in style, whether you're walking down the aisle, attending a gala, or celebrating any milestone. We work closely with you to plan every detail – from route and timing to decorations or special requests – so that your event runs smoothly and memorably."
                bgColor="bg-white"
                imagePosition="left"
            />

            <ImageTextSection
                imageSrc="/Manchester Rides.png"
                imageAlt="Corporate event transportation"
                title="Versatile Event Transportation"
                text="In addition to weddings, our chauffeur service caters to corporate events, conferences, parties and more. Treat your guests or colleagues to VIP transfers, arriving in a sleek Mercedes or BMW while enjoying complimentary refreshments and privacy. We offer coordinated group transportation for large parties, complete with professional signage and reliable pick-ups. With OK Taxis, you can focus on enjoying the occasion while we take care of the journey."
                bgColor="bg-white"
                imagePosition="right"
            />

            <FleetClasses />
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-brand mb-12">
                        Our Specialized Event Services
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaGlassCheers className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Weddings</h3>
                            <p className="text-gray-600">
                                Arrive at the ceremony and reception in luxury style. We offer beautiful vehicles and respectful, timely service.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaBriefcase className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Corporate Events</h3>
                            <p className="text-gray-600">
                                Impress clients and colleagues with VIP transportation to business meetings, conferences, or award ceremonies.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaBirthdayCake className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Parties & Celebrations</h3>
                            <p className="text-gray-600">
                                Whether it's a birthday, anniversary or concert, enjoy a seamless ride for you and your guests.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaUsers className="text-blue-600 text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Group Transport</h3>
                            <p className="text-gray-600">
                                We can coordinate multiple vehicles to keep large wedding parties, tour groups or corporate teams together.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}