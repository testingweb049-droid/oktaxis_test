"use client"

import { processStripePayment } from "@/actions/new-pyament-accept"
import React, { useState } from "react"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import useCustomForm from "@/hooks/useFormContext"
import Image from "next/image"

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

interface StripePaymentFormProps {
  clientSecret: string
}

function StripePaymentForm({ clientSecret }: StripePaymentFormProps) {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()
  const { form, step, Step1, Step2, Step3, NextStep } = useCustomForm()

  const amount = Number(form.getValues("price"))

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault()

  //   if (!stripe || !elements) return

  //   setError("")
  //   setLoading(true)

  //   const result = await stripe.confirmPayment({
  //     elements,
  //     redirect: "if_required",
  //   })

  //   if (result.error) {
  //     setError(result.error.message || "Payment failed")
  //     setLoading(false)
  //   } else {
  //     const paymentId = result.paymentIntent?.id
  //     if (paymentId) {
  //       const res = await processStripePayment({ amount, paymentIntentId: paymentId })

  //       if (!res.success) {
  //         setError("Payment Failed")
  //         setLoading(false)
  //         return
  //       }

  //       form.setValue("payment_id", res.paymentId)
  //       setSuccess(true)
  //       setLoading(false)

  //       setTimeout(() => {
  //         NextStep()
  //       }, 1500)
  //     }
  //   }
  // }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setError("")
    setLoading(true)
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    })

    if (result.error) {
      setError(result.error.message || "Payment failed")
      setLoading(false)
    } else {
      // Payment succeeded
      const paymentId = result.paymentIntent?.id
      if (paymentId) {
        const res = await processStripePayment({ amount, paymentIntentId: paymentId })

        if (!res.success) {
          setError("Payment Failed")
          setLoading(false)
          return
        }

        form.setValue("payment_id", res.paymentId)
        setLoading(false)
        NextStep()
      }
    }
  }
  return (
    <div className="mt-5 w-full flex flex-col gap-5">

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <PaymentElement />

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full mt-4 bg-black hover:bg-[#28282B] rounded-full text-white py-2 px-4 text-sm flex items-center justify-center"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : (
            "Pay"
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            if (step === 3) Step2()
            else if (step === 2) Step1()
            else if (step === 4) Step3()
          }}
          className="w-full border border-black text-black mt-2 text-sm py-2 px-4 rounded-full font-bold text-center"
        >
          ← Back to Your Details
        </button>

        {error && <div className="text-red-500 text-center">{error}</div>}
      </form>

    </div>
  )
}


function MyPaymentForm() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const { form } = useCustomForm()
  const amount = Number(form.getValues("price")) + (form.watch('flight_track') ? 7 : 0) + (form.watch('meet_greet') ? 15 : 0)
  console.log("amount : ", amount)

  // Fetch client secret on component mount
  React.useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        // This would be your server endpoint to create a PaymentIntent
        const response = await fetch("http://localhost:3000/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        })

        const data = await response.json()
        console.log("Stripe response:", data)

        if (!data.clientSecret) {
          console.error("❌ No clientSecret received")
          return
        }

        setClientSecret(data.clientSecret)

      } catch (error) {
        console.error("Error fetching client secret:", error)
      }
    }

    fetchClientSecret()
  }, [amount])

  if (!clientSecret) {
    return <div>Loading payment form...</div>
  }
  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Price Breakdown Header */}
      <div className="mb-6">
        <div className="text-left text-sm mb-4">

          <p className="text-gray-700 font-medium">
            Total
          </p>
          <p className="text-2xl font-bold text-black mt-1">
            £{amount}{" "}

          </p>
        </div>

        {/* Stripe Security Heading */}
        <div>
          <Image src="/stripe.jpg" alt="wifi" width={600} height={400} />
        </div>




        {/* Card Logos */}
        {/* <div className="flex flex-wrap items-center gap-2 mt-4">
          {[
            "/visa.png",
            "/mastercard.png",
            "/amex.png",
            "/jcb.png",
            "/discover.png",
            "/unionpay.png",
          ].map((src, i) => (
            <img key={i} src={src} alt="card" className="h-6" />
          ))}
        </div> */}
      </div>

      {/* Stripe Elements Form */}
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripePaymentForm clientSecret={clientSecret} />
      </Elements>
    </div>
  )

}

export default MyPaymentForm
