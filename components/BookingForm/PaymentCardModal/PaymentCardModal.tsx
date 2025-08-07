'use client'

import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { sendBookingEmail } from '@/lib/utils'
import StatusCard from "@/components/Sections/StatusCard"
import { useFormikContext } from 'formik'
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface PaymentCardModalProps {
  onClose: () => void;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
)

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.warn("Stripe publishable key is missing. Check your environment variables.");
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#87bbfd',
      },
      backgroundColor: 'white',
    },
    invalid: {
      color: '#e25950',
    },
  },
}

const CheckoutForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { values } = useFormikContext<any>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [showStatusCard, setShowStatusCard] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    // country: 'United Kingdom',
    // address: '',
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      setMessage("Stripe.js has not loaded yet.")
      return
    }

    setLoading(true)

    const cardNumberElement = elements.getElement(CardNumberElement)
    if (!cardNumberElement) return

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
        billing_details: {
          name: formData.fullName,
          // address: {
          //   country: formData.country,
          // },
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      const price = values.totalPrice
      console.log("PRICE ==>", price)

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: price,
          customerDetails: {
            name: formData.fullName,
            email: values.passengerInfo.email,
            phone: values.passengerInfo.phone,
            // country: formData.country
          },
          orderSummary: { ...values, formData },
        }),
      })

      const paymentIntentResponse = await response.json()

      if (!response.ok) {
        throw new Error("Failed to create PaymentIntent.")
      }

      const { clientSecret } = paymentIntentResponse
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret)

      if (confirmError) {
        throw new Error(confirmError.message)
      }

      if (paymentIntent?.status === "succeeded") {
        setMessage("Payment succeeded!")
        await sendBookingEmail(values)
        setIsSuccess(true)
      } else {
        throw new Error("Payment failed.")
      }
    } catch (error) {
      setIsSuccess(false)
      setMessage(error instanceof Error ? error.message : "Payment failed.")
    } finally {
      setLoading(false)
      setShowStatusCard(true)
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  if (showStatusCard) {
    return (
      <StatusCard 
        type={isSuccess ? 'success' : 'error'} 
        onClose={() => {
          setShowStatusCard(false)
        }} 
      />
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="font-semibold text-lg">Payment Details</div>
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-200 p-1 hover:bg-gray-100 transition-colors"
          aria-label="Close payment form"
        >
          ✕
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Card Holder Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <div className="rounded-md border p-3">
              <CardNumberElement id="card-number" options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-expiry">Expiration Date</Label>
            <div className="rounded-md border p-3">
              <CardExpiryElement id="card-expiry" options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-cvc">CVC</Label>
            <div className="rounded-md border p-3">
              <CardCvcElement id="card-cvc" options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : "Submit Order"}
          </Button>

          {message && (
            <div 
              className={`p-4 rounded-lg text-sm ${
                message.includes("succeeded") 
                  ? "bg-green-100 text-brand border border-green-200" 
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

const PaymentCardModal: React.FC<PaymentCardModalProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col justify-center p-4">
      <Elements stripe={stripePromise}>
        <CheckoutForm onClose={onClose} />
      </Elements>
    </div>
  )
}

export default PaymentCardModal
