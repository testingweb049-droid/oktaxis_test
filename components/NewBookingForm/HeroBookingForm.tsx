"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
// calander imports
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarDays, TimerIcon } from "lucide-react";
import { SlLocationPin } from "react-icons/sl";
import { MdMoreTime } from "react-icons/md";
import { toast } from "@/components/ui/use-toast";

function formatTime12(hour: number, minute: number): string {
  const hour12 = ((hour + 11) % 12) + 1;
  const minuteStr = minute.toString().padStart(2, '0');
  const amPm = hour >= 12 ? 'PM' : 'AM';
  return `${hour12}:${minuteStr} ${amPm}`;
}

// calander end

// maps
import { Autocomplete, Libraries, useLoadScript } from "@react-google-maps/api";

// import { createOrder } from '@/actions/add-order'
import useCustomForm from "@/hooks/useFormContext";
import {
  getNewJerseyDate,
  getNewJerseyHour,
  isBeforeNewJerseyToday,
} from "@/lib/isBeforeTime";


const libraries: Libraries = ["places"];

function HeroSectionBookingForm() {
  const [dateOpen, setDateOpen] = useState(false);
  const { form, category, setCategory, NextStep, loading, Step1, resetForm } =
    useCustomForm();
  const [durationOpen, setDurationOpen] = useState(false);

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [showSameLocationModal, setShowSameLocationModal] = useState(false);

  console.log("durationOpen ", durationOpen);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      "AIzaSyDaQ998z9_uXU7HJE5dolsDqeO8ubGZvDU",
    libraries,
  });
  const fromRef = useRef<google.maps.places.Autocomplete | null>(null);
  const toRef = useRef<google.maps.places.Autocomplete | null>(null);
  function onSubmit() {
    NextStep();
  }

  useEffect(() => {
    Step1();

    const from = form.getValues("pickup_location");
    const to = form.getValues("dropoff_location");
    if (from) {
      setFromLocation(from);
    }
    if (to) {
      setToLocation(to);
    }
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full   mx-auto text-black">
      <div className="flex items-center gap-5">
        <div
          onClick={() => {
            if (category !== "trips") {
              setCategory("trips");
              resetForm();
              setFromLocation("");
              setToLocation("");
            }
          }}
          className={cn(
            "px-4 w-28 cursor-pointer py-2 font-semibold rounded-3xl  text-center  ",
            category === "trips"
              ? " bg-brand text-black "
              : " text-white border border-white   "
          )}
        >
          Trip
        </div>
        <div
          onClick={() => {
            if (category !== "hourly") {
              setCategory("hourly");
              resetForm();
              setFromLocation("");
              setToLocation("");
            }
          }}
          className={cn(
            "px-4 w-28 py-2 cursor-pointer font-semibold rounded-3xl text-center   ",
            category === "hourly"
              ? " bg-[#F0A857] text-black "
              : " text-white border border-white  "
          )}
        >
          Hourly
        </div>
      </div>

      <div className="w-full flex gap-2 bg-white rounded-2xl lg:rounded-full p-3 sm:p-2 overflow-hidden">

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid lg:grid-cols-5 bg-white  max-lg:divide-y lg:divide-x w-full "
          >
            {/* step 1 */}

            <FormField
              control={form.control}
              name="pickup_location"
              render={({ field, formState: { errors } }) => (
                <FormItem className="w-full rounded-full px-2 py-4 lg:py-2  ">
                  {!isLoaded ? (
                    <div className="text-center rounded-sm  w-full">
                      Loading...
                    </div>
                  ) : (
                    <Autocomplete
                      options={{
                        componentRestrictions: { country: "uk" },
                      }}
                      onLoad={(autocomplete) =>
                        (fromRef.current = autocomplete)
                      }
                      onPlaceChanged={() => {
                        form.formState.errors.pickup_location = undefined;
                        if (fromRef.current) {
                          const place = fromRef.current.getPlace();
                          if (
                            place.formatted_address &&
                            place?.geometry?.location
                          ) {
                            const origin = place?.geometry?.location;
                            const fromLatlng =
                              origin.lat() + "," + origin.lng();
                            form.setValue(
                              "pickup_location_lag_alt",
                              fromLatlng
                            );
                            field.onChange(place.formatted_address);
                            setFromLocation(place.formatted_address);
                          }
                          console.log("place :: ", place);
                        }
                      }}
                      className="border-none rounded-full w-full "
                    >
                      <div className="flex items-center gap-2">
                        <SlLocationPin className="size-5" />

                        <div className="flex flex-col gap-1 w-full">
                          <p
                            className={cn(
                              "text-xs  text-start",
                              errors.pickup_location
                                ? "text-red-500"
                                : "text-black"
                            )}
                          >
                            Pickup Location
                          </p>
                          <input
                            value={fromLocation}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFromLocation(value);
                              form.setValue("pickup_location", value); // 🔧 keeps form state updated
                            }}

                            disabled={loading}
                            placeholder="Pickup Location"
                            className="w-full focus:outline-none text-sm  text-black "
                          />
                        </div>
                      </div>
                    </Autocomplete>
                  )}
                </FormItem>
              )}
            />

            {category === "trips" && (
              <FormField
                control={form.control}
                name="dropoff_location"
                render={({ field, formState: { errors } }) => (
                  <FormItem className="w-full px-2 py-4 lg:py-2 ">
                    {!isLoaded ? (
                      <div className="text-center rounded-sm  w-full">
                        Loading...
                      </div>
                    ) : (
                      <Autocomplete
                        options={{
                          componentRestrictions: { country: "uk" },
                        }}
                        onLoad={(autocomplete) =>
                          (toRef.current = autocomplete)
                        }
                        onPlaceChanged={() => {
                          form.formState.errors.dropoff_location = undefined;
                          if (toRef.current) {
                            const place = toRef.current.getPlace();
                            if (
                              place.formatted_address &&
                              place?.geometry?.location
                            ) {
                              const origin = place?.geometry?.location;
                              const toLatlng =
                                origin.lat() + "," + origin.lng();
                              form.setValue(
                                "dropoff_location_lag_alt",
                                toLatlng
                              );
                              field.onChange(place.formatted_address);
                              setToLocation(place.formatted_address);
                            }
                            console.log("place :: ", place);
                          }
                        }}
                        className="border-none "
                      >
                        <div className="flex items-center gap-2">
                          <SlLocationPin className="size-5" />

                          <div className="flex flex-col gap-1 w-full ">
                            <p
                              className={cn(
                                "text-xs  text-start",
                                errors.dropoff_location
                                  ? "text-red-500"
                                  : "text-black"
                              )}
                            >
                              Drop off Location
                            </p>
                            <input
                              value={toLocation}
                              disabled={loading}
                              onChange={(e) => {
                                const value = e.target.value;
                                setToLocation(value);
                                form.setValue("dropoff_location", value); // 🔧
                              }}

                              placeholder="Drop off Location"
                              className="w-full focus:outline-none text-sm  text-black"
                            />
                          </div>
                        </div>
                      </Autocomplete>
                    )}
                  </FormItem>
                )}
              />
            )}

            {category !== "trips" && (
              <FormField
                control={form.control}
                name="duration"
                render={({ field, formState: { errors } }) => (
                  <FormItem className="w-full h-full ">
                    <Popover open={durationOpen} onOpenChange={setDurationOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div
                            className={cn(
                              "w-full flex h-full items-center gap-2 justify-start border-none  px-2 py-4 lg:py-2 "
                            )}
                          >
                            <MdMoreTime className="size-5" />

                            <div className="flex flex-col gap-1 ">
                              <p
                                className={cn(
                                  "text-xs  text-start",
                                  errors.duration
                                    ? "text-red-500"
                                    : "text-black"
                                )}
                              >
                                Duration
                              </p>
                              {field.value ? (
                                <p className="text-sm  text-black">
                                  {field.value} Hour
                                </p>
                              ) : (
                                <p className="text-sm  text-gray-400">
                                  Select duration
                                </p>
                              )}
                            </div>
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-full min-w-60 p-0 bg-white relative z-[200]"
                        align="start"
                      >
                        <div
                          className={cn(
                            "w-full min-w-60   flex divide-y shadow-xl bg-white border border-gray-300 max-h-60 flex-col overflow-y-scroll duration-300 transition-all"
                          )}
                        >
                          {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(
                            (item) => {
                              return (
                                <div
                                  key={item}
                                  onClick={() => {
                                    field.onChange(item);
                                    setDurationOpen(false);
                                  }}
                                  className={cn(
                                    "w-full p-2 ",
                                    item === field.value
                                      ? "bg-blue-500 text-white"
                                      : "bg-white text-black"
                                  )}
                                >
                                  {item} Hour
                                </div>
                              );
                            }
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="pickup_date"
              render={({ field, formState: { errors } }) => (
                <FormItem className="w-full relative">
                  <Popover
                    open={loading ? false : dateOpen}
                    onOpenChange={setDateOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div
                          className={cn(
                            "w-full flex h-full items-center gap-2 justify-start border-none  px-2 py-4 lg:py-2 "
                          )}
                        >
                          <CalendarDays className="size-5" />

                          <div className="flex flex-col gap-1 ">
                            <p
                              className={cn(
                                "text-xs  text-start",
                                errors.pickup_date
                                  ? "text-red-500"
                                  : "text-black"
                              )}
                            >
                              Date
                            </p>
                            {field.value ? (
                              <p className="text-black text-sm">
                                {format(field.value, "PPP")}
                              </p>
                            ) : (
                              <p className="text-gray-400 text-sm">
                                dd:mm:yyyy
                              </p>
                            )}
                          </div>
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white relative z-[200]"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        className=""
                        onSelect={(event) => {
                          form.formState.errors.pickup_date = undefined;
                          field.onChange(event);
                          form.resetField("pickup_time");
                          setDateOpen(false);
                        }}
                        disabled={(date) => isBeforeNewJerseyToday(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pickup_time"
              render={({ field, formState: { errors } }) => (
                <FormItem className="w-full relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div
                          className={cn(
                            "w-full flex h-full items-center gap-2 justify-start border-none  px-2 py-4 lg:py-2 "
                          )}
                        >
                          <TimerIcon className="size-5 " />
                          <div className="flex flex-col gap-1 ">
                            <p
                              className={cn(
                                "text-xs  text-start",
                                errors.pickup_time
                                  ? "text-red-500"
                                  : "text-black"
                              )}
                            >
                              Time
                            </p>
                            <p
                              className={
                                field.value?.hour !== undefined
                                  ? "text-sm text-black"
                                  : "text-sm text-gray-400"
                              }
                            >
                              {field.value?.hour !== undefined
                                ? formatTime12(
                                  field.value.hour,
                                  field.value.minute ?? 0
                                )
                                : "hh:mm AM/PM"}
                            </p>
                          </div>
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="max-w-full w-fit h-40  p-2 overflow-hidden bg-white z-[200]"
                      align="start"
                    >
                      <div className="flex items-start justify-start gap-3 max-h-full h-full overflow-hidden">
                        {/* Hour list */}
                        <div className="flex flex-col py-1 rounded-sm border border-brand text-center max-h-full h-full overflow-y-auto overflow-hidden w-fit ">
                          {Array.from({ length: 24 }, (_, i) => i)
                            .filter((item) => {
                              if (
                                form.watch("pickup_date") > getNewJerseyDate() ||
                                !form.watch("pickup_date")
                              ) {
                                return true;
                              }
                              return getNewJerseyHour() + 3 < item;
                            })
                            .map((item) => (
                              <div
                                key={item}
                                className={`py-1 px-4 cursor-pointer ${field.value?.hour === item
                                  ? "bg-blue-500 text-white"
                                  : "bg-white"
                                  }`}
                                onClick={() => {
                                  form.formState.errors.pickup_time = undefined;
                                  field.onChange({
                                    minute: isNaN(field.value?.minute)
                                      ? 0
                                      : field.value.minute,
                                    hour: item,
                                  });
                                }}
                              >
                                {item.toString().padStart(2, '0')}
                              </div>
                            ))}

                        </div>

                        {/* Minute list */}
                        <div className="flex flex-col py-1 rounded-sm border border-gray-300 text-center max-h-full h-full overflow-y-auto overflow-hidden w-fit">
                          {Array.from({ length: 12 }, (_, i) => i * 5).map(
                            (item) => (
                              <div
                                key={item}
                                className={`py-1 px-4  cursor-pointer  ${field.value?.minute === item
                                  ? "bg-blue-500 text-white"
                                  : "bg-white"
                                  }`}
                                onClick={() => {
                                  form.formState.errors.pickup_time = undefined;
                                  field.onChange({
                                    ...field.value,
                                    minute: item,
                                  });
                                }}
                              >
                                {item.toString().padStart(2, "0")}
                              </div>
                            )
                          )}
                        </div>

                        {/* AM/PM selector */}
                        <div className="flex flex-col py-1 rounded-sm border border-gray-300 text-center max-h-full h-full overflow-y-auto overflow-hidden w-fit">
                          {["AM", "PM"].map((period) => (
                            <div
                              key={period}
                              className={`py-1 px-2 cursor-pointer ${(field.value?.hour || 0) >= 12 ===
                                (period === "PM")
                                ? "bg-blue-500 text-white"
                                : "bg-white"
                                }`}
                              onClick={() => {
                                if (field.value?.hour !== undefined) {
                                  let hour = field.value.hour;
                                  if (period === "AM" && hour >= 12) hour -= 12;
                                  if (period === "PM" && hour < 12) hour += 12;
                                  field.onChange({ ...field.value, hour });
                                }
                              }}
                            >
                              {period}
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <div className="w-full flex items-center justify-center max-lg:py-4 ">
              <button
                type="button"
                onClick={() => {
                  const normalize = (text: string) =>
                    text?.toLowerCase().replace(/\s+/g, "").replace(/,/g, "");

                  const pickup = normalize(fromLocation);
                  const dropoff = normalize(toLocation);

                  if (pickup && dropoff && pickup === dropoff) {
                    toast({
                      title: "Same Pickup & Drop-off",
                      description: "Pickup and drop-off locations cannot be the same. Please choose different locations.",
                      variant: "destructive",
                    });
                    return;
                  }

                  const pickupDate = form.getValues("pickup_date");
                  const pickupTime = form.getValues("pickup_time");

                  if (!pickupDate || !pickupTime?.hour || pickupTime.minute === undefined) {
                    toast({
                      title: "Missing Time",
                      description: "Please select both pickup date and time.",
                      variant: "destructive",
                    });
                    return;
                  }

                  const pickupDateTime = new Date(pickupDate);
                  pickupDateTime.setHours(pickupTime.hour);
                  pickupDateTime.setMinutes(pickupTime.minute);
                  pickupDateTime.setSeconds(0);
                  pickupDateTime.setMilliseconds(0);

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

                  // ✅ All validations passed
                  NextStep();
                }}




                className="rounded-full bg-black text-white py-2 px-4 w-5/6 "
              >
                {loading ? "Loading..." : "Book Now"}
              </button>



            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default HeroSectionBookingForm;
