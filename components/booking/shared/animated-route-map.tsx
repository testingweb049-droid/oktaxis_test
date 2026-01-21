"use client";

import { useEffect, useRef, useMemo } from "react";
import useFormStore from "@/stores/form-store";
import { Check } from "lucide-react";

const PRIMARY_COLOR = "#FFB400";

function AnimatedRouteMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const animatedDotRef = useRef<google.maps.Marker | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  
  // Only subscribe to location coordinates and category to prevent re-renders on vehicle selection
  const fromCoordinates = useFormStore((state) => state.formData.fromLocation?.coordinates);
  const toCoordinates = useFormStore((state) => state.formData.toLocation?.coordinates);
  const category = useFormStore((state) => state.category);

  const parseCoords = (coord?: string): { lat: number; lng: number } | null => {
    if (!coord) return null;
    const [lat, lng] = coord.split(",").map(Number);
    return isNaN(lat) || isNaN(lng) ? null : { lat, lng };
  };

  // Memoize coordinates to prevent re-rendering when other form fields change
  const from = useMemo(() => parseCoords(fromCoordinates), [fromCoordinates]);
  const to = useMemo(() => parseCoords(toCoordinates), [toCoordinates]);

  useEffect(() => {
    if (!from || !to || typeof window === "undefined" || category === 'hourly') return;

    const initMap = async () => {
      try {
        const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
        const { Marker } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
        const { DirectionsService, DirectionsRenderer } = (await google.maps.importLibrary("routes")) as google.maps.RoutesLibrary;

        // Calculate center point between from and to locations
        const centerLat = (from.lat + to.lat) / 2;
        const centerLng = (from.lng + to.lng) / 2;
        
        // Create map with darker grayscale styling
        const map = new Map(mapRef.current as HTMLElement, {
          center: { lat: centerLat, lng: centerLng },
          zoom: 11,
          disableDefaultUI: true,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ saturation: -100 }, { lightness: -10 }, { gamma: 0.8 }]
            },
            {
              featureType: "all",
              elementType: "labels",
              stylers: [{ saturation: -100 }, { lightness: 20 }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ saturation: -100 }, { lightness: -20 }, { gamma: 0.8 }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e0e0e0" }, { lightness: -30 }]
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ saturation: -100 }, { lightness: -20 }]
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ saturation: -100 }, { lightness: -20 }]
            }
          ]
        });

        const directionsService = new DirectionsService();
        const directionsRenderer = new DirectionsRenderer({
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: PRIMARY_COLOR,
            strokeWeight: 5,
            strokeOpacity: 1,
          },
        });
        directionsRenderer.setMap(map);
        directionsRendererRef.current = directionsRenderer;
        mapInstanceRef.current = map;

        const request: google.maps.DirectionsRequest = {
          origin: from,
          destination: to,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
          if (status === "OK" && result) {
            directionsRenderer.setDirections(result);

            // Fit map bounds to show the entire route
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(from);
            bounds.extend(to);
            map.fitBounds(bounds);

            // Get the detailed route path from all legs and steps
            const route = result.routes[0];
            const path: google.maps.LatLng[] = [];
            
            // Extract all points from the route legs
            if (route.legs && route.legs.length > 0) {
              route.legs.forEach((leg) => {
                if (leg.steps && leg.steps.length > 0) {
                  leg.steps.forEach((step) => {
                    if (step.path && step.path.length > 0) {
                      step.path.forEach((point) => {
                        path.push(point);
                      });
                    }
                  });
                }
              });
            }
            
            // Fallback to overview_path if no detailed path found
            if (path.length === 0 && route.overview_path && route.overview_path.length > 0) {
              route.overview_path.forEach((point) => {
                path.push(point);
              });
            }
            
            // Final fallback: create path from origin to destination
            if (path.length === 0) {
              path.push(new google.maps.LatLng(from.lat, from.lng));
              path.push(new google.maps.LatLng(to.lat, to.lng));
            }

            // Create custom markers for start (black square) and end (orange square)
            new Marker({
              position: from,
              map,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#000000",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
            });

            // End marker (orange square/circle)
            new Marker({
              position: to,
              map,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: PRIMARY_COLOR,
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
            });

            // Animated dot that moves smoothly along the route with normalized speed
            if (path.length > 0) {
              // Use all path points for smoother animation
              const animationPath = path;
              
              // Fixed animation duration in milliseconds (same for all routes)
              const ANIMATION_DURATION = 10000; // 10 seconds
              
              // Calculate frame interval based on path length to normalize speed
              // Target ~60fps, so calculate how many milliseconds per point
              const totalPoints = animationPath.length;
              const frameInterval = ANIMATION_DURATION / totalPoints;
              
              let currentIndex = 0;
              let lastAnimationTime = 0;
              let animationStartTime = 0;
              
              // Create car icon as a simple dot SVG
              const carIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="${PRIMARY_COLOR}" stroke="#ffffff" stroke-width="2"/>
              </svg>`;
              
              const carIconUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(carIconSvg);
              
              // Create dot marker immediately at start position
              const startPosition = animationPath[0];
              
              animatedDotRef.current = new Marker({
                position: startPosition,
                map,
                icon: {
                  url: carIconUrl,
                  scaledSize: new google.maps.Size(24, 24),
                  anchor: new google.maps.Point(12, 12),
                },
                zIndex: 1000,
                optimized: false,
              });
              
              // Smooth animation function with normalized speed
              const animateDot = (currentTime: number) => {
                if (animationStartTime === 0) {
                  animationStartTime = currentTime;
                }
                
                // Calculate elapsed time
                const elapsed = currentTime - animationStartTime;
                
                // Calculate which point we should be at based on elapsed time
                const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
                const targetIndex = Math.floor(progress * (totalPoints - 1));
                
                // Update position if we need to move to a new point
                if (targetIndex !== currentIndex && targetIndex < totalPoints && animatedDotRef.current) {
                  currentIndex = targetIndex;
                  const currentPosition = animationPath[currentIndex];
                  animatedDotRef.current.setPosition(currentPosition);
                }
                
                // Reset and loop when animation completes
                if (progress >= 1) {
                  animationStartTime = currentTime;
                  currentIndex = 0;
                  if (animatedDotRef.current) {
                    animatedDotRef.current.setPosition(animationPath[0]);
                  }
                }
                
                animationFrameRef.current = requestAnimationFrame(animateDot);
              };
              
              // Start animation immediately
              setTimeout(() => {
                animationFrameRef.current = requestAnimationFrame(animateDot);
              }, 100);
            }
          }
        });
      } catch (error) {
        console.error("Google Maps failed to load:", error);
      }
    };

    // Check if Google Maps is already loaded
    if ((window as any).google && (window as any).google.maps) {
      initMap();
      return () => {
        // Cleanup
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (animatedDotRef.current) {
          animatedDotRef.current.setMap(null);
          animatedDotRef.current = null;
        }
        if (directionsRendererRef.current) {
          directionsRendererRef.current.setMap(null);
          directionsRendererRef.current = null;
        }
        if (mapInstanceRef.current) {
          mapInstanceRef.current = null;
        }
      };
    }

    // Check if script is already being loaded or exists
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      const checkAndInit = () => {
        if ((window as any).google && (window as any).google.maps) {
          initMap();
        }
      };
      checkAndInit();
      existingScript.addEventListener('load', checkAndInit);
      return () => {
        existingScript.removeEventListener('load', checkAndInit);
        // Cleanup
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (animatedDotRef.current) {
          animatedDotRef.current.setMap(null);
          animatedDotRef.current = null;
        }
        if (directionsRendererRef.current) {
          directionsRendererRef.current.setMap(null);
          directionsRendererRef.current = null;
        }
        if (mapInstanceRef.current) {
          mapInstanceRef.current = null;
        }
      };
    }

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=maps,marker,routes`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (animatedDotRef.current) {
        animatedDotRef.current.setMap(null);
        animatedDotRef.current = null;
      }
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
        directionsRendererRef.current = null;
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [from, to, category]);

  if (category === 'hourly' || !from || !to) return null;

  return (
    <div className="w-full h-[300px] lg:h-[300px] rounded-none lg:rounded-lg overflow-hidden border-0 lg:border lg:border-gray-200 relative">
      <div ref={mapRef} className="w-full h-full" />
      <div className="hidden lg:flex absolute bottom-0 w-4/5 left-1/2 transform -translate-x-1/2 items-center justify-center bg-white rounded-t-lg px-4 py-2.5 shadow-lg z-10">
        <Check size={14} className="text-black mr-2 flex-shrink-0" />
        <span className="text-xs text-gray-700 whitespace-nowrap">All prices include VAT, taxes & tolls</span>
      </div>
    </div>
  );
}

export default AnimatedRouteMap;

