/**
 * Driver Registration Form Validation Schema
 * Backend handles file validation (size, type, etc.)
 */

import * as Yup from "yup";

export const driverFormValidationSchema = Yup.object({
  name: Yup.string()
    .required("Full Name is required")
    .min(2, "Full Name must be at least 2 characters")
    .max(100, "Full Name must not exceed 100 characters")
    .matches(/^[a-zA-Z\s'-]+$/, "Full Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must not exceed 255 characters"),
  phone: Yup.string()
    .required("Phone Number is required")
    .min(10, "Phone Number must be at least 10 digits")
    .matches(/^[\d\s\+\-\(\)]+$/, "Phone Number contains invalid characters"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must not exceed 500 characters"),
  carType: Yup.string()
    .required("Vehicle Type is required")
    .min(2, "Vehicle Type must be at least 2 characters")
    .max(100, "Vehicle Type must not exceed 100 characters"),
  carModel: Yup.string()
    .required("Model is required")
    .min(1, "Model is required")
    .max(100, "Model must not exceed 100 characters"),
  registrationNumber: Yup.string()
    .required("Registration Number is required")
    .min(2, "Registration Number must be at least 2 characters")
    .max(20, "Registration Number must not exceed 20 characters")
    .matches(/^[A-Z0-9\s\-]+$/i, "Registration Number can only contain letters, numbers, spaces, and hyphens"),
  year: Yup.string()
    .required("Year is required")
    .matches(/^\d{4}$/, "Year must be a valid 4-digit year")
    .test("valid-year", "Year must be between 1900 and current year", function (value) {
      if (!value) return false;
      const yearNum = parseInt(value, 10);
      const currentYear = new Date().getFullYear();
      return yearNum >= 1900 && yearNum <= currentYear;
    }),
  accountName: Yup.string()
    .required("Account Name is required")
    .min(2, "Account Name must be at least 2 characters")
    .max(100, "Account Name must not exceed 100 characters")
    .matches(/^[a-zA-Z\s'-]+$/, "Account Name can only contain letters, spaces, hyphens, and apostrophes"),
  accountNumber: Yup.string()
    .required("Account Number is required")
    .matches(/^\d{8,10}$/, "Account Number must be 8-10 digits"),
  sortCode: Yup.string()
    .required("Sort Code is required")
    .matches(/^\d{6}$/, "Sort Code must be exactly 6 digits"),
  vatRegistered: Yup.string()
    .required("VAT registered status is required")
    .oneOf(["Yes", "No"], "Please select Yes or No"),
  fullCarImage: Yup.mixed<File>()
    .required("Full Car Image is required")
    .test("file-required", "Full Car Image is required", (value) => {
      return value !== null && value !== undefined;
    }),
  interiorImage: Yup.mixed<File>()
    .required("Interior Image is required")
    .test("file-required", "Interior Image is required", (value) => {
      return value !== null && value !== undefined;
    }),
  exteriorImage: Yup.mixed<File>()
    .required("Exterior Image is required")
    .test("file-required", "Exterior Image is required", (value) => {
      return value !== null && value !== undefined;
    }),
  passportPhoto: Yup.mixed<File>()
    .required("Passport Photo is required")
    .test("file-required", "Passport Photo is required", (value) => {
      return value !== null && value !== undefined;
    }),
  drivingLicenseFront: Yup.mixed<File>()
    .required("Driving Licence Front is required")
    .test("file-required", "Driving Licence Front is required", (value) => {
      return value !== null && value !== undefined;
    }),
  phvLicense: Yup.mixed<File>()
    .required("PHV Driver's Licence is required")
    .test("file-required", "PHV Driver's Licence is required", (value) => {
      return value !== null && value !== undefined;
    }),
  phvVehicleLicense: Yup.mixed<File>()
    .required("PHV Vehicle Licence is required")
    .test("file-required", "PHV Vehicle Licence is required", (value) => {
      return value !== null && value !== undefined;
    }),
  mot: Yup.mixed<File>()
    .required("MOT is required")
    .test("file-required", "MOT is required", (value) => {
      return value !== null && value !== undefined;
    }),
  insurance: Yup.mixed<File>()
    .required("Insurance is required")
    .test("file-required", "Insurance is required", (value) => {
      return value !== null && value !== undefined;
    }),
});

