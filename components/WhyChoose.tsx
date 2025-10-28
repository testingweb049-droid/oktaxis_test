import React from 'react';
import { Plane, Shield, User, DollarSign } from 'lucide-react';

interface FeatureItem {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface WhyChooseUsProps {
    badge?: string;
    title?: string;
    description?: string;
    features?: FeatureItem[];
    badgeColor?: string;
    iconBgColor?: string;
    iconColor?: string;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
    badge = "Why Choose Us",
    title = "The Premier Choice for Taxi Services in Birmingham",
    description = "Welcome to OK Taxis, where we redefine travel in and around Birmingham. We understand that you need a service that's punctual, comfortable, and thoroughly professional. Whether you're heading to the airport, embarking on a long-distance trip, or require an executive car for business, we are dedicated to providing an exceptional experience from start to finish.",
    features = [
        {
            icon: <Plane className="w-7 h-7" />,
            title: "Airport & Long Distance Experts",
            description: "We specialize in seamless Birmingham Airport transfers and comfortable long-distance journeys across the UK."
        },
        {
            icon: <Shield className="w-7 h-7" />,
            title: "Executive & Luxury Fleet",
            description: "Travel in style. Our fleet includes premium and luxury vehicles perfect for corporate travel and special occasions."
        },
        {
            icon: <User className="w-7 h-7" />,
            title: "Professional Vetted Drivers",
            description: "Your journey is handled by licensed, experienced, and courteous drivers committed to your safety and comfort."
        },
        {
            icon: <DollarSign className="w-7 h-7" />,
            title: "Transparent Fixed Pricing",
            description: "Receive a clear, upfront price for your journey. With our fixed fares, you'll never face unexpected costs."
        }
    ],
    badgeColor = "text-yellow-500",
    iconBgColor = "bg-yellow-400",
    iconColor = "text-white"
}) => {
    return (
        <div className="w-full bg-gray-50 py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-10 md:mb-14">
                    <p className={`${badgeColor} text-sm font-medium mb-3 uppercase tracking-wide`}>
                        {badge}
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 max-w-4xl mx-auto">
                        {title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto">
                        {description}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Icon */}
                            <div className="flex justify-center mb-5">
                                <div className={`w-16 h-16 ${iconBgColor} ${iconColor} rounded-full flex items-center justify-center`}>
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default WhyChooseUs