// import FleetClasses from "@/components/home/fleet";
// import Offer from "@/components/ui/do-offer";
// import HeroSection2 from "@/components/ui/hero-section2";
// import ImageTextSection from "@/components/ui/ImageTextSection";
// import Image from "next/image";
// import Link from "next/link";
import {
  FaWifi,
  FaCoffee,
  FaCar,
  FaClock,
  FaBell,
  FaSuitcase,
  FaHeadset,
  FaStar,
} from "react-icons/fa";
import { Check } from "lucide-react";
import Seo from "@/components/Seo";
import PageBanner from "@/components/PageBanner";
import PageAboutSection from "@/components/PageAboutSection";
import PageFeatureSection from "@/components/PageFeatureSection";
import InfoCards from "@/components/Sections/InfoCards";
import AreaServeSection from "@/components/AreaServeSection";
import LocationPinIcon from "@/components/LocationPinIcon";
import OurServicesSection from "@/components/OurServicesSection";
import FleetClasses from "@/components/home/fleet";
import ReviewsSection from "@/components/Sections/reviews";
import ConnectionAreasSection from "@/components/ConnectionAreasSection";

const FixedPricesIcon = () => (
  <svg
    width="43"
    height="43"
    viewBox="0 0 43 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.7721 19.1885C16.7759 18.1499 15.4908 17.076 15.4908 15.4036C15.4908 13.4848 17.2689 12.1469 20.244 12.1469C23.3775 12.1469 24.5394 13.6432 24.645 15.8438H28.5355C28.4123 12.8158 26.5639 10.0344 22.8846 9.13656V5.28125H17.6033V9.08375C14.1881 9.82312 11.4419 12.0413 11.4419 15.4389C11.4419 19.5054 14.8043 21.5299 19.7158 22.7094C24.1169 23.7656 24.9971 25.3148 24.9971 26.952C24.9971 28.1667 24.1345 30.1031 20.244 30.1031C16.6175 30.1031 15.1916 28.4835 14.9979 26.4062H11.125C11.3362 30.2616 14.2233 32.4269 17.6033 33.1486V36.9688H22.8846V33.1839C26.3174 32.5325 29.046 30.5432 29.046 26.9344C29.046 21.9348 24.7682 20.2272 20.7721 19.1885Z"
      fill="#FFB400"
    />
  </svg>
);

const FlightTrackingIcon = () => (
  <svg
    width="37"
    height="37"
    viewBox="0 0 37 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.7998 14.3727H23.4662L16.7223 2.56992C16.6324 2.41278 16.5025 2.28219 16.3459 2.19137C16.1893 2.10055 16.0114 2.05272 15.8304 2.05273L11.6275 2.05273C10.9454 2.05273 10.4532 2.70531 10.6406 3.36109L13.7867 14.3727H7.1865L4.4145 10.6767C4.22071 10.4181 3.91592 10.2661 3.59316 10.2661H1.02714C0.359163 10.2661 -0.13107 10.8936 0.0312715 11.5417L2.05316 18.4794L0.0312715 25.4171C-0.13107 26.0652 0.359163 26.6927 1.02714 26.6927H3.59316C3.91656 26.6927 4.22071 26.5407 4.4145 26.2821L7.1865 22.5861H13.7867L10.6406 33.5971C10.4532 34.2528 10.9454 34.9061 11.6275 34.9061H15.8304C16.1987 34.9061 16.5388 34.7084 16.7217 34.3889L23.4662 22.5861H30.7998C33.0681 22.5861 36.9598 20.7477 36.9598 18.4794C36.9598 16.2111 33.0681 14.3727 30.7998 14.3727Z"
      fill="#FFB400"
    />
  </svg>
);

const BusinessReadyIcon = () => (
  <svg
    width="37"
    height="37"
    viewBox="0 0 37 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M36.6759 12.6432C26.4416 3.17711 10.5243 3.18057 0.293978 12.6432C-0.0907412 12.999 -0.0982507 13.6015 0.27376 13.9706L2.25165 15.9329C2.60634 16.2853 3.17706 16.2928 3.5456 15.9549C11.9748 8.23276 24.994 8.23102 33.4249 15.9549C33.7934 16.2928 34.3641 16.2847 34.7188 15.9329L36.6967 13.9706C37.0682 13.6015 37.0606 12.999 36.6759 12.6432ZM18.485 24.0299C16.4429 24.0299 14.788 25.6849 14.788 27.7269C14.788 29.7689 16.4429 31.4239 18.485 31.4239C20.527 31.4239 22.182 29.7689 22.182 27.7269C22.182 25.6849 20.527 24.0299 18.485 24.0299ZM30.1923 19.2013C23.5342 13.3132 13.4281 13.3196 6.77759 19.2013C6.37901 19.5537 6.3663 20.1654 6.74467 20.5386L8.73411 22.502C9.08071 22.844 9.63872 22.8671 10.0078 22.5482C14.8573 18.3562 22.1236 18.3654 26.9615 22.5482C27.3306 22.8671 27.8886 22.8446 28.2352 22.502L30.2247 20.5386C30.6036 20.1654 30.5903 19.5531 30.1923 19.2013Z"
      fill="#FFB400"
    />
  </svg>
);

