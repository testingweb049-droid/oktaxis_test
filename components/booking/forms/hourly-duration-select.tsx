"use client"

import { useEffect, useState, useMemo } from "react"
import { Check, ChevronDown, Clock, Calendar, CalendarDays, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import useFormStore from "@/stores/form-store"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAllPackageOptions, type HourlyPackageOption, type PackageType } from "@/hooks/api/useHourlyPackageOptions"

interface PackageOption {
  value: string
  packageType: PackageType
  duration: number
  includedMiles: number
  minPrice: number
  maxPrice: number
  displayLabel: string
  detailLabel: string
  priceLabel: string
}

interface HourlyDurationSelectProps {
  placeholder?: string
  defaultDuration?: number
  defaultPackageType?: PackageType
}

const getPackageTypeIcon = (type: PackageType) => {
  switch (type) {
    case 'hourly':
      return Clock
    case 'day':
      return Calendar
    case 'week':
      return CalendarDays
    default:
      return Clock
  }
}

const getPackageTypeLabel = (type: PackageType): string => {
  switch (type) {
    case 'hourly':
      return 'Hourly'
    case 'day':
      return 'Daily'
    case 'week':
      return 'Weekly'
    default:
      return type
  }
}

const formatDurationLabel = (duration: number, type: PackageType): string => {
  switch (type) {
    case 'hourly':
      return `${duration} ${duration === 1 ? 'Hour' : 'Hours'}`
    case 'day':
      return `${duration} ${duration === 1 ? 'Day' : 'Days'}`
    case 'week':
      return `${duration} ${duration === 1 ? 'Week' : 'Weeks'}`
    default:
      return `${duration}`
  }
}

