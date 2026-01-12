import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createOrder, OrderDataType } from '@/actions/add-order';
import { getFleetByName } from '@/lib/fleet-service';

function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(apiKey, {
    apiVersion: '2025-08-27.basil',
  });
}

// Transform orderData from DetailsForm to OrderDataType format
async function transformToOrderDataType(formData: any): Promise<OrderDataType> {
  // Get car image from fleet data (DB)
  const selectedFleet = await getFleetByName(formData.car);
  const carImage = selectedFleet?.image;

  return {
    fromLocation: formData.fromLocation || '',
    toLocation: formData.toLocation || '',
    stops: Array.isArray(formData.stops) ? formData.stops : [],
    duration: String(formData.duration || ''),
    distance: Number(formData.distance || 0),
    car: formData.car || '',
    // Use totalAmount if available, otherwise use price (for backward compatibility)
    price: String(formData.totalAmount || formData.price || '0'),
    name: formData.name || '',
    phone: formData.phone || '',
    email: formData.email || '',
    date: formData.date || '',
    time: formData.time || '',
    returnDate: formData.returnDate || '',
    returnTime: formData.returnTime || '',
    passengers: String(formData.passengers || '1'),
    bags: String(formData.bags || '0'),
    flightName: formData.flightName || '',
    flightNumber: formData.flightNumber || '',
    isAirportPickup: Boolean(formData.isAirportPickup || false),
    paymentId: '', // Will be set after payment confirmation
    paymentMethod: 'online',
    isFlightTrack: Boolean(formData.isFlightTrack || false),
    isMeetGreet: Boolean(formData.isMeetGreet || false),
    isReturn: Boolean(formData.isReturn || false),
    isReturnFlightTrack: Boolean(formData.isReturnFlightTrack || false),
    isReturnMeetGreet: Boolean(formData.isReturnMeetGreet || false),
    extraStopsCount: String(formData.extraStopsCount || '0'),
    returnExtraStopsCount: String(formData.returnExtraStopsCount || '0'),
    instructions: formData.instructions || '',
    carImage: carImage,
    category: (formData.category === 'hourly' ? 'hourly' : 'trip') as 'hourly' | 'trip',
  };
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment service is not configured' },
        { status: 503 }
      );
    }

    const stripe = getStripe();
    const { amount, orderData } = await request.json();
    
    // Convert amount to cents
    const amountInCents = Math.round(amount * 100);

    // Transform and create order with payment_id = null (pending payment)
    // Skip email - will send after payment confirmation
    const orderDataType = await transformToOrderDataType(orderData);
    const orderResponse = await createOrder(orderDataType, true); // skipEmail = true

    if (orderResponse.status !== 201 || !orderResponse.order) {
      return NextResponse.json(
        { error: orderResponse.error || 'Failed to create pending order' },
        { status: orderResponse.status || 500 }
      );
    }

    const orderId = orderResponse.order.id;

    // Create Stripe Checkout Session with only order ID in metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Taxi Booking',
              description: 'OkTaxis Booking Payment',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://oktaxis.co.uk'}/order-placed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://oktaxis.co.uk'}/booking?canceled=true`,
      metadata: {
        orderId: orderId, // Store only order ID (much smaller than full orderData)
      },
      customer_email: orderData?.email,
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating checkout session' },
      { status: 500 }
    );
  }
}

