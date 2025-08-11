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
import { ChevronDown } from "lucide-react";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("First Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  vehicleType: Yup.string().required("Vehicle Type is required"),
  preferredContact: Yup.string().required("Preferred Contact is required"),
  carMake: Yup.string().required("Car Make is required"),
  carModel: Yup.string().required("Car Model is required"),
});

export interface DriverFormValues {
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  preferredContact: string;
  carMake: string;
  carModel: string;
}

export default function RegisterDriverForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    values: DriverFormValues,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      setError("");
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
        preferredContact: "WhatsApp",
        carMake: "",
        carModel: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="space-y-5">
          <div className="text-2xl font-bold text-center">Register as Driver</div>

          {/* Name */}
          <div>
            <Field
              name="name"
              as={Input}
              placeholder="Enter Your Name"
              className="w-full px-4 py-5 border-gray-300 rounded-md"
            />
            <ErrorMessage name="name" component="p" className="text-red-500 text-base mt-1" />
          </div>

          {/* Email */}
          <div>
            <Field
              name="email"
              type="email"
              as={Input}
              placeholder="Enter Your Email Address"
              className="w-full px-4 py-5 border-gray-300 rounded-md"
            />
            <ErrorMessage name="email" component="p" className="text-red-500 text-base mt-1" />
          </div>

          {/* Phone */}
          <div>
            <Field
              name="phone"
              type="tel"
              as={Input}
              placeholder="Enter Your Contact Number"
              className="w-full px-4 py-5 border-gray-300 rounded-md"
            />
            <ErrorMessage name="phone" component="p" className="text-red-500 text-base mt-1" />
          </div>

          {/* Vehicle Type */}
          <div>
            <div className="relative w-full">
              <div className="px-4 py-3 border rounded-md bg-white border-gray-300 text-left">
                {values.vehicleType || "Select Vehicle Type"}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer">
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full mt-2">
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
            </div>
            <ErrorMessage name="vehicleType" component="p" className="text-red-500 text-base mt-1" />
          </div>

          {/* Preferred Contact Method */}
          <div>
            <div className="relative w-full">
              <div className="px-4 py-3 border rounded-md bg-white border-gray-300 text-left">
                {values.preferredContact || "Select Preferred Contact"}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer">
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full mt-2">
                  {["WhatsApp", "Email", "Phone Number"].map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setFieldValue("preferredContact", option)}
                      className="cursor-pointer hover:bg-brand hover:text-white"
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ErrorMessage name="preferredContact" component="p" className="text-red-500 text-base mt-1" />
          </div>

          {/* Car Make */}
          <div>
            <Field
              name="carMake"
              as={Input}
              placeholder="Enter Car Make"
              className="w-full px-4 py-5 border-gray-300 rounded-md"
            />
            <ErrorMessage name="carMake" component="p" className="text-red-500 text-base mt-1" />
          </div>

          {/* Car Model */}
          <div>
            <Field
              name="carModel"
              as={Input}
              placeholder="Enter Car Model"
              className="w-full px-4 py-5 border-gray-300 rounded-md"
            />
            <ErrorMessage name="carModel" component="p" className="text-red-500 text-base mt-1" />
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500">{error}</div>}

          {/* Submit */}
          <div className="text-center">
            <Button
              type="submit"
              className={`w-48 ${
                formSubmitted ? "bg-blue-500 hover:bg-blue-400" : "bg-brand hover:bg-brand"
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
