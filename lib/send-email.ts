import nodemailer from "nodemailer";
import { sanitizeHtml, isValidEmail } from "./utils";
import { getEmailConfig } from "./emailConfig";

interface EmailParams {
  to: string | string[];
  subject: string;
  html: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

const sendEmail = async ({ to, subject, html }: EmailParams): Promise<EmailResult> => {
  try {
    // Convert to array for validation and processing
    const recipients = Array.isArray(to) ? to : [to];
    
    // Validate all email addresses
    for (const email of recipients) {
      if (!isValidEmail(email)) {
        return {
          success: false,
          error: `Invalid email format: ${email}`,
        };
      }
    }

    // Check if required environment variables are set
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return {
        success: false,
        error: "Email configuration is missing. Please check EMAIL_HOST, EMAIL_USER, and EMAIL_PASSWORD environment variables.",
      };
    }

    // Sanitize HTML to prevent XSS attacks
    const sanitizedHtml = sanitizeHtml(html);

    // Create transport using shared configuration
    const transporter = nodemailer.createTransport(getEmailConfig());

    const mailOptions = {
      from: {
        name: "OkTaxis",
        address: process.env.EMAIL_USER || "reservation@oktaxis.co.uk",
      },
      to: recipients, // Use validated recipients array
      subject,
      html: sanitizedHtml,
      headers: {
        "X-Priority": "1", // Highest priority
        "X-MSMail-Priority": "High",
        Importance: "High",
      },
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: any) {
    // Extract detailed error information
    let errorMessage = "Unknown error";
    
    if (error.code) {
      errorMessage = `${error.code}: ${error.message || error.response || "SMTP error"}`;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.response) {
      errorMessage = error.response;
    }

    // Log error in development for debugging
    if (process.env.NODE_ENV !== "production") {
      console.error("Email sending error:", {
        to,
        subject,
        error: errorMessage,
        code: error.code,
        response: error.response,
        responseCode: error.responseCode,
      });
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export default sendEmail;
