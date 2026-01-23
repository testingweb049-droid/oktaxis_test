"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const PrivacyPolices = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const overlay = overlayRef.current;

    if (overlay) {
      overlay.style.opacity = "0.7";
      setTimeout(() => {
        overlay.style.transition = "opacity 1.5s ease-out";
        overlay.style.opacity = "0.5";
      }, 100);
    }

    if (title) {
      title.style.opacity = "0";
      title.style.transform = "translateY(30px)";
      setTimeout(() => {
        title.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";
      }, 300);
    }

    if (subtitle) {
      subtitle.style.opacity = "0";
      subtitle.style.transform = "translateY(30px)";
      setTimeout(() => {
        subtitle.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        subtitle.style.opacity = "1";
        subtitle.style.transform = "translateY(0)";
      }, 600);
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <Image
          src="/assets/airport-transfer-images/airport-banner-img.png"
          alt="Privacy Policy"
          fill
          className="object-cover object-top"
          priority
        />
        <div ref={overlayRef} className="absolute inset-0 bg-black" />
        <div className="relative z-10 h-full flex items-end justify-center pb-12 md:pb-16 px-4">
          <div className="text-center text-white max-w-4xl">
            <h1
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Privacy Policy
            </h1>
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200"
            >
              Last updated: November 20, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="mb-8 md:mb-12">
              <p className="text-base md:text-lg text-text-gray leading-relaxed">
                This Privacy Policy describes how OKTaxis ("we", "us", "our", "the Company") collects, uses, stores, shares, protects, and discloses personal information when you use our taxi and chauffeur services and our website{" "}
                <a
                  href="https://oktaxis.co.uk/"
                  className="text-primary-yellow hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://oktaxis.co.uk/
                </a>{" "}
                ("Service"). We are committed to protecting your privacy in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
              <p className="text-base md:text-lg text-text-gray leading-relaxed mt-4">
                By using our Service, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </div>

            {/* Section 1: Interpretation and Definitions */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                1. Interpretation and Definitions
              </h2>
              
              <h3 className="text-xl md:text-2xl font-semibold text-heading-black mb-4 mt-6">
                Interpretation
              </h3>
              <p className="text-base md:text-lg text-text-gray leading-relaxed mb-6">
                Words with initial capital letters have meanings defined under the following conditions. These definitions apply in both singular and plural.
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-heading-black mb-4 mt-6">
                Definitions
              </h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-lg md:text-xl font-semibold text-heading-black mb-2">
                    Account
                  </dt>
                  <dd className="text-base md:text-lg text-text-gray leading-relaxed ml-4">
                    Means a unique account created for you to access our Service.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg md:text-xl font-semibold text-heading-black mb-2">
                    Company
                  </dt>
                  <dd className="text-base md:text-lg text-text-gray leading-relaxed ml-4">
                    Refers to OKTaxis.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg md:text-xl font-semibold text-heading-black mb-2">
                    Cookies
                  </dt>
                  <dd className="text-base md:text-lg text-text-gray leading-relaxed ml-4">
                    Small files placed on your device by a website containing details of your browsing history and preferences.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg md:text-xl font-semibold text-heading-black mb-2">
                    Personal Data
                  </dt>
                  <dd className="text-base md:text-lg text-text-gray leading-relaxed ml-4">
                    Any information relating to an identified or identifiable individual.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg md:text-xl font-semibold text-heading-black mb-2">
                    Service
                  </dt>
                  <dd className="text-base md:text-lg text-text-gray leading-relaxed ml-4">
                    Refers to our taxi services and the website{" "}
                    <a
                      href="https://oktaxis.co.uk/"
                      className="text-primary-yellow hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://oktaxis.co.uk/
                    </a>
                    .
                  </dd>
                </div>
                <div>
                  <dt className="text-lg md:text-xl font-semibold text-heading-black mb-2">
                    Service Provider
                  </dt>
                  <dd className="text-base md:text-lg text-text-gray leading-relaxed ml-4">
                    Any natural or legal person who processes data on behalf of the Company.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg md:text-xl font-semibold text-heading-black mb-2">
                    Usage Data
                  </dt>
                  <dd className="text-base md:text-lg text-text-gray leading-relaxed ml-4">
                    Data collected automatically when using the Service.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg md:text-xl font-semibold text-heading-black mb-2">
                    You
                  </dt>
                  <dd className="text-base md:text-lg text-text-gray leading-relaxed ml-4">
                    The individual using the Service or on whose behalf the Service is used.
                  </dd>
                </div>
              </dl>
            </div>

            {/* Section 2: Data Protection Principles */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                2. Data Protection Principles
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed">
                We process Personal Data lawfully, fairly, and transparently. We collect data for specific, explicit and legitimate purposes and do not use it in ways incompatible with those purposes. We ensure your data is accurate, kept up to date, and retained only as necessary.
              </p>
            </div>

            {/* Section 3: Lawful Basis for Processing */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                3. Lawful Basis for Processing
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed mb-4">
                We process your Personal Data where we have a lawful basis, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-text-gray ml-4">
                <li>To perform our contract with you (e.g., booking and providing transport services).</li>
                <li>To comply with a legal obligation.</li>
                <li>With your consent.</li>
                <li>For our legitimate interests, provided your rights do not override those interests.</li>
              </ul>
            </div>

            {/* Section 4: What Personal Data We Collect */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                4. What Personal Data We Collect
              </h2>
              
              <h3 className="text-xl md:text-2xl font-semibold text-heading-black mb-4 mt-6">
                Personal Data You Provide
              </h3>
              <p className="text-base md:text-lg text-text-gray leading-relaxed mb-4">
                We may collect and process the following:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-text-gray ml-4 mb-6">
                <li>Name</li>
                <li>Email address</li>
                <li>Telephone number</li>
                <li>Address, City, Postcode</li>
                <li>Booking details (pick-up/drop-off locations)</li>
                <li>Payment information (if provided directly)</li>
              </ul>

              <h3 className="text-xl md:text-2xl font-semibold text-heading-black mb-4 mt-6">
                Automatically Collected Data
              </h3>
              <p className="text-base md:text-lg text-text-gray leading-relaxed mb-4">
                We automatically collect Usage Data such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-text-gray ml-4 mb-6">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited on our Site</li>
                <li>Device identifiers</li>
                <li>Time and date of visit</li>
              </ul>

              <h3 className="text-xl md:text-2xl font-semibold text-heading-black mb-4 mt-6">
                Cookies and Tracking Technologies
              </h3>
              <p className="text-base md:text-lg text-text-gray leading-relaxed">
                We use cookies and similar technologies to improve your experience, remember preferences, and analyse traffic. You can manage cookies via your browser settings.
              </p>
            </div>

            {/* Section 5: SMS Opt-In / Communications */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                5. SMS Opt-In / Communications
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed mb-4">
                If you consent to receive SMS updates, you may receive messages related to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-text-gray ml-4 mb-4">
                <li>Reservation updates</li>
                <li>Service notifications</li>
                <li>Customer care messages</li>
              </ul>
              <p className="text-base md:text-lg text-text-gray leading-relaxed mb-2">
                <strong>Message frequency:</strong> Up to 3–5 per week depending on service activity.
              </p>
              <p className="text-base md:text-lg text-text-gray leading-relaxed mb-2">
                Standard message and data rates may apply.
              </p>
              <p className="text-base md:text-lg text-text-gray leading-relaxed">
                To opt-out, reply STOP to any message or contact us. Standard UK charges may apply.
              </p>
            </div>

            {/* Section 6: How We Use Your Personal Data */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                6. How We Use Your Personal Data
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed mb-4">
                We use Personal Data to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-text-gray ml-4">
                <li>Provide and manage your bookings</li>
                <li>Communicate with you via email, phone, SMS</li>
                <li>Improve and customise our Service</li>
                <li>Process payments and refunds</li>
                <li>Send service updates and promotional offers (with consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            {/* Section 7: Sharing Your Data */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                7. Sharing Your Data
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed mb-4">
                We may share data with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-text-gray ml-4 mb-4">
                <li>Service Providers who support our operations</li>
                <li>Business partners where you consent to sharing</li>
                <li>Law enforcement or regulatory authorities if required by law</li>
                <li>Successors in the event of a business transfer</li>
              </ul>
              <p className="text-base md:text-lg text-text-gray leading-relaxed">
                We do not sell your personal data to third parties for marketing without explicit consent.
              </p>
            </div>

            {/* Section 8: International Transfers */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                8. International Transfers
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed">
                Your data may be processed outside the UK. Where we do so, we ensure appropriate safeguards are in place in accordance with UK GDPR.
              </p>
            </div>

            {/* Section 9: Data Retention */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                9. Data Retention
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed">
                We retain Personal Data only for as long as necessary for the purposes set out in this policy or as required by law.
              </p>
            </div>

            {/* Section 10: Your Rights */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                10. Your Rights
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed mb-4">
                Under UK GDPR, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-text-gray ml-4 mb-4">
                <li>Access your Personal Data</li>
                <li>Correct inaccurate data</li>
                <li>Request erasure in certain circumstances</li>
                <li>Restrict processing</li>
                <li>Object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="text-base md:text-lg text-text-gray leading-relaxed">
                To exercise these rights, contact us using the details below.
              </p>
            </div>

            {/* Section 11: Security */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                11. Security
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed">
                We use appropriate technical and organisational measures to protect your Personal Data. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            {/* Section 12: Children's Privacy */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                12. Children's Privacy
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed">
                Our services are not directed at children under 13. We do not knowingly collect data from individuals under 13.
              </p>
            </div>

            {/* Section 13: Links to Other Websites */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                13. Links to Other Websites
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed">
                Our website may contain links to third-party sites. We are not responsible for their privacy practices.
              </p>
            </div>

            {/* Section 14: Changes to This Policy */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                14. Changes to This Policy
              </h2>
              <p className="text-base md:text-lg text-text-gray leading-relaxed">
                We may update this policy periodically. We will notify you of significant changes via our website or email.
              </p>
            </div>

            {/* Section 15: Payments and Cancellation Fees */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                15. Payments and Cancellation Fees
              </h2>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-text-gray ml-4 mb-6">
                <li>If you cancel a ride, 5% of your payment will be deducted to cover transaction fees.</li>
                <li>If you cancel the ride after 8 hours, 15% will be deducted from your payment.</li>
                <li>Additional costs such as tolls or detours will be billed separately.</li>
                <li>Tips are voluntary.</li>
              </ul>

              <h3 className="text-xl md:text-2xl font-semibold text-heading-black mb-4 mt-6">
                WAITING TIME POLICY
              </h3>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-text-gray ml-4">
                <li>Complimentary waiting time is included for all airport pickups.</li>
                <li><strong>Domestic Flights:</strong> 30 minutes free, then £1 per minute</li>
                <li><strong>International Flights:</strong> 40 minutes free, then £1 per minute</li>
                <li>After the trip is completed, the driver will confirm the total waiting time. OKTaxis will verify the waiting time with the customer before any charges are applied.</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="mb-8 md:mb-12 bg-light-background p-6 md:p-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-heading-black mb-6">
                Contact Information
              </h2>
              <div className="space-y-4 text-base md:text-lg text-text-gray">
                <p>
                  <strong className="text-heading-black">Company Name:</strong> OKTaxis
                </p>
                <p>
                  <strong className="text-heading-black">Website:</strong>{" "}
                  <a
                    href="https://oktaxis.co.uk/"
                    className="text-primary-yellow hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://oktaxis.co.uk/
                  </a>
                </p>
                <p>
                  <strong className="text-heading-black">Phone:</strong>{" "}
                  <a
                    href="tel:+447788710290"
                    className="text-primary-yellow hover:underline"
                  >
                    +44 7788 710290
                  </a>
                </p>
                <p>
                  <strong className="text-heading-black">Email:</strong>{" "}
                  <a
                    href="mailto:info@oktaxis.co.uk"
                    className="text-primary-yellow hover:underline"
                  >
                    info@oktaxis.co.uk
                  </a>
                </p>
                <p>
                  <strong className="text-heading-black">Office Address:</strong> 08 Portway, Wythenshawe, Manchester, United Kingdom
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolices;
