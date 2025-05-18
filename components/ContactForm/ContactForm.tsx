"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactEmail } from "@/lib/utils"; // Import the utility function
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup"; // For validation

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
});

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    values: ContactFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      setError("");

      // Use the contactEmail utility function
      await contactEmail(values);

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
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }: { isSubmitting: boolean }) => (
        <Form className="space-y-5">
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
            <p className="mt-1 text-sm text-gray-500">
              Contact should be exactly 10 digits, e.g., 2241111111
            </p>
            <ErrorMessage
              name="phone"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <Field
              name="message"
              as={Textarea}
              placeholder="Write your message here..."
              className="w-full px-4 py-2 border-gray-300 rounded-md h-32"
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
