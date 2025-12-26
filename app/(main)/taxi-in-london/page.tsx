
import FAQSection from '@/components/FAQSection';
import FeatureCard from '@/components/FeatureCard';
import HeroBanner from '@/components/HeroBanner';
import FleetClasses from '@/components/home/fleet';
import WhyChooseUs from '@/components/WhyChoose';
import { Clock, DollarSign, Headphones, UserCheck } from 'lucide-react';
import React from 'react'

const page = () => {
    return (
        <>
            <HeroBanner
                title="Your Premier Taxi Service In London"
                description="Reliable airport transfers, executive travel, and city journeys with professional drivers and fixed fares. Experience the best of London with OK Taxis."
                buttonText="Get a Quote & Book Online"
                buttonLink="/"
                backgroundImage="/images/banner.jpg"
            />
            <div className="full-width-section mx-auto px-6 py-20 gap-y-8">
                <WhyChooseUs
                    badge="Why Partner With Us"
                    title="Your Trusted Partner for Travel in London"
                    description="Finding a reliable taxi service in London can be overwhelming. At OK Taxis, we simplify your journey. We are dedicated to providing a service that’s not just about getting from A to B, but about ensuring your complete peace of mind. Punctuality, professionalism, and transparent pricing are the pillars of our commitment to you."
                    features={[
                        {
                            icon: <Clock className="w-7 h-7" />,
                            title: "On-Time, Every Time",
                            description: "We respect your schedule. Our drivers are always punctual, ensuring you are never late for a flight, meeting, or important event."
                        },
                        {
                            icon: <UserCheck className="w-7 h-7" />,
                            title: "Professional & Vetted Drivers",
                            description: "Quick implementation and seamless integration with your existing systems and workflows."
                        },
                        {
                            icon: <DollarSign className="w-7 h-7" />,
                            title: "Transparent Fixed Fares",
                            description: "No surprises. The price you are quoted is the price you pay. Our fixed fares for airport transfers and city journeys mean no hidden costs."
                        },
                        {
                            icon: <Headphones className="w-7 h-7" />,
                            title: "24/7 Customer Support",
                            description: "We are here for you around the clock. Whether you have a question or need to adjust your booking, our support team is always ready to help."
                        }
                    ]}
                />
                <FeatureCard
                    badge="Airport transfers"
                    title="Seamless Airport Taxi Service"
                    description="The stress of airport travel ends the moment you book with us. We specialise in providing the best airport taxi service London has to offer, with dedicated transfers to and from all major airports. Whether you need a London Luton airport taxi service, a ride from Stansted, or a pickup from London City Airport, our process is flawless. Your driver will track your flight to adjust for any delays, provide a professional meet-and-greet service, and assist with your luggage, ensuring a smooth and relaxing transition from the airport to your destination."
                    imageUrl="/images/taxi-in-london/air-transfer.png"
                    imagePosition="right"
                    overlayOpacity={0.35}
                />
                <FeatureCard
                    badge="Executive Service"
                    title="Executive Taxi Service for Professionals"
                    description="For our corporate clients, professionalism and discretion are non-negotiable. Our executive taxi service in London is designed to meet the high standards of business travel. Arrive at your meetings, conferences, or corporate events in a pristine, high-spec vehicle driven by a discreet and courteous chauffeur. We provide a quiet, comfortable environment, allowing you to work on the go or relax and prepare for your day. Make the right impression, every time."
                    imageUrl="/images/taxi-in-london/long-distance-travel.jpg"
                    imagePosition="left"
                    overlayOpacity={0.35}
                />
                <FeatureCard
                    badge="City Travel"
                    title="Explore London with a Reliable Private Taxi"
                    description="From the heart of the city to the quietest suburbs, we are your trusted London local taxi service. Navigating the capital's busy streets is our expertise. Whether you need a ride from London Bridge, a shopping trip in Central London, or a transfer across town, our drivers know the best routes to get you there efficiently. Forget the hassle of public transport and enjoy the comfort and convenience of our London private taxi service."
                    imageUrl="/images/taxi-in-london/luxury-services.jpg"
                    imagePosition="right"
                    overlayOpacity={0.35}
                />
                <FeatureCard
                    badge="Our Drivers"
                    title="The Professionals Behind the Wheel"
                    description="The quality of our service is a direct reflection of our drivers. We don't just hire anyone; we partner with seasoned professionals who are fully licensed by Transport for London (TfL), comprehensively insured, and committed to customer satisfaction. They are not just drivers; they are local experts who pride themselves on providing a safe, friendly, and welcoming journey for every passenger."
                    imageUrl="/images/taxi-in-london/our-drivers.png"
                    imagePosition="left"
                    overlayOpacity={0.35}
                />

                {/* <FleetShowcase
                    mainTitle="Our Fleet:"
                    highlightText="The Right Car"
                    subtitle="for Every Occasion"
                    description="Our modern fleet is designed to meet a variety of travel needs. Every vehicle is impeccably clean, regularly maintained, and equipped for a comfortable ride."
                    imageUrl="/images/car.png"
                    imageAlt="Business Team"
                    fleetItems={[
                        {
                            title: "Saloon Cars",
                            description: "Ideal for up to 4 passengers for city trips and airport runs."
                        },
                        {
                            title: "Estate Cars",
                            description: "Offering additional luggage capacity for travellers with extra bags."
                        },
                        {
                            title: "MPV / People Carriers",
                            description: "Seating up to 8 passengers comfortably for group travel."
                        },
                        {
                            title: "Executive & Luxury",
                            description: "Top-of-the-range models from brands like Mercedes-Benz and BMW for the ultimate travel experience."
                        }
                    ]}
                /> */}
                <FleetClasses />
                <FAQSection
                    title="Frequently Asked Questions"
                    faqs={[
                        {
                            question: "Do you cover cities other than London?",
                            answer: "Yes. We provide transfers to and from London from many surrounding cities and airports. Contact us if you have a specific route in mind."
                        },
                        {
                            question: "Can I book a taxi to or from the airport?",
                            answer: "Absolutely. We specialise in airport transfers and track your flight to adjust pick-up times in case of delays."
                        },
                        {
                            question: "Is pricing fixed or based on the meter?",
                            answer: "Our fares are fixed for pre-booked journeys. The price you see at the time of booking is the price you pay."
                        },
                        {
                            question: "Can I book a taxi for a large group?",
                            answer: "Yes. We have vehicles suitable for groups and additional luggage. Let us know your group size when booking."
                        }
                    ]}
                />
            </div>

        </>
    )
}

export default page