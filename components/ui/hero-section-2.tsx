"use client"

import { useEffect, useRef } from "react"
import Image, { StaticImageData } from "next/image"
import HeroForm from "@/app/book-ride/hero-form"
import { ReactNode } from "react";
interface HeroSectionProps {
  bgImage: string | StaticImageData

  title?: string
  description?: string | ReactNode


}

export default function HeroSection2({
  bgImage,
  title,
  description,
}: HeroSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const formFullWidthSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const overlay = overlayRef.current
    const formFullWidthSection = formFullWidthSectionRef.current

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

    if (formFullWidthSection) {
      formFullWidthSection.style.opacity = "0"
      formFullWidthSection.style.transform = "translateY(30px)"

      setTimeout(() => {
        formFullWidthSection.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
        formFullWidthSection.style.opacity = "1"
        formFullWidthSection.style.transform = "translateY(0)"
      }, 900)
    }

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
    <section
      id="herosection"
      className="relative w-full h-[600px] bg-v0-blue border-t-4 border-b-4 border-v0-blue overflow-visible pt-7 pb-40"
    >
      <Image
        src={bgImage}
        alt="Luxury chauffeur service"
        fill
        className="object-cover"
        priority
      />
      <div ref={overlayRef} className="absolute inset-0 bg-black" />
      <div className="container mx-auto relative z-10 flex h-full flex-col gap-6 sm:gap-8 md:gap-24 items-center justify-center px-4 sm:px-6 text-white lg:px-5">
        <div className="w-full pt-5 sm:pt-0 px-2 md:mx-5 md:text-center  sm:px-0 max-w-6xl pb-20 sm:pb-16">
          <h1 ref={titleRef} className="mb-2 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-4xl lg:leading-[55px] font-bold">
            {title}
          </h1>
          <p ref={subtitleRef} className="text-base sm:text-lg md:text-xl max-w-6xl lg:text-xl">
            {description}
          </p>
        </div>

        <div
          ref={formFullWidthSectionRef}
          className="absolute  top-[60%] sm:top-[50%] md:top-[45%] transform -translate-x-1/2 translate-y-[50%] w-full max-w-6xl mt-15 py-20 px-4 sm:px-6 lg:px-8 z-20"

        >
          <HeroForm />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
    </section>
  )
}
