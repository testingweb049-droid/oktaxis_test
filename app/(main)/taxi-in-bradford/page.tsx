import { Metadata } from "next";
import FAQSection from '@/components/FAQSection';
import FeatureCard from '@/components/FeatureCard';
import MainBanner from '@/components/MainBanner';
import FleetClasses from '@/components/home/fleet';
import WhyChooseUs from '@/components/WhyChoose';
import { DollarSign, Headphones, Plane, UserCheck } from 'lucide-react';
import React from 'react';
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Leeds Taxi Service | Leeds Bradford Airport Transfers | OK Taxis",
  description:
    "Your reliable Leeds taxi service for airport transfers & city journeys. We offer fixed fares to Leeds Bradford Airport, professional drivers & 24/7 service.",
  pageUrl: "/taxi-in-bradford",
  keywords: [
    "leeds taxi",
    "leeds bradford airport transfer",
    "leeds taxi service",
    "bradford taxi",
    "leeds chauffeur",
  ],
});

const page = () => {
    return (
        <>
            <MainBanner
                heading="Leeds Taxi Service | Leeds Bradford Airport Transfers | OK Taxis"
                text="Your reliable Leeds taxi service for airport transfers & city journeys. We offer fixed fares to Leeds Bradford Airport, professional drivers & 24/7 service."
                buttonText="Get a Quote & Book Online"
                buttonHref="/"
                image="/images/banner.jpg"
            />
            <div className="container mx-auto px-6 py-20">
                <WhyChooseUs
                    badge="Why Partner With Us"
                    title="The Smart Choice for Taxi Services in Leeds"
                    description="At OK Taxis, we know you need more than just a ride—you need a reliable travel partner. We are committed to providing the best taxi service Leeds residents and visitors can count on. From punctual airport runs to seamless city travel, our focus is on your safety, comfort, and peace of mind."
                    features={[
                        {
                            icon: <Plane className="w-7 h-7" />,
                            title: "Airport Specialists",
                            description: "We specialize in timely and efficient Leeds Bradford Airport transfers, making your journey stress-free."
                        },
                        {
                            icon: <UserCheck className="w-7 h-7" />,
                            title: "Professional Local Drivers",
                            description: "Our drivers are licensed, vetted, and possess expert knowledge of the Leeds area to ensure the quickest routes."
                        },
                        {
                            icon: <DollarSign className="w-7 h-7" />,
                            title: "Clear, Fixed Pricing",
                            description: "Enjoy transparent fares with no hidden costs. The price we quote is the price you pay, guaranteed."
                        },
                        {
                            icon: <Headphones className="w-7 h-7" />,
                            title: "24/7 Availability",
                            description: "Whether it's an early-morning flight or a late-night arrival, our taxi services in Leeds are available 24/7."
                        }
                    ]}
                />
                <FeatureCard
                    badge="Airport transfers"
                    title="Your Stress-Free Leeds Bradford Airport Taxi Service"
                    description="Airport travel can be hectic, but your taxi ride doesn't have to be. We are the trusted choice for the Leeds Bradford Airport taxi service, ensuring you get to your gate on time and are picked up without delay. Your driver will monitor your flight schedule in real-time, provide a friendly meet-and-greet service inside the terminal, and handle your luggage. Start or end your journey with the relaxation and reliability you deserve."
                    imageUrl="/images/taxi-in-london/air-transfer.png"
                    imagePosition="right"
                    overlayOpacity={0.35}
                />
                <FeatureCard
                    badge="City Travel"
                    title="Navigate Leeds with Ease"
                    description="Whether you're heading to a business meeting, catching a train from Leeds railway station, or simply exploring the city, we've got you covered. Our Leeds taxi services offer a comfortable and efficient way to travel throughout the city and its surrounding areas. Forget the stress of parking and public transport—sit back and let our experienced local drivers navigate the traffic for you."
                    imageUrl="/images/taxi-in-london/long-distance-travel.jpg"
                    imagePosition="left"
                    overlayOpacity={0.35}
                />
                <FeatureCard
                    badge="Our Drivers"
                    title="Professional Drivers Who Know Leeds Best"
                    description="Your safety and comfort are in the hands of our professional drivers. Each member of our team is fully licensed, insured, and dedicated to providing exceptional customer service. They are not just experts behind the wheel; they are courteous, knowledgeable, and committed to making your journey a pleasant one. You can trust that you're in safe hands with OK Taxis."
                    imageUrl="/images/taxi-in-london/our-drivers.png"
                    imagePosition="right"
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
                            question: "Do you cover cities other than Leeds?",
                            answer: "Yes. We provide transfers between Leeds, Leeds Bradford Airport, and many surrounding towns and cities."
                        },
                        {
                            question: "Can I book a Leeds Bradford Airport transfer in advance?",
                            answer: "Yes, we recommend pre-booking to secure availability and fixed pricing for your journey."
                        },
                        {
                            question: "Will my driver track my flight?",
                            answer: "Our team tracks inbound flights so we can adjust your collection time if your flight is delayed."
                        },
                        {
                            question: "Do you offer child seats on request?",
                            answer: "Child seats can be provided on request at the time of booking, subject to availability."
                        }
                    ]}
                />
            </div>

        </>
    )
}

export default page

