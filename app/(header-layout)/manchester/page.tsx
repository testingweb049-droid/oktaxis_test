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
  import Seo from "@/components/seo";
  import PageBanner from "@/components/PageBanner";
  import PageAboutSection from "@/components/PageAboutSection";
  import PageFeatureSection from "@/components/PageFeatureSection";
import InfoCards from "@/components/Sections/InfoCards";
  import AreaServeSection from "@/components/AreaServeSection";
  import LocationPinIcon from "@/components/LocationPinIcon";
  import OurServicesSection from "@/components/OurServicesSection";
  import CTASection from "@/components/CTASection";
  import FleetClasses from "@/components/home/fleet";
  import ReviewsSection from "@/components/Sections/reviews";
import ConnectionAreasSection from "@/components/ConnectionAreasSection";
  
  
  
  export default function Manchester() {
    return (
      <>
        <Seo
          title="Manchester Airport Transfers | Reliable Taxi & Chauffeur Service"
          description="Book seamless Manchester airport transfers with OKTaxis. Enjoy executive chauffeur service, flight tracking, and 24/7 pickups from Manchester, Liverpool, and UK airports. Stress-free travel starts here."
          url="https://oktaxis.co.uk/services/airport-transfer"
          image="https://oktaxis.co.uk/images/airport-transfer.png"
        />
  
        <PageBanner
          heading="Manchester Airport Chauffeur Service | Luxury Transfers for Leeds & Liverpool"
          text="Executive Manchester airport chauffeur service. Private transfers for Terminal 1, 2 & 3. Fixed prices for Leeds, Liverpool, and long-distance travel. Meet & greet included."
          maxWidthClass="max-w-5xl"
        />
  
        <PageAboutSection
          heading="Executive Manchester Airport Chauffeur Service"
          text={
            <>
              <p>
              Manchester Airport (MAN) is the gateway to the North, but navigating the busy M56 and confusing terminal layouts can start your trip on the wrong foot. OkTaxis provides a chauffeur service Manchester Airport travelers rely on to avoid the stress.          
              </p>
              <p>
              Whether you are landing at the newly expanded Terminal 2 or flying out of Terminal 3, we offer a consistent, high-end experience. Forget standing in the rain waiting for a taxi or risking cancellations with ride-share apps. Our luxury chauffeur service Manchester  Airport guarantees a driver is waiting for you in the arrivals hall, ready to assist with your luggage and get you on the road
              immediately.              </p>
               
            </>
          }
          image="/assets/manchester-images/manchester-img.png"
          imageAlt="Executive Manchester Airport Chauffeur Service"
          imagePosition="right"
         
        />
  
      
        <InfoCards
          title="Our Key Airport Hubs"
          cards={[
            {
              image:"/assets/manchester-images/manchester-info-img-1.png",
              imageAlt: "Manchester Airport",
              heading: "Terminal 1",
              text: "The busiest hub. We park in the short-stay car park to ensure a quick exit. Your driver will meet you inside the arrivals hall.",

            },
            {
                image:"/assets/manchester-images/manchester-info-img-2.png",
                imageAlt: "Manchester Airport",
                heading: "Terminal 2",
                text: "Recently expanded and often a long walk from the gate. Our service for Manchester Terminal 2 includes flight tracking to ensure your driver is ready the moment you clear customs."
  
              },
              {
                image:"/assets/manchester-images/manchester-info-img-3.png",
                imageAlt: "Manchester Airport",
                heading: "Terminal 3",
                text: "Mostly for domestic and Ryanair flights. The pickup zone here can be congested, but our drivers know exactly where to position the vehicle for a smooth exit.",
  
              },
          ]}
        />

        <ConnectionAreasSection
          heading="Connecting the North: Leeds, Liverpool & Beyond"
          cards={[
            {
              title: "1. Leeds to Manchester Connections",
              description: [
                "The train route across the Pennines is notorious for delays. A Leeds to Manchester airport transfer with us offers a private, stress-free alternative. We use the M62 to manage the crossing, monitoring traffic reports to avoid high-altitude weather delays.",
                "Whether you need airport transfers Leeds to Manchester for business or a family holiday, our V-Class fleet handles the luggage capacity easily."
              ],
              imageSrc: "/assets/manchester-images/manchester-connect-img-1.png",
              imageAlt: "Mercedes V-Class driving through countryside between Leeds and Manchester"
            },
            {
              title: "2. Liverpool and Merseyside",
              description: [
                "Located just 35 miles away, the journey to Liverpool should be quick, but the M62/M60 interchange is a known bottleneck. We provide airport transfers Liverpool to Manchester that factor in rush-hour traffic.",
                "Our drivers know local \"rat runs\" to avoid standstill traffic, ensuring your Liverpool to Manchester airport transfers are punctual. Whether you need a one-way transfer or a return journey, we offer a fixed price that includes all drop-off fees."
              ],
              imageSrc: "/assets/manchester-images/manchester-connect-img-2.png",
              imageAlt: "Liverpool John Lennon Airport exterior with airplane tail"
            }
          ]}
        />
{/*   
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
        <CTASection
          heading="Book Your Transfer"
          text="Don't leave your airport journey to chance. Secure your North West airport transfer today for a fixed price and peace of mind."
          buttonText="Get an Instant Quote"
        />
  
  <ReviewsSection/>
   */}
     
      </>
    );
  }
  