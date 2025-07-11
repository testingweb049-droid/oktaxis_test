import sendEmail from "@/lib/sendEmail";
import { isValidEmail, safeLog, sanitizeHtml } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
// ggg
// ggg
// ggg
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, vehicleType, licenseNumber } = body;

    // Input validation
    if (!name || !email || !phone || !vehicleType || !licenseNumber) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Sanitize inputs for security
    const sanitizedName = sanitizeHtml(name);
    const sanitizedVehicleType = sanitizeHtml(vehicleType);
    const sanitizedLicenseNumber = sanitizeHtml(licenseNumber);

    // Log sanitized input data in development only
    safeLog(
      "Driver registration submission:",
      {
        name: sanitizedName,
        email,
        phone,
        vehicleType: sanitizedVehicleType,
        licenseNumber: sanitizedLicenseNumber,
      },
      false
    );

    const commonStyles = `
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    `;

    const headerStyle = `
      background-color: #1f2937; 
      color: white;
      padding: 20px;
      text-align: center;
    `;

    const contentStyle = `
      background-color: #f9f9f9;
      padding: 20px;
    `;

    // Admin Email Content
    const adminEmailContent = `
      <div style="${commonStyles}">
        <div style="${headerStyle}">
          <h2>New Driver Registration</h2>
        </div>
        <div style="${contentStyle}">
          <p><b>Name:</b> ${sanitizedName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Vehicle Type:</b> ${sanitizedVehicleType}</p>
          <p><b>License Number:</b> ${sanitizedLicenseNumber}</p>
        </div>
      </div>
    `;

    // Send email to admin
    await sendEmail({
      to: process.env.EMAIL_USER || "info@oktaxis.co.uk",
      subject: "New Driver Registration",
      html: adminEmailContent,
    });

    // User Email Content
    const userEmailContent = `
      <div style="${commonStyles}">
        <div style="${headerStyle}">
          <h2>Welcome to OkTaxis</h2>
        </div>
        <div style="${contentStyle}">
          <p>Dear ${sanitizedName},</p>
          <p>Thank you for registering as a driver with OkTaxis. Your application has been successfully received.</p>
          <p>We will review your details and get back to you shortly.</p>
          <p>Best regards,<br>The OkTaxis Team</p>
        </div>
      </div>
    `;

    // Send email to user
    await sendEmail({
      to: email,
      subject: "Driver Registration Confirmation",
      html: userEmailContent,
    });

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Failed to send emails:", error);
    return NextResponse.json(
      { message: "Failed to send emails" },
      { status: 500 }
    );
  }
}
