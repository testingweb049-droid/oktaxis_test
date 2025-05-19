import Image from "next/image";
import HeroImg from "@/assets/bmw.png";

export default function WhyChoose() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-block bg-blue-400/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Our Commitment
            </div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Why Clients Choose <span className="text-blue-400">OKTaxis</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Professional Chauffeurs</h3>
                  <p className="text-gray-300">
                    Our team of experienced chauffeurs ensures that every journey is smooth and enjoyable.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Luxury Fleet</h3>
                  <p className="text-gray-300">
                    Travel in comfort with our premium vehicles maintained to the highest standards.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">24/7 Service</h3>
                  <p className="text-gray-300">
                    We're available round the clock for airport transfers, business meetings, or city tours.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={HeroImg.src}
                alt="OKTaxis Service"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-blue-600 p-6 rounded-xl shadow-lg text-white hidden lg:block w-48">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm font-medium">Daily Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}