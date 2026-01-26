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
import { useImageUpload } from "@/hooks/api/useImageUpload";
import { FileUpload } from "./components/file-upload";
import { AddressAutocomplete } from "./components/address-autocomplete";
import { VehicleSelector } from "./components/vehicle-selector";
import { driverFormValidationSchema } from "./validation";
import type { DriverFormValues, DriverFormPreviews, DriverSubmissionData } from "./types";
import { initialDriverFormValues, initialDriverFormPreviews } from "./constants";

function RegisterDriverForm() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [previews, setPreviews] = useState<DriverFormPreviews>(initialDriverFormPreviews);

  const { uploadMultipleImages, uploading } = useImageUpload();

  const handleSubmit = async (
    values: DriverFormValues,
    { setSubmitting, resetForm, setFieldError, setTouched }: any
  ) => {
    try {
      setSubmitting(true);

      const [
        fullCarResult,
        interiorResult,
        exteriorResult,
        passportPhotoResult,
        drivingLicenseFrontResult,
        phvLicenseResult,
        phvVehicleLicenseResult,
        motResult,
        insuranceResult,
      ] = await Promise.all([
        uploadMultipleImages([values.fullCarImage], { folder: "oktaxis-drivers/cars" }),
        uploadMultipleImages([values.interiorImage], { folder: "oktaxis-drivers/cars" }),
        uploadMultipleImages([values.exteriorImage], { folder: "oktaxis-drivers/cars" }),
        uploadMultipleImages([values.passportPhoto], { folder: "oktaxis-drivers/documents" }),
        uploadMultipleImages([values.drivingLicenseFront], { folder: "oktaxis-drivers/licenses" }),
        uploadMultipleImages([values.phvLicense], { folder: "oktaxis-drivers/licenses" }),
        uploadMultipleImages([values.phvVehicleLicense], { folder: "oktaxis-drivers/vehicle-documents" }),
        uploadMultipleImages([values.mot], { folder: "oktaxis-drivers/vehicle-documents" }),
        uploadMultipleImages([values.insurance], { folder: "oktaxis-drivers/vehicle-documents" }),
      ]);

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
        fullCarImageUrl: fullCarResult[0]!,
        interiorImageUrl: interiorResult[0]!,
        exteriorImageUrl: exteriorResult[0]!,
        passportPhotoUrl: passportPhotoResult[0]!,
        drivingLicenseFrontUrl: drivingLicenseFrontResult[0]!,
        phvLicenseUrl: phvLicenseResult[0]!,
        phvVehicleLicenseUrl: phvVehicleLicenseResult[0]!,
        motUrl: motResult[0]!,
        insuranceUrl: insuranceResult[0]!,
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
      // Backend returns: { success: false, error: "message" } or { success: false, message: "message" }
      const errorMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "An error occurred while submitting your application. Please try again.";

      // Set field-specific errors if the error message indicates which field has the issue
      const errorLower = errorMessage.toLowerCase();
      
      if (errorLower.includes("email") && (errorLower.includes("already exists") || errorLower.includes("already exist"))) {
        setFieldError("email", errorMessage);
        setTouched({ email: true });
      } else if (errorLower.includes("phone") && (errorLower.includes("already exists") || errorLower.includes("already exist"))) {
        setFieldError("phone", errorMessage);
        setTouched({ phone: true });
      }

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialDriverFormValues}
      validationSchema={driverFormValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting, errors, touched }) => (
        <Form className="space-y-8 bg-white rounded-2xl py-6 px-4 sm:p-6 md:p-8 shadow-lg border border-gray-200 max-h-[calc(100vh-4rem)] md:max-h-none overflow-y-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Partner With Us
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Join our driver network and start earning today.
            </p>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-5">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                Personal Information
              </h3>
              <p className="text-sm text-gray-600 mt-1">
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
                errors={errors}
                touched={touched}
              />

              <FormField
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
                Icon={Mail}
                required
                errors={errors}
                touched={touched}
              />
            </div>

            <Field name="phone">
              {({ field, form }: any) => (
                <div
                  className={`w-full rounded-lg bg-white px-4 py-3 border ${
                    errors.phone && touched.phone
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                >
                  <PhoneInput
                    value={field.value || ""}
                    onChange={(phone) => {
                      form.setFieldValue("phone", phone);
                    }}
                    error={Boolean(errors.phone && touched.phone)}
                    label="Phone Number *"
                    country="gb"
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              )}
            </Field>

            <AddressAutocomplete
              value={values.address}
              onChange={(value) => setFieldValue("address", value)}
              error={Boolean(errors.address)}
              touched={Boolean(touched.address)}
            />
            {errors.address && touched.address && (
              <p className="text-xs text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          {/* Bank Details Section */}
          <div className="space-y-5">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                Bank Details
              </h3>
              <p className="text-sm text-gray-600 mt-1">
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
                errors={errors}
                touched={touched}
              />

              <FormField
                name="accountNumber"
                label="Account Number"
                placeholder="Enter account number"
                type="text"
                required
                errors={errors}
                touched={touched}
              />

              <FormField
                name="sortCode"
                label="Sort Code"
                placeholder="Enter sort code"
                type="text"
                required
                errors={errors}
                touched={touched}
              />
            </div>

            <Field name="vatRegistered">
              {({ field, form }: any) => (
                <div className="w-full">
                  <label className="block text-sm sm:text-base font-medium text-text-gray mb-3">
                    VAT registered <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`w-full rounded-lg bg-white px-4 py-3 border ${
                      errors.vatRegistered && touched.vatRegistered
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  >
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
                  {errors.vatRegistered && touched.vatRegistered && (
                    <p className="text-xs text-red-500 mt-1">{errors.vatRegistered}</p>
                  )}
                </div>
              )}
            </Field>
          </div>

          {/* Car Details Section */}
          <div className="space-y-5">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                Car Details
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Please provide information about your vehicle
              </p>
            </div>

            <VehicleSelector
              value={values.carType}
              onChange={(value) => setFieldValue("carType", value)}
              error={Boolean(errors.carType)}
              touched={Boolean(touched.carType)}
            />
            {errors.carType && touched.carType && (
              <p className="text-xs text-red-500 mt-1">{errors.carType}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <FormField
                name="carModel"
                label="Model"
                placeholder="Enter car model"
                type="text"
                required
                errors={errors}
                touched={touched}
              />

              <FormField
                name="registrationNumber"
                label="Registration Number"
                placeholder="Enter registration number"
                type="text"
                required
                errors={errors}
                touched={touched}
              />

              <FormField
                name="year"
                label="Year"
                placeholder="Enter year (e.g., 2020)"
                type="text"
                required
                errors={errors}
                touched={touched}
              />
            </div>
          </div>

          {/* Driver Documents Section */}
          <div className="space-y-5">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                Driver Documents
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Please upload all required documents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FileUpload
                name="passportPhoto"
                label="Passport Photo"
                value={values.passportPhoto}
                preview={previews.passportPhoto}
                onChange={(file) => setFieldValue("passportPhoto", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, passportPhoto: preview }))
                }
                error={Boolean(errors.passportPhoto && touched.passportPhoto)}
              />
              {errors.passportPhoto && touched.passportPhoto && (
                <p className="text-xs text-red-500 mt-1 md:col-span-2">
                  {errors.passportPhoto}
                </p>
              )}

              <FileUpload
                name="drivingLicenseFront"
                label="Driving Licence Front"
                value={values.drivingLicenseFront}
                preview={previews.drivingLicenseFront}
                onChange={(file) => setFieldValue("drivingLicenseFront", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, drivingLicenseFront: preview }))
                }
                error={Boolean(errors.drivingLicenseFront && touched.drivingLicenseFront)}
              />
              {errors.drivingLicenseFront && touched.drivingLicenseFront && (
                <p className="text-xs text-red-500 mt-1 md:col-span-2">
                  {errors.drivingLicenseFront}
                </p>
              )}

              <FileUpload
                name="phvLicense"
                label="PHV Driver's Licence"
                value={values.phvLicense}
                preview={previews.phvLicense}
                onChange={(file) => setFieldValue("phvLicense", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, phvLicense: preview }))
                }
                error={Boolean(errors.phvLicense && touched.phvLicense)}
              />
              {errors.phvLicense && touched.phvLicense && (
                <p className="text-xs text-red-500 mt-1 md:col-span-2">
                  {errors.phvLicense}
                </p>
              )}
            </div>
          </div>

          {/* Vehicle Documents Section */}
          <div className="space-y-5">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                Vehicle Documents
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Please upload all required vehicle documents and images
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FileUpload
                name="fullCarImage"
                label="Full Car Image"
                value={values.fullCarImage}
                preview={previews.fullCarImage}
                onChange={(file) => setFieldValue("fullCarImage", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, fullCarImage: preview }))
                }
                error={Boolean(errors.fullCarImage && touched.fullCarImage)}
              />
              {errors.fullCarImage && touched.fullCarImage && (
                <p className="text-xs text-red-500 mt-1 md:col-span-2">
                  {errors.fullCarImage}
                </p>
              )}

              <FileUpload
                name="interiorImage"
                label="Interior Image"
                value={values.interiorImage}
                preview={previews.interiorImage}
                onChange={(file) => setFieldValue("interiorImage", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, interiorImage: preview }))
                }
                error={Boolean(errors.interiorImage && touched.interiorImage)}
              />
              {errors.interiorImage && touched.interiorImage && (
                <p className="text-xs text-red-500 mt-1 md:col-span-2">
                  {errors.interiorImage}
                </p>
              )}

              <FileUpload
                name="exteriorImage"
                label="Exterior Image"
                value={values.exteriorImage}
                preview={previews.exteriorImage}
                onChange={(file) => setFieldValue("exteriorImage", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, exteriorImage: preview }))
                }
                error={Boolean(errors.exteriorImage && touched.exteriorImage)}
              />
              {errors.exteriorImage && touched.exteriorImage && (
                <p className="text-xs text-red-500 mt-1 md:col-span-2">
                  {errors.exteriorImage}
                </p>
              )}

              <FileUpload
                name="phvVehicleLicense"
                label="PHV Vehicle Licence"
                value={values.phvVehicleLicense}
                preview={previews.phvVehicleLicense}
                onChange={(file) => setFieldValue("phvVehicleLicense", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, phvVehicleLicense: preview }))
                }
                error={Boolean(errors.phvVehicleLicense && touched.phvVehicleLicense)}
              />
              {errors.phvVehicleLicense && touched.phvVehicleLicense && (
                <p className="text-xs text-red-500 mt-1 md:col-span-2">
                  {errors.phvVehicleLicense}
                </p>
              )}

              <FileUpload
                name="mot"
                label="MOT"
                value={values.mot}
                preview={previews.mot}
                onChange={(file) => setFieldValue("mot", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, mot: preview }))
                }
                error={Boolean(errors.mot && touched.mot)}
              />
              {errors.mot && touched.mot && (
                <p className="text-xs text-red-500 mt-1 md:col-span-2">
                  {errors.mot}
                </p>
              )}

              <FileUpload
                name="insurance"
                label="Insurance"
                value={values.insurance}
                preview={previews.insurance}
                onChange={(file) => setFieldValue("insurance", file)}
                onPreviewChange={(preview) =>
                  setPreviews((prev) => ({ ...prev, insurance: preview }))
                }
                error={Boolean(errors.insurance && touched.insurance)}
              />
              {errors.insurance && touched.insurance && (
                <p className="text-xs text-red-500 mt-1 md:col-span-2">
                  {errors.insurance}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
