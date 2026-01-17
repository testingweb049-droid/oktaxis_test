"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { cn } from "@/lib/utils";

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

function contactForm() {
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
              <div className="w-full rounded-lg bg-white px-4 py-3 border border-gray-200">
                <Field
                  name="name"
                  as={Input}
                  placeholder="Enter Your Name"
                  containerClassName=""
                />
              </div>
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <div className="w-full rounded-lg bg-white px-4 py-3 border border-gray-200">
                <Field
                  name="email"
                  type="email"
                  as={Input}
                  placeholder="Enter Your Email Address"
                  containerClassName=""
                />
              </div>
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <div className="w-full rounded-lg bg-white px-4 py-3 border border-gray-200">
                <Field
                  name="phone"
                  type="tel"
                  as={Input}
                  placeholder="Enter Your Contact Number"
                  containerClassName=""
                />
              </div>
              <p className="mt-1 text-sm text-text-gray">
                Contact should be exactly 10 digits, e.g., 2241111111
              </p>
              <ErrorMessage
                name="phone"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <div className="w-full rounded-lg bg-white px-4 py-3 border border-gray-200">
                <Field
                  name="message"
                  as={Textarea}
                  placeholder="Write your message here..."
                  className="w-full bg-transparent text-heading-black placeholder:text-text-gray outline-none focus:outline-none h-32 resize-none border-0"
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-base">{error}</div>}

            <div className="pt-2 text-center">
              <Button
                type="submit"
                className={cn(
                  "w-56",
                  "bg-primary-yellow hover:bg-primary-yellow/90 text-heading-black font-semibold transition-all duration-200",
                  "px-4 py-2.5 text-base rounded-lg",
                  formSubmitted && "opacity-75 cursor-not-allowed"
                )}
                disabled={isSubmitting || formSubmitted}
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

const ContactForm = contactForm;
export default ContactForm;
