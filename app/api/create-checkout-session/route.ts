import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia', // Use a stable API version
});

interface CreateCheckoutSessionRequest {
  amount: number;
  orderData: {
    name: string;
    email: string;
    phone: string;
    car: string;
    price: string;
    totalAmount: number;
    distance: number;
    fromLocation: string;
    toLocation: string;
    stops: string[];
    date: string;
    time: string;
    duration: string;
    passengers: string;
    bags: string;
    isReturn?: boolean;
    returnDate?: string;
    returnTime?: string;
    isFlightTrack?: boolean;
    isMeetGreet?: boolean;
    extraStopsCount?: string;
    isReturnFlightTrack?: boolean;
    isReturnMeetGreet?: boolean;
    returnExtraStopsCount?: string;
    isAirportPickup?: boolean;
    flightName?: string;
    flightNumber?: string;
    instructions?: string;
    category: 'trip' | 'hourly';
  };
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe secret key is not configured');
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    const body: CreateCheckoutSessionRequest = await request.json();
    const { amount, orderData } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!orderData.email || !orderData.name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Convert amount to pence (Stripe uses smallest currency unit)
    const amountInPence = Math.round(amount * 100);

    // Build line item description
    const description = `Booking: ${orderData.car} - ${orderData.category === 'hourly' ? `${orderData.duration} hours` : `${orderData.distance} miles`}`;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `Taxi Booking - ${orderData.car}`,
              description: description,
              metadata: {
                category: orderData.category,
                car: orderData.car,
                fromLocation: orderData.fromLocation,
                toLocation: orderData.toLocation || 'N/A',
              },
            },
            unit_amount: amountInPence,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: orderData.email,
      metadata: {
        // Store essential fields directly (each metadata value max 500 chars)
        name: orderData.name.substring(0, 500),
        email: orderData.email.substring(0, 500),
        phone: orderData.phone.substring(0, 500),
        car: orderData.car.substring(0, 500),
        category: orderData.category.substring(0, 500),
        price: orderData.price.toString().substring(0, 500),
        totalAmount: orderData.totalAmount.toString().substring(0, 500),
        distance: orderData.distance.toString().substring(0, 500),
        fromLocation: orderData.fromLocation.substring(0, 500),
        toLocation: (orderData.toLocation || '').substring(0, 500),
        date: orderData.date.substring(0, 500),
        time: orderData.time.substring(0, 500),
        duration: (orderData.duration || '').substring(0, 500),
        passengers: orderData.passengers.substring(0, 500),
        bags: orderData.bags.substring(0, 500),
        // Store complex data as separate fields
        stops: JSON.stringify(orderData.stops || []).substring(0, 500),
        isReturn: (orderData.isReturn || false).toString(),
        returnDate: (orderData.returnDate || '').substring(0, 500),
        returnTime: (orderData.returnTime || '').substring(0, 500),
        isFlightTrack: (orderData.isFlightTrack || false).toString(),
        isMeetGreet: (orderData.isMeetGreet || false).toString(),
        extraStopsCount: (orderData.extraStopsCount || '0').substring(0, 500),
        isReturnFlightTrack: (orderData.isReturnFlightTrack || false).toString(),
        isReturnMeetGreet: (orderData.isReturnMeetGreet || false).toString(),
        returnExtraStopsCount: (orderData.returnExtraStopsCount || '0').substring(0, 500),
        isAirportPickup: (orderData.isAirportPickup || false).toString(),
        flightName: (orderData.flightName || '').substring(0, 500),
        flightNumber: (orderData.flightNumber || '').substring(0, 500),
        instructions: (orderData.instructions || '').substring(0, 500),
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/order-placed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/book-ride/passenger-details`,
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      {
        error: error?.message || 'Failed to create checkout session',
      },
      { status: 500 }
    );
  }
}

