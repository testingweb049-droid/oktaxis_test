

import { CarFrontIcon } from 'lucide-react';
import React from 'react';


interface FleetItem {
    icon?: React.ReactNode;
    title: string;
    description: string;
}

interface FleetShowcaseProps {
    mainTitle?: string;
    highlightText?: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    fleetItems?: FleetItem[];
    iconBgColor?: string;
    highlightColor?: string;
}

const FleetShowcase: React.FC<FleetShowcaseProps> = ({
    mainTitle = "Our Fleet:",
    highlightText = "The Right Car",
    subtitle = "for Every Occasion",
    description = "Our modern fleet is designed to meet a variety of travel needs. Every vehicle is impeccably clean, regularly maintained, and equipped for a comfortable ride.",
    imageUrl = "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200&q=80",
    imageAlt = "Luxury Car",
    fleetItems = [
        {
            title: "Saloon Cars",
            description: "Ideal for up to 4 passengers for city trips and airport runs."
        },
        {
            title: "Estate Cars",
            description: "Offering additional luggage capacity for travelers with extra bags."
        },
        {
            title: "MPV / People Carriers",
            description: "Seating up to 8 passengers comfortably for group travel."
        },
        {
            title: "Executive & Luxury",
            description: "Top-of-the-range models from brands like Mercedes-Benz and BMW for the ultimate travel experience."
        }
    ],
    iconBgColor = "bg-yellow-500",
    highlightColor = "text-yellow-500"
}) => {
    return (
        <div className="container py-12 md:py-16 lg:py-20">
            <div className="px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        {mainTitle} <span className={highlightColor}>{highlightText}</span> {subtitle}
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Main Image */}
                <div className="mb-12 md:mb-16">
                    <div className="relative w-full max-w-5xl mx-auto">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                {/* Fleet Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {fleetItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-14 h-14 ${iconBgColor} rounded-full mb-4`}>
                                {item.icon || <CarFrontIcon className="w-7 h-7 text-white" />}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};


export default FleetShowcase;

