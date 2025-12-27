import { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import PageAboutSection from "@/components/PageAboutSection";
import AboutServiceSection from "@/components/AboutServiceSection";
import PageFeatureSection from "@/components/PageFeatureSection";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, generateWebPageSchema, generateServiceSchema } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";

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

      <PageFeatureSection
        image="/assets/fleet.jpg"
        imageAlt="Luxury Mercedes chauffeur car for events in Manchester city centre"
        heading="Event Chauffeur Service Manchester & Liverpool"
        text={[
          "Beyond weddings, we are the trusted partner for high-profile events across the North West. Whether it is the Grand National at Aintree, a Manchester United gala, or a corporate awards night, our event chauffeur service ensures you make the right entrance.",
        ]}
        imagePosition="left"
        bulletPoints={[
          "Red Carpet Ready: Arriving in a spotless Mercedes S-Class makes a statement. Our team understands the protocol for VIP drop-offs at venues like the ACC Liverpool, Manchester Central, or the AO Arena.",
          <>
            Wait &amp; Return: For awards nights or charity dinners, you don't want to stand outside waiting for a taxi in the rain. Our event chauffeur services operate best as an \"As Directed\" hire. Your driver stays nearby, ready to collect you the moment you are ready to leave.{" "}
            <Link href="/hourly-chauffeur" className="underline text-primary-yellow">
              View Hourly Chauffeur Service
            </Link>
            .
          </>,
          "Corporate Events: We manage transport for large teams. If you need multiple chauffeur cars for events, we can coordinate a fleet of V-Class vehicles to move your staff or delegates efficiently between Manchester and Liverpool.",
        ]}
      />

      </>
  );
}
