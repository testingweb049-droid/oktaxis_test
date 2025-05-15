
import {
  Clock,
  DollarSign,
  MapPin,
  Leaf,
  Star,
  Car,
} from "lucide-react";

const HeroCard = () => {
  return (
    <div>
      <div className="bg-brand text-white w-full max-w-md p-6 rounded-lg shadow-lg">
        {/* Top Bar */}
        <div className=" bg-white text-sm px-3 py-4 rounded-full flex items-center gap-2 shadow-md">
          <Car className="text-black w-4 h-4" />
          <span className="font-semibold text-black">
            UK'S Leading Minicab Comparison Platform
          </span>
        </div>

        {/* Heading */}
        <div className="text-start mt-10 mb-5">
          <h2 className="text-2xl font-bold">WHY BOOK WITH TRIP?</h2>
        </div>

        {/* Features */}
        <ul className="mt-6 space-y-4">
          <li className="flex items-center gap-4">
            <Clock className="w-5 h-5" />
            <span>24/7 Customer Support</span>
          </li>
          <li className="flex items-center gap-4">
            <DollarSign className="w-5 h-5" />
            <span>Best Competitive Prices</span>
          </li>
          <li className="flex items-center gap-4">
            <MapPin className="w-5 h-5" />
            <span>Airport Meet & Greet Service</span>
          </li>
          <li className="flex items-center gap-4">
            <Leaf className="w-5 h-5" />
            <span>Eco Friendly Car Options</span>
          </li>
          <li className="flex items-center gap-4">
            <Star className="w-5 h-5" />
            <span>Trusted By Over 1 Million Customers</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeroCard;
