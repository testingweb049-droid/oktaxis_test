import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import Image from "next/image";
import { FaFutbol, FaMusic, FaUsers, FaCarSide } from "react-icons/fa";
import Seo from "../../../../../components/Seo";
import { Check } from "lucide-react";
export default function StadiumTransfer() {
  return (
    <>
      <Seo
        title="Stadium Transfers in Manchester | OKTaxis"
        description="Book luxury stadium transfers to Old Trafford, Etihad, AO Arena and more with OKTaxis. Reliable chauffeur services for match days, concerts & events."
        url="https://oktaxis.co.uk/services/stadium-transfers"
        image="https://oktaxis.co.uk/Manchester%20Stadium%20Transfers.jpg"
      />
      <HeroSection2
        bgImage="/Manchester Stadium Transfers.jpg" // Updated image
        // title="Premier Stadium and Event Transfers in Manchester"
        title="Elite Sporting Events Chauffeur Service"
      // description="Need a transfer to a Manchester stadium? OKTaxi Service has got you covered. Avoid the hassle and secure your ride ahead of time by booking with us—so you won't be left stranded on match day. Dependable and professional taxi service in Manchester."
      />
      <Offer />
      <ImageTextSection
        imageSrc="/Manchester Stadium Transfers.jpg"
        imageAlt="Stadium transfer service"
        imagePosition="left"
        bgColor="bg-white"
        headingAs="h2"
        title={
          <span className="text-3xl md:text-4xl font-bold">
            Seamless Travel to{" "}
            <span className="text-brand text-3xl md:text-4xl font-bold">Sporting Events</span>
          </span>
        }
        text={
          <>
            <p>
              Heading to a big game in Manchester brings that unbeatable buzz at iconic spots like Old Trafford for Manchester United Football Club or Etihad Stadium for Manchester City Football Club. At OK Taxis, we truly understand – you want to immerse yourself in the action without any hassle.

            </p>

            <p className="mt-4">
              Drawing from years of assisting passionate fans, we've seen how arriving relaxed and energised makes all the difference. Our chauffeur service navigates the chaos of Manchester Piccadilly or the airport effortlessly, avoiding traffic jams and parking woes so you can focus on the excitement.

            </p>


          </>
        }
      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          Our professionals are selected for their expertise, transforming every journey into a memorable experience.Whether it's off to Lancashire Emirates Stadium for cricket or Aintree for horse racing events, we create a bespoke ride tailored perfectly to you. Cruise in a spotless Mercedes S Class or Mercedes V Class, offering ample legroom and modern tech for ultimate comfort. We're committed to punctuality, ensuring you capture every moment of the fun stress-free.


        </p>


        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Hassle-free pickups from hotels or airport.",
            "Precise timing for perfect arrivals.",
            "Luxury Mercedes S Class for individuals.",
            "Spacious Mercedes V Class for groups.",
            "Trusted service with safety focus."

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

      {/* Group Service Section */}
      <ImageTextSection
        imageSrc="/Stadium Transfers in Manchester.jpg"
        imageAlt="Group stadium transfer"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">
            Luxury Rides for Ultimate Fan Comfort
            Group{' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Transportation</span>{' '}
            Solutions
          </span>
        }
        text={<>
          <p>
            Pulling up to a football stadium or racecourse in true style elevates the entire experience. Here at OK Taxis, our Luxury Chauffeur Service Manchester enhances your sporting event like no other. Picture reclining in the plush seats of a Mercedes S-Class or enjoying the spacious Mercedes V Class while our friendly chauffeurs handle every detail.

          </p>

          <p className="mt-4">
            From personal observations, clients arrive at Emirates Old Trafford or AJ Bell Stadium beaming with anticipation, feeling premium before the event begins. It's more than transport; it's seamless ease and sophistication. We cater to solo fans or groups, delivering expert chauffeur services that align with your sports passion.

          </p>


        </>}
        bgColor="bg-white"
        imagePosition="right"
      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          Whether it's Premier League thrills at Old Trafford, the intensity of Wimbledon, or Chester races, our vehicles feature Wi-Fi and air conditioning for a flawless ride. As a licensed, reputable chauffeur company, OK Taxis ensures you enjoy every second without worries.


        </p>


        <ul className="mt-4 mb-7 space-y-3 text-gray-800">
          {[
            "Plush Mercedes Saloons for comfort.",
            "Customised for corporate hospitality.",
            "Immaculate vehicles with safety features.",
            "Skilled chauffeurs enhancing travel vibe.",

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
        imageSrc="/Services to Manchester & Liverpool Football Stadiums.jpg"
        imageAlt="Group stadium transfer"
        title=
        {

          <span className="text-3xl md:text-4xl font-bold">



            <span className="text-brand text-3xl md:text-4xl font-bold">Tailored Chauffeur</span> for Every Match
          </span>

        }
        text={<>
          <p>
           No two games mirror each other, and your plans deserve the same uniqueness. That's why OK Taxis offers a bespoke Manchester to Event Chauffeur service, finely tuned to your schedule, from Premier League clashes at Etihad Stadium to cricket at Emirates Old Trafford. We've engaged with supporters eager to explore Manchester's stellar stadiums, such as Manchester AO Arena for boxing or swimming, and our team simplifies it all.

          </p>

        


        </>}
        bgColor="bg-white"
        imagePosition="left"
      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

        We recognise you seek a ride that heightens the thrill, not complicates it. Our elite chauffeurs provide a personalised touch, delivering you to the venue effortlessly. From hotel, Manchester Airport, or corporate event pickups, we adapt bookings to suit you. For major occasions or business, our Executive Car Service includes at-disposal options throughout. As your reliable partner, we ensure travel flows smoothly, letting you savour the game's joy.


        </p>


        <ul className="mt-4 mb-7 space-y-3 text-gray-800">
          {[
            "Custom plans for football or tennis.",
            "Experienced chauffeurs knowing stadiums.",
            "Flexible full or half day rates.",
            "Secure transport prioritising punctuality.",

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
        imageSrc="/stadium.jpg"
        imageAlt="Group stadium transfer"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">
            
           
            <span className="text-brand text-3xl md:text-4xl font-bold">Real-Time Booking</span>{' '}
            for Instant Solutions

          </span>
        }
        text={<>
          <p>
            Securing a chauffeur service ought to be swift and straightforward, not burdensome. At OK Taxis, our intuitive online system simplifies it entirely. Enter details for a trip to Wembley or Aintree, and you're instantly confirmed. Clients frequently praise the quick quotes for Manchester to Wembley Chauffeur Service, saving valuable time. 


          </p>

          <p className="mt-4">
           Transparent, all-inclusive pricing lets you proceed confidently. We offer easy support via email at info@oktaxis.co.uk or phone at +44 7788 710290. Receive chauffeur updates and SMS notifications to stay informed on arrivals.


          </p>


        </>}
        bgColor="bg-white"
        imagePosition="right"
      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

         For London airport transfers or Chester races, our real-time platform secures your journey promptly. We deliver a memorable ride that complements the event perfectly.


        </p>


        <ul className="mt-4 mb-7 space-y-3 text-gray-800">
          {[
            "Instant quotes on time or distance.",
            "Simple online booking process.",
            "SMS alerts for updates.",
            "Personalised support for needs.",

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
        imageSrc="/premium-vehicles.jpg"
        imageAlt="Group stadium transfer"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">
            Premium Vehicles for 
           
            <span className="text-brand text-3xl md:text-4xl font-bold"> Stress-Free Journeys</span>

          </span>
        }
        text={<>
          <p>
           For effortless trips to Manchester's vibrant stadiums or racecourses, OK Taxis' premium vehicles are ideal. Choose the elegant Mercedes S Class or versatile Mercedes V Class – designed for luxury and reliability. From experience, a comfortable ride in our top-tier fleet transforms journeys to Old Trafford or even Wembley. With generous legroom and reclining seats, you arrive refreshed and ready. 



          </p>

          <p className="mt-4">
         Each vehicle is maintained to rigorous safety standards, driven by experts who prioritise your security and know routes intimately.


          </p>


        </>}
        bgColor="bg-white"
        imagePosition="left"
      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

        For solo trips or groups, our Mercedes V Class Chauffeur Vans accommodate luggage seamlessly, suiting corporate hospitality or team outings. We're dedicated to an unparalleled travel experience, allowing you to concentrate on Premier League action or the delight of Lancashire Emirates Stadium events.


        </p>


        <ul className="mt-4 mb-7 space-y-3 text-gray-800">
          {[
            "Luxury Mercedes Saloons for business.",
            "Mercedes V Class for groups.",
            "Advanced safety for peace.",
            "Elite vehicles elevating trips.",

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
        imageSrc="/stadium4.jpg"
        imageAlt="Group stadium transfer"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">
             
            Unmatched Service for 
           
            <span className="text-brand text-3xl md:text-4xl font-bold"> Sports Enthusiasts</span>

          </span>
        }
        text={<>
          <p>
           At OK Taxis, we strive to provide the premier chauffeur service for sports fans in Manchester. Our Luxury Sports Event arrangement elevates journeys to football stadiums, cricket grounds, or racecourses into exceptional adventures. We've assisted countless enthusiasts heading to Manchester City at Etihad Stadium or Manchester United at Old Trafford, they consistently highlight how our chauffeurs create lasting impressions.  
          </p>

          <p className="mt-4">
         We excel in impeccable service, from hotel collections to elegant venue arrivals. Our commitment to excellence ensures chauffeurs are knowledgeable about Manchester's dynamic city and landmarks like Manchester AO Arena for entertainment events. 


          </p>


        </>}
        bgColor="bg-white"
        imagePosition="right"
      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

         We accommodate corporate clients, teams, and individuals with flexible hourly or full day chauffeur service. Booking with us means selecting a trusted partner for luxurious, hassle-free travel. Contact us at 0B Portway, Wythenshawe, Manchester, or via email to start your remarkable journey.



        </p>


        <ul className="mt-4 mb-7 space-y-3 text-gray-800">
          {[
            "Tailored for football or cricket fans.",
            "Trained chauffeurs for reliability.",
            "Luxury for work or leisure.",
            "Effortless booking for events.",

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
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center  mb-12">

            {
              <span className="text-3xl md:text-4xl font-bold">
                Our Stadium Transfer{' '}
                <span className="text-brand text-3xl md:text-4xl font-bold">Services</span>{' '}

              </span>
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaFutbol className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Matchdays & Concerts
              </h3>
              <p className="text-gray-600">
                Available for football, rugby, concerts, and large events across Manchester.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaCarSide className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Pickup</h3>
              <p className="text-gray-600">
                Meet at stadium entrances or nearby locations for time-saving convenience.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaUsers className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Group Friendly</h3>
              <p className="text-gray-600">
                Multiple vehicles and minibuses for corporate groups or fan parties.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMusic className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Premium Comfort
              </h3>
              <p className="text-gray-600">
                Enjoy a luxurious, relaxing ride home or to your next destination after the event.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
