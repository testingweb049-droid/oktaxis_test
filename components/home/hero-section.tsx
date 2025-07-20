"use client"

import { useRef } from "react"
import Image from "next/image"
import HeroSectionBookingForm from "../NewBookingForm/HeroBookingForm"
import Link from "next/link"

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const formContainerRef = useRef<HTMLDivElement>(null)
  // const animationFrameRef = useRef<number>()

  // useEffect(() => {
  //   const title = titleRef.current
  //   const subtitle = subtitleRef.current
  //   const overlay = overlayRef.current
  //   const formContainer = formContainerRef.current


  //   const initAnimations = () => {
  //     if (overlay) {
  //       overlay.style.opacity = "0.7"
  //       setTimeout(() => {
  //         overlay.style.transition = "opacity 1.5s ease-out"
  //         overlay.style.opacity = "0.4"
  //       }, 100)
  //     }

  //     if (title) {
  //       title.style.opacity = "0"
  //       title.style.transform = "translateY(30px)"
  //       setTimeout(() => {
  //         title.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
  //         title.style.opacity = "1"
  //         title.style.transform = "translateY(0)"
  //       }, 300)
  //     }

  //     if (subtitle) {
  //       subtitle.style.opacity = "0"
  //       subtitle.style.transform = "translateY(30px)"
  //       setTimeout(() => {
  //         subtitle.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
  //         subtitle.style.opacity = "1"
  //         subtitle.style.transform = "translateY(0)"
  //       }, 600)
  //     }

  //     if (formContainer) {
  //       formContainer.style.opacity = "0"
  //       formContainer.style.transform = "translateY(30px)"
  //       setTimeout(() => {
  //         formContainer.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
  //         formContainer.style.opacity = "1"
  //         formContainer.style.transform = "translateY(0)"
  //       }, 900)
  //     }
  //   }


  //   const handleScroll = () => {
  //     if (window.innerWidth > 768) { 
  //       if (animationFrameRef.current) {
  //         cancelAnimationFrame(animationFrameRef.current)
  //       }

  //       animationFrameRef.current = requestAnimationFrame(() => {
  //         const scrollPosition = window.scrollY
  //         if (title) {
  //           title.style.transform = `translateY(${scrollPosition * 0.2}px)`
  //         }
  //         if (subtitle) {
  //           subtitle.style.transform = `translateY(${scrollPosition * 0.1}px)`
  //         }
  //       })
  //     }
  //   }

  //   initAnimations()
  //   window.addEventListener("scroll", handleScroll, { passive: true })

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll)
  //     if (animationFrameRef.current) {
  //       cancelAnimationFrame(animationFrameRef.current)
  //     }
  //   }
  // }, [])

  return (
    <section
      id="herosection"
      className="relative min-h-screen w-full overflow-hidden pt-24 sm:pt-32 md:pt-44 pb-12"
    >
      <Image
        src="/images/filters_format(webp).webp"
        alt="Luxury chauffeur service"
        fill
        className="object-cover"
        priority
        quality={100}
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/70"
      />

      <div className="container relative z-10 mx-auto flex h-full flex-col gap-6 sm:gap-8 md:gap-24 items-start justify-center px-4 sm:px-6 text-white lg:px-5">
        <div className="w-full px-2 sm:px-0 max-w-4xl">
          <h1 ref={titleRef} className="mb-4 text-4xl gap-3 sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Luxury Transportation in Manchester
          </h1>

        </div>

        {/* Form container */}
        <div ref={formContainerRef} className="relative w-full px-2 sm:px-0">
          <HeroSectionBookingForm />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
    </section>
  )
}
