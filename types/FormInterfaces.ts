import z from "zod";

const timeSchema = z.object({
  hour: z.number({
    required_error: "Please Choose an Hour",
  }).min(1, "Hour must be between 1 and 12").max(23, "Hour must be between 1 and 23"),

  minute: z.number({
    required_error: "Please Choose Minutes",
  }).min(0, "Minutes must be between 0 and 59").max(59, "Minutes must be between 0 and 59"),

});

export const hourlyFormValidation = z.object({
  pickup_date: z.date({ required_error: "Please Chose a Date" }),
  pickup_time: timeSchema,
  return_date: z.date().optional(),
  return_time: timeSchema.optional(),
  is_return: z.boolean().default(false),

  pickup_location_lag_alt: z.string({ required_error: "Please Chose Pickup Location" }),
  pickup_location: z.string({ required_error: "Please Chose Pickup Location" }),
  dropoff_location_lag_alt: z.string().optional(),
  dropoff_location: z.string().optional(),
  stop_1: z.string().optional(),
  stop_2: z.string().optional(),
  stop_3: z.string().optional(),
  passengers: z.number({ required_error: "Please Enter Passengers" }).min(1).max(6),
  kids: z.number({ required_error: "Please Enter Kids" }).min(0).max(6),
  bags: z.number({ required_error: "Please Enter Bags" }).min(0).max(6),
  car: z.string({ required_error: "Please select fleet" }),
  price: z.number({ required_error: "Please select fleet" }),
  name: z.string({ required_error: "Please Enter Your Name" }),
  email: z.string({ required_error: "Please Enter Email" }).email(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  flight: z.string().optional(),
  payment_id: z.string().optional(),
  duration: z.number({ required_error: "Please Enter duration" }).min(1),
  payment_method: z.string({ required_error: "Please Select Payment Method" }),
  distance: z.string().optional(),
  instructions: z.string().optional(),
  flight_track: z.boolean().default(false),
  meet_greet: z.boolean().default(false),
}).superRefine((data, ctx) => {
  if (data.is_return) {
    if (!data.return_date) {
      ctx.addIssue({
        path: ['return_date'],
        code: z.ZodIssueCode.custom,
        message: "Return date is required when return is selected",
      });
    }
    if (!data.return_time) {
      ctx.addIssue({
        path: ['return_time'],
        code: z.ZodIssueCode.custom,
        message: "Return time is required when return is selected",
      });
    }
  }
});




export const simpleFormValidation = z.object({
  pickup_date: z.date({ required_error: "Please Chose a Date" }),
  pickup_time: timeSchema,
  return_date: z.date().optional(),
  return_time: timeSchema.optional(),
  is_return: z.boolean().default(false),

  pickup_location_lag_alt: z.string({ required_error: "Please Chose Pickup Location" }),
  pickup_location: z.string({ required_error: "Please Chose Pickup Location" }),
  dropoff_location_lag_alt: z.string({ required_error: "Please Chose Pickup Location" }),
  dropoff_location: z.string({ required_error: "Please Chose Dropoff Location" }),
  stop_1: z.string().optional(),
  stop_2: z.string().optional(),
  stop_3: z.string().optional(),
  passengers: z.number({ required_error: "Please Enter Passengers" }).min(1).max(6),
  kids: z.number({ required_error: "Please Enter Kids" }).min(0).max(6),
  bags: z.number({ required_error: "Please Enter Bags" }).min(0).max(6),
  car: z.string({ required_error: "Please select fleet" }),
  price: z.number({ required_error: "Please select fleet" }),
  name: z.string({ required_error: "Please Enter Your Name" }),
  email: z.string({ required_error: "Please Enter Email" }).email(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  flight: z.string().optional(),
  payment_method: z.string({ required_error: "Please Select Payment Method" }),
  payment_id: z.string().optional(),
  distance: z.string({ required_error: "distance not calculated" }).min(0),
  instructions: z.string().optional(),
  duration: z.number(),
  flight_track: z.boolean().default(false),
  meet_greet: z.boolean().default(false),
}).superRefine((data, ctx) => {
  if (data.is_return) {
    if (!data.return_date) {
      ctx.addIssue({
        path: ['return_date'],
        code: z.ZodIssueCode.custom,
        message: "Return date is required when return is selected",
      });
    }
    if (!data.return_time) {
      ctx.addIssue({
        path: ['return_time'],
        code: z.ZodIssueCode.custom,
        message: "Return time is required when return is selected",
      });
    }
  }
});

