import HeroSection2 from "@/components/ui/hero-section2";
import HeroImg from "@/assets/bmw.png";
import HeroImge from "@/assets/bmw1.png";
import Offer from "@/components/ui/do-offer";
import Image from "next/image";
import FleetClasses from "@/components/home/fleet";
import Seo from "../../../components/Seo";
// about
// about
export default function About() {
  return (
    <>
      <Seo
        title="About OkTaxis | Premium Chauffeur Service in Manchester"
        description="Learn about OkTaxis, Manchester’s trusted chauffeur and private taxi service. Discover our values of punctuality, safety, and customer care."
        url="https://oktaxis.co.uk/about"
        image="https://oktaxis.com/og-image.jpg"
      />
      <HeroSection2
        bgImage={HeroImge.src}
        title="Premium Chauffeur Services Manchester | OKTaxis"
      />

      {/* ✅ Offer section moved to top for consistency */}
      <Offer />

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
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Experience Manchester in{" "}
                <span className="text-brand">Comfort & Style</span>
              </h2>
              <div className="space-y-5 text-gray-600">
                <p className="text-lg leading-relaxed">
                  OKTaxis is a Manchester-based private hire company dedicated to delivering a premium travel experience. Our journey began with a simple goal: to offer first-class premium chauffeur services Manchester that combine luxury, reliability, and local expertise.

                </p>
                <p className="text-lg leading-relaxed">
                  Drawing from our roots in the North West, we've evolved by listening to client needs, such as providing flexible hourly chauffeurs for busy professionals or customized city tours Manchester for tourists exploring landmarks like the Manchester Cathedral or Salford Quays. This real-world experience allows us to anticipate challenges, like navigating match-day traffic for stadium transfers Manchester to Old Trafford or Etihad Stadium, ensuring every ride is stress-free.

                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Our Commitment to Excellence
              </div>
              <div className="space-y-6 text-gray-600">
                <p className="text-lg leading-relaxed">
                  At OKTaxis, we believe that details matter. Punctuality, safety, and transparent pricing are the cornerstones of our service – principles we've upheld through rigorous driver training and fleet maintenance. Our professional chauffeurs arrive on time, in uniform, and ready to assist with your luggage and needs, whether it's multilingual support for global visitors or child seats for family airport services. We've earned trustworthiness through consistent 4.9-star reviews on platforms like Google and Trustpilot, with clients praising our no-hidden-fees approach and 30-minute free wait times.

                </p>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                The <span className="text-brand">OKTaxis</span> Difference
              </h2>
              <div className="space-y-6 text-gray-600">
                <p className="text-lg leading-relaxed">
                  Serving Manchester and nearby cities like Liverpool, Leeds, and beyond, OKTaxis prides itself on a reputation for excellence. Whether you’re a busy executive needing executive airport transfers, a visitor on city tours Manchester, or a local resident heading out for a special occasion like a wedding or event, you can rely on our personal approach and 24/7 support. What sets us apart:

                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
                  <li>
                    <strong>Local Expertise:</strong> In-depth knowledge of Manchester's routes and attractions, honed from years of service.
                  </li>
                  <li>
                    <strong>Client-Centric Focus:</strong> Tailored solutions, such as a meet-and-greet for Manchester airport services or flexible packages for wedding chauffeur Manchester.
                  </li>
                  <li>
                    <strong>Proven Track Record:</strong> Hundreds of successful rides, including high-profile events, demonstrating our authority in the luxury transport niche.
                  </li>
                </ul>
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
        <div className="container mx-auto px-4 max-w-6xl">
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
