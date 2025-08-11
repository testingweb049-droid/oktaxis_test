"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Building, CarFront, Ruler, Users } from "lucide-react"

function HourlyNoteDialog() {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Important Info</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Important Information</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Distance Included */}
          <div className="flex gap-3">
            <Ruler className="text-gray-700 mt-1" />
            <div>
              <h3 className="font-medium text-lg">Distance Included</h3>
              <p className="text-gray-600 text-base">
                Your booking covers <strong>16 miles/hour</strong>. Extra distance or time costs extra.
              </p>
            </div>
          </div>

          {/* Return Location */}
          <div className="flex gap-3">
            <Building className="text-gray-700 mt-1" />
            <div>
              <h3 className="font-medium text-lg">Return Location</h3>
              <p className="text-gray-600 text-base">
                Trips must end in the same city or area as pickup. Different city trips need one-way booking or a return fee.
              </p>
            </div>
          </div>

          {/* Capacity Limits */}
          <div className="flex gap-3">
            <Users className="text-gray-700 mt-1" />
            <div>
              <h3 className="font-medium text-lg">Capacity Limits</h3>
              <p className="text-gray-600 text-base">
                Follow guest and luggage limits for safety. Pick a bigger vehicle if unsure—drivers may refuse if limits are exceeded.
              </p>
            </div>
          </div>

          {/* Vehicle Assignment */}
          <div className="flex gap-3">
            <CarFront className="text-gray-700 mt-1" />
            <div>
              <h3 className="font-medium text-lg">Vehicle Assignment</h3>
              <p className="text-gray-600 text-base">
                Vehicle images are samples. You’ll get a similar-quality vehicle.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="w-full mt-6 bg-brand hover:bg-brand text-black font-semibold"
        >
          GOT IT
        </Button>

      </DialogContent>
    </Dialog>
  )
}

export default HourlyNoteDialog
