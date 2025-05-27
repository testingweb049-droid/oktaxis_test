import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import Image from "next/image";
import { FaWifi, FaCoffee, FaCar, FaClock, FaBell, FaSuitcase, FaHeadset } from "react-icons/fa";

export default function AirportTransfer() {
    return (
        <>
            <HeroSection2
                bgImage='/images/airport-transfer.png'
                title="Reliable Manchester Airport Services & Transfers Across the UK"
                // description="Enjoy hassle-free Manchester airport services with OKTaxis. Whether you're landing or departing from Manchester or Liverpool, our 24/7 airport transfer service guarantees punctual pickups, real-time flight tracking, and executive-level comfort. Our professional chauffeurs are committed to making your journey seamless and stress-free."
            />
            <Offer />
            <ImageTextSection
                imageSrc="/Manchester Taxis.png"
                imageAlt="Executive Airport Transfer"
                title="Executive Airport Transfers"
                text="Travel to and from Manchester Airport in style with our executive airport transfer service. Our professional chauffeur will track your flight in real time to ensure a seamless pickup, even if your plane is early or delayed. You'll be greeted at arrivals by name and helped with your luggage before being escorted to your luxury vehicle. Whether it's an early morning departure or a late-night arrival, you can count on punctual service and comfort every step of the way.
                Enjoy hassle-free Manchester airport services with OKTaxis. Whether you're landing or departing from Manchester or Liverpool, our 24/7 airport transfer service guarantees punctual pickups, real-time flight tracking, and executive-level comfort. Our professional chauffeurs are committed to making your journey seamless and stress-free.
                "
                bgColor="bg-white"
                imagePosition="left"
            />

            <ImageTextSection
                imageSrc="/images/airport-transfer.png"
                imageAlt="Stress-Free Travel Experience"
                title=" Stress-Free Travel Experience"
                text="We make airport transfers stress-free by handling all the details. Our fleet of premium sedans and SUVs is the perfect antidote to long flights. Enjoy complimentary refreshments and free Wi-Fi as you relax in spacious, climate-controlled interiors. Fixed rates mean no surprises – the price you book is the price you pay, no matter the traffic or route taken. OK Taxis is also available for transfers to and from Liverpool John Lennon Airport, Leeds Bradford Airport, Birmingham, London and other UK destinations, so wherever you land, our luxury chauffeur service can take you there."
                bgColor="bg-white"
                imagePosition="right"
            />
            <FleetClasses />
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-brand mb-12">
                        Our Service Features
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        
                        <div className="bg-gray-50 p-8 rounded-xl">
                            <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <FaClock className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Complimentary Waiting</h3>
                            <p className="text-gray-600">
                                We offer a generous free waiting period in case of delayed flights.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-xl">
                            <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <FaSuitcase className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Luggage Assistance</h3>
                            <p className="text-gray-600">
                                Your chauffeur will handle all baggage, helping you to get settled quickly after landing.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-xl">
                            <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <FaCar className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">24/7 Service</h3>
                            <p className="text-gray-600">
                                Available for any flight, day or night, to Manchester and other UK airports.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}