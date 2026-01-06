import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { db } from "@/db/drizzle";
import { drivers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DriverDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DriverDetailPage({
  params,
}: DriverDetailPageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    notFound();
  }

  const [driver] = await db
    .select()
    .from(drivers)
    .where(eq(drivers.id, id))
    .limit(1);

  if (!driver) {
    notFound();
  }
  const documents = [
    {
      label: "Car photo",
      url: driver.car_image_url,
    },
    {
      label: "License front",
      url: driver.license_front_url,
    },
    {
      label: "License back",
      url: driver.license_back_url,
    },
  ].filter((doc) => doc.url);

  async function updateStatus(status: "approved" | "rejected") {
    "use server";
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/drivers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-heading-black">
            {driver.name}
          </h1>
          <p className="text-base text-text-gray">
            Detailed profile and documents for this driver.
          </p>
        </div>
        <Link href="/drivers">
          <Button variant="outline" size="sm">
            Back to drivers
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4 space-y-3">
          <h2 className="text-base font-semibold text-heading-black">
            Driver details
          </h2>
          <dl className="space-y-2 text-base">
            <div>
              <dt className="text-text-gray">Name</dt>
              <dd className="font-medium">{driver.name}</dd>
            </div>
            <div>
              <dt className="text-text-gray">Email</dt>
              <dd className="font-medium">
                {driver.email ? (
                  <a
                    href={`mailto:${driver.email}`}
                    className="underline underline-offset-2"
                  >
                    {driver.email}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-text-gray">Phone</dt>
              <dd className="font-medium">
                {driver.phone ? (
                  <a
                    href={`tel:${driver.phone}`}
                    className="underline underline-offset-2"
                  >
                    {driver.phone}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-text-gray">Address</dt>
              <dd className="font-medium whitespace-pre-wrap">
                {driver.address || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-text-gray">Car type</dt>
              <dd className="font-medium">{driver.car_type}</dd>
            </div>
            <div>
              <dt className="text-text-gray">Status</dt>
              <dd className="font-semibold uppercase text-text-gray">
                {driver.status}
              </dd>
            </div>
          </dl>

          <div className="flex gap-2 pt-2">
            <form action={updateStatus.bind(null, "approved")}>
              <Button size="sm" variant="default">
                Approve
              </Button>
            </form>
            <form action={updateStatus.bind(null, "rejected")}>
              <Button size="sm" variant="outline">
                Reject
              </Button>
            </form>
          </div>
        </Card>

        <Card className="p-4 lg:col-span-2">
          <h2 className="text-base font-semibold text-heading-black mb-3">
            Documents
          </h2>
          {documents.length === 0 ? (
            <p className="text-base text-text-gray">No documents uploaded.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {documents.map((doc) => (
                <div
                  key={doc.label}
                  className="flex flex-col gap-2 rounded-md border border-border p-2"
                >
                  <span className="text-sm font-medium text-text-gray">
                    {doc.label}
                  </span>
                  <div className="relative h-40 w-full overflow-hidden rounded-md bg-light-background">
                    <Image
                      src={doc.url as string}
                      alt={doc.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <a
                    href={doc.url as string}
                    className="text-sm text-primary-yellow underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open full image
                  </a>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}




