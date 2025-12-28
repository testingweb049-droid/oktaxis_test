import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata, generateWebPageSchema, generateServiceSchema } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";
import PageBanner from "@/components/PageBanner";
import PageAboutSection from "@/components/PageAboutSection";
import ConnectionAreasSection from "@/components/ConnectionAreasSection";
import ServiceDetailSection from "@/components/ServiceDetailSection";
import FleetClasses from "@/components/home/fleet";
import FAQSection from "@/components/FAQSection";
import ReviewsSection from "@/components/Sections/reviews";

export const metadata: Metadata = generateSEOMetadata({
  title: "Chauffeur Services in Manchester | OKTaxis",
  description:
    "Book professional chauffeur services in Manchester for airport transfers, corporate events, and luxury rides. 24/7 service with licensed drivers and premium amenities.",
  pageUrl: "/chauffeur-services",
  keywords: [
    "chauffeur service manchester",
    "professional chauffeur",
    "executive chauffeur",
    "luxury chauffeur service",
    "chauffeur manchester",
  ],
});

export default function ChauffeurServices() {
  const breadcrumbs = [
    { name: "Home", url: "https://oktaxis.co.uk/" },
    { name: "Chauffeur Services", url: "https://oktaxis.co.uk/chauffeur-services" },
  ];

  return (
    <>
      <StructuredData
        data={[
          generateWebPageSchema({
            title: "Chauffeur Services in Manchester | OKTaxis",
            description:
              "Book professional chauffeur services in Manchester for airport transfers, corporate events, and luxury rides. 24/7 service with licensed drivers and premium amenities.",
            url: "https://oktaxis.co.uk/chauffeur-services",
            breadcrumbs,
          }),
          generateServiceSchema({
            name: "Chauffeur Service",
            description: "Professional chauffeur services in Manchester for airport transfers, corporate events, and luxury rides. 24/7 service with licensed drivers and premium amenities.",
            areaServed: "Manchester, Liverpool, Greater Manchester, Merseyside",
            serviceType: "Chauffeur Transportation Service",
          }),
        ]}
        id="chauffeur-services-schema"
      />
      <PageBanner
        heading="Corporate Chauffeur Service | Executive Business Travel for Manchester"
        text="Executive corporate chauffeur service. Reliable executive transport for business meetings, roadshows, and events in Manchester and Liverpool. Privacy and punctuality guaranteed."
        maxWidthClass="max-w-5xl"
      />
      <PageAboutSection
        heading="Chauffeur Service for Business"
        text={[
          "In the business world, time is your most valuable asset. A missed train or a late taxi isn’t just an inconvenience; it’s a lost opportunity. OKTaxis provides a business chauffeur service that ensures you arrive relaxed, prepared, and on time.",
          "We understand that for our clients, the car is an extension of the boardroom. Whether you are transporting a VIP client, attending a roadshow, or simply commuting between offices in Manchester and Liverpool, our chauffeur service for business offers the privacy and reliability that standard taxis cannot match.",
        ]}
        image="/assets/chauffeur-images/chauffeur-about-img.png"
        imageAlt="Executive chauffeur service car driving through the countryside"
        imagePosition="right"
        imagePriority={true}
      />
      <ConnectionAreasSection
        heading="Chauffeur Service for Corporate"
        cards={[
          {
            title: "1. Executive Transport: More Than Just a Ride",
            description: [
              "We don’t just drive; we facilitate your business day. When you book our corporate chauffeur service, you are booking a mobile office environment.",
            ],
            imageSrc: "/assets/chauffeur-images/chauffeur-connection-img-1.png",
            imageAlt: "Executive transport chauffeur assisting a business passenger into a vehicle",
            children: (
              <ul className="list-disc pl-5 space-y-2 text-text-gray text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed">
                <li>
                  <span className="font-semibold">Work on the Move:</span> Our
                  vehicles are quiet, smooth, and equipped with Wi-Fi (on
                  request). You can answer emails, take conference calls, or
                  review notes without interruption.
                </li>
                <li>
                  <span className="font-semibold">Impression Matters:</span>{" "}
                  Pulling up in a pristine Mercedes S-Class sends a message of
                  professionalism. It is the ideal business chauffeur car
                  service for impressing investors or partners.
                </li>
                <li>
                  <span className="font-semibold">Absolute Privacy:</span> Our
                  drivers understand the importance of discretion.
                  Conversations held in the back of our vehicles remain
                  confidential.
                </li>
              </ul>
            ),
          },
          {
            title: "2. Business Chauffeur Service Manchester",
            description: [
              "Manchester is the commercial engine of the North, and navigating it requires expertise. We provide business chauffeur services in Manchester that keep your schedule on track.",
            ],
            imageSrc: "/assets/chauffeur-images/chauffeur-connection-img-2.png",
            imageAlt: "Business chauffeur opening the door of a luxury car in Manchester",
            children: (
              <ul className="list-disc pl-5 space-y-2 text-text-gray text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed">
                <li>
                  <span className="font-semibold">Meeting to Meeting:</span> We
                  specialize in the business meetings chauffeur service package.
                  If you have a breakfast meeting in Spinningfields and a lunch
                  at MediaCityUK, your driver waits outside. This is best booked
                  as an Hourly service. [Link: View Hourly Chauffeur Service]
                </li>
                <li>
                  <span className="font-semibold">The City Commute:</span> Avoid
                  the crush of the trams during rush hour. We offer a direct,
                  door-to-door corporate chauffeur service, utilizing smart
                  routes to bypass the congestion on the Mancunian Way and
                  Deansgate.
                </li>
                <li>
                  <span className="font-semibold">International Guests:</span>{" "}
                  Hosting clients from abroad? We provide a direct link from
                  Manchester Airport to your office or hotel. [Link: View
                  Manchester Airport Service]
                </li>
              </ul>
            ),
          },
          {
            title: "3. Business Class Chauffeur Service Liverpool",
            description: [
              "Liverpool’s economy is thriving, but transport links between the Commercial District and the wider region can be slow. Our team covers the entire Merseyside area.",
              "We offer a dedicated business class chauffeur service Liverpool package. Whether you are heading to the Knowledge Quarter or need to travel across to Manchester, our drivers provide a stable, comfortable alternative to the train.",
              "You can rely on our business chauffeur services to get you to your destination regardless of rail strikes or weather on the M62. [Link: View Liverpool Airport Service]",
            ],
            imageSrc: "/assets/chauffeur-images/chauffeur-connection-img-3.png",
            imageAlt: "Business travellers with luggage being greeted by a chauffeur in Liverpool",
          },
        ]}
      />
      <ServiceDetailSection
        heading="Event Chauffeur Service Manchester & Liverpool"
        intro="Organizing a conference, gala dinner, or board retreat? Logistics are key to a successful event. We provide chauffeur services for corporate events that scale with your needs."
        imageSrc="/assets/chauffeur-images/chauffeur-feature-img.png"
        imageAlt="Event chauffeur service car for corporate travel in Manchester and Liverpool"
        bullets={[
          {
            title: "VIP Transfers",
            description:
              "We ensure your keynote speakers or CEO arrive in luxury. Our team is experienced in red-carpet drop-offs at major North West venues like Manchester Central, The ACC Liverpool, and The Midland Hotel.",
          },
          {
            title: "Group Logistics",
            description:
              "Need to move a team? Our fleet includes the XL Passenger Van, perfect for transporting delegates comfortably while keeping the team together.",
          },
        ]}
      />
      <FleetClasses/>
      <FAQSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "Do you serve areas outside of the North West?",
            answer:"Yes. We provide a corporate chauffeur service nationwide. We frequently handle long-distance business travel, such as Manchester to Leeds or Liverpool to London."
           },
           {
            question: "Can I book a business meetings chauffeur service for a full day?",
            answer: "Yes. We highly recommend our 'Hourly' service for meetings. It guarantees the car stays with you all day, allowing you to leave laptops or luggage securely inside between appointments in Manchester or Liverpool."
           },
           {
            question: "Can you handle last-minute bookings for business clients?",
            answer:"Yes. We understand business is unpredictable. While we recommend pre-booking, our corporate chauffeur services team operates 24/7 and will do everything possible to accommodate urgent requests."
           },
           {
            question: "Is your service discreet?",
            answer: "Absolutely. Our drivers are trained to be polite but unobtrusive. Whether you are on a call or discussing strategy with a colleague, our business chauffeur service guarantees a private environment."
           }
        ]}
      />
      <ReviewsSection/>
    </>
  );
}
