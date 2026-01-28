"use client";

import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/input";
import FormField from "@/components/ui/form-field";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { User, Mail, ArrowUp, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/api-endpoints";
import { FileUpload } from "./components/file-upload";
import { AddressAutocomplete } from "./components/address-autocomplete";
import { VehicleSelector } from "./components/vehicle-selector";
import type { DriverFormValues, DriverFormPreviews, DriverSubmissionData } from "./types";
import { initialDriverFormValues, initialDriverFormPreviews } from "./constants";

// Direct upload function for parallel uploads
const uploadSingleImage = async (file: File | null, folder: string): Promise<string | null> => {
  if (!file) return null;
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  
  try {
    const response = await apiClient.post(API_ENDPOINTS.UPLOAD_IMAGE, formData);
    if (response.data?.success && response.data?.data?.url) {
      return response.data.data.url;
    }
    if (response.data?.url) {
      return response.data.url;
    }
    return null;
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
};

function RegisterDriverForm() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<DriverFormPreviews>(initialDriverFormPreviews);

  const handleSubmit = async (
    values: DriverFormValues,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      setSubmitting(true);
      setUploading(true);

      // Upload all images in true parallel - all 9 uploads happen simultaneously
      const [
        fullCarUrl,
        interiorUrl,
        exteriorUrl,
        passportPhotoUrl,
        drivingLicenseFrontUrl,
        phvLicenseUrl,
        phvVehicleLicenseUrl,
        motUrl,
        insuranceUrl,
      ] = await Promise.all([
        uploadSingleImage(values.fullCarImage, "oktaxis-drivers/cars"),
        uploadSingleImage(values.interiorImage, "oktaxis-drivers/cars"),
        uploadSingleImage(values.exteriorImage, "oktaxis-drivers/cars"),
        uploadSingleImage(values.passportPhoto, "oktaxis-drivers/documents"),
        uploadSingleImage(values.drivingLicenseFront, "oktaxis-drivers/licenses"),
        uploadSingleImage(values.phvLicense, "oktaxis-drivers/licenses"),
        uploadSingleImage(values.phvVehicleLicense, "oktaxis-drivers/vehicle-documents"),
        uploadSingleImage(values.mot, "oktaxis-drivers/vehicle-documents"),
        uploadSingleImage(values.insurance, "oktaxis-drivers/vehicle-documents"),
      ]);

      setUploading(false);

      // Check if all required uploads succeeded
      const uploadResults = {
        fullCarUrl,
        interiorUrl,
        exteriorUrl,
        passportPhotoUrl,
        drivingLicenseFrontUrl,
        phvLicenseUrl,
        phvVehicleLicenseUrl,
        motUrl,
        insuranceUrl,
      };

      const failedUploads = Object.entries(uploadResults)
        .filter(([, url]) => !url)
        .map(([key]) => key);

      if (failedUploads.length > 0) {
        throw new Error(`Failed to upload some documents. Please try again.`);
      }

      const driverData: DriverSubmissionData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        vehicleType: values.carType,
        carModel: values.carModel,
        registrationNumber: values.registrationNumber,
        year: values.year,
        accountName: values.accountName,
        accountNumber: values.accountNumber,
        sortCode: values.sortCode,
        vatRegistered: values.vatRegistered,
        fullCarImageUrl: fullCarUrl!,
        interiorImageUrl: interiorUrl!,
        exteriorImageUrl: exteriorUrl!,
        passportPhotoUrl: passportPhotoUrl!,
        drivingLicenseFrontUrl: drivingLicenseFrontUrl!,
        phvLicenseUrl: phvLicenseUrl!,
        phvVehicleLicenseUrl: phvVehicleLicenseUrl!,
        motUrl: motUrl!,
        insuranceUrl: insuranceUrl!,
      };

      const response = await apiClient.post(API_ENDPOINTS.DRIVERS, driverData);

      if (response.data.success) {
        setFormSubmitted(true);
        toast({
          title: "Application Submitted",
          description:
            "Your driver application has been submitted successfully. We'll review it and get back to you soon.",
          variant: "default",
        });

        resetForm();
        setPreviews(initialDriverFormPreviews);
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "An error occurred while submitting your application. Please try again.";


      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  return (
    <Formik
      initialValues={initialDriverFormValues}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="space-y-6 sm:space-y-8 bg-white">
          <div className="space-y-4 sm:space-y-5 border-b border-gray-200 pb-2 sm:pb-5">
            <div className="">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                Personal <span className="text-primary-yellow">Information</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Please provide your personal details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                type="text"
                Icon={User}
                required
              />

              <FormField
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
                Icon={Mail}
                required
              />

            <Field name="phone">
              {({ field, form }: any) => (
                <div className="w-full rounded-lg bg-white px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200">
                  <PhoneInput
                    value={field.value || ""}
                    onChange={(phone) => {
                      form.setFieldValue("phone", phone);
                    }}
                    error={false}
                    label="Phone Number *"
                    country="gb"
                  />
                </div>
              )}
            </Field>

            <AddressAutocomplete
              value={values.address}
              onChange={(value) => setFieldValue("address", value)}
              error={false}
              touched={false}
            />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5 border-b border-gray-200 pb-2 sm:pb-5">
            <div className="">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                Bank <span className="text-primary-yellow">Details</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Please provide your banking information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <FormField
                name="accountName"
                label="Account Name"
                placeholder="Enter account name"
                type="text"
                required
              />

              <FormField
                name="accountNumber"
                label="Account Number"
                placeholder="Enter account number"
                type="text"
                required
              />

              <FormField
                name="sortCode"
                label="Sort Code"
                placeholder="Enter sort code"
                type="text"
                required
              />
            </div>

            <Field name="vatRegistered">
              {({ field, form }: any) => (
                <div className="w-full">
                  <label className="block text-xs sm:text-sm md:text-base font-medium text-text-gray mb-2 sm:mb-3">
                    VAT registered <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full">
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="vatRegistered"
                          value="Yes"
                          checked={field.value === "Yes"}
                          onChange={(e) => {
                            form.setFieldValue("vatRegistered", e.target.value);
                          }}
                          className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                        />
                        <span className="text-sm sm:text-base text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="vatRegistered"
                          value="No"
                          checked={field.value === "No"}
                          onChange={(e) => {
                            form.setFieldValue("vatRegistered", e.target.value);
                          }}
                          className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                        />
                        <span className="text-sm sm:text-base text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </Field>
          </div>
          <div className="space-y-4 sm:space-y-5 border-b border-gray-200 pb-2 sm:pb-5">
            <div className="">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                Car <span className="text-primary-yellow">Details</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Please provide information about your vehicle
              </p>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <VehicleSelector
              value={values.carType}
              onChange={(value) => setFieldValue("carType", value)}
              error={false}
              touched={false}
            />
              <FormField
                name="carModel"
                label="Model"
                placeholder="Enter car model"
                type="text"
                required
              />

              <FormField
                name="registrationNumber"
                label="Registration Number"
                placeholder="Enter registration number"
                type="text"
                required
              />

              <FormField
                name="year"
                label="Year"
                placeholder="Enter year (e.g., 2020)"
                type="text"
                required
              />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5 border-b border-gray-200 pb-2 sm:pb-5">
            <div className="">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                Driver <span className="text-primary-yellow">Documents</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Please upload all required documents
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <FileUpload
                name="passportPhoto"
                label="Passport Photo"
                value={values.passportPhoto}
                preview={previews.passportPhoto}
                onChange={(file) => setFieldValue("passportPhoto", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, passportPhoto: preview }))
                }
                error={false}
              />

              <FileUpload
                name="drivingLicenseFront"
                label="Driving Licence Front"
                value={values.drivingLicenseFront}
                preview={previews.drivingLicenseFront}
                onChange={(file) => setFieldValue("drivingLicenseFront", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, drivingLicenseFront: preview }))
                }
                error={false}
              />

              <FileUpload
                name="phvLicense"
                label="PHV Driver's Licence"
                value={values.phvLicense}
                preview={previews.phvLicense}
                onChange={(file) => setFieldValue("phvLicense", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, phvLicense: preview }))
                }
                error={false}
              />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5 border-b border-gray-200 pb-2 sm:pb-5">
            <div className="">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                Vehicle <span className="text-primary-yellow">Documents</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Please upload all required vehicle documents and images
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <FileUpload
                name="fullCarImage"
                label="Full Car Image"
                value={values.fullCarImage}
                preview={previews.fullCarImage}
                onChange={(file) => setFieldValue("fullCarImage", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, fullCarImage: preview }))
                }
                error={false}
              />

              <FileUpload
                name="interiorImage"
                label="Interior Image"
                value={values.interiorImage}
                preview={previews.interiorImage}
                onChange={(file) => setFieldValue("interiorImage", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, interiorImage: preview }))
                }
                error={false}
              />

              <FileUpload
                name="exteriorImage"
                label="Exterior Image"
                value={values.exteriorImage}
                preview={previews.exteriorImage}
                onChange={(file) => setFieldValue("exteriorImage", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, exteriorImage: preview }))
                }
                error={false}
              />

              <FileUpload
                name="phvVehicleLicense"
                label="PHV Vehicle Licence"
                value={values.phvVehicleLicense}
                preview={previews.phvVehicleLicense}
                onChange={(file) => setFieldValue("phvVehicleLicense", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, phvVehicleLicense: preview }))
                }
                error={false}
              />

              <FileUpload
                name="mot"
                label="MOT"
                value={values.mot}
                preview={previews.mot}
                onChange={(file) => setFieldValue("mot", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, mot: preview }))
                }
                error={false}
              />

              <FileUpload
                name="insurance"
                label="Insurance"
                value={values.insurance}
                preview={previews.insurance}
                onChange={(file) => setFieldValue("insurance", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, insurance: preview }))
                }
                error={false}
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              disabled={isSubmitting || formSubmitted || uploading}
            >
              {isSubmitting || uploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : formSubmitted ? (
                <>
                  <ArrowUp className="h-5 w-5" />
                  <span>Application Submitted</span>
                </>
              ) : (
                <>
                  <ArrowUp className="h-5 w-5" />
                  <span>Submit Application</span>
                </>
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterDriverForm;
