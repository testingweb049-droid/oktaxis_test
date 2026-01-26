"use client"

import { useState, useEffect, useRef } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isBefore,
  startOfDay,
} from "date-fns"
import { fromZonedTime, toZonedTime, format as formatTz } from "date-fns-tz"
import { ChevronRight, Calendar, Clock, ChevronUp, ChevronDown, X } from "lucide-react"
import { cn, parseTimeString } from "@/lib/utils"
import useFormStore, { FieldType, FormDataType } from "@/stores/form-store"

const DEFAULT_TIMEZONE = "America/New_York"

interface DateTimePickerProps {
  selectedDate: string
  selectedTime: string
  placeholder: string
  setFormData: (
    key: keyof FormDataType,
    value: string | number | boolean,
    coordinates?: string,
    index?: number
  ) => void
  dateFieldName: keyof FormDataType
  timeFieldName: keyof FormDataType
  minSelectableDate?: Date | null
  excludeDate?: Date | null
  timezone?: string
  isDisable?: boolean
  dateLabel?: string
  timeLabel?: string
  className?: string
}

export default function NewDateTimePicker({
  selectedDate,
  selectedTime,
  setFormData,
  dateFieldName,
  timeFieldName,
  minSelectableDate,
  excludeDate,
  timezone = DEFAULT_TIMEZONE,
  placeholder,
  isDisable,
  dateLabel = "Pickup date",
  timeLabel = "Pickup time",
  className = "bg-white",
}: DateTimePickerProps) {
  // Get current time in specified timezone
  const getTZTime = () => toZonedTime(new Date(), timezone)
  const [currentMonth, setCurrentMonth] = useState(getTZTime())
  const [dateOpen, setDateOpen] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)
  const [hour, setHour] = useState<number | null>(null)
  const [minute, setMinute] = useState<number | null>(null)
  const [ampm, setAmPm] = useState<"AM" | "PM">("AM")
  const { formData } = useFormStore()

  const hourScrollRef = useRef<HTMLDivElement>(null)
  const minuteScrollRef = useRef<HTMLDivElement>(null)
  const ampmScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timeOpen && selectedTime) {
      // Parse time - supports both 12h and 24h formats for backward compatibility
      const timeParsed = parseTimeString(selectedTime)
      if (timeParsed) {
        const { hours: hour24, minutes: minuteVal } = timeParsed
        const hour12 = hour24 % 12 || 12
        setHour(hour12)
        setAmPm(hour24 >= 12 ? "PM" : "AM")
        setMinute(minuteVal)
      }
    } else if (timeOpen && !selectedTime) {
      // Set to current time in specified timezone when opening without a selected time
      const nowTZ = getTZTime()
      const hour24 = nowTZ.getHours()
      const minuteVal = nowTZ.getMinutes()
      const hour12 = hour24 % 12 || 12
      
      setHour(hour12)
      setMinute(minuteVal)
      setAmPm(hour24 >= 12 ? "PM" : "AM")
    }
  }, [timeOpen, selectedTime, timezone])

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

  const getCalendarDays = () => {
    const startOfCurrentMonth = startOfMonth(currentMonth)
    const startDayOfWeek = (getDay(startOfCurrentMonth) + 6) % 7
    const startDate = new Date(startOfCurrentMonth)
    startDate.setDate(startOfCurrentMonth.getDate() - startDayOfWeek)

    const days = eachDayOfInterval({
      start: startDate,
      end: new Date(startDate.getTime() + 41 * 24 * 60 * 60 * 1000),
    })

    return days
  }
  
  // Helper to get timezone date from string
  const getTZDateFromString = (dateString: string): Date => {
    if (!dateString) return getTZTime()
    // Parse the date string (format: yyyy-MM-dd)
    // Create date at midnight in specified timezone
    const [year, month, day] = dateString.split('-').map(Number)
    // Create a date representing midnight in specified timezone
    // We use fromZonedTime to treat the date as if it's in the specified timezone
    const tzDate = new Date(year, month - 1, day, 0, 0, 0, 0)
    // Convert from timezone perspective to actual Date object
    return fromZonedTime(tzDate, timezone)
  }
  
  // Helper to get today's date in specified timezone
  const getTodayTZ = () => {
    const now = getTZTime()
    return startOfDay(now)
  }

  const handleDateSelect = (date: Date) => {
    // Convert the selected date to specified timezone and format it
    // The date from calendar is in local time, convert to specified timezone first
    const tzDate = toZonedTime(date, timezone)
    const formatted = format(tzDate, "yyyy-MM-dd")
    setFormData(dateFieldName, formatted)
    setDateOpen(false)
  }

  const handleSaveTime = () => {
    if (hour !== null && minute !== null) {
      // Save time in 12-hour format (e.g., "2:30 PM")
      const timeStr = `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`
      setFormData(timeFieldName, timeStr)
      setTimeOpen(false)
    }
  }

  const formatTimeDisplay = (time: string) => {
    if (!time) return ""
    
    // If already in 12-hour format, return as is
    if (/\d{1,2}:\d{2}\s*(AM|PM)$/i.test(time)) {
      // Normalize format (ensure proper spacing and case)
      const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
      if (match) {
        const hour = parseInt(match[1], 10)
        const minutes = match[2]
        const period = match[3].toUpperCase()
        return `${hour}:${minutes} ${period}`
      }
    }
    
    // If in 24-hour format, convert to 12-hour format
    const timeParsed = parseTimeString(time)
    if (timeParsed) {
      const { hours: hour24, minutes } = timeParsed
      const period = hour24 >= 12 ? "PM" : "AM"
      const displayHour = hour24 % 12 || 12
      return `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`
    }
    
    return time // Fallback: return original if parsing fails
  }

  const getHours = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1)
  }

  const handleHourSelect = (selectedHour: number) => {
    setHour(selectedHour)
    if (selectedHour === 12) {
      setAmPm("PM")
    } else if (selectedHour >= 1 && selectedHour <= 11) {
      setAmPm("AM")
    }
  }

  const scrollColumn = (ref: React.RefObject<HTMLDivElement | null>, direction: "up" | "down") => {
    if (ref.current) {
      const scrollAmount = 40 // Adjust based on item height
      const currentScroll = ref.current.scrollTop
      const newScroll = direction === "up"
        ? Math.max(0, currentScroll - scrollAmount)
        : currentScroll + scrollAmount
      ref.current.scrollTo({ top: newScroll, behavior: "smooth" })
    }
  }

  const scrollToSelected = (ref: React.RefObject<HTMLDivElement | null>, index: number) => {
    if (ref.current) {
      const itemHeight = 40 // Approximate height of each item
      const scrollPosition = index * itemHeight
      ref.current.scrollTo({ top: scrollPosition, behavior: "smooth" })
    }
  }

  // Scroll to selected values when they change
  useEffect(() => {
    if (timeOpen && hour !== null) {
      const hourIndex = getHours().indexOf(hour)
      if (hourIndex !== -1) {
        setTimeout(() => scrollToSelected(hourScrollRef, hourIndex), 100)
      }
    }
  }, [timeOpen, hour])

  useEffect(() => {
    if (timeOpen && minute !== null) {
      setTimeout(() => scrollToSelected(minuteScrollRef, minute), 100)
    }
  }, [timeOpen, minute])

  const dateFieldData = formData[dateFieldName] as FieldType<string>
  const timeFieldData = formData[timeFieldName] as FieldType<string>
  
  // Only show red border when there's an actual error set (not just when required and empty)
  const dateHasError = !!dateFieldData?.error
  const timeHasError = !!timeFieldData?.error

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3">
        {/* DATE PICKER */}
        <div className="relative w-full">
          <div
            className={`${className} rounded-lg px-4 py-3 border ${dateHasError ? "border-red-500" : "border-gray-200"
              }`}
          >
            <label className="block text-xs sm:text-sm font-medium text-text-gray mb-1">
              {dateLabel}
            </label>

            <div
              className={cn(
                "flex items-center gap-2 cursor-pointer bg-transparent",
                isDisable ? "opacity-50 cursor-not-allowed" : ""
              )}
              onClick={() => {
                if (isDisable) return
                setDateOpen((prev) => !prev)
                setTimeOpen(false)
              }}
            >
              <Calendar
                size={16}
                className="text-text-gray sm:w-[18px] sm:h-[18px]"
              />
              <div className={`text-sm sm:text-base truncate ${selectedDate ? "text-heading-black" : "text-text-gray"
                }`}>
                {selectedDate
                  ? format(getTZDateFromString(selectedDate), "dd MMM yyyy")
                  : "Select date"}
              </div>
            </div>
          </div>
          {dateOpen && (
            <>
              {/* Mobile Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 z-[100] sm:hidden"
                onClick={() => setDateOpen(false)}
              />

              {/* Calendar Popup */}
              <div
                className={cn(
                  // Mobile: Fixed bottom sheet modal
                  "fixed inset-x-0 bottom-0 z-[110] bg-white rounded-t-xl shadow-2xl",
                  "max-h-[85vh] overflow-y-auto",
                  // Desktop: Absolute positioning
                  "sm:absolute sm:top-full sm:mt-2 sm:bottom-auto sm:rounded-xl sm:shadow-2xl sm:border sm:border-gray-200",
                  "sm:w-[320px] sm:left-auto sm:right-0 sm:max-h-none sm:z-[110]",
                  "px-6 py-4 sm:p-4 flex flex-col"
                )}
              >
                {/* Cancel Header - Mobile Only */}
                <div className="bg-primary-yellow text-heading-black py-3 px-4 -mx-6 -mt-4 mb-4 sm:hidden relative z-10 rounded-t-xl flex items-center justify-between">
                  <span className="text-base font-medium">Select Date</span>
                  <button
                    type="button"
                    onClick={() => setDateOpen(false)}
                    className="p-1 hover:bg-heading-black/10 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Month and Year Display */}
                <div className="flex items-center justify-between mb-4 sm:mb-3">
                  {/* Left Arrow */}
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 rotate-180 text-gray-600" />
                  </button>

                  {/* Month/Year - Centered */}
                  <span className="font-bold text-lg sm:text-base sm:font-semibold text-center">
                    {format(currentMonth, "MMMM yyyy")}
                  </span>

                  {/* Right Arrow */}
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* Days of Week */}
                <div className="grid grid-cols-7 text-center text-xs sm:text-sm font-medium mb-2 text-gray-600">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 text-center text-sm gap-1">
                  {getCalendarDays().map((date, idx) => {
                    const inactive = date.getMonth() !== currentMonth.getMonth()
                    const today = getTodayTZ()
                    // Convert calendar date to specified timezone for proper comparison
                    const dateTZ = toZonedTime(date, timezone)
                    const dateStartOfDay = startOfDay(dateTZ)
                    
                    // Convert minSelectableDate to specified timezone if provided
                    const minDateTZ = minSelectableDate 
                      ? toZonedTime(minSelectableDate, timezone)
                      : null
                    const minDateStartOfDay = minDateTZ ? startOfDay(minDateTZ) : null
                    
                    // Convert excludeDate to specified timezone if provided
                    const excludeDateTZ = excludeDate 
                      ? toZonedTime(excludeDate, timezone)
                      : null
                    const excludeDateStartOfDay = excludeDateTZ ? startOfDay(excludeDateTZ) : null
                    
                    const disabled =
                      (minDateStartOfDay && isBefore(dateStartOfDay, minDateStartOfDay)) ||
                      (excludeDateStartOfDay && isSameDay(dateStartOfDay, excludeDateStartOfDay)) ||
                      isBefore(dateStartOfDay, today)

                    const isSelected =
                      selectedDate && isSameDay(dateTZ, getTZDateFromString(selectedDate))

                    return (
                      <div
                        key={idx}
                        onClick={() => !disabled && handleDateSelect(dateTZ)}
                        className={cn(
                          "py-1.5 sm:py-2 cursor-pointer transition-all text-sm sm:text-base flex items-center justify-center font-bold",
                          disabled
                            ? "text-gray-300 cursor-not-allowed"
                            : inactive
                              ? "text-gray-400"
                              : "hover:bg-gray-100 text-gray-900",
                          isSelected
                            ? "bg-primary-yellow text-heading-black font-semibold"
                            : ""
                        )}
                      >
                        {dateTZ.getDate()}
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* TIME PICKER */}
        <div className="relative w-full">
          <div
            className={`${className} rounded-lg px-4 py-2.5 border ${timeHasError ? "border-red-500" : "border-gray-200"
              }`}
          >
            <label className="block text-xs sm:text-sm font-medium text-text-gray mb-1">
              {timeLabel}
            </label>

            <div
              className={cn(
                "flex items-center gap-2 cursor-pointer bg-transparent",
                isDisable ? "opacity-50 cursor-not-allowed" : ""
              )}
              onClick={() => {
                if (isDisable) return
                setTimeOpen((prev) => !prev)
                setDateOpen(false)
              }}
            >
              <Clock
                size={16}
                className="text-text-gray sm:w-[18px] sm:h-[18px]"
              />
              <div className={`text-base sm:text-lg truncate ${selectedTime ? "text-heading-black" : "text-text-gray"
                }`}>
                {selectedTime
                  ? formatTimeDisplay(selectedTime)
                  : "Select time"}
              </div>
            </div>
          </div>

          {timeOpen && (
            <>
              {/* Mobile Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 z-[100] sm:hidden"
                onClick={() => setTimeOpen(false)}
              />

              {/* Time Picker Popup */}
              <div
                className={cn(
                  // Mobile: Fixed bottom sheet modal
                  "fixed inset-x-0 bottom-0 z-[110] bg-white rounded-t-xl shadow-2xl",
                  "max-h-[85vh] overflow-y-auto",
                  // Desktop: Absolute positioning
                  "sm:absolute sm:top-full sm:mt-2 sm:bottom-auto sm:rounded-xl sm:shadow-2xl sm:border sm:border-gray-200",
                  "sm:w-full sm:max-w-[420px] sm:left-auto sm:right-0 sm:max-h-none sm:z-[110]",
                  "px-6 py-4 sm:px-5 sm:py-5 flex flex-col"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Cancel Header - Mobile Only */}
                <div className="bg-primary-yellow text-heading-black py-3 px-4 -mx-6 -mt-4 mb-4 sm:hidden relative z-10 rounded-t-xl flex items-center justify-between">
                  <span className="text-base font-medium">Select Time</span>
                  <button
                    type="button"
                    onClick={() => setTimeOpen(false)}
                    className="p-1 hover:bg-heading-black/10 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Time Columns */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
                  {/* Hour Column */}
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1.5 sm:mb-2 text-center">
                      Hour
                    </label>
                    <div className="relative border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => scrollColumn(hourScrollRef, "up")}
                        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center bg-white hover:bg-gray-50 py-1 border-b border-gray-200"
                      >
                        <ChevronUp className="h-4 w-4 text-gray-600" />
                      </button>
                      <div
                        ref={hourScrollRef}
                        className="no-scrollbar overflow-hidden max-h-40 sm:max-h-48 overflow-y-scroll pt-6 pb-6"
                      >
                        {getHours().map((hourValue) => (
                          <button
                            key={hourValue}
                            type="button"
                            className={cn(
                              "w-full py-2 sm:py-2.5 text-sm sm:text-base font-medium transition-colors border-b border-gray-100 last:border-b-0",
                              hour === hourValue
                                ? "bg-primary-yellow text-heading-black"
                                : "bg-white text-heading-black hover:bg-light-background"
                            )}
                            onClick={() => handleHourSelect(hourValue)}
                          >
                            {hourValue.toString().padStart(2, "0")}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => scrollColumn(hourScrollRef, "down")}
                        className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-white hover:bg-gray-50 py-1 border-t border-gray-200"
                      >
                        <ChevronDown className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Minute Column */}
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1.5 sm:mb-2 text-center">
                      Minute
                    </label>
                    <div className="relative border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => scrollColumn(minuteScrollRef, "up")}
                        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center bg-white hover:bg-gray-50 py-1 border-b border-gray-200"
                      >
                        <ChevronUp className="h-4 w-4 text-gray-600" />
                      </button>
                      <div
                        ref={minuteScrollRef}
                        className="no-scrollbar overflow-hidden max-h-40 sm:max-h-48 overflow-y-scroll pt-6 pb-6"
                      >
                        {[...Array(60)].map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={cn(
                              "w-full py-2 sm:py-2.5 text-sm sm:text-base font-medium transition-colors border-b border-gray-100 last:border-b-0",
                              minute === i
                                ? "bg-primary-yellow text-heading-black"
                                : "bg-white text-heading-black hover:bg-light-background"
                            )}
                            onClick={() => setMinute(i)}
                          >
                            {i.toString().padStart(2, "0")}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => scrollColumn(minuteScrollRef, "down")}
                        className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-white hover:bg-gray-50 py-1 border-t border-gray-200"
                      >
                        <ChevronDown className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* AM/PM Column */}
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-600 mb-1.5 sm:mb-2 text-center">
                      Period
                    </label>
                    <div className="relative border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => scrollColumn(ampmScrollRef, "up")}
                        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center bg-white hover:bg-gray-50 py-1 border-b border-gray-200"
                      >
                        <ChevronUp className="h-4 w-4 text-gray-600" />
                      </button>
                      <div
                        ref={ampmScrollRef}
                        className="no-scrollbar overflow-hidden overflow-y-scroll pt-6 pb-6"
                      >
                        {["AM", "PM"].map((val) => (
                          <button
                            key={val}
                            type="button"
                            className={cn(
                              "w-full py-2 sm:py-2.5 text-sm sm:text-base font-medium transition-colors border-b border-gray-100 last:border-b-0",
                              ampm === val
                                ? "bg-primary-yellow text-heading-black"
                                : "bg-white text-heading-black hover:bg-light-background"
                            )}
                            onClick={() => setAmPm(val as "AM" | "PM")}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => scrollColumn(ampmScrollRef, "down")}
                        className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-white hover:bg-gray-50 py-1 border-t border-gray-200"
                      >
                        <ChevronDown className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveTime}
                    disabled={hour === null || minute === null}
                    className={cn(
                      "text-xs sm:text-sm font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg transition-all",
                      hour === null || minute === null
                        ? "bg-text-gray text-white cursor-not-allowed opacity-50"
                        : "bg-primary-yellow hover:bg-primary-yellow/90 text-heading-black"
                    )}
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
