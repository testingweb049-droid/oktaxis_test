"use client";

import * as React from "react";
import { Plus, Percent } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/page-header";
import { CarCategoryTable } from "@/components/admin/car-category-table";
import type { FleetRow } from "@/components/admin/car-category-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CarCategoryForm } from "@/components/admin/car-category-form";

interface CarCategoryPageClientProps {
  initialFleets: FleetRow[];
}

export function CarCategoryPageClient({
  initialFleets,
}: CarCategoryPageClientProps) {
  const [fleets, setFleets] = React.useState<FleetRow[]>(initialFleets);
  const [addOpen, setAddOpen] = React.useState(false);
  const [discountFleet, setDiscountFleet] = React.useState<FleetRow | null>(
    null,
  );
  const [discounts, setDiscounts] = React.useState({
    one_way_discount_percent: "",
    return_discount_percent: "",
  });
  const [savingDiscount, setSavingDiscount] = React.useState(false);
  const [discountError, setDiscountError] = React.useState<string | null>(
    null,
  );

  const handleCreated = (fleet: FleetRow) => {
    setFleets((prev) => [fleet, ...prev]);
  };

  const handleDelete = async (fleet: FleetRow) => {
    const res = await fetch(`/api/admin/fleets/${fleet.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      // eslint-disable-next-line no-alert
      alert(data?.message || "Failed to delete car");
      return;
    }
    setFleets((prev) => prev.filter((item) => item.id !== fleet.id));
  };

  const handleOpenDiscounts = (fleet: FleetRow) => {
    setDiscountFleet(fleet);
    setDiscounts({
      one_way_discount_percent: String(
        fleet.one_way_discount_percent ?? "",
      ),
      return_discount_percent: String(
        fleet.return_discount_percent ?? "",
      ),
    });
    setDiscountError(null);
  };

  const handleSaveDiscounts = async () => {
    if (!discountFleet || savingDiscount) return;
    setSavingDiscount(true);
    setDiscountError(null);

    try {
      const body = {
        one_way_discount_percent: discounts.one_way_discount_percent
          ? Number(discounts.one_way_discount_percent)
          : 0,
        return_discount_percent: discounts.return_discount_percent
          ? Number(discounts.return_discount_percent)
          : 0,
      };

      const res = await fetch(
        `/api/admin/fleets/${discountFleet.id}/discounts`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update discounts");
      }

      setFleets((prev) =>
        prev.map((item) =>
          item.id === discountFleet.id
            ? {
                ...item,
                one_way_discount_percent:
                  data.one_way_discount_percent ??
                  body.one_way_discount_percent,
                return_discount_percent:
                  data.return_discount_percent ??
                  body.return_discount_percent,
              }
            : item,
        ),
      );

      setDiscountFleet(null);
    } catch (err: any) {
      setDiscountError(err?.message || "Failed to update discounts");
    } finally {
      setSavingDiscount(false);
    }
  };

  return (
    <div className="space-y-3">
      <AdminPageHeader
        title="Car Category"
      />

      <div className="rounded-lg border border-input/60 bg-white shadow-sm">
        <div className="flex flex-col gap-2 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-heading-black">
              Car Listings
            </h2>
            <p className="text-sm text-text-gray">
              Manage the fleet vehicles that appear across the website.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center gap-2 bg-primary-yellow text-heading-black hover:bg-primary-yellow/90"
          >
            <Plus className="h-4 w-4" />
            <span className="text-xs sm:text-sm font-semibold">
              Add Car
            </span>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-input/60 bg-white shadow-sm">
        <div className="px-3 py-2 md:px-4 md:py-3">
          <CarCategoryTable
            data={fleets}
            onDelete={handleDelete}
            onOpenDiscounts={handleOpenDiscounts}
          />
        </div>
      </div>

      {/* Add Car Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-xl max-h-[calc(100vh-3rem)] overflow-y-auto p-4 sm:p-6">
          <CarCategoryForm
            onCreated={handleCreated}
            onClose={() => setAddOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Discounts Modal */}
      <Dialog
        open={!!discountFleet}
        onOpenChange={(open) => {
          if (!open) setDiscountFleet(null);
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5" />
              <span>
                Set discounts{" "}
                {discountFleet ? `for ${discountFleet.name}` : ""}
              </span>
            </DialogTitle>
          </DialogHeader>

          {discountError && (
            <div className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {discountError}
            </div>
          )}

          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
              <Label htmlFor="one_way_discount_percent_modal">
                One-way discount %
              </Label>
              <Input
                id="one_way_discount_percent_modal"
                type="number"
                min={0}
                max={100}
                value={discounts.one_way_discount_percent}
                onChange={(e) =>
                  setDiscounts((prev) => ({
                    ...prev,
                    one_way_discount_percent: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
              <Label htmlFor="return_discount_percent_modal">
                Return discount %
              </Label>
              <Input
                id="return_discount_percent_modal"
                type="number"
                min={0}
                max={100}
                value={discounts.return_discount_percent}
                onChange={(e) =>
                  setDiscounts((prev) => ({
                    ...prev,
                    return_discount_percent: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDiscountFleet(null)}
              disabled={savingDiscount}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveDiscounts}
              disabled={savingDiscount}
            >
              {savingDiscount ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


