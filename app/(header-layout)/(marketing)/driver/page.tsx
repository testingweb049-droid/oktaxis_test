"use client";
import RegisterDriverForm from "@/components/DriverForm/RegisterDriverForm";
import HeroSection2 from "@/components/ui/hero-section2";
import Img1 from "@/assets/homeImages/img1.jpeg";
export default function RegisterDriverPage() {


  return (
    <>
      <HeroSection2
        bgImage={Img1.src}
        title="Drive with okTaxi"
        description="Join the okTaxi team and drive on your own terms. We offer flexible schedules, competitive earnings, and a reliable platform to support your journey behind the wheel."
      />
      <div
        className="m-auto w-full lg:w-1/2 pt-32 pb-20 px-[2%]"
      >
        <RegisterDriverForm />

      </div>
    </>
  );
}
