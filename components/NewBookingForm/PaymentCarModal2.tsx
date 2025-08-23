"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { sendBookingEmail } from "@/lib/utils";
import { useFormikContext } from "formik";


const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<any | null>(null);
  const { values, validateForm } = useFormikContext<any>();

  useEffect(() => {
    // Create Payment Intent on load
    console.log('amount : ',amount)
    fetch("/api/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        
        if (stripe) {
          const pr = stripe.paymentRequest({
            country: "GB", 
            currency: "gbp", 
            total: { label: "Total", amount: amount },
            requestPayerName: false,
            requestPayerEmail: false,

          });
          
          
          pr.canMakePayment().then((result) => {
            if (result) setPaymentRequest(pr);
          });
        }
      });
  }, [amount, stripe]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const link = `${window?.location?.href ?? 'n/a' }?paymentId=${clientSecret}`;
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: { return_url: link },
    });

    if (error) {setErrorMessage(error.message); return;};
    await sendBookingEmail(values)
   
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {paymentRequest && (
        <PaymentRequestButtonElement
          options={{ paymentRequest  }}
          onClick={() => setLoading(true)}
        />
      )}
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-gray-900 mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay ${(amount/100).toFixed(2)}£` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutForm;
