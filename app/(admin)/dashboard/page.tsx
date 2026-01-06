import Link from "next/link";
import { CalendarRange, CreditCard, Clock, Users } from "lucide-react";

import { db } from "@/db/drizzle";
import { orders, drivers } from "@/db/schema";
import { desc } from "drizzle-orm";
import { AdminPageHeader } from "@/components/admin/page-header";
import { RecentBookingsTable } from "@/components/admin/recent-bookings-table";
import { RecentDriversTable } from "@/components/admin/recent-drivers-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const [recentBookings, recentDrivers] = await Promise.all([
    db
      .select({
        id: orders.id,
        name: orders.name,
        price: orders.price,
        payment_id: orders.payment_id,
        created_at: orders.created_at,
      })
      .from(orders)
      .orderBy(desc(orders.created_at))
      .limit(10),
    db
      .select({
        id: drivers.id,
        name: drivers.name,
        email: drivers.email,
        status: drivers.status,
        created_at: drivers.created_at,
      })
      .from(drivers)
      .orderBy(desc(drivers.created_at))
      .limit(10),
  ]);

  const totalRecentBookings = recentBookings.length;
  const totalPaidBookings = recentBookings.filter(
    (booking) => booking.payment_id
  ).length;
  const totalPendingBookings = totalRecentBookings - totalPaidBookings;

  const totalRecentRevenueValue =
    recentBookings.reduce((sum, booking) => {
      const value = Number(booking.price);
      if (Number.isNaN(value)) return sum;
      return sum + value;
    }, 0) / 100;

  const formattedRecentRevenue =
    totalRecentRevenueValue <= 0
      ? "£0.00"
      : `£${totalRecentRevenueValue.toFixed(2)}`;

  const totalRecentDrivers = recentDrivers.length;
  const pendingDrivers = recentDrivers.filter(
    (driver) => (driver.status ?? "pending").toLowerCase() !== "approved"
  ).length;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Overview of recent bookings and driver activity."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-4 md:p-6">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm font-medium text-text-gray">
              Recent bookings
            </p>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-yellow/15 text-primary-yellow shadow-sm">
              <CalendarRange className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-heading-black">
            {totalRecentBookings}
          </p>
          <p className="text-sm text-text-gray mt-2">
            From the latest {recentBookings.length} orders.
          </p>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm font-medium text-text-gray">
              Recent revenue
            </p>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-yellow/15 text-primary-yellow shadow-sm">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-heading-black">
            {formattedRecentRevenue}
          </p>
          <p className="text-sm text-text-gray mt-2">
            Based on the latest paid bookings.
          </p>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm font-medium text-text-gray">
              Pending bookings
            </p>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-yellow/15 text-primary-yellow shadow-sm">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-heading-black">
            {totalPendingBookings}
          </p>
          <p className="text-sm text-text-gray mt-2">
            Awaiting payment confirmation.
          </p>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm font-medium text-text-gray">
              Recent drivers
            </p>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-yellow/15 text-primary-yellow shadow-sm">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-heading-black">
            {totalRecentDrivers}
          </p>
          <p className="text-sm text-text-gray mt-2">
            {pendingDrivers} pending approval.
          </p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-heading-black">
              Recent bookings
            </h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/bookings">View all</Link>
            </Button>
          </div>
          <RecentBookingsTable data={recentBookings} />
        </Card>

        <Card className="p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-heading-black">
              Recent drivers
            </h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/drivers">View all</Link>
            </Button>
          </div>
          <RecentDriversTable data={recentDrivers} />
        </Card>
      </div>
    </div>
  );
}


