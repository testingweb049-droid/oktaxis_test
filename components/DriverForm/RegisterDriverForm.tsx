"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { registerDriverEmail } from "@/lib/utils";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("First Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  vehicleType: Yup.string().required("Vehicle Type is required"),
  licenseNumber: Yup.string().required("License Number is required"),
});

export interface DriverFormValues {
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  licenseNumber: string;
}

export default function RegisterDriverForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    values: DriverFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      setError("");

      // Use the registerDriverEmail utility function
      await registerDriverEmail(values);

      setFormSubmitted(true);
      resetForm();
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        vehicleType: "",
        licenseNumber: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        setFieldValue,
        isSubmitting,
      }: {
        values: DriverFormValues;
        setFieldValue: (field: string, value: any) => void;
        isSubmitting: boolean;
      }) => (
        <Form className="space-y-5">
          <div className="text-2xl font-bold text-center">
            Register as Driver
          </div>
          <div>
            <Field
              name="name"
              as={Input}
              placeholder="Enter Your Name"
              className="w-full px-4 py-5 border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <Field
              name="email"
              type="email"
              as={Input}
              placeholder="Enter Your Email Address"
              className="w-full px-4 py-5 border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <Field
              name="phone"
              type="tel"
              as={Input}
              placeholder="Enter Your Contact Number"
              className="w-full px-4 py-5 border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="phone"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Dropdown for Vehicle Type */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-full px-4 py-3 border rounded-md cursor-pointer bg-white border-gray-300 focus:outline-none text-left">
                  {values.vehicleType || "Select Vehicle Type"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {["Sedan", "SUV", "Van", "Luxury", "Other"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setFieldValue("vehicleType", option)}
                    className="cursor-pointer hover:bg-brand hover:text-white"
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ErrorMessage
              name="vehicleType"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <Field
              name="licenseNumber"
              as={Input}
              placeholder="Enter Your License Number"
              className="w-full px-4 py-5 border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="licenseNumber"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <div className="text-center">
            <Button
              type="submit"
              className={`w-48 ${
                formSubmitted
                  ? "bg-blue-500 hover:bg-blue-400"
                  : "bg-brand hover:bg-brand"
              } text-white font-medium py-2 px-4 rounded-md transition-colors`}
              disabled={isSubmitting}
            >
              {formSubmitted
                ? "Request Submitted"
                : isSubmitting
                ? "Submitting..."
                : "Submit Your Request"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
