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
import { cn } from "@/lib/utils"
import useFormStore, { FieldType, FormDataType } from "@/stores/FormStore"

const UK_TIMEZONE = "Europe/London"

interface DateTimePickerProps {
  selectedDate: string
  selectedTime: string
  placeholder: string
  setFormData: (
    key: keyof FormDataType,
    value: string | number | boolean,
    coardinates?: string,
    index?: number
  ) => void
  dateFieldName: keyof FormDataType
  timeFieldName: keyof FormDataType
  minSelectableDate?: Date | null
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
  placeholder,
  isDisable,
  dateLabel = "Pickup date",
  timeLabel = "Pickup time",
  className = "bg-white",
}: DateTimePickerProps) {
  // Get current time in UK timezone
  const getUKTime = () => toZonedTime(new Date(), UK_TIMEZONE)
  const [currentMonth, setCurrentMonth] = useState(getUKTime())
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
      const [hours, minutes] = selectedTime.split(":")
      const hour24 = parseInt(hours)
      const minuteVal = parseInt(minutes)

      const hour12 = hour24 % 12 || 12
      setHour(hour12)
      setAmPm(hour24 >= 12 ? "PM" : "AM")
      setMinute(minuteVal)
    } else if (timeOpen && !selectedTime) {
      // Reset when opening without a selected time
      setHour(null)
      setMinute(null)
      setAmPm("AM")
    }
  }, [timeOpen, selectedTime])

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
  
  // Helper to get UK timezone date from string
  const getUKDateFromString = (dateString: string): Date => {
    if (!dateString) return getUKTime()
    // Parse the date string (format: yyyy-MM-dd)
    // Create date at midnight in UK timezone
    const [year, month, day] = dateString.split('-').map(Number)
    // Create a date representing midnight in UK timezone
    // We use fromZonedTime to treat the date as if it's in UK timezone
    const ukDate = new Date(year, month - 1, day, 0, 0, 0, 0)
    // Convert from UK timezone perspective to actual Date object
    return fromZonedTime(ukDate, UK_TIMEZONE)
  }
  
  // Helper to get today's date in UK timezone
  const getTodayUK = () => {
    const now = getUKTime()
    return startOfDay(now)
  }

  const handleDateSelect = (date: Date) => {
    // Convert the selected date to UK timezone and format it
    // The date from calendar is in local time, convert to UK timezone first
    const ukDate = toZonedTime(date, UK_TIMEZONE)
    const formatted = format(ukDate, "yyyy-MM-dd")
    setFormData(dateFieldName, formatted)
    setDateOpen(false)
  }

  const handleSaveTime = () => {
    if (hour !== null && minute !== null) {
      let hours24 = ampm === "PM" && hour < 12 ? hour + 12 : hour
      if (ampm === "AM" && hour === 12) hours24 = 0

      const timeStr = `${hours24.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`
      setFormData(timeFieldName, timeStr)
      setTimeOpen(false)
    }
  }

  const formatTimeDisplay = (time: string) => {
    if (!time) return ""
    const [hours, minutes] = time.split(":")
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
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
                  ? format(getUKDateFromString(selectedDate), "dd MMM yyyy")
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
                    const today = getTodayUK()
                    // Convert calendar date to UK timezone for proper comparison
                    const dateUK = toZonedTime(date, UK_TIMEZONE)
                    const dateStartOfDay = startOfDay(dateUK)
                    
                    // Convert minSelectableDate to UK timezone if provided
                    const minDateUK = minSelectableDate 
                      ? toZonedTime(minSelectableDate, UK_TIMEZONE)
                      : null
                    const minDateStartOfDay = minDateUK ? startOfDay(minDateUK) : null
                    
                    const disabled =
                      (minDateStartOfDay && isBefore(dateStartOfDay, minDateStartOfDay)) ||
                      isBefore(dateStartOfDay, today)

                    const isSelected =
                      selectedDate && isSameDay(dateUK, getUKDateFromString(selectedDate))

                    return (
                      <div
                        key={idx}
                        onClick={() => !disabled && handleDateSelect(dateUK)}
                        className={cn(
                          "py-1.5 sm:py-2 cursor-pointer transition-all text-sm sm:text-base flex items-center justify-center font-bold",
                          disabled
                            ? "text-gray-300 cursor-not-allowed"
                            : inactive
                              ? "text-gray-400"
                              : "hover:bg-gray-100 text-gray-700",
                          isSelected
                            ? "bg-primary-yellow text-heading-black font-semibold"
                            : ""
                        )}
                      >
                        {dateUK.getDate()}
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
            className={`${className} rounded-lg px-4 py-3 border ${timeHasError ? "border-red-500" : "border-gray-200"
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
              <div className={`text-sm sm:text-base truncate ${selectedTime ? "text-heading-black" : "text-text-gray"
                }`}>
                {selectedTime
                  ? formatTimeDisplay(selectedTime)
                  : "Select time"}
              </div>
            </div>
          </div>

          {timeOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/20 z-[100]"
                onClick={() => setTimeOpen(false)}
              />

              {/* Time Picker Popup */}
              <div
                className={cn(
                  // Absolute positioning for both mobile and desktop
                  "absolute top-full mt-2 z-[110] bg-white rounded-xl shadow-2xl border border-gray-200",
                  "w-full max-w-[320px] left-auto right-0",
                  "px-5 py-5 flex flex-col"
                )}
                onClick={(e) => e.stopPropagation()}
              >

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
                              "w-full py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors border-b border-gray-100 last:border-b-0",
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
                              "w-full py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors border-b border-gray-100 last:border-b-0",
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
                              "w-full py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors border-b border-gray-100 last:border-b-0",
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
