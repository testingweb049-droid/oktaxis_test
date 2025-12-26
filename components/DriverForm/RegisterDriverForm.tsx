"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormField from "@/components/ui/FormField";
import { registerDriverEmail } from "@/lib/utils";
import { Field, Form, Formik } from "formik";
import { useState, useRef, useEffect } from "react";
import * as Yup from "yup";
import { User, Mail, Phone, MapPin, Car, ArrowUp, FileText, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone Number is required"),
  address: Yup.string().required("Address is required"),
  carType: Yup.string().required("Car Type is required"),
  carImage: Yup.mixed().required("Car Image is required"),
  licenseFront: Yup.mixed().required("License Front is required"),
  licenseBack: Yup.mixed().required("License Back is required"),
});

export interface DriverFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  carType: string;
  carImage: File | null;
  licenseFront: File | null;
  licenseBack: File | null;
  carImageUrl?: string;
  licenseFrontUrl?: string;
  licenseBackUrl?: string;
}

export default function RegisterDriverForm() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [previews, setPreviews] = useState<{
    carImage: string | null;
    licenseFront: string | null;
    licenseBack: string | null;
  }>({
    carImage: null,
    licenseFront: null,
    licenseBack: null,
  });
  const carImageRef = useRef<HTMLInputElement>(null);
  const licenseFrontRef = useRef<HTMLInputElement>(null);
  const licenseBackRef = useRef<HTMLInputElement>(null);

  // Clean up preview URLs when they change or on unmount
  useEffect(() => {
    const currentPreviews = { ...previews };
    return () => {
      if (currentPreviews.carImage) URL.revokeObjectURL(currentPreviews.carImage);
      if (currentPreviews.licenseFront) URL.revokeObjectURL(currentPreviews.licenseFront);
      if (currentPreviews.licenseBack) URL.revokeObjectURL(currentPreviews.licenseBack);
    };
  }, [previews.carImage, previews.licenseFront, previews.licenseBack]);

  const uploadImage = async (file: File | null, folder: string): Promise<string | null> => {
    if (!file) return null;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      // Create an AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 55000); // 55 seconds timeout

      try {
        const response = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.url) {
          return result.url;
        } else {
          return null;
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === "AbortError") {
          // Upload timed out
        } else {
          throw fetchError;
        }
        return null;
      }
    } catch (err) {
      return null;
    }
  };

  const handleSubmit = async (
    values: DriverFormValues,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      setError("");
      setSubmitting(true);

      // Upload images to Cloudinary first - use allSettled so failures don't block submission
      const uploadResults = await Promise.allSettled([
        uploadImage(values.carImage, "oktaxis-drivers/car-images"),
        uploadImage(values.licenseFront, "oktaxis-drivers/licenses"),
        uploadImage(values.licenseBack, "oktaxis-drivers/licenses"),
      ]);

      const carImageUrl = uploadResults[0].status === "fulfilled" ? uploadResults[0].value : null;
      const licenseFrontUrl = uploadResults[1].status === "fulfilled" ? uploadResults[1].value : null;
      const licenseBackUrl = uploadResults[2].status === "fulfilled" ? uploadResults[2].value : null;

      // Upload failures are handled gracefully - form submission continues

      // Convert form values to match API expectations
      const apiValues = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        vehicleType: values.carType,
        preferredContact: "WhatsApp",
        carMake: "",
        carModel: "",
        licenseNumber: "",
        address: values.address,
        carImageUrl: carImageUrl || "",
        licenseFrontUrl: licenseFrontUrl || "",
        licenseBackUrl: licenseBackUrl || "",
      };

      const response = await registerDriverEmail(apiValues);
      
      // Check if registration was successful
      if (response && response.success) {
        setFormSubmitted(true);
        resetForm();
        // Reset file inputs and previews
        if (carImageRef.current) carImageRef.current.value = "";
        if (licenseFrontRef.current) licenseFrontRef.current.value = "";
        if (licenseBackRef.current) licenseBackRef.current.value = "";
        // Clean up preview URLs
        if (previews.carImage) URL.revokeObjectURL(previews.carImage);
        if (previews.licenseFront) URL.revokeObjectURL(previews.licenseFront);
        if (previews.licenseBack) URL.revokeObjectURL(previews.licenseBack);
        setPreviews({ carImage: null, licenseFront: null, licenseBack: null });
        
        // Show success toast with email status
        const emailDetails = response.emailDetails || {};
        const driverEmailSent = response.userEmailSent || emailDetails.driver?.sent || false;
        const adminEmailSent = response.adminEmailSent || emailDetails.admin?.sent || false;
        
        if (driverEmailSent && adminEmailSent) {
          toast({
            title: "Registration Successful! ✅",
            description: "Your driver registration has been submitted successfully. Please check your email for confirmation.",
            variant: "default",
          });
        } else if (adminEmailSent) {
          toast({
            title: "Registration Submitted! ✅",
            description: "Your driver registration has been submitted successfully. However, we couldn't send the confirmation email. Please contact us at reservation@oktaxis.co.uk if you have any questions.",
            variant: "default",
          });
        } else if (driverEmailSent) {
          toast({
            title: "Registration Submitted! ✅",
            description: "Your driver registration has been submitted successfully. However, there was an issue sending the admin notification. Our team will review your application soon.",
            variant: "default",
          });
        } else {
          toast({
            title: "Registration Submitted! ⚠️",
            description: "Your driver registration has been submitted successfully. However, there was an issue sending emails. Please contact us at reservation@oktaxis.co.uk to confirm receipt.",
            variant: "default",
          });
        }
        
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        throw new Error(response?.message || "Registration failed");
      }
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to submit form. Please try again.";
      setError(errorMessage);
      
      // Show error toast
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (
    fieldName: string,
    file: File | null,
    setFieldValue: any,
    previewKey: "carImage" | "licenseFront" | "licenseBack"
  ) => {
    setFieldValue(fieldName, file);
    
    // Clean up previous preview URL
    if (previews[previewKey]) {
      URL.revokeObjectURL(previews[previewKey]!);
    }
    
    // Create new preview URL if file is selected
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({
        ...prev,
        [previewKey]: previewUrl,
      }));
    } else {
      setPreviews((prev) => ({
        ...prev,
        [previewKey]: null,
      }));
    }
  };

  const handleRemovePreview = (
    previewKey: "carImage" | "licenseFront" | "licenseBack",
    setFieldValue: any,
    fieldName: string,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    // Clean up preview URL
    if (previews[previewKey]) {
      URL.revokeObjectURL(previews[previewKey]!);
    }
    
    // Reset preview and file
    setPreviews((prev) => ({
      ...prev,
      [previewKey]: null,
    }));
    setFieldValue(fieldName, null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        address: "",
        carType: "",
        carImage: null,
        licenseFront: null,
        licenseBack: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting, errors, touched }) => (
        <Form className="space-y-5 bg-white rounded-lg p-6 md:p-8 shadow-lg">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Partner With Us</h2>
            <p className="text-gray-600 text-sm md:text-base">Join our driver network and start earning today.</p>
          </div>

          {/* Full Name and Email - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Full Name */}
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

            {/* Email */}
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

          {/* Phone Number and Car Type - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Phone Number */}
            <FormField
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              type="tel"
              Icon={Phone}
              required
              errors={errors}
              touched={touched}
            />

            {/* Car Type */}
            <FormField
              name="carType"
              label="Car Type"
              placeholder="Enter car type (e.g., Sedan, SUV, Van, Luxury)"
              type="text"
              Icon={Car}
              required
              errors={errors}
              touched={touched}
            />
          </div>

          {/* Address */}
          <FormField
            name="address"
            label="Your Address"
            placeholder="Enter your address"
            type="text"
            Icon={MapPin}
            required
            errors={errors}
            touched={touched}
          />

          {/* Upload Sections - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Upload Car Image */}
            <div className={`w-full rounded-lg bg-gray-200 px-4 py-3 border ${errors.carImage && touched.carImage ? 'border-red-500' : 'border-gray-300'}`}>
              <label className="block text-[13px] font-medium text-gray-600 mb-1">
                Upload Car Image <span className="text-red-500">*</span>
              </label>
              <input
                ref={carImageRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleFileChange("carImage", file, setFieldValue, "carImage");
                }}
                className="hidden"
                id="carImage"
              />
              {previews.carImage ? (
                <div className="relative w-full mt-2">
                  <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src={previews.carImage}
                      alt="Car preview"
                      fill
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePreview("carImage", setFieldValue, "carImage", carImageRef)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {values.carImage && 'name' in values.carImage && (
                    <p className="text-[11px] text-gray-600 mt-2 truncate">{(values.carImage as File).name}</p>
                  )}
                </div>
              ) : (
                <label
                  htmlFor="carImage"
                  className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-500 transition-colors bg-gray-50 mt-2"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="relative">
                      <FileText className="h-8 w-8 text-gray-400 mb-2" />
                      <Car className="absolute -bottom-1 -right-1 h-4 w-4 text-gray-500" />
                    </div>
                    <p className="mb-1 text-[13px] text-gray-500 text-center">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-[11px] text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                </label>
              )}
            </div>

            {/* Upload Driver License Front Side */}
            <div className={`w-full rounded-lg bg-gray-200 px-4 py-3 border ${errors.licenseFront && touched.licenseFront ? 'border-red-500' : 'border-gray-300'}`}>
              <label className="block text-[13px] font-medium text-gray-600 mb-1">
                Upload License Front <span className="text-red-500">*</span>
              </label>
              <input
                ref={licenseFrontRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleFileChange("licenseFront", file, setFieldValue, "licenseFront");
                }}
                className="hidden"
                id="licenseFront"
              />
              {previews.licenseFront ? (
                <div className="relative w-full mt-2">
                  <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src={previews.licenseFront}
                      alt="License front preview"
                      fill
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePreview("licenseFront", setFieldValue, "licenseFront", licenseFrontRef)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {values.licenseFront && 'name' in values.licenseFront && (
                    <p className="text-[11px] text-gray-600 mt-2 truncate">{(values.licenseFront as File).name}</p>
                  )}
                </div>
              ) : (
                <label
                  htmlFor="licenseFront"
                  className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-500 transition-colors bg-gray-50 mt-2"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileText className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="mb-1 text-[13px] text-gray-500 text-center">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-[11px] text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                </label>
              )}
            </div>

            {/* Upload Driver License Back Side */}
            <div className={`w-full rounded-lg bg-gray-200 px-4 py-3 border ${errors.licenseBack && touched.licenseBack ? 'border-red-500' : 'border-gray-300'}`}>
              <label className="block text-[13px] font-medium text-gray-600 mb-1">
                Upload License Back <span className="text-red-500">*</span>
              </label>
              <input
                ref={licenseBackRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleFileChange("licenseBack", file, setFieldValue, "licenseBack");
                }}
                className="hidden"
                id="licenseBack"
              />
              {previews.licenseBack ? (
                <div className="relative w-full mt-2">
                  <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src={previews.licenseBack}
                      alt="License back preview"
                      fill
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePreview("licenseBack", setFieldValue, "licenseBack", licenseBackRef)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {values.licenseBack && 'name' in values.licenseBack && (
                    <p className="text-[11px] text-gray-600 mt-2 truncate">{(values.licenseBack as File).name}</p>
                  )}
                </div>
              ) : (
                <label
                  htmlFor="licenseBack"
                  className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-500 transition-colors bg-gray-50 mt-2"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileText className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="mb-1 text-[13px] text-gray-500 text-center">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-[11px] text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Submit */}
          <div>
            <Button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || formSubmitted}
            >
              {isSubmitting ? (
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
