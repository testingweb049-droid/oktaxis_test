"use client";

import BookingForm from "@/components/BookingForm/BookingForm";
import { homePageData } from "@/constants/homePageData";
import HeroCard from "@/components/Sections/HeroCard";
import TripWorking from "@/components/Sections/TripWorkingCard";
import ServiceCard from "@/components/Sections/ServiceCard";
import OurStory from "@/components/Sections/OurStory";
import Testimonials from "@/components/Sections/Testimonials";
import WhyChooseUs from "@/components/Sections/WhyChooseUs";
import FAQSection from "@/components/Sections/FaqSection";
import Image from "next/image";
import BookingProcess from "@/components/Sections/BookingProcess";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { StatusCard } from "@/components/Sections/StatusCard";
import AirportTransportation from "@/components/Sections/AirportTransportation";
import PremiumTransportation from "@/components/Sections/PremiumTransportation";
import WhyChooseOktaxis from "@/components/Sections/WhyChooseOktaxis";
import PaymentDone from "@/components/BookingForm/PaymentDone/PaymentDone";
import HeroImage from "@/assets/heroImage.jpg"
import Link from "next/link";
import Whatsapp from "@/assets/whatsapp.png";
import { heroImage64 } from "@/assets/heroImage64";
import HeroSectionBookingForm from "@/components/NewBookingForm/HeroBookingForm";

const Home = () => {
  const { heroSection } = homePageData;
  const [paymentDone, setPaymentDone] = useState(false)

  return (
    <main className={`w-full  ${paymentDone && "overflow-hidden h-screen"}`}>
      <Suspense><PaymentDone setPaymentDone={setPaymentDone} paymentDone={paymentDone} /></Suspense>
      {/* Hero Section */}
      <div className="w-full text-center relative  z-50 overflow-hidden">
        <Image
          src={HeroImage}
          quality={50}
          alt="backgorund"
          loading="eager"
          placeholder="blur"
          blurDataURL={heroImage64}
          className="w-full h-full object-cover absolute object-center "
        />
      
        <div className="relative w-full h-full bg-black/40 top-0 left-0 min-h-full py-20 flex items-center justify-center z-[99] px-3 sm:px-5 ">
           <div className="w-full flex items-start justify-center flex-col gap-14 lg:gap-40 max-w-screen-xl mx-auto ">

              <div className='w-full text-start'>
                <p className='text-3xl lg:text-7xl text-white font-bold lg:font-semibold lg:leading-[75px]'>OkTaxis Offers Luxury</p>
                <p className='text-3xl lg:text-7xl text-white font-bold lg:font-semibold lg:leading-[75px]'>Transport All Over The UK</p>
              </div>

              <HeroSectionBookingForm />

            </div>
        </div>
      </div>
      <AirportTransportation />

      <div className="w-full bg-gray-50">
        {/* <div className="">
                <TripWorking/>
            </div> */}
        <div className="">
          <BookingProcess />
        </div>
      </div>
      <PremiumTransportation />
      <ServiceCard />
      {/* <OurStory/> */}
      <WhyChooseOktaxis />
      <WhyChooseUs />


      <div className="w-full flex items-center justify-center py-12 md:py-16 lg:py-20">
        <Testimonials />

      </div>
      <div className="w-full flex items-center justify-center py-12 md:py-16 lg:py-20">
        <FAQSection />

      </div>
      <div className="fixed right-[0] bottom-[4%] animate-whatsappBounce z-50">
        <a href="https://wa.me/447342193341" target="_blank" rel="noopener noreferrer">
          <Image
            src={Whatsapp}
            alt="whatsapp logo"
            className="w-14 lg:w-16 pr-[2px] lg:p-0"
          />
        </a>
      </div>
    </main>
  );
};

export default Home;
