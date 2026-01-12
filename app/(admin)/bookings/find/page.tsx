import { db } from "@/db/drizzle";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

import type { BookingRow } from "@/components/admin/bookings-table";
import { FindBookingPageClient } from "@/components/admin/find-booking-page-client";

export default async function FindBookingPage() {
  const bookings = (await db
    .select({
      id: orders.id,
      name: orders.name,
      email: orders.email,
      pickup_location: orders.pickup_location,
      dropoff_location: orders.dropoff_location,
      pickup_date: orders.pickup_date,
      car: orders.car,
      category: orders.category,
      price: orders.price,
      created_at: orders.created_at,
      payment_id: orders.payment_id,
    })
    .from(orders)
    .orderBy(desc(orders.created_at))
    .limit(200)) as BookingRow[];

  return <FindBookingPageClient bookings={bookings} />;
}


