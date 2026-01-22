export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatTime(timeString: string): string {
  if (!timeString) return '';
  if (/\d{1,2}:\d{2}\s*(AM|PM)$/i.test(timeString)) {
    return timeString;
  }
  const match = timeString.match(/^(\d{2}):(\d{2})$/);
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = match[2];
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  }
  return timeString;
}


export function calculateArrivalTime(departureTime: string, durationMinutes: number): string {
  if (!departureTime || !durationMinutes) return '';

  const timeMatch = departureTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!timeMatch) return '';

  let hours = parseInt(timeMatch[1], 10);
  const minutes = parseInt(timeMatch[2], 10);
  const period = timeMatch[3].toUpperCase();

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const arrivalHours = Math.floor(totalMinutes / 60) % 24;
  const arrivalMinutes = totalMinutes % 60;

  const arrivalPeriod = arrivalHours >= 12 ? 'PM' : 'AM';
  const arrivalHours12 = arrivalHours % 12 || 12;

  return `${arrivalHours12}:${arrivalMinutes.toString().padStart(2, '0')} ${arrivalPeriod}`;
}


export function formatDuration(durationValue: string | number): { minutes: number; hours: number } {
  if (typeof durationValue === 'string') {
    const hours = parseFloat(durationValue);
    if (!isNaN(hours)) {
      return { hours, minutes: Math.round(hours * 60) };
    }
  } else if (typeof durationValue === 'number') {
    return { hours: durationValue, minutes: Math.round(durationValue * 60) };
  }
  return { hours: 0, minutes: 0 };
}


export function formatDistance(distanceValue: number | string): { km: number; miles: number; milesFormatted: string } {
  const distance = typeof distanceValue === 'string' ? parseFloat(distanceValue) : distanceValue;
  if (isNaN(distance) || distance === 0) return { km: 0, miles: 0, milesFormatted: '0' };
  const miles = distance;
  const km = miles * 1.60934;
  // Show actual miles without rounding - format to 1 decimal place for display
  const milesFormatted = miles.toFixed(1);
  return { km: Math.round(km), miles: Math.round(miles), milesFormatted };
}

export function getLocationName(location: string): { name: string; city: string; code?: string } {
  if (!location) return { name: '', city: '' };
  const airportMatch = location.match(/^(.+?)\s*\(([A-Z]{3})\)/);
  if (airportMatch) {
    return { name: airportMatch[1].trim(), code: airportMatch[2], city: 'Amsterdam, Netherlands' };
  }
  const parts = location.split(',').map(s => s.trim());
  if (parts.length > 1) {
    return { name: parts[0], city: parts.slice(1).join(', ') };
  }
  return { name: location, city: '' };
}

export function formatPriceValue(price: string | number): string {
  const priceValue = typeof price === 'string' ? parseFloat(price) : price;
  return isNaN(priceValue) ? '0.00' : priceValue.toFixed(2);
}

