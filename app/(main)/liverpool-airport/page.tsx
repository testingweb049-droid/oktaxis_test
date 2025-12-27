import { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import PageAboutSection from "@/components/PageAboutSection";
import TransfersSection from "@/components/TransfersSection";
import AboutServiceSection from "@/components/AboutServiceSection";
import ServingCardsSection from "@/components/ServingCardsSection";
import FleetClasses from "@/components/home/fleet";
import FAQSection from "@/components/FAQSection";
import Reviews from "@/components/Sections/reviews";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Liverpool Airport Transfers | Liverpool John Lennon Airport Taxi",
  description:
    "Reliable Liverpool Airport chauffeur service. Executive transfers from Liverpool John Lennon (LPL) to Manchester, Cheshire, and the city center. Meet & greet included.",
  pageUrl: "/liverpool-airport",
  keywords: [
    "liverpool airport transfer",
    "liverpool john lennon airport",
    "liverpool airport taxi",
    "LPL airport transfer",
    "liverpool airport chauffeur",
  ],
});
   
const LiverpoolAirportPage = () => {
  return (
    <>
      <PageBanner
        heading="Liverpool Airport Chauffeur Service"
        text=" Reliable Liverpool Airport chauffeur service. Executive transfers from Liverpool John Lennon (LPL) to Manchester, Cheshire, and the city center. Meet & greet included."
        maxWidthClass="max-w-4xl"
      />

      <PageAboutSection
        heading="Liverpool Airport Chauffeur Service"
        text={
          <>
            <p>
              Liverpool John Lennon Airport (LPL) is known for its speed and convenience,
              often labelled the “Faster, Easier, Friendlier” airport. Your transport to
              and from the terminal should be exactly the same. OkTaxis provides a
              Liverpool Airport chauffeur service that ensures a smooth start or end to
              your trip.
            </p>
            <p>
              While standard taxis can be hard to find during peak arrival times, our
              service is pre-booked and guaranteed. Whether you are landing from a
              business trip or a European holiday, your driver will be ready and waiting.
            </p>
          </>
        }
        image="/assets/liverpool-images/liverpool-about-img.png"
        imageAlt="Liverpool Airport Chauffeur Service"
        imagePosition="right"
      />

      <TransfersSection />

      <AboutServiceSection
        heading="Meeting Points & Logistics"
        description="Liverpool Airport is compact, which makes pickups efficient. We ensure a seamless transition from air to road."
        cards={[
          {
            title: "Commercial Arrivals",
            description:
              "Your driver will meet you in the arrivals area with a nameboard. We park in the designated short-stay car park, just a short walk from the terminal doors.",
            imageSrc: "/assets/liverpool-images/liverpool-service-img-1.png",
            badge: "Commercial",
          },
          {
            title: "Private Aviation (FBO)",
            description:
              "Liverpool is a popular hub for private jets (Ravenair/XLR). We have experience with luxury airport transfers for VIPs, offering discreet pickups directly from the FBO private terminal.",
            imageSrc: "/assets/liverpool-images/liverpool-service-img-2.png",
            badge: "VIP & Private",
          },
        ]}
      />

      <ServingCardsSection />
    <FleetClasses />

      <FAQSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "How much is a taxi from Liverpool Airport to Manchester?",
            answer:
              "Our executive chauffeur prices are fixed and competitive. While a standard taxi runs on a meter (which can get expensive in traffic), our quote is final.",
          },
          {
            question: "Do you track flights at Liverpool?",
            answer:
              "Yes. We monitor all inbound flights. Whether you are flying EasyJet, Ryanair, or Wizz Air, we know when you land.",
          },
          {
            question: "Can you do a transfer from Manchester Airport to Liverpool Airport?",
            answer:
              "Absolutely. We frequently transfer crews and passengers between the two airports for connecting flights.",
          },
        ]}
      />
      <Reviews/>
    </>
  );
};

export default LiverpoolAirportPage;


