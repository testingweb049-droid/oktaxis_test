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
    <div className="max-w-xl mx-auto rounded-2xl bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] px-6 py-10 sm:px-10 sm:py-12 font-montserrat">
      <div className="mb-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          Get in Touch with OkTaxis
        </h2>
        <p className="mt-3 text-base text-slate-500">
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </p>
      </div>

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
                className="w-full px-4 py-4 rounded-md border border-gray-200 bg-gray-100 text-base placeholder:text-gray-400 focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-base mt-1"
              />
            </div>

            <div>
              <Field
                name="email"
                type="email"
                as={Input}
                placeholder="Enter Your Email Address"
                className="w-full px-4 py-4 rounded-md border border-gray-200 bg-gray-100 text-base placeholder:text-gray-400 focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-base mt-1"
              />
            </div>

              <div>
              <Field
                name="phone"
                type="tel"
                as={Input}
                placeholder="Enter Your Contact Number"
                className="w-full px-4 py-4 rounded-md border border-gray-200 bg-gray-100 text-base placeholder:text-gray-400 focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none"
              />
              <p className="mt-1 text-sm text-gray-500">
                Contact should be exactly 10 digits, e.g., 2241111111
              </p>
              <ErrorMessage
                name="phone"
                component="p"
                className="text-red-500 text-base mt-1"
              />
            </div>

            <div>
              <Field
                name="message"
                as={Textarea}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-100 text-base placeholder:text-gray-400 focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none h-32 resize-none"
              />
            </div>

            {error && <div className="text-red-500 text-base">{error}</div>}

            <div className="pt-2 text-center">
              <Button
                type="submit"
                className={`w-56 ${
                  formSubmitted
                    ? "bg-blue-500 hover:bg-blue-400"
                    : "bg-brand hover:bg-brand"
                } text-white font-medium py-3 px-6 rounded-md transition-colors`}
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
    </div>
  );
}
