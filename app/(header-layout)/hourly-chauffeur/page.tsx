import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import Image from "next/image";
import Link from "next/link";
import {
  FaRoute,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUserTie,
  FaCarSide,
} from "react-icons/fa";
import { Check } from "lucide-react";
import Seo from "@/components/Seo";
export default function HourlyChauffeur() {
  return (
    <>
      <Seo
        title="Hourly Chauffeur Manchester | Luxury Hire by the Hour or Day
"
        description="Book flexible hourly chauffeur in Manchester with OKTaxis. Enjoy luxury vehicles, professional drivers, and transparent pricing for business, leisure, or events. Free cancellation up to 48 hours."
        url="https://oktaxis.co.uk/hourly-chauffeur"
        image="https://oktaxis.co.uk/images/hourly-service.png"
         breadcrumbs={[
          { position: 1, name: "Hourly Chauffeur", item: "https://oktaxis.co.uk/hourly-chauffeur" },
          { position: 2, name: "Hourly Chauffeur" }
        ]}
      />
      <HeroSection2
        bgImage="/images/hourly-service.png"
        title="Manchester Premier Hourly Chauffeur Service"

      />


      <Offer />
      <ImageTextSection
        imageSrc="/images/hourly-service.png"
        imageAlt="Hourly Chauffeur Manchester"
        title={
          <h2 className="text-3xl md:text-4xl font-bold">

            Tailored <span className="text-brand">Hourly Solutions</span> for Business and Leisure
          </h2>
        }
        text={
          <>
            <p className="mb-4">
              Our hourly chauffeur service in Manchester fits seamlessly into your busy day, whether for business meetings or leisure explorations. You enjoy complete flexibility, avoiding fixed pickups like traditional taxis, allowing hops between sites or spontaneous stops in the city centre. At OK Taxis, we adapt fully to your schedule, ensuring transport never hinders your plans.
            </p>
            <p >
              Drawing from my extensive experience managing corporate clients and visitor outings in Manchester, this approach makes travel convenient and stress-free for diverse needs. We serve busy executives at conferences and tourists visiting landmarks, with dedicated chauffeurs waiting safely during your activities.
            </p>

          </>
        }
        bgColor="bg-white"
        imagePosition="right"
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">
        <p className=" text-lg md:text-xl text-gray-700 leading-relaxed">
          No time limits or rigid routes apply; you control the journey, even with mid-way changes. This includes mileage allowances and hassle-free handling of extras like parking fees. In my view, such tailored Manchester chauffeur hire delivers personal, professional reliability that stands out.


        </p>
        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Flexible options for business trips.",
            "Convenient stops to match schedules.",
            "Professional chauffeurs for adaptable journeys.",
            "Tailored for corporate or city explorations.",
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
        imageSrc="/stadium transfers to manchester united.png"
        imageAlt="Hourly chauffeur service"
        title=
        {

          <h2 className="text-3xl md:text-4xl font-bold">


            Premium Fleet with {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Luxury Vehicles</span>{' '}and {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Chauffeurs</span>{' '}
          </h2>
        }
        text={
          <>
            <p className="mb-4">
              Selecting the ideal vehicle for your hourly needs is straightforward with our premium lineup at OK Taxis. Picture stepping into a sleek Mercedes S Class for solo trips that feel truly special. We offer spacious V Class MPVs perfect for small groups with ample luggage room.
            </p>
            <p >
              Our executive sedans, SUVs like BMW and Audi, and luxury vans are immaculate, equipped with modern tech for an upscale experience. From my years in Manchester's transport sector, I know a superior car and driver elevate any work or fun outing in this vibrant city. Our chauffeurs complement this fleet, mastering local roads and traffic for swift arrivals
            </p>

          </>
        }

        bgColor="bg-white"
        imagePosition="left"
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">
        <p className=" text-lg md:text-xl text-gray-700 leading-relaxed">
          They ensure stress-free journeys, whether for meetings or relaxation, in cool, comfy spaces with soft seats. This setup caters to business professionals and visitors discovering Manchester's lively spots, making rides more than transport.

        </p>
        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Luxury vehicles with Wi-Fi access.",
            "Spacious Mercedes V Class options.",
            "Elegant Mercedes E Class sedans.",
            "High-end BMW and Audi choices.",
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
        imageSrc="/Manchester Airpot.png"
        imageAlt="Chauffeur convenience"
        title=
        {

          <h3 className="text-3xl md:text-4xl font-bold">



            <span className="text-brand text-3xl md:text-4xl font-bold">  Why Us:</span>{' '}Experienced Drivers and
            <span className="text-brand text-3xl md:text-4xl font-bold"> Transparent Pricing</span>{' '}
          </h3>
        }
        text={
          <>
            <p className="mb-4">
              Our Manchester chauffeur service excels due to skilled drivers prioritising punctuality, safety, and your satisfaction. They handle hectic schedules or leisurely days expertly, arriving promptly with a warm welcome. Based on my long history facilitating executive rides across the UK, trust builds from drivers who know Manchester thoroughly. They manage routes and weather seamlessly, ideal for VIP guests or casual city centre tours. At OK Taxis, pricing remains transparent and fair, with no hidden charges, you pay only for usage.
            </p>

          </>
        }

        bgColor="bg-white"
        imagePosition="right"
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl pb-6">
        <p className=" text-lg md:text-xl text-gray-700 leading-relaxed">
          Parking or traffic fees are covered, and plan changes incur no extra fuss. This honest approach fosters lasting relationships, especially for those seeking value in UK chauffeur hire. Choosing us guarantees top-tier service that feels worthwhile and dependable every time.
        </p>
        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Skilled drivers for safe trips.",
            "Clear pricing with upfront costs.",
            "Highest level customer care.",
            "Strong reputation for best service.",
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

      <section className="flex mt-5 flex-col gap-12 md:flex-row items-start justify-between full-width-section px-4 py-40">
        {/* Left side image */}
        <div className="md:w-1/2 relative h-64 w-full md:h-80">
          <Image
            src="/Hourly Serives in Manchester.png"
            alt="Car service in Manchester"
            width={600}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: `600px`,
              maxHeight: `400px`,
            }}
            className="rounded-lg shadow-xl object-cover"
            priority={false}
          />
        </div>

        {/* Right side content */}
        <div className="flex flex-col space-y-6 md:w-1/2">
          <div className="flex items-start gap-3">
            {/* <FaCarSide className="text-brand mt-1" /> */}
            <h3 className="text-3xl md:text-4xl font-bold">


              Seamless Services for {' '}
              <span className="text-brand text-3xl md:text-4xl font-bold"> Events and Airport Transfers </span>{' '}

            </h3>

          </div>
          <p className="text-lg text-gray-600 mb-8">
            Our hourly chauffeur service shines for events, where flexibility and attention to detail enhance the experience. Imagine arriving stylishly at weddings, with drivers navigating smoothly between venues for couples and guests. We handle music festivals like Glastonbury or awards like the BRITs, managing parking so you focus on enjoyment. As a Manchester event specialist, I've witnessed how our bespoke plans transform ordinary occasions into memorable ones, from pre-event drinks to after-parties.


          </p>


          {/* <ul className="space-y-4 text-gray-700 text-lg">
            <li className="flex items-start gap-3">
              <FaMoneyBillWave className="mt-1 text-brand" />
              <span>
                <strong>Economy Car:</strong> £40 per hour — Reliable and
                budget-friendly transportation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaMoneyBillWave className="mt-1 text-brand" />
              <span>
                <strong>Executive Car:</strong> £60 per hour — Comfortable and
                stylish rides for business or leisure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaMoneyBillWave className="mt-1 text-brand" />
              <span>
                <strong>Executive Premium Car:</strong> £80 per hour — Premium
                vehicles for a superior travel experience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaMoneyBillWave className="mt-1 text-brand" />
              <span>
                <strong>Luxury Van:</strong> £120 per hour — Spacious and
                luxurious vans perfect for group travel.
              </span>
            </li>
          </ul> */}
        </div>
      </section>
      <div className="full-width-section mx-auto px-4 max-w-7xl">
        <p className=" text-lg  text-gray-600 leading-relaxed">
          For airport transfers, skip queues for taxis or buses, enjoy seamless starts or ends to trips. At Heathrow or Manchester Airport, we monitor flights live to accommodate delays.
          Our UK airport chauffeur services include multiple stops or direct home rides with refreshments and Wi-Fi. From numerous transfers I've overseen, this effortless style with additions like child seats positions us as the premier choice for stressed travellers or families.

        </p>
        <ul className="mt-6 space-y-3 text-gray-600">
          {[
            "Event support for weddings, festivals.",
            "Airport pickups with personal greetings.",
            "Flexible plans for sports events.",
            "On-time service for football matches.",
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
        imageSrc="/hourly.jpg"
        imageAlt="Chauffeur convenience"
        title=
        {

          <h3 className="text-3xl md:text-4xl font-bold">



            Easy
            <span className="text-brand text-3xl md:text-4xl font-bold"> Online Booking </span>{' '}and
            <span className="text-brand text-3xl md:text-4xl font-bold"> Free Instant Quotes</span>{' '}
          </h3>
        }
        text={
          <>
            <p className="mb-4">
              Arranging your chauffeur day with us is effortless and swift, designed for fast-paced lives or impromptu plans. Visit oktaxis.co.uk to book brief or extended trips, receiving updates via text or email. Input routes, additional stops, or requests like extra space with ease.
            </p>
            <p>My background in executive chauffeur service Manchester, this streamlined process eliminates the hassle of multiple bookings, suiting affluent clients or those desiring unrestricted movement. We provide free instant quotes for immediate pricing visibility, helping you select the best fit without obligations. </p>

          </>
        }

        bgColor="bg-white"
        imagePosition="right"
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl pb-6">
        <p className=" text-lg md:text-xl text-gray-700 leading-relaxed">
          This transparency aids in car rental with chauffeur scenarios, directing you to meetings or hotels in Greater Manchester. Contact <strong className="text-brand">info@oktaxis.co.uk</strong> or <strong className="text-brand">+44 7788 710290</strong>  for tailored assistance matching your itinerary. Our attentive focus ensures peace of mind throughout, setting our Manchester car service apart.

        </p>
        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Simple online booking system.",
            "Free quotes for custom needs.",
            "Options for child seats, stops.",
            "Fast confirmations and updates.",
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
        imageSrc="/amenties.jpg"
        imageAlt="Chauffeur convenience"
        title=
        {

          <h3 className="text-3xl md:text-4xl font-bold">

            Exclusive Amenities and
            <span className="text-brand text-3xl md:text-4xl font-bold"> 24/7 Major UK </span>{' '} and
            <span className="text-brand text-3xl md:text-4xl font-bold"> Cities Coverage</span>{' '}
          </h3>
        }
        text={
          <>
            <p className="mb-4">
              Every journey in our Manchester chauffeur car service includes premium amenities for a luxurious, comfortable feel. Complimentary water keeps you refreshed, sanitisers ensure safety, and plush seats with contemporary features offer serene escapes.
            </p>
            <p>Vehicles boast Wi-Fi, elegant interiors, and generous space, making you feel pampered on any outing. From operating comparable services, I've observed how these touches create a hospitable atmosphere ideal for tourists or business travellers demanding excellence. We're available round-the-clock in key UK cities like Manchester, Liverpool, and London, accommodating dawn or midnight requirements.  </p>

          </>
        }

        bgColor="bg-white"
        imagePosition="left"
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl pb-6">
        <p className=" text-lg md:text-xl text-gray-700 leading-relaxed">
          This comprehensive coverage supports nights out or group transports from our Wythenshawe base at 0B Portway. Our commitment to widespread, consistent high-end service builds reliability, regardless of timing or location. It's this perfect mix of convenience and assurance that draws repeat clients for Manchester airport car service or local excursions.


        </p>
        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Special amenities like Wi-Fi, drinks.",
            "24/7 coverage in main cities.",
            "UK-wide consistent high care.",
            "Comfy seats with onboard entertainment.",
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
            <span className="text-3xl md:text-4xl font-bold">
              Key Benefits of Our Manchester Hourly{' '}
              <span className="text-brand text-3xl md:text-4xl font-bold">Chauffeur Service</span>
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/Group 7.png"
                  alt="Customized itinerary"
                  width={600}
                  height={400}
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customized Itineraries</h3>
              <p className="text-gray-600">
                Change plans mid-journey—our chauffeurs adapt instantly to your evolving schedule.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/Group 5.png"
                  alt="Multiple stops"
                  width={600}
                  height={400}
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Stops & Waits</h3>
              <p className="text-gray-600">
                Perfect for shopping, appointments, or events with built-in flexibility at every step.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/Group 6.png"
                  alt="Transparent pricing"
                  width={600}
                  height={400}
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Hidden Fees</h3>
              <p className="text-gray-600">
                Upfront hourly pricing ensures complete transparency and peace of mind from booking to drop-off.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/Group 8.png"
                  alt="Concierge service"
                  width={600}
                  height={400}
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Concierge Service</h3>
              <p className="text-gray-600">
                Chauffeurs in uniform offer door-opening, luggage handling, and local tips with professionalism.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/Group 10.png"
                  alt="Complimentary perks"
                  width={600}
                  height={400}
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complimentary Perks</h3>
              <p className="text-gray-600">
                Wi-Fi, bottled water, tissues, and more—all to make your ride more relaxing and productive.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/Group 9.png"
                  alt="UK-wide chauffeur service"
                  width={600}
                  height={400}
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
              <p className="text-gray-600">
                Available across Manchester and UK-wide. Ideal for local errands or long-distance luxury travel.
              </p>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto text-center text-gray-700 text-lg">
            <p>
              For business users, our service supports productivity on the move—perfect for executives
              needing reliable, luxury chauffeur hire in Manchester.
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
