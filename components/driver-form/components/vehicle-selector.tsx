"use client";

import { useState, useRef } from "react";
import { Car, Loader2 } from "lucide-react";
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
  const { data: fleetsData, isLoading: fleetsLoading, error: fleetsError } =
    useFleets({}, { enabled: true });
  const fleets: FleetType[] = Array.isArray(fleetsData) ? fleetsData : [];

  const filteredVehicles = vehicleSearch
    ? fleets.filter((fleet) =>
        fleet.name.toLowerCase().includes(vehicleSearch.toLowerCase())
      )
    : fleets;

  // Show all vehicles in dropdown when no search or when dropdown first opens
  const vehiclesToShow = showVehicleDropdown && !vehicleSearch ? fleets : filteredVehicles;

  const isCurrentValueCustom =
    value && !fleets.find((f) => f.name.toLowerCase() === value.toLowerCase());
  const displayValue = vehicleSearch !== undefined && vehicleSearch !== "" ? vehicleSearch : (value || "");
  const hasError = error && touched;

  const handleSelectFleet = (fleetName: string) => {
    onChange(fleetName);
    setVehicleSearch(fleetName);
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
    onChange(inputValue);

    // If user is typing and it doesn't match any fleet, allow custom input
    if (inputValue) {
      const exactMatch = fleets.find(
        (f) => f.name.toLowerCase() === inputValue.toLowerCase()
      );
      if (exactMatch) {
        setIsCustomVehicle(false);
        setShowVehicleDropdown(false);
      } else {
        // Allow custom vehicle input
        setIsCustomVehicle(true);
        setShowVehicleDropdown(true);
      }
    } else {
      onChange("");
      setIsCustomVehicle(false);
      setShowVehicleDropdown(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowVehicleDropdown(false);
      // Keep the current value if it's a custom vehicle or matches a fleet
      if (vehicleSearch) {
        const matchedFleet = fleets.find((f) => f.name.toLowerCase() === vehicleSearch.toLowerCase());
        if (!matchedFleet) {
          // It's a custom vehicle
          setIsCustomVehicle(true);
          onChange(vehicleSearch);
        } else {
          // It matches a fleet
          setIsCustomVehicle(false);
          onChange(matchedFleet.name);
          setVehicleSearch(matchedFleet.name);
        }
      } else if (value) {
        // Restore the value if search is empty
        setVehicleSearch(value);
        const matchedFleet = fleets.find((f) => f.name === value);
        setIsCustomVehicle(!matchedFleet);
      }
    }, 200);
  };

  return (
    <div
      className={cn(
        "w-full rounded-lg bg-white px-4 py-3 border relative",
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
            if (!vehicleSearch && value) {
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
                  handleSelectFleet(matchedFleet.name);
                } else {
                  // Use as custom vehicle
                  setIsCustomVehicle(true);
                  onChange(vehicleSearch);
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
            "w-full pl-8 pr-10 py-2 bg-transparent border-none outline-none text-heading-black",
            fleetsLoading && "opacity-50"
          )}
          disabled={fleetsLoading}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            className="text-gray-400"
          >
            <path fill="currentColor" d="M6 9L1 4h10z" />
          </svg>
        </div>
        {showVehicleDropdown && !fleetsLoading && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {fleetsError ? (
              <div className="px-4 py-3 text-center text-red-500">
                Failed to load vehicles. Please try again.
              </div>
            ) : (
              <>
                {!vehicleSearch && (
                  <div
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleCustomVehicle();
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-heading-black border-b border-gray-200 font-medium"
                  >
                    + Enter Custom Vehicle
                  </div>
                )}
                {vehiclesToShow.length > 0 ? (
                  <>
                    {vehiclesToShow.map((fleet) => (
                      <div
                        key={fleet._id || fleet.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectFleet(fleet.name);
                        }}
                        className={cn(
                          "px-4 py-2.5 hover:bg-gray-100 cursor-pointer text-heading-black border-b border-gray-100 last:border-b-0",
                          fleet.name.toLowerCase() === vehicleSearch.toLowerCase() && "bg-blue-50"
                        )}
                      >
                        <div className="flex flex-col">
                          <div className="font-semibold text-sm text-gray-900 mb-1">
                            {fleet.name}
                          </div>
                          {fleet.cars && (
                            <div className="text-xs text-gray-600">
                              {fleet.cars}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {vehicleSearch && !vehiclesToShow.find(f => f.name.toLowerCase() === vehicleSearch.toLowerCase()) && (
                      <div className="px-4 py-2 border-t border-gray-200 text-sm text-gray-600">
                        Press Enter or click outside to use "{vehicleSearch}" as custom vehicle
                      </div>
                    )}
                  </>
                ) : vehicleSearch ? (
                  <div className="px-4 py-3 text-center text-gray-500">
                    <div className="mb-2">No vehicles found matching "{vehicleSearch}"</div>
                    <div className="text-xs">You can use this as a custom vehicle name</div>
                  </div>
                ) : (
                  <div className="px-4 py-3 text-center text-gray-500">
                    No vehicles available. Enter a custom vehicle name.
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {isCustomVehicle && (
        <p className="text-xs text-gray-500 mt-1">
          Custom vehicle mode - you can type any vehicle name
        </p>
      )}
    </div>
  );
}

