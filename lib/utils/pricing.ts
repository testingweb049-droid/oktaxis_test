import { MIN_PRICE, PRICE_DECIMAL_PLACES } from '@/constants/pricing';
import { parseTimeString } from '@/lib/utils';


export function calculateReturnPrice(basePrice: number, discountPercent?: number): number {
  if (!basePrice || basePrice <= 0) {
    return 0;
  }
  
  // Use provided discount - must come from backend pricing settings
  const discount = discountPercent ?? 0;
  
  if (!discount || discount <= 0) {
    return basePrice; // No discount available
  }
  
  // Calculate discounted price
  const discountAmount = (basePrice * discount) / 100;
  const discountedPrice = basePrice - discountAmount;
  
  return Math.max(MIN_PRICE, discountedPrice);
}

export function formatPrice(price: number): string {
  return Math.max(MIN_PRICE, price || 0).toFixed(PRICE_DECIMAL_PLACES);
}

export interface BookingPriceCalculationData {
  basePrice: number | string;
  category: string;
  isReturn?: boolean;
  isMeetGreet?: boolean;
  isFlightTrack?: boolean;
  extraStopsCount?: number | string;
  isReturnMeetGreet?: boolean;
  isReturnFlightTrack?: boolean;
  returnExtraStopsCount?: number | string;
}

export interface PricingSettingsForCalculation {
  returnDiscount: Record<string, number>;
  outbound: {
    meetGreetActive: boolean;
    meetGreet: number;
    flightTrackActive: boolean;
    flightTrack: number;
    extraStopActive: boolean;
    extraStop: number;
  };
  return: {
    meetGreetActive: boolean;
    meetGreet: number;
    flightTrackActive: boolean;
    flightTrack: number;
    extraStopActive: boolean;
    extraStop: number;
  };
}

export function calculateTotalBookingPrice(
  bookingData: BookingPriceCalculationData,
  pricingSettings: PricingSettingsForCalculation,
  selectedFleetName?: string
): number {
  const basePrice = Number(bookingData.basePrice ?? 0);
  const isReturnJourney = bookingData.category !== 'hourly' && bookingData.isReturn;

  // Calculate return price
  let returnPrice = 0;
  if (isReturnJourney && basePrice > 0) {
    const vehicleReturnDiscount = pricingSettings.returnDiscount[selectedFleetName ?? ''] ?? 0;
    returnPrice = calculateReturnPrice(basePrice, vehicleReturnDiscount);
  }

  // Calculate outbound fees
  const meetGreetFee = bookingData.isMeetGreet && pricingSettings.outbound.meetGreetActive
    ? pricingSettings.outbound.meetGreet : 0;
  const flightTrackFee = bookingData.isFlightTrack && pricingSettings.outbound.flightTrackActive
    ? pricingSettings.outbound.flightTrack : 0;
  const extraStopsFee = !isReturnJourney && pricingSettings.outbound.extraStopActive
    ? Number(bookingData.extraStopsCount || 0) * pricingSettings.outbound.extraStop : 0;

  // Calculate return fees
  const returnMeetGreetFee = isReturnJourney && bookingData.isReturnMeetGreet && pricingSettings.return.meetGreetActive
    ? pricingSettings.return.meetGreet : 0;
  const returnFlightTrackFee = isReturnJourney && bookingData.isReturnFlightTrack && pricingSettings.return.flightTrackActive
    ? pricingSettings.return.flightTrack : 0;
  const returnExtraStopsFee = isReturnJourney && pricingSettings.return.extraStopActive
    ? Number(bookingData.returnExtraStopsCount || 0) * pricingSettings.return.extraStop : 0;

  return basePrice + returnPrice + meetGreetFee + flightTrackFee + extraStopsFee +
         returnMeetGreetFee + returnFlightTrackFee + returnExtraStopsFee;
}


