'use client'

import { useState, useEffect, useRef } from "react"
import { Clock3 } from 'lucide-react'
import { useFormikContext } from "formik"
import { cn } from "@/lib/utils"

const CustomTimeSelector = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext<any>()
  const [hours, setHours] = useState("HH")
  const [minutes, setMinutes] = useState("MM")
  const [showPicker, setShowPicker] = useState(false)
  const [dropdownDirection, setDropdownDirection] = useState("down")

  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLDivElement | null>(null)

  const hoursOptions = Array.from({ length: 23 }, (_, i) => (i + 1).toString().padStart(2, "0"))
  const minutesOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))
  // const periodOptions = ["AM", "PM"]

  useEffect(() => {
    if (values.time) {
      const [time, ampm] = values.time.split(" ")
      const [selectedHours, selectedMinutes] = time.split(":")
      setHours(selectedHours)
      setMinutes(selectedMinutes)
    }
  }, [values.time])

  const updateFormikTime = () => {
    if (hours !== "HH" && minutes !== "MM" ) {
      const selectedTime = `${hours}:${minutes}`
      setFieldValue("time", selectedTime)
      setShowPicker(false);
    }
  }

  useEffect(() => {
    updateFormikTime()
  }, [hours, minutes])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowPicker(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Update dropdown width to match input field width
  useEffect(() => {
    if (showPicker && dropdownRef.current && inputRef.current) {
      const inputWidth = inputRef.current.offsetWidth
      dropdownRef.current.style.width = `${inputWidth}px`
    }
  }, [showPicker])

  const checkDropdownPosition = () => {
    if (dropdownRef.current) {
      const { bottom } = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setDropdownDirection(bottom > windowHeight ? "up" : "down");
    }
  };
  

  useEffect(() => {
    window.addEventListener("resize", checkDropdownPosition)
    return () => window.removeEventListener("resize", checkDropdownPosition)
  }, [])

  const errorMessage = touched.time && typeof errors.time === "string" ? errors.time : null

  return (
    <div ref={containerRef} className="flex flex-col w-full">
      <div 
        ref={inputRef}
        className="relative bg-white rounded-lg flex items-center w-full h-[54px] flex-row-reverse md:flex-row"
      >
        <div className="flex bg-gray-50 w-[95px] md:w-32 items-center py-[26px] rounded-r-lg md:rounded-r-none md:rounded-l-lg">
          <Clock3 className="absolute right-5 md:left-[30px] top-[17px] text-2xl text-gray-950" />
        </div>

        <div 
          className="flex gap-x-3 font-normal text-[16px] cursor-pointer w-full pl-4"
          onClick={() => setShowPicker(!showPicker)}
        >
          <div>{hours}</div>:<div>{minutes}</div>
         
        </div>

        {showPicker && (
          <div
            ref={dropdownRef}
            className={cn(
              "absolute !z-[1000] left-0 border border-gray-300",
              dropdownDirection === "up" ? "bottom-full mb-2" : "top-full mt-2",
              "bg-white shadow-lg rounded-lg p-4 grid grid-cols-2 gap-4"
            )}
          >
            {/* Hours Column */}
            <div className="space-y-2">
              <div className="font-medium text-base text-gray-600 px-3">Hour</div>
              <div className="grid grid-cols-1 gap-1 max-h-[200px] overflow-y-auto no-scrollbar bg-gray-100 rounded-md">
                {hoursOptions.map((hour) => (
                  <div
                    key={hour}
                    className={cn(
                      "py-2 px-3 text-center rounded-md cursor-pointer transition-colors",
                      hours === hour 
                        ? "bg-black text-white" 
                        : "hover:bg-gray-700 hover:text-white"
                    )}
                    onClick={() => setHours(hour)}
                  >
                    {hour}
                  </div>
                ))}
              </div>
            </div>

            {/* Minutes Column */}
            <div className="space-y-2">
              <div className="font-medium text-base text-gray-600 px-3">Minute</div>
              <div className="grid grid-cols-1 gap-1 max-h-[200px] overflow-y-auto no-scrollbar bg-gray-100 rounded-md">
                {minutesOptions.map((minute) => (
                  <div
                    key={minute}
                    className={cn(
                      "py-2 px-3 text-center rounded-md cursor-pointer transition-colors",
                      minutes === minute 
                        ? "bg-black text-white" 
                        : "hover:bg-gray-700 hover:text-white"
                    )}
                    onClick={() => setMinutes(minute)}
                  >
                    {minute}
                  </div>
                ))}
              </div>
            </div>

            {/* Period Column */}
            {/* <div className="space-y-2">
              <div className="font-medium text-base text-gray-600">Period</div>
              <div className="grid grid-cols-1 gap-1">
                {periodOptions.map((p) => (
                  <div
                    key={p}
                    className={cn(
                      "py-2 px-3 text-center rounded-md cursor-pointer transition-colors",
                      period === p 
                        ? "bg-black text-white" 
                        : "hover:bg-gray-700 hover:text-white"
                    )}
                    onClick={() => setPeriod(p)}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        )}
      </div>

      {errorMessage && <p className="text-red-500 text-xs pl-2">{errorMessage}</p>}
    </div>
  )
}

export default CustomTimeSelector

