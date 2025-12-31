import Economy from "@/assets/vehicles/Econamy.png";
import Executive from "@/assets/vehicles/Mercedes-S-Class-cutout.png";
import ExecutivePremium from "@/assets/vehicles/Tesla Model S.png";
import LuxuryVan from "@/assets/vehicles/Mercedes-V-Class-cutout.png";

// Fleet data with image imports (for client components)
export const fleets = [
  {
    name: "Economy",
    cars: "Skoda Octavia | Toyota Prius",
    price10Miles: 58,
    price: 2.2,
    hourly: 80,
    passengers: 4,
    suitcases: 2,
    image: Economy,
  },
  {
    name: "Premium",
    cars: "BMW 5 Series | Mercedes E-Class",
    price10Miles: 80,
    price: 2.9,
    hourly: 120,
    passengers: 4,
    suitcases: 3,
    image: Executive,
  },
  {
    name: "Executive Premium",
    cars: "Tesla Model S",
    price10Miles: 70,
    price: 2.5,
    hourly: 100,
    passengers: 4,
    suitcases: 4,
    image: ExecutivePremium,
  },
  {
    name: "Luxury Van",
    cars: "XL Passenger Van",
    price10Miles: 100,
    price: 3,
    hourly: 160,
    passengers: 8,
    suitcases: 8,
    image: LuxuryVan,
  },
];

