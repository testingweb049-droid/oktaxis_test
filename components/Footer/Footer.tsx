"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUp, Facebook, Linkedin, Instagram, Twitter, Youtube } from "lucide-react"
import Logo from "@/assets/logo-white.png"
import { navLinks } from "@/constants/headerFooterData"
// Footer data structure based on the design
const footerData = {
  
  
  airportTransfers: [
    { title: "Airport Transfer Berlin (BER)", href: "/airport/berlin" },
    { title: "Airport Transfer London (LHR)", href: "/airport/london" },
    { title: "Airport Transfer Paris (CDG)", href: "/airport/paris" },
    { title: "Airport Transfer Dubai (DXB)", href: "/airport/dubai" },
    { title: "Airport Transfer Istanbul (IST / SAW)", href: "/airport/istanbul" },
    { title: "Airport Transfer Munich (MUC)", href: "/airport/munich" },
    { title: "Airport Transfer Potsdam (POT)", href: "/airport/potsdam" },
    { title: "Airport Transfer Frankfurt (FRA)", href: "/airport/frankfurt" },
    { title: "All Airport Transfers", href: "/airport" },
  ],
  otherServices: [
    { title: "Hourly Car Rental", href: "/services/hourly" },
    { title: "Event Transportation", href: "/services/event" },
    { title: "Sightseeing Bus Berlin", href: "/services/sightseeing" },
    { title: "Wedding Limousine Berlin", href: "/services/wedding" },
    { title: "Bus Transfers in Berlin", href: "/services/bus" },
    { title: "Car Service in Berlin", href: "/services/car" },
    { title: "Limousine Service in Berlin", href: "/services/limousine" },
  ],
  socialLinks: [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ],
  legalLinks: [
    { title: "FAQs", href: "/faqs" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Cookies Policy", href: "/cookies" },
    { title: "Terms & Conditions", href: "/terms" },
    { title: "Conditions of Transport", href: "/transport-conditions" },
    { title: "Imprint", href: "/imprint" },
  ],
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-black text-white pt-5">
      {/* Scroll to top button */}
      <div className="container mx-auto flex justify-center">
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center text-sm text-gray-400 transition-colors hover:text-white"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
          <span>Up</span>
        </button>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto flex justify-start gap-8 px-4 py-8 md:grid-cols-2 lg:grid-cols-5 ">
        {/* Links */}
        <div>
          <h3 className="mb-4 text-base font-bold uppercase">Links</h3>
          <ul className="space-y-2">
            {navLinks.map((item) => (
              <li key={item.title}>
                <Link href={item.path} className="text-sm text-gray-300 transition-colors hover:text-white">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
       </div>

       

      {/* Logo and social links */}
      <div className="border-t border-gray-800 py-8 mt-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-6 md:mb-0">
              <Image src={Logo} alt="OKTaxis" width={200} height={40} className="h-10 w-auto" />
            </div>

            <div className="flex space-x-4">
              {footerData.socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-gray-400 transition-colors hover:text-white"
                    aria-label={item.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Legal links and copyright */}
      <div className="border-t border-gray-800 bg-black py-4">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 text-xs text-gray-400 md:flex-row">
          <p>© All rights Reserved to OKTaxis Mobility Solutions</p>

          <div className="mt-4 flex flex-wrap justify-center gap-4 md:mt-0">
            {footerData.legalLinks.map((item) => (
              <Link key={item.title} href={item.href} className="transition-colors hover:text-white">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
