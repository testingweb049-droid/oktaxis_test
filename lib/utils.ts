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
 * Generates an array of duration options for hourly bookings
 * @returns Array of duration options with label and value
 */
export function getDurationArray(): Array<{ label: string; value: string }> {
  return Array.from({ length: 48 }, (_, i) => {
    const hours = (i + 1) / 2
    const label =
      hours === 0.5
        ? "0.5 Hour"
        : `${hours} ${hours === 1 ? "Hour" : "Hours"}`
    return { label, value: hours.toString() }
  })
}

/**
 * Truncates a location string to specified max length
 * @param location - Location string to truncate
 * @param maxLength - Maximum length before truncation (default: 25)
 * @returns Truncated location string
 */
export function truncateLocation(location: string, maxLength: number = 25): string {
  if (!location || location.length <= maxLength) return location
  return location.substring(0, maxLength) + '...'
}

/**
 * Parses a time string (12h or 24h format) and returns hour and minute components
 * @param timeValue - Time string in either 12-hour (e.g., "2:30 PM") or 24-hour (e.g., "14:30") format
 * @returns Object with hours (24h) and minutes, or null if invalid
 */
export function parseTimeString(timeValue: string): { hours: number; minutes: number } | null {
  if (!timeValue) return null
  
  // Try parsing as 24h format first
  const match24h = timeValue.trim().match(/^(\d{2}):(\d{2})$/)
  if (match24h) {
    const hours = parseInt(match24h[1], 10)
    const minutes = parseInt(match24h[2], 10)
    if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
      return { hours, minutes }
    }
  }
  
  // Try parsing as 12h format
  const match12h = timeValue.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (match12h) {
    let hours = parseInt(match12h[1], 10)
    const minutes = parseInt(match12h[2], 10)
    const period = match12h[3].toUpperCase()
    
    if (hours < 1 || hours > 12 || minutes < 0 || minutes >= 60) {
      return null
    }
    
    if (period === "AM") {
      if (hours === 12) hours = 0
    } else {
      // PM
      if (hours !== 12) hours += 12
    }
    
    return { hours, minutes }
  }
  
  return null
}

/**
 * Validates if a booking time is at least the specified minimum hours from now
 * @param dateValue - Date string in format "YYYY-MM-DD"
 * @param timeValue - Time string in 12-hour format (e.g., "2:30 PM") or 24-hour format (e.g., "14:30")
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
    
    // Parse selected date
    const [year, month, day] = dateValue.split('-').map(Number)
    
    // Parse time (supports both 12h and 24h format)
    const timeParsed = parseTimeString(timeValue)
    if (!timeParsed) {
      return {
        isValid: false,
        error: "Please select a valid time."
      }
    }
    
    const { hours, minutes } = timeParsed
    
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
