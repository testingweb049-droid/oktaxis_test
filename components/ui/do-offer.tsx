'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

interface OfferItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const defaultOffers: OfferItem[] = [
  {
    id: 1,
    icon: '/minute.svg',
    title: '30 Minutes Free Wait Time',
    description:
      'We offer a generous 30-minute free wait time, allowing you to take your time and enjoy every moment without feeling rushed. Perfect for Manchester airport services or event pickups where delays can happen.',
  },
  {
    id: 2,
    icon: '/free.svg',
    title: 'Free Cancellation Up to 48 Hours',
    description:
      'Plans change, and we get that. We provide free cancellation up to 48 hours before your scheduled pickup, giving you flexibility for wedding chauffeur services Manchester or business trips.',
  },
  {
    id: 3,
    icon: '/flight.svg',
    title: 'Flight Tracking',
    description:
      "For destination weddings, out-of-town guests, or executive airport transfers, our flight tracking service ensures we're always on time, even if your flight isn't. Real-time monitoring for Manchester and Liverpool airports keeps your journey stress-free.",
  },
  {
    id: 4,
    icon: '/pilot.svg',
    title: 'Multilingual and Professional Chauffeurs',
    description:
      "Our chauffeurs are more than just drivers; they're your concierges, fluent in multiple languages and trained to provide top-notch service. Ideal for international clients on city tours Manchester or corporate hourly chauffeur Manchester hires.",
  },
  {
    id: 5,
    icon: '/pricing.svg',
    title: 'Transparent Pricing',
    description:
      "No hidden fees, no surprises. Our transparent pricing ensures you know exactly what you're paying for, whether it's a stadium transfer from Manchester to Old Trafford or a full-day luxury ride.",
  },
  {
    id: 6,
    icon: '/meet.svg',
    title: 'Meet and Greet',
    description:
      'Your chauffeur will be waiting for you with a warm welcome, ready to assist with anything you need. This premium touch elevates our Manchester airport chauffeur services and special event transports.',
  },
];

