import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

// Initialize Stripe only when API key is available (lazy initialization)
function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(apiKey);
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
    const { amount } = await request.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "gbp",
      automatic_payment_methods: { enabled: true },
      payment_method_options: {
        card: {
          setup_future_usage: null,
        },
      },

    });
    console.log("paymentIntent : ",paymentIntent)
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
