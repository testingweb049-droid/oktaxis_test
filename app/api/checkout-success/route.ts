import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendOrderConfirmationEmail } from '@/actions/add-order';
import { db } from '@/db/drizzle';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { fleets } from '@/lib/fleet-data';

function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(apiKey, {
    apiVersion: '2025-08-27.basil',
  });
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    
    // Retrieve the checkout session and verify payment status
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    });

    // ✅ Confirm payment is completed before proceeding
    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed. Order cannot be updated without payment confirmation.' },
        { status: 400 }
      );
    }

    // Get order ID from metadata (stored when checkout session was created)
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID not found in session metadata' },
        { status: 400 }
      );
    }

    // Convert string to number for database query
    const orderIdNum = parseInt(orderId, 10);
    if (isNaN(orderIdNum)) {
      return NextResponse.json(
        { error: 'Invalid order ID format' },
        { status: 400 }
      );
    }

    // Get payment ID from payment intent
    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
    const paymentId = paymentIntent?.id || sessionId;

    // ✅ Check if order already has payment_id (already processed)
    const existingOrder = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderIdNum))
      .limit(1);

    if (!existingOrder[0]) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if order was already processed (has payment_id)
    const isAlreadyProcessed = !!existingOrder[0].payment_id;

    // ✅ Update existing order with payment_id (only if not already set)
    const updatedOrder = await db
      .update(orders)
      .set({ 
        payment_id: paymentId,
        payment_method: 'card'
      })
      .where(eq(orders.id, orderIdNum))
      .returning();

    if (!updatedOrder[0]) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // ✅ Only send email if this is the first time processing (not already processed)
    if (!isAlreadyProcessed) {
      // Get car image for email
      const selectedFleet = fleets.find(fleet => fleet.name === updatedOrder[0].car);
      const carImage = selectedFleet?.image || null;

      // Send confirmation email only on first successful payment processing
      await sendOrderConfirmationEmail(orderIdNum, carImage);
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder[0],
      orderId: updatedOrder[0].id,
      message: 'Order confirmed and confirmation email sent successfully',
    });
  } catch (error: any) {
    console.error('Error processing checkout success:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing checkout' },
      { status: 500 }
    );
  }
}

