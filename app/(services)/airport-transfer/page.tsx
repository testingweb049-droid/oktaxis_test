import { Metadata } from "next";
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
import PageBanner from "@/components/page-banner";
import { generateMetadata as generateSEOMetadata, generateWebPageSchema, generateServiceSchema } from "@/lib/seo";
import StructuredData from "@/components/structured-data";
import PageAboutSection from "@/components/page-about-section";
import PageFeatureSection from "@/components/page-feature-section";
import InfoCards from "@/components/Sections/info-cards";
import AreaServeSection from "@/components/area-serve-section";
import LocationPinIcon from "@/components/location-pin-icon";
import OurServicesSection from "@/components/our-services-section";
import FleetClasses from "@/components/home/fleet";
import ReviewsSection from "@/components/Sections/reviews";
import ConnectionAreasSection from "@/components/connection-areas-section";

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
      className="fill-primary-yellow"
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
      className="fill-primary-yellow"
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
      className="fill-primary-yellow"
    />
  </svg>
);

export const metadata: Metadata = generateSEOMetadata({
  title: "Manchester Airport Transfers | Reliable Taxi & Chauffeur Service",
  description:
    "Book seamless Manchester airport transfers with OKTaxis. Enjoy executive chauffeur service, flight tracking, and 24/7 pickups from Manchester, Liverpool, and UK airports. Stress-free travel starts here.",
  pageUrl: "/airport-transfer",
  keywords: [
    "airport transfer manchester",
    "manchester airport taxi",
    "airport chauffeur service",
    "airport transfer service",
    "manchester airport transfer",
  ],
});

export default function AirportTransfer() {
  const breadcrumbs = [
    { name: "Home", url: "https://oktaxis.co.uk/" },
    { name: "Airport Transfer", url: "https://oktaxis.co.uk/airport-transfer" },
  ];

  return (
    <>
      <StructuredData
        data={[
          generateWebPageSchema({
            title: "Manchester Airport Transfers | Reliable Taxi & Chauffeur Service | OKTaxis",
            description:
              "Book seamless Manchester airport transfers with OKTaxis. Enjoy executive chauffeur service, flight tracking, and 24/7 pickups from Manchester, Liverpool, and UK airports. Stress-free travel starts here.",
            url: "https://oktaxis.co.uk/airport-transfer",
            breadcrumbs,
          }),
          generateServiceSchema({
            name: "Airport Transfer Service",
            description: "Professional airport transfer service to Manchester Airport, Liverpool John Lennon Airport, and other UK airports. Executive chauffeur service with flight tracking and 24/7 availability.",
            areaServed: "Manchester, Liverpool, Greater Manchester, Merseyside, UK",
            serviceType: "Airport Transportation Service",
          }),
        ]}
        id="airport-transfer-schema"
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

    </>
  );
}
