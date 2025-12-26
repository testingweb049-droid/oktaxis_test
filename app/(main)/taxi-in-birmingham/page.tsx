
import FAQSection from '@/components/FAQSection'
import FeatureCard from '@/components/FeatureCard'
import HeroBanner from '@/components/HeroBanner'
import FleetClasses from '@/components/home/fleet'
import WhyChooseUs from '@/components/WhyChoose'
import React from 'react'

const page = () => {
    return (
        <>
            <HeroBanner
                title="How do I book a long-distance taxi from Birmingham?"
                description="Reliable airport transfers, executive travel, and city journeys with professional drivers and fixed fares. Experience these in Birmingham with OK Taxis."
                buttonText="Get a Quote & Book Online"
                buttonLink="/"
                backgroundImage="/images/banner.jpg"
            />
            <div className="container mx-auto px-6 py-20">
                <WhyChooseUs />
                <FeatureCard
                    badge="Airport transfers"
                    title="Reliable Birmingham Airport Taxi Service"
                    description="Your journey to or from Birmingham Airport (BHX) should be the most relaxing part of your trip. Our dedicated airport taxi service in Birmingham is designed to eliminate any travel stress. We monitor your flight to ensure timely pickups, even if you’re delayed. Your driver will greet you with a professional meet-and-greet service, assist with your luggage, and provide a smooth transfer to your destination, whether it's Birmingham city centre or beyond."
                    imageUrl="/images/air-transfer.jpg"
                    imagePosition="right"
                    overlayOpacity={0.35}
                />
                <FeatureCard
                    badge="Long Distance Travel"
                    title="Your Comfort on Long Distance Journeys"
                    description="For trips that go beyond the city limits, our long-distance taxi service from Birmingham offers the perfect blend of comfort and convenience. Why endure crowded trains or the fatigue of a long drive? Settle into a spacious, well-maintained vehicle and let our professional driver handle the navigation. Whether for business or leisure, we turn a long journey into a first-class travel experience."
                    imageUrl="/images/long-distance-travel.jpg"
                    imagePosition="left"
                    overlayOpacity={0.35}
                />
                <FeatureCard
                    badge="Executive & Luxury Service"
                    title="Executive & Luxury Taxi Service in Birmingham"
                    description="When your travel needs demand a higher standard, our executive taxi service in Birmingham delivers. Perfect for corporate clients, VIP transport, and special events, this service guarantees a sophisticated and discreet experience. Arrive at your destination in a premium vehicle from our luxury fleet, driven by a professional chauffeur dedicated to providing impeccable service. Make a lasting impression with every journey."
                    imageUrl="/images/luxury-services.jpg"
                    imagePosition="right"
                    overlayOpacity={0.35}
                />
                <FeatureCard
                    badge="Our Drivers"
                    title="The Professionals Behind Your Premium Journey"
                    description="The foundation of our exceptional service is our team of professional drivers. Each driver is not only an expert in navigating the roads but also in providing a superior customer experience. They are licensed, highly trained, and selected for their professionalism and commitment to service. You can relax knowing your journey is in the safest and most capable hands."
                    imageUrl="/images/our-drivers.jpg"
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
                            question: "Do you provide airport transfers from Birmingham?",
                            answer: "Yes. We operate reliable transfers to and from Birmingham Airport and other major airports across the UK."
                        },
                        {
                            question: "Can I use your service for long-distance journeys?",
                            answer: "Absolutely. We regularly provide long-distance trips from Birmingham to cities and airports nationwide."
                        },
                        {
                            question: "Are executive and luxury vehicles available?",
                            answer: "Yes. Our executive and luxury fleet is available for corporate travel, VIP transfers, and special occasions."
                        },
                        {
                            question: "What happens if my flight is delayed?",
                            answer: "We monitor inbound flights and automatically adjust pick-up times when delays occur, so your driver is ready when you arrive."
                        }
                    ]}
                />
            </div>

        </>
    )
}

export default page