const hourlyChauffeurOffers: OfferItem[] = [
  {
    id: 1,
    icon: '/24-hours-support 1.svg',
    title: 'Book by the hour',
    description: 'Flexible hourly booking to suit your personal or professional schedule.',
  },
  {
    id: 2,
    icon: '/free.svg',
    title: 'Free cancellation',
    description:
      'Plans change, and we get that. We provide free cancellation up to 48 hours before your scheduled pickup, giving you flexibility for wedding chauffeur services Manchester or business trips.',
  },
  {
    id: 3,
    icon: '/hourglass 1.svg',
    title: 'Wait & return option available',
    description: 'We wait while you attend appointments, meetings, or errands.',
  },
  {
    id: 4,
    icon: '/pilot.svg',
    title: 'Multilingual and professional chauffeurs',
    description:
      "Our chauffeurs are more than just drivers; they're your concierges, fluent in multiple languages and trained to provide top-notch service. Ideal for international clients on city tours Manchester or corporate hourly chauffeur Manchester hires.",
  },
  {
    id: 5,
    icon: '/pricing.svg',
    title: 'Transparent pricing',
    description:
      "No hidden fees, no surprises. Our transparent pricing ensures you know exactly what you're paying for, whether it's a stadium transfer from Manchester to Old Trafford or a full-day luxury ride.",
  },
  {
    id: 6,
    icon: '/car 1.svg',
    title: 'Premium vehicles, always pristine',
    description: 'Enjoy our executive fleet, cleaned and maintained to the highest standard.',
  },
];
const chauffeurServicesOffers: OfferItem[] = [
  {
    id: 1,
    icon: '/chauffeur/seat 1.svg',
    title: 'Business-Class Experience Every Ride',
    description:
      'Step into a world of refinement with our business-class chauffeur services. Each vehicle offers plush leather seating, climate control, and a smooth ride — designed to provide optimal comfort whether you’re heading to an executive meeting or catching a flight. We ensure every journey meets the expectations of today’s discerning business traveler.',
  },
  {
    id: 2,
    icon: '/chauffeur/electric-car 1.svg',
    title: 'Clean, Quiet Vehicles for Work on the Go',
    description:
      'Our fleet is meticulously maintained and sound-insulated, offering a serene environment perfect for professionals who need to focus or take calls during transit. Whether you’re preparing for a pitch or relaxing after a long day, our quiet, spotless interiors provide the peace you need on the move.',
  },
  {
    id: 3,
    icon: '/chauffeur/customer-satisfaction (1) 1.svg',
    title: 'Experienced in Handling VIP Clients',
    description:
      'We specialize in chauffeuring high-profile clients, including celebrities, diplomats, executives, and international guests. Our chauffeurs are trained in discretion, punctuality, and etiquette, ensuring a seamless, respectful experience from pickup to drop-off. You can trust us with your most important journeys.',
  },
  {
    id: 4,
    icon: '/chauffeur/privacy 1.svg',
    title: 'Privacy Glass and Professional Etiquette',
    description:
      'Our executive vehicles feature privacy-tinted glass and partitioned cabins where applicable, ensuring confidentiality for sensitive discussions or calls. Combined with our chauffeur’s impeccable manners and non-intrusive service, your personal and professional privacy is always respected.',
  },
  {
    id: 5,
    icon: '/chauffeur/direct-debit 1.svg',
    title: 'Direct Billing & Corporate Accounts',
    description:
      'Designed for business convenience, we offer corporate account management with itemized monthly billing, tailored invoices, and expense tracking. No need to handle payments after each trip — everything is streamlined to meet your internal finance and compliance requirements.',
  },
  {
    id: 6,
    icon: '/chauffeur/24-hours-support 1 (1).svg',
    title: 'Available 24/7 for Early Flights or Meetings',
    description:
      'Whether you need to catch a 4 AM flight or attend a late-night event, we operate around the clock. Our team is ready whenever you are — with prompt arrivals and round-the-clock support for all your time-sensitive travel needs in Manchester and beyond.',
  },
];
const eventWeddingOffers: OfferItem[] = [
  {
    id: 1,
    icon: '/event-wedding/car-wash.svg',
    title: 'Luxurious Wedding Cars with Ribbons',
    description:
      'Make a grand entrance with our beautifully decorated wedding cars. Each vehicle comes adorned with elegant ribbons, pristine interiors, and a polished exterior to perfectly complement your special day.',
  },
  {
    id: 2,
    icon: '/event-wedding/chauffeur.svg',
    title: 'Chauffeurs Trained for Special Events',
    description:
      'Our professional chauffeurs are trained specifically for weddings and formal events. They understand the importance of timing, courtesy, and presentation, ensuring your day runs smoothly and stylishly.',
  },
  {
    id: 3,
    icon: '/event-wedding/red-carpet.svg',
    title: 'Red Carpet Entrance',
    description:
      'Experience celebrity treatment with our signature red carpet service. Ideal for weddings, galas, and VIP parties — your chauffeur will roll out the red carpet as you step out in style.',
  },
  {
    id: 4,
    icon: '/event-wedding/guest.svg',
    title: 'Cars for Guests, Family & VIPs',
    description:
      'We offer a wide selection of vehicles to accommodate everyone from close family to important VIPs. Let your guests arrive in comfort and elegance, all managed by our coordinated team.',
  },
  {
    id: 5,
    icon: '/event-wedding/all-inclusive.svg',
    title: 'Custom Packages for All Budgets',
    description:
      'From simple transfers to full-day luxury bookings, we provide flexible packages tailored to your event and budget. Every detail is designed to match your preferences and expectations.',
  },
  {
    id: 6,
    icon: '/event-wedding/champagne-glass.svg',
    title: 'Perfect for Parties, Proms & Ceremonies',
    description:
      'Not just for weddings — our stylish chauffeurs and elegant vehicles are perfect for parties, proms, graduation ceremonies, or any milestone event that deserves a premium touch.',
  },
];
const cityToursOffers: OfferItem[] = [
  {
    id: 1,
    icon: '/city-tours/route.svg',
    title: 'Long-Distance Rides Across the UK',
    description:
      'Explore cities and scenic routes beyond Manchester with our long-distance city tour options. From countryside escapes to coastal drives, we cover every destination in comfort and style.',
  },
  {
    id: 2,
    icon: '/city-tours/pricing (1) 1.svg',
    title: 'Fixed Pricing',
    description:
      'No surprise costs or hidden charges. Our fixed pricing structure gives you peace of mind and allows you to plan your journey and budget with total clarity.',
  },
  {
    id: 3,
    icon: '/city-tours/shield.svg',
    title: 'Safe, Punctual, and Smooth Journeys',
    description:
      'Count on us for reliable pick-ups, safe driving, and smooth routes. Our chauffeurs are trained for long trips, city navigation, and customer safety protocols.',
  },
  {
    id: 4,
    icon: '/city-tours/success.svg',
    title: 'Ideal for Business Travel or Leisure',
    description:
      'Our city tours cater to both business professionals and leisure travelers alike. Whether you\'re attending corporate meetings, exploring local landmarks, or enjoying a weekend getaway, our tailored chauffeur service adapts to your schedule and style. Ride in comfort and arrive in style — every time.',

  },

  {
    id: 5,
    icon: '/city-tours/web.svg',
    title: 'Rest Stops on Request',
    description:
      'Need a coffee break, photo stop, or scenic pause? Just ask. We make your journey feel relaxed and customized by accommodating rest stops as needed.',
  },
  {
    id: 6,
    icon: '/city-tours/people.svg',
    title: 'Comfortable for Individuals or Groups',
    description:
      'Whether you’re traveling solo or with friends, family, or coworkers, our vehicles offer ample space, plush seating, and climate control for a pleasant ride.',
  },
];
const cityCenterOffers: OfferItem[] = [
  {
    id: 1,
    icon: '/city-center/visitor 1.svg',
    title: 'Perfect for Locals and Visitors Alike',
    description: 'Whether you’re a resident or just exploring, our city rides ensure a smooth, hassle-free experience with convenience and comfort every time.',
  },
  {
    id: 2,
    icon: '/city-center/nightlife 1.svg',
    title: 'Nightlife, Shopping, Dining — We’ve Got You',
    description: 'From trendy restaurants to vibrant nightlife and retail hubs, our chauffeurs get you where you need to be, safely and in style.',
  },
  {
    id: 3,
    icon: '/city-center/shield.svg',
    title: 'Quick & Safe City Rides Anytime',
    description: 'Count on our professional drivers to navigate traffic and shortcuts, ensuring prompt and secure rides through the heart of the city.',
  },
  {
    id: 4,
    icon: '/city-center/chauffeur.svg',
    title: 'Clean Cars, Friendly Drivers',
    description: 'Our spotless, well-maintained vehicles and courteous chauffeurs make every journey pleasant, whether it’s a short ride or multiple stops.',
  },
  {
    id: 5,
    icon: '/city-center/processing 1.svg',
    title: 'Easy Booking, Fast Service',
    description: 'With our user-friendly booking system and responsive support, scheduling your city ride is quick and efficient, just like the journey.',
  },
  {
    id: 6,
    icon: '/city-center/hotspot 1.svg',
    title: 'Chauffeurs Know All Shortcuts & Hotspots',
    description: 'Our local drivers know the city inside-out, ensuring timely drop-offs and tips on the best places to visit, dine, or relax.',
  },
];
const stadiumTransferOffers: OfferItem[] = [
  {
    id: 1,
    icon: '/stadium/person 2.svg',
    title: 'Pick & Drop at All Major Venues',
    description: 'We provide timely pick-up and drop-off at stadiums and arenas, ensuring you never miss the kickoff or opening act.',
  },
  {
    id: 2,
    icon: '/stadium/warning (1) 1.svg',
    title: 'Beat Traffic with Priority Routes',
    description: 'Our experienced chauffeurs use real-time traffic data and priority access roads to avoid congestion and keep you on time.',
  },
  {
    id: 3,
    icon: '/stadium/clock (1) 1.svg',
    title: 'No Parking Stress, No Delays',
    description: 'Forget the hassle of finding parking — we handle the logistics so you can focus on enjoying the event.',
  },
  {
    id: 4,
    icon: '/stadium/people 1.svg',
    title: 'Perfect for Families or Group Bookings',
    description: 'Spacious and comfortable vehicles accommodate families, friends, or corporate groups traveling together to events.',
  },
  {
    id: 5,
    icon: '/stadium/nightlife 2.svg',
    title: 'Pre- and Post-Event Transfers',
    description: "Whether you're heading to the match or celebrating afterward, our chauffeur service is available before and after the event.",

  },
  {
    id: 6,
    icon: '/stadium/customer-satisfaction (1) 1 (1).svg',
    title: 'Available for VIP Hospitality',
    description: 'Delivering a premium experience tailored for VIP guests, corporate clients, and exclusive ticket holders.',
  },
];


