import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia', // Use a stable API version
});

interface CheckoutSuccessRequest {
  sessionId: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe secret key is not configured');
      return NextResponse.json(
        { success: false, error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    const body: CheckoutSuccessRequest = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      );
    }

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { success: false, error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Extract order data from session metadata (stored as individual fields)
    const metadata = session.metadata || {};
    
    // Parse stops if it's a JSON string
    let stops: string[] = [];
    if (metadata.stops) {
      try {
        stops = JSON.parse(metadata.stops);
      } catch (e) {
        console.error('Error parsing stops from metadata:', e);
        stops = [];
      }
    }

    // Reconstruct full order data from individual metadata fields
    const fullOrderData = {
      name: metadata.name || '',
      email: session.customer_email || metadata.email || '',
      phone: metadata.phone || '',
      car: metadata.car || '',
      price: metadata.price || ((session.amount_total || 0) / 100).toString(),
      totalAmount: parseFloat(metadata.totalAmount || ((session.amount_total || 0) / 100).toString()),
      distance: parseFloat(metadata.distance || '0'),
      fromLocation: metadata.fromLocation || '',
      toLocation: metadata.toLocation || '',
      stops: stops,
      date: metadata.date || '',
      time: metadata.time || '',
      duration: metadata.duration || '',
      passengers: metadata.passengers || '1',
      bags: metadata.bags || '0',
      isReturn: metadata.isReturn === 'true',
      returnDate: metadata.returnDate || '',
      returnTime: metadata.returnTime || '',
      isFlightTrack: metadata.isFlightTrack === 'true',
      isMeetGreet: metadata.isMeetGreet === 'true',
      extraStopsCount: metadata.extraStopsCount || '0',
      isReturnFlightTrack: metadata.isReturnFlightTrack === 'true',
      isReturnMeetGreet: metadata.isReturnMeetGreet === 'true',
      returnExtraStopsCount: metadata.returnExtraStopsCount || '0',
      isAirportPickup: metadata.isAirportPickup === 'true',
      flightName: metadata.flightName || '',
      flightNumber: metadata.flightNumber || '',
      instructions: metadata.instructions || '',
      category: metadata.category || 'trip',
      sessionId: session.id,
      paymentStatus: session.payment_status,
      amountPaid: (session.amount_total || 0) / 100,
      currency: session.currency?.toUpperCase() || 'GBP',
      paymentDate: new Date().toISOString(),
    };

    // Generate a payment ID for reference
    const paymentId = session.id.replace('cs_', 'order_');

    // Create booking in database via backend API
    let bookingId: string | null = null;
    try {
      const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const bookingResponse = await fetch(`${backendUrl}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passengerInfo: {
            name: fullOrderData.name,
            email: fullOrderData.email,
            phone: fullOrderData.phone,
          },
          bookingDetails: {
            pickUpAddress: fullOrderData.fromLocation,
            dropOffAddress: fullOrderData.toLocation || undefined,
            date: fullOrderData.date,
            time: fullOrderData.time,
            bookingType: 'standard',
            vehicleTitle: fullOrderData.car,
            category: fullOrderData.category,
            passengerCount: Number(fullOrderData.passengers) || 1,
            bagCount: Number(fullOrderData.bags) || 0,
            childCount: 0,
            textarea: fullOrderData.instructions || undefined,
            stops: fullOrderData.stops || [],
            hourly: fullOrderData.duration || undefined,
            distance: fullOrderData.distance || 0,
            price: fullOrderData.totalAmount,
            // Return trip fields
            isReturn: fullOrderData.isReturn || false,
            returnDate: fullOrderData.returnDate || undefined,
            returnTime: fullOrderData.returnTime || undefined,
            // Additional services
            isFlightTrack: fullOrderData.isFlightTrack || false,
            isMeetGreet: fullOrderData.isMeetGreet || false,
            extraStopsCount: Number(fullOrderData.extraStopsCount) || 0,
            // Return trip services
            isReturnFlightTrack: fullOrderData.isReturnFlightTrack || false,
            isReturnMeetGreet: fullOrderData.isReturnMeetGreet || false,
            returnExtraStopsCount: Number(fullOrderData.returnExtraStopsCount) || 0,
            // Airport pickup
            isAirportPickup: fullOrderData.isAirportPickup || false,
            flightName: fullOrderData.flightName || undefined,
            flightNumber: fullOrderData.flightNumber || undefined,
          },
          paymentId: paymentId,
          paymentMethod: 'stripe',
          stripeSessionId: session.id,
          amountPaid: fullOrderData.amountPaid,
          currency: fullOrderData.currency,
          paymentStatus: 'paid',
        }),
      });

      if (bookingResponse.ok) {
        const bookingData = await bookingResponse.json();
        // Use the MongoDB _id from the created booking as the order ID
        if (bookingData.success && bookingData.data?._id) {
          bookingId = bookingData.data._id;
        }
      } else {
        const errorData = await bookingResponse.json().catch(() => ({}));
        console.error('Failed to create booking in backend:', errorData);
        // Continue even if booking creation fails - payment is already processed
      }
    } catch (bookingError) {
      console.error('Error creating booking in backend:', bookingError);
      // Continue even if booking creation fails - payment is already processed
    }

    // Return order data with the actual booking ID or payment ID as fallback
    // Frontend can use either to fetch the order
    return NextResponse.json({
      success: true,
      orderId: bookingId || paymentId, // Prefer MongoDB ID, fallback to payment ID
      order: fullOrderData,
    });
  } catch (error: any) {
    console.error('Error processing checkout success:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to process checkout',
      },
      { status: 500 }
    );
  }
}

