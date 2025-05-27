import Image from "next/image";
import HeroImg from "@/assets/bmw.png";

export default function WhyChoose() {
  return (
    <section className="py-20 bg-white text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Our Fleet
            </div>
            <h2 className="text-4xl text-black font-bold mb-6 leading-tight">
              Vehicle Options at <span className="text-brand">OKTaxis</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl text-black font-semibold mb-2">1. Economy Cars</h3>
                  <p className="text-black">
                    These are practical, budget-friendly options like the Toyota Prius or Skoda Octavia. They're great for solo travelers or short trips across the city.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl text-black font-semibold mb-2">2. Executive Cars</h3>
                  <p className="text-black">
                    Need a more refined experience? Executive options like the Mercedes E-Class or BMW 5 Series offer extra legroom and a more professional presentation—ideal for meetings or client pickups.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl text-black font-semibold mb-2">3. Executive Premium</h3>
                  <p className="text-black">
                    For top-tier comfort, look for vehicles like the Tesla Model S. These cars offer luxury interiors, smooth rides, and modern amenities like Wi-Fi or phone charging.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl text-black font-semibold mb-2">4. XL & Group Vehicles</h3>
                  <p className="text-black">
                    Traveling with a group or a lot of bags? A van or larger car (like a Ford Tourneo or Mercedes V-Class) might be your best bet. These fit up to 8 passengers with plenty of room for luggage.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={HeroImg.src}
                alt="OKTaxis Fleet"
                fill
                className="object-cover"
              />
            </div>
            {/* <div className="absolute -bottom-6 -left-6 bg-brand p-6 rounded-xl shadow-lg text-white hidden lg:block w-48">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm font-medium">Vehicles in Our Fleet</div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}