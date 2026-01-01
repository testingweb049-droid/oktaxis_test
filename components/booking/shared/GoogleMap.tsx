"use client";

import { useEffect, useRef } from "react";
import useFormStore from "@/stores/FormStore";
import { Route, Timer } from "lucide-react";

const PRIMARY_COLOR = "#FFB400"; // Approved color: --color-primary

interface Coordinates {
  lat: number;
  lng: number;
}

interface GoogleMapsRouteProps {
  fromCoords?: Coordinates;
  toCoords?: Coordinates;
  showDistanceDuration?: boolean;
}

export default function GoogleMapsRoute({ 
  fromCoords: propsFromCoords, 
  toCoords: propsToCoords,
  showDistanceDuration = true 
}: GoogleMapsRouteProps = {}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { formData } = useFormStore();

  // Helper: "lat,lng" → { lat, lng } or Coordinates object → { lat, lng }
  const parseCoords = (coord?: string | Coordinates): Coordinates | null => {
    if (!coord) return null;
    if (typeof coord === 'object' && 'lat' in coord && 'lng' in coord) {
      return coord;
    }
    if (typeof coord === 'string') {
    const [lat, lng] = coord.split(",").map(Number);
    return isNaN(lat) || isNaN(lng) ? null : { lat, lng };
    }
    return null;
  };

  // Use props if provided, otherwise use formStore
  const fromCoordsString = propsFromCoords 
    ? `${propsFromCoords.lat},${propsFromCoords.lng}` 
    : formData.fromLocation?.coardinates;
  const toCoordsString = propsToCoords 
    ? `${propsToCoords.lat},${propsToCoords.lng}` 
    : formData.toLocation?.coardinates;
  const stops = formData.stops;
  const distance = formData.distance;
  const duration = formData.duration;

  useEffect(() => {
    const initMap = async () => {
      try {
        const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
        const { Marker } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
        const { DirectionsService, DirectionsRenderer } = (await google.maps.importLibrary("routes")) as google.maps.RoutesLibrary;

        const from = propsFromCoords || parseCoords(fromCoordsString);
        const to = propsToCoords || parseCoords(toCoordsString);
        const waypointsList = (stops || [])
          .map((s) => parseCoords(s.coardinates))
          .filter(Boolean);

        const map = new Map(mapRef.current as HTMLElement, {
          center: from || { lat: 31.5204, lng: 74.3587 }, // Default: Lahore
          zoom: 11,
          disableDefaultUI: true,
        });

        // Case 1: Only pickup
        if (from && !to && waypointsList.length === 0) {
          new Marker({
            position: from,
            map,
            label: "A",
          });
          map.setCenter(from);
          return;
        }

        // Case 2: Full route
        if (from && to) {
          const directionsService = new DirectionsService();
          const directionsRenderer = new DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: PRIMARY_COLOR,
              strokeWeight: 5,
            },
          });
          directionsRenderer.setMap(map);

          const waypoints = waypointsList.length > 0 
            ? waypointsList.map((stop) => ({
            location: stop!,
            stopover: true,
              }))
            : undefined;

          const request: google.maps.DirectionsRequest = {
            origin: from,
            destination: to,
            ...(waypoints && { waypoints }),
            travelMode: google.maps.TravelMode.DRIVING,
          };

          directionsService.route(request, (result, status) => {
            if (status === "OK" && result) {
              directionsRenderer.setDirections(result);

              // Label sequence: A (pickup), B..Y (stops), Z (dropoff)
              const labels = ["A", ...Array.from({ length: waypointsList.length }, (_, i) => String.fromCharCode(66 + i)), String.fromCharCode(66 + waypointsList.length)];

              // Pickup
              new Marker({ position: from, map, label: labels[0] });

              // Stops
              waypointsList.forEach((stop, idx) => {
                new Marker({
                  position: stop!,
                  map,
                  label: labels[idx + 1],
                });
              });

              // Dropoff
              new Marker({
                position: to,
                map,
                label: labels[labels.length - 1],
              });
            }
          });
        }
      } catch (error) {
        console.error("Google Maps failed to load:", error);
      }
    };

    if (typeof window === "undefined") return;

    // Check if Google Maps is already loaded
    if ((window as any).google && (window as any).google.maps) {
      initMap();
      return;
    }

    // Check if script is already being loaded or exists
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      // Script exists, wait for it to load or check if already loaded
      const checkAndInit = () => {
        if ((window as any).google && (window as any).google.maps) {
          initMap();
        }
      };
      
      // Check immediately in case it's already loaded
      checkAndInit();
      
      // Also listen for load event
      existingScript.addEventListener('load', checkAndInit);
      
      return () => {
        existingScript.removeEventListener('load', checkAndInit);
      };
    }

    // Load Google Maps script only if it doesn't exist
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=maps,marker,routes`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, [propsFromCoords, propsToCoords, fromCoordsString, toCoordsString, JSON.stringify(formData.stops)]);

  return (
    <div
      className={`w-full h-[350px] rounded-2xl overflow-hidden bg-white border-2 lg:border-4 border-brand shadow-sm flex flex-col`}
    >
      <div ref={mapRef} className="w-full h-full rounded-sm" />
      {showDistanceDuration && (
        <div className="py-1 flex items-center gap-3 px-2">
          <div className="py-1 flex items-center gap-1">
            <Route color={PRIMARY_COLOR} size={15}/>
            <div>{distance?.value ?? 0} Mile</div>
      </div>
          <div className="py-1 flex items-center gap-1">
            <Timer color={PRIMARY_COLOR} size={15}/>
            <div>{duration?.value !== '' ? duration.value : 0} hours</div>
      </div>
      </div>
      )}
    </div>
  );
}
