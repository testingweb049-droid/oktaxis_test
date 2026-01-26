/**
 * Distance Calculator Service
 * Calculates distance between locations using Google Maps Directions API
 * This replaces the backend distance calculation for better performance and scalability
 */

export interface DistanceRequest {
  from: string; // "lat,lng" format
  to: string; // "lat,lng" format
  stops?: string[]; // Array of "lat,lng" coordinates
}

export interface DistanceResult {
  mileDistance: number;
  distanceMeters: number;
}

export class DistanceCalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DistanceCalculationError';
  }
}

/**
 * Calculate distance between two locations using Google Maps DirectionsService
 * @param request - Distance request with from, to, and optional stops
 * @returns Distance result with miles and meters
 * @throws DistanceCalculationError if calculation fails
 */
export async function calculateDistance(
  request: DistanceRequest
): Promise<DistanceResult> {
  const { from, to, stops = [] } = request;

  // Validate inputs
  if (!from || !to) {
    throw new DistanceCalculationError(
      'Both pickup and drop-off locations are required'
    );
  }

  // Parse coordinates
  const [fromLat, fromLng] = from.split(',').map(Number);
  const [toLat, toLng] = to.split(',').map(Number);

  if (
    isNaN(fromLat) ||
    isNaN(fromLng) ||
    isNaN(toLat) ||
    isNaN(toLng)
  ) {
    throw new DistanceCalculationError(
      'Invalid coordinate format. Expected "lat,lng"'
    );
  }

  // Check if Google Maps API is loaded
  if (typeof window === 'undefined' || !window.google?.maps) {
    throw new DistanceCalculationError(
      'Google Maps API is not loaded. Please wait and try again.'
    );
  }

  // Create origin and destination LatLng objects
  const origin = new google.maps.LatLng(fromLat, fromLng);
  const destination = new google.maps.LatLng(toLat, toLng);

  // Prepare waypoints if stops are provided
  const waypoints: google.maps.DirectionsWaypoint[] = [];
  if (stops && stops.length > 0) {
    for (const stop of stops) {
      if (stop && stop.trim()) {
        const [stopLat, stopLng] = stop.split(',').map(Number);
        if (!isNaN(stopLat) && !isNaN(stopLng)) {
          waypoints.push({
            location: new google.maps.LatLng(stopLat, stopLng),
            stopover: true,
          });
        }
      }
    }
  }

  // Create DirectionsService request
  const directionsService = new google.maps.DirectionsService();
  const directionsRequest: google.maps.DirectionsRequest = {
    origin,
    destination,
    waypoints: waypoints.length > 0 ? waypoints : undefined,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };

  // Calculate distance using Promise wrapper
  return new Promise<DistanceResult>((resolve, reject) => {
    directionsService.route(directionsRequest, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        // Calculate total distance from all legs
        let totalDistanceMeters = 0;

        if (result.routes && result.routes.length > 0) {
          const route = result.routes[0];
          if (route.legs && route.legs.length > 0) {
            for (const leg of route.legs) {
              if (leg.distance?.value) {
                totalDistanceMeters += leg.distance.value;
              }
            }
          }
        }

        // Convert to miles (1 meter = 0.000621371 miles)
        const mileDistance = totalDistanceMeters * 0.000621371;

        resolve({
          mileDistance: Math.round(mileDistance * 10) / 10, // Round to 1 decimal place
          distanceMeters: totalDistanceMeters,
        });
      } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
        reject(
          new DistanceCalculationError(
            'No route found between the specified locations. Please check your locations and try again.'
          )
        );
      } else if (status === google.maps.DirectionsStatus.REQUEST_DENIED) {
        reject(
          new DistanceCalculationError(
            'Distance calculation was denied. Please check your Google Maps API configuration.'
          )
        );
      } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
        reject(
          new DistanceCalculationError(
            'Distance calculation quota exceeded. Please try again later.'
          )
        );
      } else {
        reject(
          new DistanceCalculationError(
            `Failed to calculate distance: ${status}`
          )
        );
      }
    });
  });
}

