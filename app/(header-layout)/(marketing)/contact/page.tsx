"use client";

import ContactForm from "@/components/ContactForm/ContactForm";
import { homePageData } from "@/constants/homePageData";
import Seo from "../../../../components/seo";
const Contact = () => {
  const { subtitle } = homePageData.contactFormSection;

  return (
    <>
    <Seo
        title="Contact OKTaxis | 24/7 Chauffeur & Airport Transfers in Manchester"
        description="Get in touch with OKTaxis for luxury chauffeur service and airport transfers across Manchester and Liverpool. Available 24/7 via phone or email."
        url="https://oktaxis.co.uk/contact"
        image="https://oktaxis.com/og-image.jpg" // Make sure this exists
        breadcrumbs={[
          { position: 1, name: "Contact", item: "https://oktaxis.co.uk/contact" },
          { position: 2, name: "Contact" }
        ]}
      />
      <div className="w-full flex flex-col gap-16 items-center pt-32 pb-20 px-4 bg-white">
        {/* ───────────────────────── 1. Header ───────────────────────── */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {
                <span className="text-3xl md:text-4xl font-bold">
                  Contact{' '}
                  <span className="text-brand text-3xl md:text-4xl font-bold"> OKTaxis</span>{' '}
              
                </span>
              }
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Luxury Chauffeur &amp; Airport Transfers in Manchester &amp;
            Liverpool
          </p>
          <p className="mt-4 text-md md:text-lg text-gray-600">
            For bookings and inquiries, OKTaxis is here for you 24/7. Contact us
            today to book your luxury transfer or request a personalized quote.
          </p>
        </div>

        {/* ──────────────────────── 2. Get-in-Touch Form ──────────────────────── */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-xl p-6 flex flex-col items-center">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-2">{subtitle}</h2>
            <p className="text-gray-600">
              Fill out the form below and we’ll get back to you as soon as
              possible.
            </p>
          </div>
          <div className="w-full">
            <ContactForm />
          </div>
        </div>

        {/* ──────────────────────── 3. Additional Info Blurb ──────────────────────── */}
        <div className="max-w-3xl text-center text-gray-600 px-4">
          Our friendly customer support team is available around the clock to
          assist with last-minute bookings or special requests. Book your luxury
          chauffeur service with OKTaxis today and enjoy a stress-free, VIP
          travel experience.
        </div>

        {/* ─────────────────── 4. Phone • Email • Service Areas (Bottom) ─────────────────── */}
        <div className="grid md:grid-cols-3 gap-8 p-6 bg-white shadow-2xl border border-gray-100 rounded-xl max-w-screen-lg w-full">
          <div className="flex flex-col gap-2 items-center text-center">
            <div className="text-xl font-semibold">Phone (24/7)</div>
            <p className="text-gray-700">Call us anytime</p>
            <p className="font-semibold text-brand">+44 7342&nbsp;193341</p>
          </div>
          <div className="flex flex-col gap-2 items-center text-center">
            <div className="text-xl font-semibold">Email</div>
            <p className="text-gray-700">Send us an email</p>
            <p className="font-semibold text-brand">info@oktaxis.co.uk</p>
          </div>
          <div className="flex flex-col gap-2 items-center text-center">
            <div className="text-xl font-semibold">Service Areas</div>
            <p className="text-gray-700">
              Manchester, Liverpool,
              <br />
              All UK Airports
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
