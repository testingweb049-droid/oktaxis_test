"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FleetRow } from "@/components/Tables/data-table/columns/fleet-columns";

interface CarCategoryFormProps {
  onCreated: (fleet: FleetRow) => void;
  onClose: () => void;
}

export function CarCategoryForm({ onCreated, onClose }: CarCategoryFormProps) {
  const [formState, setFormState] = React.useState({
    name: "",
    cars: "",
    passengers: "",
    suitcases: "",
    price_10_miles: "",
    price_per_mile: "",
    hourly_rate: "",
    minimum_fare: "",
    stops_included: "",
    one_way_discount_percent: "",
    return_discount_percent: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0] ?? null;

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageFile(file);
      setImagePreview(previewUrl);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const uploadImage = async (file: File | null): Promise<string | null> => {
    if (!file) return null;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "oktaxis-fleets/cars");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 55000);

      try {
        const response = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.url) {
          return result.url as string;
        }

        throw new Error(result.error || "Image upload failed");
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err?.name === "AbortError") {
          throw new Error("Image upload timed out. Please try again.");
        }
        throw err;
      }
    } catch (err: any) {
      throw new Error(
        err?.message || "Something went wrong while uploading the image.",
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    if (!imageFile) {
      setError("Please upload an image for this car category.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const imageUrl = await uploadImage(imageFile);

      if (!imageUrl) {
        throw new Error("Failed to upload image. Please try again.");
      }

      const res = await fetch("/api/admin/fleets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name.trim(),
          cars: formState.cars.trim(),
          image_url: imageUrl,
          passengers: Number(formState.passengers || "0"),
          suitcases: Number(formState.suitcases || "0"),
          price_10_miles: Number(formState.price_10_miles || "0"),
          price_per_mile: Number(formState.price_per_mile || "0"),
          hourly_rate: Number(formState.hourly_rate || "0"),
          minimum_fare: formState.minimum_fare
            ? Number(formState.minimum_fare)
            : null,
          stops_included: formState.stops_included
            ? Number(formState.stops_included)
            : null,
          one_way_discount_percent: formState.one_way_discount_percent
            ? Number(formState.one_way_discount_percent)
            : 0,
          return_discount_percent: formState.return_discount_percent
            ? Number(formState.return_discount_percent)
            : 0,
          is_active: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create car");
      }

      const created = data.fleet as any;

      const fleetRow: FleetRow = {
        id: created.id,
        name: created.name,
        cars: created.cars,
        passengers: created.passengers,
        suitcases: created.suitcases,
        price_10_miles: created.price_10_miles,
        hourly_rate: created.hourly_rate,
        minimum_fare: created.minimum_fare,
        one_way_discount_percent: created.one_way_discount_percent,
        return_discount_percent: created.return_discount_percent,
        is_active: created.is_active,
        created_at: created.created_at ?? new Date(),
      };

      onCreated(fleetRow);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to create car");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-xl"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-heading-black">
          Add Car Category
        </h2>
        <p className="text-sm text-text-gray">
          Create a new fleet vehicle that will be available across the
          website.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Essential"
            required
          />
        </div>
        <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
          <Label htmlFor="cars">Cars</Label>
          <Input
            id="cars"
            name="cars"
            value={formState.cars}
            onChange={handleChange}
            placeholder="Skoda Octavia | Toyota Prius"
            required
          />
        </div>
      </div>

      <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
        <Label htmlFor="image_file">Fleet image</Label>
        <div className="space-y-2">
          <Input
            id="image_file"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <p className="text-xs text-text-gray">
            Upload a PNG or JPG image (max 10MB). This will be stored via Cloudinary.
          </p>
          {imagePreview && (
            <div className="mt-1 overflow-hidden rounded-md border border-input/60 bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Fleet preview"
                className="h-40 w-full object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
          <Label htmlFor="passengers">Passengers</Label>
          <Input
            id="passengers"
            name="passengers"
            type="number"
            min={1}
            value={formState.passengers}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
          <Label htmlFor="suitcases">Suitcases</Label>
          <Input
            id="suitcases"
            name="suitcases"
            type="number"
            min={0}
            value={formState.suitcases}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
          <Label htmlFor="stops_included">Stops included</Label>
          <Input
            id="stops_included"
            name="stops_included"
            type="number"
            min={0}
            value={formState.stops_included}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
          <Label htmlFor="price_10_miles">Price (first 10 miles)</Label>
          <Input
            id="price_10_miles"
            name="price_10_miles"
            type="number"
            min={0}
            step={0.01}
            value={formState.price_10_miles}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
          <Label htmlFor="price_per_mile">Price per mile</Label>
          <Input
            id="price_per_mile"
            name="price_per_mile"
            type="number"
            min={0}
            step={0.01}
            value={formState.price_per_mile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
          <Label htmlFor="hourly_rate">Hourly rate</Label>
          <Input
            id="hourly_rate"
            name="hourly_rate"
            type="number"
            min={0}
            step={0.01}
            value={formState.hourly_rate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
          <Label htmlFor="minimum_fare">Minimum fare</Label>
          <Input
            id="minimum_fare"
            name="minimum_fare"
            type="number"
            min={0}
            step={0.01}
            value={formState.minimum_fare}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
          <Label htmlFor="one_way_discount_percent">One-way discount %</Label>
          <Input
            id="one_way_discount_percent"
            name="one_way_discount_percent"
            type="number"
            min={0}
            max={100}
            step={1}
            value={formState.one_way_discount_percent}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1 rounded-lg border border-input/60 bg-white px-3 py-2">
          <Label htmlFor="return_discount_percent">Return discount %</Label>
          <Input
            id="return_discount_percent"
            name="return_discount_percent"
            type="number"
            min={0}
            max={100}
            step={1}
            value={formState.return_discount_percent}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save car"}
        </Button>
      </div>
    </form>
  );
}


