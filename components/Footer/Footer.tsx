"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import Logo from "@/assets/logo-white.png";

export default function Footer() {
  const quickLinks = [
    { title: "About Us", href: "/about" },
    { title: "Our Fleet", href: "/fleet" },
    { title: "Services", href: "/services" },
    { title: "Business Account", href: "/business" },
    { title: "Contact", href: "/contact" },
  ];

  const airportTransfers = [
    { title: "Manchester" },
    { title: "Liverpool", href: "/liverpool" },
    { title: "London" },
    { title: "Leeds" },
    { title: "Birmingham" },
    { title: "Edinburgh" },
  ];

  const otherServices = [
    { title: "Airport Transfers", href: "/services/airport-transfer" },
    { title: "Hourly Chauffeur Service", href: "/services/hourly-chauffeur" },
    { title: "Event & Weddings", href: "/services/event-weddings" },
    { title: "Chauffeur Services", href: "/services/chauffeur-services" },
    { title: "City Tours", href: "/services/city-tours" },
    { title: "Stadium Transfer", href: "/services/stadium-transfer" },
    { title: "Manchester City Center", href: "/services/city-center" },
  ];

  const popularRoutes = [
    { title: "Taxi in Birmingham", href: "/taxi-in-birmingham" },
    { title: "Taxi in Bradford", href: "/taxi-in-bradford" },
    { title: "Taxi in London", href: "/taxi-in-london" },
  ];

  return (
    <footer className="font-montserrat bg-heading-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="px-4 py-12 sm:px-4 lg:px-6">
          {/* Main Flex Container */}
          <div className="flex flex-col gap-14 lg:flex-row lg:justify-between lg:items-start">
            {/* First Column Container - Logo, Description, Social Icons */}
            <div className="space-y-6 flex-shrink-0 lg:max-w-sm">
              {/* Logo */}
              <Image
                src={Logo}
                alt="OKTaxis"
                width={200}
                height={40}
                className="h-10 w-auto"
              />
              
              {/* Description */}
              <p className="text-base text-text-gray leading-relaxed">
                OKTaxis delivers premium chauffeur services across Manchester and the UK. Committed to excellence, punctuality, and your comfort.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/+447788710290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-heading-black border border-white text-white transition-opacity hover:opacity-80"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="h-5 w-5" />
                </a>
                
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/oktax_is/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-heading-black border border-white text-white transition-opacity hover:opacity-80"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
                
                {/* Email */}
                <a
                  href="mailto:info@oktaxis.co.uk"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-heading-black border border-white text-white transition-opacity hover:opacity-80"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Second Container - Other Columns in Flex */}
            <div className="flex flex-col  sm:grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:gap-6 xl:gap-16 flex-1 lg:justify-end">
              {/* Column 2 - Quick Links */}
              <div className="min-w-[150px]">
                <h3 className="mb-4 text-base font-semibold text-white">Quick Links</h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="text-base text-text-gray transition-colors hover:text-white"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 - Top Cities */}
              <div className="min-w-[150px]">
                <h3 className="mb-4 text-base font-semibold text-white">Top Cities</h3>
                <ul className="space-y-3">
                  {airportTransfers.map((item) => (
                    <li key={item.title}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-base text-text-gray transition-colors hover:text-white"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <p className="text-base text-text-gray">{item.title}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4 - Our Services */}
              <div className="min-w-[150px]">
                <h3 className="mb-4 text-base font-semibold text-white">Our Services</h3>
                <ul className="space-y-3">
                  {otherServices.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="text-base text-text-gray transition-colors hover:text-white"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 5 - Popular Routes */}
              <div className="min-w-[150px]">
                <h3 className="mb-4 text-base font-semibold text-white">Popular Routes</h3>
                <ul className="space-y-3">
                  {popularRoutes.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="text-base text-text-gray transition-colors hover:text-white"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 6 - Contact Us */}
              <div className="min-w-[200px]">
                <h3 className="mb-4 text-base font-semibold text-white">Contact Us</h3>
                <div className="space-y-4">
                  {/* Phone Number */}
                  <div>
                    <a
                      href="tel:+447788710290"
                      className="text-lg font-semibold text-primary-yellow hover:underline"
                    >
                      +44 7788 710290
                    </a>
                  </div>
                  
                  {/* Payment Methods */}
                  <div>
                    <p className="mb-2 text-base text-text-gray">Payment Methods</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                        alt="Visa"
                        className="h-5 object-contain"
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                        alt="Mastercard"
                        className="h-5 object-contain"
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1200px-American_Express_logo.svg.png"
                        alt="American Express"
                        className="h-5 object-contain"
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
                        alt="PayPal"
                        className="h-5 object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <p className="text-base text-text-gray">
                      Email:{" "}
                      <a
                        href="mailto:info@oktaxis.co.uk"
                        className="text-text-gray hover:text-white transition-colors"
                      >
                        info@oktaxis.co.uk
                      </a>
                    </p>
                  </div>
                  
                  {/* Address */}
                  <div>
                    <p className="text-base text-text-gray">
                      Headquarters:{" "}
                      <span className="text-text-gray">
                        08 Portway, Wythenshawe, Manchester, UK
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    

      {/* Bottom Section - Copyright and Policy Links */}
      <div className="border-t border-gray-800 bg-heading-black py-6">
        <div className="  px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-text-gray">
              © 2024 OKTaxis Mobility Solutions. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-text-gray">
              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="transition-colors hover:text-white"
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

