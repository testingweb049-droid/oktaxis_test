"use client";
import RegisterDriverForm from "@/components/DriverForm/RegisterDriverForm";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function RegisterDriverPage() {
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
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src="/partner-with-us.jpg"
          alt="Partner with us"
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
              Partner with us
            </h1>
            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl lg:text-2xl text-gray-200"
            >
              Chauffeur the nicest clients and earn more
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <div className="bg-gray-100 min-h-screen py-12 md:py-16 px-4">
        <div className="m-auto w-full max-w-4xl">
          <RegisterDriverForm />
        </div>
      </div>
    </>
  );
}
