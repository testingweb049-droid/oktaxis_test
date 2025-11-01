import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import {
  FaGlassCheers,
  FaBriefcase,
  FaBirthdayCake,
  FaUsers,
} from "react-icons/fa";
import Seo from "../../../../../components/Seo";
import { Check } from "lucide-react";
export default function EventWedding() {
  return (
    <>
      <Seo
        title="Luxury Wedding & Event Transfers | OKTaxis Manchester"
        description="Arrive in style with OKTaxis' luxury wedding and event transfer service in Manchester. Elegant vehicles, professional chauffeurs, and seamless group travel."
        url="https://oktaxis.co.uk/services/event-wedding"
        image="https://oktaxis.co.uk/Luxury%20Wedding%20&%20Event%20Transfers.jpg"
      />
      <HeroSection2
        bgImage="/wedding.png"
        title="Luxury Wedding & Event Transfers — Arrive in Style"
      // description="At OKTaxis, we specialize in providing luxury wedding and event transfers that make your special day truly unforgettable. From elegant arrivals to seamless departures, our fleet of premium vehicles and professional chauffeurs ensure you and your guests travel in comfort, style, and punctuality. Whether it's a grand wedding, corporate event, or private celebration, OKTaxis delivers a first-class experience tailored to your needs, so you can focus on creating beautiful memories."
      />

      <Offer />

      <ImageTextSection
        imageSrc="/Luxury Wedding Manchester.png"
        imageAlt="Grand wedding entrance"
        imagePosition="left"
        bgColor="bg-white"
        headingAs="h2"

        title={
          <>
            <span className="text-brand">Affordable Wedding Cars</span>{" "}
            Manchester North West
          </>
        }
        text={
          <>
            <p>
              At OK Taxis, we deliver affordable wedding cars Manchester North West that elevate your special day without breaking the bank. Our wedding car hire Manchester caters to couples seeking luxury at sensible prices, drawing on our expertise since 2007.


            </p>
            <p className="mt-4">
              Based in Manchester, we cover the full North West, including Bury, Bolton, and Chester, with a focus on impeccable service. Picture gliding in a Diamond White Mercedes-Benz E Class, adorned with ribbons and flowers matching your theme all at no extra cost.
            </p>

          </>
        }


      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          We prioritise top-tier quality while slashing expenses, making us the trusted choice for budget-savvy weddings. Our award-winning team ensures every detail shines, from route planning to timely arrivals. Contact us on <strong className="text-brand underline">+44 7788 710290</strong> or <strong className="text-brand underline">info@oktaxis.co.uk </strong> to create your perfect plan. As the region's leading provider, we blend experience and reliability for unforgettable moments.


        </p>


        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Fair prices: Luxury without high costs.",
            "Free decor: Ribbons, flowers, petals included.",
            "Wide coverage: Lancashire, Wirral, beyond served.",
            "Trusted team: Ethical, award-winning reputation.",

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
        imageSrc="/Luxury Wedding & Event Transfers.png"
        imageAlt="Corporate event transportation"
        imagePosition="right"
        bgColor="bg-white"
        headingAs="h2"
        title={
          <>
            Explore Manchester <span className="text-brand">Stockport Wedding Car</span> Insights
          </>
        }
        text={
          <>
            <p>
              For wedding car hire Manchester UK, OK Taxis offers deep insights tailored to Manchester and Stockport, backed by years of hands-on experience. We specialise in stress-free, memorable wedding transportation that heightens the day's emotions, like a bride's grand arrival.

            </p>
            <p className="mt-4">
              Select from our diverse fleet, including the sleek Iridium Silver S Class or Audi A8 White, all chauffeur-driven for safety. Located at 0B Portway, Wythenshawe, Manchester, we've excelled since 2007 and browse our options at <strong className="text-brand underline">OK Taxis.</strong>
            </p>
          </>
        }

      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">
          We address queries like wedding car hire with chauffeur through custom packages that fit your vision perfectly.Our simple process includes instant quotes via email, plus classic, vintage, retro, and modern cars like the 7-seater V-Class for groups. With features such as ample leg room, privacy glass, and a rear fridge, we ensure comfort across Runcorn, Wrexham, and Dewsbury. As experts, we guarantee smooth, hassle-free journeys every time.

        </p>



        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Quick quotes: Transparent pricing emailed fast.",
            "Custom packs: Tailored to your preferences.",
            "Best routes: Planned for seamless events.",
            "Many styles: Traditional to modern available.",

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
        imageSrc="/wedding-image2 .jpg"
        imageAlt="Professional wedding chauffeur services"
        imagePosition="left"
        bgColor="bg-white"
        headingAs="h2"
        title={
          <>
            Professional Chauffeur <span className="text-brand">Driven Wedding</span> Services
          </>
        }
        text={
          <>
            <p>
              OK Taxis excels in professional chauffeur driven wedding services across Manchester, drawing on our authoritative reputation for luxury and dependability. Our wedding chauffeur service Manchester centres on your Big Day, with smartly dressed, courteous chauffeurs trained to elite standards.
            </p>
            <p className="mt-4">
              They assist with photos, quick trips, and more, ensuring joy from start to finish. Honoured at Annual Business Awards for honesty and professionalism, we handle every enquiry with care. Free decorations like ribbons and bows enhance the experience, with bookings from one hour to a full week.

            </p>
          </>
        }

      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          Our team arrives early, manages family or guests, and maintains vehicles like the high-spec BMW 7 series impeccably. Covering Halifax, Lancaster, and Northwest England, we boast flawless safety records and extras like coloured paper flower petals. Trust our dedicated approach for premier wedding car chauffeur needs.


        </p>


        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Top chauffeurs: Helpful, knowledgeable, friendly pros.",
            "Flexible time: Hour to week bookings.",
            "Free extras: Decorations, drinks included.",
            "Reliable firm: Strong regional reputation.",

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
        imageSrc="/wedding-image3.jpg"
        imageAlt="Classic and modern wedding cars Manchester"
        imagePosition="right"
        bgColor="bg-white"
        headingAs="h2"
        title={
          <>
            Classic Vintage <span className="text-brand">Modern Wedding Car</span> Styles
          </>
        }
        text={
          <>
            <p>
              OK Taxis curates classic vintage modern wedding car styles for your wedding car hire Manchester, infusing personal touches from our seasoned insights. I remember a Lancaster bride thrilled with her retro Mercedes, ribbons perfectly matching her dress for that wow factor.
            </p>
            <p className="mt-4">
              Our fleet spans elegant E Class to top-range S Class, decorated with flowers or ribbons in your chosen hues. We create memorable occasions at a fraction of competitors' prices, suiting any theme flawlessly. Options include the V-Class for up to six in conference seating, ideal for bridesmaids, guests, or airport transfers to Junction 21.

            </p>
          </>
        }


      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          Enjoy luxury perks like privacy glass and chilled drinks from the fridge, available 365 days a year. Our chauffeurs manage events expertly, with all vehicles maintained meticulously. Choose us for chauffeur wedding car that's truly premium and personal.



        </p>


        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Style mix: Classic to modern dreams.",
            "Group cars: 7-seater for families.",
            "Custom decor: Ribbons, flowers schemed.",
            "Comfy rides: High-spec enjoyable interiors.",

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
        imageSrc="/wedding-image1.jpg"
        imageAlt="Popular wedding cars Manchester collection"
        imagePosition="left"
        bgColor="bg-white"
        headingAs="h2"
        title={
          <>
            Popular <span className="text-brand">Wedding Cars Manchester</span> Collection
          </>
        }
        text={
          <>
            <p>
              Our popular wedding cars Manchester collection stands as the largest and most varied in the North West, showcasing OK Taxis' expertise in standout selections. Featuring the latest Mercedes-Benz S Class and more, one couple adored their Diamond White E Class with custom ribbon and flower decor.
            </p>
            <p className="mt-4">
              All vehicles meet National Association of Wedding Car Professionals standards, available daily for your event. Browse categories online to discover retro to modern gems like Audi A8 White or BMW 7 series. Perfect for short trips or full days, with free big bows or petals adding charm. The spacious V-Class suits groups, fully equipped for comfort.
            </p>
          </>
        }

      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          Use our system for availability checks, quotes, and deposits—James Highmore praises our value and drivers. Ideal for manchester wedding cars or wedding cars Manchester UK searches.


        </p>


        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Big fleet: Varied Manchester wedding cars.",
            "Tailored options: Decor for your vision.",
            "Simple book: Instant quotes, easy deposit.",
            "Quality keep: Premium maintenance always.",

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
        imageSrc="/Luxury Wedding & Event Transfers.png"
        imageAlt="Wedding chauffeur Manchester booking advantages"
        imagePosition="right"
        bgColor="bg-white"
        headingAs="h2"
        title={
          <>
            <span className="text-brand">Why Choose Us</span> Booking Advantages
          </>
        }
        text={
          <>
            <p>
              Why choose us for wedding chauffeur Manchester? OK Taxis delivers unmatched booking advantages, rooted in our 2007 establishment and proven trustworthiness. We've claimed Business of the Year for ethical excellence, making us the premier provider from planning to drop-off.

            </p>
            <p className="mt-4">
              Smart chauffeurs ensure safe, fun journeys across the Greater Manchester Area and beyond. Our luxury wedding car hire Manchester cuts costs competitively, flexible for one to multiple cars with punctual drivers. Serving Southport, The Wirral, and Preston, we customise with decorations or transfers, as a satisfied customer noted, our service is excellent and highly recommendable.

            </p>
          </>
        }

      />
      <div className="container mx-auto px-4 max-w-7xl">

        <p className=" text-lg  pb-2 text-gray-700 leading-relaxed">

          Booking is straightforward: quote online, browse fleet, pay deposit. Email or call today for tailor-made wedding chauffeur service.


        </p>


        <ul className="mt-4 space-y-3 text-gray-800">
          {[
            "Award wins: Excellence, trustworthiness recognised.",
            "Easy packs: Hour to week tailored.",
            "Full cover: Northwest and surroundings.",
            "User focus: Extras, custom experiences.",

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
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center  mb-12">

            {
              <span className="text-3xl md:text-4xl font-bold">
                Our   <span className="text-brand text-3xl md:text-4xl font-bold">Specialized</span>{' '} Event{' '}
                <span className="text-brand text-3xl md:text-4xl font-bold">Services</span>{' '}

              </span>
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaGlassCheers className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Weddings</h3>
              <p className="text-gray-600">
                Arrive at your Manchester ceremony or reception in luxurious style with our decorated vehicles and timely service.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaBriefcase className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Corporate Events</h3>
              <p className="text-gray-600">
                Impress with VIP transport for business meetings, conferences, or award ceremonies in Manchester.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaBirthdayCake className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Parties & Celebrations
              </h3>
              <p className="text-gray-600">
                Enjoy seamless rides for birthdays, anniversaries, or concerts across Manchester.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaUsers className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Group Transport</h3>
              <p className="text-gray-600">
                Coordinated multi-vehicle services for wedding parties, corporate teams, or tour groups, ensuring everyone arrives together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
