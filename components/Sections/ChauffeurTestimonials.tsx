"use client";

import Heading from "@/components/Heading";
import Image from "next/image";

interface Testimonial {
  initial: string;
  text: string;
  author: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    initial: "S",
    text: "I’m proud to be part of OKtaxis and to work with such a professional and supportive team. From day one, I felt respected and valued. The management genuinely cares about drivers and clients alike, which makes every journey enjoyable. Working with OKtaxis feels less like a job and more like being part of a reliable, growing family.",
    author: "Jim, Tesla Model S",
    image: "/assets/clients/client-1.jpg",
  },
  {
    initial: "D",
    text: "Working for OKtaxis has been a great experience. The client base is excellent, the system is well organised, and the support team is always there when you need them. You truly feel that you’re part of something professional and trustworthy. Choosing OKtaxis was one of the best decisions I’ve made in my driving career.",
    author: "Doe, Skoda Octavia",
    
  },
  {
    initial: "A",
    text: "OKtaxis stands out because of its professionalism and respect for drivers. The communication is clear, the work is consistent, and the clients are courteous. I’ve worked with other taxi companies before, but OKtaxis makes you feel appreciated and part of a strong team.",
    author: "Alexander, Mercedes S-Class",
    
  },
  {
    initial: "J",
    text: "Being a driver with OKtaxis has been a rewarding experience. The company maintains high standards, values professionalism, and treats drivers with respect. It’s motivating to work for a brand that truly cares about both its drivers and its customers.",
    author: "John, Toyota Prius",
    image: "/assets/clients/client-2.jpg",
  },
];

export default function ChauffeurTestimonials() {
  return (
    <section className="font-montserrat bg-light-background py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl">
          <Heading
            as="h2"
            align="left"
            className="text-heading-black mb-2 !md:mb-3"
          >
            What do our chauffeurs say?
          </Heading>
          <p className="text-sm sm:text-base lg:text-xl font-semibold text-black">
            Hear what our drivers say about their experience with us.
          </p>
        </div>

        <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10 xl:gap-x-16 gap-y-16">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="flex items-start gap-4 md:gap-5"
            >
              <div className="flex-shrink-0 h-14 w-14 rounded-full bg-light-background flex items-center justify-center text-base font-semibold text-heading-black overflow-hidden">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  testimonial.initial
                )}
              </div>
              <div>
                <p className="text-lg text-text-gray leading-relaxed">
                  {testimonial.text}
                </p>
                <p className="mt-4 text-sm text-text-gray">
                  <span className="inline-block align-middle mr-2">
                    ___
                  </span>
                  {testimonial.author}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


