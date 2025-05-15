"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; 
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("First Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  vehicleType: Yup.string().required("Vehicle Type is required"),
  licenseNumber: Yup.string().required("License Number is required"),
});

export default function RegisterDriverForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

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
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log("Form values submitted:", values);

        // Simulate API call
        setTimeout(() => {
          setFormSubmitted(true); // Show success message
          setSubmitting(false); // Stop submitting state
          resetForm(); // Reset form fields

          // Hide the success message after 3 seconds
          setTimeout(() => setFormSubmitted(false), 3000);
        }, 1000);
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="space-y-5">
          <div className="text-2xl font-bold text-center">Register as Driver</div>
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
                <div
                  className="w-full px-4 py-3 border rounded-md cursor-pointer bg-white border-gray-300 focus:outline-none text-left"
                >
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
