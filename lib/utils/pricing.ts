import { MIN_PRICE, PRICE_DECIMAL_PLACES } from '@/constants/pricing';
import { DEFAULT_PRICING } from '@/hooks/usePricing';

// Price calculations have been moved to the backend
// Fleets are now fetched with calculated prices from the backend API

/**
 * Calculate return trip discount price
 * @param basePrice - Base price of the trip
 * @param discountPercent - Discount percentage (from pricing settings)
 * @returns Discounted price for return trip
 */
export function calculateReturnPrice(basePrice: number, discountPercent?: number): number {
  if (!basePrice || basePrice <= 0) {
    return 0;
  }
  
  // Use provided discount or default from pricing settings
  const discount = discountPercent ?? DEFAULT_PRICING.return.discount;
  
  if (discount <= 0) {
    return basePrice; // No discount available
  }
  
  // Calculate discounted price
  const discountAmount = (basePrice * discount) / 100;
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


