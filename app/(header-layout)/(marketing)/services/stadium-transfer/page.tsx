import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import { FaFutbol, FaMusic, FaUsers, FaCarSide } from "react-icons/fa";

export default function StadiumTransfer() {
    return (
        <>
            <HeroSection2
                bgImage='/Manchester Stadium Transfers.jpg' // Updated image
                title="Stadium Transfers"
                description="Need a transfer to a Manchester stadium? OKTaxi Service has got you covered. Avoid the hassle and secure your ride ahead of time by booking with us—so you won't be left stranded on match day. Dependable and professional taxi service in Manchester."
            />
<Offer />
            <ImageTextSection
                imageSrc="/Manchester Stadium Transfers.jpg"
                imageAlt="Stadium transfer service"
                title="Stress-Free Stadium Transfers"
                text="Cheer on your team without worrying about the drive home. OK Taxis provides reliable and stylish transfers to Manchester's major stadiums and event venues. Pre-book your ride to Old Trafford, Etihad Stadium, AO Arena, or any large event, and our chauffeurs will ensure timely arrivals and departures. Our professional drivers know the event schedules and parking restrictions, so you can relax knowing we will navigate safely and efficiently around the crowds."
                bgColor="bg-white"
                imagePosition="left"
            />

            {/* Group Service Section */}
            <ImageTextSection
                imageSrc="/Stadium Transfers in Manchester.jpg"
                imageAlt="Group stadium transfer"
                title="Group Transportation Solutions"
                text="We offer special event rates and can accommodate groups of any size. Whether it's a single, comfortable ride or multiple luxury cars for a large party, every passenger will enjoy a spacious, air-conditioned vehicle. Post-game, skip the taxi lines and ride directly away from the venue – our chauffeurs coordinate pickup points to get you moving quickly after the final whistle. Focus on the game or the concert, and let OK Taxis handle the journey."
                bgColor="bg-white"
                imagePosition="right"
            />
 <FleetClasses />
            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-brand mb-12">
                        Our Stadium Transfer Services
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaFutbol className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Matchdays & Concerts</h3>
                            <p className="text-gray-600">
                                Available for football matches, rugby games, concerts and other large events in Manchester.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaCarSide className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Flexible Pickup</h3>
                            <p className="text-gray-600">
                                We meet you at the stadium entrance or a convenient nearby location, saving you time and stress.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaUsers className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Group Friendly</h3>
                            <p className="text-gray-600">
                                We can provide multiple vehicles and minibuses for corporate hospitality or large fan groups.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <FaMusic className="text-white text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Comfort All The Way</h3>
                            <p className="text-gray-600">
                                Relax in luxury after the excitement – our fleet ensures a smooth journey home or on to your next destination.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

           
            
        </>
    );
}