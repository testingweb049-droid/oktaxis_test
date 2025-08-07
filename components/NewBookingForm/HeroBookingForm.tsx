"use client"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
// calendar imports
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarDays, TimerIcon, User, ShoppingBag, Minus, Plus } from "lucide-react"
import { SlLocationPin } from "react-icons/sl"
import { MdMoreTime } from "react-icons/md"
import { toast } from "@/components/ui/use-toast"
import { usePathname } from "next/navigation"
// import type { google } from "googlemaps"

function formatTime12(hour: number, minute: number): string {
  const hour12 = ((hour + 11) % 12) + 1
  const minuteStr = minute.toString().padStart(2, "0")
  const amPm = hour >= 12 ? "PM" : "AM"
  return `${hour12}:${minuteStr} ${amPm}`
}


// maps
import { Autocomplete, type Libraries, useLoadScript } from "@react-google-maps/api"
import useCustomFoorm from "@/hooks/useFormContext"
import { isBeforeNewJerseyToday } from "@/lib/isBeforeTime"
import useCustomForm from "@/hooks/useFormContext"

const libraries: Libraries = ["places"]

function HeroSectionBookingForm() {

  const pathname = usePathname()
  const isHourlyOnlyPage = pathname?.includes("event-weddings") || pathname?.includes("chauffeur-services")

  const [dateOpen, setDateOpen] = useState(false)
  const { form, NextStep, category, setCategory, loading, Step1, resetForm } = useCustomForm()

  // Additional state for counters
  const [travelers, setTravelers] = useState(1)
  const [bags, setBags] = useState(1)

  useEffect(() => {
    if (isHourlyOnlyPage && category !== "hourly") {
      setCategory("hourly")
    }
  }, [isHourlyOnlyPage])

  const [durationOpen, setDurationOpen] = useState(false)
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyDaQ998z9_uXU7HJE5dolsDqeO8ubGZvDU",
    libraries,
  })

  const fromRef = useRef<google.maps.places.Autocomplete | null>(null)
  const toRef = useRef<google.maps.places.Autocomplete | null>(null)

  function onSubmit() {
    NextStep()
  }

  useEffect(() => {
    Step1()
    if (isHourlyOnlyPage) {
      setCategory("hourly")
    }
    const from = form.getValues("pickup_location")
    const to = form.getValues("dropoff_location")
    if (from) setFromLocation(from)
    if (to) setToLocation(to)
  }, [pathname])
  const pickupTime = form.watch("pickup_time")
  const togglePeriod = (period: "AM" | "PM") => {
    const current = pickupTime || { hour: 12, minute: 0 }
    let hour = current.hour
    if (period === "AM" && hour >= 12) hour -= 12
    if (period === "PM" && hour < 12) hour += 12
    form.setValue("pickup_time", { ...current, hour })
  }

  const updateHour = (delta: number) => {
    const current = pickupTime || { hour: 12, minute: 0 }
    let hour12 = ((current.hour + 11) % 12) + 1
    hour12 = ((hour12 - 1 + delta + 12) % 12) + 1
    const isPM = current.hour >= 12
    let adjustedHour = isPM ? hour12 === 12 ? 12 : hour12 + 12 : hour12 % 12
    form.setValue("pickup_time", { ...current, hour: adjustedHour })
  }

  const updateMinute = (delta: number) => {
    const current = pickupTime || { hour: 12, minute: 0 }
    let newMinute = current.minute + delta * 5
    if (newMinute >= 60) newMinute = 0
    if (newMinute < 0) newMinute = 55
    form.setValue("pickup_time", { ...current, minute: newMinute })
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Tab Buttons */}      <div className="flex gap-4 mb-6">
        {!isHourlyOnlyPage && (
          <button
            onClick={() => {
              if (category !== "trips") {
                setCategory("trips")
                resetForm()
                setFromLocation("")
                setToLocation("")
              }
            }}
            className={cn(
              "px-8 py-3 rounded-full font-semibold transition-colors",
              category === "trips" ? "bg-brand text-white" : "bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            Trip
          </button>
        )}
        <button
          onClick={() => {
            if (category !== "hourly") {
              setCategory("hourly")
              resetForm()
              setFromLocation("")
              setToLocation("")
            }
          }}
          className={cn(
            "px-8 py-3 rounded-full font-semibold transition-colors",
            category === "hourly" ? "bg-brand text-white" : "bg-white text-gray-700 hover:bg-gray-50",
          )}
        >
          Hourly
        </button>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 ring-1 ring-black/5">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Location and Date/Time Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="pickup_location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <label className="block text-gray-700 font-medium mb-2">Pickup Location</label>
                    {!isLoaded ? (
                      <div className="text-center w-full">Loading...</div>
                    ) : (
                      <Autocomplete
                        options={{ componentRestrictions: { country: "uk" } }}
                        onLoad={(autocomplete) => (fromRef.current = autocomplete)}
                        onPlaceChanged={() => {
                          form.clearErrors("pickup_location")
                          if (fromRef.current) {
                            const place = fromRef.current.getPlace()
                            if (place.formatted_address && place.geometry?.location) {
                              const latlng = place.geometry.location.lat() + "," + place.geometry.location.lng()
                              form.setValue("pickup_location_lag_alt", latlng)
                              field.onChange(place.formatted_address)
                              setFromLocation(place.formatted_address)
                            }
                          }
                        }}
                      >
                        <div className="relative">
                          <SlLocationPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            value={fromLocation}
                            onChange={(e) => {
                              const value = e.target.value
                              setFromLocation(value)
                              form.setValue("pickup_location", value)
                            }}
                            disabled={loading}
                            placeholder="Enter pickup location"
                            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none text-black text-sm"
                          />
                        </div>
                      </Autocomplete>
                    )}
                    {/* ADD THIS: Error message */}
                    {form.formState.errors.pickup_location && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.pickup_location.message?.toString()}
                      </p>
                    )}
                  </FormItem>
                )}
              />


              {/* Drop off Location */}
              {category === "trips" && (
                <FormField
                  control={form.control}
                  name="dropoff_location"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-gray-700 font-medium mb-1">Drop off Location</label>
                      {!isLoaded ? (
                        <div className="text-center w-full">Loading...</div>
                      ) : (
                        <Autocomplete
                          options={{
                            componentRestrictions: { country: "uk" },
                          }}
                          onLoad={(autocomplete) => (toRef.current = autocomplete)}
                          onPlaceChanged={() => {
                            form.clearErrors("dropoff_location")
                            if (toRef.current) {
                              const place = toRef.current.getPlace()
                              if (place.formatted_address && place?.geometry?.location) {
                                const origin = place?.geometry?.location
                                const toLatlng = origin.lat() + "," + origin.lng()
                                form.setValue("dropoff_location_lag_alt", toLatlng)
                                field.onChange(place.formatted_address)
                                setToLocation(place.formatted_address)
                              }
                            }
                          }}
                        >
                          <div className="relative">
                            <SlLocationPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              value={toLocation}
                              onChange={(e) => {
                                const value = e.target.value
                                setToLocation(value)
                                form.setValue("dropoff_location", value)
                              }}
                              disabled={loading}
                              placeholder="Enter drop off location"
                              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none text-black text-sm"
                            />
                          </div>
                        </Autocomplete>
                      )}
                      {form.formState.errors.dropoff_location && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.dropoff_location.message?.toString()}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              )}

              {/* Duration for Hourly */}
              {category === "hourly" && (
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-gray-700 font-medium mb-1">Duration</label>
                      <Popover open={durationOpen} onOpenChange={setDurationOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <div className="relative">
                              <MdMoreTime className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                value={field.value ? `${field.value} Hour` : ""}
                                placeholder="Select duration"
                                readOnly
                                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none text-black text-sm"
                              />
                            </div>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-60 p-0 bg-white relative z-[200]" align="start">
                          <div className="w-full min-w-60 flex divide-y shadow-xl bg-white border border-gray-300 max-h-60 flex-col overflow-y-scroll duration-300 transition-all">
                            {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((item) => (
                              <div
                                key={item}
                                onClick={() => {
                                  field.onChange(item)
                                  setDurationOpen(false)
                                }}
                                className={cn(
                                  "w-full p-2 cursor-pointer hover:bg-gray-50",
                                  item === field.value ? "bg-blue-500 text-white" : "bg-white text-black",
                                )}
                              >
                                {item} Hour
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                      {form.formState.errors.duration && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.duration.message?.toString()}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              )}
              <div className="hidden md:block">
                <FormField
                  control={form.control}
                  name="pickup_date"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-gray-700 font-medium mb-1">Date & Time</label>
                      <Popover open={dateOpen} onOpenChange={setDateOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <div className="relative">
                              <CalendarDays className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                value={
                                  field.value && pickupTime
                                    ? `${format(field.value, "PPP")} at ${formatTime12(pickupTime.hour || 0, pickupTime.minute || 0)}`
                                    : ""
                                }
                                placeholder="Select date"
                                readOnly
                                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none text-black text-sm"
                              />

                            </div>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0 bg-white relative z-[200]" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ?? undefined} // 👈 This removes 'null'
                            onSelect={(date) => {
                              form.clearErrors("pickup_date")
                              field.onChange(date)
                              form.resetField("pickup_time")
                            }}
                            disabled={(date) => isBeforeNewJerseyToday(date)}
                            initialFocus
                          />


                          {field.value && (
                            <div className="mt-4 border-t pt-4 px-2">
                              <p className="text-sm font-semibold mb-2">Select Time</p>

                              <div className="grid grid-cols-2 gap-2 mb-4">
                                <div>
                                  <label className="text-xs font-medium">Hour</label>
                                  <input
                                    type="number"
                                    min={0}
                                    max={23}
                                    value={form.getValues("pickup_time")?.hour ?? 0}
                                    onChange={(e) => {
                                      const hour = parseInt(e.target.value)
                                      const currentTime = form.getValues("pickup_time") || { hour: 0, minute: 0 }
                                      form.setValue("pickup_time", {
                                        ...currentTime,
                                        hour: isNaN(hour) ? 0 : hour,
                                      })
                                    }}
                                    className="w-full border rounded px-2 py-1"
                                  />

                                </div>

                                <div>
                                  <label className="text-xs font-medium">Minute</label>
                                  <input
                                    type="number"
                                    min={0}
                                    max={59}
                                    step={5} // optional for up/down arrows
                                    value={form.getValues("pickup_time")?.minute ?? 0}
                                    onChange={(e) => {
                                      let minute = parseInt(e.target.value)
                                      // Snap to nearest 5-minute mark
                                      minute = Math.round(minute / 5) * 5
                                      if (minute >= 60) minute = 55
                                      if (minute < 0) minute = 0
                                      const currentTime = form.getValues("pickup_time") || { hour: 12, minute: 0 }
                                      form.setValue("pickup_time", {
                                        ...currentTime,
                                        minute: isNaN(minute) ? 0 : minute,
                                      })
                                    }}
                                    className="w-full border rounded px-2 py-1"
                                  />

                                </div>
                              </div>

                              <div className="flex justify-between">
                                {["AM", "PM"].map((period) => {
                                  const currentHour = form.getValues("pickup_time")?.hour ?? 12
                                  const isPM = currentHour >= 12
                                  const isActive = (period === "PM" && isPM) || (period === "AM" && !isPM)
                                  return (
                                    <button
                                      type="button"
                                      key={period}
                                      className={cn(
                                        "w-[48%] py-1 rounded-full text-sm font-semibold",
                                        isActive ? "bg-blue-500 text-white" : "border border-gray-400 text-gray-700"
                                      )}
                                      onClick={() => {
                                        const time = form.getValues("pickup_time") || { hour: 12, minute: 0 }
                                        let newHour = time.hour
                                        if (period === "AM" && newHour >= 12) newHour -= 12
                                        if (period === "PM" && newHour < 12) newHour += 12
                                        form.setValue("pickup_time", { ...time, hour: newHour })
                                      }}
                                    >
                                      {period}
                                    </button>
                                  )
                                })}
                              </div>

                              <button
                                type="button"
                                onClick={() => setDateOpen(false)}
                                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-full font-bold"
                              >
                                DONE
                              </button>
                            </div>
                          )}
                        </PopoverContent>
                      </Popover>
                      {form.formState.errors.pickup_date && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.pickup_date.message?.toString()}
                        </p>
                      )}
                    </FormItem>
                  )}
                />




              </div>



            </div>

            {/* Counter Fields */}
            {/* Counter Fields */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Number of Travelers */}
              <div className="flex flex-col gap-1 w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg text-black text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="text-brand w-5 h-5" />
                    <span className="text-gray-700 text-sm font-medium">Travelers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-base font-semibold text-gray-900 min-w-[1.5rem] text-center">{travelers}</span>
                    <button
                      type="button"
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                {form.formState.errors.passengers && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.passengers.message?.toString()}
                  </p>
                )}
              </div>

              {/* Number of Bags */}
              <div className="flex flex-col gap-1 w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg text-black text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="text-brand w-5 h-5" />
                    <span className="text-gray-700 text-sm font-medium">Bags</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBags(Math.max(1, bags - 1))}
                      className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-base font-semibold text-gray-900 min-w-[1.5rem] text-center">{bags}</span>
                    <button
                      type="button"
                      onClick={() => setBags(bags + 1)}
                      className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                {form.formState.errors.bags && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.bags.message?.toString()}
                  </p>
                )}
              </div>
            </div>



            {/* Book Now Button */}
            <button
              type="button"
              onClick={() => {
                const normalize = (text: string) =>
                  text?.toLowerCase().replace(/\s+/g, "").replace(/,/g, "");
                if (category === "trips") {
                  const pickupLocation = form.getValues("pickup_location");
                  const dropoffLocation = form.getValues("dropoff_location");

                  // Normalize and compare
                  if (
                    pickupLocation &&
                    dropoffLocation &&
                    pickupLocation.trim().toLowerCase() === dropoffLocation.trim().toLowerCase()
                  ) {
                    toast({
                      title: "Invalid Locations",
                      description: "Pickup and dropoff location cannot be the same.",
                      variant: "destructive",
                    });
                    return;
                  }
                }
                const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

                if (!isMobile) {
                  const pickupDate = form.getValues("pickup_date");
                  const pickupTime = form.getValues("pickup_time");

                  if (!pickupDate) {
                    toast({
                      title: "Missing Time",
                      description: "Please select both pickup date and time.",
                      variant: "destructive",
                    });
                    return;
                  }

                  const pickupDateTime = new Date(
                    pickupDate.getFullYear(),
                    pickupDate.getMonth(),
                    pickupDate.getDate(),

                    0,
                    0
                  );

                  const now = new Date();
                  const eightHoursLater = new Date(now.getTime() + 8 * 60 * 60 * 1000);

                  if (pickupDateTime < eightHoursLater) {
                    toast({
                      title: "Booking Too Soon",
                      description: "Please choose a pickup time at least 8 hours from now.",
                      variant: "destructive",
                    });
                    return;
                  }
                }


                if (category === "hourly" && !form.getValues("duration")) {
                  toast({
                    title: "Missing Duration",
                    description: "Please select a duration for your hourly booking.",
                    variant: "destructive",
                  });
                  setDurationOpen(true);
                  return;
                }

                NextStep();

              }}
              className="
    w-full
    bg-black 
    text-white 
    py-3 
    px-6 
    rounded-xl 
    font-semibold 
    text-base 
    hover:bg-gray-900 
    transition-colors
    md:py-4 
    md:px-8 
    md:text-lg
    flex
    items-center
    justify-center
    "
            >
              {loading ? "Loading..." : "Book Now"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default HeroSectionBookingForm
