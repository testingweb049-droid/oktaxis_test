/**
 * Helper functions for order data processing
 * These functions make the code more scalable and maintainable
 */

/**
 * Derives boolean value from extra stops count
 * @param count - The number of extra stops
 * @returns true if count > 0, false otherwise
 */
export function hasExtraStops(count: number | null | undefined): boolean {
  return (count ?? 0) > 0;
}

/**
 * Formats flight information for display
 * @param flightName - Airline name
 * @param flightNumber - Flight number
 * @returns Formatted flight string or null
 */
export function formatFlightInfo(
  flightName: string | null | undefined,
  flightNumber: string | null | undefined
): string | null {
  if (flightName && flightNumber) {
    return `${flightName} ${flightNumber}`;
  }
  if (flightNumber) {
    return flightNumber;
  }
  if (flightName) {
    return flightName;
  }
  return null;
}

/**
 * Calculates extra stops fee
 * @param count - Number of extra stops
 * @param pricePerStop - Price per stop (default: 7)
 * @returns Total fee for extra stops
 */
export function calculateExtraStopsFee(
  count: number | null | undefined,
  pricePerStop: number = 7
): number {
  return (count ?? 0) * pricePerStop;
}

/**
 * Validates if extra stops data is consistent
 * @param isExtraStops - Boolean flag (legacy, can be null)
 * @param count - Number of extra stops
 * @returns true if data is consistent
 */
export function validateExtraStopsConsistency(
  isExtraStops: boolean | null | undefined,
  count: number | null | undefined
): boolean {
  const hasStops = hasExtraStops(count);
  // If legacy boolean exists, it should match the count
  if (isExtraStops !== null && isExtraStops !== undefined) {
    return isExtraStops === hasStops;
  }
  return true;
}

