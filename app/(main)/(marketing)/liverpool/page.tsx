import { Metadata } from "next";
import FleetClasses from "@/components/home/fleet";
import OfferSection from "@/components/ui/OfferSection";
import HeroSection2 from "@/components/ui/HeroSection2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import Image from "next/image";
import Link from "next/link";
import {
    FaWifi,
    FaCoffee,
    FaCar,
    FaClock,                                
    FaBell,
    FaSuitcase,
    FaHeadset,
    FaStar,
} from "react-icons/fa";
import { Check } from "lucide-react";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Liverpool Airport Transfers | Reliable Taxi & Chauffeur Service",
  description:
    "Book seamless Liverpool airport transfers with OKTaxis. Enjoy executive chauffeur service, flight tracking, and 24/7 pickups from Liverpool, Manchester, and UK airports.",
  pageUrl: "/liverpool",
  keywords: [
    "liverpool airport transfer",
    "liverpool taxi",
    "liverpool chauffeur",
    "liverpool airport taxi",
    "liverpool transfer service",
  ],
});

export default function Liverpool() {
    return (
        <>
            <HeroSection2
                bgImage="/city-center4.jpg"
                title="Luxury Chauffeur Service in Liverpool by OK Taxis | Executive Excellence"
            />


            <OfferSection />
            <ImageTextSection
                imageSrc="/city-center4.jpg"
                imageAlt="Manchester Airport Transfers"
                imagePosition="left"
                headingAs="h2"

                text={
                    <>
                        <p>
                            Selecting the ideal chauffeur service in <strong>Liverpool</strong> truly elevates your premier travel
                            experience, and at <span className="text-brand">OK Taxis</span>, we excel with reliable luxury executive
                            services centred on supreme comfort and style. Our professional chauffeurs bring vast experience and
                            unwavering punctuality, ensuring effortless arrivals at every destination.
                        </p>
                        <p>
                            We understand the pressures of business trips or special occasions, so our stress-free journeys allow you to
                            unwind completely. As Viktor, the dedicated owner with years in the industry, I've witnessed how our excellence
                            transforms ordinary rides into memorable ones. Operating from 0B Portway, Wythenshawe, Manchester, we're easily
                            reachable at <strong className="text-brand">+44 7788 710290</strong> or <strong>info@oktaxis.co.uk</strong> for prompt assistance.
                        </p>
                    </>
                }

            />
            <div className="w-full max-w-7xl mx-auto px-4 ">

                <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

                      
                What distinguishes us is seamless transportation addressing real challenges like delayed flights or hectic
                schedules, with vehicles impeccably maintained for safety and equipped with complimentary Wi-Fi and bottled water.
                We manage corporate events, airport transfers, and more with discreet professionalism, drawing on my career to
                make every passenger feel valued. Our knowledgeable drivers master local routes to dodge delays, establishing us
                as the trusted name redefining travel across the United Kingdom.
              

                </p>
               

                <ul className="mt-6 space-y-3 text-gray-800">
                    {[
                        "Reliable chauffeurs for punctual pickups.",
                    "Luxury vehicles with comfort features.",
                    "Stress-free journeys tailored to your needs.",
                    "Professional service ensuring safety and discretion."
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
                imageSrc="/liverpool.jpg"
                imageAlt="Manchester Airport Transfers"
                imagePosition="right"
                headingAs="h2"
                title={
                    <>


                        Corporate{" "}
                        <span className="text-brand"> Travel Solutions </span>for Professionals
                    </>
                }
                text={
                    <>
                        <p>
                            For Liverpool professionals, our corporate travel solutions eliminate the frustration of unreliable transport amid demanding days, delivering executive chauffeur services Liverpool that guarantee timely, relaxed arrivals at meetings. Our courteous, efficient chauffeurs manage all logistics, freeing you to concentrate on work. With bespoke options like enhanced security, we accommodate high-profile requirements in television, film production, and theatre sectors. As Viktor, fuelled by passion for unparalleled service, I've crafted this to ensure everyone feels fully supported, reach us via <strong className="text-brand underline">https://oktaxis.co.uk/</strong>  for straightforward arrangements.

                        </p>

                    </>
                }

            />
            <div className="w-full max-w-7xl mx-auto px-4 ">

                <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

                    We supply versatile, secure ground transport ideal for media outlets or major broadcasters, upholding punctuality to prevent missed connections or hurried entries.

                </p>
                <p className=" text-lg  text-gray-700 pb-4 leading-relaxed">
                    Relish complimentary newspapers and a serene environment to enhance productivity, informed by my firsthand knowledge of tight timelines for seamless coordination. This elevated standard fosters peace of mind for teams, positioning us as the premier Liverpool chauffeur service that consistently excels.



                </p>

                <ul className="mt-6 space-y-3 text-gray-800">
                    {[
                        "Experienced drivers local route knowledge.",
                        "Custom solutions business travel needs.",
                        "Enhanced security high-profile executives.",
                        "Stress-free coordination boosting productivity.",

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
                imageSrc="/Manchester Taxis.png"
                imageAlt="Executive"
                imagePosition="left"
                headingAs="h2"

                title={
                    <>


                        Seamless <span className="text-brand"> Airport Transfers</span> with Ultimate Comfort
                    </>
                }
                text={
                    <>
                        <p>
                            Frustrated by chaotic airport pickups in Liverpool? Our seamless airport transfers provide ultimate comfort, kicking off your journey perfectly with airport chauffeur service Liverpool to Manchester featuring punctual chauffeurs ready upon arrival. Say goodbye to queues and delays, we monitor flights and adapt accordingly. From my owner perspective as Viktor, I guarantee every transfer flows smoothly and comfortably, extending to cruise ship connections for effortless voyages.
                        </p>

                    </>
                }

            />
            <div className="w-full max-w-7xl mx-auto px-4 ">

                <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

                    Our Mercedes vehicles include child seats and accessibility features for family outings, paired with fixed rates free of hidden charges for true reassurance. We merge luxury with practicality, converting travels into restorative pauses that tackle jet lag or packed agendas. Our expert setups ensure refreshed arrivals, making us the dependable choice for airport shuttle Liverpool.


                </p>


                <ul className="mt-4 space-y-3 text-gray-800">
                    {[
                        "Punctual pickups matching flight times.",
                        "Comfortable vehicles complimentary refreshments.",
                        "Seamless transfers any destination.",
                        "Fixed rates no surprises.",

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
                imageSrc="/Luxury Wedding & Event Transfers.png"
                imageAlt="Stress-Free Travel Experience"
                imagePosition="right"
                headingAs="h3"
                title={
                    <>


                        Luxury Fleet  for <span className="text-brand font-bold"> Weddings and Events</span>

                    </>
                }
                text={
                    <>
                        <p>
                            Organising weddings or events in Liverpool? Our luxury fleet removes transport concerns, offering wedding car hire Liverpool with elegant vehicles for stylish entrances. Our chauffeurs approach special occasions with utmost discretion and attentiveness. As Viktor, I've overseen countless events, forging enduring memories for couples while catering to VIP guests and celebrity tours.
                        </p>

                    </>
                }

            />
            <div className="w-full max-w-7xl mx-auto px-4 ">

                <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">
                    For prominent gatherings like music or artist performances, we deliver expert chauffeuring suited to theatre or film demands. Our adaptable fleet supports comprehensive services with planned stops, resolving issues like traffic or parking woes. Upholding impeccable standards and stellar ratings, we're the superior option for Liverpool wedding car hire.


                </p>


                <ul className="mt-4 space-y-3 text-gray-800">
                    {[
                        "Elegant Mercedes stylish event arrivals.",
                        "Discreet chauffeurs total privacy.",
                        "Versatile fleet any special occasion.",
                        "Skilled logistics event timelines.",

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
                imageSrc="/images/mercedes.png"
                imageAlt="Luxury Vehicles and Meet & Greet"
                imagePosition="left"
                headingAs="h2"
                title={
                    <>

                        <span className="text-brand"> Luxury Vehicles </span> for Every{" "}
                        <span className="text-brand"> Occasion</span>
                    </>
                }
                text={
                    <>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Seeking luxury vehicles for routine or exceptional rides in Liverpool? We customise them for all occasions, from elegant dinner dates to urban explorations, with private chauffeur service Liverpool promising constant comfort and style. Vehicles boast Wi-Fi and additional amenities to enrich your experience. Leveraging my industry expertise as Viktor, I prioritise meticulously maintained cars for top safety, outshining uncomfortable standard taxis with our premium selections.



                            </p>

                        </div>

                        {/* ✅ Feature Highlights */}

                    </>
                }
            />
            <div className="w-full max-w-7xl mx-auto px-4 ">

                <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

                    For business or leisure, our Mercedes lineup accommodates specific requests, granting peace of mind via trained drivers and local insights. This upgrades everyday trips to opulent adventures, ideal for discovering landmark cities or swift tasks—our dedication marks us as the favoured chauffeur Liverpool for personalised excellence.

                </p>

                <ul className="mt-4 space-y-3 text-gray-800">
                    {[
                        "Tailored Mercedes specific needs.",
                        "Comfort features Wi-Fi water.",
                        "Safe vehicles high standards.",
                        "Local drivers efficient routes.",

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
                imageSrc="/liverpool-main-image.jpg"            // <- swap to any fleet image you like
                imageAlt="Premium Chauffeur Fleet in Manchester"
                imagePosition="right"
                headingAs="h2"

                title={
                    <>

                        Easy Booking  and {" "}
                        <span className="text-brand"> Transparent Pricing Guide</span>
                    </>
                }
                text={
                    <>
                        <p>
                            Battling complex bookings? Our straightforward process for chauffeur services Liverpool is swift and user-friendly—visit <strong className="text-brand underline">https://oktaxis.co.uk/</strong>  or dial  <strong className="text-brand underline">+44 7788 710290</strong> to arrange. We facilitate advance reservations for busy periods without any fuss. As the owner Viktor, I've engineered this for genuine ease, with <strong className="text-brand">info@oktaxis.co.uk</strong> available for any questions.

                        </p>

                    </>
                }

            />
            <div className="w-full max-w-7xl mx-auto px-4 ">

                <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

                    Our transparent pricing guide employs fixed rates determined by type, distance, and duration, eliminating hidden fees for competitive affordability. This averts budget shocks in executive cars to hire, incorporating complimentary extras for added worth. Secure your spot with us as the reliable pick for lucid costing.


                </p>


                <ul className="mt-4 space-y-3 text-gray-800">
                    {[
                        "Easy online booking quick setup.",
                        "Transparent fixed rates no extras.",
                        "Competitive pricing your budget.",
                        "Advance options ride availability.",

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
            <FleetClasses />
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Key Features of Our <span className="text-brand">Manchester Airport Chauffeur Services</span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Complimentary Waiting */}
                        <div className="bg-gray-50 p-8 rounded-xl">
                            <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <FaClock className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Complimentary Waiting</h3>
                            <p className="text-gray-600">
                                Generous free wait time for delayed flights—essential for busy airports like Manchester.
                            </p>
                        </div>

                        {/* Luggage Assistance */}
                        <div className="bg-gray-50 p-8 rounded-xl">
                            <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <FaSuitcase className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Luggage Assistance</h3>
                            <p className="text-gray-600">
                                Chauffeurs handle all baggage, getting you settled quickly.
                            </p>
                        </div>

                        {/* 24/7 Availability */}
                        <div className="bg-gray-50 p-8 rounded-xl">
                            <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <FaCar className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
                            <p className="text-gray-600">
                                Round-the-clock service for any flight to Manchester, Liverpool, or other UK airports.
                            </p>
                        </div>

                        {/* Customized Rides */}
                        <div className="bg-gray-50 p-8 rounded-xl">
                            <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <FaStar className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Customized Rides</h3>
                            <p className="text-gray-600">
                                Tailored for weddings, corporate events, stadium transfers, or city tours in Manchester.
                            </p>
                        </div>
                    </div>

                    {/* Summary Text Below Grid */}
                    <p className="text-center text-gray-700 text-lg mt-12 max-w-3xl mx-auto">
                        These perks ensure every ride is memorable and stress-free.
                    </p>
                </div>
            </section>
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Benefits of Booking <span className="text-brand">Airport Transfers with OKTaxis</span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Time-Saving */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
                            <p className="text-gray-700">
                                Avoid queues with direct meet-and-greet and pre-booked rides.
                            </p>
                        </div>

                        {/* Cost-Effective */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-2">Cost-Effective</h3>
                            <p className="text-gray-700">
                                Competitive fixed rates beat surge pricing from apps.
                            </p>
                        </div>

                        {/* Safety First */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-2">Safety First</h3>
                            <p className="text-gray-700">
                                Fully licensed chauffeurs and vehicles with GPS tracking.
                            </p>
                        </div>

                        {/* Eco-Friendly Options */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-2">Eco-Friendly Options</h3>
                            <p className="text-gray-700">
                                Hybrid and electric vehicles like the Tesla Model S for sustainable travel.
                            </p>
                        </div>

                        {/* Wide Coverage */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
                            <p className="text-gray-700">
                                Transfers from Manchester to Old Trafford, city centers, or nationwide destinations.
                            </p>
                        </div>

                        {/* Business Travelers */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-2">Ideal for Business Travelers</h3>
                            <p className="text-gray-700">
                                Our executive airport transfer Manchester service includes productivity features like Wi-Fi for on-the-go work.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}
