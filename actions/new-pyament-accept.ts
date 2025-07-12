"use server"

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-06-30.basil", // ✅ CORRECT VERSION
});
interface ProcessStripePaymentProps {
  amount: number
  paymentIntentId: string
}

export async function processStripePayment({ amount, paymentIntentId }: ProcessStripePaymentProps) {
  try {
    // Verify the payment was successful
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== "succeeded") {
      return { success: false, error: "Payment not successful" }
    }

    // Here you would typically save the payment details to your database
    // ...

    return {
      success: true,
      paymentId: paymentIntentId,
    }
  } catch (error) {
    console.error("Error processing Stripe payment:", error)
    return {
      success: false,
      error: "Failed to process payment",
    }
  }
}