"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // For validation
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required"),
  
});

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        message: "",
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
      {({ isSubmitting }) => (
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
