import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

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
            <div className="relative z-10 container mx-auto px-6">
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
                        className={cn(
                          "bg-primary-yellow hover:bg-primary-yellow/90 text-heading-black font-semibold transition-all duration-200",
                          "px-4 py-2.5 text-base rounded-lg",
                          "text-sm sm:text-base"
                        )}
                    >
                        {buttonText}
                    </a>
                )}
            </div>
        </section>
    );
};

export default HeroBanner;
