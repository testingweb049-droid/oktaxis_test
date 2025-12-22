
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe only when API key is available (lazy initialization)
function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(apiKey, {
    apiVersion: "2025-08-27.basil", // ✅ CORRECT VERSION
  });
}

export async function POST(request: Request) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 503 }
      );
    }

    const stripe = getStripe();
    const { paymentMethodId, amount, customerDetails } = await request.json();

    // Step 1: Create or retrieve a Stripe Customer
    const customer = await stripe.customers.create({
      email: customerDetails.email,
      name: customerDetails.name,
      phone: customerDetails.phone,
      // address: {
      //   line1: customerDetails.address,
      //   country: customerDetails.country,
      // }
    });

    // Step 2: Attach PaymentMethod to the Customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // Step 3: Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'gbp',
      customer: customer.id, // Associate the PaymentIntent with the customer
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status,
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message, 
      details: error,
    }, { status: 500 });
  }
}
