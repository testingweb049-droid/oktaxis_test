import Image from "next/image";
import React from "react";

interface HeroBannerProps {
    title: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundImage: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
    title,
    description,
    buttonText,
    buttonLink,
    backgroundImage,
}) => {
    return (
        <section className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center text-center overflow-hidden">
            <Image
                src={backgroundImage}
                alt="Hero Background"
                fill
                priority
                className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 full-width-section mx-auto px-6">
                <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight max-w-4xl mx-auto">
                    {title}
                </h1>

                {description && (
                    <p className="text-gray-200 text-base sm:text-lg max-w-2xl mx-auto mb-6">
                        {description}
                    </p>
                )}

                {buttonText && (
                    <a
                        href={buttonLink || "#"}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-3 rounded-md text-sm sm:text-base transition"
                    >
                        {buttonText}
                    </a>
                )}
            </div>
        </section>
    );
};

export default HeroBanner;
