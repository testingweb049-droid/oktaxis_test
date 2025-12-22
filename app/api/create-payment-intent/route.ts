import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe only when API key is available (lazy initialization)
function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(apiKey, {
    apiVersion: "2025-08-27.basil",
  });
}

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 503 }
      );
    }

    const stripe = getStripe();
    const { amount } = await request.json()
    const centsAmount = Math.round(amount * 100)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: centsAmount, 
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Error creating payment intent" }, { status: 500 })
  }
}