"use client"

import React, { useState, useEffect } from "react"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import useCustomForm from "@/hooks/useFormContext"
import { processStripePayment } from "@/actions/new-pyament-accept"
import useFormStore from "@/stores/FormStore"
import ContinueButton from "./ContinueButton"
import { useRouter } from "next/navigation"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")


function StripePaymentForm({price}:{price:string}) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const {formError, setFormData, changeStep, formData } = useFormStore()

  const amount = Number(price)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if(formData.paymentId.value){
      const isOk = await changeStep(true,4)
      if(isOk){
        router.replace('/order-placed')
        router.refresh()
      }
      return;
    }

    if (!stripe || !elements) return

    setError("")
    setLoading(true)

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    })

    if (result.error) {
      setError(result.error.message || "Payment failed")
      setLoading(false)
      return
    }

    const paymentId = result.paymentIntent?.id
    if (paymentId) {
      const res = await processStripePayment({
        amount,
        paymentIntentId: paymentId,
      })

      if (!res.success || !res.paymentId ) {
        setError("Payment Failed")
        setLoading(false)
        return
      }

      setFormData("paymentId", res.paymentId)
      setLoading(false)
      const isOk = await changeStep(true,4)
      if(isOk){
        router.replace('/order-placed')
        router.refresh()
      }
    }
  }

  return (
    <div className=" w-full flex flex-col">
      {/* Header */}
      {/* <div className="w-full flex justify-center bg-white p-2 rounded-t-lg">
        <Image
          src="/secured-by-stripe.jpg"
          alt="Secured by Stripe"
          width={200}
          height={150}
          className="object-contain w-full h-full"
        />
      </div> */}

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {formData.paymentId.value ? <div className="px-8 py-20 text-center bg-white rounded-lg shadow-sm  ">
          <div className="text-green-600 text-xl font-semibold ">
            Payment Done
          </div>
          <div className="text-gray-500 text-sm">
            If you get any error please take screen shot and send on our whatsapp.
          </div>

        </div> :  <div className="p-2 bg-gray-200 lg:bg-white rounded-lg shadow-sm ">
          <PaymentElement  />
        </div>}
        

        {formError && <div className="text-red-500 text-center">{formError}</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {/* Pay Button */}
        <ContinueButton title="Proceed Payment" loading={loading} type="submit" step={4} />
      </form>
    </div>
  )
}

function MyPaymentForm({price}:{price:string}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  
  
  const amount =  Number(price) 

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/create-payment-intent", {
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
    return (
      <div className="px-8 py-20 text-center bg-white rounded-lg shadow-sm animate-pulse text-xl font-semibold text-gray-500 ">
        Loading payment form...
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripePaymentForm price={price} />
    </Elements>
  )
}

export default MyPaymentForm