import Image from "next/image"

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
    <section className="font-montserrat py-16 lg:py-20 bg-light-background mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column - Image with Badge */}
        <div className="relative">
          <div className="relative w-full h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/assets/home-images/choose-img.png"
              alt="Luxury Chauffeur Service"
              fill
              className=""
            />
            
            {/* Badge Overlay - Bottom Left */}
            <div className="absolute bottom-9 left-20 bg-white rounded-lg px-5 py-4 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.06342 1.3563L5.28467 4.96282L1.30497 5.54303C0.591294 5.64654 0.305279 6.52638 0.822831 7.03031L3.70205 9.83599L3.02107 13.7993C2.89849 14.5157 3.65302 15.0524 4.28498 14.7173L7.8452 12.846L11.4054 14.7173C12.0374 15.0496 12.7919 14.5157 12.6693 13.7993L11.9883 9.83599L14.8676 7.03031C15.3851 6.52638 15.0991 5.64654 14.3854 5.54303L10.4057 4.96282L8.62697 1.3563C8.30827 0.713449 7.38485 0.705278 7.06342 1.3563Z" className="fill-primary-yellow" />
                  </svg>
                ))}
              </div>
              <p className="text-lg font-regular text-text-gray leading-tight">
                500+ Trusted Clients |<br />
                Operating Since 2015
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="space-y-6">
          {/* HOW IT WORKS Heading */}
          <p className="text-brand text-lg font-semibold uppercase tracking-wide">
            HOW IT WORKS
          </p>
          
          {/* Main Title */}
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-heading-black leading-tight">
            Why Choose Our Luxury Chauffeur Service?
          </h2>
          
          {/* Features List */}
          <div className="space-y-6 mt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Icon Circle */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-heading-black flex items-center justify-center">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-heading-black mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-base text-text-gray">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
