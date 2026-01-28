import z from "zod";

export const step1TripValidationSchema = z.object({
  category: z.literal("trip"),
  date: z.string().min(1, "Please select pickup date"),
  time: z.string().min(1, "Please select pickup time"),
  fromLocation: z.string().min(1, "Please select pickup location"),
  toLocation: z.string().min(1, "Please select drop off location"),
  passengers: z.string().min(1, "Please select number of passengers"),
  bags: z.string().min(1, "Please select number of bags"),
}).superRefine((data, ctx) => {
  // Check if start and end locations are different
  if (data.fromLocation && data.toLocation) {
    const fromLocation = data.fromLocation.trim().toLowerCase();
    const toLocation = data.toLocation.trim().toLowerCase();
    
    if (fromLocation === toLocation || 
        (fromLocation.includes(toLocation) && toLocation.length > 10) ||
        (toLocation.includes(fromLocation) && fromLocation.length > 10)) {
      ctx.addIssue({
        path: ['toLocation'],
        code: z.ZodIssueCode.custom,
        message: "Start and end locations cannot be the same. Please choose different locations."
      });
    }
  }
});

/**
 * Step 1: Booking Details - Hourly Category
 * Validates date, time, from location, duration, passengers, bags for hourly bookings
 */
export const step1HourlyValidationSchema = z.object({
  category: z.literal("hourly"),
  date: z.string().min(1, "Please select pickup date"),
  time: z.string().min(1, "Please select pickup time"),
  fromLocation: z.string().min(1, "Please select pickup location"),
  duration: z.string().min(1, "Please select duration"),
  passengers: z.string().min(1, "Please select number of passengers"),
  bags: z.string().min(1, "Please select number of bags"),
});

/**
 * Step 1: Combined schema for both categories
 * Uses union to support both trip and hourly categories
 */
export const step1ValidationSchema = z.union([
  step1TripValidationSchema,
  step1HourlyValidationSchema,
]);

/**
 * Step 3: Passenger Details Validation Schema
 * Validates passenger information and optional return journey/extras
 */
export const step3ValidationSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone is required").min(10, "Phone number must be at least 10 digits"),
  
  // Return journey fields (optional, conditional)
  isReturn: z.boolean().optional().default(false),
  returnDate: z.string().optional(),
  returnTime: z.string().optional(),
  
  // Airport pickup fields (optional, conditional)
  isAirportPickup: z.boolean().optional().default(false),
  flightArrivalTime: z.string().optional(),
  flightNumber: z.string().optional(),
  
  // Equipment and extras (optional)
  isFlightTrack: z.boolean().optional().default(false),
  isMeetGreet: z.boolean().optional().default(false),
  extraStopsCount: z.string().optional().default("0"),
  
  // Return extras (optional, conditional)
  isReturnFlightTrack: z.boolean().optional().default(false),
  isReturnMeetGreet: z.boolean().optional().default(false),
  returnExtraStopsCount: z.string().optional().default("0"),
  
  // Instructions (optional)
  isAddInstructions: z.boolean().optional().default(false),
  instructions: z.string().optional().default(""),
}).superRefine((data, ctx) => {
  // If return is selected, return date and time are required
  if (data.isReturn) {
    if (!data.returnDate || data.returnDate.trim() === "") {
      ctx.addIssue({
        path: ['returnDate'],
        code: z.ZodIssueCode.custom,
        message: "Return date is required when return is selected"
      });
    }
    if (!data.returnTime || data.returnTime.trim() === "") {
      ctx.addIssue({
        path: ['returnTime'],
        code: z.ZodIssueCode.custom,
        message: "Return time is required when return is selected"
      });
    }
  }
  
  // If airport pickup is selected, flight name and number should be provided (optional but recommended)
  // Note: We're not making these required as it's conditional based on user selection
});

/**
 * Legacy schema alias - kept for backward compatibility during migration
 * @deprecated Use step1ValidationSchema instead
 */
export const heroFormValidationSchema = step1ValidationSchema;
