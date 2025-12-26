'use server'
import { db } from '@/db/drizzle';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getOrderById(orderId: string | number) {
  try {
    // Convert string to number for database query
    const orderIdNum = typeof orderId === 'string' ? parseInt(orderId, 10) : orderId;
    if (isNaN(orderIdNum)) {
      return { error: 'Invalid order ID', status: 400 };
    }
    const order = await db.select().from(orders).where(eq(orders.id, orderIdNum));

    if (order.length === 0) {
      return { error: 'Order not found', status: 404 };
    }

    return { order: order[0], status: 200, error: '' };
  } catch (error) {
    console.error('Error retrieving order:', error);
    return { error: 'An error occurred while fetching the order data.', status: 500 };
  }
}
