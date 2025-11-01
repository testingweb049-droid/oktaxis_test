export default function WhyChoose() {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Column */}
        <div className="pr-6">
          <p className="text-[#FFB400] font-semibold text-sm mb-3 flex items-center gap-2">
            <span>*</span> How It Works
          </p>
          <h2 className="text-3xl lg:text-5xl font-extrabold leading-tight mb-6">
           Why Choose Our Luxury Chauffeur Service in Manchester
          </h2>
          <p className="text-gray-600 max-w-xl mb-8">
            At OKTaxis, we offer more than just a ride, we deliver a premium, reliable experience. Since 2015, we've built our reputation on a personal approach to luxury transport. Our team prioritizes your safety, discretion, and comfort above all else.
          </p>

          <ul className="space-y-4">
            {[
              "Luxury Fleet Featuring Mercedes, BMW, And Audi",
              "Professional, Fully Vetted, And Discreet Chauffeurs",
              "24/7 Availability For All Your Travel Needs",
              "On-Board Wi-Fi And Complimentary Bottled Water",
              "Trusted By Business Leaders And Global Travelers"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                    <img src="/icon-how-it-work-3.svg fill.png" alt="icon" className="w-6 h-6" />
                  </div>
                </div>
                <p className="font-semibold text-lg text-[#374151]">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div className="relative flex justify-center lg:justify-end">
          
          {/* Chauffeur Image */}
          <div className="w-80 h-80 lg:w-96 lg:h-[80vh] rounded-[150px] overflow-hidden shadow-lg">
            <img
              src="/990371ef931584cfa2ab371e7b919e4482fbaacb.jpg"
              alt="chauffeur opening car door"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Asterisk Image (desktop only) */}
          <div className="hidden lg:block absolute -right-12 top-10">
            <img src="/Vector.png" alt="star" className="w-12 h-12" />
          </div>

          {/* Floating Badge Desktop */}
          <div className="hidden sm:block absolute -bottom-6 lg:-bottom-8 right-6 lg:right-12 w-40 lg:w-48 bg-yellow-400 rounded-lg shadow-md p-3">
            <p className="text-sm font-semibold text-gray-900">500+ Trusted<br />Clients</p>
            <div className="mt-3 flex -space-x-2">
              {[
                "https://randomuser.me/api/portraits/men/32.jpg",
                "https://randomuser.me/api/portraits/women/45.jpg",
                "https://randomuser.me/api/portraits/men/12.jpg",
                "https://randomuser.me/api/portraits/women/68.jpg"
              ].map((src, idx) => (
                <img key={idx} src={src} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
          </div>

          {/* Floating Badge Mobile (center bottom) */}
          <div className="block sm:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 w-40 bg-[#FFB400] rounded-lg shadow-md p-3 text-center">
            <p className="text-sm font-semibold text-gray-900">500+ Trusted Clients</p>
            <div className="mt-2 flex justify-center -space-x-2">
              {[
                "https://randomuser.me/api/portraits/men/32.jpg",
                "https://randomuser.me/api/portraits/women/45.jpg",
                "https://randomuser.me/api/portraits/men/12.jpg",
                "https://randomuser.me/api/portraits/women/68.jpg"
              ].map((src, idx) => (
                <img key={idx} src={src} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
