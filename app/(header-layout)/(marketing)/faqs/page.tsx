"use client";

import Link from "next/link";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQS = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

 const faqs = [
    {
      question: "How do I book a taxi with OK Taxis?",
      answer: "You can book via our website, mobile app, or by calling our customer service line."
    },
    {
      question: "What areas do you serve?",
      answer: "We operate in Manchester and surrounding cities, including Liverpool, Leeds, and Chester."
    },
    {
      question: "What types of vehicles are available?",
      answer: "Our fleet includes Skoda Octavia, Toyota Prius, XL Passenger Vans, Tesla Model S, BMW 5 Series, and Mercedes E-Class."
    },
    {
      question: "Can I request a specific vehicle?",
      answer: "Yes, you can specify your preferred vehicle during the booking process, subject to availability."
    },
    {
      question: "Are your drivers licensed and insured?",
      answer: "Absolutely. All our drivers are fully licensed and insured in compliance with UK regulations."
    },
    {
      question: "Do you offer airport transfers?",
      answer: "Yes, we provide reliable airport transfer services to and from major airports."
    },
    {
      question: "How can I pay for my ride?",
      answer: "Payments can be made via credit/debit card or cash directly to the driver."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made [Insert Timeframe] in advance may be eligible for a refund. Please refer to our Terms & Conditions for details."
    },
    {
      question: "Do you provide child seats?",
      answer: "Yes, child seats are available upon request. Please mention this requirement during booking."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us via phone at [Insert Phone Number] or email at [Insert Email Address]."
    },
    {
      question: "Which stadiums do you provide transfers to?",
      answer: "We offer transfers to major stadiums including Old Trafford, Etihad Stadium, Anfield, and others across Manchester and nearby cities."
    },
    {
      question: "Can I book a return trip for a match or event?",
      answer: "Absolutely. We provide round-trip services to ensure you have reliable transportation to and from the stadium."
    },
    {
      question: "Do you accommodate group bookings?",
      answer: "Yes, our fleet includes XL Passenger Vans and other spacious vehicles suitable for groups attending events together."
    },
    {
      question: "Are there additional charges on event days?",
      answer: "Due to increased demand and potential road closures, there may be a surcharge on major event days. This will be communicated during booking."
    },
    {
      question: "How early should I book for a stadium event?",
      answer: "We recommend booking at least 24 hours in advance to guarantee availability, especially during high-demand events."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16 pt-32">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find quick answers to common questions about our services
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300"
          >
            <button
              className={`w-full flex justify-between items-center p-6 text-left transition-colors ${
                activeIndex === index ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-${index}`}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {faq.question}
              </h3>
              <span className={`ml-4 text-blue-600 transition-transform ${
                activeIndex === index ? 'rotate-180' : ''
              }`}>
                <FiChevronDown size={20} />
              </span>
            </button>
            
            <div 
              id={`faq-${index}`}
              className={`px-6 overflow-hidden transition-all duration-300 ${
                activeIndex === index 
                  ? 'max-h-96 pb-6 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pt-2 text-gray-600">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our customer support team is available 24/7 to assist you
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href='/contact' className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Contact Us
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQS;