import HeroSection2 from "@/components/ui/hero-section2";
import HeroImg from "@/assets/bmw.png";
import Offer from "@/components/ui/do-offer";
import Image from "next/image";
import FleetClasses from "@/components/home/fleet";
import WhyChoose from "@/components/ui/ChooseWhy";

export default function About() {
  return (
    <>
      <HeroSection2
        bgImage={HeroImg.src}
        title="About OKTaxis – Excellence in Chauffeur Services"
        description="Manchester is an amazing and vibrant city that attracts people from all around the world. It's famous for its football, with iconic stadiums for both Manchester United and Manchester City."
      />

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={HeroImg.src}
                  alt="Manchester with OKTaxis"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden lg:block">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm font-medium text-gray-600">Client Satisfaction</div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Discover Manchester
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Experience Manchester in <span className="text-blue-600">Comfort & Style</span>
              </h2>
              <div className="space-y-5 text-gray-600">
                <p className="text-lg leading-relaxed">
                  Beyond the football, Manchester is wonderfully diverse. If you're craving new cultural experiences, 
                  you'll find people from all corners of the globe here. When you visit, don't stick to the usual 
                  chain restaurants—explore and try some unique dishes you haven't tasted before.
                </p>
                <p className="text-lg leading-relaxed">
                  Much like London, Manchester is a bustling metropolis. Whether you're visiting for business or leisure, 
                  there's something for everyone: from shopping and nightlife to conference centers, museums, and plenty 
                  of parks to relax in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Professional Standards</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Punctuality</h3>
              <p className="text-gray-600">
                We understand time is precious. Our drivers are trained to ensure you always arrive on time.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safety</h3>
              <p className="text-gray-600">
                Your safety is our priority. All vehicles undergo regular maintenance and safety checks.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparency</h3>
              <p className="text-gray-600">
                No hidden fees. You'll know the exact price before you book your journey.
              </p>
            </div>
          </div>
        </div>
      </section>
<Offer />
      <WhyChoose/>
<FleetClasses/>
      
    </>
  );
}