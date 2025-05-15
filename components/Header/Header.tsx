"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone, Menu, X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import Logo from "@/assets/logo.png"
// Using the navLinks from your existing code
const navLinks = [
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
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
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

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div className="relative h-12 w-40">
              <Image
                src={Logo}
                alt="OKTaxis"
                fill
                className={`object-contain transition-opacity ${scrolled ? "opacity-100" : "opacity-0"}`}
              />
              <Image
                src={Logo}
                alt="OKTaxis"
                fill
                className={`object-contain brightness-0 invert transition-opacity ${scrolled ? "opacity-0" : "opacity-100"
                  }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                className={`px-4 py-2 text-sm font-medium transition-colors ${pathname === link.path
                    ? scrolled
                      ? "bg-black text-white"
                      : "bg-white text-black"
                    : scrolled
                      ? "text-gray-900 hover:bg-gray-100"
                      : "text-white hover:bg-white/20"
                  }`}
              >
                {link.title}
              </Link>
            ))}

            {/* Call Button */}
            <a
              href="tel:07788710290"
              className={`ml-2 flex items-center px-4 py-2 text-sm font-medium transition-all ${scrolled ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-100"
                }`}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="relative z-10 md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? (
              <X className={scrolled ? "text-gray-900" : "text-white"} />
            ) : (
              <Menu className={scrolled ? "text-gray-900" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col items-center justify-center p-8">
          <nav className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                className={`text-xl font-medium transition-colors ${pathname === link.path ? "text-amber-500" : "text-white hover:text-amber-500"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </Link>
            ))}

            {/* Call Button */}
            <a
              href="tel:07788710290"
              className="mt-4 flex items-center rounded-md bg-white px-6 py-3 text-black transition-colors hover:bg-amber-500 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
