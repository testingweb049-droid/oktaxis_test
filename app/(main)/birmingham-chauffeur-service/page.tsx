import { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import StructuredData from "@/components/StructuredData";
import PageAboutSection from "@/components/PageAboutSection";
import OurServicesSection from "@/components/OurServicesSection";
import ConnectionAreasSection from "@/components/ConnectionAreasSection";
import FAQSection from "@/components/FAQSection";
import {
  generateMetadata as generateSEOMetadata,
  generateWebPageSchema,
  generateServiceSchema,
} from "@/lib/seo";
import ReviewsSection from "@/components/Sections/reviews";

const pageTitle =
  "Birmingham Chauffeur Service | Executive Transfers to BHX & NEC";

const pageDescription =
  "Premium Birmingham chauffeur service. Fixed-price executive transfers to Birmingham Airport (BHX), London, and the NEC. Luxury Mercedes fleet and professional chauffeurs.";

export const metadata: Metadata = generateSEOMetadata({
  title: pageTitle,
  description: pageDescription,
  pageUrl: "/birmingham-chauffeur-service",
  keywords: [
    "birmingham chauffeur service",
    "birmingham airport transfers",
    "executive transfers BHX",
    "NEC chauffeur",
  ],
});

const AirportExpertsIcon = () => (
  <svg
    viewBox="0 0 43 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11"
  >
    <path
      d="M20.7729 19.1885C16.7768 18.1499 15.4917 17.076 15.4917 15.4036C15.4917 13.4848 17.2697 12.1469 20.2448 12.1469C23.3783 12.1469 24.5402 13.6432 24.6458 15.8438H28.5363C28.4131 12.8158 26.5647 10.0344 22.8854 9.13656V5.28125H17.6042V9.08375C14.1889 9.82312 11.4427 12.0413 11.4427 15.4389C11.4427 19.5054 14.8051 21.5299 19.7167 22.7094C24.1177 23.7656 24.9979 25.3148 24.9979 26.952C24.9979 28.1667 24.1353 30.1031 20.2448 30.1031C16.6183 30.1031 15.1924 28.4835 14.9987 26.4062H11.1258C11.3371 30.2616 14.2242 32.4269 17.6042 33.1486V36.9688H22.8854V33.1839C26.3182 32.5325 29.0469 30.5432 29.0469 26.9344C29.0469 21.9348 24.7691 20.2272 20.7729 19.1885Z"
      className="fill-current"
    />
  </svg>
);

const ExecutiveFleetIcon = () => (
  <svg
    viewBox="0 0 37 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11"
  >
    <path
      d="M30.8 14.3733H23.4664L16.7225 2.57053C16.6326 2.41339 16.5027 2.2828 16.3461 2.19198C16.1895 2.10116 16.0116 2.05333 15.8306 2.05334L11.6277 2.05334C10.9456 2.05334 10.4534 2.70592 10.6408 3.3617L13.7869 14.3733H7.18668L4.41468 10.6773C4.2209 10.4188 3.9161 10.2667 3.59335 10.2667H1.02732C0.359346 10.2667 -0.130887 10.8942 0.0314546 11.5423L2.05335 18.48L0.0314546 25.4177C-0.130887 26.0658 0.359346 26.6933 1.02732 26.6933H3.59335C3.91675 26.6933 4.2209 26.5413 4.41468 26.2827L7.18668 22.5867H13.7869L10.6408 33.5977C10.4534 34.2535 10.9456 34.9067 11.6277 34.9067H15.8306C16.1989 34.9067 16.539 34.709 16.7218 34.3895L23.4664 22.5867H30.8C33.0683 22.5867 36.96 20.7483 36.96 18.48C36.96 16.2117 33.0683 14.3733 30.8 14.3733Z"
      className="fill-current"
    />
  </svg>
);

const FixedPricingIcon = () => (
  <svg
    viewBox="0 0 37 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11"
  >
    <path
      d="M36.6759 12.6438C26.4416 3.17772 10.5243 3.18118 0.293978 12.6438C-0.0907412 12.9996 -0.0982507 13.6021 0.27376 13.9712L2.25165 15.9335C2.60634 16.2859 3.17706 16.2934 3.5456 15.9555C11.9748 8.23337 24.994 8.23163 33.4249 15.9555C33.7934 16.2934 34.3641 16.2853 34.7188 15.9335L36.6967 13.9712C37.0682 13.6021 37.0606 12.9996 36.6759 12.6438ZM18.485 24.0305C16.4429 24.0305 14.788 25.6855 14.788 27.7275C14.788 29.7695 16.4429 31.4245 18.485 31.4245C20.527 31.4245 22.182 29.7695 22.182 27.7275C22.182 25.6855 20.527 24.0305 18.485 24.0305ZM30.1923 19.2019C23.5342 13.3139 13.4281 13.3202 6.77759 19.2019C6.37901 19.5543 6.3663 20.166 6.74467 20.5392L8.73411 22.5026C9.08071 22.8446 9.63872 22.8677 10.0078 22.5488C14.8573 18.3568 22.1236 18.366 26.9615 22.5488C27.3306 22.8677 27.8886 22.8452 28.2352 22.5026L30.2247 20.5392C30.6036 20.166 30.5903 19.5537 30.1923 19.2019Z"
      className="fill-current"
    />
  </svg>
);

export default function BirminghamChauffeurServicePage() {
  const breadcrumbs = [
    { name: "Home", url: "https://oktaxis.co.uk/" },
    {
      name: "Birmingham Chauffeur Service",
      url: "https://oktaxis.co.uk/birmingham-chauffeur-service",
    },
  ];

  return (
    <>
      <StructuredData
        data={[
          generateWebPageSchema({
            title: `${pageTitle} | OKTaxis`,
            description: pageDescription,
            url: "https://oktaxis.co.uk/birmingham-chauffeur-service",
            breadcrumbs,
          }),
          generateServiceSchema({
            name: "Birmingham Chauffeur Service",
            description: pageDescription,
            areaServed:
              "Birmingham, Birmingham Airport (BHX), NEC, West Midlands, UK",
            serviceType: "Chauffeur Service",
          }),
        ]}
        id="birmingham-chauffeur-service-schema"
      />

      <PageBanner heading={pageTitle} text={pageDescription} />

      <PageAboutSection
        heading={
          <>
            <span className="block">
              Premium Chauffeur Service Birmingham
            </span>
            <span className="block">Airport Transfers &amp; UK-Wide Travel</span>
          </>
        }
        text={[
          "Finding a dependable executive partner in the Midlands requires more than just booking a ride; it requires trust. Whether you need a Birmingham Airport chauffeur for an early flight or a luxury vehicle for a cross-country roadshow, OKTaxis offers the consistency you deserve.",
          "We specialize in city-to-city chauffeur services and corporate travel. Forget the stress of standard cabs or watching a meter climb on the Aston Expressway. We provide fixed fares, impeccably dressed chauffeurs, and pristine Mercedes-Benz vehicles for every journey.",
        ]}
        image="/assets/birmingham-images/birmingham-about-img.png"
        imageAlt="Premium Birmingham chauffeur service overlooking the city skyline"
        imagePosition="right"
      />

      <OurServicesSection
        headline="Why Choose OK Taxis Birmingham?"
        services={[
          {
            icon: <AirportExpertsIcon />,
            title: "Airport & Intercity Experts",
            description:
              "We specialise in luxury transfers to Birmingham Airport (BHX) and stress-free long-distance journeys to London, Manchester, Heathrow, and beyond.",
          },
          {
            icon: <ExecutiveFleetIcon />,
            title: "Executive & Luxury Fleet",
            description:
              "Travel in style in our modern Mercedes-Benz vehicles, perfect for corporate travel to the NEC, Birmingham city centre, or regional business hubs.",
          },
          {
            icon: <FixedPricingIcon />,
            title: "Transparent Fixed Pricing",
            description:
              "Receive a clear, upfront price for your Birmingham chauffeur service with no hidden fees for traffic, diversions, or waiting time.",
          },
        ]}
      />

      <ConnectionAreasSection
        heading="Birmingham Airport & City-to-City Chauffeur Connections"
        cards={[
          {
            title:
              "Airport Chauffeur: Birmingham Airport (BHX) Stress-Free Birmingham Airport Transfers",
            description: [
              "Your journey to or from Birmingham Airport (BHX) should be the most relaxing part of your trip. Our dedicated airport chauffeur service in Birmingham is designed to eliminate the anxiety of the M42 traffic.",
              "We monitor your flight status to ensure timely pickups, even if you are delayed. Your chauffeur will greet you with a professional meet-and-greet service inside the terminal, assist with your luggage, and provide a smooth transfer to your destination, whether it is the city centre, Solihull, or further afield.",
            ],
            imageSrc: "/assets/birmingham-images/birmingham-connection-img-1.png",
            imageAlt:
              "Professional chauffeur opening the door of a luxury car at Birmingham Airport",
          },
          {
            title:
              "City-to-City Travel From Birmingham in Comfort on UK-Wide Journeys",
            description: [
              "For trips that go beyond the West Midlands, our intercity chauffeur service from Birmingham offers the perfect blend of productivity and comfort. Why endure crowded trains at Birmingham New Street Station or the fatigue of driving yourself?",
              "Settle into a spacious, well-maintained Mercedes-Benz and let our professional chauffeur handle the navigation.",
            ],
            imageSrc: "/assets/birmingham-images/birmingham-connection-img-2.png",
            imageAlt:
              "Passenger stepping out of a black Mercedes chauffeur vehicle in Birmingham",
            children: (
              <ul className="list-disc pl-5 space-y-1 text-text-gray text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed">
                <li>
                  <span className="font-semibold">Birmingham to London:</span>{" "}
                  Direct door-to-door service avoiding the stress of Euston
                  station and the Underground.
                </li>
                <li>
                  <span className="font-semibold">Birmingham to Manchester:</span>{" "}
                  A smooth run up the M6, perfect for connecting flights or
                  business meetings.
                </li>
                <li>
                  <span className="font-semibold">Birmingham to Heathrow:</span>{" "}
                  Reliable luxury transfers to London&apos;s main hub, ensuring
                  you make your connection.
                </li>
              </ul>
            ),
          },
          {
            title:
              "Corporate & VIP Service Executive Chauffeur Service in Birmingham",
            description: [
              "When your travel needs demand a higher standard, our executive chauffeur service delivers. Perfect for corporate clients visiting the ICC (International Convention Centre) or special events in the Jewellery Quarter, this service guarantees a sophisticated experience.",
              "Arrive at your destination in a premium vehicle from our luxury fleet, driven by a professional chauffeur dedicated to providing discreet service. Make a lasting impression with every journey.",
              "Your safety is in the hands of our professional team. Each chauffeur is fully licensed, insured, and dedicated to exceptional service. They are not just experts behind the wheel; they are courteous, discreet, and knowledgeable. You can trust that you are in safe hands with OK Taxis.",
            ],
            imageSrc: "/assets/birmingham-images/birmingham-connection-img-3.png",
            imageAlt:
              "Luxury chauffeur vehicles waiting on the tarmac beside a private jet",
          },
        ]}
      />

      <FAQSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "How do I book a chauffeur from Birmingham to London?",
            answer:
              "You can get an instant fixed-price quote using our booking form above. We cover all major UK destinations, offering a competitive Birmingham chauffeur service that rivals First Class train fares for groups.",
          },
          {
            question: "Do you pick up from Birmingham Airport?",
            answer:
              "Yes. We offer a comprehensive Meet & Greet service. Your chauffeur will park and meet you in the arrivals hall with a name board, so you receive VIP treatment rather than hunting for a car in the Drop & Go zone.",
          },
          {
            question: "Can I book an executive car for a wedding?",
            answer:
              "Absolutely. Our luxury car hire in Birmingham is popular for weddings and special events. We can provide ribbon-adorned Mercedes vehicles for venues across the West Midlands.",
          },
        ]}

      />

      <ReviewsSection/> 

      {/* Additional Birmingham-specific content sections can be added here */}
    </>
  );
}


