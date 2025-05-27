import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import { FaRoute, FaMapMarkerAlt, FaMoneyBillWave, FaUserTie } from "react-icons/fa";

export default function HourlyChauffeur() {
    return (
        <>
            <HeroSection2
                bgImage='/images/hourly-service.png'
                title="Flexible Hourly Chauffeurs for Business or Leisure Travel"
                description="Need on-demand travel? With OKTaxis, enjoy flexible hourly chauffeur services ideal for city errands, business meetings, or leisurely trips. Whether you're navigating Manchester airport or planning a day around town, our experienced chauffeurs ensure you travel efficiently in comfort and style."
            />
 <Offer />
            <ImageTextSection
                imageSrc="/stadium transfers to manchester united.webp"
                imageAlt="Hourly chauffeur service"
                title="Premium Hourly Chauffeur Service"
                text="Our flexible hourly chauffeur service allows you to hire a luxury vehicle and driver by the hour or day. Simply tell us your schedule and destinations, and we'll handle the driving. This service is ideal for day-long business meetings, shopping trips, city tours or any occasion where you need a dedicated chauffeur on demand. You avoid parking, directions or waiting – we're at your disposal to take you anywhere on your itinerary."
                bgColor="bg-white"
                imagePosition="left"
            />

            <ImageTextSection
                imageSrc="/Manchester Airpot.webp"
                imageAlt="Chauffeur convenience"
                title="Ultimate Convenience & Privacy"
                text="Enjoy the ultimate convenience and privacy with our chauffeur-by-the-hour option. Our professional drivers arrive in full uniform, opening doors and ensuring a seamless experience from start to finish. Vehicle interiors are stocked with amenities like bottled water, tissues, and charging ports. Whether you need a few hours or a full day, OK Taxis gives you total flexibility and peace of mind, all backed by our punctuality guarantee and premium service standards."
                bgColor="bg-white"
                imagePosition="right"
            />
            <FleetClasses/>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-brand mb-12">
                        Hourly Chauffeur Benefits
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaRoute className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Customized Itinerary</h3>
                            <p className="text-gray-600">
                                Change plans on the go without worrying about timing or routes. Our chauffeurs adapt to your schedule.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaMapMarkerAlt className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Multiple Stops</h3>
                            <p className="text-gray-600">
                                Run errands, attend meetings or make stops – our service is truly door-to-door.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaMoneyBillWave className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No Hidden Fees</h3>
                            <p className="text-gray-600">
                                Hourly hire comes with transparent pricing, so you know the cost of each hour upfront.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaUserTie className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Professional Service</h3>
                            <p className="text-gray-600">
                                Enjoy complimentary refreshments, Wi-Fi and all the comforts of our luxury fleet throughout your journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

           
        </>
    )
}