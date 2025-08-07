import FleetClasses from "@/components/home/fleet";
import WhyChoose from "@/components/ui/ChooseWhy";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import { homePageData } from "@/constants/homePageData";
import Seo from "../../../../components/Seo";
export default function Fleet() {
  const { bgImg } = homePageData.ourFleets || [];
  return (
    <>
      <Seo
        title="Our Fleet | OKTaxis Manchester Chauffeur Services"
        description="Explore OKTaxis’ premium fleet including executive sedans, spacious vans, and luxury vehicles. Impeccably maintained for every journey in Manchester and beyond."
        url="https://oktaxis.co.uk/fleet"
        image="https://oktaxis.com/og-fleet.jpg" // Replace with actual hosted image
      />
      <HeroSection2
        bgImage={bgImg.src}
        title="Our Fleet"
      //   description="Our meticulously maintained fleet offers a range of premium vehicles to suit every occasion. Each car is chosen for its comfort, style and performance, ensuring you travel in true executive luxury. All vehicles are cleaned and inspected before every journey, and come equipped with plush leather seating, climate control, complimentary bottled water and unlimited Wi-Fi to keep you comfortable and connected on the road."
      />
      <Offer />
      

      <ImageTextSection
        imageSrc="/Taxi In Manchester Taxi Service.png"
        imageAlt="Executive Airport Transfer"
        title={
          <span className="text-3xl md:text-4xl font-bold">
          Our{' '}
          <span className="text-brand text-3xl md:text-4xl font-bold">Luxury </span>{' '}
          Fleet at{' '}
          <span className="text-brand text-3xl md:text-4xl font-bold">OKTaxis</span>{' '}
        </span>
        }
        text="Our meticulously maintained fleet offers a range of premium vehicles to suit every occasion in Manchester and the North West. Each car is chosen for its comfort, style, and performance, ensuring you travel in true executive luxury. All vehicles are cleaned and inspected before every journey, and come equipped with plush leather seating, climate control, complimentary bottled water, and unlimited Wi-Fi to keep you comfortable and connected on the road.
Whether for Manchester airport services, wedding chauffeur Manchester hires, or stadium transfers, our fleet is tailored to your needs. Explore the options below:"
        bgColor="bg-white"
        imagePosition="right"
      />

      <WhyChoose />
      <FleetClasses />
    </>
  );
}
