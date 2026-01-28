"use client";

import RegisterDriverForm from "@/components/driver-form/register-driver-form";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DriverApplyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="/partner-with-us.jpg"
          alt="Apply to be a driver"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 h-full flex items-end justify-center pb-12 md:pb-16 px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Apply to Partner with Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200">
              Join our team of professional chauffeurs
            </p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full mx-auto">
            {/* Back Button */}
            <Link
              href="/driver"
              className="inline-flex items-center gap-2 text-text-gray hover:text-heading-black transition-colors mb-6 md:mb-8"
            >
              <ArrowLeft size={20} />
              <span className="text-sm md:text-base">Back to Driver Information</span>
            </Link>
            <div>
              <RegisterDriverForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

