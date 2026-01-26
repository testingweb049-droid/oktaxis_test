/**
 * Driver Registration Form Constants
 */

import type { DriverFormValues, DriverFormPreviews } from "./types";

/**
 * Initial form values for driver registration
 */
export const initialDriverFormValues: DriverFormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  carType: "",
  carModel: "",
  registrationNumber: "",
  year: "",
  accountName: "",
  accountNumber: "",
  sortCode: "",
  vatRegistered: "",
  fullCarImage: null,
  interiorImage: null,
  exteriorImage: null,
  passportPhoto: null,
  drivingLicenseFront: null,
  phvLicense: null,
  phvVehicleLicense: null,
  mot: null,
  insurance: null,
};

/**
 * Initial preview state for uploaded images
 */
export const initialDriverFormPreviews: DriverFormPreviews = {
  fullCarImage: null,
  interiorImage: null,
  exteriorImage: null,
  passportPhoto: null,
  drivingLicenseFront: null,
  phvLicense: null,
  phvVehicleLicense: null,
  mot: null,
  insurance: null,
};

