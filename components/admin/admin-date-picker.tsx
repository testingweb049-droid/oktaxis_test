"use client";

import * as React from "react";
import {
  addMonths,
  eachDayOfInterval,
  format,
  getDay,
  isBefore,
  isSameDay,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { Calendar, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";

const UK_TIMEZONE = "Europe/London";

interface AdminDatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minSelectableDate?: Date | null;
  placeholder?: string;
  className?: string;
}

export function AdminDatePicker({
  label,
  value,
  onChange,
  minSelectableDate,
  placeholder,
  className = "bg-white",
}: AdminDatePickerProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const getUKTime = React.useCallback(
    () => toZonedTime(new Date(), UK_TIMEZONE),
    [],
  );

  const [currentMonth, setCurrentMonth] = React.useState<Date>(getUKTime);
  const [dateOpen, setDateOpen] = React.useState(false);

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const getCalendarDays = React.useCallback(() => {
    const startOfCurrentMonth = startOfMonth(currentMonth);
    const startDayOfWeek = (getDay(startOfCurrentMonth) + 6) % 7;
    const startDate = new Date(startOfCurrentMonth);
    startDate.setDate(startOfCurrentMonth.getDate() - startDayOfWeek);

    const days = eachDayOfInterval({
      start: startDate,
      end: new Date(startDate.getTime() + 41 * 24 * 60 * 60 * 1000),
    });

    return days;
  }, [currentMonth]);

  const getUKDateFromString = React.useCallback(
    (dateString: string): Date => {
      if (!dateString) return getUKTime();
      const [year, month, day] = dateString.split("-").map(Number);
      const ukDate = new Date(year, month - 1, day, 0, 0, 0, 0);
      return fromZonedTime(ukDate, UK_TIMEZONE);
    },
    [getUKTime],
  );

  const getTodayUK = React.useCallback(() => {
    const now = getUKTime();
    return startOfDay(now);
  }, [getUKTime]);

  const effectivePlaceholder = placeholder ?? label;

  const displayValue = React.useMemo(() => {
    // When no value is selected, always show the provided placeholder text
    // (or fall back to the label via `effectivePlaceholder`).
    if (!value) return effectivePlaceholder;

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return effectivePlaceholder;
    return format(parsed, "dd/MM/yyyy");
  }, [value, effectivePlaceholder]);

  const isFilled = !!value;

  React.useEffect(() => {
    if (!dateOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setDateOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dateOpen]);

  return (
    <div className="w-full md:max-w-xs" ref={containerRef}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setDateOpen(true)}
          className={cn(
            className,
            // Match admin filter field styling (height, border, background, text)
            "flex h-9 w-full items-center justify-between rounded-lg border border-input/60 bg-white px-3 text-left text-xs md:text-sm font-medium text-heading-black",
          )}
        >
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <Calendar className="h-3.5 w-3.5 text-heading-black" />
            <span className="text-heading-black">
              {displayValue}
            </span>
          </div>
        </button>

        {dateOpen && (
          <>
            {/* Mobile Backdrop */}
            <div
              className="fixed inset-0 z-[100] bg-black/50 sm:hidden"
              onClick={() => setDateOpen(false)}
            />

            {/* Calendar Popup */}
            <div
              className={cn(
                "fixed inset-x-0 bottom-0 z-[110] max-h-[85vh] overflow-y-auto rounded-t-xl bg-white px-6 py-4 shadow-2xl sm:absolute sm:bottom-auto sm:left-0 sm:right-auto sm:top-full sm:mt-2 sm:max-h-none sm:w-[320px] sm:rounded-xl sm:border sm:border-gray-200 sm:px-4 sm:py-3",
              )}
            >
              {/* Mobile header */}
              <div className="mb-4 -mt-4 -mx-6 flex items-center justify-between rounded-t-xl bg-primary-yellow px-4 py-3 text-heading-black sm:hidden">
                <span className="text-base font-medium">
                  {label || "Select date"}
                </span>
                <button
                  type="button"
                  onClick={() => setDateOpen(false)}
                  className="rounded-full p-1 hover:bg-heading-black/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Month selector */}
              <div className="mb-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                >
                  <ChevronRight className="h-5 w-5 rotate-180 text-gray-600" />
                </button>
                <span className="text-center text-sm font-semibold sm:text-base">
                  {format(currentMonth, "MMMM yyyy")}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Days of week */}
              <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-gray-600 sm:text-sm">
                {daysOfWeek.map((day) => (
                  <div key={day} className="py-1.5">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {getCalendarDays().map((date, idx) => {
                  const inactive = date.getMonth() !== currentMonth.getMonth();
                  const today = getTodayUK();
                  const dateUK = toZonedTime(date, UK_TIMEZONE);
                  const dateStartOfDay = startOfDay(dateUK);

                  const minDateUK = minSelectableDate
                    ? toZonedTime(minSelectableDate, UK_TIMEZONE)
                    : null;
                  const minDateStartOfDay = minDateUK
                    ? startOfDay(minDateUK)
                    : null;

                  const disabled =
                    (minDateStartOfDay &&
                      isBefore(dateStartOfDay, minDateStartOfDay)) ||
                    isBefore(dateStartOfDay, today);

                  const isSelected =
                    value &&
                    isSameDay(dateUK, getUKDateFromString(value));

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        if (disabled) return;
                        const selected = toZonedTime(dateUK, UK_TIMEZONE);
                        const formatted = format(selected, "yyyy-MM-dd");
                        onChange(formatted);
                        setDateOpen(false);
                      }}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium sm:h-9 sm:w-9 sm:text-sm",
                        disabled
                          ? "cursor-not-allowed text-gray-300"
                          : inactive
                            ? "text-gray-400 hover:bg-gray-100"
                            : "text-gray-700 hover:bg-gray-100",
                        isSelected &&
                          "bg-primary-yellow text-heading-black hover:bg-primary-yellow",
                      )}
                    >
                      {dateUK.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


