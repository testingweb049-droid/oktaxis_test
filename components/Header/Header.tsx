"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import WhiteLogo from "@/assets/logo-white.png";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

// Types
interface NavLink {
  id: string;
  title: string;
  path?: string;
  submenu?: boolean;
  sublinks?: {
    id: string;
    title: string;
    path: string;
  }[];
}

// Constants
const NAV_LINKS: NavLink[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
  },
  {
    id: "services",
    title: "Services",
    submenu: true,
    sublinks: [
      {
        id: "airport-transfer",
        title: "Airport Transfer",
        path: "/airport-transfer",
      },
      {
        id: "hourly-chauffeur",
        title: "Hourly Chauffeur Service",
        path: "/hourly-chauffeur",
      },
      {
        id: "event-weddings",
        title: "Event & Weddings",
        path: "/event-weddings",
      },
      {
        id: "chauffeur-services",
        title: "Corporate Chauffeur Services",
        path: "/chauffeur-services",
      },
      {
        id: "chauffeur-service-manchester",
        title: "Chauffeur Service Manchester",
        path: "/chauffeur-service-manchester",
      },
    ],
  },
  {
    id: "top-cities",
    title: "Top Cities",
    submenu: true,
    sublinks: [
      {
        id: "manchester",
        title: "Manchester",
        path: "/manchester-airport",
      },
      {
        id: "liverpool",
        title: "Liverpool",
        path: "/liverpool-airport",
      },
      {
        id: "london",
        title: "London",
        path: "/london-chauffeur-service",
      },
      {
        id: "leeds",
        title: "Leeds",
        path: "/leeds",
      },
      {
        id: "birmingham",
        title: "Birmingham",
        path: "/birmingham-chauffeur-service",
      },
    ],
  },
  {
    id: "fleet",
    title: "Fleets",
    path: "/fleet",
  },
  {
    id: "driver",
    title: "Driver",
    path: "/driver",
  },
  {
    id: "about",
    title: "About",
    path: "/about",
  },
  {
    id: "contact",
    title: "Contact",
    path: "/contact",
  },
];

const BLACK_HEADER_ROUTES = [
  "/contact",
  "/terms",
  "/cookies",
  "/faqs",
  "/privacy",
  "/driver",
];

const LIGHT_BACKGROUND_ROUTES = [
  "/book-ride/select-car",
  "/book-ride/passenger-details",
  "/order-placed",
];

const SCROLL_THRESHOLD = 50;
const MOBILE_BREAKPOINT = 786;
const PHONE_NUMBER = "+44 7788 710290";

// Reusable Components
const SocialIcons = ({ onClick }: { onClick?: () => void }) => (
  <div className="flex items-center gap-3">
    <a
      href="https://wa.me/+447788710290"
      target="_blank"
      rel="noopener noreferrer"
      className="group text-white/70 transition-all duration-300 hover:text-primary-yellow hover:scale-110"
      onClick={onClick}
      aria-label="WhatsApp"
    >
      <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-300" />
    </a>
    <a
      href="https://www.instagram.com/oktax_is/"
      target="_blank"
      rel="noopener noreferrer"
      className="group text-white/70 transition-all duration-300 hover:text-pink-500 hover:scale-110"
      onClick={onClick}
      aria-label="Instagram"
    >
      <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-300" />
    </a>
  </div>
);

