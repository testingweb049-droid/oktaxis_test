import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import { FaClock, FaMapMarkedAlt, FaMoneyBillWave, FaBriefcase } from "react-icons/fa";

export default function CityCenter() {
    return (
        <>
            <HeroSection2
                bgImage='/Luxury Chauffeur Service (2).webp'
                title="Taxi Manchester City Centre"
                description="Whether you're having a laid-back shopping trip or a night out in central Manchester, avoid the hassle of driving and public transport. Reserve your taxi ahead of time online or whenever you need through the OKTaxis website. Budget-friendly taxis available whenever you need them."
            />
 <Offer />
            <ImageTextSection
                imageSrc="/Luxury Chauffeur Service (2).webp"
                imageAlt="Manchester city taxi"
                title="Premium City Centre Transfers"
                text="For short trips around central Manchester, our luxury city taxi service is unbeatable. Forget waiting on a crowded bus or hailing a standard cab — just book an OK Taxis sedan or SUV and a chauffeur will pick you up directly. We know the Manchester city centre inside out, so your journey to destinations like MediaCityUK, the Convention Centre, or the Concert Hall will be quick and smooth."
                bgColor="bg-white"
                imagePosition="left"
            />

            <ImageTextSection
                imageSrc="/Taxi in Manchester City Centre (1).png"
                imageAlt="Comfortable city taxi"
                title="Effortless City Travel"
                text="Enjoy the ease of door-to-door service with an executive vehicle that's consistently cleaner, quieter and more comfortable than an ordinary taxi. Our drivers are friendly, professional and can even assist you with luggage or shopping bags. With OK Taxis, even a short ride downtown becomes a relaxing experience, and you'll arrive refreshed and ready, not flustered. We offer reliable city transfers 24/7 – from late-night airport rides to early-morning pickups from your hotel – all at fixed, transparent rates."
                bgColor="bg-white"
                imagePosition="right"
            />
<FleetClasses />
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-brand mb-12">
                        Why Choose Our City Taxis
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaClock className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Quick Pickups</h3>
                            <p className="text-gray-600">
                                A clean executive car arrives at your location in minutes, 24 hours a day.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaMapMarkedAlt className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Knowledgeable Drivers</h3>
                            <p className="text-gray-600">
                                We navigate traffic and roadworks expertly to find the fastest route through the city.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaMoneyBillWave className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fixed Fare</h3>
                            <p className="text-gray-600">
                                No meter surprises – you get a quote in advance, so you know the cost from Piccadilly to Deansgate or wherever you need.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaBriefcase className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Ideal for Business & Leisure</h3>
                            <p className="text-gray-600">
                                Perfect for traveling between hotels, restaurants, offices and events in Manchester.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            
           
        </>
    );
}