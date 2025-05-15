import Link from "next/link";
import Image from "next/image";
import React from "react";
import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";

const AirportTransportation = () => {
  return (
    <div className="w-full mt-20">
      {/* Hero Section with Gradient Background */}
      <section className="relative w-full  flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand mb-4 drop-shadow-lg">
          Effortless Airport Transportation
        </h1>


        <h2 className="text-xl md:text-2xl text-brand font-semibold mb-4">
          Premium Travel Solutions by OkTaxis
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed ">
          Traveling can be an exciting adventure, but getting to and from the airport often presents challenges. At{' '}
          <span className="font-semibold text-brand">OkTaxis</span>, we provide seamless and reliable airport transportation services in Manchester and Liverpool, ensuring your journey begins and ends on the right note.
        </p>
        <div className="rounded-lg shadow-lg w-full max-h-[800px] h-full overflow-hidden  ">
          <Image
            src={image1}
            quality={50}
            alt="Luxury Taxi Service"
            className=" w-full min-h-80 h-full object-cover"
          />
        </div>

      </section>

      {/* Content Section */}
      <section className="bg-white text-black py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-screen-xl mx-auto text-center">


          {/* Why Choose Section */}
          <h3 className="text-2xl sm:text-4xl font-semibold mb-6 text-brand">
            Why Reliable Airport Transportation Matters
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Side */}
          <div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Choosing the right airport transfer service is crucial for a stress-free travel experience. At{' '}
              <span className="font-semibold text-brand">OkTaxis</span>, we bridge the gap between your home, office, or hotel and major airports like Manchester Airport and Liverpool John Lennon Airport.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                { title: "Time Efficiency", desc: "Never worry about missing a flight; our services ensure punctual pick-ups and drop-offs." },
                { title: "Comfort and Convenience", desc: "Experience a hassle-free journey with luxury vehicles and courteous drivers." },
                { title: "Safety First", desc: "Licensed, insured, and well-trained drivers guarantee a secure ride." },
                { title: "Stress-Free Travel", desc: "Skip the parking hassles and unpredictable public transportation." },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 shadow-md rounded-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-lg">
                  <h4 className="text-brand font-bold text-lg mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="flex justify-center w-full h-full  rounded-lg shadow-lg overflow-hidden">
            <Image
              src={image2}
              alt="Luxury Taxi Service"
             quality={50}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="flex justify-center mt-12">
          <Link
            href="/booking"
            className="bg-brand text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-brand hover:shadow-2xl transition duration-300"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AirportTransportation;