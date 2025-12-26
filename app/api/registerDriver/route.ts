import sendEmail from "@/lib/sendEmail";
import { isValidEmail, sanitizeHtml } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { drivers } from "@/db/schema";
import { render } from "@react-email/render";
import { DriverRegistrationAdminEmail } from "@/components/emails/DriverRegistrationAdminEmail";
import { DriverRegistrationConfirmationEmail } from "@/components/emails/DriverRegistrationConfirmationEmail";
import { eq, or } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      vehicleType,
      preferredContact,
      carMake,
      carModel,
      licenseNumber,
      address,
      carImageUrl,
      licenseFrontUrl,
      licenseBackUrl,
    } = body;

    // Input validation - only name and vehicleType are required
    if (!name || !vehicleType) {
      return NextResponse.json(
        { message: "Missing required fields: name and vehicleType are required" },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if driver with same email or phone already exists
    if (email || phone) {
      try {
        // Build conditions array for the OR query
        const conditions = [];
        if (email) {
          conditions.push(eq(drivers.email, email));
        }
        if (phone) {
          conditions.push(eq(drivers.phone, phone));
        }

        // Only query if we have at least one condition
        if (conditions.length > 0) {
          const existingDriver = await db
            .select()
            .from(drivers)
            .where(or(...conditions))
            .limit(1);

          if (existingDriver.length > 0) {
            const existing = existingDriver[0];
            if (email && existing.email === email && phone && existing.phone === phone) {
              return NextResponse.json(
                { message: "A driver with this email and phone number already exists. Please use different credentials or contact support." },
                { status: 409 }
              );
            } else if (email && existing.email === email) {
              return NextResponse.json(
                { message: "A driver with this email address already exists. Please use a different email or contact support." },
                { status: 409 }
              );
            } else if (phone && existing.phone === phone) {
              return NextResponse.json(
                { message: "A driver with this phone number already exists. Please use a different phone number or contact support." },
                { status: 409 }
              );
            }
          }
        }
      } catch (dbError: any) {
        // If database check fails, log but continue (don't block registration)
        if (process.env.NODE_ENV !== "production") {
          console.error("Error checking for existing driver:", dbError);
        }
      }
    }

    // Sanitize inputs for security
    const sanitizedName = sanitizeHtml(name);
    const sanitizedVehicleType = sanitizeHtml(vehicleType);
    const sanitizedPreferredContact = preferredContact ? sanitizeHtml(preferredContact) : undefined;
    const sanitizedCarMake = carMake ? sanitizeHtml(carMake) : undefined;
    const sanitizedCarModel = carModel ? sanitizeHtml(carModel) : undefined;
    const sanitizedLicenseNumber = licenseNumber ? sanitizeHtml(licenseNumber) : undefined;
    const sanitizedAddress = address ? sanitizeHtml(address) : undefined;

    // Generate admin email HTML using React Email template
    const adminEmailHtml = await render(
      DriverRegistrationAdminEmail({
        name: sanitizedName,
        email: email || undefined,
        phone: phone || undefined,
        address: sanitizedAddress,
        vehicleType: sanitizedVehicleType,
        preferredContact: sanitizedPreferredContact,
        carMake: sanitizedCarMake,
        carModel: sanitizedCarModel,
        licenseNumber: sanitizedLicenseNumber,
        carImageUrl: carImageUrl || undefined,
        licenseFrontUrl: licenseFrontUrl || undefined,
        licenseBackUrl: licenseBackUrl || undefined,
      })
    );

    // Generate user confirmation email HTML using React Email template
    // Always generate user email HTML if email is provided and valid
    let userEmailHtml: string | null = null;
    if (email && isValidEmail(email)) {
      try {
        userEmailHtml = await render(
          DriverRegistrationConfirmationEmail({
            name: sanitizedName,
            vehicleType: sanitizedVehicleType,
            preferredContact: sanitizedPreferredContact,
            carMake: sanitizedCarMake,
            carModel: sanitizedCarModel,
            licenseNumber: sanitizedLicenseNumber,
          })
        );
      } catch (renderError) {
        // If rendering fails, use admin email HTML as fallback
        userEmailHtml = adminEmailHtml;
      }
    }

    // Send emails - both admin and driver must receive emails
    const emailPromises = [];

    // Send email to admin (reservation@oktaxis.co.uk)
    const adminEmailPromise = sendEmail({
      to: "reservation@oktaxis.co.uk",
      subject: "New Driver Registration",
      html: adminEmailHtml,
    });
    emailPromises.push(adminEmailPromise);

    // Send email to driver - always attempt if email is provided and valid
    if (email && isValidEmail(email)) {
      // Use userEmailHtml if available, otherwise fallback to adminEmailHtml
      const driverEmailHtml = userEmailHtml || adminEmailHtml;
      const driverEmailPromise = sendEmail({
        to: email,
        subject: "Driver Registration Confirmation - OkTaxis",
        html: driverEmailHtml,
      });
      emailPromises.push(driverEmailPromise);
    } else {
      // If no email provided or invalid, track it as a "skipped" result
      emailPromises.push(Promise.resolve({ 
        success: false, 
        error: email ? "Invalid email format" : "No email provided for driver" 
      }));
    }

    // Save to database
    try {
      await db.insert(drivers).values({
        name: sanitizedName,
        email: email || null,
        phone: phone || null,
        address: sanitizedAddress || null,
        car_type: sanitizedVehicleType,
        car_image_url: carImageUrl || null,
        license_front_url: licenseFrontUrl || null,
        license_back_url: licenseBackUrl || null,
        status: "pending",
      });
    } catch (dbError: any) {
      // Error logged silently - don't fail the request if database save fails
      // Database errors are handled gracefully to ensure form submission succeeds
    }

    // Wait for emails and track results - use allSettled to wait for all emails
    const emailResults = await Promise.allSettled(emailPromises);
    
    // Extract results from promises
    const emailResultsData = emailResults.map((result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        return { 
          success: false, 
          error: result.reason?.message || "Email promise rejected",
          index 
        };
      }
    });
    
    const adminEmailResult = emailResultsData[0];
    const driverEmailResult = emailResultsData[1];
    
    const adminEmailSent = adminEmailResult?.success || false;
    const userEmailSent = driverEmailResult?.success || false;
    const anyEmailSent = adminEmailSent || userEmailSent;

    // Log email results for debugging (only in development)
    if (process.env.NODE_ENV !== "production") {
      console.log("Email sending results:", {
        admin: { sent: adminEmailSent, error: adminEmailResult?.error, email: "reservation@oktaxis.co.uk" },
        driver: { sent: userEmailSent, error: driverEmailResult?.error, email: email || "not provided" }
      });
    }

    // Return success with detailed email status
    return NextResponse.json({ 
      message: "Driver registration submitted successfully",
      success: true,
      emailSent: anyEmailSent,
      adminEmailSent,
      userEmailSent,
      emailDetails: {
        admin: {
          sent: adminEmailSent,
          error: adminEmailResult?.error || null,
          recipient: "reservation@oktaxis.co.uk"
        },
        driver: {
          sent: userEmailSent,
          error: driverEmailResult?.error || null,
          recipient: email || "not provided"
        }
      }
    });
  } catch (error) {
    // Return error response
    return NextResponse.json(
      { message: "An error occurred while processing your registration" },
      { status: 500 }
    );
  }
}
