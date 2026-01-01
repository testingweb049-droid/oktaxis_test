import { Metadata } from "next";
import PageBanner from "@/components/page-banner";
import StructuredData from "@/components/structured-data";
import PageAboutSection from "@/components/page-about-section";
import OurServicesSection from "@/components/our-services-section";
import ConnectionAreasSection from "@/components/connection-areas-section";
import FAQSection from "@/components/faq-section";
import {
  generateMetadata as generateSEOMetadata,
  generateWebPageSchema,
  generateServiceSchema,
} from "@/lib/seo";
import ReviewsSection from "@/components/Sections/reviews";

const pageTitle =
  "London Chauffeur Service | Luxury Transfers to Heathrow & Gatwick";

const pageDescription =
"Professional London chauffeur service. Fixed-price luxury transfers to Heathrow (LHR), Gatwick, and The City. Executive Mercedes fleet including Congestion Charge."

export const metadata: Metadata = generateSEOMetadata({
  title: pageTitle,
  description: pageDescription,
  pageUrl: "/london-chauffeur-service",
  keywords: [
    "london chauffeur service",
    "london airport transfers",
    "executive transfers LHR",
    "executive transfers Gatwick",
    "Gatwick chauffeur",
    "executive transfers The City",
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

export default function LondonChauffeurServicePage() {
  const breadcrumbs = [
    { name: "Home", url: "https://oktaxis.co.uk/" },
    {
      name: "London Chauffeur Service",
      url: "https://oktaxis.co.uk/london-chauffeur-service",
    },
  ];

  return (
    <>
      <StructuredData
        data={[
          generateWebPageSchema({
            title: `${pageTitle} | OKTaxis`,
            description: pageDescription,
            url: "https://oktaxis.co.uk/london-chauffeur-service",
            breadcrumbs,
          }),
          generateServiceSchema({
            name: "London Chauffeur Service",
            description: pageDescription,
            areaServed:
              "London, Heathrow (LHR), Gatwick, The City, UK",
            serviceType: "Chauffeur Service",
          }),
        ]}
        id="london-chauffeur-service-schema"
      />

      <PageBanner heading={pageTitle} text={pageDescription} />

      <PageAboutSection
        heading={
          <>
            <span className="block">
              Professional Chauffeur Service London
            </span>
            <span className="block">
              Executive Airports &amp; City Travel
            </span>
          </>
        }
        text={[
          "Navigating London demands style and precision. Whether you need a seamless transfer to Heathrow Terminal 5 or an executive ride to a meeting in Canary Wharf, OK Taxis offers the consistency you deserve.",
          "We provide a London chauffeur service that is a cut above standard transport. Forget the uncertainty of ride-share apps or the discomfort of standard cabs. We offer fixed fares, professionally suited drivers, and immaculate Mercedes-Benz vehicles that include the Congestion Charge in the price.",
        ]}
        image="/assets/london-images/london-about-img.png"
        imageAlt="Professional London chauffeur service with Tower Bridge at sunset"
        imagePosition="right"
      />

      <OurServicesSection
        headline="Why Partner With Us? Your Trusted Partner for Executive Travel in London"
        services={[
          {
            icon: <AirportExpertsIcon />,
            title: "On-Time, Every Time",
            description:
              "We respect your schedule. Our chauffeurs know the city intimately, using expert navigation to avoid the worst of the M25 and city centre gridlock.",
          },
          {
            icon: <ExecutiveFleetIcon />,
            title: "Professional Chauffeurs",
            description:
              "Our team consists of experienced, vetted professionals who are fully licensed by Transport for London (TfL). They are dressed in business attire and prioritise your comfort and privacy.",
          },
          {
            icon: <FixedPricingIcon />,
            title: "No Hidden Fees",
            description:
              "London has many charges (Congestion Charge, ULEZ, drop-off fees). Our chauffeur service London quotes include all these costs upfront.",
          },
        ]}
      />

      <ConnectionAreasSection
        heading="London Airport & City Chauffeur Connections"
        cards={[
          {
            title:
              "Airport Chauffeur Service: Heathrow, Gatwick & Beyond Stress-Free London Airport Transfers",
            description: [
              "The journey to the airport should be relaxing. We specialise in providing the best airport chauffeur service London has to offer.",
              "We cover all major hubs: Heathrow (LHR), Gatwick (LGW), London City (LCY), Stansted, and Luton.",
            ],
            imageSrc: "/assets/london-images/london-connection-img-1.png",
            imageAlt:
              "Passenger looking out of a chauffeur-driven car window near London",
            children: (
              <ul className="list-disc pl-5 space-y-1 text-text-gray text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed">
                <li>
                  <span className="font-semibold">Flight Tracking:</span> We
                  monitor your flight status. If you are delayed holding over
                  London, we wait.
                </li>
                <li>
                  <span className="font-semibold">Meet &amp; Greet:</span> Your
                  chauffeur will park and meet you in the arrivals hall with a
                  name board, assisting with your luggage so you have a smooth
                  walk to your vehicle.
                </li>
              </ul>
            ),
          },
          {
            title:
              "Executive Service Corporate Chauffeur Service in the Capital",
            description: [
              "For our corporate clients, professionalism is non-negotiable. Our executive chauffeur service in London is designed for those visiting The City, Canary Wharf, or Knightsbridge.",
              "Arrive at your meeting in a pristine Mercedes-Benz. Our vehicles are ULEZ-compliant and offer a quiet environment to work. Whether it&apos;s a financial roadshow or a transfer to the Excel Centre, our discreet chauffeurs ensure you make the right impression.",
              "The quality of our service is a direct reflection of our team. We don&apos;t just hire drivers; we partner with seasoned chauffeurs who are fully licensed by Transport for London (TfL).",
            ],
            imageSrc: "/assets/london-images/london-connection-img-2.png",
            imageAlt:
              "Chauffeur opening the door of a black Mercedes in London",
          },
          {
            title: "City Travel Explore London with a Private Driver",
            description: [
              "From the West End to the exclusive suburbs, we are your trusted London private chauffeur.",
            ],
            imageSrc: "/assets/london-images/london-connection-img-3.png",
            imageAlt:
              "Professional chauffeur driving with a business passenger in the rear seat",
            children: (
              <>
                <ul className="list-disc pl-5 space-y-1 text-text-gray text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed">
                  <li>
                    <span className="font-semibold">Shopping Trips:</span>{" "}
                    Visiting Harrods, Selfridges, or Bond Street? Don&apos;t
                    worry about parking. We drop you at the door and help load
                    your bags when you are ready.
                  </li>
                  <li>
                    <span className="font-semibold">Events:</span> Heading to a
                    show at the Royal Albert Hall or Wembley Stadium? We handle
                    the logistics so you can enjoy the night without waiting in
                    the rain for a ride.
                  </li>
                </ul>
                <p className="mt-3 sm:mt-4 md:mt-5 text-text-gray text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed">
                  <span className="font-semibold">Station Transfers:</span> We
                  provide luxury door-to-door links to St Pancras (Eurostar),
                  Paddington, and Kings Cross, ensuring a smooth connection for
                  your onward journey.
                </p>
              </>
            ),
          },
        ]}
      />

      <FAQSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "How do I book a chauffeur to Heathrow Airport?",
            answer:
              "Use our quote form above. We offer fixed fares for Heathrow chauffeur transfers, providing a luxury experience often comparable in price to the Heathrow Express for groups.",
          },
          {
            question: "Does the price include the Congestion Charge?",
            answer:
              "Yes. All our London chauffeur quotes are final. You will not be asked to pay extra for the Congestion Zone or ULEZ fees.",
          },
        ]}

      />

      <ReviewsSection/> 

      {/* Additional Birmingham-specific content sections can be added here */}
    </>
  );
}


