"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isBefore,
  startOfDay,
} from "date-fns"
import { ChevronRight, Clock, ChevronUp, ChevronDown } from "lucide-react"
import useCustomForm from "@/hooks/useFormContext"
import { cn } from "@/lib/utils"

interface Time {
  hour: number
  minute: number
}

interface DateTimePickerProps {
  label: string
  selectedDate: Date | null
  selectedTime?: Time | null // ✅ allow undefined
  setValue: (field: string, value: any) => void
  dateFieldName: string
  timeFieldName: string
  minSelectableDate?: Date | null
}

export default function DateTimePicker({
  label,
  selectedDate,
  selectedTime,
  setValue,
  dateFieldName,
  timeFieldName,
  minSelectableDate = null,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date())
  const timeRef = useRef<HTMLDivElement>(null)
  const scrollableContentRef = useRef<HTMLDivElement>(null) // New ref for the scrollable content
  const {form:{formState:{errors}}} = useCustomForm()

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Helper to format time to 12-hour format with AM/PM
  function formatTime12(hour?: number, minute?: number): string {
    // If hour or minute are not numbers, default to 12:00 AM for display
    if (typeof hour !== "number" || typeof minute !== "number") {
      hour = 0 
      minute = 0
    }
    const hour12 = (hour ?? 0).toString().padStart(2, "0")
    const minuteStr = (minute ?? 0 ).toString().padStart(2, "0")
    const amPm = hour >= 12 ? "PM" : "AM"
    return `${hour12}:${minuteStr} ${amPm}`
  }

  // Calculate calendar days dynamically
  const getCalendarDays = useCallback(() => {
    const startOfCurrentMonth = startOfMonth(currentMonth)
    const endOfCurrentMonth = endOfMonth(currentMonth)

    // Adjust start day to be Monday (getDay returns 0 for Sunday, 1 for Monday)
    const startDayOfWeek = (getDay(startOfCurrentMonth) + 6) % 7 // 0 for Mon, 6 for Sun

    const daysInPrevMonth = startDayOfWeek
    const prevMonthStart = subMonths(startOfCurrentMonth, 1)
    const prevMonthEnd = endOfMonth(prevMonthStart)

    const prevDays = eachDayOfInterval({
      start: new Date(prevMonthEnd.setDate(prevMonthEnd.getDate() - daysInPrevMonth + 1)),
      end: prevMonthEnd,
    }).map((date) => ({ day: date.getDate(), date, inactive: true }))

    const currentDays = eachDayOfInterval({
      start: startOfCurrentMonth,
      end: endOfCurrentMonth,
    }).map((date) => ({ day: date.getDate(), date, inactive: false }))

    const allDays = [...prevDays, ...currentDays]

    const daysInNextMonth = 42 - allDays.length // Ensure 6 rows (6 * 7 = 42 cells)
    const nextMonthStart = addMonths(startOfCurrentMonth, 1)
    const nextDays = eachDayOfInterval({
      start: nextMonthStart,
      end: new Date(nextMonthStart.setDate(nextMonthStart.getDate() + daysInNextMonth - 1)),
    }).map((date) => ({ day: date.getDate(), date, inactive: true }))

    return [...allDays, ...nextDays]
  }, [currentMonth])

  const calendarDays = getCalendarDays()

  // Handle clicks outside the component to close the popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleDateSelect = (date: Date) => {
    setValue(dateFieldName, date)
    setCurrentMonth(date)

    // If no time is currently selected, default it to 12:00 AM (hour: 0, minute: 0)
    // if (selectedTime === null || selectedTime === undefined) {
    //   setValue(timeFieldName, { hour: 0, minute: 0 })
    // }

    // Delay scroll slightly to ensure render and scroll within the popover content
    // setTimeout(() => {
    //   if (timeRef.current && scrollableContentRef.current) {
    //     const timeElementOffsetTop = timeRef.current.offsetTop
    //     scrollableContentRef.current.scrollTo({
    //       top: timeElementOffsetTop,
    //       behavior: "smooth",
    //     })
    //   }
    // }, 100)
  }

  const handleHourChange = (increment: boolean) => {
    const currentHour = selectedTime?.hour ?? 0
    let newHour = currentHour
    if (increment && currentHour<23) {
      newHour = (currentHour + 1) 
    } else if(increment && currentHour===23) {
      newHour = 0 
    
    } else if(!increment && currentHour > 0) {
      newHour = (currentHour - 1 ) 
    
    } else if(!increment && currentHour === 0) {
      newHour = 23 
    }
    console.log("newHour ",newHour)
      const updated = { ...selectedTime, hour: newHour ,  minute: selectedTime?.minute ?? 0};

    setValue(timeFieldName, updated)
  }

  const handleMinuteChange = (increment: boolean) => {
    const currentMinute = selectedTime?.minute ?? 0
    let newMinute = currentMinute
    if (increment) {
      newMinute = (currentMinute + 5) % 60 // Increment by 5 minutes
    } else {
      newMinute = (currentMinute - 5 + 60) % 60 // Decrement by 5 minutes
    }
    const updated = { ...selectedTime, minute: newMinute , hour: selectedTime?.hour ?? 1};

    setValue(timeFieldName, updated)
  }

  // const handleAmPmToggle = () => {
  //   const currentHour = selectedTime?.hour ?? 0
  //   let newHour = currentHour
  //   if (currentHour >= 12) {
  //     // Currently PM, switch to AM
  //     newHour -= 12
  //   } else {
  //     // Currently AM, switch to PM
  //     newHour += 12
  //   }
  //   setValue(timeFieldName, { ...selectedTime, hour: newHour })
  // }

  return (
    <div ref={containerRef} className="relative max-w-5xl">
      <label className="block text-sm font-medium text-black mb-1">{label}</label>
      <input
        type="text"
        readOnly
        value={
          (selectedDate || selectedTime)
            ? `${selectedDate ? format(selectedDate, "EEEE do MMM yyyy") : 'date'}, ${selectedTime? formatTime12(selectedTime?.hour, selectedTime?.minute) : '00:00'}`
            : ""
        }
        onClick={() => setOpen(true)}
        className={cn("w-full px-3 py-2  rounded-lg text-sm shadow-sm bg-white cursor-pointer text-black border ", (errors[dateFieldName as 'pickup_date'] || errors[timeFieldName as 'pickup_time']) ? 'border-red-500' : ' border-gray-500 ')}
        placeholder="Select Date & Time"
      />
      {open && (
        <div className="absolute left-0 top-full mt-2 z-30 w-full max-w-sm bg-[#333333] text-white rounded-md shadow-lg">
          {/* Month header */}
          <div className="bg-brand text-black font-bold text-lg py-2 px-4 flex items-center justify-between rounded-t-md">
            <div
              className="h-8 w-8 text-black hover:bg-yellow-400"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              <span className="sr-only">Previous month</span>
            </div>
            <span className="flex-grow text-center">{format(currentMonth, "MMMM yyyy")}</span>
            <div
              className="h-8 w-8 text-black hover:bg-yellow-400"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </div>
          </div>

          {/* Scrollable content wrapper */}
          <div ref={scrollableContentRef} className="overflow-y-auto max-h-[300px]">
            {/* Calendar Grid */}
            <div className="px-2">
              <div className="grid grid-cols-7 text-center text-sm font-semibold gap-4">
                {daysOfWeek.map((day) => (
                  <div key={day} className="py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 text-center text-xs">
                {calendarDays.map((dayObj, index) => (
                  <div
                    key={index}
                    className={`
                  py-2 px-1 m-0.5 rounded-sm flex items-center justify-center
                  ${
                    dayObj.inactive || (minSelectableDate && isBefore(dayObj.date, startOfDay(minSelectableDate)))
                      ? "text-gray-500"
                      : "text-white"
                  }
                  ${
                    isSameDay(dayObj.date, selectedDate || new Date()) && !dayObj.inactive
                      ? "bg-blue-600 text-white font-bold rounded-md"
                      : isSameDay(dayObj.date, new Date()) && !dayObj.inactive
                        ? "border border-blue-500 rounded-md"
                        : ""
                  }
                  ${
                    !dayObj.inactive &&
                    !isSameDay(dayObj.date, selectedDate || new Date()) &&
                    (minSelectableDate && isBefore(dayObj.date, startOfDay(minSelectableDate)))
                      ? "text-gray-500 cursor-not-allowed"
                      : "hover:bg-zinc-700 cursor-pointer"
                  }
                `}
                    onClick={() => {
                      if (
                        !dayObj.inactive &&
                        !(minSelectableDate && isBefore(dayObj.date, startOfDay(minSelectableDate)))
                      ) {
                        handleDateSelect(dayObj.date)
                      }
                    }}
                  >
                    {dayObj.day}
                  </div>
                ))}
              </div>
            </div>

            {/* Conditional Time Selection */}
            
              <div
                ref={timeRef}
                className="flex items-center justify-between px-4 py-3 border-t border-zinc-700 overflow-x-auto gap-2 whitespace-nowrap"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Clock className="size-6 text-white flex-shrink-0" />
                  {/* Hour Select */}
                  <div className="flex items-center bg-zinc-800 rounded-sm px-1 py-0.5">
                    <span className="font-bold text-lg flex-shrink-0">
                      {(selectedTime?.hour ?? 0)
                        .toString()
                        .padStart(2, "0")}
                    </span>
                    <div className="flex flex-col ml-1 text-gray-400">
                      <ChevronUp
                        className="size-3 cursor-pointer hover:text-white"
                        onClick={() => handleHourChange(true)}
                      />
                      <ChevronDown
                        className="size-3 cursor-pointer hover:text-white"
                        onClick={() => handleHourChange(false)}
                      />
                    </div>
                  </div>
                  <span className="text-lg font-bold flex-shrink-0">:</span>
                  {/* Minute Select */}
                  <div className="flex items-center bg-zinc-800 rounded-sm px-1 py-0.5">
                    <span className="font-bold text-lg flex-shrink-0">
                      {(selectedTime?.minute ?? 0).toString().padStart(2, "0")}
                    </span>
                    <div className="flex flex-col ml-1 text-gray-400">
                      <ChevronUp
                        className="size-3 cursor-pointer hover:text-white"
                        onClick={() => handleMinuteChange(true)}
                      />
                      <ChevronDown
                        className="size-3 cursor-pointer hover:text-white"
                        onClick={() => handleMinuteChange(false)}
                      />
                    </div>
                  </div>
                  {/* AM/PM Toggle - Adjusted size and spacing to fit */}
                  {/* <div
                    className="bg-zinc-800 rounded-sm px-1 py-0.5 font-bold text-lg cursor-pointer hover:bg-zinc-700 flex-shrink-0"
                    onClick={handleAmPmToggle}
                  >
                    {(selectedTime?.hour ?? 0) >= 12 ? "PM" : "AM"}
                  </div> */}
                </div>
                {/* Apply Button */}
                <div
                  onClick={() => setOpen(false)}
                  className="bg-brand text-black rounded-lg text-sm font-bold hover:bg-brand px-2 py-1 whitespace-nowrap flex-shrink-0"
                >
                  Apply
                </div>
              </div>
            
          </div>
        </div>
      )}
    </div>
  )
}
