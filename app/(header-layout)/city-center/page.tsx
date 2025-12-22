import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import {
  FaClock,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaBriefcase,
} from "react-icons/fa";
import { Check } from "lucide-react";
import Seo from "@/components/seo";
export default function CityCenter() {
  return (
    <>
      <Seo
        title="Taxi Manchester City Centre | 24/7 Executive City Transfers"
        description="Book premium taxis in Manchester city centre with OKTaxis. Enjoy fixed rates, executive cars, and fast pickups for shopping, business or night outs."
        url="https://oktaxis.co.uk/city-centre"
        image="https://oktaxis.co.uk/Luxury%20Chauffeur%20Service%20(2).webp"
         breadcrumbs={[
          { position: 1, name: "City Center", item: "https://oktaxis.co.uk/city-centre" },
          { position: 2, name: "City Center" }
        ]}
      />
      <HeroSection2
        bgImage="/Luxury Chauffeur Service (2).webp"
        title="Premier Taxi Services in Manchester City Centre by OK Taxis"
      // description="Whether you're having a laid-back shopping trip or a night out in central Manchester, avoid the hassle of driving and public transport. Reserve your taxi ahead of time online or whenever you need through the OKTaxis website. Budget-friendly taxis available whenever you need them."
      />
      <Offer />
      <ImageTextSection
        imageSrc="/Luxury Chauffeur Service (2).png"
        imageAlt="Executive Airport Transfer"
        title={
          <span className="text-3xl md:text-4xl font-bold">


            24/7
            <span className="text-brand text-3xl md:text-4xl font-bold"> Airport Transfers</span>
            {' '} with Care


          </span>
        }

        text={
          <>
            <p className="mb-5">
              For seamless travel to or from Manchester Airport, rely on OK Taxis' 24/7 airport transfers that eliminate worries, informed by my personal experiences with stressful flight delays. We monitor flights in real-time for precise on-time pickups, handling transfers from Manchester airport to city centre via intelligent routes that bypass traffic jams.

            </p>
            <p>Our eco-friendly fleet, including models like the Toyota Prius, accommodates three passengers and two large bags comfortably, ensuring safe arrivals day or night without complications.  </p>

          </>
        }
        bgColor="bg-white"
        imagePosition="left"
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-4 text-gray-700 leading-relaxed">

          Catering to business or family travellers, we provide child seat options at no additional cost, contrasting with competitors' hidden fees through our transparent, affordable pricing.

        </p>
        <p className=" text-lg  text-gray-700 pb-4 leading-relaxed">

          As vetted experts, we serve routes from London to Stansted, addressing challenges like late-night arrivals with dependable service that fosters genuine trust. Count on our authoritative approach for worry-free transportation that positions us as the top provider in the region.


        </p>

        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Flight tracking for timely pickups.",
            "Eco-friendly vehicles cutting emissions.",
            "Child seats ensuring family safety.",
            "No charges for luggage waits.",
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
        imageSrc="/Taxi in Manchester City Centre (1).png"
        imageAlt="Manchester city taxi"
        imagePosition="right"
        bgColor="bg-white"
        title={
          <span className="text-3xl md:text-4xl font-bold">
            Safe and{" "}
            <span className="text-brand text-3xl md:text-4xl font-bold">Comfortable Journeys</span>{" "}
            Every Time
          </span>
        }
        text={
          <>
            <p>
              When seeking a taxi in Manchester city centre, prioritise comfort and safety with OK Taxis, drawing from my extensive industry experience where bumpy rides often exhaust passengers after long days. Our vehicles remain impeccably clean and spacious, featuring soft seats and efficient air conditioning for ultimate relaxation during any journey.

            </p>

            <p className="mt-4">
              We emphasise safe journeys by employing modern equipment to navigate road challenges effectively, whether for short hops or long-distance drives, ensuring you feel completely at ease from pickup to drop-off.
            </p>
          </>
        }

      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">

        <p className=" text-lg pb-4 text-gray-700 leading-relaxed">

          As a local Wythenshawe-based company, we adhere to rigorous daily cleaning and sanitisation protocols, understanding local traffic intricacies to train drivers in avoiding congested routes.

        </p>
        <p className=" text-lg  text-gray-700 pb-4 leading-relaxed">

          Families appreciate our pushchair-friendly and wheelchair-accessible options, simplifying travel for all, while we assist with heavy bags by securely storing them in the boot. Trust our expertise for rides that mimic the comfort of home on wheels, establishing us as the premier choice for reliable, comfortable transportation.


        </p>

        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Spacious cars for relaxed trips.",
            "Clean interiors refreshed post-ride.",
            "Safety features managing busy roads.",
            "Accessible options meeting family needs.",
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
        imageSrc="/city-center.jpg"
        imageAlt="Manchester city taxi"
        imagePosition="left"
        bgColor="bg-white"
        headingAs="h2"
        title={
          <span className="text-3xl md:text-4xl font-bold">
            Why Choose{" "}
            <span className="text-brand text-3xl md:text-4xl font-bold">OK Taxis</span>{" "}
            for Reliability
          </span>
        }
        text={
          <>
            <p className="mb-4">
              Selecting OK Taxis for your Manchester city taxi requirements ensures unmatched reliability in a bustling urban environment, built on years of dedicated service where I've witnessed the frustration of no-show taxis leading to missed commitments. Our punctuality promise guarantees early arrivals, leveraging GPS technology to evade delays and outpace competitors like StreetCars or Lynx Taxis with our proven track record.

            </p>
            <p>Covering the entire area, we serve as the essential go-to for daily commutes, supported by a committed team that garners positive feedback from loyal, returning customers.</p>


          </>
        }

      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-4 text-gray-700 leading-relaxed">

          We tackle real issues such as sudden itinerary changes through flexible arrangements, while our licensed operations strictly comply with all regulations, demonstrating our expertise and trustworthiness. For corporate excursions or local errands, we assure timely destinations, cultivating an exponentially growing base of satisfied clients who view us as the best in reliability.

        </p>


        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "On-time arrivals for every booking.",
            "Flexible changes suiting sudden needs.",
            "Licensed service fostering regulatory trust.",
            "Positive reviews from returning clients.",
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
        imageSrc="/city-center4.jpg"
        imageAlt="Manchester city taxi"
        imagePosition="right"
        bgColor="bg-white"
        headingAs="h2"
        title={
          <span className="text-3xl md:text-4xl font-bold">

            Affordable Pricing and {" "}
            <span className="text-brand text-3xl md:text-4xl font-bold">Instant Quotes</span>{" "}

          </span>
        }
        text={
          <>
            <p className="mb-4">
              Concerned about escalating costs for a city taxi Manchester? OK Taxis delivers affordable, transparent pricing from the outset, avoiding the surprises of hidden fees that I've observed unsettling many passengers. Obtain instant quotes effortlessly via our website at <strong>https://oktaxis.co.uk/</strong>  or by calling  <strong> +44 7788 710290</strong>, with no obligations and competitive rates that economise on Manchester city taxi service journeys.

            </p>

            <p >
              We facilitate easy budgeting without added stress, accepting debit, credit cards, or PayPal to resolve on-the-go payment hurdles. As a budget-conscious leader, we surpass others by offering exceptional value sans unexpected add-ons, whether for new city cars taxis Manchester or extended trips.

            </p>
          </>
        }

      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">

        <p className=" text-lg text-gray-700 leading-relaxed">
          Our clear methodology encourages repeat business, and for swift assistance, email <strong>info@oktaxis.co.uk</strong> anytime, solidifying our reputation as the most trustworthy and economical option available.
        </p>


        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Instant quotes online or phone.",
            "No hidden fees maintaining low costs.",
            "Easy payments via cards or PayPal.",
            "Budget rates for local needs.",
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
        imageSrc="/driver.jpg"
        imageAlt="Manchester city taxi"
        imagePosition="left"
        bgColor="bg-white"
        headingAs="h2"
        title={
          <span className="text-3xl md:text-4xl font-bold">


            Professional {" "}
            <span className="text-brand text-3xl md:text-4xl font-bold"> Drivers Ensuring</span>{" "}
            Your Safety
          </span>
        }
        text={
          <>
            <p>
              In every taxi Manchester city centre journey, safety reigns supreme at OK Taxis, where our professional drivers guarantee it through rigorous training that I've seen transform handling of busy streets. Vetted and knowledgeable, they select safe routes and conduct daily vehicle checks to uphold stringent passenger protection measures, addressing concerns like night-time travel with unwavering alertness and courtesy. 

            </p>

            <p className="mt-4">
            We enhance rides by assisting with bags and maintaining impeccable manners, utilising advanced technology to minimise risks and steer clear of hazardous areas.

            </p>
          </>
        }
      
      />
        <div className="full-width-section mx-auto px-4 max-w-7xl">

        <p className=" text-lg text-gray-700 leading-relaxed">
          As a limited company meeting the highest standards in cleanliness and care, we cater to families or solo travellers with expert precision that bolsters our esteemed reputation. This unwavering focus on security underscores our authority, making us the preferred choice for secure, enjoyable transportation experiences.

        </p>


        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Trained drivers mastering safe routes.",
            "Daily checks ensuring vehicle safety.",
            "Helpful assistance for bags needs.",
            "Courteous service enhancing secure rides.",
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
        imageSrc="/Taxi in Manchester City Centre (1).png"
        imageAlt="Manchester city taxi"
        imagePosition="right"
        bgColor="bg-white"
        headingAs="h2"
        title={
          <span className="text-3xl md:text-4xl font-bold">
            Book Your Ride{" "}
            <span className="text-brand text-3xl md:text-4xl font-bold"> Instantly and Easily</span>
          </span>
        }
        text={
          <>
            <p>
             Requiring swift city cars Manchester taxi booking? OK Taxis simplifies the process via our intuitive app or website, reflecting my own preference for hassle-free reservations without delays. We accommodate various methods including telephone, email, or online bookings, providing immediate confirmations for pre-booked or on-demand rides. Our seamless system extends to minibus options for groups or executive services for special occasions, even chauffeur arrangements for events. Contact us at our Wythenshawe address: 0B Portway, Manchester, trusting our expertise for effortless planning that cements us as the ultimate reliable partner.

            </p>

            
          </>
        }
      

      />
        <div className="full-width-section mx-auto px-4 max-w-7xl">

        <p className=" text-lg text-gray-700 leading-relaxed">
           Contact us at our Wythenshawe address: 0B Portway, Manchester, trusting our expertise for effortless planning that cements us as the ultimate reliable partner.

        </p>


        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Quick app for instant requests.",
            "Text updates tracking drivers easily.",
            "Multiple booking ways by phone.",
            "Pre-book for planned trips.",
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

            {
              <span className="text-3xl md:text-4xl font-bold">
                Why Choose Our{' '}
                <span className="text-brand text-3xl md:text-4xl font-bold"> City Taxis Services</span>{' '}

              </span>
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaClock className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Pickups</h3>
              <p className="text-gray-600">
                A pristine executive car arrives at your location in minutes, 24/7.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMapMarkedAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Knowledgeable Chauffeurs
              </h3>
              <p className="text-gray-600">
                Expert navigation through Manchester’s traffic and roadworks for the fastest routes.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMoneyBillWave className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Fixed Fares</h3>
              <p className="text-gray-600">
                No surprises—just clear, upfront quotes for rides from Piccadilly to Deansgate or any city destination.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaBriefcase className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Ideal for Business & Leisure
              </h3>
              <p className="text-gray-600">
                Perfect for trips between hotels, restaurants, offices, or events in Manchester.

              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
