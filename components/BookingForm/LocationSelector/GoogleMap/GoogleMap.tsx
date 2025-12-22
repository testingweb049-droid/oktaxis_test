'use client'
import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const fullWidthSectionStyle = {
  width: '100%',
  height: '400px',
};

// Default center coordinates for the map, can be adjusted to any desired location
const defaultCenter = {
  lat: 45.483033272094985,
  lng: -122.8461449,
};

function Map() {
  // Load the Google Maps JavaScript API with the 'places' library
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],  // Adds the 'places' library for additional functionalities
  });

  // State to store the Google Map instance, allowing further customization and control
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Callback function to handle map load event
  // Sets the initial center and zoom level for the map
  const onLoad = useCallback((map: google.maps.Map) => {
    map.setZoom(10);  // Adjust initial zoom level as needed
    map.setCenter(defaultCenter);  // Center the map on default location
    setMap(map);  // Save map instance to state
  }, []);

  // Callback function to handle map unmount event
  // Clears the map instance when the component is unmounted to avoid memory leaks
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="max-w-screen-2xl mx-auto flex justify-center rounded-xl w-full border">
      <GoogleMap
        mapContainerStyle={fullWidthSectionStyle}  // Set map container dimensions
        center={defaultCenter}  // Set initial center
        zoom={10}  // Set initial zoom level
        onLoad={onLoad}  // Trigger onLoad when map is fully loaded
        onUnmount={onUnmount}  // Trigger onUnmount when map is unmounted
      >
        {/* Marker to indicate the center location */}
        <Marker
          position={defaultCenter}  // Position marker at default center
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",  // Custom icon for marker
          }}
        />
      </GoogleMap>
    </div>
  ) : (
    // Fallback content shown while the Google Map is loading
    <div className="flex justify-center py-20 text-center rounded-xl h-[400px] items-center w-full bg-blue-300 text-white font-semibold text-3xl max-w-screen-2xl mx-auto px-5">
      Google Map Loading...
    </div>
  );
}

export default React.memo(Map);
