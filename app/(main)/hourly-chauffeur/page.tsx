import SEO from "@/components/SEO";
import PageBanner from "@/components/PageBanner";
import PageAboutSection from "@/components/PageAboutSection";
import OurServicesSection from "@/components/OurServicesSection";
import ConnectionAreasSection from "@/components/ConnectionAreasSection";
import AreaServeSection from "@/components/AreaServeSection";
import PageFeatureSection from "@/components/PageFeatureSection";
import FleetClasses from "@/components/home/fleet";
import Reviews from "@/components/Sections/reviews";
import FAQSection from "@/components/FAQSection";

const AirportLocationIcon = ({ className }: { className?: string }) => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12.1834 25.8674C4.69142 15.0063 3.30078 13.8916 3.30078 9.9C3.30078 4.43236 7.73315 0 13.2008 0C18.6684 0 23.1008 4.43236 23.1008 9.9C23.1008 13.8916 21.7101 15.0063 14.2182 25.8674C13.7266 26.5776 12.6749 26.5775 12.1834 25.8674ZM13.2008 14.025C15.479 14.025 17.3258 12.1782 17.3258 9.9C17.3258 7.62181 15.479 5.775 13.2008 5.775C10.9226 5.775 9.07578 7.62181 9.07578 9.9C9.07578 12.1782 10.9226 14.025 13.2008 14.025Z"
      fill="currentColor"
    />
  </svg>
);
export default function HourlyChauffeur() {
  return (
    <>
      <SEO
        title="Hourly Chauffeur Manchester | Luxury Hire by the Hour or Day
"
        description="Book flexible hourly chauffeur in Manchester with OKTaxis. Enjoy luxury vehicles, professional drivers, and transparent pricing for business, leisure, or events. Free cancellation up to 48 hours."
        url="https://oktaxis.co.uk/hourly-chauffeur"
        image="https://oktaxis.co.uk/images/hourly-service.png"
         breadcrumbs={[
          { position: 1, name: "Hourly Chauffeur", item: "https://oktaxis.co.uk/hourly-chauffeur" },
          { position: 2, name: "Hourly Chauffeur" }
        ]}
      />
      <PageBanner
        heading='Hourly Chauffeur Service Manchester | Flexible "As Directed" Hire'
        text="Professional hourly chauffeur service in Manchester and Liverpool. Hire a driver by the hour for business meetings, shopping at Cheshire Oaks, or events. 24-hour availability."
        maxWidthClass="!max-w-5xl"
       />
      <PageAboutSection
        heading="Flexible Hourly Chauffeur Service"
        text={[
          "Sometimes, a simple A-to-B transfer isn't enough. Whether you have back-to-back meetings in Spinningfields, a shopping spree at the Trafford Centre, or a full day of sightseeing in Cheshire, you need a car that waits for you.",
          'OKtaxis provides a professional hourly chauffeur service (also known as "As Directed" hire). You book the vehicle for a set duration, and the driver follows your itinerary completely. You can change your plans instantly, make multiple stops, and leave your luggage or shopping bags securely in the vehicle while you step out.',
        ]}
        image="/assets/hourly-images/hourly-about-img.png"
        imageAlt="Flexible hourly chauffeur service vehicle"
        imagePosition="right"
        imagePriority
      />
      <OurServicesSection
        headline={'Why Choose "As Directed" Hire?'}
        services={[
          {
            icon: (
              <svg
                width="40"
                height="37"
                viewBox="0 0 40 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M27.5274 0C28.6415 3.7856e-05 29.7336 0.310268 30.6813 0.895938C31.629 1.48161 32.395 2.31958 32.8933 3.316L35.6653 8.858C36.1532 8.658 36.6332 8.442 37.1052 8.21C37.58 7.9729 38.1294 7.93409 38.6328 8.10213C39.1361 8.27016 39.5521 8.63126 39.7892 9.106C40.0263 9.58074 40.0651 10.1302 39.897 10.6336C39.729 11.1369 39.3679 11.5529 38.8932 11.79C38.4124 12.004 37.9291 12.212 37.4432 12.414L39.3652 16.26C39.7823 17.0939 39.9994 18.0136 39.9992 18.946V24C39.9991 24.8442 39.821 25.6788 39.4764 26.4494C39.1317 27.22 38.6284 27.9092 37.9992 28.472V31C37.9992 31.7956 37.6831 32.5587 37.1205 33.1213C36.5579 33.6839 35.7949 34 34.9993 34C34.2036 34 33.4406 33.6839 32.878 33.1213C32.3154 32.5587 31.9993 31.7956 31.9993 31V30H7.99983V31C7.99983 31.7956 7.68377 32.5587 7.12117 33.1213C6.55857 33.6839 5.79553 34 4.9999 34C4.20426 34 3.44122 33.6839 2.87862 33.1213C2.31602 32.5587 1.99996 31.7956 1.99996 31V28.472C0.771984 27.372 0 25.776 0 24V18.944C0.00037375 18.0129 0.217428 17.0947 0.633987 16.262L2.53995 12.446C2.05729 12.2433 1.58063 12.0253 1.10998 11.792C0.63765 11.5518 0.278613 11.1356 0.110263 10.6332C-0.0580875 10.1308 -0.0222695 9.58228 0.209996 9.106C0.327311 8.87086 0.489814 8.66114 0.688219 8.48883C0.886623 8.31653 1.11704 8.18501 1.36629 8.1018C1.61555 8.01859 1.87876 7.98531 2.14088 8.00388C2.40301 8.02245 2.6589 8.09249 2.89394 8.21C3.36726 8.44333 3.84725 8.65933 4.33391 8.858L7.10585 3.318C7.60394 2.32121 8.36976 1.48282 9.3175 0.896789C10.2652 0.310753 11.3575 0.000223568 12.4717 0H27.5274ZM10.9998 18C10.2041 18 9.44109 18.3161 8.87849 18.8787C8.3159 19.4413 7.99983 20.2044 7.99983 21C7.99983 21.7956 8.3159 22.5587 8.87849 23.1213C9.44109 23.6839 10.2041 24 10.9998 24C11.7954 24 12.5584 23.6839 13.121 23.1213C13.6836 22.5587 13.9997 21.7956 13.9997 21C13.9997 20.2044 13.6836 19.4413 13.121 18.8787C12.5584 18.3161 11.7954 18 10.9998 18ZM28.9994 18C28.2038 18 27.4407 18.3161 26.8781 18.8787C26.3155 19.4413 25.9995 20.2044 25.9995 21C25.9995 21.7956 26.3155 22.5587 26.8781 23.1213C27.4407 23.6839 28.2038 24 28.9994 24C29.795 24 30.5581 23.6839 31.1207 23.1213C31.6833 22.5587 31.9993 21.7956 31.9993 21C31.9993 20.2044 31.6833 19.4413 31.1207 18.8787C30.5581 18.3161 29.795 18 28.9994 18ZM27.5274 4H12.4717C12.1426 3.99995 11.8185 4.08116 11.5282 4.23641C11.2379 4.39166 10.9905 4.61617 10.8078 4.89L10.6838 5.106L8.14383 10.182C11.2398 11.11 15.4117 12 19.9996 12C24.2835 12 28.2014 11.224 31.2194 10.366L31.8533 10.182L29.3154 5.106C29.1682 4.81163 28.9506 4.55813 28.682 4.36799C28.4134 4.17785 28.102 4.05695 27.7754 4.016L27.5294 4H27.5274Z"
                  fill="#FFB400"
                />
              </svg>
            ),
            title: "The Car Waits for You",
            description:
              "Your driver stays nearby while you are in a meeting at MediaCityUK or dinner on the Albert Dock. When you are ready to leave, your car is right outside.",
          },
          {
            icon: (
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 2C11.6075 2 4 5.77889 4 10.4444C4 15.11 11.6075 18.8889 21 18.8889C30.3925 18.8889 38 15.11 38 10.4444C38 5.77889 30.3925 2 21 2ZM4 14.6667V21C4 25.6656 11.6075 29.4444 21 29.4444C30.3925 29.4444 38 25.6656 38 21V14.6667C38 19.3322 30.3925 23.1111 21 23.1111C11.6075 23.1111 4 19.3322 4 14.6667ZM4 25.2222V31.5556C4 36.2211 11.6075 40 21 40C30.3925 40 38 36.2211 38 31.5556V25.2222C38 29.8878 30.3925 33.6667 21 33.6667C11.6075 33.6667 4 29.8878 4 25.2222Z"
                  fill="#FFB400"
                />
              </svg>
            ),
            title: "Secure Storage",
            description:
              "Business travellers can leave laptops and luggage in the vehicle safely between appointments.",
          },
          {
            icon: (
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_7882_1097)">
                  <path
                    d="M17.2222 3.80952C16.687 3.80952 16.2387 3.62667 15.8773 3.26095C15.5159 2.89524 15.3346 2.44317 15.3333 1.90476C15.3321 1.36635 15.5134 0.914285 15.8773 0.548571C16.2413 0.182857 16.6896 0 17.2222 0H24.7778C25.313 0 25.7619 0.182857 26.1246 0.548571C26.4872 0.914285 26.6679 1.36635 26.6667 1.90476C26.6654 2.44317 26.4841 2.89587 26.1227 3.26286C25.7613 3.62984 25.313 3.81206 24.7778 3.80952H17.2222ZM21 24.7619C21.5352 24.7619 21.9841 24.579 22.3468 24.2133C22.7094 23.8476 22.8901 23.3955 22.8889 22.8571V15.2381C22.8889 14.6984 22.7076 14.2463 22.3449 13.8819C21.9822 13.5175 21.5339 13.3346 21 13.3333C20.4661 13.3321 20.0178 13.5149 19.6551 13.8819C19.2924 14.2489 19.1111 14.7009 19.1111 15.2381V22.8571C19.1111 23.3968 19.2924 23.8495 19.6551 24.2152C20.0178 24.5809 20.4661 24.7632 21 24.7619ZM21 40C18.6704 40 16.4742 39.5479 14.4116 38.6438C12.3489 37.7397 10.5469 36.5092 9.00556 34.9524C7.46422 33.3955 6.24463 31.5778 5.34678 29.499C4.44893 27.4203 4 25.2063 4 22.8571C4 20.5079 4.44893 18.2933 5.34678 16.2133C6.24463 14.1333 7.46422 12.3162 9.00556 10.7619C10.5469 9.20762 12.3495 7.97778 14.4134 7.07238C16.4774 6.16698 18.6729 5.71428 21 5.71428C22.9519 5.71428 24.825 6.03174 26.6194 6.66667C28.4139 7.30159 30.0981 8.22222 31.6722 9.42857L32.9944 8.09524C33.3407 7.74603 33.7815 7.57143 34.3167 7.57143C34.8518 7.57143 35.2926 7.74603 35.6389 8.09524C35.9852 8.44444 36.1583 8.88889 36.1583 9.42857C36.1583 9.96825 35.9852 10.4127 35.6389 10.7619L34.3167 12.0952C35.513 13.6825 36.4259 15.3809 37.0556 17.1905C37.6852 19 38 20.8889 38 22.8571C38 25.2063 37.5511 27.4209 36.6532 29.5009C35.7554 31.5809 34.5358 33.3981 32.9944 34.9524C31.4531 36.5067 29.6505 37.7371 27.5866 38.6438C25.5226 39.5505 23.3271 40.0025 21 40Z"
                    fill="#FFB400"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7882_1097">
                    <rect width="42" height="42" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ),
            title: "No Waiting Time Stress",
            description:
              "You don't need to rush. You have the vehicle for the booked block of time.",
          },
        ]}
      />
      <ConnectionAreasSection
        heading="Wedding Car Hire Manchester"
        cards={[
          {
            title: "1. Financial & Media Roadshows",
            description: [
              "If you are visiting for a series of investor meetings or media interviews, punctuality is non-negotiable. We navigate the busy streets of Manchester City Centre and the Liverpool Commercial District, ensuring you are dropped off at the door.",
              "Arriving by air? We can pick you up directly with our Manchester Airport Service and immediately switch to an hourly rate for your day of meetings.",
            ],
            imageSrc: "/assets/hourly-images/hourly-img-1.png",
            imageAlt: "Financial and media roadshows in Manchester and Liverpool",
          },
          {
            title: "2. Luxury Shopping Trips",
            description: [
              "The North West is a shopping destination. Visiting the Trafford Centre, King Street, or the Cheshire Oaks Designer Outlet is difficult with public transport.",
              "With our hourly chauffeur service in Manchester, you can shop without carrying heavy bags. Your chauffeur will load your purchases into the boot while you head to the next boutique.",
            ],
            imageSrc: "/assets/hourly-images/hourly-img-2.png",
            imageAlt: "Luxury shopping trip with chauffeur service",
          },
          {
            title: "3. Events & Sightseeing",
            description: [
              "From match days at Old Trafford and Anfield to races at Aintree or Chester, parking at major events is difficult. We drop you at the VIP entrance and wait for you.",
              "If you have a free day, we can create a custom tour of the region, taking you from the Liverpool waterfront to the stunning landscapes of the Lake District or Peak District on your schedule.",
            ],
            imageSrc: "/assets/hourly-images/hourly-img-3.png",
            imageAlt: "Events and sightseeing with chauffeur-driven car",
          },
        ]}
      />
      <AreaServeSection
        heading="Connecting with Airport Transfers"
        cards={[
          {
            icon: AirportLocationIcon,
            heading: "From Manchester Airport",
            text: "Land in the morning, use our hourly service for a day of meetings in Leeds or Liverpool, and get dropped off at your hotel in the evening.",
          },
          {
            icon: AirportLocationIcon,
            heading: "From Liverpool Airport",
            text: "Land at John Lennon Airport and head straight to a series of site visits across Merseyside. View Liverpool Airport Service.",
          },
          {
            icon: AirportLocationIcon,
            heading: "Private Jet Arrivals",
            text: "For clients landing at private terminals (like Ravenair or Signature), we can be at your disposal from the moment you step off the tarmac.",
          },
        ]}
      />

<PageFeatureSection
        image="/assets/hourly-images/hourly-feature-img.png"
        imageAlt="24 Hour Chauffeur Service"
        heading="24 Hour Chauffeur Service"
        text={[
          "Business doesn't stop at 5 PM. Whether you have a late-night gala dinner at Manchester Central or an early morning flight, we operate a full 24 hour chauffeur service.",
          "Business doesn't stop at 5 PM. Whether you have a late-night gala dinner at Manchester Central or an early morning flight, we operate a full 24 hour chauffeur service."
        ]}
        bulletPoints={["Available 24/7."]}
        imagePosition="left"
      />
       <FleetClasses/>

       <FAQSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "Do you provide ribbons for the car?",
            answer:
              "Yes. All our wedding car hire in Manchester and Liverpool packages include traditional ribbons. Let us know your color preference when you book.",
          },
          {
            question: "Do you offer transport for the end of the night?",
            answer:
              "Absolutely. Many couples book us for the arrival at the church and then book a separate event chauffeur trip to take them to their hotel or to the airport for their honeymoon. We can take you directly to the terminal for your [Link: Manchester Airport Service] or [Link: Liverpool Airport Service].",
          },
          {
            question: "Can you transport the bridesmaids and the bride?",
            answer:
              "Yes. We often coordinate two vehicles: a Mercedes S-Class for the bride and father, and a V-Class for the bridesmaids and mother. This is a popular setup for our wedding car hire Liverpool clients.",
          },
          {
            question: "What is the difference between your service and a vintage car?",
            answer:
              "While we don't offer vintage cars, our modern fleet offers climate control, heated seats, and advanced safety features that older vehicles cannot match. This ensures you arrive fresh and relaxed, regardless of the weather."
          },
        ]}
      />

       <Reviews/>
    </>

   
  );
}

/*
  Previous hourly chauffeur page content has been commented out intentionally.
  It included detailed sections with ImageTextSection components, feature lists,
  and benefit grids. Refer to the git history if you need to restore it.
*/
