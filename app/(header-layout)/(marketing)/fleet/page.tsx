import FleetClasses from "@/components/home/fleet";
import WhyChoose from "@/components/ui/ChooseWhy";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import { homePageData } from "@/constants/homePageData";

export default function Fleet(){
    const { bgImg} = homePageData.ourFleets || [];
    return(
        <>
       <HeroSection2
  bgImage={bgImg.src}
  title="Our Fleet"
//   description="Our meticulously maintained fleet offers a range of premium vehicles to suit every occasion. Each car is chosen for its comfort, style and performance, ensuring you travel in true executive luxury. All vehicles are cleaned and inspected before every journey, and come equipped with plush leather seating, climate control, complimentary bottled water and unlimited Wi-Fi to keep you comfortable and connected on the road."
/> 
<Offer/>
 <ImageTextSection
        imageSrc="/Taxi In Manchester Taxi Service.webp"
        imageAlt="Executive Airport Transfer"
        title="Fleets OkTaxis Have"
        text="Our meticulously maintained fleet offers a range of premium vehicles to suit every occasion. Each car is chosen for its comfort, style and performance, ensuring you travel in true executive luxury. All vehicles are cleaned and inspected before every journey, and come equipped with plush leather seating, climate control, complimentary bottled water and unlimited Wi-Fi to keep you comfortable and connected on the road.
                      "
        bgColor="bg-white"
        imagePosition="right"
      />
<FleetClasses/>
<WhyChoose/>
        </>
    )
}