import { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import StructuredData from "@/components/StructuredData";
import PageAboutSection from "@/components/PageAboutSection";
import OurServicesSection from "@/components/OurServicesSection";
import ConnectionAreasSection from "@/components/ConnectionAreasSection";
import FAQSection from "@/components/FAQSection";
import ReviewsSection from "@/components/Sections/reviews";
import {
  generateMetadata as generateSEOMetadata,
  generateWebPageSchema,
  generateServiceSchema,
} from "@/lib/seo";

const AirportSpecialistsIcon = () => (
  <svg
    viewBox="0 0 37 37"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 md:h-8 md:w-8"
    aria-hidden="true"
  >
    <path
      d="M30.8 14.3733H23.4664L16.7225 2.57053C16.6326 2.41339 16.5027 2.2828 16.3461 2.19198C16.1895 2.10116 16.0116 2.05333 15.8306 2.05334L11.6277 2.05334C10.9456 2.05334 10.4534 2.70592 10.6408 3.3617L13.7869 14.3733H7.18668L4.41468 10.6773C4.2209 10.4188 3.9161 10.2667 3.59335 10.2667H1.02732C0.359346 10.2667 -0.130887 10.8942 0.0314546 11.5423L2.05335 18.48L0.0314546 25.4177C-0.130887 26.0658 0.359346 26.6933 1.02732 26.6933H3.59335C3.91675 26.6933 4.2209 26.5413 4.41468 26.2827L7.18668 22.5867H13.7869L10.6408 33.5977C10.4534 34.2535 10.9456 34.9067 11.6277 34.9067H15.8306C16.1989 34.9067 16.539 34.709 16.7218 34.3895L23.4664 22.5867H30.8C33.0683 22.5867 36.96 20.7483 36.96 18.48C36.96 16.2117 33.0683 14.3733 30.8 14.3733Z"
      fill="#FFB400"
    />
  </svg>
);

const ProfessionalChauffeursIcon = () => (
  <svg
    viewBox="0 0 37 37"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 md:h-8 md:w-8"
    aria-hidden="true"
  >
    <g clipPath="url(#clip0_12_20)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.05566 3.59672C9.05566 3.14765 13.7957 0 18.5021 0C23.2085 0 27.9485 3.14765 27.9485 3.59672C27.9485 5.19983 27.7743 6.14937 27.6274 6.66627C27.5297 7.00539 27.2054 7.19344 26.8454 7.19344H10.1588C9.79878 7.19344 9.47445 7.00539 9.37684 6.66627C9.22989 6.14937 9.05566 5.19983 9.05566 3.59672ZM16.9277 3.0829C16.6493 3.0829 16.3823 3.19117 16.1855 3.38389C15.9887 3.57661 15.8781 3.83799 15.8781 4.11054C15.8781 4.38308 15.9887 4.64447 16.1855 4.83719C16.3823 5.02991 16.6493 5.13817 16.9277 5.13817H20.0765C20.3549 5.13817 20.6219 5.02991 20.8187 4.83719C21.0155 4.64447 21.1261 4.38308 21.1261 4.11054C21.1261 3.83799 21.0155 3.57661 20.8187 3.38389C20.6219 3.19117 20.3549 3.0829 20.0765 3.0829H16.9277ZM10.1451 13.5833C6.64996 12.5248 7.53163 10.634 8.86463 9.24871H28.4314C29.4978 10.5826 30.0698 12.382 26.8465 13.4589C26.8814 13.7638 26.8989 14.0731 26.8989 14.3869C26.8985 15.5001 26.6671 16.6016 26.2189 17.6247C25.7706 18.6477 25.1148 19.571 24.2913 20.3384C23.4677 21.1059 22.4935 21.7017 21.4277 22.0895C20.362 22.4774 19.2269 22.6493 18.0912 22.5948C16.9556 22.5404 15.8431 22.2607 14.8211 21.7727C13.7992 21.2846 12.8892 20.5985 12.1461 19.7559C11.4031 18.9133 10.8427 17.9317 10.4987 16.8706C10.1547 15.8096 10.0345 14.6912 10.1451 13.5833ZM18.2166 14.3869C20.9897 14.3869 23.1393 14.243 24.7871 13.9923C24.7955 14.1224 24.7997 14.254 24.7997 14.3869C24.799 15.2098 24.63 16.0242 24.3028 16.7821C23.9755 17.54 23.4967 18.2262 22.8943 18.8001C22.292 19.374 21.5785 19.8241 20.7957 20.1238C20.013 20.4235 19.1769 20.5667 18.3367 20.5451C17.4966 20.5235 16.6693 20.3375 15.9037 19.9979C15.1381 19.6584 14.4497 19.1723 13.879 18.5682C13.3083 17.9642 12.8668 17.2543 12.5807 16.4806C12.2946 15.7069 12.1695 14.885 12.2129 14.0632C13.7484 14.2708 15.7164 14.3869 18.2166 14.3869ZM27.3366 29.3904C26.3874 27.94 25.0806 26.7469 23.5367 25.9208C21.9929 25.0947 20.2615 24.6622 18.5021 24.6632C16.742 24.6619 15.0098 25.0945 13.4654 25.9209C11.9209 26.7474 10.6137 27.9413 9.66443 29.3924C9.31132 28.8617 8.77045 28.4775 8.14565 28.3134L6.11781 27.7821C5.44569 27.6057 4.72951 27.6979 4.1268 28.0384C3.52409 28.3789 3.08422 28.9399 2.90392 29.5979L2.08943 32.576C2.00023 32.9019 1.97747 33.2418 2.02245 33.5764C2.06743 33.9109 2.17928 34.2335 2.3516 34.5256C2.52392 34.8178 2.75334 35.0739 3.02676 35.2793C3.30018 35.4847 3.61225 35.6353 3.94513 35.7226L5.97192 36.255C6.31289 36.3444 6.66878 36.3655 7.0183 36.3172C7.36782 36.2688 7.70377 36.1519 8.00605 35.9734C8.00689 36.2459 8.11827 36.507 8.3157 36.6991C8.51313 36.8913 8.78043 36.9987 9.05881 36.9979C9.33718 36.9971 9.60382 36.8881 9.80007 36.6948C9.99632 36.5015 10.1061 36.2398 10.1053 35.9672V34.9396C10.1053 34.5477 10.1326 34.163 10.1871 33.7855L15.6493 35.2191C15.9028 35.7504 16.3059 36.1999 16.8112 36.5149C17.3165 36.8298 17.9031 36.9971 18.5021 36.9971C19.1011 36.9971 19.6877 36.8298 20.193 36.5149C20.6983 36.1999 21.1014 35.7504 21.3549 35.2191L26.8171 33.7855C26.8709 34.163 26.8982 34.5477 26.8989 34.9396V35.9672C26.8975 36.2398 27.0068 36.5017 27.2026 36.6954C27.3985 36.8891 27.6649 36.9986 27.9433 37C28.2217 37.0014 28.4892 36.8944 28.687 36.7026C28.8848 36.5109 28.9968 36.25 28.9981 35.9775C29.5859 36.3228 30.3122 36.443 31.027 36.255L33.0549 35.7237C33.3878 35.6364 33.6998 35.4857 33.9732 35.2804C34.2467 35.075 34.4761 34.8189 34.6484 34.5267C34.8207 34.2345 34.9326 33.9119 34.9775 33.5774C35.0225 33.2429 34.9998 32.903 34.9106 32.577L34.095 29.599C33.9147 28.9409 33.4749 28.38 32.8721 28.0394C32.2694 27.6989 31.5533 27.6067 30.8811 27.7831L28.8533 28.3144C28.2299 28.4779 27.69 28.8616 27.3366 29.3904ZM10.7382 31.8012C11.3055 30.459 12.2255 29.2876 13.4047 28.4061C14.584 27.5246 15.9805 26.9643 17.4525 26.7822V31.0048C16.9818 31.1676 16.5574 31.4377 16.2143 31.7927C15.8712 32.1477 15.6193 32.5776 15.4792 33.0467L10.7382 31.8012ZM26.266 31.8012C25.6987 30.459 24.7787 29.2876 23.5995 28.4061C22.4202 27.5246 21.0237 26.9643 19.5517 26.7822V31.0048C20.5005 31.3336 21.2416 32.0941 21.525 33.0467L26.266 31.8012ZM18.5021 34.9396C18.7805 34.9396 19.0474 34.8313 19.2443 34.6386C19.4411 34.4459 19.5517 34.1845 19.5517 33.9119C19.5517 33.6394 19.4411 33.378 19.2443 33.1853C19.0474 32.9926 18.7805 32.8843 18.5021 32.8843C18.2237 32.8843 17.9568 32.9926 17.7599 33.1853C17.5631 33.378 17.4525 33.6394 17.4525 33.9119C17.4525 34.1845 17.5631 34.4459 17.7599 34.6386C17.9568 34.8313 18.2237 34.9396 18.5021 34.9396Z"
        fill="#FFB400"
      />
    </g>
    <defs>
      <clipPath id="clip0_12_20">
        <rect width="37" height="37" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const FixedPricingIcon = () => (
  <svg
    viewBox="0 0 43 43"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 md:h-8 md:w-8"
    aria-hidden="true"
  >
    <path
      d="M0 21.0098V4C0 1.79083 1.79083 0 4 0H21.0098C22.0707 5.5473e-06 23.0881 0.421437 23.8382 1.17158L41.4951 18.8284C43.0572 20.3905 43.0572 22.9232 41.4951 24.4852L24.4852 41.4951C22.9232 43.0572 20.3905 43.0572 18.8284 41.4951L1.17158 23.8382C0.421437 23.0881 5.5473e-06 22.0707 0 21.0098ZM9.33333 5.33333C7.12417 5.33333 5.33333 7.12417 5.33333 9.33333C5.33333 11.5425 7.12417 13.3333 9.33333 13.3333C11.5425 13.3333 13.3333 11.5425 13.3333 9.33333C13.3333 7.12417 11.5425 5.33333 9.33333 5.33333Z"
      fill="#FFB400"
    />
  </svg>
);

export const metadata: Metadata = generateSEOMetadata({
  title:
    "Leeds Chauffeur Service | Luxury Transfers to Leeds Bradford Airport (LBA)",
  description:
    "Premier Leeds chauffeur service. Fixed-price executive transfers to Leeds Bradford Airport (LBA) and long-distance travel. Book professional chauffeurs 24/7.",
  pageUrl: "/leeds",
  keywords: [
    "leeds chauffeur service",
    "leeds bradford airport transfer",
    "leeds executive taxi",
    "leeds airport chauffeur",
    "luxury transfers leeds",
  ],
});

export default function LeedsChauffeurServicePage() {
  const breadcrumbs = [
    { name: "Home", url: "https://oktaxis.co.uk/" },
    {
      name: "Leeds Chauffeur Service",
      url: "https://oktaxis.co.uk/leeds",
    },
  ];

  const pageTitle =
    "Leeds Chauffeur Service | Luxury Transfers to Leeds Bradford Airport (LBA)";
  const pageDescription =
    "Premier Leeds chauffeur service. Fixed-price executive transfers to Leeds Bradford Airport (LBA) and long-distance travel. Book professional chauffeurs 24/7.";

  return (
    <>
      <StructuredData
        data={[
          generateWebPageSchema({
            title: `${pageTitle} | OKTaxis`,
            description: pageDescription,
            url: "https://oktaxis.co.uk/leeds",
            breadcrumbs,
          }),
          generateServiceSchema({
            name: "Leeds Chauffeur Service",
            description: pageDescription,
            areaServed:
              "Leeds, Leeds Bradford Airport (LBA), West Yorkshire, UK",
            serviceType: "Chauffeur Service",
          }),
        ]}
        id="leeds-chauffeur-service-schema"
      />

      <PageBanner heading={pageTitle} text={pageDescription} />

      <PageAboutSection
        heading="Premium Chauffeur Service Leeds | Executive Airport Transfers & City Travel"
        text={[
          "Getting around West Yorkshire should be an experience, not a hassle. Whether you need a seamless transfer to Leeds Bradford Airport (LBA) or a VIP ride to the First Direct Arena, OK Taxis provides the luxury consistency you deserve.",
          "We are committed to providing the best chauffeur service Leeds residents and visitors can rely on. Forget the unpredictability of ride-share surge pricing or waiting in the rain on The Headrow. We offer pre-booked, fixed-price journeys focused on your safety, comfort, and style.",
        ]}
        image="/assets/leeds-images/leeds-about-img.png"
        imageAlt="Premium chauffeur service in Leeds"
      />

      <OurServicesSection
        headline="Why Choose OK Taxis Leeds?"
        services={[
          {
            icon: <AirportSpecialistsIcon />,
            title: "Airport Specialists",
            description:
              "We specialize in timely Leeds Bradford Airport transfers, handling the steep approach to Yeadon with ease while you relax in the back.",
          },
          {
            icon: <ProfessionalChauffeursIcon />,
            title: "Professional Chauffeurs",
            description:
              "Our team is licensed and possesses expert knowledge of the area, knowing the best shortcuts to avoid traffic on the A660 (Otley Road).",
          },
          {
            icon: <FixedPricingIcon />,
            title: "Clear, Fixed Pricing",
            description:
              "Enjoy transparent fares with no hidden costs. The price we quote for your Leeds private transfer is the price you pay, guaranteed.",
          },
        ]}
      />

      <ConnectionAreasSection
        heading="Leeds Airport & City Chauffeur Services"
        cards={[
          {
            title:
              "Airport Chauffeur: Leeds Bradford (LBA) Your Stress-Free Leeds Bradford Airport Transfer",
            description: [
              "As the commercial capital of the North, Manchester requires a driver who knows the local motorway network. Our Manchester chauffeur service is rated highly for punctuality and local knowledge.",
            ],
            imageSrc: "/assets/leeds-images/leeds-connection-img-1.png",
            imageAlt: "Chauffeur helping passenger at luxury vehicle in Leeds",
            children: (
              <ul className="list-disc pl-5 space-y-2 text-text-gray text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed">
                <li>
                  <span className="font-semibold">Airport Transfers:</span> We
                  provide a private chauffeur service Manchester Airport that
                  meets you in the arrivals hall, avoiding the confusion of the
                  pick-up zones.
                </li>
                <li>
                  <span className="font-semibold">City &amp; Stadiums:</span>{" "}
                  Whether it is a meeting at MediaCityUK or match day transport
                  to Old Trafford, our chauffeur car service Manchester gets you
                  there in comfort.
                </li>
                <li>
                  <span className="font-semibold">Pricing:</span> We offer
                  transparent pricing for our Manchester chauffeur service with
                  no hidden pickup fees.
                </li>
                <li>
                  [Link: View Manchester Chauffeur Services]
                </li>
              </ul>
            ),
          },
          {
            title:
              "Corporate & Event Travel Navigate Leeds with Executive Ease",
            description: [
              "Whether you're heading to a high-stakes business meeting at Wellington Place, catching a First Class train from Leeds Railway Station, or enjoying hospitality at Elland Road, we've got you covered.",
              "Our Leeds chauffeur services offer a private, comfortable alternative to crowded public transport. Forget the stress of finding parking at Trinity Leeds—sit back in a pristine Mercedes-Benz and let our experienced local chauffeurs navigate the traffic for you.",
            ],
            imageSrc: "/assets/leeds-images/leeds-connection-img-2.png",
            imageAlt: "Business chauffeur driving in Leeds",
          },
          {
            title: "Our Chauffeurs Professional Drivers Who Know Leeds Best",
            description: [
              "Your safety is in the hands of our professional team. Each chauffeur is fully licensed, insured, and dedicated to exceptional service.",
              "They are not just experts behind the wheel; they are courteous, discreet, and knowledgeable. You can trust that you're in safe hands with OK Taxis.",
            ],
            imageSrc: "/assets/leeds-images/leeds-connection-img-3.png",
            imageAlt: "Professional chauffeur opening car door in Leeds",
          },
        ]}
      />

      <FAQSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "How do I book a chauffeur to Leeds Bradford Airport?",
            answer:
              "You can book online instantly using our quote tool. We offer fixed fares for luxury LBA transfers, offering a superior experience that is often more cost-effective than valet parking.",
          },
          {
            question: "Do you offer long-distance executive travel from Leeds?",
            answer:
              "Yes. We frequently drive clients from Leeds to Manchester Airport, London, or Sheffield. Our intercity rates are very competitive compared to peak-time train tickets for groups.",
          },
        ]}
      />
      <ReviewsSection/>
    </>
  );
}
