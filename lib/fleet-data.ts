// Re-export FleetType from types folder for backward compatibility
export type { FleetType } from "@/types/fleet.types";

export const discounts: Record<string, number> = {
  "Essential": 3,
  "Business Class": 5,
  "First Class": 5,
  "Business Van/SUV": 7,
  "Economy": 3,
  "Executive": 5,
  "Executive Premium": 5,
  "Luxury Van": 7,
};
