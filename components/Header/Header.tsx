"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import WhiteLogo from "@/assets/logo-white.png";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

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

const navLinks: NavLink[] = [
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
        title: "Chauffeur Services",
        path: "/chauffeur-services",
      },
      {
        id: "city-tours",
        title: "City Tours",
        path: "/city-tours",
      },
      {
        id: "stadium-transfer",
        title: "Stadium Transfer",
        path: "/stadium-transfer",
      },
      {
        id: "city-center",
        title: "Manchester City Center",
        path: "/city-center",
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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // const [isAnimating, setIsAnimating] = useState(false)
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const shouldHaveBlackHeader =
    ["/contact", "/terms", "/cookies", "/faqs", "/privacy", "/driver"].includes(
      pathname
    ) || pathname.startsWith("/blog/");

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle click outside for both mobile menu and desktop services dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Handle mobile menu click outside
      if (
        isOpen &&
        !target.closest(".mobile-menu-container") &&
        !target.closest(".mobile-menu-button")
      ) {
        handleCloseMobileMenu();
      }

      // Handle desktop services dropdown click outside
      const width = window.innerWidth;

      console.log("width : ", width);
      if (
        openDropdown &&
        !target.closest(".services-dropdown-container") &&
        width >= 786
      ) {
        console.log("work");
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

  const handleOpenMobileMenu = () => {
    // setIsAnimating(true)
    setIsOpen(true);
  };

  const handleCloseMobileMenu = () => {
    // setIsAnimating(true)
    setIsOpen(false);
    setOpenDropdown(null);
    // setTimeout(() => setIsAnimating(false), 300)
  };

  const toggleMobileMenu = () => {
    if (isOpen) {
      handleCloseMobileMenu();
    } else {
      handleOpenMobileMenu();
    }
  };

  const toggleDropdown = (id: string) => {
    console.log();
    setOpenDropdown((prev) => {
      console.log("prev : ", prev);
      console.log("id: ", id);
      return prev === id ? null : id;
    });
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    handleCloseMobileMenu();
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${shouldHaveBlackHeader
          ? "bg-[#000000] shadow-md py-4 text-white"
          : scrolled
            ? "bg-[#000000] shadow-md py-4 text-white"
            : "py-4 text-white"
          }`}
      >
        <div className="max-w-screen-2xl mx-auto px-3 md:px-6 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center justify-between w-full md:w-auto">
              {/* Logo */}
              <div className="relative w-32 h-10 md:w-40 md:h-14 cursor-default">
                <Image
                  src={shouldHaveBlackHeader || scrolled ? WhiteLogo : WhiteLogo}
                  alt="OKTaxis"
                  fill
                  className="object-contain transition-opacity"
                  priority
                />
              </div>

              {/* Social buttons for mobile only */}
              <div className="flex items-center gap-5 md:hidden mr-8">
               

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/oktax_is/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-md bg-[#F56040] text-white shadow"
                  onClick={() => setIsOpen(false)}
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-8 h-8" />
                </a>
                 {/* WhatsApp */}
                <a
                  href="https://wa.me/+447788710290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9   rounded-md bg-[#25D366] text-white shadow"
                  onClick={() => setIsOpen(false)}
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-8 h-8" />
                </a>
              </div>

            </div>



            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-1 md:flex">
              {navLinks.map((link) => (
                <div
                  key={link.id}
                  className="relative services-dropdown-container"
                >
                  {link.submenu ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.id)}
                        className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${pathname.startsWith("/services") &&
                          openDropdown === link.id
                          ? shouldHaveBlackHeader || scrolled
                            ? "font-normal"
                            : "font-bold"
                          : shouldHaveBlackHeader || scrolled
                            ? "font-normal"
                            : "font-bold"
                          }`}
                        aria-expanded={openDropdown === link.id}
                        aria-haspopup="true"
                      >
                        {link.title}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdown === link.id ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      {openDropdown === link.id && (
                        <div className="absolute left-0 top-full mt-2 w-56 rounded-md bg-white shadow-lg border animate-in slide-in-from-top-2 duration-200">
                          <div className="p-2">
                            {link.sublinks?.map((sublink) => (
                              <Link
                                key={sublink.id}
                                href={sublink.path}
                                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded transition-colors"
                              // onClick={() => {setTimeout(()=>{setOpenDropdown(null)},500)}}
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
                      className={`px-4 py-2 text-sm font-medium transition-colors ${pathname === link.path
                        ? shouldHaveBlackHeader || scrolled
                          ? "font-normal"
                          : "font-bold"
                        : shouldHaveBlackHeader || scrolled
                          ? "font-normal"
                          : "font-bold"
                        }`}
                    >
                      {link.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Call Button */}
            <div className="hidden md:flex items-center space-x-3 ml-2">
            
              <a
                href="https://www.instagram.com/oktax_is/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all bg-white text-black hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <FaInstagram className="mr-2 h-5 w-5" />
                Instagram
              </a>
                <a
                href="https://wa.me/+447788710290"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all bg-white text-black hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <FaWhatsapp className="mr-2 h-5 w-5" />
                WhatsApp Us
              </a>
            </div>


            {/* Mobile Menu Button */}
            <button
              className="relative z-10 md:hidden mobile-menu-button"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 text-white transition-all duration-300 ${isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    }`}
                />
                <X
                  className={`absolute inset-0 text-white transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        className={`mobile-menu-container fixed top-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-in-out ${isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        style={{
          paddingTop: headerRef.current?.offsetHeight || 80,
        }}
      >
        <div className="bg-black/95 backdrop-blur-sm shadow-lg border-t border-gray-700">
          <nav className="px-4 py-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
            {navLinks.map((link) => (
              <div
                key={link.id}
                className="border-b border-gray-700 last:border-b-0 pb-1 last:pb-0"
              >
                {link.submenu ? (
                  <div>
                    <button
                      onClick={() => {
                        console.log("clicked ");
                        console.log("openDropdow ", openDropdown);
                        if (openDropdown === link.id) {
                          setOpenDropdown(null);
                        } else {
                          setOpenDropdown(link.id);
                        }
                      }}
                      className={`flex items-center justify-between w-full text-left py-2 text-lg font-medium transition-colors ${pathname.startsWith("/services")
                        ? "text-amber-500"
                        : "text-white hover:text-amber-500"
                        }`}
                      aria-expanded={openDropdown === link.id}
                      aria-haspopup="true"
                    >
                      {link.title}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${openDropdown === link.id ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === link.id
                        ? "max-h-96 opacity-100 transform translate-y-0"
                        : "max-h-0 opacity-0 transform -translate-y-2"
                        }`}
                    >
                      <div className="pl-4 pt-2 space-y-2">
                        {link.sublinks?.map((sublink, index) => (
                          <Link
                            key={sublink.id}
                            href={sublink.path}
                            className={`block py-2 text-base transition-all duration-200 ${pathname === sublink.path
                              ? "text-amber-500"
                              : "text-gray-300 hover:text-amber-500"
                              }`}
                            style={{
                              transitionDelay:
                                openDropdown === link.id
                                  ? `${index * 50}ms`
                                  : "0ms",
                            }}
                          // onClick={closeAllDropdowns}
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
                    className={`block py-2 text-lg font-medium transition-colors ${pathname === link.path
                      ? "text-amber-500"
                      : "text-white hover:text-amber-500"
                      }`}
                  // onClick={closeAllDropdowns}
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
