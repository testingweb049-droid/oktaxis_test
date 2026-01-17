import { discounts } from '@/lib/fleet-data';
import { MIN_PRICE, PRICE_DECIMAL_PLACES } from '@/constants/pricing';

// Price calculations have been moved to the backend
// Fleets are now fetched with calculated prices from the backend API

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


