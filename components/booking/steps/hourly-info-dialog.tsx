"use client";

import { Building, CarFront, Ruler, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface HourlyInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function HourlyInfoDialog({
  open,
  onOpenChange,
  onConfirm,
}: HourlyInfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Important Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Distance Included */}
          <div className="flex gap-3">
            <Ruler className="text-gray-700 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-lg">Distance Included</h3>
              <p className="text-gray-600 text-base">
                Your ride includes <strong>15 miles/hour</strong> booked. Extra
                distance or time will result in extra charges.
              </p>
            </div>
          </div>

          {/* Return Location */}
          <div className="flex gap-3">
            <Building className="text-gray-700 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-lg">Return Location</h3>
              <p className="text-gray-600 text-base">
                Bookings must end in the same city or metropolitan area as the
                pickup location, or a vehicle-return fee will apply. For
                inter-city travel, choose one-way.
              </p>
            </div>
          </div>

          {/* Capacity Limits */}
          <div className="flex gap-3">
            <Users className="text-gray-700 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-lg">Capacity Limits</h3>
              <p className="text-gray-600 text-base">
                Respect guest/luggage capacity for safety. Choose a larger class
                if unsure—chauffeurs may decline if limits are exceeded.
              </p>
            </div>
          </div>

          {/* Vehicle Assignment */}
          <div className="flex gap-3">
            <CarFront className="text-gray-700 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-lg">Vehicle Assignment</h3>
              <p className="text-gray-600 text-base">
                Vehicle images are examples. A similar-quality vehicle may be
                assigned.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={onConfirm}
          className={cn(
            "w-full mt-6 font-semibold",
            "bg-primary-yellow hover:bg-primary-yellow/90 text-heading-black font-semibold transition-all duration-200",
            "px-4 py-2.5 text-base rounded-lg"
          )}
        >
          GOT IT
        </Button>
      </DialogContent>
    </Dialog>
  );
}