export default function AirportTransfer() {
  return (
    <>
      <Seo
        title="Manchester Airport Transfers | Reliable Taxi & Chauffeur Service"
        description="Book seamless Manchester airport transfers with OKTaxis. Enjoy executive chauffeur service, flight tracking, and 24/7 pickups from Manchester, Liverpool, and UK airports. Stress-free travel starts here."
        url="https://oktaxis.co.uk/services/airport-transfer"
        image="https://oktaxis.co.uk/images/airport-transfer.png"
      />

      <PageBanner
        heading="Airport Chauffeur Service | Manchester & Liverpool Transfers"
        text="Premier airport chauffeur service for the North West. Luxury transfers for Manchester (MAN) and Liverpool (LPL) airports. Serving Chester, Preston, and Leeds. Fixed pricing."
        
      />

      <PageAboutSection
        heading="Start Your Journey in Comfort"
        text={
          <>
            <p>
              Starting your holiday or business trip should be relaxing, not stressful. At OkTaxis, we specialize in luxury airport transfers across the North West of England. We are not a faceless nationwide agency that farms out jobs; we are local experts. Our drivers know the M56, the M62, and the East Lancs Road inside out. We guarantee that when you book an airport chauffeur service with us, you are getting a driver who knows the route, avoids the traffic, and arrives in a pristine Mercedes-Benz vehicle.            </p>

          </>
        }
        image="/assets/airport-transfer-images/airport-about-img.png"
        imageAlt="Start Your Journey in Comfort"
        imagePosition="right"

      />

      <InfoCards
        title="Our Key Airport Hubs"
        cards={[
          {
            image: "/assets/airport-transfer-images/airport-info-img-1.png",
            imageAlt: "Manchester Airport",
            heading: "Manchester Airport (MAN)",
            text: "The UK's global gateway in the North. We cover Terminals 1, 2, and 3 with a full \"Meet and Greet\" service. Whether you need a transfer to the city center or a long-distance ride to Leeds or the Lake District, our Manchester airport chauffeur service is the reliable choice.",
            linkText: "View Manchester Airport Service",
            linkHref: "/manchester-airport"
          },
          {
            image: "/assets/airport-transfer-images/airport-info-img-2.png",
            imageAlt: "Liverpool John Lennon Airport",
            heading: "Liverpool John Lennon Airport (LPL)",
            text: "The convenient choice for European travel and budget airlines. Public transport here can be limited. We provide direct Liverpool airport transfers to Manchester, Chester, and Merseyside, ensuring you don't have to wait for slow connecting buses.",
            linkText: "View Liverpool Airport Service",
            linkHref: "/liverpool-airport"
          }
        ]}
      />

      <PageFeatureSection
        image="/assets/airport-transfer-images/airport-feature-img.png"
        imageAlt="Inter-Airport Transfers: Manchester to Liverpool"
        heading="Inter-Airport Transfers: Manchester to Liverpool"
        text={[
          "Connecting flights between these two cities is common, but public transport between them is poor (often requiring a train change with heavy bags).",
          "We provide a direct Manchester to Liverpool airport transfer. The journey takes approximately 45-60 minutes via the M62. You can relax in the back of an E-Class or V-Class, knowing your driver handles the motorway traffic."
        ]}
        bulletPoints={["Fastest, most reliable connection."]}
        imagePosition="left"
      />

      <AreaServeSection
        heading="Areas We Serve (The North West & Beyond)"
        cards={[
          {
            icon: LocationPinIcon,
            heading: "Chester",
            text: "We offer a fast, direct link from Chester city center and business parks to Manchester Airport via the M56. It is the perfect, reliable alternative to the often-delayed airport train line."
          },
          {
            icon: LocationPinIcon,
            heading: "Preston",
            text: "As the transport hub of Lancashire, getting from Preston to the airport can be stressful on public transport. Our private cars use the M6 to deliver you directly to the terminal door."
          },
          {
            icon: LocationPinIcon,
            heading: "Leeds",
            text: "We specialize in the \"Cross-Pennine\" route. Our drivers navigate the M62 daily, offering a comfortable and private workspace for clients traveling between Leeds business districts and Manchester Airport."
          }
        ]}
      />

      <OurServicesSection
        headline="Why Choose Our Service?"
        services={[
          {
            icon: <FixedPricesIcon />,
            title: "Fixed Prices",
            description:
              "No ticking meters. The price for your airport chauffeur service is agreed in advance, even if there is heavy traffic on the Runcorn Bridge or the M60.",
          },
          {
            icon: <FlightTrackingIcon />,
            title: "Flight Tracking",
            description:
              "We monitor all arrivals at both Manchester and Liverpool. We know if your EasyJet or Ryanair flight is delayed and adjust your pickup time automatically.",
          },
          {
            icon: <BusinessReadyIcon />,
            title: "Business Ready",
            description:
              "Our vehicles are equipped for work. Use the travel time to answer emails or make calls in a quiet, private environment.",
          },
        ]}
      />

      <FleetClasses />


      <ReviewsSection />

      {/* All commented content below */}
      {/* 
      <HeroSection2
        bgImage="/images/airport-transfer.png"
        title="Premier Chauffeur Service at Manchester Airport for Luxury Transfers"
      />

      <Offer />
      <ImageTextSection
        imageSrc="/chauffeur.jpg"
        imageAlt="Manchester Airport Transfers"
        imagePosition="left"
        headingAs="h2"
        text={
          <>
            <p>
              When you need a reliable chauffeur service at Manchester Airport, <strong className="text-brand underline"> OKTaxis</strong> stands out for its luxury, professionalism, and trust, making every journey smooth and stress-free. With years of experience chauffeuring business leaders, VIPs, and families since 2007, we turn hectic airport trips into calm experiences.
            </p>
            <p className="mt-4">
              Based at 0B Portway, Wythenshaw, Manchester, we handle the third-busiest hub in the UK, serving 27 million passengers to 200 destinations with exceptional care. Our 5 stars on Google reflect our commitment to excellence, ensuring confidence for corporate or leisure travellers.
            </p>
          </>
        }
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">
        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">
          Our licensed chauffeurs, trained with advanced driving credentials, deliver elite standards with security and discretion — perfect for overseas delegations or high-profile clients. Unlike non-compliant providers risking fines or reputational damage, we're fully compliant with regulations, insurance, and GDPR-assured data protection.
        </p>
        <p className=" text-lg  text-gray-700 pb-4 leading-relaxed">
          Clients like Sully from Derby and Jane praise our courteous, immaculate presentation, while our personalised care — including female chauffeurs on request — makes us the best chauffeur service at Manchester Airport. Book via <strong className="text-brand underline">OKTaxis.co.uk</strong>  or call <strong className="text-brand"> +44 7788 710290</strong> for tailored airport transfers in Manchester.
        </p>
        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Trusted Expertise: Over 15 years of professional service with 5-star ratings.",
            "Safe and Discreet: Licensed, insured drivers with privacy-first options.",
            "Personalised Service: Bespoke transfers for business or family needs.",
            "Compliant Operations: Full adherence to regulations for peace of mind.",
            "Local Knowledge: Navigating Northwest England for smooth, timely rides."
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
      <ImageTextSection
        imageSrc="/images/airport-transfer.png"
        imageAlt="Manchester Airport Transfers"
        imagePosition="right"
        headingAs="h2"
        title={
          <>
            Simple Steps to Book a Luxury Chauffeur at{" "}
            <span className="text-brand">Manchester Airport</span>
          </>
        }
        text={
          <>
            <p>
              Securing a luxury chauffeur service at Manchester Airport couldn't be simpler or more reassuring, especially for those juggling packed schedules and needing dependable airport transfers Manchester. From my long history managing high-end executive rides, I always advise kicking off with our user-friendly online platform at OKTaxis—just key in your flight info, terminal, and endpoint for a prompt quote.
            </p>
            <p className="mt-4">
              This approach shines during rush periods at this bustling UK hub with its massive passenger volumes. Our attentive staff promises on-time collections, easing any post-flight fatigue.
            </p>
          </>
        }
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">
        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">
          Dial +44 7788 710290 or drop a line to <strong className="text-brand underline">info@oktaxis.co.uk </strong> for bespoke setups like varied routes or special offers across Greater Manchester.
        </p>
        <p className=" text-lg  text-gray-700 pb-4 leading-relaxed">
          Operating from our Wythenshawe spot at 0B Portway, Manchester, we've streamlined arrangements for professionals and loved ones, featuring live flight tracking to adapt to any shifts. This thoughtful strategy earns loyalty, as mirrored in our strong 4.9 Google feedback. We aim to make your entire experience straightforward and utterly reliable.
        </p>
        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Quick Online Quote: Instant, clear pricing options.",
            "Flexible Booking Options: Hourly or return hires.",
            "Personal Support Team: Phone advice for preferences.",
            "Secure and Simple Process: GDPR-safe easy bookings.",
            "Real-Time Adjustments: Tracking for smooth arrivals."
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
      <ImageTextSection
        imageSrc="/Manchester Taxis.png"
        imageAlt="Executive"
        imagePosition="left"
        headingAs="h2"
        title={
          <>
            Key Benefits of <span className="text-brand">Executive Transfers</span> with Safety and Discretion
          </>
        }
        text={
          <>
            <p>
              Selecting executive airport transfers Manchester puts a premium on safety and discretion, vital for VIPs and business pros at Manchester Airport. Through my transport insights gained since 2007, our credentialed licensed chauffeurs with security expertise set elite benchmarks, dodging pitfalls from unlicensed outfits like penalties or legal troubles.
            </p>
            <p className="mt-4">
              Strict alignment with regulations, insurance, and protection protocols safeguards your standing and personnel.
            </p>
          </>
        }
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">
        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">
          That's why top finance entities count on our subtle handling. We excel in tense scenarios, from private aircraft links to nocturnal drives, with quiet modes preserving confidentiality.
        </p>
        <p className=" text-lg  text-gray-700 pb-4 leading-relaxed">
          Bolstered by thorough preparation and tools like contact masking, we guarantee total serenity, establishing us as the top chauffeur service at Manchester Airport.
        </p>
        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Top Safety Features: Insured vehicles, skilled drivers.",
            "Discreet Handling: Privacy modes for comfort.",
            "Compliant Operations: Full licensing, data safeguards.",
            "Personalised Security: Female drivers available.",
            "Proven Trust: 4.9 ratings for reliability."
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
      <ImageTextSection
        imageSrc="/images/airport-transfer.png"
        imageAlt="Stress-Free Travel Experience"
        imagePosition="right"
        headingAs="h3"
        title={
          <>
            Exclusive <span className="text-brand font-bold">Chauffeur Transfers</span>{" "}
            <span className="text-brand font-bold">from Manchester Airport</span> to Key Cities
          </>
        }
        text={
          <>
            <p>
              Our premium chauffeur transfers from Manchester Airport to places like Leeds and Liverpool blend elegance with efficiency, perfect for work or relaxation. Based on my direct dealings with global teams, we master Northwest pathways, sidestepping morning jams for a brisk 30-minute centre reach.
            </p>
            <p className="mt-4">
              Extending to areas like Stockport and Cheshire, we connect seamlessly to highlights such as Grand Theatre or Albert Dock. This dependable timing fosters assurance in each outing. For elite excursions to Royal Armouries Museum or Beatles Story, our licensed crew ensures private rides that uphold reputations.
            </p>
          </>
        }
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">
        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">
          Accolades from Ravi celebrate our route savvy in BMWs for corporate events, making trips truly pleasant. With mapping aids and online tools, we manage exact timings for all flights. As specialists in airport transfers Leeds to Manchester, we offer outstanding worth.
        </p>
        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Tailored City Routes: Straight to Leeds, Liverpool.",
            "Peak Time Expertise: Avoid crowds for speed.",
            "Landmark Stops: Dock or museum inclusions.",
            "Regional Reach: High Peak, Saddleworth covered.",
            "Trusted Journeys: Pro handling for all."
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
      <ImageTextSection
        imageSrc="/images/mercedes.png"
        imageAlt="Luxury Vehicles and Meet & Greet"
        imagePosition="left"
        headingAs="h2"
        title={
          <>
            Luxury Vehicles and{" "}
            <span className="text-brand">Meet &amp; Greet</span> for Smooth{" "}
            <span className="text-brand">Airport Journeys</span>
          </>
        }
        text={
          <>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Dive into luxury vehicles and meet-and-greet at Manchester Airport for flawlessly smooth airport journeys, shifting landings into calm welcomes. Having driven in pristine Mercedes E-Class with plush interiors, I've observed how our elite selections grant ample space and relief after travels. Our V-Class variants include seating setups and chillers, suited for teams.
              </p>
              <p>
                Featuring a free 60-minute wait plus perks like water, we cut down on hassles. Our polished meet-greet involves a warm driver at arrivals with iPad signage, aiding with bags and guiding to your ride.
              </p>
            </div>
          </>
        }
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">
        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">
          My know-how in flight ops syncs perfectly via supports like Signature, flexing for changes. Cleaned cabins with kid seats and papers bring extra warmth. This fine-tuned care sets us apart in executive car service.
        </p>
        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Premium Meet Service: Signs, luggage help.",
            "Free Waiting Time: Hour post-landing grace.",
            "Comfortable Features: Space, chillers, clean.",
            "Vehicle Choices: Mercedes E-Class, V-Class.",
            "Logistics Mastery: Monitoring for precision."
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
      <ImageTextSection
        imageSrc="/images/hourly-service.png"
        imageAlt="Premium Chauffeur Fleet in Manchester"
        imagePosition="right"
        headingAs="h2"
        title={
          <>
            Our Premium in Manchester —{" "}
            <span className="text-brand">Fleet & Easy Booking</span> for{" "}
            <span className="text-brand">Chauffeur Service</span> in Manchester
          </>
        }
        text={
          <>
            <p>
              Uncover our premium fleet for chauffeur service in Manchester, pairing high-end rides with hassle-free booking for peak convenience. Options like Mercedes E-Class and estates boast roomy storage for gear, kept impeccably through regular upkeep. Since launching in 2007, I've guided fleets radiating class and polish, securing 4.9 stars on FreeIndex. Complete with sanitisers, refreshments, and sharply dressed drivers, each trip exudes warmth and sophistication.
            </p>
          </>
        }
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">
        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">
          Booking eases via <strong className="text-brand underline">OK Taxis </strong> GET PRICES for straightforward distance or hourly fees. My routing skills dodge spots like Junction 21 for traffic-free paths, adding live updates for accuracy. Slip in stops for basics like groceries, with our sharp crew handling last details. This leads to happy faces and unforgettable ventures.
        </p>
        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Varied Fleet Selection: Luxury models for sizes.",
            "Effortless Online Booking: Quick site quotes.",
            "Timely Route Planning: Navigation skips delays.",
            "Thoughtful Extras: Tracking, custom stops.",
            "Expert Driver Support: Qualified for style."
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
      <FleetClasses />
      <section className="py-16 bg-white">
        <div className="full-width-section mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key Features of Our <span className="text-brand">Manchester Airport Chauffeur Services</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaClock className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Complimentary Waiting</h3>
              <p className="text-gray-600">
                Generous free wait time for delayed flights—essential for busy airports like Manchester.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaSuitcase className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Luggage Assistance</h3>
              <p className="text-gray-600">
                Chauffeurs handle all baggage, getting you settled quickly.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaCar className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
              <p className="text-gray-600">
                Round-the-clock service for any flight to Manchester, Liverpool, or other UK airports.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customized Rides</h3>
              <p className="text-gray-600">
                Tailored for weddings, corporate events, stadium transfers, or city tours in Manchester.
              </p>
            </div>
          </div>
          <p className="text-center text-gray-700 text-lg mt-12 max-w-3xl mx-auto">
            These perks ensure every ride is memorable and stress-free.
          </p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="full-width-section mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Benefits of Booking <span className="text-brand">Airport Transfers with OKTaxis</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
              <p className="text-gray-700">
                Avoid queues with direct meet-and-greet and pre-booked rides.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Cost-Effective</h3>
              <p className="text-gray-700">
                Competitive fixed rates beat surge pricing from apps.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-700">
                Fully licensed chauffeurs and vehicles with GPS tracking.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly Options</h3>
              <p className="text-gray-700">
                Hybrid and electric vehicles like the Tesla Model S for sustainable travel.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
              <p className="text-gray-700">
                Transfers from Manchester to Old Trafford, city centers, or nationwide destinations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Ideal for Business Travelers</h3>
              <p className="text-gray-700">
                Our executive airport transfer Manchester service includes productivity features like Wi-Fi for on-the-go work.
              </p>
            </div>
          </div>
        </div>
      </section>
      */}
    </>
  );
}
