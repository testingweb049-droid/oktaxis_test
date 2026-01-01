"use client";

import ContactForm from "@/components/contact-form/contact-form";
import ContactTeamSection from "@/components/contact-team-section";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Contact = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const overlay = overlayRef.current;

    if (overlay) {
      overlay.style.opacity = "0.7";
      setTimeout(() => {
        overlay.style.transition = "opacity 1.5s ease-out";
        overlay.style.opacity = "0.5";
      }, 100);
    }

    if (title) {
      title.style.opacity = "0";
      title.style.transform = "translateY(30px)";
      setTimeout(() => {
        title.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";
      }, 300);
    }

    if (subtitle) {
      subtitle.style.opacity = "0";
      subtitle.style.transform = "translateY(30px)";
      setTimeout(() => {
        subtitle.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        subtitle.style.opacity = "1";
        subtitle.style.transform = "translateY(0)";
      }, 600);
    }
  }, []);

  return (
    <>
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src="/assets/airport-transfer-images/airport-banner-img.png"
          alt="Contact Us"
          fill
          className="object-cover object-top"
          priority
        />
        <div ref={overlayRef} className="absolute inset-0 bg-black" />
        <div className="relative z-10 h-full flex items-end justify-center pb-12 md:pb-16 px-4">
          <div className="text-center text-white max-w-4xl">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Contact OKTaxis
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl lg:text-2xl text-gray-200"
            >
              For bookings and inquiries, OKTaxis is here for you 24/7. Contact us
              today to book your luxury transfer or request a personalized quote.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      <ContactTeamSection />
    </>
  );
};

export default Contact;
