"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentRequestButtonElement,
  Elements,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/actions/accept-payment-stripe"; // Import the server action
import { loadStripe } from "@stripe/stripe-js";
import { RxCrossCircled } from "react-icons/rx";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');

const CheckoutPage = ({ amount, orderId }: { amount: number, orderId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<any | null>(null);

  useEffect(() => {
    if (!stripe) return; // Ensure stripe is loaded before calling createPaymentIntent

    const fetchPaymentIntent = async () => {
      const response = await createPaymentIntent({
        amount: Math.round(amount * 100),
      });

      console.log("created payment : ", response)

      if (response.success && response.clientSecret) {
        setClientSecret(response.clientSecret);

        const pr = stripe.paymentRequest({
          country: "DE",
          currency: "eur",
          total: { label: "Total", amount: Math.round(amount * 100) },
          requestPayerName: true,
          requestPayerEmail: true,
        });

        pr.canMakePayment().then((result) => {
          if (result) setPaymentRequest(pr);
        });
      } else {
        setErrorMessage("Failed to create payment intent");
      }
    };

    fetchPaymentIntent();
  }, [amount, stripe]); // Now, the effect runs only when `stripe` is available


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

    const link = `http://localhost:3000/payment-success/${orderId}?clientSecret=${clientSecret}`;
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: { return_url: link },
    });

    if (error) setErrorMessage(error.message);
    setLoading(false);
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
          options={{ paymentRequest }}
          onClick={() => setLoading(true)}
        />
      )}
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full px-5 py-2 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay : €${amount.toFixed(2)}` : "Processing..."}
      </button>
    </form>
  );
};



const PaymentWrapper = ({ amount, orderId, setFormDone }: { amount: number; orderId: string, setFormDone: React.Dispatch<SetStateAction<boolean>> }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const response = await createPaymentIntent({
        amount: Math.round(amount * 100),
      });

      if (response.success && response.clientSecret) {
        setClientSecret(response.clientSecret);
      }
    };

    fetchPaymentIntent();
  }, [amount]);

  // ✅ Ensure Elements is rendered only when clientSecret is available
  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading payment...</p>
      </div>
    );
  }

  return (
    <div className="fixed bg-black/50 top-0 left-0 h-full w-full flex items-center justify-center gap-3 z-50">
      <div className="rounded-md bg-white p-5 max-w-screen-sm w-full relative">
        <RxCrossCircled className="absolute top-3 cursor-pointer right-3 text-lg" onClick={()=>{setFormDone(false)}}/>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutPage amount={amount} orderId={orderId} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentWrapper;