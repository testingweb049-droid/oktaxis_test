'use server'
import { db } from '@/db/drizzle';
import { orders } from '@/db/schema';
import nodemailer from 'nodemailer';
import { emailConfig } from '@/lib/emailConfig';

export async function createOrder({
  category, price, car, pickup_date, pickup_time ,payment_id, pickup_location, dropoff_location,
  passengers, kids, bags, name, email, phone, flight, duration=null , distance=null,  stop_1=null,
  stop_2=null,
  stop_3=null,payment_method,flight_track, 
      meet_greet
}: {
  category: string;
  price: number;
  car: string;
  distance?: number | null; 
  pickup_date: Date;
  pickup_time: string;
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
  stop_1?:string | null,
  stop_2?:string | null,
  stop_3?:string | null,
  flight_track:boolean,
  meet_greet:boolean,
}) {
  try {
    const orderData = {
      category,
      price:price.toString(),
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
      stop_3,payment_method,
      flight_track, 
      meet_greet
    };

    const order = await db.insert(orders).values({...orderData}).returning(); 
    if(!order[0] || !order[0].id){
      console.log('order : ',order)
        return { error: 'order not placed due to backend issue', status: 500 };
    }
    const orderId = order[0].id; 
    const orderLink = `${process.env.BASE_URL}/order/${orderId}`; 

    const transporter = nodemailer.createTransport(emailConfig);

    const mailOptions = {
      from: 'info@oktaxis.co.uk',
      to: [email, 'mussaddiqmahmood1038@gmail.com' , 'info@oktaxis.co.uk'],
      subject: 'Order Placed Successfully!',
      html: `
        <html lang="en">
          <body style="font-family: Arial, sans-serif; background-color: #f0f4f8; color: #333; padding: 20px">
            <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <h1 style="color: #2b6cb0; text-align: center;">Order Placed Successfully</h1>
              <p style="font-size: 16px; text-align: center;">Dear ${name},</p>
              <p style="font-size: 16px; text-align: center;">Thank you for placing your order with us! Your order has been successfully placed, and we are preparing it for you.</p>
              <p style="font-size: 16px; text-align: center; font-weight: bold; color: #2b6cb0;">
                To view your order details and track its status, click the link below:
              </p>
              <p style="text-align: center;">
                <a href="${orderLink}" style="display: inline-block; background-color: #2b6cb0; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-size: 16px;">
                  View Order
                </a>
              </p>
              <p style="font-size: 14px; text-align: center; color: #777;">If you have any questions or need assistance, feel free to contact us.</p>
              <p style="font-size: 14px; text-align: center; color: #777;">Best regards,<br>OKTaxis</p>
            </div>
          </body>
        </html>
      `,
    };

    const {rejected, response} = await transporter.sendMail(mailOptions);
    console.log("response ",response)
    console.log("rejected ",rejected)
   if(rejected.length>0){
    return { order, status: 500, error: 'email not send' };
   }
    return { order, status: 201, error: '' };
  } catch (error) {
    console.error('Error creating order:', error);
    return { error: 'An error occurred while creating the order.', status: 500 };
  }
}
