import Services from "@/components/home/services";
import FleetClasses from "@/components/home/fleet";
import ReadyToBook from "@/components/home/read-to-book";
import Testimonials from "@/components/home/testimonials";
import AboutSection from "@/components/home/about";
import LuxuryExperience from "@/components/home/luxury-experience";
import ImageTextSection from "@/components/ui/ImageTextSection";
import Seo from "../../components/Seo";
import { Check } from "lucide-react";
import NewHeroSection from "./book-ride/NewHeroSection";
import InfiniteSlide from "./book-ride/InfiniteSlide";



export default function Home() {
  return (
    <>
      <Seo
        title="Premium Chauffeur Services Manchester | Airport Transfers & Wedding Hire | OKTaxis"
        description="Book premium chauffeur services in Manchester with OKTaxis. Luxury airport transfers, hourly hire, city tours, wedding chauffeurs, and stadium transfers. 24/7 reliable service."
        url="https://oktaxis.com"
        image="https://oktaxis.com/og-image.jpg"
      />
      <main className="min-h-screen">
        <NewHeroSection/>
        <InfiniteSlide/>
        {/* <HeroSection /> */}
        <Services />
        <ImageTextSection
          imageSrc="/OKTaxis In Manchester.png"
          imageAlt="Executive Airport Transfer"
          title={
            <span className="text-3xl md:text-4xl font-bold">

              Why Choose{" "}
              <span className="text-brand text-3xl md:text-4xl font-bold">Our Luxury</span>{" "}
              <span className="text-brand text-3xl md:text-4xl font-bold"> Chauffeur</span>{" "}
              Service in {" "}<span className="text-brand text-3xl md:text-4xl font-bold">Manchester</span>
            </span>
          }
          text={
            <>
              <p>At OK Taxis, we deliver the finest luxury chauffeur service Manchester, combining top-tier luxury with unmatched reliability. Our team, rooted in the luxury automotive world, takes a personal approach to ensure every detail shines with quality. Since 2007, we've earned trust from business leaders, global travelers, and locals by prioritizing safety, discretion, and elegance in every ride—whether for work trips, events, or VIP needs.
              </p>
            </>
          }
          bgColor="bg-white"
          imagePosition="right"
        />

        <div className="container mx-auto px-4 max-w-7xl">
          <p className=" text-lg md:text-xl text-gray-700 leading-relaxed">
            As leading experts in chauffeur service UK, we focus on what matters: seamless journeys,
            tailored care, and total satisfaction that turns travel into something special.
            We solve your transport worries with honest, worry-free service that feels effortless and elite.
          </p>

          <ul className="mt-6 space-y-3 text-gray-800">
            {[
              "Luxury fleet featuring premium sedans and SUVs for ultimate comfort.",
              "24/7 availability to fit your schedule anytime.",
              "Personalised service designed around your exact needs.",
              "Excellent reputation built over a decade of genuine care.",
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
          imageSrc="/Taxi To Manchester Airport.png"
          imageAlt="Executive Airport Transfer"
          title={
            <span className="text-3xl md:text-4xl font-bold">
              Comprehensive Chauffeur Services:

              <span className="text-brand text-3xl md:text-4xl font-bold"> Corporate, Wedding, Events & Leisure</span>{' '}
              in Manchester
            </span>
          }
          text={
            <>
              <p >
                Discover top-tier chauffeur services in Manchester, tailored for corporate, wedding, events, and leisure needs with precision and care. Our experienced team delivers custom solutions for everything from busy business meetings to elegant red carpet galas, ensuring every ride feels effortless and special. Stay productive during corporate travel with onboard Wi-Fi and comfy conference seating, or celebrate your wedding with custom ribbon colours, fresh back shelf flowers, and complimentary champagne. We handle proms, graduations, birthday parties, sporting events, TV production, and film production smoothly, including discreet logistics for talent and crew in 16-seater Sprinters or people carriers.
              </p>


            </>
          }
          bgColor="bg-white"
          imagePosition="left"
        />
        <div className="container mx-auto px-4 max-w-7xl">
          <p className=" text-lg md:text-xl text-gray-700 leading-relaxed">
            Privacy and confidentiality are our priority for VIP guests at spots like Etihad Stadium or Ascot races, turning potential hassles into pure delight. Clients love our affordable rates and spotless presentation, solving travel worries so you can focus on what matters most.
          </p>
          <ul className="mt-6 space-y-3 text-gray-800">
            {[
              "Wedding hires with champagne and flowers.",
              "Corporate travel featuring Wi-Fi amenities",
              "Event management for seamless logistics.",
              "Leisure trips in stylish vehicles.",
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
          imageSrc="/Manchester Taxi Service.png"
          imageAlt="Executive Airport Transfer"
          title={
            <span className="text-3xl md:text-4xl font-bold">

              <span className="text-brand text-3xl md:text-4xl font-bold">Reliable</span>
              {' '} Manchester Airport Transfers & {' '}

              <span className="text-brand text-3xl md:text-4xl font-bold">Meet and Greet Chauffeur</span> Service
            </span>
          }

          text={
            <>
              <p >
                Trust our reliable Manchester Airport transfers for seamless starts and ends to your trips, guaranteeing a stress-free experience every time. We use advanced flight monitoring and real-time flight tracking, plus a full one-hour waiting policy, to match your exact arrival perfectly. Enjoy our inclusive meet & greet service where a friendly chauffeur holds a sign with your lead passenger name and company logo, ready to help with luggage for an effortless handover.

              </p>

            </>
          }
          bgColor="bg-white"
          imagePosition="right"
        />
        <div className="container mx-auto px-4 max-w-7xl">
          <p className=" text-lg md:text-xl text-gray-700 leading-relaxed">
            Our drivers follow strict hygiene rules, sanitizing vehicles often, wearing gloves, using hand sanitisers, and complying with all local laws for your safety. With over ten years in business, we've helped thousands of private and corporate clients arrive relaxed and ready. In our Manchester airport chauffeur service, you'll ride in premium vehicles like the Mercedes E Class or BMW 5 series, with free SMS/text updates on driver and vehicle details sent well ahead.

          </p>
          <ul className="mt-6 space-y-3 text-gray-800">
            {[
              "Flight tracking ensures on-time pickups.",
              "Meet and greet with name signs.",
              "Fixed prices cover all tolls.",
              "Child seats available on request.",
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
          imageSrc="/long-distance-manchester.jpg"
          imageAlt="Executive Airport Transfer"
          title={
            <span className="text-3xl md:text-4xl font-bold">


              <span className="text-brand text-3xl md:text-4xl font-bold">Long-Distance & VIP Private</span>
              {' '} Jet Chauffeur Hire{' '}

              <span className="text-brand text-3xl md:text-4xl font-bold">from Manchester</span> Service
            </span>
          }

          text={
            <>
              <p >
                Discover effortless long-distance chauffeur service across the UK, starting from Manchester with seamless door-to-door transfers that redefine comfort for extended journeys. Our experienced chauffeurs, logging over 200k miles yearly and serving 1000 clients with top-notch care, provide personalised attention in high-end vehicles equipped with travel pillows, chilled mineral water, newspapers, and generous legroom. We excel in connecting to private jet terminals like Signature Flight Support, Liverpool XLR, Farnborough, Gatwick, or Heathrow, ensuring hassle-free luxurious A-to-B transfers.

              </p>

            </>
          }
          bgColor="bg-white"
          imagePosition="left"
        />
        <div className="container mx-auto px-4 max-w-7xl">
          <p className=" text-lg md:text-xl text-gray-700 leading-relaxed">
            For VIP private jet chauffeur hire, count on our elite VIP security services from experts with international credentials in personal protection. Discreet chauffeurs use number masking for strict confidentiality, ideal for high-profile clients such as HNWIs, sports celebrities, and authors on UK tours. Backed by ex-Armed Forces Professionals and Guild of Professional Chauffeurs standards, we deliver bespoke solutions that shield against fines, legal issues, or reputational risks, focusing on your peace of mind every mile.

          </p>

        </div>
        <ImageTextSection
          imageSrc="/manchestor.jpg"
          imageAlt="Executive Airport Transfer"
          title={
            <span className="text-3xl md:text-4xl font-bold">


              <span className="text-brand text-3xl md:text-4xl font-bold">Explore Manchester's</span>
              {' '} Top Destinations in Style with{' '}

              <span className="text-brand text-3xl md:text-4xl font-bold">Executive Chauffeur Travel</span>
            </span>
          }

          text={
            <>
              <p >
                Experience Manchester's best spots without the usual headaches—our executive chauffeur service in Manchester takes care of it all. Forget battling traffic or hunting for parking; we handle every trip smoothly, whether it's a quick business meeting or a fun family outing to cool neighborhoods like Didsbury or Chorlton.

              </p>

            </>
          }
          bgColor="bg-white"
          imagePosition="right"
        />
        <div className="container mx-auto px-4 max-w-7xl">
          <p className=" text-lg md:text-xl text-gray-700 leading-relaxed">
            This city's got a fascinating mix of old-school Industrial Revolution history and modern energy. Check out stunning Gothic spots like Manchester Cathedral or dive into art at The Whitworth. As the UK's third-biggest city and a hot tech scene, Manchester feels even better with our reliable chauffeur car service. Head to Etihad or Old Trafford for epic stadium tours, or zip over to Salford Quays and MediaCityUK for media gigs. No matter if you're shopping, hitting events, or soaking up the creative scene, our luxury rides keep things simple and fun from start to finish.

          </p>
          <ul className="mt-6 space-y-3 text-gray-800">
            {[
              "Northern Quarter vibes for artsy folks.",
              "Stadium thrills for sports fans.",
              "Easy media shuttles to busy hubs.",
              "Door-to-door convenience for packed days.",
              "Premium drives that ditch everyday stress."
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
          imageSrc="/premium image.jpg"
          imageAlt="Executive Airport Transfer"
          title={
            <span className="text-3xl md:text-4xl font-bold">



              <span className="text-brand text-3xl md:text-4xl font-bold">Our Premium Fleet & Easy Booking</span>
              {' '} for Chauffeur Service{' '}

              <span className="text-brand text-3xl md:text-4xl font-bold">in Manchester</span>
            </span>
          }

          text={
            <>
              <p >
                Discover the ultimate in luxury rides with our chauffeur-driven service in Manchester. We've got an elite fleet packed with stars like Mercedes, Bentley, Range Rovers, Rolls Royce, Audi A8, BMW 7 series, and Tesla Model S – all picked for top-notch style and ease. Picture sinking into a super-quiet Mercedes S Class with tons of legroom, perfect climate, tinted windows, and soft lighting, or gather your crew in a roomy Mercedes V Class that seats up to 8, complete with a mini-fridge and plush setup. Every car's spotless, fully insured, and safe for any trip.

              </p>

            </>
          }
          bgColor="bg-white"
          imagePosition="left"
        />
        <div className="container mx-auto px-4 max-w-7xl">
          <p className=" text-lg md:text-xl text-gray-700 leading-relaxed">
            Jump on <strong className="text-brand">https://oktaxis.co.uk/</strong>  for quick quotes, clear prices with no surprises, VAT's in there too. We're here round the clock for airport runs, late nights out, one-way hauls, or custom routes, with easy pay options, free WiFi and water, plus help anytime by phone, email, or chat. Our glowing 5-star feedback and proper licenses mean you get hassle-free travel that fixes all your transport woes, day or night.


          </p>
          <ul className="mt-6 space-y-3 text-gray-800">
            {[
              "Premium fleet: Mercedes, Bentley picks.",
              "Simple online quotes, zero fees.",
              "Perks: WiFi, bottled water free.",
              "24/7 booking help ready.",
              "Cozy interiors, full climate control.",
              "Always safe, insured rides."
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
        <AboutSection />
        <LuxuryExperience />
        <FleetClasses />
        <ReadyToBook />
        <Testimonials />
      </main>
    </>
  );
}
