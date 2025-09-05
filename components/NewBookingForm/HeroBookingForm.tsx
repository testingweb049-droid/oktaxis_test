"use client"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { User, ShoppingBag, Minus, Plus, MapPin, X } from "lucide-react"
import { SlLocationPin } from "react-icons/sl"
import { MdMoreTime } from "react-icons/md"
import { toast } from "@/hooks/use-toast"
import { usePathname } from "next/navigation"
import { Autocomplete, type Libraries, useLoadScript } from "@react-google-maps/api"
import useCustomForm from "@/hooks/useFormContext"
import DateTimePicker from "@/components/ui/date-time-picker"

const libraries: Libraries = ["places"]

function HeroSectionBookingForm() {
  const pathname = usePathname()
  const isHourlyOnlyPage = pathname?.includes("event-weddings") || pathname?.includes("chauffeur-services")
  const { form, NextStep, category, setCategory, loading, Step1, resetForm } = useCustomForm()
  const {
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    trigger,
  } = form

  // Additional state for counters
  const [travelers, setTravelers] = useState(1)
  const [bags, setBags] = useState(1)

  const stopsRefs = useRef<(google.maps.places.Autocomplete | null)[]>([])

  const stopsCount = watch("stops") || 0
  const stop1 = watch("stop_1") || ""
  const stop2 = watch("stop_2") || ""
  const stop3 = watch("stop_3") || ""

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

  const addStop = () => {
    if (stopsCount < 3) {
      setValue("stops", stopsCount + 1)
    }
  }

  const removeStop = () => {
    if (stopsCount > 0) {
      // Clear the last stop's data
      if (stopsCount === 3) {
        setValue("stop_3", "")
        setValue("stop_3_lag_alt", "")
      } else if (stopsCount === 2) {
        setValue("stop_2", "")
        setValue("stop_2_lag_alt", "")
      } else if (stopsCount === 1) {
        setValue("stop_1", "")
        setValue("stop_1_lag_alt", "")
      }
      setValue("stops", stopsCount - 1)
    }
  }

  const updateStop = (index: number, value: string, coords: string) => {
    if (index === 0) {
      setValue("stop_1", value)
      setValue("stop_1_lag_alt", coords)
    } else if (index === 1) {
      setValue("stop_2", value)
      setValue("stop_2_lag_alt", coords)
    } else if (index === 2) {
      setValue("stop_3", value)
      setValue("stop_3_lag_alt", coords)
    }
  }

  const getStopValue = (index: number) => {
    if (index === 0) return stop1
    if (index === 1) return stop2
    if (index === 2) return stop3
    return ""
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

  const StopsSection = () => {
    const stopColors = [
      { bg: "lg:bg-blue-500", border: "lg:border-blue-500", text: "lg:text-blue-600", bgLight: "lg:bg-blue-50" },
      { bg: "lg:bg-green-500", border: "lg:border-green-500", text: "lg:text-green-600", bgLight: "lg:bg-green-50" },
      { bg: "lg:bg-purple-500", border: "lg:border-purple-500", text: "lg:text-purple-600", bgLight: "lg:bg-purple-50" },
    ]

    return (
      <div className="space-y-3 md:space-y-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center  items-end justify-end sm:justify-between gap-3 max-lg:hidden">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2 max-lg:hidden">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#F4910B]" />
            Additional Stops
          </h3>
          {stopsCount < 3 && (
            <button
              type="button"
              onClick={addStop}
              className="px-2 py-1 md:px-4 md:py-2 bg-[#F4910B] hover:bg-[#e8840a] text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 text-sm md:text-base max-lg:hidden"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              <span className="max-lg:hidden">Add Stop</span>
            </button>
          )}
        </div>

        {stopsCount > 0 &&  (
          <div className="space-y-3 md:space-y-4">
            {Array.from({ length: stopsCount }, (_, index) => {
              const color = stopColors[index]
              const stopValue = getStopValue(index)

              return (
                <div
                  key={index}
                  className={`relative p-0 md:p-4 rounded-xl lg:border-2 ${color.border} ${color.bgLight} transition-all duration-300 hover:shadow-md`}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div
                      className={`w-6 h-6 md:w-8 md:h-8 max-lg:hidden  text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm shadow-md flex-shrink-0`}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      {!isLoaded ? (
                        <div className="text-center text-sm">Loading...</div>
                      ) : (
                        <Autocomplete
                          options={{ componentRestrictions: { country: "uk" } }}
                          onLoad={(autocomplete) => {
                            stopsRefs.current[index] = autocomplete
                          }}
                          onPlaceChanged={() => {
                            const autocomplete = stopsRefs.current[index]
                            if (autocomplete) {
                              const place = autocomplete.getPlace()
                              if (place.formatted_address && place.geometry?.location) {
                                const coords = `${place.geometry.location.lat()},${place.geometry?.location.lng()}`
                                updateStop(index, place.formatted_address, coords)
                              }
                            }
                          }}
                        >
                          <div className="relative">
                            <SlLocationPin className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 md:w-4 md:h-4" />
                            <input
                              value={stopValue}
                              onChange={(e) => updateStop(index, e.target.value, "")}
                              placeholder={`Enter stop ${index + 1} location`}
                              className="w-full pl-7 md:pl-10 pr-2 md:pr-3 py-2 md:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4910B] focus:border-transparent text-black text-sm md:text-base bg-white"
                            />
                          </div>
                        </Autocomplete>
                      )}
                    </div>

                    {index === stopsCount - 1 && (
                      <button
                        type="button"
                        onClick={removeStop}
                        className="w-6 h-6 md:w-8 md:h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110 flex-shrink-0"
                      >
                        <X className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    )}
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-2 md:mt-3 flex items-center gap-1 max-lg:hidden">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-0.5 md:h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= index ? color.bg : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Journey visualization */}
            {/* <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 md:p-4 rounded-xl border border-gray-200">
              <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Your Journey</h4>
              <div className="flex items-center gap-1 md:gap-2 text-xs text-gray-600 overflow-x-auto">
                <div className="flex items-center gap-1 flex-shrink-0">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-[#F4910B] rounded-full"></div>
                  <span className="text-xs">Pickup</span>
                </div>
                {Array.from({ length: stopsCount }, (_, index) => (
                  <div key={index} className="flex items-center gap-1 flex-shrink-0">
                    <div className="w-3 h-0.5 md:w-4 md:h-0.5 bg-gray-300"></div>
                    <div className={`w-2 h-2 md:w-3 md:h-3 ${stopColors[index].bg} rounded-full`}></div>
                    <span className="text-xs">Stop {index + 1}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <div className="w-3 h-0.5 md:w-4 md:h-0.5 bg-gray-300"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-gray-600 rounded-full"></div>
                  <span className="text-xs">Dropoff</span>
                </div>
              </div>
            </div> */}
          </div>
        )}
         
        
          {stopsCount < 3 && (
            <div className="flex flex-col sm:flex-row sm:items-center  items-end justify-end sm:justify-between gap-3 lg:hidden">
            <button
              type="button"
              onClick={addStop}
              className="px-2 py-1 md:px-4 md:py-2 bg-[#F4910B] hover:bg-[#e8840a] text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 text-sm md:text-base"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              <span className="max-lg:hidden">Add Stop</span>
            </button>
            </div>
          )}
        
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Tab Buttons */}
      <div className="flex gap-4 mb-3 lg:mb-6">
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
      <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-2xl border border-gray-100 ring-1 ring-black/5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 lg:space-y-6">
            {/* Location and Date/Time Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-6">
              <FormField
                control={form.control}
                name="pickup_location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <label className="block text-gray-700 font-medium mb-1 lg:mb-2 max-lg:text-base">Pickup Location</label>
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
                          <SlLocationPin className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 lg:w-5 lg:h-5 w-4 h-4" />
                          <input
                            value={fromLocation}
                            onChange={(e) => {
                              const value = e.target.value
                              setFromLocation(value)
                              form.setValue("pickup_location", value)
                            }}
                            disabled={loading}
                            placeholder="Enter pickup location"
                            className="w-full pl-7 lg:pl-10 pr-3 py-2 lg:py-3 border border-gray-200  text-sm lg:text-[16px] rounded-xl focus:outline-none text-black "
                          />
                        </div>
                      </Autocomplete>
                    )}
                    {form.formState.errors.pickup_location && (
                      <p className="text-red-500 text-base mt-1">
                        {form.formState.errors.pickup_location.message?.toString()}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            
            {category === "trips" && (
              <div className=" flex lg:hidden w-full">
                <StopsSection />
              </div>
            )}

              {/* Drop off Location */}
              {category === "trips" && (
                <FormField
                  control={form.control}
                  name="dropoff_location"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-gray-700 font-medium mb-1 lg:mb-2 max-lg:text-base">Drop off Location</label>
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
                            <SlLocationPin className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 lg:w-5 lg:h-5 w-4 h-4" />
                            <input
                              value={toLocation}
                              onChange={(e) => {
                                const value = e.target.value
                                setToLocation(value)
                                form.setValue("dropoff_location", value)
                              }}
                              disabled={loading}
                              placeholder="Enter drop off location"
                              className="w-full pl-7 lg:pl-10 pr-3 py-2 lg:py-3 border border-gray-200  text-sm lg:text-[16px] rounded-xl focus:outline-none text-black"
                            />
                          </div>
                        </Autocomplete>
                      )}
                      {form.formState.errors.dropoff_location && (
                        <p className="text-red-500 text-base mt-1">
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
                                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none text-black text-base"
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
                        <p className="text-red-500 text-base mt-1">
                          {form.formState.errors.duration.message?.toString()}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              )}

              <div className="hidden md:block mt-3">
                <DateTimePicker
                  label="Date & Time"
                  selectedDate={form.watch("pickup_date") ?? null}
                  selectedTime={form.watch("pickup_time")}
                  setValue={(field, value) => setValue(field as any, value)}
                  dateFieldName="pickup_date"
                  timeFieldName="pickup_time"
                  minSelectableDate={new Date()}
                />
                {form.formState.errors.pickup_date && (
                  <p className="text-red-500 text-base mt-1">{form.formState.errors.pickup_date.message?.toString()}</p>
                )}
              </div>
            </div>

            {category === "trips" && (
              <div className="border-t border-gray-200 pt-6 hidden lg:flex w-full ">
                <StopsSection />
              </div>
            )}

            {/* Counter Fields */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Number of Travelers */}
              <div className="flex flex-col gap-1 w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg text-black text-base">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="text-brand w-5 h-5" />
                    <span className="text-gray-700 text-base font-medium">Travelers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-base font-semibold text-gray-900 min-w-[1.5rem] text-center">
                      {travelers}
                    </span>
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
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.passengers.message?.toString()}</p>
                )}
              </div>

              {/* Number of Bags */}
              <div className="flex flex-col gap-1 w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg text-black text-base">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="text-brand w-5 h-5" />
                    <span className="text-gray-700 text-base font-medium">Bags</span>
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
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.bags.message?.toString()}</p>
                )}
              </div>
            </div>

            {/* Book Now Button */}
            <button
              type="button"
              onClick={() => {
                const normalize = (text: string) => text?.toLowerCase().replace(/\s+/g, "").replace(/,/g, "")
                if (category === "trips") {
                  const pickupLocation = form.getValues("pickup_location")
                  const dropoffLocation = form.getValues("dropoff_location")
                  if (pickupLocation && dropoffLocation && normalize(pickupLocation) === normalize(dropoffLocation)) {
                    toast({
                      title: "Invalid Locations",
                      description: "Pickup and dropoff location cannot be the same.",
                      variant: "destructive",
                    })
                    return
                  }
                }
                const isMobile = typeof window !== "undefined" && window.innerWidth < 768
                if (!isMobile) {
                  const pickupDate = form.getValues("pickup_date")
                  const pickupTime = form.getValues("pickup_time")
                  if (!pickupDate || !pickupTime) {
                    toast({
                      title: "Missing Date or Time",
                      description: "Please select both pickup date and time.",
                      variant: "destructive",
                    })
                    return
                  }
                  const pickupDateTime = new Date(
                    pickupDate.getFullYear(),
                    pickupDate.getMonth(),
                    pickupDate.getDate(),
                    pickupTime.hour,
                    pickupTime.minute,
                  )
                  const now = new Date()
                  const eightHoursLater = new Date(now.getTime() + 8 * 60 * 60 * 1000)
                  if (pickupDateTime < eightHoursLater) {
                    toast({
                      title: "Booking Too Soon",
                      description: "Please choose a pickup time at least 8 hours from now.",
                      variant: "destructive",
                    })
                    return
                  }
                }
                if (category === "hourly" && !form.getValues("duration")) {
                  toast({
                    title: "Missing Duration",
                    description: "Please select a duration for your hourly booking.",
                    variant: "destructive",
                  })
                  setDurationOpen(true)
                  return
                }
                NextStep()
              }}
              disabled={loading}
              className="w-full bg-black text-white py-3 px-6 rounded-xl font-semibold text-base hover:bg-gray-900 transition-colors md:py-4 md:px-8 md:text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <span>Loading...</span>
                </>
              ) : (
                "Book Now"
              )}
            </button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default HeroSectionBookingForm
