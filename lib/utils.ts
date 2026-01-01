import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Step:1 Add User's Form Data here to Send Booking email...
export const sendBookingEmail = async (values: any) => {
  try {
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        passengerInfo: values.passengerInfo,
        bookingDetails: {
          pickUpAddress: values.pickUpAddress,
          dropOffAddress: values.dropOffAddress,
          date: values.date,
          time: values.time,
          bookingType: values.bookingType,
          flightNumber: values.flightNumber,
          vehicleTitle: values.selectedVehicle,
          vehicleType: values.vehicleType,
          category: values.category,
          passengerCount: values.passengerCount,
          bagCount: values.bagCount,
          childCount: values.childCount,
          textarea: values.textarea,
          stops: values.stops,
          hourly: values.hourlyCharter,
          distance: parseFloat(values.distance).toFixed(2),
          price: values.totalPrice,
        },
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Failed to send emails. Server response:", errorMessage);
      throw new Error(errorMessage.message || "Unknown server error");
    }

    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error.message);
    throw error;
  }
};

// Get Data for Register Driver...
export const registerDriverEmail = async (values: any) => {
  try {
    const response = await fetch("/api/registerDriver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email || "",
        phone: values.phone || "",
        vehicleType: values.vehicleType || values.carType || "",
        preferredContact: values.preferredContact || "WhatsApp",
        carMake: values.carMake || "",
        carModel: values.carModel || "",
        licenseNumber: values.licenseNumber || "",
        address: values.address || "",
        carImageUrl: values.carImageUrl || "",
        licenseFrontUrl: values.licenseFrontUrl || "",
        licenseBackUrl: values.licenseBackUrl || "",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // For 409 (Conflict) status, throw with the specific message
      const error = new Error(data.message || "Unknown server error");
      (error as any).status = response.status;
      throw error;
    }

    return data;
  } catch (error: any) {
    throw error;
  }
};


export const contactEmail = async (values: any) => {
  try {
    const response = await fetch("/api/contactEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Failed to send emails. Server response:", errorMessage);
      throw new Error(errorMessage.message || "Unknown server error");
    }

    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error.message);
    throw error;
  }
};

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * This is a basic implementation - consider using a library like DOMPurify in production.
 */
export function sanitizeHtml(html: string): string {
  // Replace script tags
  let sanitized = html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );

  // Replace inline event handlers
  sanitized = sanitized.replace(/on\w+="[^"]*"/g, "");
  sanitized = sanitized.replace(/on\w+='[^']*'/g, "");

  // Replace iframe tags
  sanitized = sanitized.replace(
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    ""
  );

  // Replace data: and javascript: URLs
  sanitized = sanitized.replace(/data:[^"']*['"]/gi, '""');
  sanitized = sanitized.replace(/javascript:[^"']*['"]/gi, '""');

  return sanitized;
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Logs safely - avoids logging sensitive data in production
 */
export function safeLog(message: string, data: any, isSensitive = false): void {
  if (process.env.NODE_ENV !== "production" || !isSensitive) {
    if (typeof data === "object" && data !== null) {
      console.log(message, JSON.stringify(data, null, 2));
    } else {
      console.log(message, data);
    }
  } else {
    console.log(message, "[REDACTED]");
  }
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
