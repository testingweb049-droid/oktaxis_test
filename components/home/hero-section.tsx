"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import HeroSectionBookingForm from "../NewBookingForm/HeroBookingForm"

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const formContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const overlay = overlayRef.current
    const formContainer = formContainerRef.current

    if (overlay) {
      overlay.style.opacity = "0.7"
      setTimeout(() => {
        overlay.style.transition = "opacity 1.5s ease-out"
        overlay.style.opacity = "0.4"
      }, 100)
    }

    if (title) {
      title.style.opacity = "0"
      title.style.transform = "translateY(30px)"

      setTimeout(() => {
        title.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
        title.style.opacity = "1"
        title.style.transform = "translateY(0)"
      }, 300)
    }

    if (subtitle) {
      subtitle.style.opacity = "0"
      subtitle.style.transform = "translateY(30px)"

      setTimeout(() => {
        subtitle.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
        subtitle.style.opacity = "1"
        subtitle.style.transform = "translateY(0)"
      }, 600)
    }

    if (formContainer) {
      formContainer.style.opacity = "0"
      formContainer.style.transform = "translateY(30px)"

      setTimeout(() => {
        formContainer.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
        formContainer.style.opacity = "1"
        formContainer.style.transform = "translateY(0)"
      }, 900)
    }

    // Add parallax effect on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (title) {
        title.style.transform = `translateY(${scrollPosition * 0.2}px)`
      }
      if (subtitle) {
        subtitle.style.transform = `translateY(${scrollPosition * 0.1}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section id="herosection" className="relative min-h-screen lg:h-screen w-full overflow-hidden  pt-32 md:pt-44 pb-12">
      <Image src="/images/limousine.png" alt="Luxury chauffeur service" fill className="object-cover" priority />
      <div ref={overlayRef} className="absolute inset-0" />
      <div className="container relative z-10 mx-auto flex h-full flex-col gap-10 items-start justify-around px-3 text-white  lg:px-5">
        <div>

        <p ref={titleRef} className="mb-2 sm:mb-4 text-6xl font-bold  md:text-7xl lg:text-9xl lg:leading-[110px]">
          PRIME <br /> CHAUFFEUR
        </p>
        <p ref={subtitleRef} className=" text-lg md:text-2xl lg:text-3xl">
          Your High Class Chauffeur & Limousine Service in UK
        </p>
        </div>

        {/* Empty div for the form with animation */}
        <div ref={formContainerRef} className="relative w-full max-w-full">
          <HeroSectionBookingForm/>
        </div>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
    </section>
  )
}
