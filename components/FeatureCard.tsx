

import React from 'react';

interface ContentBlockProps {
    badge?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    imagePosition?: 'left' | 'right';
    overlayOpacity?: number;
}

const FeatureCard: React.FC<ContentBlockProps> = ({
    badge = "Airport transfers",
    title = "Reliable Birmingham Airport Taxi Service",
    description = "Your journey to or from Birmingham Airport (BHX) should be the most relaxing part of your trip. Our dedicated airport taxi service in Birmingham is designed to eliminate any travel stress. We monitor your flight to ensure timely pickups, even if you're delayed. Your driver will greet you with a professional meet-and-greet service, assist with your luggage, and provide a smooth transfer to your destination, whether it's Birmingham city centre or beyond.",
    imageUrl = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    imagePosition = "right",
    overlayOpacity = 0.3
}) => {
    const isImageRight = imagePosition === "right";

    return (
        <div className="container py-8 md:py-12">
            <div className={`flex flex-col ${isImageRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 lg:gap-12 items-center`}>

                {/* Text Content */}
                <div className="flex-1 w-full">
                    <div className="space-y-4">
                        <span className="inline-block text-yellow-500 text-sm font-medium uppercase tracking-wide">
                            {badge}
                        </span>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                            {title}
                        </h2>

                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Image with Dark Overlay */}
                <div className="flex-1 w-full">
                    <div className="relative rounded-lg overflow-hidden shadow-xl aspect-video">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                        {/* Dark Overlay */}
                        <div
                            className="absolute inset-0 bg-black pointer-events-none"
                            style={{ opacity: overlayOpacity }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FeatureCard;
