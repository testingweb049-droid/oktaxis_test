import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import Image from "next/image";
import { FaFutbol, FaMusic, FaUsers, FaCarSide } from "react-icons/fa";

export default function StadiumTransfer() {
    return (
        <>
            <HeroSection2
                bgImage='/Manchester Stadium Transfers.jpg' // Updated image
                title="Stadium Transfers"
                // description="Need a transfer to a Manchester stadium? OKTaxi Service has got you covered. Avoid the hassle and secure your ride ahead of time by booking with us—so you won't be left stranded on match day. Dependable and professional taxi service in Manchester."
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
             <section className="flex flex-col gap-12 md:flex-row items-center justify-between container px-4 py-32">
                         <div className="md:w-1/2 relative h-64 w-full md:h-80">
                          <Image
                            src="/Services to Manchester & Liverpool Football Stadiums.jpg" 
                            alt="Car service in Manchester"
                            width={600}
                                height={400}
                                style={{
                                  width: '100%',
                                  height: 'auto',
                                  maxWidth: `600px`,
                                  maxHeight: `400px`
                                }}
                                className="rounded-lg shadow-xl object-cover"
                                priority={false}
                          />
                        </div>
                        {/* Left side content */}
                        <div className="flex flex-col space-y-6 md:w-1/2">
                          <h2 className="text-3xl text-brand font-semibold flex items-center gap-3">
                            Manchester Football Stadiums:
                          </h2>
                          <ul className="space-y-4 text-gray-700 text-lg">
                            <li>
                              Reliable transport services to Manchester City Football grounds and any football stadium in Manchester or Liverpool. Convenient transfers from stadiums to airports, ensuring smooth onward journeys. Available for <strong> football matches, rugby games, concerts, and other large events in Manchester.</strong>
                            </li>
                            <li>
                              <strong>Group Options:</strong> <br />Meet you at the stadium entrance or a convenient nearby location to save you time and stress. Group-friendly services with multiple vehicles and minibuses available for corporate hospitality or large fan groups.

                            </li>
                            <li>
                              <strong>Comfort and Convenience:</strong> <br />Relax in luxury after the excitement with our premium fleet. Comfortable, smooth journeys home or to your next destination guaranteed.
                            </li>
                           
                          </ul>
                        </div>
                  
                        {/* Right side image */}
                       
                      </section>

                       <div className="mt-16">
 <section className="flex flex-col gap-12 md:flex-row items-center justify-between container px-4 py-32 mt-12">
                        
                        {/* Left side content */}
                        <div className="flex flex-col space-y-6 md:w-1/2">
                          <h2 className="text-3xl text-brand font-semibold flex items-center gap-3">
                           Old Trafford Stadium Transfers
                          </h2>
                          <ul className="space-y-4 text-gray-700 text-lg">
                            <li>
                             Enjoy reliable taxi services anytime between the airport and two of Manchester’s most iconic football venues <strong> Old Trafford and the Etihad Stadium.</strong> Whether you’re arriving for a <strong> match, a concert, or any event, we provide timely, comfortable, and convenient transfers.</strong> Our professional drivers ensure you get to <strong> Old Trafford or the Etihad Stadium </strong> smoothly from the airport, and just as easily return to the airport after the excitement. Count on us for hassle-free travel anytime you need a taxi to or from these legendary stadiums.
                            </li>
                            
                           
                          </ul>
                        </div>
                   <div className="md:w-1/2 relative h-64 w-full md:h-80">
                          <Image
                            src="/Old Trafford and the Etihad Stadium Transfers.jpg" 
                            alt="Car service in Manchester"
                            width={600}
                                height={400}
                                style={{
                                  width: '100%',
                                  height: 'auto',
                                  maxWidth: `600px`,
                                  maxHeight: `400px`
                                }}
                                className="rounded-lg shadow-xl object-cover"
                                priority={false}
                          />
                        </div>
                        {/* Right side image */}
                       
                      </section>
                       </div>
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