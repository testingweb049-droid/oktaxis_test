import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Button,
  Link,
} from "@react-email/components";

interface DriverRegistrationConfirmationEmailProps {
  name: string;
  vehicleType: string;
  preferredContact?: string;
  carMake?: string;
  carModel?: string;
  licenseNumber?: string;
}

export function DriverRegistrationConfirmationEmail({
  name,
  vehicleType,
  preferredContact,
  carMake,
  carModel,
  licenseNumber,
}: DriverRegistrationConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for registering with OkTaxis!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Welcome to OkTaxis!</Heading>
            <Text style={headerSubtitle}>Your driver registration has been received</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>Dear {name},</Text>
            
            <Text style={paragraph}>
              Thank you for your interest in joining the OkTaxis driver network! We're excited 
              to have you on board.
            </Text>

            <Text style={paragraph}>
              Your registration has been successfully submitted and is currently under review. 
              Our team will carefully review your application and get back to you shortly.
            </Text>

            <Hr style={divider} />

            {/* Registration Details */}
            <Section style={section}>
              <Heading style={sectionTitle}>Your Registration Details</Heading>
              
              <Section style={detailRow}>
                <Text style={detailLabel}>Vehicle Type:</Text>
                <Text style={detailValue}>{vehicleType}</Text>
              </Section>

              {preferredContact && (
                <Section style={detailRow}>
                  <Text style={detailLabel}>Preferred Contact:</Text>
                  <Text style={detailValue}>{preferredContact}</Text>
                </Section>
              )}

              {carMake && (
                <Section style={detailRow}>
                  <Text style={detailLabel}>Car Make:</Text>
                  <Text style={detailValue}>{carMake}</Text>
                </Section>
              )}

              {carModel && (
                <Section style={detailRow}>
                  <Text style={detailLabel}>Car Model:</Text>
                  <Text style={detailValue}>{carModel}</Text>
                </Section>
              )}

              {licenseNumber && (
                <Section style={detailRow}>
                  <Text style={detailLabel}>License Number:</Text>
                  <Text style={detailValue}>{licenseNumber}</Text>
                </Section>
              )}
            </Section>

            <Hr style={divider} />

            {/* Next Steps */}
            <Section style={section}>
              <Heading style={sectionTitle}>What Happens Next?</Heading>
              <Text style={listItem}>✓ Our team will review your application</Text>
              <Text style={listItem}>✓ We'll verify your documents and credentials</Text>
              <Text style={listItem}>✓ You'll receive an email with the approval status</Text>
              <Text style={listItem}>✓ Once approved, you can start accepting rides!</Text>
            </Section>

            <Hr style={divider} />

            <Text style={paragraph}>
              If you have any questions or need to update your information, please don't 
              hesitate to contact us at{" "}
              <Link href="mailto:reservation@oktaxis.co.uk" style={link}>
                reservation@oktaxis.co.uk
              </Link>
              .
            </Text>

            <Section style={buttonSection}>
              <Button style={button} href="https://oktaxis.co.uk">
                Visit Our Website
              </Button>
            </Section>

            <Text style={closing}>
              We look forward to working with you!
            </Text>

            <Text style={signature}>
              Best regards,<br />
              <strong>The OkTaxis Team</strong>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>OkTaxis - Your Trusted Transportation Partner</Text>
            <Text style={footerSubtext}>
              This is an automated confirmation email. Please do not reply to this email.
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerLinks}>
              <Link href="https://oktaxis.co.uk" style={footerLink}>Website</Link> •{" "}
              <Link href="mailto:reservation@oktaxis.co.uk" style={footerLink}>Contact Us</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main: React.CSSProperties = {
  backgroundColor: "#f6f9fc",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  padding: "20px",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  margin: "0 auto",
  maxWidth: "600px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  overflow: "hidden",
};

const header: React.CSSProperties = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#ffffff",
  padding: "40px",
  textAlign: "center",
};

const headerTitle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: "700",
  margin: "0 0 10px 0",
  color: "#ffffff",
};

const headerSubtitle: React.CSSProperties = {
  fontSize: "16px",
  color: "#f3f4f6",
  margin: "0",
};

const content: React.CSSProperties = {
  padding: "40px",
};

const greeting: React.CSSProperties = {
  fontSize: "18px",
  color: "#1f2937",
  margin: "0 0 20px 0",
  fontWeight: "500",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  color: "#4b5563",
  lineHeight: "1.7",
  margin: "0 0 20px 0",
};

const divider: React.CSSProperties = {
  borderTop: "2px solid #e5e7eb",
  margin: "28px 0",
};

const section: React.CSSProperties = {
  marginBottom: "28px",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#1f2937",
  margin: "0 0 16px 0",
};

const detailRow: React.CSSProperties = {
  marginBottom: "12px",
  padding: "12px",
  backgroundColor: "#f9fafb",
  borderRadius: "6px",
};

const detailLabel: React.CSSProperties = {
  fontSize: "13px",
  color: "#6b7280",
  fontWeight: "500",
  margin: "0 0 4px 0",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const detailValue: React.CSSProperties = {
  fontSize: "15px",
  color: "#111827",
  margin: "0",
  fontWeight: "500",
};

const listItem: React.CSSProperties = {
  fontSize: "15px",
  color: "#4b5563",
  lineHeight: "1.8",
  margin: "0 0 8px 0",
  paddingLeft: "8px",
};

const link: React.CSSProperties = {
  color: "#667eea",
  textDecoration: "none",
  fontWeight: "500",
};

const buttonSection: React.CSSProperties = {
  textAlign: "center",
  margin: "32px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#667eea",
  color: "#ffffff",
  padding: "14px 32px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "15px",
  display: "inline-block",
};

const closing: React.CSSProperties = {
  fontSize: "15px",
  color: "#4b5563",
  lineHeight: "1.7",
  margin: "28px 0 20px 0",
  fontStyle: "italic",
};

const signature: React.CSSProperties = {
  fontSize: "15px",
  color: "#1f2937",
  lineHeight: "1.8",
  margin: "20px 0 0 0",
};

const footerSection: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  padding: "32px 40px",
  textAlign: "center",
  borderTop: "1px solid #e5e7eb",
};

const footerText: React.CSSProperties = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "0 0 8px 0",
  fontWeight: "500",
};

const footerSubtext: React.CSSProperties = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "0 0 16px 0",
};

const footerDivider: React.CSSProperties = {
  borderTop: "1px solid #e5e7eb",
  margin: "16px 0",
};

const footerLinks: React.CSSProperties = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "0",
};

const footerLink: React.CSSProperties = {
  color: "#667eea",
  textDecoration: "none",
};