export default function HourlyDurationSelect({
  placeholder = "Select Duration",
  defaultDuration = 2,
  defaultPackageType = 'hourly',
}: HourlyDurationSelectProps) {
  const { formData, setFormData } = useFormStore()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  // Fetch all package options from backend
  const { data: allPackageOptions, isLoading, error: fetchError } = useAllPackageOptions({
    enabled: true,
  })

  const value = formData.duration?.value ? String(formData.duration.value) : ""
  const formError = formData.duration?.error

  // Transform all package options to dropdown format
  const { options, groupedOptions } = useMemo(() => {
    if (!allPackageOptions) {
      return { options: [], groupedOptions: { hourly: [], day: [], week: [] } }
    }

    const transformPackages = (packages: HourlyPackageOption[], type: PackageType): PackageOption[] => {
      return packages.map((pkg) => ({
        value: `${type}-${pkg.duration}`,
        packageType: type,
        duration: pkg.duration,
        includedMiles: pkg.includedMiles,
        minPrice: pkg.minPrice,
        maxPrice: pkg.maxPrice,
        displayLabel: formatDurationLabel(pkg.duration, type),
        detailLabel: `${pkg.includedMiles} miles included`,
        priceLabel: pkg.minPrice === pkg.maxPrice 
          ? `£${pkg.minPrice}` 
          : `from £${pkg.minPrice}`,
      }))
    }

    const hourlyOptions = transformPackages(allPackageOptions.hourly || [], 'hourly')
    const dayOptions = transformPackages(allPackageOptions.day || [], 'day')
    const weekOptions = transformPackages(allPackageOptions.week || [], 'week')

    return {
      options: [...hourlyOptions, ...dayOptions, ...weekOptions],
      groupedOptions: {
        hourly: hourlyOptions,
        day: dayOptions,
        week: weekOptions,
      },
    }
  }, [allPackageOptions])

  // Filter options based on search
  const filteredGroupedOptions = useMemo(() => {
    if (!search) return groupedOptions
    
    const searchLower = search.toLowerCase()
    const filterOptions = (opts: PackageOption[]) => 
      opts.filter(
        (opt) =>
          opt.displayLabel.toLowerCase().includes(searchLower) ||
          opt.detailLabel.toLowerCase().includes(searchLower) ||
          opt.priceLabel.toLowerCase().includes(searchLower)
      )

    return {
      hourly: filterOptions(groupedOptions.hourly),
      day: filterOptions(groupedOptions.day),
      week: filterOptions(groupedOptions.week),
    }
  }, [groupedOptions, search])

  // Check if there are any filtered results
  const hasResults = useMemo(() => {
    return (
      filteredGroupedOptions.hourly.length > 0 ||
      filteredGroupedOptions.day.length > 0 ||
      filteredGroupedOptions.week.length > 0
    )
  }, [filteredGroupedOptions])

  // Get selected option details
  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === value)
  }, [options, value])

  // Set default duration when options load
  useEffect(() => {
    if (!isLoading && options.length > 0 && !value) {
      const defaultOpt = options.find(
        (opt) => opt.packageType === defaultPackageType && opt.duration === defaultDuration
      ) || options[0]
      if (defaultOpt) {
        setFormData('duration', defaultOpt.value)
      }
    }
  }, [isLoading, options, value, defaultDuration, defaultPackageType, setFormData])

  const handleSelect = (val: string) => {
    setFormData('duration', val)
    setOpen(false)
  }

  // Reset search when popover closes
  useEffect(() => {
    if (!open) {
      setSearch("")
    }
  }, [open])

  const SelectedIcon = selectedOption ? getPackageTypeIcon(selectedOption.packageType) : Clock

  const renderOptionGroup = (opts: PackageOption[], type: PackageType) => {
    if (opts.length === 0) return null
    
    const Icon = getPackageTypeIcon(type)
    const label = getPackageTypeLabel(type)

    return (
      <div key={type} className="py-1">
        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2 bg-gray-50">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </div>
        {opts.map((opt) => (
          <CommandItem
            key={opt.value}
            value={opt.value}
            onSelect={() => handleSelect(opt.value)}
            className={cn(
              "flex items-center justify-between px-3 py-3 text-[14px] rounded-md transition-colors cursor-pointer mx-1",
              value === opt.value
                ? "bg-primary text-white font-medium"
                : "text-gray-700 hover:bg-primary/10 hover:text-primary"
            )}
          >
            <span className="font-medium">{opt.displayLabel}</span>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-sm",
                value === opt.value ? "text-white/80" : "text-gray-500"
              )}>
                {opt.includedMiles} miles
              </span>
              {value === opt.value && (
                <Check className="h-4 w-4 text-white" />
              )}
            </div>
          </CommandItem>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full rounded-lg bg-gray-200 px-4 py-2 border border-gray-200">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {placeholder}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={isLoading}
            className={cn(
              "w-full flex items-center gap-2 text-base font-medium bg-transparent text-gray-800 rounded-lg py-1.5 focus:outline-none disabled:opacity-50",
              formError ? "text-red-600" : ""
            )}
          >
            {isLoading ? (
              <Loader2 className="text-gray-500 animate-spin" size={18} />
            ) : (
              <SelectedIcon className="text-gray-500" size={18} />
            )}
            <span className={`flex-1 truncate text-left ${value ? "text-gray-800" : "text-gray-400"}`}>
              {isLoading ? (
                "Loading..."
              ) : selectedOption ? (
                <span className="flex items-center gap-2">
                  <span>{selectedOption.displayLabel}</span>
                  <span className="text-sm text-gray-500">({selectedOption.includedMiles} miles)</span>
                </span>
              ) : (
                placeholder
              )}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </PopoverTrigger>
        
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-200 shadow-xl rounded-xl z-[9999]"
          sideOffset={6}
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search duration..."
              value={search}
              onValueChange={setSearch}
              className="border-b border-gray-100 px-3 py-2 text-[14px] text-gray-800 placeholder:text-gray-400 focus:ring-0"
            />
            
            {fetchError && (
              <div className="text-red-500 text-sm px-3 py-2">
                Failed to load options. Please try again.
              </div>
            )}
            
            {!hasResults && (
              <CommandEmpty className="text-gray-400 px-3 py-2">
                No durations found.
              </CommandEmpty>
            )}
            
            <CommandGroup>
              <ScrollArea className="max-h-80 overflow-y-auto">
                {renderOptionGroup(filteredGroupedOptions.hourly, 'hourly')}
                {renderOptionGroup(filteredGroupedOptions.day, 'day')}
                {renderOptionGroup(filteredGroupedOptions.week, 'week')}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      
      {formError && (
        <p className="text-xs text-red-500 mt-1">{formError}</p>
      )}
    </div>
  )
}
