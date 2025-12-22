import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import BusImage from "@/assets/vehicles/xlvan.jpg";
import {
  FaLandmark,
  FaCity,
  FaMapMarkedAlt,
  FaMountain,
  FaCarSide,
} from "react-icons/fa";
import ImageTextSection from "@/components/ui/ImageTextSection";
import FleetClasses from "@/components/home/fleet";
import Image from "next/image";
import { Check } from "lucide-react";
import Seo from "@/components/seo";
export default function CityTour() {
  return (
    <>
      <Seo
        title="Manchester & Liverpool City Tours | Luxury Chauffeur Sightseeing"
        description="Explore Manchester, Liverpool, and nearby UK cities with OKTaxis’ premium city tour service. Enjoy bespoke itineraries, executive cars, and expert local chauffeurs."
        url="https://oktaxis.co.uk/city-tour"
        image="https://oktaxis.co.uk/city.jpg"
         breadcrumbs={[
          { position: 1, name: "City Tours", item: "https://oktaxis.co.uk/city-tour" },
          { position: 2, name: "City Tours" }
        ]}
      />
      <HeroSection2
        bgImage="/city.jpg"
        title="Exclusive Manchester City Tours with Chauffeur"
      // description="Explore the best of the North with our exclusive city tours of Manchester, Liverpool, and the surrounding areas. Our expert chauffeurs will take you to iconic landmarks as well as hidden gems, providing a rich and authentic local experience in complete comfort. Ideal for visitors arriving via Manchester Airport, we also offer seamless chauffeur services to and from London, Birmingham, and Leeds, ensuring your journey is smooth and stylish every step of the way."
      />
      <Offer />
      <ImageTextSection
        imageSrc="/city.jpg"
        imageAlt="Manchester city tour"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">


            Discover Manchester’s {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Top Attractions Privately</span>{' '}

          </span>
        }
        text={
          <>
            <p>
              Setting off on a private chauffeur tour in Manchester provides a unique escape to the city's premier sights, ditching the hassle of noisy buses or jammed trains. From our roots in 2007, OK Taxis has honed the art of turning simple outings into delightful, laid-back experiences. You'll soak up breathtaking views, intriguing historical narratives, and dynamic culture without battling traffic or sore feet under the sun.


            </p>

            <p className="mt-4">
              As a true Mancunian, I've always treasured gems like the Cathedral, Science and Industry Museum, or National Football Museum, offering football fans deep dives into the beautiful game.
            </p>
          </>
        }
        bgColor="bg-white"
        imagePosition="left"
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">

        <p className=" text-lg pb-4 text-gray-700 leading-relaxed">

          Our expert, licensed drivers unveil secret spots and local vibes, letting you chill in seclusion with your gear safely tucked away. What truly elevates our Manchester city tour chauffeur service is that bespoke edge, granting close-ups of arts, music, galleries, museums, and dining scenes. Venture out to North Wales for stunning vistas, quaint hamlets, and majestic strongholds like Caernarfon Castle.


        </p>


        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Exclusive access to prime attractions.",
            "Local guides revealing hidden gems.",
            "Trips to North Wales castles.",
            "Bypass crowds for cultural depth.",
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
        imageSrc="/Manchester To London.png"
        imageAlt="Liverpool city tour"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">


            Luxury Vehicles  for {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Comfortable Tours</span>{' '}

          </span>
        }
        text={
          <>
            <p>
              Opting for a Manchester city tour with flair means our upscale cars deliver supreme comfort and poise. Since launching in 2007, OK Taxis has thrived on elite chauffeur-driven journeys that stand out from routine rides. Envision lounging in supple leather of a spotless Mercedes S-Class, stocked with a cooling fridge for drinks, suiting up to three folks or two with modest bags.
            </p>

            <p className="mt-4">
              My longstanding drives across this vibrant northern UK spot, I've seen how long-distance chauffeur service eases gruelling hauls into serene getaways.
            </p>
          </>
        }
        bgColor="bg-white"
        imagePosition="right"
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">

        <p className=" text-lg pb-4 text-gray-700 leading-relaxed">

          Our lineup features posh sedans, roomy SUVs, and lavish limos for one to six passengers, making Manchester sightseeing or North Wales jaunts utterly seamless. From direct involvement in top-tier transport, I've noted these vehicles craft lasting city tour chauffeur memories.


        </p>


        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Premium Mercedes with plush seats.",
            "Onboard fridge for cool drinks.",
            "Serene interiors for relaxed travel.",
            "Room for up to six people.",
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
        imageSrc="/Manchester.png"
        imageAlt="Liverpool city tour"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">


            Customizable {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Tours Tailored</span>{' '}
            to You
          </span>
        }
        text={
          <>
            <p>
              Our tours empower you to shape experiences around your rhythm, tastes, and curiosities, creating a custom Manchester day tour that's all yours. Steering away from inflexible, mobbed Manchester bus tour city setups, we offer adaptable choices that dodge bus jams and travel snags like wrong turns or waits. Having guided myriad visitors through Manchester's layered history, culture, and icons, I've seen budget-friendly half- or full-day deals spark fantastic weekends.

            </p>

            <p className="mt-4">
              If you're into cultural sports, architecture, or retail therapy, our chauffeur-guide syncs up, touring must-sees like Piccadilly Gardens, Northern Quarter, or John Rylands Library.
            </p>
          </>
        }
        bgColor="bg-white"
        imagePosition="left"
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">

        <p className=" text-lg pb-4 text-gray-700 leading-relaxed">

          We shine with versatile timings and home pickups, smoothing paths for first-timers or regulars. I've woven in breaks for eats, sips, or lunches, serving as a partial concierge for attraction tickets, gigs, or theatre spots.


        </p>


        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Bespoke plans matching your interests.",
            "Adjustable timings for unhurried discovery.",
            "Suggestions for food and fun.",
            "Ditch public transport for ease.",
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
        imageSrc="/chauffeur.jpg"
        imageAlt="Liverpool city tour"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">



            <span className="text-brand text-3xl md:text-4xl font-bold">Trusted Chauffeurs</span>{' '}
            with Local Expertise
          </span>
        }
        text={
          <>
            <p>
              Our chauffeurs boast deep-rooted Manchester know-how, from lifelong residency to mastering lanes, tucked-away treasures, and nearby locales for insightful, enjoyable guided tours. As a trusted outfit, we deliver pro service through qualified, licensed staff who focus on your comfort, timeliness, and steadfastness, keeping private chauffeur rides safe and straightforward.

            </p>

            <p className="mt-4">
              Through my local lens, I've watched drivers oversee full visits, from hotel or airport hellos to tips on shopping zones, old mills, or parks, making sightseeing sparkle minus sweaty hikes or map woes.
            </p>
          </>
        }
        bgColor="bg-white"
        imagePosition="right"
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">

        <p className=" text-lg pb-4 text-gray-700 leading-relaxed">

          Trust stems from fusing secure drives with warm perks, like briefing football buffs at the National Football Museum on game lore or music fans on band tales. Our squad excels in sports outings, airport shuttles, weddings, or long-distance chauffeur ventures, ever discreet and elegant.


        </p>


        <ul className="mt-6 space-y-3 text-gray-800">
          {[
            "Seasoned drivers spotting hidden routes.",
            "Fully licensed for dependable safety.",
            "Savvy on history and sights.",
            "Dedicated to tailored client joy.",
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
        imageSrc="/city-tour.jpg"
        imageAlt="Liverpool city tour"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">



            Get Your {' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Free Tour Quote </span>{' '}
            Today
          </span>
        }
        text={
          <>
            <p>
              Eager to book a bespoke chauffeur for your Manchester day tour or long-distance escapade? OK Taxis crafts your dream route, spanning day tours from Manchester UK to key spots or simple car chauffeur city jaunts. Drop us a line for info and a no-cost tour quote—pop over to <strong className="text-brand underline">https://oktaxis.co.uk/</strong> , dial <strong className="text-brand">+44 7788 710290</strong>, or ping <strong className="text-brand">info@oktaxis.co.uk</strong>. Nestled at 0B Portway, Wythenshawe, Manchester, we're primed for stellar adventures.


            </p>

            <p className="mt-4">
              As a seasoned city observer who's seen travellers unearth its lively allure, I'd suggest reserving 14 days ahead in bustling May to September, since spur-of-the-moment slots aren't assured, but advance bookings nab the best windows.
            </p>
          </>
        }
        bgColor="bg-white"
        imagePosition="left"
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">

        <p className=" text-lg  text-gray-700 leading-relaxed">

          We provide sharp pricing for plush trips without shortcuts—picture effortless voyages with polished welcomes and steers.


        </p>


        <ul className="mt-5 space-y-3 text-gray-800">
          {[
            "Complimentary quote online or call.",
            "Advance booking for busy periods.",
            "Nearby location fosters reliability.",
            "Value rates upholding luxury.",
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
        imageSrc="/city-tour4.jpg"
        imageAlt="Liverpool city tour"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">

            <span className="text-brand text-3xl md:text-4xl font-bold">Explore Manchester </span>{' '}
            Seamlessly with Ease
          </span>
        }
        text={
          <>
            <p>
              Plunging into Manchester's buzzing world is a breeze with our private tours, facilitating fluid visits to landmarks and hidden nooks alike. Chauffeurs set the perfect tone for outings, fetching you doorstep-style to evade public transport gripes or frantic dashes for views.


            </p>

            <p className="mt-4">
              Create standout trips over years, be it arts, music, or hooks like the fan-favourite National Football Museum or heritage plunges, we guarantee hassle-free dips into this thriving core.
            </p>
          </>
        }
        bgColor="bg-white"
        imagePosition="right"
      />
      <div className="full-width-section mx-auto px-4 max-w-7xl">

        <p className=" text-lg  text-gray-700 leading-relaxed">

          Stretching further, our long-distance chauffeur taps North Wales' epic scenery, blending terrains, cosy villages, and bastions like Caernarfon Castle into history-packed days. We spotlight bus-overlooked nuggets, with custom thrills at stops and ideas for bites or brews.



        </p>


        <ul className="mt-5 space-y-3 text-gray-800">
          {[
            "Effortless entry to key sights.",
            "Outings to North Wales views.",
            "Custom advice on heritage spots.",
            "Stress-free for fun or occasions.",
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
          <h2 className="text-3xl md:text-4xl font-bold text-center  mb-12">
            {
              <span className="text-3xl md:text-4xl font-bold">
                Our Tour  {' '}
                <span className="text-brand text-3xl md:text-4xl font-bold">Services</span>{' '}

              </span>
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaLandmark className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Manchester Sightseeing
              </h3>
              <p className="text-gray-600">
                Visit Old Trafford, Manchester Cathedral, The Lowry, and the Northern Quarter in VIP comfort.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaCity className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Nearby City Excursions
              </h3>
              <p className="text-gray-600">
                Travel seamlessly to Liverpool, Chester, Leeds, York, or Sheffield in luxury vehicles.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMapMarkedAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Bespoke Itineraries
              </h3>
              <p className="text-gray-600">
                Customize your tour with multiple stops and flexible pickup/drop-off locations.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMountain className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Nature & Heritage Tours
              </h3>
              <p className="text-gray-600">
                Escape to the Peak District, Lake Windermere, or historic Cheshire villages for a serene getaway.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