const MobileMenuButton = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    className="relative z-10 md:hidden mobile-menu-button"
    onClick={onClick}
    aria-label="Toggle menu"
    aria-expanded={isOpen}
  >
    <div className="relative w-6 h-6 sm:w-7 sm:h-7">
      <Menu
        className={`absolute inset-0 text-white transition-all duration-300 ${
          isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
        }`}
      />
      <X
        className={`absolute inset-0 text-white transition-all duration-300 ${
          isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
        }`}
      />
    </div>
  </button>
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const shouldHaveBlackHeader =
    BLACK_HEADER_ROUTES.includes(pathname) || pathname.startsWith("/order/");
  const hasLightBackground = LIGHT_BACKGROUND_ROUTES.some(route => 
    pathname.startsWith(route)
  );
  const isHeaderBlack = shouldHaveBlackHeader || scrolled || hasLightBackground;

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  }, [pathname]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCloseMobileMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const getFontWeight = (isActive: boolean) => {
    return isHeaderBlack ? "font-normal" : "font-bold";
  };

  // Handle click outside for both mobile menu and desktop services dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (
        isOpen &&
        !target.closest(".mobile-menu-full-width-section") &&
        !target.closest(".mobile-menu-button")
      ) {
        handleCloseMobileMenu();
      }

      if (
        openDropdown &&
        !target.closest(".services-dropdown-full-width-section") &&
        window.innerWidth >= MOBILE_BREAKPOINT
      ) {
        setOpenDropdown(null);
      }
    };

    if (isOpen || openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, openDropdown]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isHeaderBlack
            ? "bg-heading-black shadow-md text-white"
            : "text-white"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 relative pt-3 sm:pt-4 md:pt-5">
          {/* Top Row: Phone | Logo | Social Icons */}
          <div className="flex items-center justify-between py-0 sm:py-4 md:border-b md:border-white/10">
            <div className="hidden md:flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="text-sm md:text-base font-medium hover:text-primary-yellow transition-colors"
              >
                {PHONE_NUMBER}
              </a>
            </div>

            {/* Logo - Left on Mobile, Center on Desktop */}
            <div className="flex md:absolute md:left-1/2 md:transform md:-translate-x-1/2 items-center">
              <Link href="/" className="relative w-32 h-14 md:w-40 md:h-14 cursor-pointer transition-transform duration-300 hover:scale-105">
                <Image
                  src={WhiteLogo}
                  alt="OKTaxis"
                  fill
                  className="object-contain transition-opacity"
                  priority
                />
              </Link>
            </div>

            {/* Social Icons & Mobile Menu - Right */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Social Icons - Hidden on mobile */}
              <div className="hidden md:flex">
                <SocialIcons onClick={() => setIsOpen(false)} />
              </div>
              
              {/* Mobile Menu Button */}
              <MobileMenuButton isOpen={isOpen} onClick={toggleMobileMenu} />
            </div>
          </div>

          {/* Bottom Row: Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2 py-2 sm:py-3">
            {NAV_LINKS.map((link) => (
              <div
                key={link.id}
                className="relative services-dropdown-full-width-section"
              >
                {link.submenu ? (
                  <div
                    className="relative services-dropdown-full-width-section group"
                    onMouseEnter={() => {
                      if (hoverTimeout) {
                        clearTimeout(hoverTimeout);
                        setHoverTimeout(null);
                      }
                      setOpenDropdown(link.id);
                    }}
                    onMouseLeave={() => {
                      const timeout = setTimeout(() => {
                        setOpenDropdown(null);
                      }, 100);
                      setHoverTimeout(timeout);
                    }}
                  >
                    <Link
                      href={link.path || "#"}
                      className={`relative flex items-center px-3 py-1.5 lg:px-4 text-sm lg:text-base font-medium transition-colors hover:text-primary-yellow ${getFontWeight(
                        openDropdown === link.id
                      )}`}
                      aria-haspopup="true"
                    >
                      <span className={`relative pb-0.8 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:bg-primary-yellow before:transition-all before:duration-300 ${
                        openDropdown === link.id
                          ? "text-primary-yellow before:w-full"
                          : "before:w-0 hover:before:w-full"
                      }`}>
                        {link.title}
                      </span>
                      <ChevronDown
                        className={`ml-1 h-3.5 w-3.5 lg:h-4 lg:w-4 transition-transform duration-200 ${
                          openDropdown === link.id ? "rotate-180" : ""
                        }`}
                      />
                    </Link>
                    {openDropdown === link.id && (
                      <div 
                        className="absolute left-0 top-full w-48 lg:w-64"
                        style={{ paddingTop: '8px' }}
                        onMouseEnter={() => {
                          if (hoverTimeout) {
                            clearTimeout(hoverTimeout);
                            setHoverTimeout(null);
                          }
                          setOpenDropdown(link.id);
                        }}
                        onMouseLeave={() => {
                          const timeout = setTimeout(() => {
                            setOpenDropdown(null);
                          }, 100);
                          setHoverTimeout(timeout);
                        }}
                      >
                        <div className="relative rounded-md bg-heading-black shadow-lg border border-gray-700 animate-in slide-in-from-top-2 duration-200">
                          {/* Arrow pointing up */}
                          <div className="absolute -top-2 left-6 w-4 h-4">
                            <div className="w-full h-full bg-heading-black border-l-2 border-t-2 border-gray-700 transform rotate-45"></div>
                          </div>
                          <div className="p-2 relative z-10 bg-heading-black rounded-md">
                            {link.sublinks?.map((sublink) => (
                              <Link
                                key={sublink.id}
                                href={sublink.path}
                                className="block px-3 py-2 text-sm lg:text-base text-white hover:text-primary-yellow hover:bg-gray-800 rounded transition-colors"
                              >
                                {sublink.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.path || "#"}
                    className={`relative px-3 py-1.5 lg:px-4 text-sm lg:text-base font-medium transition-colors hover:text-primary-yellow ${getFontWeight(
                      pathname === link.path
                    )}`}
                  >
                    <span className={`relative pb-0.5 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:bg-primary-yellow before:transition-all before:duration-300 ${
                      pathname === link.path
                        ? "text-primary-yellow before:w-full"
                        : "before:w-0 hover:before:w-full"
                    }`}>
                      {link.title}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        className={`mobile-menu-full-width-section fixed top-0 left-0 right-0 bottom-0 z-[60] md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-full pointer-events-none"
        }`}
      >
        <div className="bg-heading-black h-full flex flex-col overflow-hidden">
          {/* Header Section - Logo and Close Button */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <Link href="/" onClick={handleCloseMobileMenu} className="relative w-40 h-14 cursor-pointer transition-transform duration-300 hover:scale-105 -ml-4">
                <Image
                  src={WhiteLogo}
                  alt="OKTaxis"
                  fill
                  className="object-contain transition-opacity"
                  priority
                />
              </Link>
            </div>
            <button
              onClick={handleCloseMobileMenu}
              className="text-white hover:text-primary-yellow transition-colors"
              aria-label="Close menu"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <div
                key={link.id}
                className="border-b border-gray-700"
              >
                {link.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.id)}
                      className={`flex items-center justify-between w-full text-left py-4 text-base font-medium uppercase transition-colors ${
                        pathname.startsWith("/services")
                          ? "text-amber-500"
                          : "text-white hover:text-amber-500"
                      }`}
                      aria-expanded={openDropdown === link.id}
                      aria-haspopup="true"
                    >
                      {link.title}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          openDropdown === link.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openDropdown === link.id
                          ? "max-h-96 opacity-100 transform translate-y-0"
                          : "max-h-0 opacity-0 transform -translate-y-2"
                      }`}
                    >
                      <div className="pl-4 pb-3 space-y-2">
                        {link.sublinks?.map((sublink, index) => (
                          <Link
                            key={sublink.id}
                            href={sublink.path}
                            onClick={handleCloseMobileMenu}
                            className={`block py-2 text-sm transition-all duration-200 ${
                              pathname === sublink.path
                                ? "text-amber-500"
                                : "text-gray-300 hover:text-amber-500"
                            }`}
                            style={{
                              transitionDelay:
                                openDropdown === link.id
                                  ? `${index * 50}ms`
                                  : "0ms",
                            }}
                          >
                            {sublink.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.path || "#"}
                    onClick={handleCloseMobileMenu}
                    className={`block py-4 text-base font-medium uppercase transition-colors ${
                      pathname === link.path
                        ? "text-amber-500"
                        : "text-white hover:text-amber-500"
                    }`}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
