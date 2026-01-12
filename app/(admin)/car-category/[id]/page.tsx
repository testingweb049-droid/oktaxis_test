import Link from "next/link";

import { db } from "@/db/drizzle";
import { fleets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AdminPageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";

interface CarCategoryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarCategoryDetailPage({
  params,
}: CarCategoryDetailPageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Car Details" />
        <p className="text-sm text-red-600">Invalid car id.</p>
      </div>
    );
  }

  const [fleet] = await db
    .select()
    .from(fleets)
    .where(eq(fleets.id, id))
    .limit(1);

  if (!fleet) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Car Details" />
        <p className="text-sm text-red-600">Car not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={`Car Details – ${fleet.name}`}
        actions={
          <Button variant="outline" asChild>
            <Link href="/admin/car-category">Back to list</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4 rounded-xl border border-border/60 bg-white p-4 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-heading-black">
              Basic info
            </h2>
            <p className="text-sm text-text-gray">
              Read-only details for this car category.
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase text-text-gray">
                Name
              </dt>
              <dd className="text-sm font-semibold text-heading-black">
                {fleet.name}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-text-gray">
                Cars
              </dt>
              <dd className="text-sm text-heading-black">{fleet.cars}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-text-gray">
                Passengers
              </dt>
              <dd className="text-sm text-heading-black">
                {fleet.passengers}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-text-gray">
                Suitcases
              </dt>
              <dd className="text-sm text-heading-black">
                {fleet.suitcases}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-text-gray">
                Price (10 miles)
              </dt>
              <dd className="text-sm text-heading-black">
                {String(fleet.price_10_miles)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-text-gray">
                Price per mile
              </dt>
              <dd className="text-sm text-heading-black">
                {String(fleet.price_per_mile)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-text-gray">
                Hourly rate
              </dt>
              <dd className="text-sm text-heading-black">
                {String(fleet.hourly_rate)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-text-gray">
                Minimum fare
              </dt>
              <dd className="text-sm text-heading-black">
                {fleet.minimum_fare == null
                  ? "—"
                  : String(fleet.minimum_fare)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-text-gray">
                Stops included
              </dt>
              <dd className="text-sm text-heading-black">
                {fleet.stops_included == null
                  ? "—"
                  : String(fleet.stops_included)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-text-gray">
                One-way discount %
              </dt>
              <dd className="text-sm text-heading-black">
                {String(fleet.one_way_discount_percent)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-text-gray">
                Return discount %
              </dt>
              <dd className="text-sm text-heading-black">
                {String(fleet.return_discount_percent)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase text-text-gray">
                Active
              </dt>
              <dd className="text-sm text-heading-black">
                {fleet.is_active ? "Yes" : "No"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="space-y-4 rounded-xl border border-border/60 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-heading-black">
            Image
          </h2>
          {fleet.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={fleet.image_url}
              alt={fleet.name}
              className="h-40 w-full rounded-lg border border-border/60 object-contain bg-muted"
            />
          ) : (
            <p className="text-sm text-text-gray">No image configured.</p>
          )}
        </div>
      </div>
    </div>
  );
}


