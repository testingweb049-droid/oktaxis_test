'use server';

import { db } from '@/db/drizzle';
import { orders } from '@/db/schema';
import nodemailer from 'nodemailer';
import { getEmailConfig } from '@/lib/emailConfig';
import { render } from '@react-email/components';
import { TripOrderEmailTemplate } from '@/components/emails/BookingEmailTemplate';

export interface OrderDataType {
  fromLocation: string;
  toLocation: string;
  stops: string[];
  duration: string;
  distance: number;
  car: string;
  price: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  returnDate: string;
  returnTime: string;
  passengers: string;
  bags: string;
  flightName: string;
  flightNumber: string;
  isAirportPickup?: boolean;
  paymentId: string;
  paymentMethod?: string;
  isFlightTrack: boolean;
  isMeetGreet: boolean;
  isReturn: boolean;
  isReturnFlightTrack: boolean;
  isReturnMeetGreet: boolean;
  extraStopsCount: string;
  returnExtraStopsCount: string;
  instructions: string;
  carImage?: string; 
  category: 'hourly' | 'trip'
}


export async function createOrder(data: OrderDataType, skipEmail: boolean = false) {
  try {
   
    const orderData = {
      category: String(data.category || 'trip'),
      price: String(data.price || '0'),
      car: String(data.car || ''),
      distance: data.distance ? String(data.distance) : null,
      stops: data.stops,
      pickup_date: data.date ? new Date(data.date) : null,
      pickup_time: String(data.time || ''),
      return_date: data.returnDate ? new Date(data.returnDate) : null,
      return_time: String(data.returnTime || ''),
      is_return: Boolean(data.returnDate || data.returnTime),

      pickup_location: String(data.fromLocation || ''),
      dropoff_location: String(data.toLocation || null),

      passengers: Number(data.passengers || 1),
      bags: Number(data.bags || 0),

      name: String(data.name || ''),
      email: String(data.email || ''),
      phone: String(data.phone || ''),

      flight_name: data.flightName || null,
      flight_number: data.flightNumber || null,
      is_airport_pickup: Boolean(data.isAirportPickup),
      payment_id: data.paymentId || null,
      payment_method: data.paymentMethod || 'card',
      duration: data.duration ? parseInt(data.duration, 10) : null,

      // Regular Equipment and Extras (separate from return)
      flight_track: Boolean(data.isFlightTrack),
      meet_greet: Boolean(data.isMeetGreet),
      // Extra stops count - boolean derived from count > 0
      extra_stops_count: data.extraStopsCount ? Number(data.extraStopsCount) : 0,
      // Return Equipment and Extras (completely separate from regular equipment)
      return_flight_track: Boolean(data.isReturnFlightTrack),
      return_meet_greet: Boolean(data.isReturnMeetGreet),
      // Return extra stops count - boolean derived from count > 0
      return_extra_stops_count: data.returnExtraStopsCount ? Number(data.returnExtraStopsCount) : 0,
      instructions: data.instructions || null,
    };
    
    
    const inserted = await db.insert(orders).values(orderData).returning();
    const order = inserted[0];
    
    if (!order?.id) {
      return { error: 'Order not placed due to backend issue.', status: 500 };
    }
    
    // ✅ Email setup - only send if not skipped
    if (!skipEmail) {
      const carImage = `https://oktaxis.co.uk/${data.carImage}`;
      const orderLink = `https://oktaxis.co.uk/order/${order.id}`;
      const transporter = nodemailer.createTransport(getEmailConfig());
      const stops = data.stops.map((item,index)=>({label:index===0? 'Pickup Location' : data.stops.length-1 === index ? data.category==='hourly' ? 'Duration' : 'Stop ' + index  : 'Dropoff Location' , value:data.stops.length-1 === index && data.category==='hourly' ? item + ' hours' : item}))
      const htmEmail = await render(TripOrderEmailTemplate({carImage, stops, viewOrderLink:orderLink}))

      await transporter.sendMail({
        from: 'reservation@oktaxis.co.uk',
        to: [order.email, 'reservation@oktaxis.co.uk'],
        subject: 'Your OKTaxis Booking Confirmation 🚕',
        html: htmEmail,
      });
    }

    return { order, status: 201, error: '' };
  } catch (error) {
    console.error('Error creating order:', error);
    return { error: 'An error occurred while creating the order.', status: 500 };
  }
}

// Helper function to send confirmation email for an existing order
export async function sendOrderConfirmationEmail(orderId: string | number, carImage?: string | null) {
  try {
    const { eq } = await import('drizzle-orm');
    
    // Convert string to number for database query
    const orderIdNum = typeof orderId === 'string' ? parseInt(orderId, 10) : orderId;
    if (isNaN(orderIdNum)) {
      return { error: 'Invalid order ID', status: 400 };
    }
    
    const orderResult = await db.select().from(orders).where(eq(orders.id, orderIdNum)).limit(1);
    const order = orderResult[0];
    
    if (!order) {
      return { error: 'Order not found', status: 404 };
    }

    const imageUrl = carImage ? `https://oktaxis.co.uk/${carImage}` : null;
    const orderLink = `https://oktaxis.co.uk/order/${order.id}`;
    const transporter = nodemailer.createTransport(getEmailConfig());
    
    const stops = (order.stops || []).map((item: string, index: number) => ({
      label: index === 0 
        ? 'Pickup Location' 
        : order.stops!.length - 1 === index 
          ? (order.category === 'hourly' ? 'Duration' : 'Dropoff Location')
          : `Stop ${index}`,
      value: order.stops!.length - 1 === index && order.category === 'hourly' 
        ? `${item} hours` 
        : item
    }));
    
    const htmEmail = await render(TripOrderEmailTemplate({
      carImage: imageUrl || '',
      stops,
      viewOrderLink: orderLink
    }));

    await transporter.sendMail({
      from: 'reservation@oktaxis.co.uk',
      to: [order.email, 'reservation@oktaxis.co.uk'],
      subject: 'Your OKTaxis Booking Confirmation 🚕',
      html: htmEmail,
    });

    return { success: true, status: 200 };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { error: 'Failed to send confirmation email', status: 500 };
  }
}
