
"use client"
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    title?: string;
    highlightText?: string;
    subtitle?: string;
    faqs?: FAQItem[];
    highlightColor?: string;
    defaultOpenIndex?: number | null;
}

const FAQSection: React.FC<FAQSectionProps> = ({
    title = "FAQS (",
    highlightText = "FREQUENTLY ASKED QUESTIONS",
    subtitle = ")",
    faqs = [
        {
            question: "How do I book my taxi service in London?",
            answer: "You can book your taxi service through our website, mobile app, or by calling our 24/7 customer service hotline. Simply provide your pickup location, destination, date, and time, and we'll handle the rest."
        },
        {
            question: "Do you offer fixed pricing for airport journeys?",
            answer: "Yes, we offer transparent fixed pricing for all airport transfers. You'll know the exact cost upfront with no hidden fees or surge pricing, regardless of traffic conditions."
        },
        {
            question: "What makes you the best taxi service in London UK?",
            answer: "Our commitment to excellence includes professional drivers, modern fleet, 24/7 availability, competitive pricing, and exceptional customer service. We monitor flights for airport pickups and guarantee on-time arrivals."
        },
        {
            question: "What time details do I need to provide when booking?",
            answer: "Please provide your desired pickup time, and for airport transfers, your flight number and arrival time. We track flights automatically and adjust pickup times if your flight is delayed."
        }
    ],
    highlightColor = "text-yellow-500",
    defaultOpenIndex = null
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container py-12 md:py-16 lg:py-20">
            <div className="px-4 sm:px-6 lg:px-8 py-20">

                {/* Header Section */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                        {title}<span className={highlightColor}>{highlightText}</span>{subtitle}
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg">
                        Your Questions, Answered
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b border-gray-200 last:border-b-0"
                        >
                            {/* Question Button */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between py-5 text-left hover:text-gray-600 transition-colors duration-200"
                            >
                                <span className="text-base sm:text-lg font-medium text-gray-800 pr-8">
                                    {faq.question}
                                </span>
                                <span className="shrink-0">
                                    {openIndex === index ? (
                                        <Minus className="w-6 h-6 text-gray-600" />
                                    ) : (
                                        <Plus className="w-6 h-6 text-gray-600" />
                                    )}
                                </span>
                            </button>

                            {/* Answer */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index
                                    ? 'max-h-96 opacity-100 mb-5'
                                    : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed pr-12">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default FAQSection;

