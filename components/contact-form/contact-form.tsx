"use client";

import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { useSubmitContactForm } from "@/hooks/api/useContact";
import { useToast } from "@/components/ui/use-toast";
import FormField from "@/components/ui/form-field";
import { User, Mail } from "lucide-react";

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  message: Yup.string(),
});

export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

function contactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const submitContactMutation = useSubmitContactForm();

  const handleSubmit = async (
    values: ContactFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      setError("");
      setSubmitting(true);

      const response = await submitContactMutation.mutateAsync({
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: values.phone,
        message: values.message || undefined,
      });

      // Show success toast
      toast({
        title: "Message Sent Successfully!",
        description: response.message || "We'll get back to you soon.",
      });

      setFormSubmitted(true);
      resetForm();
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (err: any) {
      console.error("Error submitting form:", err);
      const errorMessage = err?.message || "Failed to submit form. Please try again.";
      setError(errorMessage);

      // Show error toast
      toast({
        title: "Failed to Send Message",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] md:px-8 md:py-10 px-4 py-6 font-montserrat">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Contact Us For Your{" "}
          <span className="relative inline-block">
            Corporate Queries
            <span className="absolute -bottom-1 left-0 w-[110%] h-1 bg-[#FFA500]"></span>
          </span>
        </h2>
      </div>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }: { isSubmitting: boolean; errors: any; touched: any }) => {
          const isLoading = isSubmitting || submitContactMutation.isPending;
          return (
            <Form className="space-y-5">
              {/* First Name & Last Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                  type="text"
                  Icon={User}
                  required
                  errors={errors}
                  touched={touched}
                />

                <FormField
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  type="text"
                  Icon={User}
                  required
                  errors={errors}
                  touched={touched}
                />
              </div>

              {/* Email & Contact Number Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  name="email"
                  label="Email"
                  placeholder="Email"
                  type="email"
                  Icon={Mail}
                  required
                  errors={errors}
                  touched={touched}
                />

                <div>
                  <Field name="phone">
                    {({ field, form }: any) => {
                      return (
                        <div className="w-full rounded-lg bg-white px-3 sm:px-4 py-2 border border-gray-200">
                          <PhoneInput
                            value={field.value || ""}
                            onChange={(phone) => {
                              form.setFieldValue("phone", phone);
                            }}
                            error={errors.phone && touched.phone}
                            label="Phone Number *"
                            country="gb"
                          />
                        </div>
                      );
                    }}
                  </Field>
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <div className="w-full rounded-lg bg-white px-4 py-3 border border-gray-200">
                  <Field
                    name="message"
                    as={Textarea}
                    placeholder="Enter your message..."
                    className="w-full bg-transparent text-heading-black placeholder:text-text-gray outline-none focus:outline-none h-32 resize-none border-0"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className={cn(
                    "w-full",
                    "bg-gray-900 hover:bg-gray-800 text-white font-bold uppercase transition-all duration-200",
                    "px-4 py-3 text-base rounded-lg",
                    formSubmitted && "opacity-75 cursor-not-allowed"
                  )}
                  disabled={isLoading || formSubmitted}
                >
                  {formSubmitted
                    ? "Submitted"
                    : isLoading
                      ? "Submitting..."
                      : "Submit"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

const ContactForm = contactForm;
export default ContactForm;
