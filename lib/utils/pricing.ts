import { MIN_PRICE, PRICE_DECIMAL_PLACES } from '@/constants/pricing';

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
  
  // Use provided discount - must come from backend pricing settings
  const discount = discountPercent ?? 0;
  
  if (!discount || discount <= 0) {
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

/**
 * Check if booking is within specified hours from now
 * @param dateValue - Date string in format "YYYY-MM-DD"
 * @param timeValue - Time string in format "HH:MM"
 * @param hoursThreshold - Number of hours threshold (e.g., 24 for 24 hours)
 * @returns true if booking is within the specified hours, false otherwise
 */
export function isBookingWithinHours(dateValue: string | undefined, timeValue: string | undefined, hoursThreshold: number): boolean {
  if (!dateValue || !timeValue || !hoursThreshold || hoursThreshold <= 0) {
    return false;
  }

  try {
    const now = new Date();
    
    // Parse selected date and time
    const [year, month, day] = dateValue.split('-').map(Number);
    const [hours, minutes] = timeValue.split(':').map(Number);
    
    // Create pickup datetime (treating as local time)
    const pickupDateTime = new Date(year, month - 1, day, hours, minutes);
    
    // Calculate specified hours from now
    const thresholdLater = new Date(now.getTime() + hoursThreshold * 60 * 60 * 1000);
    
    // Check if pickup is within threshold (pickup is before threshold hours from now)
    return pickupDateTime <= thresholdLater && pickupDateTime >= now;
  } catch (error) {
    console.error('Error checking if booking is within hours:', error);
    return false;
  }
}

/**
 * Calculate last-minute price increase
 * @param basePrice - Base price of the vehicle
 * @param lastMinutePercent - Last-minute booking price increase percentage
 * @returns Price with last-minute increase applied
 */
export function calculateLastMinutePrice(basePrice: number, lastMinutePercent: number): number {
  if (!basePrice || basePrice <= 0 || !lastMinutePercent || lastMinutePercent <= 0) {
    return basePrice;
  }
  
  const increaseAmount = (basePrice * lastMinutePercent) / 100;
  return basePrice + increaseAmount;
}

/**
 * Find matching hourly pricing range for a given duration
 * @param duration - Duration in hours
 * @param hourlyRanges - Array of hourly pricing ranges
 * @returns Matching range or null if no match
 */
export function findHourlyPricingRange(
  duration: number,
  hourlyRanges: Array<{ minHours: number; maxHours: number; percent: number }>
): { minHours: number; maxHours: number; percent: number } | null {
  if (!duration || duration <= 0 || !hourlyRanges || hourlyRanges.length === 0) {
    return null;
  }

  // Find the first range where duration falls within minHours and maxHours
  return hourlyRanges.find(
    (range) => duration >= range.minHours && duration <= range.maxHours
  ) || null;
}

/**
 * Calculate hourly price based on duration and pricing ranges
 * @param basePrice - Base price of the vehicle
 * @param duration - Duration in hours
 * @param hourlyRanges - Array of hourly pricing ranges
 * @returns Price with hourly percentage applied
 */
export function calculateHourlyPrice(
  basePrice: number,
  duration: number,
  hourlyRanges: Array<{ minHours: number; maxHours: number; percent: number }>
): number {
  if (!basePrice || basePrice <= 0 || !duration || duration <= 0) {
    return basePrice;
  }

  const matchingRange = findHourlyPricingRange(duration, hourlyRanges);
  
  if (!matchingRange || !matchingRange.percent || matchingRange.percent <= 0) {
    return basePrice; // No matching range or no percentage, return base price
  }

  // Apply percentage to base price
  // If percent is 15, it means 15% of base price, so: basePrice * (percent / 100)
  const priceWithPercent = (basePrice * matchingRange.percent) / 100;
  
  return Math.max(MIN_PRICE, priceWithPercent);
}


