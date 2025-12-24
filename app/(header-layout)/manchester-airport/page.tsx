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
   import ReviewsSection from "@/components/Sections/reviews";
import ConnectionAreasSection from "@/components/ConnectionAreasSection";
import FAQSection from "@/components/FAQSection";
import FleetShowcase from "@/components/FleetShowcase";
import TransfersSection from "@/components/TransfersSection";
import FleetClasses from "@/components/home/fleet";

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

        

        <OurServicesSection
          headline="Why Choose Our Private Chauffeur Service?"
          services={[
            {
              icon: (
                <svg
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 21.0098V4C0 1.79083 1.79083 0 4 0H21.0098C22.0707 5.5473e-06 23.0881 0.421437 23.8382 1.17158L41.4951 18.8284C43.0572 20.3905 43.0572 22.9232 41.4951 24.4852L24.4852 41.4951C22.9232 43.0572 20.3905 43.0572 18.8284 41.4951L1.17158 23.8382C0.421437 23.0881 5.5473e-06 22.0707 0 21.0098ZM9.33333 5.33333C7.12417 5.33333 5.33333 7.12417 5.33333 9.33333C5.33333 11.5425 7.12417 13.3333 9.33333 13.3333C11.5425 13.3333 13.3333 11.5425 13.3333 9.33333C13.3333 7.12417 11.5425 5.33333 9.33333 5.33333Z"
                    fill="#FFB400"
                  />
                </svg>
              ),
              title: "Fixed Pricing",
              description:
                "Manchester Airport charges high drop-off and pick-up fees. We include those in your quote. The price you see is the price you pay for your airport transfer Manchester.",
            },
            {
              icon: (
                <svg
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42.4589 32.2039L32.104 8.50015C31.7359 7.65719 30.9337 7.11719 30.0507 7.11719H22.8218L23.0033 8.83274C23.0403 9.18237 22.7655 9.48756 22.4137 9.48756H20.2537C19.9018 9.48756 19.627 9.18237 19.664 8.83274L19.8455 7.11719H12.6166C11.7329 7.11719 10.9307 7.65719 10.5626 8.50015L0.207745 32.2039C-0.47744 33.7735 0.615893 35.5616 2.26256 35.5616H16.8433L17.607 28.3261C17.6707 27.7231 18.1789 27.2653 18.7855 27.2653H23.8818C24.4885 27.2653 24.9966 27.7231 25.0603 28.3261L25.824 35.5616H40.4048C42.0515 35.5616 43.1448 33.7735 42.4589 32.2039ZM19.2892 12.3883C19.3046 12.2427 19.3734 12.1079 19.4822 12.0099C19.5911 11.912 19.7324 11.8579 19.8789 11.8579H22.7892C23.0922 11.8579 23.347 12.0868 23.3789 12.3883L23.7196 15.6164C23.7752 16.1416 23.3633 16.5987 22.8359 16.5987H19.8329C19.3048 16.5987 18.8937 16.1416 18.9492 15.6164L19.2892 12.3883ZM23.3811 24.895H19.2855C18.5818 24.895 18.0329 24.2853 18.107 23.5853L18.4826 20.0298C18.5463 19.4268 19.0544 18.969 19.6611 18.969H23.0055C23.6122 18.969 24.1203 19.4268 24.184 20.0298L24.5596 23.5853C24.6337 24.2853 24.0848 24.895 23.3811 24.895Z"
                    fill="#FFB400"
                  />
                </svg>
              ),
              title: "M56 Expertise",
              description:
                "The main road into the airport (Princess Parkway/A5103) is prone to accidents. Our drivers check traffic flow 30 minutes before your pickup to plan the best approach.",
            },
            {
              icon: (
                <svg
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42.6437 23.175C40.5252 13.0787 32.3919 7.01204 23.703 6.0713V4.74537C23.703 3.43426 22.6437 2.375 21.3326 2.375C20.0215 2.375 18.9622 3.43426 18.9622 4.74537V6.0713C10.2437 7.01204 2.18447 13.0787 0.0215045 23.175C-0.141459 23.9231 0.651134 24.7528 1.40669 24.0194C5.25854 19.9454 9.38447 20.138 13.1548 26.7602C13.5474 27.4639 14.2585 27.3972 14.6141 26.7602C16.1104 24.138 17.94 21.338 21.3326 21.338C25.6659 21.338 27.8659 26.4343 28.0511 26.7602C28.4067 27.3972 29.1178 27.4639 29.5104 26.7602C33.2882 20.1306 37.4437 19.9898 41.2585 24.0194C42.0215 24.7602 42.8067 23.9231 42.6437 23.175ZM18.9622 24.7231V34.375C18.9622 35.0269 18.4289 35.5602 17.7771 35.5602C17.1993 35.5602 16.7993 35.1676 16.6585 34.7676C16.2215 33.5306 14.8734 32.8861 13.6363 33.3231C12.3993 33.7602 11.7548 35.1157 12.1919 36.3454C13.0215 38.7083 15.2734 40.2935 17.7771 40.2935C21.0437 40.2935 23.703 37.6343 23.703 34.3676V24.7157C23.0289 24.1306 22.2363 23.7083 21.3326 23.7083C20.4215 23.7157 19.6734 24.0639 18.9622 24.7231Z"
                    fill="#FFB400"
                  />
                </svg>
              ),
              title: "Weather Ready",
              description:
                "Manchester is famous for rain. We offer door-to-terminal service so you never have to stand outside exposed to the elements.",
            },
          ]}
        />

        <FleetClasses />

        <FAQSection
          title="Frequently Asked Questions"
          faqs={[
            {
              question: "Do you cover cities other than Manchester?",
              answer:
                "Yes. We provide transfers to Manchester Airport from anywhere in the UK. Our most popular routes include Chester, Preston, and Leeds.",
            },
            {
              question: "How do I find my driver for a private transfer to Manchester Airport?",
              answer:
                'We provide a full "Meet and Greet." Your driver will be standing in the arrivals hall holding a name board. We also send you their name and vehicle registration via text before you land.',
            },
            {
              question: "Can I book an airport transfer Manchester for a large group?",
              answer:
                "Absolutely. Our Mercedes V-Class is perfect for groups of up to 7 people. It is the ideal choice for a Manchester airport transfer when you have excess luggage or golf clubs.",
            },
            {
              question: "What happens if my flight is delayed?",
              answer:
                "We track all inbound flights. If your plane is late, we adjust our arrival time automatically. You do not need to worry about updating us regarding your Manchester airport transfers.",
            },
          ]}
        />

        <ReviewsSection />
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
  