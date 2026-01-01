/**
 * Get email configuration for nodemailer transporter
 * Uses environment variables with sensible defaults
 */
export function getEmailConfig() {
  const port = parseInt(process.env.EMAIL_PORT || "465", 10);
  
  return {
    host: process.env.EMAIL_HOST || "smtp.hostinger.com",
    port,
    secure: port === 465, // True for 465, false for other ports (587, etc.)
    auth: {
      user: process.env.EMAIL_USER || "reservation@oktaxis.co.uk",
      pass: process.env.EMAIL_PASSWORD || "",
    },
    tls: {
      // Do not fail on invalid certs in development
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 30000, // 30 seconds
  };
}

/**
 * Export config object for backwards compatibility
 * @deprecated Use getEmailConfig() function instead for consistency
 */
export const emailConfig = getEmailConfig();
