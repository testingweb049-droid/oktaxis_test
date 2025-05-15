"use client"

import { processStripePayment } from "@/actions/new-pyament-accept"
import React, { useState } from "react"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import useCustomForm from "@/hooks/useFormContext"

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

interface StripePaymentFormProps {
  clientSecret: string
}

function StripePaymentForm({ clientSecret }: StripePaymentFormProps) {
  const [error, setError] = useState("")
  const stripe = useStripe()
  const elements = useElements()

  const { form, NextStep } = useCustomForm()
  const amount = Number(form.getValues("price"))

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setError("")

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    })

    if (result.error) {
      setError(result.error.message || "Payment failed")
    } else {
      // Payment succeeded
      const paymentId = result.paymentIntent?.id
      if (paymentId) {
        const res = await processStripePayment({ amount, paymentIntentId: paymentId })

        if (!res.success) {
          setError("Payment Failed")
          return
        }

        form.setValue("payment_id", res.paymentId)
        NextStep()
      }
    }
  }

  return (
    <div className="mt-5 w-full flex flex-col gap-5">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe}
          className="w-full mt-4 bg-black hover:bg-[#28282B] text-white py-2 px-4 rounded text-sm"
        >
          Pay
        </button>
      </form>

      {error && <div className="text-red-500 text-center">{error}</div>}
    </div>
  )
}

function MyPaymentForm() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const { form } = useCustomForm()
  const amount = Number(form.getValues("price")) + (form.watch('flight_track') ? 7 : 0 ) + (form.watch('meet_greet') ? 15 : 0 )
  console.log("amount : ",amount)

  // Fetch client secret on component mount
  React.useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        // This would be your server endpoint to create a PaymentIntent
        const response = await fetch("https://oktaxis.co.uk/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        })

        const data = await response.json()
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
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripePaymentForm clientSecret={clientSecret} />
    </Elements>
  )
}

export default MyPaymentForm
