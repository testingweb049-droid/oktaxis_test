'use client'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from 'react'
// calander imports
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarDays, TimerIcon } from "lucide-react"
import { SlLocationPin } from "react-icons/sl";
import { MdMoreTime } from "react-icons/md";

// calander end

// maps 
import { Autocomplete, Libraries, useLoadScript } from "@react-google-maps/api"



// import { createOrder } from '@/actions/add-order'
import useCustomForm from '@/hooks/useFormContext'
import { isBeforeNewJerseyToday } from "@/lib/isBeforeTime"



const libraries: Libraries = ["places"];





function HeroSectionBookingForm() {

    const [dateOpen, setDateOpen] = useState(false)
    const { form, category, setCategory, NextStep, loading, Step1, resetForm } = useCustomForm()
    const [durationOpen, setDurationOpen] = useState(false)

    const [fromLocation, setFromLocation] = useState('')
    const [toLocation, setToLocation] = useState('')

    console.log("durationOpen ", durationOpen)

    const { isLoaded, } = useLoadScript({
        googleMapsApiKey:
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
            "AIzaSyDaQ998z9_uXU7HJE5dolsDqeO8ubGZvDU",
        libraries,
    });
    const fromRef = useRef<google.maps.places.Autocomplete | null>(null);
    const toRef = useRef<google.maps.places.Autocomplete | null>(null);
    function onSubmit() {
        NextStep()
    }

    useEffect(() => {

        Step1()

        const from = form.getValues('pickup_location');
        const to = form.getValues('dropoff_location');
        if (from) {
            setFromLocation(from)

        }
        if (to) {
            setToLocation(to)
        }

    }, [])


    return (
        <div className='flex flex-col gap-5 w-full   mx-auto text-black'>

            <div className='flex items-center gap-5'>
                <div onClick={() => { if (category !== 'trips') { setCategory('trips'); resetForm(); setFromLocation(''); setToLocation('') } }} className={cn('px-4 w-28 cursor-pointer py-2 font-semibold rounded-3xl  text-center  ', category === 'trips' ? ' bg-[#F0A857] text-black ' : ' text-white border border-white   ')}>Trip</div>
                <div onClick={() => { if (category !== 'hourly') { setCategory('hourly'); resetForm(); setFromLocation(''); setToLocation('') } }} className={cn('px-4 w-28 py-2 cursor-pointer font-semibold rounded-3xl text-center   ', category === 'hourly' ? ' bg-[#F0A857] text-black ' : ' text-white border border-white  ')}>Hourly</div>
            </div>

            <div className='w-full flex gap-2 bg-white rounded-2xl lg:rounded-3xl p-2 overflow-hidden'>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid lg:grid-cols-5 bg-white  max-lg:divide-y lg:divide-x w-full ">

                        {/* step 1 */}

                        <FormField
                            control={form.control}
                            name="pickup_location"
                            render={({ field, formState: { errors } }) => (
                                <FormItem className="w-full rounded-full px-2 py-3 lg:py-2  ">

                                    {!isLoaded ? (
                                        <div className="text-center rounded-sm  w-full">Loading...</div>
                                    ) : (
                                        <Autocomplete

                                            options={{
                                                componentRestrictions: { country: "uk" },
                                            }}
                                            onLoad={(autocomplete) => (fromRef.current = autocomplete)}
                                            onPlaceChanged={() => {
                                                form.formState.errors.pickup_location = undefined;
                                                if (fromRef.current) {
                                                    const place = fromRef.current.getPlace();
                                                    if (place.formatted_address && place?.geometry?.location) {
                                                        const origin = place?.geometry?.location;
                                                        const fromLatlng = origin.lat() + "," + origin.lng();
                                                        form.setValue('pickup_location_lag_alt', fromLatlng)
                                                        field.onChange(place.formatted_address);
                                                        setFromLocation(place.formatted_address)

                                                    }
                                                    console.log('place :: ', place);
                                                }
                                            }}

                                            className='border-none rounded-full w-full '
                                        >
                                            <div className='flex items-center gap-2'>


                                                <SlLocationPin className="size-5" />

                                                <div className='flex flex-col gap-1 w-full'>
                                                    <p className={cn('text-xs  text-start', errors.pickup_location ? 'text-red-500' : 'text-black')}>Pickup Location</p>
                                                    <input
                                                        value={fromLocation}
                                                        onChange={(e) => { setFromLocation(e.target.value) }}
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

                        {category === 'trips' &&
                            <FormField
                                control={form.control}
                                name="dropoff_location"
                                render={({ field, formState: { errors } }) => (
                                    <FormItem className="w-full px-2 py-3 lg:py-2 ">

                                        {!isLoaded ? (
                                            <div className="text-center rounded-sm  w-full">Loading...</div>
                                        ) : (
                                            <Autocomplete
                                                options={{
                                                    componentRestrictions: { country: "uk" },
                                                }}
                                                onLoad={(autocomplete) => (toRef.current = autocomplete)}
                                                onPlaceChanged={() => {
                                                    form.formState.errors.dropoff_location = undefined;
                                                    if (toRef.current) {
                                                        const place = toRef.current.getPlace();
                                                        if (place.formatted_address && place?.geometry?.location) {
                                                            const origin = place?.geometry?.location;
                                                            const toLatlng = origin.lat() + "," + origin.lng();
                                                            form.setValue('dropoff_location_lag_alt', toLatlng)
                                                            field.onChange(place.formatted_address);
                                                            setToLocation(place.formatted_address)
                                                        }
                                                        console.log('place :: ', place);
                                                    }
                                                }}

                                                className='border-none '
                                            >
                                                <div className='flex items-center gap-2'>


                                                    <SlLocationPin className="size-5" />

                                                    <div className='flex flex-col gap-1 w-full '>
                                                        <p className={cn('text-xs  text-start', errors.dropoff_location ? 'text-red-500' : 'text-black')}>Drop off Location</p>
                                                        <input
                                                            value={toLocation}
                                                            disabled={loading}
                                                            onChange={(e) => { setToLocation(e.target.value) }}
                                                            placeholder="Drop off Location"
                                                            className="w-full focus:outline-none text-sm  text-black"
                                                        />

                                                    </div>
                                                </div>

                                            </Autocomplete>
                                        )}

                                    </FormItem>
                                )}
                            />}

                        {category !== 'trips' && <FormField
                            control={form.control}
                            name="duration"
                            render={({ field, formState: { errors } }) => (
                                <FormItem className='w-full h-full '>
                                    <Popover open={durationOpen} onOpenChange={setDurationOpen} >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <div
                                                    className={cn(
                                                        "w-full flex h-full items-center gap-2 justify-start border-none  px-2 py-3 lg:py-2 "
                                                    )}
                                                >
                                                    <MdMoreTime className="size-5" />

                                                    <div className='flex flex-col gap-1 '>
                                                        <p className={cn('text-xs  text-start', errors.duration ? 'text-red-500' : 'text-black')}>Duration</p>
                                                        {field.value ? <p className='text-sm  text-black'>{field.value} Hours</p> : <p className='text-sm  text-gray-400'>Select duration</p>}

                                                    </div>

                                                </div>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full min-w-60 p-0 bg-white relative z-[200]" align="start">
                                            <div className={cn('w-full min-w-60   flex divide-y shadow-xl bg-white border border-gray-300 max-h-60 flex-col overflow-y-scroll duration-300 transition-all')}>
                                                {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((item) => { return <div key={item} onClick={() => { field.onChange(item); setDurationOpen(false) }} className={cn('w-full p-2 ', item === field.value ? "bg-blue-500 text-white" : 'bg-white text-black')}>{item} Hours</div> })}

                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                </FormItem>
                            )}
                        />
                        }


                        <FormField
                            control={form.control}
                            name="pickup_date"
                            render={({ field, formState: { errors } }) => (
                                <FormItem className="w-full relative">
                                    <Popover open={loading ? false : dateOpen} onOpenChange={setDateOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <div
                                                    className={cn(
                                                        "w-full flex h-full items-center gap-2 justify-start border-none  px-2 py-3 lg:py-2 "
                                                    )}
                                                >
                                                    <CalendarDays className="size-5" />

                                                    <div className='flex flex-col gap-1 '>
                                                        <p className={cn('text-xs  text-start', errors.pickup_date ? 'text-red-500' : 'text-black')}>Date</p>
                                                        {field.value ? <p className='text-black text-sm' >{format(field.value, "PPP")}</p> : <p className='text-gray-400 text-sm'>dd:mm:yyyy</p>}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-white relative z-[200]" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                className=''
                                                onSelect={(event) => {
                                                    form.formState.errors.pickup_date = undefined;
                                                    field.onChange(event)
                                                    setDateOpen(false)
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
                                                        "w-full flex h-full items-center gap-2 justify-start border-none  px-2 py-3 lg:py-2 "
                                                    )}
                                                >
                                                    <TimerIcon className="size-5 " />
                                                    <div className='flex flex-col gap-1 '>
                                                        <p className={cn('text-xs  text-start', errors.pickup_time ? 'text-red-500' : 'text-black')}>Time</p>
                                                        {field.value?.hour ? <p className='text-sm text-black'>{field.value?.hour ? field.value.hour.toString().padStart(2, "0") : 'hh'}:{field.value?.minute ? field.value.minute.toString().padStart(2, "0") : '00'} {field.value?.period ? field.value.period : 'period'}</p> : <p className='text-gray-400 text-sm'>{field.value?.hour ? field.value.hour.toString().padStart(2, "0") : 'hh'}:{field.value?.minute ? field.value.minute.toString().padStart(2, "0") : '00'} {field.value?.period ? field.value.period : 'period'}</p>}
                                                    </div>

                                                </div>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="max-w-full w-fit h-40  p-2 overflow-hidden bg-white z-[200]" align="start">
                                            <div className="flex items-start justify-start gap-3 max-h-full h-full overflow-hidden">

                                                <div className='flex flex-col py-1 rounded-sm border border-gray-300 text-center max-h-full h-full overflow-y-auto overflow-hidden w-fit '>
                                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((item) => (
                                                        <div className={`py-1 px-2 cursor-pointer ${field.value?.hour === item ? 'bg-blue-500 text-white' : 'bg-white'}`} key={item} onClick={() => {
                                                            form.formState.errors.pickup_time = undefined;
                                                            field.onChange({ period: field.value?.period ? field.value.period : 'AM', minute: isNaN(field.value?.minute) ? 0 : field.value.minute, hour: item })
                                                        }
                                                        } >{item}</div>
                                                    ))}
                                                </div>

                                                <div className='flex flex-col py-1 rounded-sm border border-gray-300 text-center max-h-full h-full overflow-y-auto overflow-hidden w-fit'>
                                                    {Array.from({ length: 12 }, (_, i) => i * 5).map((item) => (
                                                        <div
                                                            className={`py-1 px-2  cursor-pointer  ${field.value?.minute === item ? 'bg-blue-500 text-white' : 'bg-white'}`}
                                                            key={item}
                                                            onClick={() => {
                                                                form.formState.errors.pickup_time = undefined;
                                                                field.onChange({ ...field.value, minute: item });
                                                            }}
                                                        >
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>



                                                <div className='flex flex-col py-1 rounded-sm border border-gray-300 text-center max-h-full h-full overflow-y-auto overflow-hidden w-fit '>

                                                    <div className={`py-1 px-2  cursor-pointer  ${field.value?.period === "AM" ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => {
                                                        form.formState.errors.pickup_time = undefined;
                                                        field.onChange({ ...field.value, period: "AM" })
                                                    }
                                                    } >AM</div>
                                                    <div className={`py-1 px-2 ${field.value?.period === "PM" ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => {
                                                        form.formState.errors.pickup_time = undefined;
                                                        field.onChange({ ...field.value, period: "PM" })
                                                    }
                                                    } >PM</div>

                                                </div>

                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />

                        <div className='w-full flex items-center justify-center max-lg:py-3 '>
                            <button type='button' onClick={() => { NextStep() }} className='rounded-full bg-black text-white py-2 px-4 w-5/6 '>{loading ? 'Loading...' : 'Book Now'}</button>
                        </div>

                    </form>
                </Form>


            </div>
        </div>
    )
}

export default HeroSectionBookingForm