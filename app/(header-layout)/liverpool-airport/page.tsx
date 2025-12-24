import PageBanner from "@/components/PageBanner";
import PageAboutSection from "@/components/PageAboutSection";
import TransfersSection from "@/components/TransfersSection";
import AboutServiceSection from "@/components/AboutServiceSection";

const LiverpoolAirportPage = () => {
  return (
    <>
      <PageBanner
        heading="Liverpool Airport Chauffeur Service"
        text="Liverpool John Lennon Airport (LPL) is known for its speed and convenience, often labelled the “Faster, Easier, Friendlier” airport. Your transport to and from the terminal should be exactly the same. OkTaxis provides a Liverpool Airport chauffeur service that ensures a smooth start or end to your trip."
        maxWidthClass="max-w-5xl"
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
    </>
  );
};

export default LiverpoolAirportPage;


