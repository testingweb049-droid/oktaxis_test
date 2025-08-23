"use client"

import type React from "react"
import { Clock, MapPin, Car, CreditCard, Phone, CheckCircle, Calendar, Route, Timer } from "lucide-react"
import useCustomForm from "@/hooks/useFormContext"
import { useEffect } from "react"



export function StatusCard() {
  const { order, resetOrder } = useCustomForm()

  // Demo order data for preview purposes
  useEffect(() => {
  if (!order) {
    resetOrder('/');
  }
}, [order, resetOrder]);

if (!order){ return <div className="text-center py-14">Order not Found...</div>;}
  const displayOrder = order;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#F4910B] to-[#e8830a] rounded-full mb-6 shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for choosing <span className="text-[#F4910B] font-semibold">TransferPro</span>
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-[#F4910B] bg-opacity-10 rounded-full">
            <span className="text-[#F4910B] font-mono font-semibold text-sm">#{displayOrder.id}</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trip Details Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#F4910B] to-[#e8830a] px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Route className="w-5 h-5" />
                  Trip Details
                </h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location Details */}
                  <div className="space-y-4">
                    <DetailCard
                      icon={<MapPin className="w-5 h-5 text-[#F4910B]" />}
                      title="Pickup Location"
                      value={displayOrder.pickup_location ?? "N/A"}
                      accent
                    />

                    {displayOrder.category !== "hourly" && (
                      <DetailCard
                        icon={<MapPin className="w-5 h-5 text-gray-500" />}
                        title="Dropoff Location"
                        value={displayOrder.dropoff_location ?? "N/A"}
                      />
                    )}
                  </div>

                  {/* Time Details */}
                  <div className="space-y-4">
                    <DetailCard
                      icon={<Calendar className="w-5 h-5 text-[#F4910B]" />}
                      title="Pickup Date"
                      value={
                        displayOrder.pickup_date
                          ? new Date(displayOrder.pickup_date).toLocaleDateString("en-GB", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "N/A"
                      }
                      accent
                    />

                    <DetailCard
                      icon={<Clock className="w-5 h-5 text-gray-500" />}
                      title="Pickup Time"
                      value={displayOrder.pickup_time ?? "N/A"}
                    />
                  </div>
                </div>

                {/* Return Trip Details */}
                {displayOrder.is_return && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#F4910B] rounded-full"></span>
                      Return Journey
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailCard
                        icon={<Calendar className="w-5 h-5 text-gray-500" />}
                        title="Return Date"
                        value={
                          displayOrder.return_date
                            ? new Date(displayOrder.return_date).toLocaleDateString("en-GB")
                            : "N/A"
                        }
                      />
                      <DetailCard
                        icon={<Clock className="w-5 h-5 text-gray-500" />}
                        title="Return Time"
                        value={displayOrder.return_time ?? "N/A"}
                      />
                    </div>
                  </div>
                )}

                {/* Service Details */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailCard
                      icon={<Car className="w-5 h-5 text-[#F4910B]" />}
                      title="Vehicle"
                      value={displayOrder.car ?? "N/A"}
                      accent
                    />

                    {displayOrder.category === "hourly" ? (
                      <DetailCard
                        icon={<Timer className="w-5 h-5 text-gray-500" />}
                        title="Duration"
                        value={`${displayOrder.duration ?? 0} hours`}
                      />
                    ) : (
                      <DetailCard
                        icon={<Route className="w-5 h-5 text-gray-500" />}
                        title="Distance"
                        value={`${Number(displayOrder.distance ?? 0).toFixed(1)} miles`}
                      />
                    )}
                  </div>
                </div>

                {/* Additional Services */}
                {(displayOrder.flight_track || displayOrder.meet_greet || displayOrder.flight) && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Services</h3>
                    <div className="flex flex-wrap gap-3">
                      {displayOrder.flight && <ServiceBadge label="Flight" value={displayOrder.flight} />}
                      {displayOrder.flight_track && <ServiceBadge label="Flight Tracking" value="£7" premium />}
                      {displayOrder.meet_greet && <ServiceBadge label="Meet & Greet" value="£15" premium />}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Price Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Price Summary
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <PriceRow label="Base Fare" amount={`£${(Number.parseFloat(displayOrder.price) || 0).toFixed(2)}`} />

                  {displayOrder.flight_track && (
                    <PriceRow label="Flight Tracking" amount="£7.00" description="Real-time flight monitoring" />
                  )}

                  {displayOrder.meet_greet && (
                    <PriceRow label="Meet & Greet" amount="£15.00" description="Personal meet service" />
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <PriceRow
                      label="Total Amount"
                      amount={`£${(Number.parseFloat(displayOrder.price) || 0).toFixed(2)}`}
                      bold
                      highlight
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div
                      className={`w-3 h-3 rounded-full ${displayOrder?.payment_method === "online" ? "bg-green-500" : "bg-[#F4910B]"}`}
                    ></div>
                    <p className="text-gray-700 font-medium">
                      {displayOrder?.payment_method === "online" ? "Paid Online" : "Cash on Delivery"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="mt-6 bg-gradient-to-br from-[#F4910B] to-[#e8830a] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Need Assistance?</h3>
              <p className="text-white/90 text-sm mb-4">Driver details will be sent 2 hours before pickup</p>
              <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg font-medium">
                <Phone className="w-4 h-4" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailCard({
  icon,
  title,
  value,
  accent = false,
}: {
  icon: React.ReactNode
  title: string
  value: string
  accent?: boolean
}) {
  return (
    <div
      className={`p-4 rounded-xl border-2 transition-all ${
        accent ? "border-[#F4910B]/20 bg-[#F4910B]/5" : "border-gray-100 bg-gray-50/50"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`font-semibold truncate ${accent ? "text-gray-900" : "text-gray-800"}`}>{value}</p>
        </div>
      </div>
    </div>
  )
}

function ServiceBadge({
  label,
  value,
  premium = false,
}: {
  label: string
  value: string
  premium?: boolean
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
        premium
          ? "bg-[#F4910B]/10 text-[#F4910B] border border-[#F4910B]/20"
          : "bg-gray-100 text-gray-700 border border-gray-200"
      }`}
    >
      <span>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  )
}

function PriceRow({
  label,
  amount,
  description,
  bold = false,
  highlight = false,
}: {
  label: string
  amount: string
  description?: string
  bold?: boolean
  highlight?: boolean
}) {
  return (
    <div className={`${highlight ? "bg-[#F4910B]/5 -mx-2 px-2 py-3 rounded-lg" : ""}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className={`${bold ? "text-gray-900 font-bold text-lg" : "text-gray-700 font-medium"}`}>{label}</p>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
        <p
          className={`${
            bold
              ? "text-gray-900 font-bold text-xl"
              : highlight
                ? "text-[#F4910B] font-bold text-lg"
                : "text-gray-800 font-semibold"
          }`}
        >
          {amount}
        </p>
      </div>
    </div>
  )
}
