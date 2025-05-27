import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import { FaCar, FaShieldAlt, FaWifi, FaCalendarAlt } from "react-icons/fa";

export default function ChauffeurServices() {
    return (
        <>
            <HeroSection2
                bgImage='/blog6.webp'
                title="Professional Chauffeur Services in Manchester – Airport, Business & More"
                // description="Experience the highest level of comfort and class with OKTaxis' chauffeur services. Whether you're a corporate client, a tourist, or attending an important event, our professional drivers ensure a premium travel experience. From executive travel to Manchester airport, we provide punctual, discreet, and luxurious transport tailored to your needs."
            />
            <Offer />
            <ImageTextSection
                imageSrc="/luxury chauffeur service.webp"
                imageAlt="Premium chauffeur service"
                title="Ultimate Comfort & Convenience"
                text="Experience the ultimate in comfort and convenience with OK Taxis' premium chauffeur services. Whether it's a corporate event, executive travel, special occasion or simply a luxurious ride to your destination, our professional chauffeurs are at your service. We offer an executive car service in Manchester with fleet options to suit every need, from fuel-efficient sedans to spacious SUVs and vans."
                bgColor="bg-white"
                imagePosition="left"
            />

            <ImageTextSection
                imageSrc="/blog6.webp"
                imageAlt="Professional chauffeur"
                title="White-Glove Service"
                text="Our chauffeurs are more than drivers – they are trained professionals committed to delivering a white-glove experience. Dressed in uniform and well-versed in the city's roads, they ensure you arrive relaxed, on time and prepared for anything. Safety and discretion are paramount, so all vehicles are fully insured and sanitised before each journey, and our drivers respect your privacy throughout. With fixed competitive rates and simple booking, hiring an OK Taxis chauffeur is an effortless way to upgrade any trip."
                bgColor="bg-white"
                imagePosition="right"
            />
            <FleetClasses/>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-brand mb-12">
                        Why Choose Our Chauffeur Service
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaCar className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Versatile Travel</h3>
                            <p className="text-gray-600">
                                Airport transfers, corporate travel, social events or private tours – our chauffeurs adapt to any schedule.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaWifi className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Premium Amenities</h3>
                            <p className="text-gray-600">
                                Each ride includes bottled water, Wi-Fi and climate-controlled interiors for maximum comfort.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaShieldAlt className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Licensed & Insured</h3>
                            <p className="text-gray-600">
                                All vehicles and drivers meet official UK licensing and insurance requirements for your peace of mind.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaCalendarAlt className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                            <p className="text-gray-600">
                                Use our online form or contact us directly; we'll confirm details and send a driver right to you, hassle-free.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}