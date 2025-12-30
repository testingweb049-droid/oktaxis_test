import Image from "next/image"
import { Star } from "lucide-react"

export default function WhyChoose() {
  const features = [
    {
      icon: "/assets/icons/icon-1.png",
      title: "Luxury Fleet:",
      description: "We offer the finest Chauffeur Cars Manchester has to offer, featuring Mercedes, BMW, and Audi vehicles."
    },
    {
      icon: "/assets/icons/icon-2.png",
      title: "Professional Drivers:",
      description: "Fully vetted, discreet chauffeurs trained to serve business and professionals."
    },
    {
      icon: "/assets/icons/icon-3.png",
      title: "24/7 Availability:",
      description: "Ready for all your travel needs, day or night."
    },
    {
      icon: "/assets/icons/icon-4.png",
      title: "Premium Amenities:",
      description: "Transparent all-inclusive rates. No hidden fees or surge pricing, ever."
    },
    {
      icon: "/assets/icons/icon-5.png",
      title: "Trusted Reputation:",
      description: "The preferred choice for business leaders and global Travellers."
    }
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-6 py-10 md:pt-52">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">

        {/* Left Column - Image with Rating Below */}
        <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/assets/home-images/choose-img.png"
              alt="Luxury Chauffeur Service"
              fill
              className="object-cover"
            />
          </div>

          {/* Rating and Trust Badge - Below Image */}
          <div className="flex flex-col items-center sm:items-start space-y-2 sm:space-y-3">
            {/* Stars Rating */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-primary-yellow text-primary-yellow"
                />
              ))}
             </div>

            {/* Trust Text */}
            <p className="text-sm sm:text-base md:text-lg font-regular text-text-gray leading-tight text-center sm:text-left">
              500+ Trusted Clients | Operating Since 2015
            </p>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6 order-1 lg:order-2">
          {/* HOW IT WORKS Heading */}
          <p className="text-brand text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide">
            HOW IT WORKS
          </p>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-heading-black leading-tight">
            Why Choose Our Luxury Chauffeur Service?
          </h2>

          {/* Features List */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6 mt-6 sm:mt-7 lg:mt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 sm:gap-4">
                {/* Icon Circle */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-heading-black flex items-center justify-center">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={24}
                      height={24}
                      className="object-contain w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-heading-black mb-1 sm:mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-text-gray leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
