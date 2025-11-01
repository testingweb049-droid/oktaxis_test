// LeftRightSection.jsx
import React from "react";

export default function LeftRightSection({
  imageTopRight = "/Rectangle 9 (3).png",
  imageBottomLeft = "/Rectangle 9 (4).png",
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
      {/* --- Row 1: Text (left) / Image (right) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="order-1 lg:order-1">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-6 leading-snug">
            Long-Distance & VIP Private
            <br />
            Jet Chauffeur
          </h2>

          <p className="text-gray-600 mb-6 max-w-prose">
            We provide seamless door-to-door chauffeur services across the entire UK. For extended journeys, you can relax in a high-end vehicle equipped with generous legroom and chilled mineral water for ultimate comfort.
          </p>

          <p className="text-gray-600 max-w-prose">
            We also specialize in discreet A-to-B transfers to and from private jet terminals, including Signature Flight Support and Liverpool XLR. For high-profile clients, our VIP security-trained chauffeurs guarantee total confidentiality and peace of mind.
          </p>
        </div>

        <div className="order-2 lg:order-2 flex justify-center lg:justify-end">
          <div className="w-full max-w-md overflow-hidden shadow-md">
            <img
              src={imageTopRight}
              alt="Luxury chauffeur and car"
              className="w-full h-64 lg:h-72 object-cover"
            />
          </div>
        </div>
      </div>

      {/* --- Row 2: Image (left) / Text (right) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12">
        <div className="order-1 lg:order-1 flex justify-center lg:justify-start">
          <div className="w-full max-w-lg overflow-hidden rounded-md shadow-md">
            <img
              src={imageBottomLeft}
              alt="Manchester streets / destination"
              className="w-full h-64 lg:h-64 object-cover"
            />
          </div>
        </div>

        <div className="order-2 lg:order-2">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-6 leading-snug">
            Explore Manchester's Top
            <br />
            Destinations in Style
          </h2>

          <p className="text-gray-600 mb-4 max-w-prose">
            Forget the stress of city traffic and parking. Our executive chauffeur service is the perfect way to experience Manchester.
          </p>

          <p className="text-gray-600 max-w-prose">
            Whether you're heading to a business meeting in Spinningfields, exploring the creative Northern Quarter, or visiting iconic stadiums, we handle all the logistics. We provide effortless, door-to-door service to any destination — sit back and enjoy the journey.
          </p>
        </div>
      </div>
    </section>
  );
}
