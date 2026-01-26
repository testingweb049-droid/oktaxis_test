/**
 * Driver Registration Form Types
 */

export interface DriverFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  carType: string;
  carModel: string;
  registrationNumber: string;
  year: string;
  accountName: string;
  accountNumber: string;
  sortCode: string;
  vatRegistered: string;
  fullCarImage: File | null;
  interiorImage: File | null;
  exteriorImage: File | null;
  passportPhoto: File | null;
  drivingLicenseFront: File | null;
  phvLicense: File | null;
  phvVehicleLicense: File | null;
  mot: File | null;
  insurance: File | null;
}

export interface DriverFormPreviews {
  fullCarImage: string | null;
  interiorImage: string | null;
  exteriorImage: string | null;
  passportPhoto: string | null;
  drivingLicenseFront: string | null;
  phvLicense: string | null;
  phvVehicleLicense: string | null;
  mot: string | null;
  insurance: string | null;
}

export interface DriverSubmissionData {
  name: string;
  email: string;
  phone: string;
  address: string;
  vehicleType: string;
  carModel: string;
  registrationNumber: string;
  year: string;
  accountName: string;
  accountNumber: string;
  sortCode: string;
  vatRegistered: string;
  fullCarImageUrl: string;
  interiorImageUrl: string;
  exteriorImageUrl: string;
  passportPhotoUrl: string;
  drivingLicenseFrontUrl: string;
  phvLicenseUrl: string;
  phvVehicleLicenseUrl: string;
  motUrl: string;
  insuranceUrl: string;
}

