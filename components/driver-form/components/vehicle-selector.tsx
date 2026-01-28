"use client";

import { useState, useRef } from "react";
import { Car, Loader2, ChevronDown } from "lucide-react";
import { useFleets } from "@/hooks/api/useFleets";
import type { FleetType } from "@/types/fleet.types";
import { cn } from "@/lib/utils";

interface VehicleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  touched?: boolean;
}

export function VehicleSelector({
  value,
  onChange,
  error = false,
  touched = false,
}: VehicleSelectorProps) {
  const [vehicleSearch, setVehicleSearch] = useState("");
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [isCustomVehicle, setIsCustomVehicle] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState<FleetType | null>(null);
  const { data: fleetsData, isLoading: fleetsLoading, error: fleetsError } =
    useFleets({}, { enabled: true });
  const fleets: FleetType[] = Array.isArray(fleetsData) ? fleetsData : [];

  // Find selected fleet from value
  const currentFleet = selectedFleet || fleets.find((f) => f.name === value) || null;

  const filteredVehicles = vehicleSearch
    ? fleets.filter((fleet) =>
        fleet.name.toLowerCase().includes(vehicleSearch.toLowerCase())
      )
    : fleets;
  const vehiclesToShow = showVehicleDropdown && !vehicleSearch ? fleets : filteredVehicles;
  
  // Display value: show search when typing, or show complete details when fleet is selected
  const getDisplayValue = () => {
    if (vehicleSearch !== undefined && vehicleSearch !== "") {
      return vehicleSearch;
    }
    if (currentFleet) {
      return currentFleet.cars 
        ? `${currentFleet.name} - ${currentFleet.cars}`
        : currentFleet.name;
    }
    return value || "";
  };
  
  const displayValue = getDisplayValue();
  const hasError = error && touched;

  const handleSelectFleet = (fleet: FleetType) => {
    onChange(fleet.name);
    setSelectedFleet(fleet);
    setVehicleSearch("");
    setShowVehicleDropdown(false);
    setIsCustomVehicle(false);
  };

  const handleCustomVehicle = () => {
    setIsCustomVehicle(true);
    setShowVehicleDropdown(false);
    setVehicleSearch("");
    onChange("");
  };

  const handleInputChange = (inputValue: string) => {
    setVehicleSearch(inputValue);
    // Clear selected fleet when user starts typing
    if (inputValue && selectedFleet) {
      setSelectedFleet(null);
    }
    onChange(inputValue);
    if (inputValue) {
      const exactMatch = fleets.find(
        (f) => f.name.toLowerCase() === inputValue.toLowerCase()
      );
      if (exactMatch) {
        setIsCustomVehicle(false);
        setShowVehicleDropdown(false);
        setSelectedFleet(exactMatch);
        onChange(exactMatch.name);
      } else {
        setIsCustomVehicle(true);
        setShowVehicleDropdown(true);
      }
    } else {
      onChange("");
      setIsCustomVehicle(false);
      setShowVehicleDropdown(true);
      setSelectedFleet(null);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowVehicleDropdown(false);
      if (vehicleSearch) {
        const matchedFleet = fleets.find((f) => f.name.toLowerCase() === vehicleSearch.toLowerCase());
        if (!matchedFleet) {
          setIsCustomVehicle(true);
          onChange(vehicleSearch);
          setSelectedFleet(null);
        } else {
          setIsCustomVehicle(false);
          setSelectedFleet(matchedFleet);
          onChange(matchedFleet.name);
          setVehicleSearch("");
        }
      } else if (value) {
        const matchedFleet = fleets.find((f) => f.name === value);
        if (matchedFleet) {
          setSelectedFleet(matchedFleet);
          setIsCustomVehicle(false);
        } else {
          setIsCustomVehicle(true);
          setSelectedFleet(null);
        }
        setVehicleSearch("");
      }
    }, 200);
  };

  return (
    <div
      className={cn(
        "w-full rounded-lg bg-white px-4 pt-3 pb-1 border relative",
        hasError ? "border-red-500" : "border-gray-200"
      )}
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Vehicle Type <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <Car className="absolute left-0 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
        {fleetsLoading && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
          </div>
        )}
        <input
          type="text"
          value={displayValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            setShowVehicleDropdown(true);
            // When focusing, if we have a selected fleet, clear the search to show the full details
            if (!vehicleSearch && currentFleet) {
              setVehicleSearch("");
            } else if (!vehicleSearch && value) {
              setVehicleSearch(value);
            }
          }}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (vehicleSearch) {
                const matchedFleet = fleets.find(
                  (f) => f.name.toLowerCase() === vehicleSearch.toLowerCase()
                );
                if (matchedFleet) {
                  handleSelectFleet(matchedFleet);
                } else {
                  setIsCustomVehicle(true);
                  onChange(vehicleSearch);
                  setSelectedFleet(null);
                  setShowVehicleDropdown(false);
                }
              }
            } else if (e.key === "Escape") {
              setShowVehicleDropdown(false);
            }
          }}
          placeholder={
            fleetsLoading
              ? "Loading vehicles..."
              : isCustomVehicle
              ? "Enter custom vehicle name"
              : "Search or select a vehicle"
          }
          className={cn(
            "w-full pl-8 pr-10 py-2.5 bg-transparent border-none outline-none text-heading-black placeholder:text-gray-400",
            fleetsLoading && "opacity-50 cursor-wait"
          )}
          disabled={fleetsLoading}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown 
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform duration-200",
              showVehicleDropdown && "transform rotate-180"
            )} 
          />
        </div>
      </div>
      {showVehicleDropdown && !fleetsLoading && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-72 overflow-hidden backdrop-blur-sm">
          <div className="max-h-72 overflow-y-auto">
            {fleetsError ? (
              <div className="px-4 py-4 text-center">
                <div className="text-sm font-medium text-red-600">Failed to load vehicles</div>
                <div className="text-xs text-red-500 mt-1">Please try again</div>
              </div>
            ) : (
              <>
                {!vehicleSearch && (
                  <div
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleCustomVehicle();
                    }}
                    className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors duration-150 border-b border-gray-100 group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-gray-400 group-hover:text-gray-600 transition-colors">+</span>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        Enter Custom Vehicle
                      </span>
                    </div>
                  </div>
                )}
                {vehiclesToShow.length > 0 ? (
                  <>
                    {vehiclesToShow.map((fleet) => (
                      <div
                        key={fleet._id || fleet.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectFleet(fleet);
                        }}
                        className={cn(
                          "px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-all duration-150 border-b border-gray-50 last:border-b-0 group",
                          fleet.name.toLowerCase() === vehicleSearch.toLowerCase() && "bg-blue-50 hover:bg-blue-100"
                        )}
                      >
                        <div className="flex flex-col">
                          <div className={cn(
                            "font-semibold text-sm mb-0.5 transition-colors",
                            fleet.name.toLowerCase() === vehicleSearch.toLowerCase() 
                              ? "text-blue-700" 
                              : "text-gray-900 group-hover:text-gray-950"
                          )}>
                            {fleet.name}
                          </div>
                          {fleet.cars && (
                            <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                              {fleet.cars}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {vehicleSearch && !vehiclesToShow.find(f => f.name.toLowerCase() === vehicleSearch.toLowerCase()) && (
                      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                        <div className="text-xs font-medium text-gray-600 mb-1">
                          Custom Vehicle
                        </div>
                        <div className="text-sm text-gray-500">
                          Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs font-mono">Enter</kbd> or click outside to use <span className="font-medium text-gray-700">"{vehicleSearch}"</span>
                        </div>
                      </div>
                    )}
                  </>
                ) : vehicleSearch ? (
                  <div className="px-4 py-6 text-center">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      No vehicles found matching "{vehicleSearch}"
                    </div>
                    <div className="text-xs text-gray-500">
                      You can use this as a custom vehicle name
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      No vehicles available
                    </div>
                    <div className="text-xs text-gray-500">
                      Enter a custom vehicle name
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

