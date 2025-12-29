"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import Logo from "@/assets/logo-white.png";

export default function Footer() {
  const quickLinks = [
    { title: "About Us", href: "/about" },
    { title: "Our Fleet", href: "/fleet" },
    { title: "Services", href: "/services" },
    { title: "Partner With Us", href: "/driver" },
    { title: "Contact", href: "/contact" },
  ];

  const airportTransfers = [
    { title: "Manchester" , href: "/manchester-airport" },
    { title: "Liverpool", href: "/liverpool-airport" },
    { title: "London" , href: "/london-chauffeur-service" },
    { title: "Leeds" , href: "/leeds"},
    { title: "Birmingham" , href: "/birmingham-chauffeur-service" },
  
  ];

  const otherServices = [
    { title: "Airport Transfers", href: "/airport-transfer" },
    { title: "Hourly Chauffeur Service", href: "/hourly-chauffeur" },
    { title: "Event & Weddings", href: "/event-weddings" },
    { title: "Corporate Chauffeur Services", href: "/chauffeur-services" },
    { title: "Chauffeur Service Manchester", href: "/chauffeur-service-manchester" },
   ];

  return (
    <footer className="font-montserrat bg-heading-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-10 md:py-12 lg:py-14">
          {/* Main Flex Container */}
          <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:justify-between lg:items-start lg:gap-8 xl:gap-12">
            {/* First Column Container - Logo, Description, Social Icons */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 flex-shrink-0 w-full lg:max-w-sm xl:max-w-md">
              {/* Logo */}
              <Image
                src={Logo}
                alt="OKTaxis"
                width={200}
                height={40}
                className="h-8 w-auto sm:h-9 md:h-10"
              />
              
              {/* Description */}
              <p className="text-sm sm:text-base text-text-gray leading-relaxed">
                OKTaxis delivers premium chauffeur services across Manchester and the UK. Committed to excellence, punctuality, and your comfort.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/+447788710290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-text-gray transition-all duration-300 hover:text-[#25D366] hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300" />
                </a>
                
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/oktax_is/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-text-gray transition-all duration-300 hover:text-pink-500 hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300" />
                </a>
                
                {/* Email */}
                <a
                  href="mailto:info@oktaxis.co.uk"
                  className="group text-text-gray transition-all duration-300 hover:text-primary-yellow hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Second Container - Other Columns in Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-6 lg:gap-4 xl:gap-8 flex-1 lg:justify-end">
              {/* Column 2 - Quick Links */}
              <div className="min-w-0">
                <h3 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold text-white">Quick Links</h3>
                <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-xs sm:text-sm md:text-base text-text-gray transition-all duration-300 hover:text-white hover:translate-x-1"
                      >
                        <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-50 text-text-gray group-hover:opacity-100 group-hover:text-white transition-all duration-300" />
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 - Top Cities */}
              <div className="min-w-0">
                <h3 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold text-white">Top Cities</h3>
                <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                  {airportTransfers.map((item) => (
                    <li key={item.title}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="group flex items-center gap-2 text-xs sm:text-sm md:text-base text-text-gray transition-all duration-300 hover:text-white hover:translate-x-1"
                        >
                          <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-50 text-text-gray group-hover:opacity-100 group-hover:text-white transition-all duration-300" />
                          <span>{item.title}</span>
                        </Link>
                      ) : (
                        <div className="group flex items-center gap-2 text-xs sm:text-sm md:text-base text-text-gray">
                          <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-50 text-text-gray" />
                          <span>{item.title}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4 - Our Services */}
              <div className="min-w-0">
                <h3 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold text-white">Our Services</h3>
                <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                  {otherServices.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="group flex items-center gap-2 text-xs sm:text-sm md:text-base text-text-gray transition-all duration-300 hover:text-white hover:translate-x-1"
                      >
                        <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-50 text-text-gray group-hover:opacity-100 group-hover:text-white transition-all duration-300" />
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 5 - Contact Us */}
              <div className="min-w-0 col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1">
                <h3 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold text-white">Contact Us</h3>
                <div className="space-y-3 sm:space-y-4">
                  {/* Phone Number */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary-yellow mt-0.5 sm:mt-1 flex-shrink-0" />
                    <a
                      href="tel:+447788710290"
                      className="group text-base sm:text-lg font-semibold text-primary-yellow hover:text-white transition-all duration-300 break-words hover:underline"
                    >
                      +44 7788 710290
                    </a>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-text-gray mt-0.5 sm:mt-1 flex-shrink-0" />
                    <p className="text-xs sm:text-sm md:text-base text-text-gray">
                      Email:{" "}
                      <a
                        href="mailto:info@oktaxis.co.uk"
                        className="text-text-gray hover:text-white transition-colors duration-300 break-words hover:underline"
                      >
                        info@oktaxis.co.uk
                      </a>
                    </p>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-text-gray mt-0.5 sm:mt-1 flex-shrink-0" />
                    <p className="text-xs sm:text-sm md:text-base text-text-gray">
                      Headquarters:{" "}
                      <span className="text-text-gray break-words">
                        08 Portway, Wythenshawe, Manchester, UK
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright, Policy Links, and Payment Methods */}
      <div className="border-t border-gray-800 bg-heading-black py-4 sm:py-5 md:py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Payment Methods Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-5 sm:h-6 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                alt="Mastercard"
                className="h-5 sm:h-6 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1200px-American_Express_logo.svg.png"
                alt="American Express"
                className="h-5 sm:h-6 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
                alt="PayPal"
                className="h-5 sm:h-6 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              />
            </div>
            
            {/* Copyright and Policy Links */}
            <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 sm:flex-row">
              <p className="text-[10px] xs:text-xs text-text-gray text-center sm:text-left">
                © 2024 OKTaxis Mobility Solutions. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] xs:text-xs text-text-gray">
                <Link
                  href="/privacy"
                  className="group relative transition-colors duration-300 hover:text-white whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="group relative transition-colors duration-300 hover:text-white whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="group relative transition-colors duration-300 hover:text-white whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

