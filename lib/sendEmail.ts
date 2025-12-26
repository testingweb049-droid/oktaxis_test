import nodemailer from "nodemailer";
import { sanitizeHtml } from "./utils"; // Create this utility function

interface EmailParams {
  to: string;
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
    // Validate email address format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return {
        success: false,
        error: `Invalid email format: ${to}`,
      };
    }

    // Check if required environment variables are set
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return {
        success: false,
        error: "Email configuration is missing. Please check EMAIL_HOST, EMAIL_USER, and EMAIL_PASSWORD environment variables.",
      };
    }

    // Sanitize HTML to prevent XSS attacks (implement sanitizeHtml utility)
    const sanitizedHtml = sanitizeHtml(html);

    // Create transport with TLS
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_PORT === "465", // True for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: process.env.NODE_ENV === "production",
      },
      connectionTimeout: 30000, // 30 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 30000, // 30 seconds
    });

    const mailOptions = {
      from: {
        name: "OkTaxis",
        address: process.env.EMAIL_USER || "info@oktaxis.co.uk",
      },
      to,
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