const Offer: React.FC = () => {
  const pathname = usePathname();

  const offers = useMemo(() => {
    if (pathname === '/services/hourly-chauffeur') return hourlyChauffeurOffers;
    if (pathname === '/services/chauffeur-services') return chauffeurServicesOffers;
    if (pathname === '/services/event-weddings') return eventWeddingOffers;
    if (pathname === '/services/city-tours') return cityToursOffers;
    if (pathname === '/services/city-center') return cityCenterOffers;
    if (pathname === '/services/stadium-transfer') return stadiumTransferOffers;
    return defaultOffers;
  }, [pathname]);


  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <Script
        type="application/ld+json"
        id="ok-taxis-offers-schema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: offers.map((offer) => ({
              '@type': 'Question',
              name: offer.title,
              acceptedAnswer: {
                '@type': 'Answer',
                text: offer.description,
              },
            })),
          }),
        }}
      />

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          What Do We <span className="text-brand">Offer</span> at OKTaxis?
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-4">
          At OKTaxis, we redefine premium chauffeur services in Manchester with a focus on convenience,
          luxury, and reliability. Whether you're booking airport transfers, hourly hire, wedding or stadium rides —
          our features ensure a seamless experience.
        </p>
      </div>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map(({ id, icon, title, description }) => (
          <div key={id} className="flex flex-col items-start space-x-4">
            <div className="flex-shrink-0 p-4">
              <Image
                src={icon}
                alt={`${title} icon`}
                width={80}
                height={80}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-gray-600 text-lg">{description}</p>
            </div>
          </div>
        ))}
      </div>

    
    </section>
  );
};

export default Offer;
