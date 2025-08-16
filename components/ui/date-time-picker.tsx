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
  const [isDate, setIsDate] = useState(true)

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
    setIsDate(false)

    
  }

    function getDisplayHour(hour: number): number {
    return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  }

  function getAmPm(hour: number): string {
    return hour >= 12 ? "PM" : "AM"
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

  
  const toggleAmPm = () => {
    const currentHour = selectedTime?.hour ?? 12
    const newHour = currentHour < 12 ? currentHour + 12 : currentHour - 12
    const updated = { ...selectedTime, hour: newHour, minute: selectedTime?.minute ?? 0 }
    setValue(timeFieldName, updated)
  }



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
           <div className="relative p-3 bg-[#333333] rounded-t-md">
            <div className="relative bg-black rounded-xl p-1 grid grid-cols-2 gap-1">
              {/* Background slider */}
              <div
                className={cn(
                  "absolute top-1 bottom-1 w-[calc(50%-2px)] bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-lg transition-all duration-300 ease-out shadow-lg",
                  isDate ? "left-1" : "left-[calc(50%+1px)]",
                )}
              />

              {/* Date Tab */}
              <button
                onClick={() => setIsDate(true)}
                className={cn(
                  "relative z-10 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ease-out",
                  "hover:scale-105 active:scale-95",
                  isDate ? "text-gray-900 shadow-sm" : "text-gray-300 hover:text-white",
                )}
              >
                <span className="flex items-center justify-center gap-2">
                  📅<span>Date</span>
                </span>
              </button>

              {/* Time Tab */}
              <button
                onClick={() => setIsDate(false)}
                className={cn(
                  "relative z-10 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ease-out",
                  "hover:scale-105 active:scale-95",
                  !isDate ? "text-gray-900 shadow-sm" : "text-gray-300 hover:text-white",
                )}
              >
                <span className="flex items-center justify-center gap-2">
                  🕐<span>Time</span>
                </span>
              </button>
            </div>
          </div>
          {isDate  ? 
          <>
          <div className="bg-yellow-500 text-black font-bold text-lg py-2 px-4 flex items-center justify-between rounded-t-md">
            <div
              className="size-8 flex items-center justify-center text-black hover:bg-yellow-400"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              <span className="sr-only">Previous month</span>
            </div>
            <span className="flex-grow text-center">{format(currentMonth, "MMMM yyyy")}</span>
            <div
              className="size-8 flex items-center justify-center text-black hover:bg-yellow-400 "
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </div>
          </div>

          {/* Scrollable content wrapper */}
          <div ref={scrollableContentRef} className="overflow-y-auto max-h-[300px] pb-2">
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
            
             
          </div>
          </>
          :
            <div ref={timeRef} className="px-3 pb-4">
              <div className="flex items-center justify-center mb-4 w-full text-center bg-yellow-600 p-2 rounded-xl font-semibold text-black">
                <Clock className="size-5  mr-2" />
                <span className="text-lg font-semibold ">Select Time</span>
              </div>

              {/* Time Display */}
              <div className="flex items-center justify-center mb-6">
                <div className="text-4xl font-bold text-white tracking-wider">
                  {getDisplayHour(selectedTime?.hour ?? 12)
                    .toString()
                    .padStart(2, "0")}
                  <span className="text-gray-300 mx-2">:</span>
                  {(selectedTime?.minute ?? 0).toString().padStart(2, "0")}
                  <span className="text-2xl ml-3 text-white">{getAmPm(selectedTime?.hour ?? 12)}</span>
                </div>
              </div>

              {/* Time Controls */}
              <div className="flex items-center justify-center gap-8">
                {/* Hour Controls */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleHourChange(true)}
                    className="w-12 h-12 bg-zinc-700 hover:bg-zinc-600 rounded-lg flex items-center justify-center transition-colors mb-2"
                  >
                    <ChevronUp className="size-6 text-white" />
                  </button>
                  <div className="text-sm text-gray-400 mb-2">Hour</div>
                  <button
                    onClick={() => handleHourChange(false)}
                    className="w-12 h-12 bg-zinc-700 hover:bg-zinc-600 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <ChevronDown className="size-6 text-white" />
                  </button>
                </div>

                {/* Minute Controls */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleMinuteChange(true)}
                    className="w-12 h-12 bg-zinc-700 hover:bg-zinc-600 rounded-lg flex items-center justify-center transition-colors mb-2"
                  >
                    <ChevronUp className="size-6 text-white" />
                  </button>
                  <div className="text-sm text-gray-400 mb-2">Min</div>
                  <button
                    onClick={() => handleMinuteChange(false)}
                    className="w-12 h-12 bg-zinc-700 hover:bg-zinc-600 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <ChevronDown className="size-6 text-white" />
                  </button>
                </div>

                {/* AM/PM Toggle */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={toggleAmPm}
                    className="w-16 h-12 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-lg flex items-center justify-center transition-colors mb-2"
                  >
                    {getAmPm(selectedTime?.hour ?? 12)}
                  </button>
                  <div className="text-sm text-gray-400 mb-2">Period</div>
                  <button
                    onClick={toggleAmPm}
                    className="w-16 h-12 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg flex items-center justify-center transition-colors text-sm"
                  >
                    {getAmPm(selectedTime?.hour ?? 12) === "AM" ? "PM" : "AM"}
                  </button>
                </div>
              </div>

              {/* Quick Time Presets */}
              {/* <div className="mt-6 pt-4 border-t border-zinc-700">
                <div className="text-sm text-gray-400 mb-3 text-center">Quick Select</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "9:00 AM", hour: 9, minute: 0 },
                    { label: "12:00 PM", hour: 12, minute: 0 },
                    { label: "3:00 PM", hour: 15, minute: 0 },
                    { label: "6:00 PM", hour: 18, minute: 0 },
                    { label: "8:00 PM", hour: 20, minute: 0 },
                    { label: "10:00 PM", hour: 22, minute: 0 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setValue(timeFieldName, { hour: preset.hour, minute: preset.minute })}
                      className="px-3 py-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div> */}
            </div>
          }
        </div>
      )}
    </div>
  )
}
