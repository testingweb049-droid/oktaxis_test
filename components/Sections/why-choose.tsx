import Image from "next/image";
import { Star } from "lucide-react";

// Types
interface Feature {
  icon: string;
  title: string;
  description: string;
}

// Constants
const FEATURES: Feature[] = [
  {
    icon: "/assets/icons/icon-1.png",
    title: "Luxury Fleet:",
    description: "We offer the finest Chauffeur Cars Manchester has to offer, featuring Mercedes, BMW, and Audi vehicles.",
  },
  {
    icon: "/assets/icons/icon-2.png",
    title: "Professional Drivers:",
    description: "Fully vetted, discreet chauffeurs trained to serve business and professionals.",
  },
  {
    icon: "/assets/icons/icon-3.png",
    title: "24/7 Availability:",
    description: "Ready for all your travel needs, day or night.",
  },
  {
    icon: "/assets/icons/icon-4.png",
    title: "Premium Amenities:",
    description: "Transparent all-inclusive rates. No hidden fees or surge pricing, ever.",
  },
  {
    icon: "/assets/icons/icon-5.png",
    title: "Trusted Reputation:",
    description: "The preferred choice for business leaders and global Travellers.",
  },
];

const STAR_COUNT = 5;
const TRUST_TEXT = "500+ Trusted Clients | Operating Since 2015";

// Reusable Components
const StarRating = () => (
  <div className="flex items-center gap-2 sm:gap-2.5">
    {[...Array(STAR_COUNT)].map((_, i) => (
      <Star
        key={i}
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-primary-yellow text-primary-yellow"
      />
    ))}
  </div>
);

const FeatureItem = ({ feature }: { feature: Feature }) => (
  <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
    {/* Icon Circle */}
    <div className="flex-shrink-0">
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-heading-black flex items-center justify-center">
        <Image
          src={feature.icon}
          alt={feature.title}
          width={28}
          height={28}
          className="object-contain w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
        />
      </div>
    </div>

    {/* Text Content */}
    <div className="flex-1">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-heading-black mb-2 sm:mb-2.5">
        {feature.title}
      </h3>
      <p className="text-sm sm:text-base md:text-lg text-text-gray leading-relaxed">
        {feature.description}
      </p>
    </div>
  </div>
);

export default function WhyChoose() {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 md:pt-52">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 items-start">
        {/* Left Column - Image with Rating Below */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1">
          <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] rounded-lg overflow-hidden">
            <Image
              src="/assets/home-images/choose-img.png"
              alt="Luxury Chauffeur Service"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Rating and Trust Badge - Below Image */}
          <div className="flex flex-col items-center sm:items-start space-y-3 sm:space-y-4">
            <StarRating />
            <p className="text-base sm:text-lg md:text-xl font-regular text-text-gray leading-relaxed text-center sm:text-left">
              {TRUST_TEXT}
            </p>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 order-1 lg:order-2">
          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight">
            Why Choose <span className="text-brand">Our</span>{" "}
            <span className="text-brand">Luxury</span> Chauffeur Service?
          </h2>

          {/* Features List */}
          <div className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 mt-8 sm:mt-10 md:mt-12">
            {FEATURES.map((feature, index) => (
              <FeatureItem key={index} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
