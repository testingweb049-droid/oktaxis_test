"use client";

import Image from "next/image";

export default function ThankYouSection() {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24 font-montserrat">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <p className="text-base sm:text-lg text-heading-black">
              Thank you for choosing
            </p>
            
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-heading-black">
                OK Taxis
              </h2>
              <div className="w-24 h-1 bg-primary-yellow mt-2"></div>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl italic text-text-gray">
              Your trusted ride with limitless luxury & comfort
            </p>
            
            <p className="text-base sm:text-lg text-text-gray leading-relaxed">
              We specialize in premium Black Car, Limo, and Chauffeur services
              across the states. Whether it&apos;s a luxurious intercity journey
              or an airport transfer scheduled for a business trip, our service
              is reliable, comfortable, and classy in every ride you book with
              us.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/car-locations.png"
              alt="OK Taxis Services - Map and Vehicles"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
