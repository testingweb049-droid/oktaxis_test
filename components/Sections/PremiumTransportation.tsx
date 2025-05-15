import React from 'react';
import Link from 'next/link';

const PremiumTransportation = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-green-50 text-black py-12">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
          <span className="text-brand">Premium Airport <span className="text-black">Transportation Services</span> by OkTaxis</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          We offer a variety of services to suit every travel need, ensuring luxury, comfort, and professionalism at every step.
        </p>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6 flex-1">
            <h2 className="text-2xl text-brand font-semibold mb-4">Private Airport Transfers</h2>
            <p className="text-gray-700 mb-4">
              Perfect for families, business travelers, and those seeking privacy.
            </p>
            <p className="text-gray-700">
              Features include direct routes and a fleet of luxurious sedans and SUVs.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex-1">
            <h2 className="text-2xl text-brand font-semibold mb-4">Chauffeur Services</h2>
            <p className="text-gray-700 mb-4">
              A high-end experience with professional drivers and top-of-the-line vehicles.
            </p>
            <p className="text-gray-700">
              Ideal for VIPs, corporate travel, and special occasions.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex-1">
            <h2 className="text-2xl text-brand font-semibold mb-4">Business Class Transfers</h2>
            <p className="text-gray-700">
              Tailored for busy professionals, ensuring punctuality and seamless coordination with your schedule.
            </p>
          </div>
        </div>

        <h2 className="text-2xl text-brand font-semibold mb-6">Key Features of OkTaxis Premium Airport Transfers</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-4 mb-6">
          <li><span className="text-brand font-semibold">24/7 Availability:</span> We’re here whenever you need us, day or night.</li>
          <li><span className="text-brand font-semibold">Luxury Vehicles:</span> Travel in style with our premium fleet of sedans, SUVs, and executive cars.</li>
          <li><span className="text-brand font-semibold">Real-Time Tracking:</span> Track your driver’s location and estimated arrival time through our intuitive system.</li>
          <li><span className="text-brand font-semibold">Luggage Assistance:</span> Friendly drivers assist with your luggage for a hassle-free experience.</li>
          <li><span className="text-brand font-semibold">Transparent Pricing:</span> Enjoy fixed rates without hidden fees or surprises.</li>
          <li><span className="text-brand font-semibold">Professional Drivers:</span> Our knowledgeable and courteous drivers enhance your travel experience.</li>
        </ul>

        <h2 className="text-2xl text-brand font-semibold mb-6">Airports Covered by OkTaxis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl text-brand font-semibold mb-4">Manchester Airport Transfers</h3>
            <p className="text-gray-700">
              As one of the busiest UK airports, Manchester Airport demands efficient and reliable transportation. With OkTaxis, enjoy punctual, premium services that cater to both business and leisure travelers.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl text-brand font-semibold mb-4">Liverpool John Lennon Airport Transfers</h3>
            <p className="text-gray-700">
              Located close to Liverpool's vibrant city center, this hub is a gateway for business and cultural exploration. OkTaxis ensures smooth transfers with tailored routes and luxury vehicles.
            </p>
          </div>
        </div>

        <div className="relative flex justify-center items-center mt-8">
          <div className="absolute inset-0 bg-green-100 rounded-full blur-3xl h-72 w-72 opacity-30 animate-pulse"></div>
          <Link href='/booking' className="px-10 py-4 bg-gradient-to-r from-brand to-brand text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-brand transition-transform">
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumTransportation;
