"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import Logo from "@/assets/logo-white.png";

// Types
interface FooterLink {
  title: string;
  href?: string;
}

interface PaymentMethod {
  name: string;
  src: string;
  alt: string;
}

// Constants
const QUICK_LINKS: FooterLink[] = [
  { title: "About Us", href: "/about" },
  { title: "Our Fleet", href: "/fleet" },
  { title: "Services", href: "/services" },
  { title: "Partner With Us", href: "/driver" },
  { title: "Contact", href: "/contact" },
];

const TOP_CITIES: FooterLink[] = [
  { title: "Manchester", href: "/manchester-airport" },
  { title: "Liverpool", href: "/liverpool-airport" },
  { title: "London", href: "/london-chauffeur-service" },
  { title: "Leeds", href: "/leeds" },
  { title: "Birmingham", href: "/birmingham-chauffeur-service" },
];

const OTHER_SERVICES: FooterLink[] = [
  { title: "Airport Transfers", href: "/airport-transfer" },
  { title: "Hourly Chauffeur", href: "/hourly-chauffeur" },
  { title: "Event & Wedding", href: "/event-weddings" },
  { title: "Corporate Chauffeur", href: "/chauffeur-services" },
  { title: "Chauffeur Manchester", href: "/chauffeur-service-manchester" },
];

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    name: "Visa",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
    alt: "Visa",
  },
  {
    name: "Mastercard",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png",
    alt: "Mastercard",
  },
  {
    name: "American Express",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1200px-American_Express_logo.svg.png",
    alt: "American Express",
  },
  {
    name: "PayPal",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png",
    alt: "PayPal",
  },
];

// Reusable Components
const FooterLinkItem = ({ link }: { link: FooterLink }) => {
  const baseClasses = "group flex items-center gap-2 text-text-gray transition-all duration-300 hover:text-white hover:translate-x-1 text-sm sm:text-base md:text-lg";
  const iconClasses = "h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 opacity-50 text-text-gray group-hover:opacity-100 group-hover:text-white transition-all duration-300 flex-shrink-0";

  if (!link.href) {
    return (
      <div className={baseClasses}>
        <ArrowRight className={iconClasses} />
        <span>{link.title}</span>
      </div>
    );
  }

  return (
    <Link href={link.href} className={baseClasses}>
      <ArrowRight className={iconClasses} />
      <span>{link.title}</span>
    </Link>
  );
};

const FooterLinkColumn = ({ title, links }: { title: string; links: FooterLink[] }) => (
  <div className="min-w-0">
    <h3 className="mb-3 sm:mb-4 md:mb-5 text-base sm:text-lg md:text-xl font-semibold text-white">
      {title}
    </h3>
    <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
      {links.map((link) => (
        <li key={link.title}>
          <FooterLinkItem link={link} />
        </li>
      ))}
    </ul>
  </div>
);

const PaymentMethods = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${className}`}>
    {PAYMENT_METHODS.map((method) => (
      <img
        key={method.name}
        src={method.src}
        alt={method.alt}
        className="h-5 sm:h-6 md:h-7 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
      />
    ))}
  </div>
);

const PolicyLinks = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-sm sm:text-base md:text-lg text-text-gray ${className}`}>
    <Link
      href="/privacy-polices"
      className="group relative transition-colors duration-300 hover:text-white whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
    >
      Privacy Policy
    </Link>
    <span className="text-text-gray">•</span>
    <span className="text-text-gray">
      Developed by{" "}
      <a
        href="https://www.thedevsquare.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative text-primary-yellow hover:text-white transition-colors duration-300 whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
      >
        Dev Square
      </a>
    </span>
  </div>
);

export default function Footer() {
  return (
    <footer className="font-montserrat bg-heading-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16">
          {/* Main Flex Container */}
          <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:justify-between lg:items-start lg:gap-8 xl:gap-12">
            {/* First Column - Logo, Description, Social Icons */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 flex-shrink-0 w-full lg:max-w-sm xl:max-w-md">
              {/* Logo */}
              <Image
                src={Logo}
                alt="OKTaxis"
                width={200}
                height={40}
                className="h-8 w-auto sm:h-9 md:h-10 lg:h-11"
                priority
              />

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-gray leading-relaxed">
                OKTaxis delivers premium chauffeur services across Manchester and the UK. Committed to excellence, punctuality, and your comfort.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                <a
                  href="https://wa.me/+447788710290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-text-gray transition-all duration-300 hover:text-primary-yellow hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-300" />
                </a>

                <a
                  href="https://www.instagram.com/oktax_is/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-text-gray transition-all duration-300 hover:text-pink-500 hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-300" />
                </a>

                <a
                  href="mailto:info@oktaxis.co.uk"
                  className="group text-text-gray transition-all duration-300 hover:text-primary-yellow hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Second Container - Link Columns in Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-6 lg:gap-4 xl:gap-8 flex-1 lg:justify-end">
              <FooterLinkColumn title="Quick Links" links={QUICK_LINKS} />
              <FooterLinkColumn title="Top Cities" links={TOP_CITIES} />
              <FooterLinkColumn title="Our Services" links={OTHER_SERVICES} />

              {/* Contact Us Column */}
              <div className="min-w-0 col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1">
                <h3 className="mb-3 sm:mb-4 md:mb-5 text-base sm:text-lg md:text-xl font-semibold text-white">
                  Contact Us
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {/* Phone Number */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Phone className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 text-text-gray mt-0.5 sm:mt-1 flex-shrink-0" />
                    <a
                      href="tel:+447788710290"
                      className="text-sm sm:text-base md:text-lg text-text-gray hover:text-white transition-colors duration-300 break-words hover:underline"
                    >
                      +44 7788 710290
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Mail className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 text-text-gray mt-0.5 sm:mt-1 flex-shrink-0" />
                    <a
                      href="mailto:info@oktaxis.co.uk"
                      className="text-sm sm:text-base md:text-lg text-text-gray hover:text-white transition-colors duration-300 break-words hover:underline"
                    >
                      info@oktaxis.co.uk
                    </a>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <MapPin className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 text-text-gray mt-0.5 sm:mt-1 flex-shrink-0" />
                    <p className="text-sm sm:text-base md:text-lg text-text-gray break-words">
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
      </div>

      {/* Bottom Section - Copyright, Policy Links, and Payment Methods */}
      <div className="border-t border-gray-800 bg-heading-black py-4 sm:py-5 md:py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout */}
          <div className="flex flex-col items-center gap-4 sm:hidden">
            <PaymentMethods />
            <p className="text-sm sm:text-base text-text-gray text-center">
              © 2024 OKTaxis Mobility Solutions. All rights reserved.
            </p>
            <PolicyLinks />
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-4 md:gap-6">
            {/* Copyright - Left */}
            <p className="text-sm sm:text-base md:text-lg text-text-gray whitespace-nowrap flex-shrink-0">
              © 2024 OKTaxis Mobility Solutions. All rights reserved.
            </p>

            {/* Payment Methods - Center */}
            <PaymentMethods className="flex-1" />

            {/* Policy Links - Right */}
            <div className="flex-shrink-0">
              <PolicyLinks />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

