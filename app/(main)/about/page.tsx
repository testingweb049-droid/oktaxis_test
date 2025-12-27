import { Metadata } from "next";
import HeroSection2 from "@/components/ui/HeroSection2";
import HeroImg from "@/assets/bmw.png";
import HeroImge from "@/assets/bmw1.png";
import OfferSection from "@/components/ui/OfferSection";
import Image from "next/image";       
import FleetClasses from "@/components/home/fleet";
import { Check } from "lucide-react";
import { generateMetadata as generateSEOMetadata, generateWebPageSchema } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = generateSEOMetadata({
  title: "About Ok Taxis | Premium Chauffeur Service in Manchester",
  description:
    "Learn about OkTaxis, Manchester's trusted chauffeur and private taxi service. Discover our values of punctuality, safety, and customer care.",
  pageUrl: "/about",
  keywords: [
    "about oktaxis",
    "manchester taxi company",
    "chauffeur service history",
    "reliable taxi manchester",
  ],
});

// about
// about
export default function About() {
  const breadcrumbs = [
    { name: "Home", url: "https://oktaxis.co.uk/" },
    { name: "About", url: "https://oktaxis.co.uk/about" },
  ];

  return (
    <>
      <StructuredData
        data={generateWebPageSchema({
          title: "About Ok Taxis | Premium Chauffeur Service in Manchester | OKTaxis",
          description:
            "Learn about OkTaxis, Manchester's trusted chauffeur and private taxi service. Discover our values of punctuality, safety, and customer care.",
          url: "https://oktaxis.co.uk/about",
          breadcrumbs,
        })}
        id="about-schema"
      />
      <HeroSection2
        bgImage={HeroImge.src}
        title="Premium Chauffeur Services Manchester | OKTaxis"
      />

      {/* ✅ Offer section moved to top for consistency */}
      <OfferSection />

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full max-w-6xl mx-auto px-4">
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
                <div className="text-2xl font-bold text-brand">100%</div>
                <div className="text-sm font-medium text-gray-600">
                  Client Satisfaction
                </div>

              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="inline-block bg-black text-brand px-4 py-2 rounded-full text-sm font-medium mb-4">
                Discover Manchester
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Experience Manchester in{" "}
                <span className="text-brand">Comfort & Style</span>
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg leading-relaxed">
                  Discover Manchester with OKTaxis in ultimate comfort and style, free from any hassle. Our vehicles feature plush leather seats, efficient air conditioning, and complimentary Wi-Fi, ideal for relaxing or working on the go. Local drivers share insider tips on spots like the Northern Quarter or Old Trafford, crafting personalised tours that capture the city's vibrant essence. Whether navigating buzzing streets or serene outskirts, we ensure discreet, secure rides with advanced safety tech and immaculate cars. 


                </p>

              </div>
            </div>

          </div>
          <div className="w-full max-w-7xl mx-auto px-4">
            <p className=" text-lg mt-4 pb-2 text-gray-700 leading-relaxed">
              As your trusted travel partner, we even assist with dinner bookings or show tickets, making every trip fresh, enjoyable, and perfectly suited to VIPs or first-time visitors.
            </p>


            <ul className="mt-4 space-y-3 text-gray-800">
              {[
                "Plush leather seats and Wi-Fi",
                "Efficient air con for comfort",
                "Insider tips on local spots",
                "Personalised city tours available",
                "Discreet, secure VIP services",
                "Assistance with bookings and tickets"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <span className="ml-3 text-base md:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              {/* <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Our Commitment to Excellence
              </div>
              <div className="space-y-6 text-gray-600">
                <p className="text-lg leading-relaxed">
                  At OKTaxis, we believe that details matter. Punctuality, safety, and transparent pricing are the cornerstones of our service – principles we've upheld through rigorous driver training and fleet maintenance. Our professional chauffeurs arrive on time, in uniform, and ready to assist with your luggage and needs, whether it's multilingual support for global visitors or child seats for family airport services. We've earned trustworthiness through consistent 4.9-star reviews on platforms like Google and Trustpilot, with clients praising our no-hidden-fees approach and 30-minute free wait times.

                </p>
                  
              </div> */}
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                The <span className="text-brand">OKTaxis</span> Difference
              </h2>
              <div className="space-y-6 text-lg mt-4 pb-2 text-gray-700 leading-relaxed">
                <p>What truly distinguishes OKTaxis in Manchester's chauffeur services is our unwavering commitment to trust, expertise, and personalised care as a family-run business. Backed by glowing reviews for consistent reliability, our drivers receive rigorous training in customer service and safe driving, ensuring professional interactions every time. We maintain affordable prices without compromising quality, with spotless cars ready for action—contact us at <strong className="text-brand">+44 7788 710290</strong> , <strong className="text-brand underline">info@oktaxis.co.uk</strong>, or visit 0B Portway, Wythenshawe, Manchester. Anticipating needs like luggage assistance or traffic avoidance, our intuitive tech simplifies bookings and updates, while staying informed on local events for seamless planning. Embracing eco-friendly practices, we foster lasting relationships through genuine, expert service that positions us as the premier choice.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/luxury chauffeur service (3).png"
                  alt="OKTaxis Service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand p-6 rounded-xl shadow-lg text-white hidden lg:block w-48">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm font-medium">Service Availability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FleetClasses />
      <section className="py-20 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {
                <span className="text-3xl md:text-4xl font-bold">
                  Our Professional{' '}
                  <span className="text-brand text-3xl md:text-4xl font-bold">Standards</span>{' '}

                </span>
              }
            </h2>
            <div className="w-20 h-1 bg-brand mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-all">
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Punctuality
              </h3>
              <p className="text-gray-600">
                We understand time is precious. Our drivers are trained to
                ensure you always arrive on time.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-all">
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safety</h3>
              <p className="text-gray-600">
                Your safety is our priority. All vehicles undergo regular
                maintenance and safety checks.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-all">
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Transparency
              </h3>
              <p className="text-gray-600">
                No hidden fees. You'll know the exact price before you book your
                journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
