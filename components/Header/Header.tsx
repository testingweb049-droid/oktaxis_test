"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
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

const SCROLL_THRESHOLD = 50;
const MOBILE_BREAKPOINT = 786;

// Reusable Components
const SocialIcons = ({ onClick }: { onClick?: () => void }) => (
  <div className="flex items-center gap-3 mr-10">
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
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const shouldHaveBlackHeader =
    BLACK_HEADER_ROUTES.includes(pathname) || pathname.startsWith("/order/");
  const isHeaderBlack = shouldHaveBlackHeader || scrolled;

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
  }, [pathname]);

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
            ? "bg-heading-black shadow-md py-3 sm:py-4 md:py-5 text-white"
            : "py-3 sm:py-4 md:py-5 text-white"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="relative w-28 h-8 sm:w-32 sm:h-10 md:w-40 md:h-14 cursor-default">
                <Image
                  src={WhiteLogo}
                  alt="OKTaxis"
                  fill
                  className="object-contain transition-opacity"
                  priority
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-1 sm:space-x-2 md:flex">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.id}
                  className="relative services-dropdown-full-width-section"
                >
                  {link.submenu ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.id)}
                        className={`flex items-center px-3 py-2 sm:px-4 md:px-5 text-sm sm:text-base md:text-lg font-medium transition-colors ${getFontWeight(
                          openDropdown === link.id
                        )}`}
                        aria-expanded={openDropdown === link.id}
                        aria-haspopup="true"
                      >
                        {link.title}
                        <ChevronDown
                          className={`ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-transform duration-200 ${
                            openDropdown === link.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === link.id && (
                        <div className="absolute left-0 top-full mt-2 w-48 sm:w-56 md:w-64 rounded-md bg-white shadow-lg border animate-in slide-in-from-top-2 duration-200">
                          <div className="p-2">
                            {link.sublinks?.map((sublink) => (
                              <Link
                                key={sublink.id}
                                href={sublink.path}
                                className="block px-3 py-2 sm:px-4 text-sm sm:text-base md:text-lg text-gray-800 hover:bg-gray-100 rounded transition-colors"
                              >
                                {sublink.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.path || "#"}
                      className={`px-3 py-2 sm:px-4 md:px-5 text-sm sm:text-base md:text-lg font-medium transition-colors ${getFontWeight(
                        pathname === link.path
                      )}`}
                    >
                      {link.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Social Icons */}
            <SocialIcons onClick={() => setIsOpen(false)} />

            {/* Mobile Menu Button */}
            <MobileMenuButton isOpen={isOpen} onClick={toggleMobileMenu} />
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        className={`mobile-menu-full-width-section fixed top-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={{
          paddingTop: headerRef.current?.offsetHeight || 80,
        }}
      >
        <div className="bg-black/95 backdrop-blur-sm shadow-lg border-t border-gray-700">
          <nav className="px-4 sm:px-6 py-4 sm:py-6 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <div
                key={link.id}
                className="border-b border-gray-700 last:border-b-0 pb-2 sm:pb-3 last:pb-0"
              >
                {link.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.id)}
                      className={`flex items-center justify-between w-full text-left py-2 sm:py-3 text-base sm:text-lg md:text-xl font-medium transition-colors ${
                        pathname.startsWith("/services")
                          ? "text-amber-500"
                          : "text-white hover:text-amber-500"
                      }`}
                      aria-expanded={openDropdown === link.id}
                      aria-haspopup="true"
                    >
                      {link.title}
                      <ChevronDown
                        className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 ${
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
                      <div className="pl-4 sm:pl-6 pt-2 sm:pt-3 space-y-2 sm:space-y-3">
                        {link.sublinks?.map((sublink, index) => (
                          <Link
                            key={sublink.id}
                            href={sublink.path}
                            className={`block py-2 sm:py-2.5 text-sm sm:text-base md:text-lg transition-all duration-200 ${
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
                    className={`block py-2 sm:py-3 text-base sm:text-lg md:text-xl font-medium transition-colors ${
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
