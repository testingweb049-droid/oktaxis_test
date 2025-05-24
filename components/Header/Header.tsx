"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import Logo from "@/assets/logo.png"
import WhiteLogo from "@/assets/logo-white.png"
import { FaWhatsapp } from "react-icons/fa"

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
    id: "about",
    title: "About",
    path: "/about",
  },
  {
    id: "services",
    title: "Services",
    submenu: true,
    sublinks: [
      {
        id: "airport-transfer",
        title: "Airport Transfer",
        path: "/services/airport-transfer",
      },
      {
        id: "hourly-chauffeur",
        title: "Hourly Chauffeur Service",
        path: "/services/hourly-chauffeur",
      },
      {
        id: "event-weddings",
        title: "Event & Weddings",
        path: "/services/event-weddings",
      },
      {
        id: "chauffeur-services",
        title: "Chauffeur Services",
        path: "/services/chauffeur-services",
      },
      {
        id: "city-tours",
        title: "City Tours",
        path: "/services/city-tours",
      },
    ]
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
    id: "contact",
    title: "Contact",
    path: "/contact",
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  const closeAllDropdowns = () => {
    setOpenDropdown(null)
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[500] transition-all duration-1000 py-2 ${scrolled ? "bg-[#000000] shadow-md  text-white" : "  text-white"
        } ${isOpen && 'max-md:bg-white max-md:text-black'}`}
    >
      <div className="max-w-screen-2xl mx-auto px-3 md:px-6 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative ">
         
              <Image
                src={isOpen ? Logo : WhiteLogo}
                alt="OKTaxis"
              
                className={`w-40 `}
              />
            
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link) => (
              <div key={link.id} className="relative">
                {link.submenu ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.id)}
                      className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${pathname.startsWith('/services') && openDropdown === link.id
                        ? scrolled
                          ? "font-normal"
                          : "font-bold"
                        : scrolled
                          ? "font-normal"
                          : "font-bold"
                        }`}
                    >
                      {link.title}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${openDropdown === link.id ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === link.id && (
                      <div className="absolute left-0 top-full mt-2 w-56 rounded-md bg-white shadow-lg">
                        <div className="p-2">
                          {link.sublinks?.map((sublink) => (
                            <Link
                              key={sublink.id}
                              href={sublink.path}
                              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                              onClick={closeAllDropdowns}
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
                    href={link.path || '#'}
                    className={`px-4 py-2 text-sm font-medium transition-colors  ${pathname === link.path
                      ? scrolled
                        ? "font-normal"
                        : "font-bold"
                      : scrolled
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
          <a
            href="https://wa.me/447342193341"
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-2 hidden md:flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${scrolled ? "bg-white text-black hover:bg-gray-100" : "bg-white text-black hover:bg-gray-100"
              }`}
            onClick={() => setIsOpen(false)}
          >
            <FaWhatsapp className="mr-2 h-5 w-5" />
            WhatsApp Us
          </a>

          {/* Mobile Menu Button */}
          <button className=" z-[200] md:hidden" onClick={() => { console.log("toggle"); setIsOpen((prev => !prev)) }} >
            {isOpen ? (
              <X className={'text-gray-900'} />
            ) : (
              <Menu className={scrolled ? "text-gray-900" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute w-full top-[115%] p-3 left-0 z-[1000] bg-white border-y border-black text-black transition-all duration-300 ease-in-out md:hidden 
    ${isOpen ? "opacity-100 visible translate-y-0 pointer-events-auto" : "opacity-0 invisible -translate-y-10 pointer-events-none"}`}
        >


          <nav className="flex flex-col items-start divide-y divide-black/50">
            {navLinks.map((link) => (
              <div key={link.id} className="py-2 w-full">
                {link.submenu ? (
                  <div className="w-full">
                    <button
                      onClick={() => toggleDropdown(link.id)}
                      className={`text-xl font-medium w-full transition-colors ${pathname.startsWith('/services') && openDropdown === link.id ? "text-amber-500" : "text-black hover:text-amber-500"
                        }`}
                    >
                      <div className="flex items-center">
                        {link.title}
                        <ChevronDown className={`ml-1 h-5 w-5 transition-transform ${openDropdown === link.id ? "rotate-180" : ""}`} />
                      </div>
                    </button>
                    {openDropdown === link.id && (
                      <div className="mt-2 space-y-3">
                        {link.sublinks?.map((sublink) => (
                          <Link
                            key={sublink.id}
                            href={sublink.path}
                            className="block text-lg  hover:text-amber-500"
                            onClick={closeAllDropdowns}
                          >
                            {sublink.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.path || '#'}
                    className={`text-xl font-medium transition-colors ${pathname === link.path ? "text-amber-500" : " hover:text-amber-500"
                      }`}
                    onClick={closeAllDropdowns}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}

            {/* Call Button */}
            <a
              href="https://wa.me/447342193341"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center rounded-md bg-green-500 px-6 py-3  transition-colors hover:bg-green-600"
              onClick={closeAllDropdowns}
            >
              <FaWhatsapp className="mr-2 h-5 w-5" />
              WhatsApp Us
            </a>
          </nav>

        </div>
      </div>


    </header>
  )
}