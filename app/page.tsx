import HeroSection from "@/components/home/hero-section"
import Services from "@/components/home/services"
import FleetClasses from "@/components/home/fleet"
import ReadyToBook from "@/components/home/read-to-book"
import Testimonials from "@/components/home/testimonials"
import AboutSection from "@/components/home/about"
import LuxuryExperience from "@/components/home/luxury-experience"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <Services />
      <LuxuryExperience />
      <FleetClasses />
      <ReadyToBook />
      <Testimonials />
    </main>
  )
}
