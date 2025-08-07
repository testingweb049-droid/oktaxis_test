'use server'
import { db } from '@/db/drizzle';
import { orders } from '@/db/schema';
import nodemailer from 'nodemailer';
import { emailConfig } from '@/lib/emailConfig';

export async function createOrder({
  category, price, car, pickup_date, pickup_time, payment_id, pickup_location, dropoff_location,
  passengers, kids, bags, name, email, phone, flight, duration = null, distance = null, stop_1 = null,
  stop_2 = null,
  stop_3 = null, payment_method, flight_track,
  meet_greet,
  is_return,
  return_date,
  return_time
}: {
  category: string;
  price: number;
  car: string;
  distance?: number | null;
  pickup_date: Date;
  pickup_time: string;
  return_date: Date | undefined;
  return_time: string | null;
  is_return: boolean,
  pickup_location: string;
  dropoff_location: string | null | undefined;
  passengers: number;
  kids: number;
  bags: number;
  name: string;
  email: string;
  payment_method: string;
  phone: string;
  flight: string | null;
  payment_id: string | null;
  duration?: number | null;
  minutes?: number | null;
  stop_1?: string | null,
  stop_2?: string | null,
  stop_3?: string | null,
  flight_track: boolean,
  meet_greet: boolean,
}) {
  try {
    const orderData = {
      category,
      price: price.toString(),
      car,
      distance: distance !== null ? distance.toString() : null,
      pickup_time,
      pickup_date,
      pickup_location,
      dropoff_location,
      passengers,
      kids,
      bags,
      name,
      email,
      phone,
      flight,
      payment_id,
      duration,
      stop_1,
      stop_2,
      stop_3, payment_method,
      flight_track,
      meet_greet,
      is_return,
      return_date,
      return_time
    };

    const order = await db.insert(orders).values({ ...orderData }).returning();
    if (!order[0] || !order[0].id) {
      console.log('order : ', order)
      return { error: 'order not placed due to backend issue', status: 500 };
    }
    const orderId = order[0].id;
    const orderLink = `https://oktaxis.co.uk/order/${orderId}`;

    const transporter = nodemailer.createTransport(emailConfig);

    const mailOptions = {
      from: 'reservation@oktaxis.co.uk',
      to: [email, 'reservation@oktaxis.co.uk'],
      subject: 'Order Placed Successfully!',
      html: `
       <html lang="en">
  <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Segoe UI', Tahoma, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
      
      <!-- Header -->
      <div style="background-color: #000000; padding: 30px 20px; text-align: center;">
        <h1 style="color: #F7931E; font-size: 24px; margin: 0;">Order Successfully Placed</h1>
        <p style="color: #ffffff; font-size: 15px; margin-top: 8px;">Thank you for choosing OKTaxis</p>
      </div>

      <!-- Content -->
      <div style="padding: 30px 25px;">
        <p style="font-size: 16px; color: #111827;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 16px; color: #111827; line-height: 1.6;">
          Your booking has been successfully received and your ride is confirmed. Our driver will arrive approximately 15 minutes before your scheduled pickup time.
        </p>

        <div style="margin: 30px 0; text-align: center;">
          <p style="color: #000000; font-weight: 500; margin-bottom: 15px;">
            Click the button below to view your order details:
          </p>
          <a href="${orderLink}" style="background-color: #F7931E; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: bold;">
            View Order
          </a>
        </div>

        <p style="font-size: 14px; color: #4b5563; line-height: 1.5;">
          Need help or have any questions? Contact us anytime at
          <a href="mailto:reservation@oktaxis.co.uk" style="color: #F7931E; font-weight: 500;">reservation@oktaxis.co.uk</a>
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 13px;">
        &copy; ${new Date().getFullYear()} OKTaxis. All rights reserved.
      </div>
    </div>
  </body>
</html>
      `,
    };

    const { rejected, response } = await transporter.sendMail(mailOptions);
    console.log("response ", response)
    console.log("rejected ", rejected)
    if (rejected.length > 0) {
      return { order, status: 500, error: 'email not send' };
    }
    return { order, status: 201, error: '' };
  } catch (error) {
    console.error('Error creating order:', error);
    return { error: 'An error occurred while creating the order.', status: 500 };
  }
}
