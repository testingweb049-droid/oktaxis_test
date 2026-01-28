"use client";

import ContactForm from "@/components/contact-form/contact-form";
import ContactTeamSection from "@/components/contact-team-section";
import ThankYouSection from "@/components/thank-you-section";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <>
      <section className="relative w-full min-h-[700px] md:min-h-[800px] overflow-hidden pt-24 md:pt-32">
        <div className="absolute inset-0">
          <Image
            src="/contact-page.png"
            alt="Contact Us"
            fill
            className="object-cover object-center grayscale"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <ContactForm />
            </div>
            <div className="flex flex-col justify-center lg:justify-end h-full space-y-8 text-white order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
                Contact Us
                </h1>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="tel:+447788710290"
                  className="bg-white rounded-full px-6 py-2 flex items-center gap-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Phone className="text-gray-900 w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-900 font-medium underline">+44 7788 710290</span>
                </a>
                
                <a
                  href="mailto:info@oktaxis.co.uk"
                  className="bg-white rounded-full px-6 py-2 flex items-center gap-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Mail className="text-gray-900 w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-900 font-medium underline">info@oktaxis.co.uk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ThankYouSection />

      {/* <ContactTeamSection /> */}
    </>
  );
};

export default Contact;
