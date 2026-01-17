import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Detects if a location string contains airport-related keywords
 * @param location - The location string to check
 * @returns true if the location appears to be an airport, false otherwise
 */
export function isAirportLocation(location: string): boolean {
  if (!location) return false
  const lowerLocation = location.toLowerCase()
  const airportKeywords = [
    'airport',
    'terminal',
    'manchester airport',
    'liverpool airport',
    'man airport',
    'lpl airport',
    'heathrow',
    'gatwick',
    'stansted',
    'luton',
    'birmingham airport',
    'edinburgh airport',
    'glasgow airport',
    'bristol airport',
    'newcastle airport',
    'leeds bradford airport',
    'east midlands airport',
    'terminal 1',
    'terminal 2',
    'terminal 3',
    'terminal 4',
    'terminal 5'
  ]
  return airportKeywords.some(keyword => lowerLocation.includes(keyword))
}

/**
 * Validates if a booking time is at least the specified minimum hours from now
 * @param dateValue - Date string in format "YYYY-MM-DD"
 * @param timeValue - Time string in format "HH:MM"
 * @param minimumHours - Minimum hours required before booking (default: 5)
 * @param timezone - Timezone string (default: "Europe/London")
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateBookingTime(
  dateValue: string,
  timeValue: string,
  minimumHours: number = 5,
  timezone: string = "Europe/London"
): { isValid: boolean; error?: string } {
  try {
    // Get current time in specified timezone
    const now = toZonedTime(new Date(), timezone)
    
    // Parse selected date and time
    const [year, month, day] = dateValue.split('-').map(Number)
    const [hours, minutes] = timeValue.split(':').map(Number)
    
    // Create pickup datetime in timezone (treating the input as local time)
    const pickupDateTimeLocal = new Date(year, month - 1, day, hours, minutes)
    
    // Convert local time to UTC, then back to timezone for proper comparison
    const pickupDateTimeUTC = fromZonedTime(pickupDateTimeLocal, timezone)
    const pickupDateTime = toZonedTime(pickupDateTimeUTC, timezone)
    
    // Calculate minimum hours later in timezone
    const minimumTimeLater = new Date(now.getTime() + minimumHours * 60 * 60 * 1000)
    
    if (pickupDateTime < minimumTimeLater) {
      return {
        isValid: false,
        error: `Booking can't be added within ${minimumHours} hours of pickup time, choose another time.`
      }
    }
    
    return { isValid: true }
  } catch (error) {
    return {
      isValid: false,
      error: "Please select a valid date and time."
    }
  }
}
