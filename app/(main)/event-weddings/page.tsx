import { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import PageAboutSection from "@/components/PageAboutSection";
import AboutServiceSection from "@/components/AboutServiceSection";
import ServiceDetailSection from "@/components/ServiceDetailSection";
import ConnectionAreasSection from "@/components/ConnectionAreasSection";
import OurServicesSection from "@/components/OurServicesSection";
import { generateMetadata as generateSEOMetadata, generateWebPageSchema, generateServiceSchema } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";
 import FAQSection from "@/components/FAQSection";
 import ReviewsSection from "@/components/Sections/reviews";
export const metadata: Metadata = generateSEOMetadata({
  title: "Luxury Wedding & Event Transfers | OKTaxis Manchester",
  description:
    "Arrive in style with OKTaxis' luxury wedding and event transfer service in Manchester. Elegant vehicles, professional chauffeurs, and seamless group travel.",
  pageUrl: "/event-weddings",
  keywords: [
    "wedding car hire manchester",
    "wedding chauffeur",
    "event transportation",
    "wedding car service",
    "luxury wedding cars",
  ],
});

export default function EventWedding() {
  const breadcrumbs = [
    { name: "Home", url: "https://oktaxis.co.uk/" },
    { name: "Wedding & Event Transfers", url: "https://oktaxis.co.uk/event-weddings" },
  ];

  return (
    <>
      <StructuredData
        data={[
          generateWebPageSchema({
            title: "Luxury Wedding & Event Transfers | OKTaxis Manchester",
            description:
              "Arrive in style with OKTaxis' luxury wedding and event transfer service in Manchester. Elegant vehicles, professional chauffeurs, and seamless group travel.",
            url: "https://oktaxis.co.uk/event-weddings",
            breadcrumbs,
          }),
          generateServiceSchema({
            name: "Wedding Car Hire",
            description: "Luxury wedding car hire service with professional chauffeurs. Elegant vehicles, professional drivers, and seamless group travel for weddings and events.",
            areaServed: "Manchester, Liverpool, Greater Manchester, Merseyside",
            serviceType: "Wedding Transportation Service",
          }),
        ]}
        id="event-weddings-schema"
      />
      <PageBanner
        heading="Wedding Chauffeur Service | Luxury Event Cars in Manchester & Liverpool"
        text="Professional wedding chauffeur service and event transport. Luxury Mercedes wedding car hire in Manchester and Liverpool. Drivers in full suit with ribbons included."
        maxWidthClass="!max-w-5xl"
      />
      <PageAboutSection
        heading="Chauffeur Services for Weddings"
        text={[
          "Your big day requires more than just a driver; it requires a professional who understands timing, etiquette, and presentation. At OkTaxis, we provide chauffeur services for weddings and events that ensure you arrive in style and on time.",
          "Whether you are planning a grand celebration at the Liver Building or a private ceremony in the Cheshire countryside, our team handles the logistics. You focus on the occasion; we focus on the road.",
        ]}
        image="/assets/events-images/event-about-img.png"
        imageAlt="Chauffeur Services for Weddings"
        imagePosition="right"
        imagePriority
      />

      <AboutServiceSection
        className="bg-light-background"
        heading="Luxury Wedding Chauffeur Service"
        description="We know that weddings run on a tight schedule. A delay of five minutes can feel like an hour. Our wedding day chauffeur services are designed to give you peace of mind."
        cards={[
          {
            title: "The 'V' Class for Guests",
            description:
              "Need to move bridesmaids or groomsmen? Our Mercedes V-Class is the perfect wedding chauffeur service vehicle for groups, offering space for dresses and flowers without cramping.",
            imageSrc: "/assets/events-images/event-service-img-1.png",
            badge: "Commercial",
          },
          {
            title: "The E-Class for the Bride",
            description:
              "Arrive in our flagship Mercedes E-Class. It offers plenty of legroom for bridal gowns and climate control to keep you cool before you walk down the aisle.",
            imageSrc: "/assets/events-images/event-service-img-2.png",
            badge: "VIP & Private",
          },
        ]}
      />

      <ServiceDetailSection
        heading="Event Chauffeur Service Manchester & Liverpool"
        intro="Beyond weddings, we are the trusted partner for high-profile events across the North West. Whether it is the Grand National at Aintree, a Manchester United gala, or a corporate awards night, our event chauffeur service ensures you make the right entrance."
        imageSrc="/assets/events-images/event-detail-img.png"
        imageAlt="Luxury Mercedes chauffeur vehicle for events in Manchester and Liverpool"
        bullets={[
          {
            title: "Red Carpet Ready",
            description:
              "Arriving in a spotless Mercedes S-Class makes a statement. Our team understands the protocol for VIP drop-offs at venues like the ACC Liverpool, Manchester Central, or the AO Arena.",
          },
          {
            title: "Wait & Return",
            description:
              "For awards nights or charity dinners, you don\u2019t want to stand outside waiting for a taxi in the rain. Our event chauffeur services operate best as an \u201cAs Directed\u201d hire. Your driver stays nearby, ready to collect you the moment you are ready to leave.",
            linkHref: "/hourly-chauffeur",
            linkLabel: "View Hourly Chauffeur Service",
          },
          {
            title: "Corporate Events",
            description:
              "We manage transport for large teams. If you need multiple chauffeur cars for events, we can coordinate a fleet of V-Class vans to move your staff or delegates efficiently between Manchester and Liverpool.",
          },
        ]}
      />

      <ConnectionAreasSection
        heading="Wedding Car Hire"
        cards={[
          {
            title: "Wedding Car Hire Manchester",
            description: [
              "In Manchester, we are a top choice for couples seeking reliability. We specialise in luxury wedding car hire in Manchester, providing pristine black vehicles that look stunning in photographs.",
            ],
            imageSrc: "/assets/events-images/event-connection-img-1.png",
            imageAlt: "Luxury Mercedes wedding car hire in Manchester",
            children: (
              <ul className="list-disc pl-5 space-y-2 text-text-gray text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed">
                <li>
                  <span className="font-semibold">Modern vs Classic:</span> We
                  know many couples search for classic wedding car hire
                  Manchester or vintage options. While these cars have charm,
                  they often lack modern reliability and air conditioning. Our
                  service focuses on modern Mercedes vehicles that balance
                  elegance and comfort.
                </li>
                <li>
                  <span className="font-semibold">Guest Arrivals:</span>{" "}
                  Expecting guests from abroad? We can coordinate their arrival
                  from Manchester Airport, ensuring they are collected from the
                  terminal and brought straight to your venue on time.
                </li>
                <li>
                  <span className="font-semibold">Local Knowledge:</span> From
                  city centre hotels to country venues in Cheshire and
                  Stockport, our drivers know the routes and traffic patterns so
                  you never arrive late to the aisle.
                </li>
              </ul>
            ),
          },
          {
            title: "Wedding Car Hire Liverpool",
            description: [
              "For weddings in Merseyside, navigating the city centre or the tunnels requires local expertise. Our wedding chauffeur service in Liverpool ensures everything runs to schedule.",
            ],
            imageSrc: "/assets/events-images/event-connection-img-2.png",
            imageAlt: "Luxury Mercedes wedding car hire in Liverpool",
            children: (
              <ul className="list-disc pl-5 space-y-2 text-text-gray text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed">
                <li>
                  <span className="font-semibold">Iconic Venues:</span> Whether
                  you are getting married at Sefton Park Palm House, St George’s
                  Hall or The Titanic Hotel, we know the specific drop-off
                  points for a grand entrance.
                </li>
                <li>
                  <span className="font-semibold">Dress Code:</span> Your
                  chauffeur will arrive in a full smart suit and tie, matching
                  the formality of your wedding day.
                </li>
                <li>
                  <span className="font-semibold">Decoration & Flexibility:</span>{" "}
                  We can provide complimentary wedding ribbons in a colour of
                  your choice, and if the photos overrun at the Pier Head or the
                  docks, your chauffeur simply waits and adapts to your timing.
                </li>
              </ul>
            ),
          },
        ]}
      />

      <OurServicesSection
        headline="Why Choose Our Event & Wedding Service?"
        services={[
          {
            icon: (
              <svg
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8"
                aria-hidden="true"
              >
                <path
                  d="M0 21.0098V4C0 1.79083 1.79083 0 4 0H21.0098C22.0707 5.5473e-06 23.0881 0.421437 23.8382 1.17158L41.4951 18.8284C43.0572 20.3905 43.0572 22.9232 41.4951 24.4852L24.4852 41.4951C22.9232 43.0572 20.3905 43.0572 18.8284 41.4951L1.17158 23.8382C0.421437 23.0881 5.5473e-06 22.0707 0 21.0098ZM9.33333 5.33333C7.12417 5.33333 5.33333 7.12417 5.33333 9.33333C5.33333 11.5425 7.12417 13.3333 9.33333 13.3333C11.5425 13.3333 13.3333 11.5425 13.3333 9.33333C13.3333 7.12417 11.5425 5.33333 9.33333 5.33333Z"
                  fill="#FFB400"
                />
              </svg>
            ),
            title: "Fixed Pricing",
            description:
              "Weddings are expensive. We offer fixed quotes for wedding cars for hire in Manchester and Liverpool so you can manage your budget without surprises.",
          },
          {
            icon: (
              <svg
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                             className="h-6  md:h-8 md:w-8"

                aria-hidden="true"
              >
                <path
                  d="M42.4589 32.2039L32.104 8.50015C31.7359 7.65719 30.9337 7.11719 30.0507 7.11719H22.8218L23.0033 8.83274C23.0403 9.18237 22.7655 9.48756 22.4137 9.48756H20.2537C19.9018 9.48756 19.627 9.18237 19.664 8.83274L19.8455 7.11719H12.6166C11.7329 7.11719 10.9307 7.65719 10.5626 8.50015L0.207745 32.2039C-0.47744 33.7735 0.615893 35.5616 2.26256 35.5616H16.8433L17.607 28.3261C17.6707 27.7231 18.1789 27.2653 18.7855 27.2653H23.8818C24.4885 27.2653 24.9966 27.7231 25.0603 28.3261L25.824 35.5616H40.4048C42.0515 35.5616 43.1448 33.7735 42.4589 32.2039ZM19.2892 12.3883C19.3046 12.2427 19.3734 12.1079 19.4822 12.0099C19.5911 11.912 19.7324 11.8579 19.8789 11.8579H22.7892C23.0922 11.8579 23.347 12.0868 23.3789 12.3883L23.7196 15.6164C23.7752 16.1416 23.3633 16.5987 22.8359 16.5987H19.8329C19.3048 16.5987 18.8937 16.1416 18.9492 15.6164L19.2892 12.3883ZM23.3811 24.895H19.2855C18.5818 24.895 18.0329 24.2853 18.107 23.5853L18.4826 20.0298C18.5463 19.4268 19.0544 18.969 19.6611 18.969H23.0055C23.6122 18.969 24.1203 19.4268 24.184 20.0298L24.5596 23.5853C24.6337 24.2853 24.0848 24.895 23.3811 24.895Z"
                  fill="#FFB400"
                />
              </svg>
            ),
            title: "Preparation",
            description:
              "We wash and detail every vehicle immediately before your booking. Your luxury chauffeur for events will arrive in a car that is immaculate inside and out.",
          },
          {
            icon: (
              <svg
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                             className="h-6  md:h-8 md:w-8"

                aria-hidden="true"
              >
                <path
                  d="M42.6437 23.175C40.5252 13.0787 32.3919 7.01204 23.703 6.0713V4.74537C23.703 3.43426 22.6437 2.375 21.3326 2.375C20.0215 2.375 18.9622 3.43426 18.9622 4.74537V6.0713C10.2437 7.01204 2.18447 13.0787 0.0215045 23.175C-0.141459 23.9231 0.651134 24.7528 1.40669 24.0194C5.25854 19.9454 9.38447 20.138 13.1548 26.7602C13.5474 27.4639 14.2585 27.3972 14.6141 26.7602C16.1104 24.138 17.94 21.338 21.3326 21.338C25.6659 21.338 27.8659 26.4343 28.0511 26.7602C28.4067 27.3972 29.1178 27.4639 29.5104 26.7602C33.2882 20.1306 37.4437 19.9898 41.2585 24.0194C42.0215 24.7602 42.8067 23.9231 42.6437 23.175ZM18.9622 24.7231V34.375C18.9622 35.0269 18.4289 35.5602 17.7771 35.5602C17.1993 35.5602 16.7993 35.1676 16.6585 34.7676C16.2215 33.5306 14.8734 32.8861 13.6363 33.3231C12.3993 33.7602 11.7548 35.1157 12.1919 36.3454C13.0215 38.7083 15.2734 40.2935 17.7771 40.2935C21.0437 40.2935 23.703 37.6343 23.703 34.3676V24.7157C23.0289 24.1306 22.2363 23.7083 21.3326 23.7083C20.4215 23.7157 19.6734 24.0639 18.9622 24.7231Z"
                  fill="#FFB400"
                />
              </svg>
            ),
            title: "Reliability",
            description:
              "We check the route days in advance. Whether it is a Liverpool wedding car hire or a Manchester gala, we identify roadworks or closures early to plan a smooth alternative.",
          },
        ]}
      />

        <FAQSection title="Frequently Asked Questions" faqs={[
          {
            question: "Do you provide ribbons for the car?",
            answer: "Yes. All our wedding car hire in Manchester and Liverpool packages include traditional ribbons. Let us know your color preference when you book.",
          },
          {
            question: "Do you offer transport for the end of the night?",
            answer: "Absolutely. Many couples book us for the arrival at the church and then book a separate event chauffeur trip to take them to their hotel or to the airport for their honeymoon. We can take you directly to the terminal for your [Link: Manchester Airport Service] or [Link: Liverpool Airport Service].",
          },
          {
            question: "Can you transport the bridesmaids and the bride?",
            answer: "Yes. We often coordinate two vehicles: a Mercedes S-Class for the bride and father, and a V-Class for the bridesmaids and mother. This is a popular setup for our wedding car hire Liverpool clients."
          },
          {
            question: "What is the difference between your service and a vintage car?",
            answer: "While we don't offer vintage cars, our modern fleet offers climate control, heated seats, and advanced safety features that older vehicles cannot match. This ensures you arrive fresh and relaxed, regardless of the weather.",
          }
        ]}
        />  
  <ReviewsSection/>
       
      </>
  );
}
