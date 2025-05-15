import Link from "next/link";
import React from "react";

const WhyChooseOktaxis = () => {
  return (
    <section className="relative bg-gradient-to-r from-green-100 to-green-50 text-black py-16 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-1/4 bg-brand/20 rounded-r-full"></div>
      <div className="absolute inset-y-0 right-0 w-1/4 bg-brand/20 rounded-l-full"></div>

      <div className="relative container mx-auto px-6 md:px-12 lg:px-20 z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand mb-8 text-center">
          Why Choose OkTaxis Over Public Transport?
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          While public transportation might seem cost-effective, it often lacks convenience and flexibility. Here&apos;s why premium airport transfers by OkTaxis are a better choice:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700">
          <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transform transition">
            <span className="text-brand font-semibold block mb-2">
              Door-to-Door Service
            </span>
            <p>No need to worry about transfers or multiple stops.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transform transition">
            <span className="text-brand font-semibold block mb-2">
              Guaranteed Comfort
            </span>
            <p>Enjoy spacious seating and ample luggage space.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transform transition">
            <span className="text-brand font-semibold block mb-2">
              Personalized Routes
            </span>
            <p>Tailored to your travel requirements.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transform transition">
            <span className="text-brand font-semibold block mb-2">
              Luxury Experience
            </span>
            <p>Elevate your journey with high-end vehicles and professional service.</p>
          </div>
        </div>

        <h2 className="text-2xl text-brand font-semibold mt-12 mb-8 text-center">
          Tips for Booking OkTaxis Airport Transfers in Manchester and Liverpool
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <ul className="list-disc list-inside text-gray-700 space-y-4">
            <li>
              <span className="text-brand font-semibold">Book Early:</span> Secure your slot and enjoy the best pricing by reserving in advance.
            </li>
            <li>
              <span className="text-brand font-semibold">Read Reviews:</span> Check customer feedback on platforms like Google or TripAdvisor to confirm reliability.
            </li>
            <li>
              <span className="text-brand font-semibold">Compare Services:</span> Evaluate features and pricing to select the best option.
            </li>
            <li>
              <span className="text-brand font-semibold">Provide Accurate Flight Details:</span> Ensure timely service by sharing your flight schedule.
            </li>
            <li>
              <span className="text-brand font-semibold">Opt for Meet and Greet Services:</span> Our drivers will be waiting for you at arrivals with a sign for a seamless experience.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl text-brand font-semibold text-center mb-6">
          Choose OkTaxis for a Smooth Start and Finish to Your Journey
        </h2>
        <p className="text-gray-700 text-center max-w-2xl mx-auto mb-6">
          At OkTaxis, we pride ourselves on delivering top-tier airport transportation services in Manchester and Liverpool. Whether it&apos;s a private transfer, chauffeur service, or business-class ride, we&apos;re committed to providing an exceptional travel experience.
        </p>
        <div className="flex justify-center">
          <Link
            href="/booking"
            className="inline-block px-8 py-4 bg-brand text-white font-semibold rounded-lg shadow-lg hover:bg-brand transition focus:outline-none focus:ring-4 focus:ring-brand"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseOktaxis;
