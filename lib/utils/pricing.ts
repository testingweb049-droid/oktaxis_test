import type { FleetType } from '@/lib/fleet-data';
import { discounts } from '@/lib/fleet-data';
import { BASE_DISTANCE_MILES, MIN_DISTANCE, MIN_PRICE, PRICE_DECIMAL_PLACES } from '@/constants/pricing';

/**
 * Calculate trip price based on distance and fleet type
 * @param distance - Total distance in miles
 * @param fleet - Fleet type with pricing information
 * @returns Calculated price as number
 */
export function calculateTripPrice(distance: number, fleet: FleetType): number {
  // Ensure distance is valid
  const validDistance = Math.max(MIN_DISTANCE, distance || 0);
  
  // If distance is less than or equal to base distance, return base price
  if (validDistance <= BASE_DISTANCE_MILES) {
    return fleet.price10Miles;
  }
  
  // Calculate price: base price + (additional miles * price per mile)
  const additionalMiles = validDistance - BASE_DISTANCE_MILES;
  const price = fleet.price10Miles + (additionalMiles * fleet.price);
  
  return Math.max(MIN_PRICE, price);
}

/**
 * Calculate hourly price based on duration and fleet type
 * @param durationHours - Duration in hours (can be decimal like 0.5, 1.5, etc.)
 * @param fleet - Fleet type with pricing information
 * @returns Calculated price as number
 */
export function calculateHourlyPrice(durationHours: number, fleet: FleetType): number {
  // Ensure duration is valid
  const validDuration = Math.max(0, durationHours || 0);
  
  if (validDuration <= 0) {
    return fleet.price10Miles; // Return minimum/base price
  }
  
  // Calculate price: duration * hourly rate
  const price = validDuration * fleet.hourly;
  
  return Math.max(MIN_PRICE, price);
}

/**
 * Calculate return trip discount price
 * @param basePrice - Base price of the trip
 * @param carName - Name of the selected car/fleet
 * @returns Discounted price for return trip
 */
export function calculateReturnPrice(basePrice: number, carName: string): number {
  if (!basePrice || basePrice <= 0) {
    return 0;
  }
  
  // Get discount percentage from fleet data
  const discountPercent = discounts[carName] || 0;
  
  if (discountPercent <= 0) {
    return basePrice; // No discount available
  }
  
  // Calculate discounted price
  const discountAmount = (basePrice * discountPercent) / 100;
  const discountedPrice = basePrice - discountAmount;
  
  return Math.max(MIN_PRICE, discountedPrice);
}

/**
 * Format price to string with proper decimal places
 * @param price - Price as number
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return Math.max(MIN_PRICE, price || 0).toFixed(PRICE_DECIMAL_PLACES);
}

/**
 * Format price to string without decimals (for display)
 * @param price - Price as number
 * @returns Formatted price string without decimals
 */
export function formatPriceInteger(price: number): string {
  return Math.max(MIN_PRICE, Math.round(price || 0)).toString();
}

