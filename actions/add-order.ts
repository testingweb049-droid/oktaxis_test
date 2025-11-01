'use server';

import { db } from '@/db/drizzle';
import { orders } from '@/db/schema';
import nodemailer from 'nodemailer';
import { emailConfig } from '@/lib/emailConfig';
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
  paymentId: string;
  isAirportPickup: boolean;
  isFlightTrack: boolean;
  isMeetGreet: boolean;
  isReturn: boolean;
  carImage?: string; 
  category: 'hourly' | 'trip'
}


export async function createOrder(data: OrderDataType) {
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
      kids: 0, // can be updated later if added to frontend
      bags: Number(data.bags || 0),

      name: String(data.name || ''),
      email: String(data.email || ''),
      phone: String(data.phone || ''),

      flight: data.flightName || data.flightNumber || null,
      payment_id: data.paymentId || null,
      payment_method: 'card', // default or from frontend if applicable
      duration: data.duration ? parseInt(data.duration, 10) : null,

      flight_track: Boolean(data.isFlightTrack),
      meet_greet: Boolean(data.isMeetGreet),
    };
    
    
    const inserted = await db.insert(orders).values(orderData).returning();
    const order = inserted[0];
    
    if (!order?.id) {
      return { error: 'Order not placed due to backend issue.', status: 500 };
    }
    
    // ✅ Email setup
    const carImage = `http://localhost:3000/${data.carImage}`;
    const orderLink = `http://localhost:3000/order/${order.id}`;
    const transporter = nodemailer.createTransport(emailConfig);
    const stops = data.stops.map((item,index)=>({label:index===0? 'Pickup Location' : data.stops.length-1 === index ? data.category==='hourly' ? 'Duration' : 'Stop ' + index  : 'Dropoff Location' , value:data.stops.length-1 === index && data.category==='hourly' ? item + ' hours' : item}))
    const htmEmail = await render(TripOrderEmailTemplate({carImage, stops, viewOrderLink:orderLink}))

    await transporter.sendMail({
      from: 'reservation@oktaxis.co.uk',
      to: [order.email, 'reservation@oktaxis.co.uk'],
      subject: 'Your OKTaxis Booking Confirmation 🚕',
      html: htmEmail,
    });

    return { order, status: 201, error: '' };
  } catch (error) {
    console.error('Error creating order:', error);
    return { error: 'An error occurred while creating the order.', status: 500 };
  }
}
