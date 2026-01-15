/**
 * Validation utilities for booking form
 */

/**
 * Validate that return date is after pickup date
 * @param pickupDate - Pickup date string (YYYY-MM-DD)
 * @param pickupTime - Pickup time string (HH:MM)
 * @param returnDate - Return date string (YYYY-MM-DD)
 * @param returnTime - Return time string (HH:MM)
 * @returns Object with isValid boolean and error message
 */
export function validateReturnDate(
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string
): { isValid: boolean; error?: string } {
  if (!pickupDate || !pickupTime || !returnDate || !returnTime) {
    return { isValid: false, error: 'Pickup and return dates/times are required' };
  }

  try {
    // Parse pickup datetime
    const [pickupYear, pickupMonth, pickupDay] = pickupDate.split('-').map(Number);
    const [pickupHour, pickupMinute] = pickupTime.split(':').map(Number);
    const pickupDateTime = new Date(pickupYear, pickupMonth - 1, pickupDay, pickupHour, pickupMinute);

    // Parse return datetime
    const [returnYear, returnMonth, returnDay] = returnDate.split('-').map(Number);
    const [returnHour, returnMinute] = returnTime.split(':').map(Number);
    const returnDateTime = new Date(returnYear, returnMonth - 1, returnDay, returnHour, returnMinute);

    if (returnDateTime <= pickupDateTime) {
      return {
        isValid: false,
        error: 'Return date and time must be after pickup date and time',
      };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: 'Invalid date or time format',
    };
  }
}

/**
 * Validate distance value
 * @param distance - Distance in miles
 * @returns Object with isValid boolean and error message
 */
export function validateDistance(distance: number | string | undefined): { isValid: boolean; error?: string } {
  const numDistance = typeof distance === 'string' ? parseFloat(distance) : distance;
  
  if (numDistance === undefined || numDistance === null || isNaN(numDistance)) {
    return { isValid: false, error: 'Distance is required' };
  }
  
  if (numDistance < 0) {
    return { isValid: false, error: 'Distance cannot be negative' };
  }
  
  return { isValid: true };
}

/**
 * Validate price value
 * @param price - Price value
 * @returns Object with isValid boolean and error message
 */
export function validatePrice(price: number | string | undefined): { isValid: boolean; error?: string } {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (numPrice === undefined || numPrice === null || isNaN(numPrice)) {
    return { isValid: false, error: 'Price is required' };
  }
  
  if (numPrice < 0) {
    return { isValid: false, error: 'Price cannot be negative' };
  }
  
  return { isValid: true };
}

/**
 * Validate duration for hourly bookings
 * @param duration - Duration in hours (string or number)
 * @returns Object with isValid boolean and error message
 */
export function validateDuration(duration: string | number | undefined): { isValid: boolean; error?: string } {
  const numDuration = typeof duration === 'string' ? parseFloat(duration) : duration;
  
  if (numDuration === undefined || numDuration === null || isNaN(numDuration)) {
    return { isValid: false, error: 'Duration is required' };
  }
  
  if (numDuration <= 0) {
    return { isValid: false, error: 'Duration must be greater than 0' };
  }
  
  return { isValid: true };
}

/**
 * Validate coordinates
 * @param coordinates - Coordinate string in format "lat,lng"
 * @returns Object with isValid boolean and error message
 */
export function validateCoordinates(coordinates: string | undefined): { isValid: boolean; error?: string } {
  if (!coordinates || coordinates.trim() === '') {
    return { isValid: false, error: 'Coordinates are required' };
  }
  
  const parts = coordinates.split(',');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Invalid coordinate format. Expected "lat,lng"' };
  }
  
  const lat = parseFloat(parts[0].trim());
  const lng = parseFloat(parts[1].trim());
  
  if (isNaN(lat) || isNaN(lng)) {
    return { isValid: false, error: 'Coordinates must be valid numbers' };
  }
  
  if (lat < -90 || lat > 90) {
    return { isValid: false, error: 'Latitude must be between -90 and 90' };
  }
  
  if (lng < -180 || lng > 180) {
    return { isValid: false, error: 'Longitude must be between -180 and 180' };
  }
  
  return { isValid: true };
}

