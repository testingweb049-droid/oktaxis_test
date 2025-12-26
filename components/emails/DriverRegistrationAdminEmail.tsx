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
  Link,
  Row,
  Column,
} from "@react-email/components";

interface DriverRegistrationAdminEmailProps {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  vehicleType: string;
  preferredContact?: string;
  carMake?: string;
  carModel?: string;
  licenseNumber?: string;
  carImageUrl?: string;
  licenseFrontUrl?: string;
  licenseBackUrl?: string;
}

export function DriverRegistrationAdminEmail({
  name,
  email,
  phone,
  address,
  vehicleType,
  preferredContact,
  carMake,
  carModel,
  licenseNumber,
  carImageUrl,
  licenseFrontUrl,
  licenseBackUrl,
}: DriverRegistrationAdminEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New driver registration: {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>New Driver Registration</Heading>
            <Text style={headerSubtitle}>A new driver has submitted their registration</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>Hello Admin,</Text>
            <Text style={paragraph}>
              A new driver registration has been received. Please review the details below:
            </Text>

            <Hr style={divider} />

            {/* Personal Information */}
            <Section style={section}>
              <Heading style={sectionTitle}>Personal Information</Heading>
              <Row style={row}>
                <Column style={labelColumn}>
                  <Text style={label}>Full Name:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{name}</Text>
                </Column>
              </Row>
              {email && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>Email:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{email}</Text>
                  </Column>
                </Row>
              )}
              {phone && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>Phone:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{phone}</Text>
                  </Column>
                </Row>
              )}
              {address && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>Address:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{address}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            <Hr style={divider} />

            {/* Vehicle Information */}
            <Section style={section}>
              <Heading style={sectionTitle}>Vehicle Information</Heading>
              <Row style={row}>
                <Column style={labelColumn}>
                  <Text style={label}>Vehicle Type:</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{vehicleType}</Text>
                </Column>
              </Row>
              {carMake && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>Car Make:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{carMake}</Text>
                  </Column>
                </Row>
              )}
              {carModel && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>Car Model:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{carModel}</Text>
                  </Column>
                </Row>
              )}
              {preferredContact && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>Preferred Contact:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{preferredContact}</Text>
                  </Column>
                </Row>
              )}
              {licenseNumber && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>License Number:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={value}>{licenseNumber}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            <Hr style={divider} />

            {/* Documents */}
            <Section style={section}>
              <Heading style={sectionTitle}>Documents & Images</Heading>
              {carImageUrl && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>Car Image:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Link href={carImageUrl} style={link}>
                      View Car Image
                    </Link>
                  </Column>
                </Row>
              )}
              {licenseFrontUrl && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>License Front:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Link href={licenseFrontUrl} style={link}>
                      View License Front
                    </Link>
                  </Column>
                </Row>
              )}
              {licenseBackUrl && (
                <Row style={row}>
                  <Column style={labelColumn}>
                    <Text style={label}>License Back:</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Link href={licenseBackUrl} style={link}>
                      View License Back
                    </Link>
                  </Column>
                </Row>
              )}
              {!carImageUrl && !licenseFrontUrl && !licenseBackUrl && (
                <Text style={noDocuments}>No documents uploaded</Text>
              )}
            </Section>

            <Hr style={divider} />

            <Text style={footer}>
              Please review this registration and take appropriate action.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>OkTaxis Driver Registration System</Text>
            <Text style={footerSubtext}>
              This is an automated notification. Please do not reply to this email.
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
  backgroundColor: "#1f2937",
  color: "#ffffff",
  padding: "30px 40px",
  textAlign: "center",
};

const headerTitle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "700",
  margin: "0 0 10px 0",
  color: "#ffffff",
};

const headerSubtitle: React.CSSProperties = {
  fontSize: "16px",
  color: "#d1d5db",
  margin: "0",
};

const content: React.CSSProperties = {
  padding: "40px",
};

const greeting: React.CSSProperties = {
  fontSize: "16px",
  color: "#333",
  margin: "0 0 16px 0",
  fontWeight: "500",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  color: "#4b5563",
  lineHeight: "1.6",
  margin: "0 0 20px 0",
};

const divider: React.CSSProperties = {
  borderTop: "2px solid #e5e7eb",
  margin: "24px 0",
};

const section: React.CSSProperties = {
  marginBottom: "24px",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1f2937",
  margin: "0 0 16px 0",
};

const row: React.CSSProperties = {
  marginBottom: "12px",
};

const labelColumn: React.CSSProperties = {
  width: "140px",
  verticalAlign: "top",
};

const valueColumn: React.CSSProperties = {
  verticalAlign: "top",
};

const label: React.CSSProperties = {
  fontSize: "14px",
  color: "#6b7280",
  fontWeight: "500",
  margin: "0",
};

const value: React.CSSProperties = {
  fontSize: "14px",
  color: "#111827",
  margin: "0",
  fontWeight: "400",
};

const link: React.CSSProperties = {
  color: "#2563eb",
  textDecoration: "underline",
  fontSize: "14px",
};

const noDocuments: React.CSSProperties = {
  fontSize: "14px",
  color: "#9ca3af",
  fontStyle: "italic",
  margin: "0",
};

const footer: React.CSSProperties = {
  fontSize: "15px",
  color: "#4b5563",
  lineHeight: "1.6",
  margin: "24px 0 0 0",
  padding: "16px",
  backgroundColor: "#f9fafb",
  borderRadius: "6px",
  textAlign: "center",
};

const footerSection: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  padding: "24px 40px",
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
  margin: "0",
};

