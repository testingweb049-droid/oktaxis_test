import HeroSection2 from "@/components/ui/hero-section2";
import HeroImg from "@/assets/bmw.png";
export default function Blog(){
    return(
        <>
        <HeroSection2
                bgImage={HeroImg.src}
                title="About OKTaxis – Excellence in Chauffeur Services"
                description="Manchester is an amazing and vibrant city that attracts people from all around the world. It's famous for its football, with iconic stadiums for both Manchester United and Manchester City."
              />
        </>
    )
}