"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUp, Facebook, Linkedin, Instagram, Twitter, Youtube } from "lucide-react"
import Logo from "@/assets/logo-white.png"
import { navLinks } from "@/constants/headerFooterData"

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
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61572964094684", label: "Facebook" },
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
      <div className="container mx-auto flex justify-center pb-12">
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
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* Airport Transfers */}
        <div>
          <h3 className="mb-4 text-base font-bold uppercase">Airport Transfers</h3>
          <ul className="space-y-2">
            {footerData.airportTransfers.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="text-sm text-gray-300 transition-colors hover:text-white">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Services */}
        <div>
          <h3 className="mb-4 text-base font-bold uppercase">Other Services</h3>
          <ul className="space-y-2">
            {footerData.otherServices.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="text-sm text-gray-300 transition-colors hover:text-white">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="mb-4 text-base font-bold uppercase">Contact Us</h3>
          <p className="text-sm mb-2">
            <strong>Email:</strong>{" "}
            <a href="mailto:info@oktaxis.co.uk" className="underline hover:text-amber-500">
              info@oktaxis.co.uk
            </a>
          </p>
          <p className="text-sm mb-2">
            <strong>Office Address:</strong> 0B Portway, Wythenshaw, Manchester
          </p>
          <p className="text-sm mb-2">
            <strong>Telephone:</strong>{" "}
            <a href="tel:+447342193341" className="underline hover:text-amber-500">
              +44 7342 193341
            </a>
          </p>
        </div>
      </div>

      {/* Logo and social links */}
      <div className="border-t border-gray-800 py-8 mt-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="mb-6 md:mb-0">
              <Image src={Logo} alt="OKTaxis" width={200} height={40} className="h-10 w-auto" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                alt="Visa" 
                className="h-6 object-contain" 
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                alt="Mastercard" 
                className="h-6 object-contain" 
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Discover_Card_logo.svg/1200px-Discover_Card_logo.svg.png" 
                alt="Discover" 
                className="h-6 object-contain" 
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1200px-American_Express_logo.svg.png" 
                alt="American Express" 
                className="h-6 object-contain" 
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" 
                alt="PayPal" 
                className="h-6 object-contain" 
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {footerData.socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
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
        <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4 text-xs text-gray-400 sm:flex-row sm:justify-between">
          <p>© All rights Reserved to OKTaxis Mobility Solutions</p>
          <div className="flex flex-wrap justify-center gap-4">
            {footerData.legalLinks.map((item) => (
              <Link 
                key={item.title} 
                href={item.href} 
                className="hover:text-white transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}