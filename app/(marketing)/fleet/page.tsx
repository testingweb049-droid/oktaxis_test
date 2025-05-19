import FleetClasses from "@/components/home/fleet";
import WhyChoose from "@/components/ui/ChooseWhy";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import { homePageData } from "@/constants/homePageData";

export default function Fleet(){
    const { bgImg} = homePageData.ourFleets || [];
    return(
        <>
       <HeroSection2
  bgImage={bgImg.src}
  title="Our Fleet"
  description="Our diverse fleet includes economy, executive, and premium vehicles, all maintained to the highest standards. Each vehicle is equipped with modern amenities to provide a comfortable and safe ride."
/> 
<Offer/>
<FleetClasses/>
<WhyChoose/>
        </>
    )
}