// Consolidated fleet data - single source of truth for all fleet information
// Can be used in both client and server components

export interface FleetType {
  name: string;
  cars: string;
  price10Miles: number; // Base price for first 10 miles
  price: number; // Price per mile after 10 miles (for trips) or base price (for hourly calculation)
  hourly: number; // Hourly rate
  passengers: number;
  suitcases: number;
  image: string;
  // Additional fields for NewBookingForm flow
  minimumFare?: number;
  bags?: number; // Alias for suitcases
  persons?: number; // Alias for passengers
  specailRequest?: boolean;
  stop?: number;
}

export const fleets: FleetType[] = [
  {
    name: "Essential",
    cars: "Skoda Octavia | Toyota Prius",
    price10Miles: 58,
    price: 2.2,
    hourly: 80,
    passengers: 4,
    suitcases: 2,
    image: "/assets/cars/economy-vehical-img.png",
    // For NewBookingForm compatibility
    minimumFare: 52,
    bags: 2,
    persons: 4,
    specailRequest: false,
    stop: 10,
  },
  {
    name: "Business Class",
    cars: "BMW 5 Series | Mercedes E-Class",
    price10Miles: 80,
    price: 2.9,
    hourly: 120,
    passengers: 4,
    suitcases: 3,
    image: "/assets/cars/premium-vehical-img.png",
    // For NewBookingForm compatibility
    minimumFare: 62,
    bags: 3,
    persons: 4,
    specailRequest: false,
    stop: 10,
  },
  {
    name: "First Class",
    cars: "Tesla Model S",
    price10Miles: 70,
    price: 2.5,
    hourly: 100,
    passengers: 4,
    suitcases: 4,
    image: "/assets/cars/executive-premium-vehical-img.png",
    // For NewBookingForm compatibility
    minimumFare: 87,
    bags: 4,
    persons: 4,
    specailRequest: false,
    stop: 10,
  },
  {
    name: "Business Van/SUV",
    cars: "XL Passenger Van",
    price10Miles: 100,
    price: 3,
    hourly: 160,
    passengers: 8,
    suitcases: 8,
    image: "/assets/cars/luxury-van-vehical-img.png",
    // For NewBookingForm compatibility
    minimumFare: 95,
    bags: 8,
    persons: 8,
    specailRequest: false,
    stop: 15,
  },
];

// Legacy export for backward compatibility
export const fleetsLocal = fleets;

// Discount percentages for return trips (used in NewBookingForm)
export const discounts: Record<string, number> = {
  "Essential": 3,
  "Business Class": 5,
  "First Class": 5,
  "Business Van/SUV": 7,
  // Legacy names for backward compatibility
  "Economy": 3,
  "Executive": 5,
  "Executive Premium": 5,
  "Luxury Van": 7,
};
