'use client'

import { useRef } from 'react'
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { SlLocationPin } from 'react-icons/sl'
import useFormStore, { FieldType, FormDataType } from '@/stores/form-store'

const libraries: ('places')[] = ['places']

interface LocationInputProps {
  field: keyof FormDataType
  label: string
  placeholder: string
  index?: number
  isStop?: boolean
  onAddStop?: () => void
  onRemoveStop?: () => void
  showAddButton?: boolean
}

function locationInput({ field, label, placeholder, index }: LocationInputProps) {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const { formData, setFormData } = useFormStore()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries,
  })

  const handlePlaceChanged = () => {
    const autocomplete = autocompleteRef.current
    if (!autocomplete) return
    const place = autocomplete.getPlace()
    if (place.geometry?.location) {
      const coords = `${place.geometry.location.lat()},${place.geometry.location.lng()}`
      
      // Check if this is an airport location
      const isAirport = place.types?.some(type => 
        type === 'airport' || 
        type.includes('airport') ||
        place.name?.toLowerCase().includes('airport') ||
        place.name?.toLowerCase().includes('terminal')
      ) || false
      
      // Build address in format: Place Name, Street Address, City, Country (no postal code, no neighborhood)
      let address = ""
      
      if (place.address_components && place.name) {
        // Get place name
        const placeName = place.name
        
        // Get street address components
        const streetNumber = place.address_components.find(
          (comp) => comp.types.includes("street_number")
        )?.long_name
        const route = place.address_components.find(
          (comp) => comp.types.includes("route")
        )?.long_name
        
        // Get city (locality)
        const locality = place.address_components.find(
          (comp) => comp.types.includes("locality")
        )?.long_name
        
        // Get country
        const country = place.address_components.find(
          (comp) => comp.types.includes("country")
        )?.long_name
        
        // Build street address (number + route)
        const streetAddress = [streetNumber, route].filter(Boolean).join(" ")
        
        // Build final address: Place Name, Street Address, City, Country
        const addressParts: string[] = []
        
        if (placeName) addressParts.push(placeName)
        if (streetAddress) addressParts.push(streetAddress)
        if (locality) addressParts.push(locality)
        if (country) addressParts.push(country)
        
        address = addressParts.join(", ")
      } else {
        // Fallback: clean formatted_address to remove postal codes and neighborhoods
        address = place.formatted_address || place.name || ""
        // Remove postal codes (5 digits)
        address = address.replace(/,\s*\d{5}\s*/g, ", ")
        address = address.replace(/\s+\d{5}\s*/g, " ")
        // Remove neighborhood names like "Extramurs"
        address = address.replace(/,\s*Extramurs,?/gi, ",")
        address = address.replace(/,\s*$/, "").trim()
      }
      
      setFormData(field, address, coords, index)
      
      // If airport detected and this is fromLocation or toLocation, auto-set airport pickup
      if (isAirport && (field === 'fromLocation' || field === 'toLocation')) {
        // Use getState to access the store outside of hook context
        const store = useFormStore.getState()
        store.setFormData('isAirportPickup', true)
      }
    }
  }

  const handleInputChange = (value: string) => {
    setFormData(field, value, '', index)
  }
  
  const fieldData =
     field === "stops" 
      ? formData.stops[index!]
      : (formData[field as keyof FormDataType] as FieldType<string>)

  return (
    <div className={`w-full rounded-lg bg-gray-200 px-4 py-3 border ${fieldData?.error ? 'border-red-500' : 'border-gray-200'} `}>
      {/* Label inside box */}
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      {/* Input Field */}
      <div className="relative w-full">
        <SlLocationPin className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      {!isLoaded ? (
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
              componentRestrictions: { country: 'uk' },
              fields: ["name", "formatted_address", "geometry", "address_components", "types"]
            }}
          >
            <input
              value={fieldData?.value || ''}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={placeholder}
              className={`w-full pl-6 text-base bg-transparent text-gray-800 placeholder:text-gray-400 outline-none focus:text-gray-900 ${fieldData?.error ? 'text-red-600' : ''
                }`}
            />
        </Autocomplete>
        )}
        </div>
    </div>
  )
}

const LocationInput = locationInput;
export default LocationInput;
