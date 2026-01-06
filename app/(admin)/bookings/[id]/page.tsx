import { notFound } from "next/navigation";
import Link from "next/link";

import { db } from "@/db/drizzle";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BookingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingDetailPage({
  params,
}: BookingDetailPageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    notFound();
  }
  const [booking] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, id))
    .limit(1);

  if (!booking) {
    notFound();
  }

  const formatDateTime = (date?: Date | null, time?: string | null) => {
    if (!date && !time) return "—";
    const datePart = date ? new Date(date).toLocaleDateString() : "";
    const timePart = time || "";
    return [datePart, timePart].filter(Boolean).join(" • ");
  };

  const priceValue = Number(booking.price) / 100;
  const formattedPrice = isNaN(priceValue)
    ? booking.price
    : `£${priceValue.toFixed(2)}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-heading-black">
            Booking #{booking.id}
          </h1>
          <p className="text-base text-text-gray">
            Full details of this booking. Driver information is not shown in a
            dialog and can be connected here later if needed.
          </p>
        </div>
        <Link href="/bookings">
          <Button variant="outline" size="sm">
            Back to bookings
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4 lg:col-span-1">
          <h2 className="text-base font-semibold text-heading-black mb-3">
            Passenger
          </h2>
          <dl className="space-y-2 text-base">
            <div>
              <dt className="text-text-gray">Name</dt>
              <dd className="font-medium">{booking.name}</dd>
            </div>
            <div>
              <dt className="text-text-gray">Email</dt>
              <dd className="font-medium">
                {booking.email ? (
                  <a
                    href={`mailto:${booking.email}`}
                    className="underline underline-offset-2"
                  >
                    {booking.email}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-text-gray">Phone</dt>
              <dd className="font-medium">
                {booking.phone ? (
                  <a
                    href={`tel:${booking.phone}`}
                    className="underline underline-offset-2"
                  >
                    {booking.phone}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-4 lg:col-span-2">
          <h2 className="text-base font-semibold text-heading-black mb-3">
            Trip details
          </h2>
          <dl className="grid gap-3 md:grid-cols-2 text-base">
            <div>
              <dt className="text-text-gray">Pickup</dt>
              <dd className="font-medium">{booking.pickup_location}</dd>
            </div>
            {booking.dropoff_location && (
              <div>
                <dt className="text-text-gray">Dropoff</dt>
                <dd className="font-medium">{booking.dropoff_location}</dd>
              </div>
            )}
            <div>
              <dt className="text-text-gray">Pickup date & time</dt>
              <dd className="font-medium">
                {formatDateTime(booking.pickup_date, booking.pickup_time)}
              </dd>
            </div>
            {booking.is_return && (
              <div>
                <dt className="text-text-gray">Return date & time</dt>
                <dd className="font-medium">
                  {formatDateTime(booking.return_date, booking.return_time)}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-text-gray">Category</dt>
              <dd className="font-medium">{booking.category}</dd>
            </div>
            <div>
              <dt className="text-text-gray">Car</dt>
              <dd className="font-medium">{booking.car}</dd>
            </div>
            <div>
              <dt className="text-text-gray">Passengers / Bags</dt>
              <dd className="font-medium">
                {booking.passengers} passengers • {booking.bags} bags
              </dd>
            </div>
            {booking.distance && (
              <div>
                <dt className="text-text-gray">Distance</dt>
                <dd className="font-medium">{booking.distance}</dd>
              </div>
            )}
          </dl>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4">
          <h2 className="text-base font-semibold text-heading-black mb-3">
            Payment
          </h2>
          <dl className="space-y-2 text-base">
            <div>
              <dt className="text-text-gray">Price</dt>
              <dd className="font-medium">{formattedPrice}</dd>
            </div>
            {booking.payment_method && (
              <div>
                <dt className="text-text-gray">Method</dt>
                <dd className="font-medium">{booking.payment_method}</dd>
              </div>
            )}
            {booking.payment_id && (
              <div>
                <dt className="text-text-gray">Payment reference</dt>
                <dd className="font-medium">{booking.payment_id}</dd>
              </div>
            )}
          </dl>
        </Card>

        <Card className="p-4 lg:col-span-2">
          <h2 className="text-base font-semibold text-heading-black mb-3">
            Extras & notes
          </h2>
          <dl className="space-y-2 text-base">
            <div>
              <dt className="text-text-gray">Flight details</dt>
              <dd className="font-medium">
                {booking.flight_name || booking.flight_number
                  ? `${booking.flight_name ?? ""} ${booking.flight_number ?? ""}`
                  : "—"}
              </dd>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <dt className="text-text-gray">Airport pickup</dt>
                <dd className="font-medium">
                  {booking.is_airport_pickup ? "Yes" : "No"}
                </dd>
              </div>
              <div>
                <dt className="text-text-gray">Meet & greet</dt>
                <dd className="font-medium">
                  {booking.meet_greet ? "Yes" : "No"}
                </dd>
              </div>
              <div>
                <dt className="text-text-gray">Flight tracking</dt>
                <dd className="font-medium">
                  {booking.flight_track ? "Yes" : "No"}
                </dd>
              </div>
            </div>
            <div>
              <dt className="text-text-gray">Instructions</dt>
              <dd className="font-medium whitespace-pre-wrap">
                {booking.instructions || "—"}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}



