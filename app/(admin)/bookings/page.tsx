import { db } from "@/db/drizzle";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

import { AdminPageHeader } from "@/components/admin/page-header";
import {
  BookingsTable,
  type BookingRow,
} from "@/components/admin/bookings-table";

export default async function BookingsPage() {
  const bookings = (await db
    .select({
      id: orders.id,
      name: orders.name,
      email: orders.email,
      pickup_location: orders.pickup_location,
      dropoff_location: orders.dropoff_location,
      pickup_date: orders.pickup_date,
      category: orders.category,
      price: orders.price,
      created_at: orders.created_at,
      payment_id: orders.payment_id,
    })
    .from(orders)
    .orderBy(desc(orders.created_at))
    .limit(200)) as BookingRow[];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Bookings"
        description="Browse and manage all customer bookings."
      />
      <BookingsTable data={bookings} />
    </div>
  );
}



