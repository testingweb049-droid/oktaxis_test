import { NextRequest, NextResponse } from 'next/server';

interface DistanceRequest {
  from: string; // Format: "lat,lng"
  to: string; // Format: "lat,lng"
  stops?: string[]; // Array of "lat,lng" strings
}

export async function POST(request: NextRequest) {
  try {
    const body: DistanceRequest = await request.json();
    const { from, to, stops = [] } = body;

    if (!from || !to) {
      return NextResponse.json(
        {
          status: 400,
          error: 'From and to coordinates are required',
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is not configured');
      return NextResponse.json(
        {
          status: 500,
          error: 'Google Maps API key is not configured',
        },
        { status: 500 }
      );
    }

    // Parse coordinates
    const [fromLat, fromLng] = from.split(',').map(Number);
    const [toLat, toLng] = to.split(',').map(Number);

    if (isNaN(fromLat) || isNaN(fromLng) || isNaN(toLat) || isNaN(toLng)) {
      return NextResponse.json(
        {
          status: 400,
          error: 'Invalid coordinate format. Expected "lat,lng"',
        },
        { status: 400 }
      );
    }

    // Build waypoints for the route
    const waypoints: string[] = [];
    if (stops && stops.length > 0) {
      // Validate stop coordinates
      for (const stop of stops) {
        if (stop && stop.trim()) {
          const [stopLat, stopLng] = stop.split(',').map(Number);
          if (!isNaN(stopLat) && !isNaN(stopLng)) {
            waypoints.push(`${stopLat},${stopLng}`);
          }
        }
      }
    }

    // Use Google Maps Directions API to get accurate distance
    // This calculates the actual driving distance, not straight-line distance
    const origin = `${fromLat},${fromLng}`;
    const destination = `${toLat},${toLng}`;
    
    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}&units=imperial`;
    
    // Add waypoints if any
    if (waypoints.length > 0) {
      // Google Maps allows up to 25 waypoints
      const waypointsStr = waypoints.slice(0, 25).join('|');
      url += `&waypoints=${encodeURIComponent(waypointsStr)}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Google Maps Directions API error:', data.status, data.error_message);
      return NextResponse.json(
        {
          status: 500,
          error: data.error_message || `Google Maps API error: ${data.status}`,
        },
        { status: 500 }
      );
    }

    if (data.status === 'ZERO_RESULTS') {
      return NextResponse.json(
        {
          status: 404,
          error: 'No route found between the specified locations',
        },
        { status: 404 }
      );
    }

    // Calculate total distance from all route legs
    let totalDistanceMeters = 0;
    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      if (route.legs && route.legs.length > 0) {
        for (const leg of route.legs) {
          if (leg.distance && leg.distance.value) {
            totalDistanceMeters += leg.distance.value;
          }
        }
      }
    }

    // Convert meters to miles (1 meter = 0.000621371 miles)
    const mileDistance = totalDistanceMeters * 0.000621371;

    return NextResponse.json({
      status: 200,
      mileDistance: Math.round(mileDistance * 10) / 10, // Round to 1 decimal place
      distanceMeters: totalDistanceMeters,
      routes: data.routes, // Include full route data if needed
    });
  } catch (error) {
    console.error('Error calculating distance:', error);
    return NextResponse.json(
      {
        status: 500,
        error: error instanceof Error ? error.message : 'Failed to calculate distance',
      },
      { status: 500 }
    );
  }
}

