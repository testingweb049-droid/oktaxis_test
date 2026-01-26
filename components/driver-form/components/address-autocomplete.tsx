"use client";

import { useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { SlLocationPin } from "react-icons/sl";
import { cn } from "@/lib/utils";

const libraries: ("places")[] = ["places"];

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string) => void;
  error?: boolean;
  touched?: boolean;
  label?: string;
}

export function AddressAutocomplete({
  value,
  onChange,
  error = false,
  touched = false,
  label = "Your Address",
}: AddressAutocompleteProps) {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { isLoaded: isMapsLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries,
  });

  const handlePlaceChanged = () => {
    const autocomplete = autocompleteRef.current;
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    if (place.geometry?.location) {
      // Build address in format: Place Name, Street Address, City, Country
      let address = "";

      if (place.address_components && place.name) {
        const placeName = place.name;
        const streetNumber = place.address_components.find((comp) =>
          comp.types.includes("street_number")
        )?.long_name;
        const route = place.address_components.find((comp) =>
          comp.types.includes("route")
        )?.long_name;
        const locality = place.address_components.find((comp) =>
          comp.types.includes("locality")
        )?.long_name;
        const country = place.address_components.find((comp) =>
          comp.types.includes("country")
        )?.long_name;

        const streetAddress = [streetNumber, route].filter(Boolean).join(" ");
        const addressParts: string[] = [];

        if (placeName) addressParts.push(placeName);
        if (streetAddress) addressParts.push(streetAddress);
        if (locality) addressParts.push(locality);
        if (country) addressParts.push(country);

        address = addressParts.join(", ");
      } else {
        address = place.formatted_address || place.name || "";
      }

      onChange(address);
    }
  };

  const hasError = error && touched;

  return (
    <div
      className={cn(
        "w-full rounded-lg bg-white px-4 py-3 border",
        hasError ? "border-red-500" : "border-gray-200"
      )}
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative w-full">
        <SlLocationPin className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
        {!isMapsLoaded ? (
          <input
            placeholder="Loading..."
            disabled
            className="w-full pl-6 text-base bg-transparent text-gray-500 placeholder:text-gray-400 outline-none cursor-not-allowed"
          />
        ) : (
          <Autocomplete
            onLoad={(auto) => (autocompleteRef.current = auto)}
            onPlaceChanged={handlePlaceChanged}
            options={{
              componentRestrictions: { country: "uk" },
              fields: [
                "name",
                "formatted_address",
                "geometry",
                "address_components",
                "types",
              ],
            }}
          >
            <input
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter your address"
              className={cn(
                "w-full pl-6 text-base bg-transparent text-gray-800 placeholder:text-gray-400 outline-none focus:text-gray-900",
                hasError && "text-red-600"
              )}
            />
          </Autocomplete>
        )}
      </div>
    </div>
  );
}

