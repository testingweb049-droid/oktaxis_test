"use client";

import { useMemo } from "react";
import useFormStore from "@/stores/form-store";
import { User, Pencil, Check, Users, Luggage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { FleetType } from "@/types/fleet.types";
// Pricing data comes from cached quote data in store - no API call needed
import { calculateReturnPrice, formatPrice } from "@/lib/utils/pricing";
import {
  calculateArrivalTime,
  formatDuration,
  formatDistance,
  getLocationName,
  formatPriceValue,
} from "@/lib/utils/booking";

const PRIMARY_COLOR = "#FFB400";

interface PickupTripDetailsProps {
  showMap?: boolean;
  showVehicle?: boolean;
}

function PickupTripDetails({ showMap = true, showVehicle = false }: PickupTripDetailsProps) {
  const { formData, category, cachedFleets, cachedQuoteData } = useFormStore();
  const router = useRouter();
  // Use cached fleet data from store - no API call needed
  const selectedFleet = cachedFleets?.find((item) => item.name === formData.car?.value) || null;
  // Use pricing data from cached quote - no API call needed
  const pricing = cachedQuoteData?.pricing || {
    outbound: {
      meetGreet: 0,
      meetGreetActive: false,
      flightTrack: 0,
      flightTrackActive: false,
      extraStop: 0,
      extraStopActive: false,
    },
    return: {
      meetGreet: 0,
      meetGreetActive: false,
      flightTrack: 0,
      flightTrackActive: false,
      extraStop: 0,
      extraStopActive: false,
    },
    vehicle: {},
    returnDiscount: {},
    hourlyRanges: [],
    dateRanges: [],
    minimumBookingHours: 0,
    minimumBookingHoursActive: false,
    timezone: '',
  };

  const fromLocation = formData.fromLocation?.value || '';
  const toLocation = formData.toLocation?.value || '';
  const date = formData.date?.value || '';
  const time = formData.time?.value || '';
  const passengers = formData.passengers?.value || '1';
  const outwardPrice = Number(formData.price?.value || 0);
  const distance = formData.distance?.value || 0;
  const duration = formData.duration?.value || '';
  const displayDate = date;
  const displayTime = time;
  let durationData = formatDuration(duration);
  if (category === 'trip' && durationData.minutes === 0 && distance > 0) {
    const estimatedHours = Number(distance) / 31; // distance in miles
    durationData = { hours: estimatedHours, minutes: Math.round(estimatedHours * 60) };
  }
  const arrivalTime = durationData.minutes > 0 ? calculateArrivalTime(time, durationData.minutes) : '';
  const distanceData = formatDistance(distance);
  const fromLocationData = getLocationName(fromLocation);
  const toLocationData = getLocationName(toLocation);

  // Calculate return price and discount separately
  const returnPriceData = useMemo(() => {
    if (category !== 'hourly' && formData.isReturn?.value && outwardPrice > 0) {
      // Get vehicle-specific return discount from backend pricing settings
      const carValue = formData.car.value;
      const returnDiscount = pricing.returnDiscount as Record<string, number>;
      const vehicleReturnDiscount = carValue ? (returnDiscount[carValue] ?? 0) : 0;
      const discountedPrice = calculateReturnPrice(outwardPrice, vehicleReturnDiscount);
      const discountAmount = outwardPrice - discountedPrice;
      return {
        price: discountedPrice,
        discountPercent: vehicleReturnDiscount,
        discountAmount: discountAmount
      };
    }
    return { price: 0, discountPercent: 0, discountAmount: 0 };
  }, [outwardPrice, formData.isReturn?.value, formData.car.value, category, pricing]);

  const returnPrice = returnPriceData.price;
  const returnDiscountPercent = returnPriceData.discountPercent;
  const returnDiscountAmount = returnPriceData.discountAmount;

  // Calculate total price with all extras (same logic as step3-details-form)
  const totalPrice = useMemo(() => {
    const meetGreetFee = formData.isMeetGreet?.value && pricing.outbound.meetGreetActive ? pricing.outbound.meetGreet : 0;
    const flightTrackFee = formData.isFlightTrack?.value && pricing.outbound.flightTrackActive ? pricing.outbound.flightTrack : 0;
    const extraStopsFee = category !== 'hourly' && pricing.outbound.extraStopActive ? Number(formData.extraStopsCount?.value || 0) * pricing.outbound.extraStop : 0;
    const returnMeetGreetFee = category !== 'hourly' && formData.isReturnMeetGreet?.value && pricing.return.meetGreetActive ? pricing.return.meetGreet : 0;
    const returnFlightTrackFee = category !== 'hourly' && formData.isReturnFlightTrack?.value && pricing.return.flightTrackActive ? pricing.return.flightTrack : 0;
    const returnExtraStopsFee = category !== 'hourly' && pricing.return.extraStopActive ? Number(formData.returnExtraStopsCount?.value || 0) * pricing.return.extraStop : 0;

    const total = (
      outwardPrice +
      returnPrice +
      meetGreetFee +
      flightTrackFee +
      extraStopsFee +
      returnMeetGreetFee +
      returnFlightTrackFee +
      returnExtraStopsFee
    );

    return formatPrice(total);
  }, [
    outwardPrice,
    returnPrice,
    formData.isMeetGreet?.value,
    formData.isFlightTrack?.value,
    formData.extraStopsCount?.value,
    formData.isReturnMeetGreet?.value,
    formData.isReturnFlightTrack?.value,
    formData.returnExtraStopsCount?.value,
    category,
    pricing
  ]);

  const formattedPrice = formatPriceValue(totalPrice);
  const returnDate = formData.returnDate?.value || '';
  const returnTime = formData.returnTime?.value || '';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 w-full ">
        {/* Mobile Simplified View - Same journey details structure as desktop */}
        <div className="lg:hidden">
          {/* Date Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-gray">Outward</span>
              {displayDate && (
                <>
                  <span className="text-sm text-text-gray">·</span>
                  <span className="text-sm text-text-gray">{displayDate}</span>
                </>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-text-gray hover:text-heading-black"
              onClick={() => router.push('/')}
            >
              <Pencil size={14} className="mr-1" />
              <span className="text-sm">Edit</span>
            </Button>
          </div>

          <div className="flex items-start gap-3">
            {/* Vertical line container - spans entire journey */}
            <div className="flex flex-col items-center relative">
              {/* Departure point */}
              <div className="w-3 h-3 bg-heading-black rounded-sm"></div>
              {/* Continuous vertical line from departure to arrival */}
              <div className="w-0.5 bg-heading-black flex-1 min-h-[100px] relative overflow-visible">
                {/* Animated moving dot */}
                <div
                  className="absolute left-1/2 w-2.5 h-2.5 rounded-full shadow-lg"
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                    animation: 'moveDown 2.5s ease-in-out infinite',
                  }}
                />
              </div>

              {/* Arrival point */}
              <div className="w-3 h-3 rounded-sm relative" style={{ backgroundColor: PRIMARY_COLOR }}>
                {/* Animated dot at arrival point */}
                <div
                  className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full shadow-lg"
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                    animation: 'pulseAtDestination 2.5s ease-in-out infinite',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>
            </div>

            {/* Location details container */}
            <div className="flex-1">
              {/* Departure */}
              <div className="mb-3">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-heading-black mb-0.5">
                      {fromLocationData.name || fromLocation || 'Pickup location'}
                    </h3>
                    {fromLocationData.city && (
                      <p className="text-xs text-text-gray">{fromLocationData.city}</p>
                    )}
                  </div>
                  {displayTime && (
                    <span className="text-xs text-heading-black font-medium ml-2">{displayTime}</span>
                  )}
                </div>
              </div>

              {/* Travel Time and Distance */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-text-gray">
                  ~ {durationData.minutes} min
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-text-gray">
                  ~ {distanceData.km} Km / {distanceData.milesFormatted} Mi
                </span>
              </div>

              {/* Arrival */}
              <div>
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-heading-black mb-0.5">
                      {toLocationData.name || toLocation || 'Drop-off location'}
                    </h3>
                    {toLocationData.city && (
                      <p className="text-xs text-text-gray">{toLocationData.city}</p>
                    )}
                  </div>
                  {arrivalTime && (
                    <span className="text-xs text-heading-black font-medium ml-2">{arrivalTime}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Return Journey - Mobile - Show when return is selected */}
          {category !== 'hourly' && formData.isReturn?.value && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-text-gray">Return</span>
                {returnDate && (
                  <>
                    <span className="text-sm text-text-gray">·</span>
                    <span className="text-sm text-text-gray">{returnDate}</span>
                  </>
                )}
              </div>
              <div className="flex items-start gap-3">
                {/* Vertical line container - spans entire journey */}
                <div className="flex flex-col items-center relative">
                  {/* Departure point (swapped: from toLocation) */}
                  <div className="w-3 h-3 bg-heading-black rounded-sm"></div>
                  {/* Continuous vertical line from departure to arrival */}
                  <div className="w-0.5 bg-heading-black flex-1 min-h-[100px] relative overflow-visible">
                    {/* Animated moving dot - reversed for return journey */}
                    <div
                      className="absolute left-1/2 w-2.5 h-2.5 rounded-full shadow-lg"
                      style={{
                        backgroundColor: PRIMARY_COLOR,
                        animation: 'moveUp 2.5s ease-in-out infinite',
                      }}
                    />
                  </div>

                  {/* Arrival point (swapped: to fromLocation) */}
                  <div className="w-3 h-3 rounded-sm relative" style={{ backgroundColor: PRIMARY_COLOR }}>
                    {/* Animated dot at arrival point */}
                    <div
                      className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full shadow-lg"
                      style={{
                        backgroundColor: PRIMARY_COLOR,
                        animation: 'pulseAtDestination 2.5s ease-in-out infinite',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  </div>
                </div>

                {/* Location details container */}
                <div className="flex-1">
                  {/* Departure (swapped: toLocation) */}
                  <div className="mb-3">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm text-heading-black mb-0.5">
                          {toLocationData.name || toLocation || 'Pickup location'}
                        </h3>
                        {toLocationData.city && (
                          <p className="text-xs text-text-gray">{toLocationData.city}</p>
                        )}
                      </div>
                      {returnTime && (
                        <span className="text-xs text-heading-black font-medium ml-2">{returnTime}</span>
                      )}
                    </div>
                  </div>

                  {/* Travel Time and Distance */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-text-gray">
                      ~ {durationData.minutes} min
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-text-gray">
                      ~ {distanceData.km} Km / {distanceData.milesFormatted} Mi
                    </span>
                  </div>

                  {/* Arrival (swapped: fromLocation) */}
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm text-heading-black mb-0.5">
                          {fromLocationData.name || fromLocation || 'Drop-off location'}
                        </h3>
                        {fromLocationData.city && (
                          <p className="text-xs text-text-gray">{fromLocationData.city}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Full View */}
        <div className="hidden lg:block">
          {/* Header */}
          <h2 className="text-2xl font-bold text-heading-black mb-4">Your Booking</h2>

          {/* Top Section */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-semibold text-heading-black">One way</span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 bg-transparent border-gray-300 hover:bg-gray-50 rounded-full"
            >
              <User size={14} className="mr-1.5" />
              <span className="text-sm">{passengers} {passengers === '1' ? 'Passenger' : 'Passengers'}</span>
            </Button>
          </div>

          {/* Date Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-gray">Outward</span>
              {displayDate && (
                <>
                  <span className="text-sm text-text-gray">·</span>
                  <span className="text-sm text-text-gray">{displayDate}</span>
                </>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-text-gray hover:text-heading-black"
              onClick={() => router.push('/')}
            >
              <Pencil size={14} className="mr-1" />
              <span className="text-sm">Edit</span>
            </Button>
          </div>

          {/* Journey Details */}
          <div className="mb-4">
            <div className="flex items-start gap-3">
              {/* Vertical line container - spans entire journey */}
              <div className="flex flex-col items-center relative">
                {/* Departure point */}
                <div className="w-3 h-3 bg-heading-black rounded-sm"></div>

                {/* Continuous vertical line from departure to arrival */}
                <div className="w-0.5 bg-heading-black flex-1 min-h-[100px] relative overflow-visible">
                  {/* Animated moving dot */}
                  <div
                    className="absolute left-1/2 w-2.5 h-2.5 rounded-full shadow-lg"
                    style={{
                      backgroundColor: PRIMARY_COLOR,
                      animation: 'moveDown 2.5s ease-in-out infinite',
                    }}
                  />
                </div>

                {/* Arrival point */}
                <div className="w-3 h-3 rounded-sm relative" style={{ backgroundColor: PRIMARY_COLOR }}>
                  {/* Animated dot at arrival point */}
                  <div
                    className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full shadow-lg"
                    style={{
                      backgroundColor: PRIMARY_COLOR,
                      animation: 'pulseAtDestination 2.5s ease-in-out infinite',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>
              </div>

              {/* Location details container */}
              <div className="flex-1">
                {/* Departure */}
                <div className="mb-3">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <h3 className="font-bold text-base text-heading-black mb-0.5">
                        {fromLocationData.name || fromLocation || 'Pickup location'}
                      </h3>
                      {fromLocationData.city && (
                        <p className="text-sm text-text-gray">{fromLocationData.city}</p>
                      )}
                    </div>
                    {displayTime && (
                      <span className="text-sm text-heading-black font-medium ml-2">{displayTime}</span>
                    )}
                  </div>
                </div>

                {/* Travel Time and Distance */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-text-gray">
                    ~ {durationData.minutes} min
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-text-gray">
                    ~ {distanceData.km} Km / {distanceData.milesFormatted} Mi
                  </span>
                </div>

                {/* Arrival */}
                <div>
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <h3 className="font-bold text-base text-heading-black mb-0.5">
                        {toLocationData.name || toLocation || 'Drop-off location'}
                      </h3>
                      {toLocationData.city && (
                        <p className="text-sm text-text-gray">{toLocationData.city}</p>
                      )}
                    </div>
                    {arrivalTime && (
                      <span className="text-sm text-heading-black font-medium ml-2">{arrivalTime}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Return Journey - Show when return is selected */}
          {category !== 'hourly' && formData.isReturn?.value && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-base text-heading-black">Return Journey</h3>
                {returnDate && (
                  <span className="text-sm text-text-gray">{returnDate}</span>
                )}
              </div>
              <div className="flex items-start gap-3">
                {/* Vertical line container - spans entire journey */}
                <div className="flex flex-col items-center relative">
                  {/* Departure point (swapped: from toLocation) */}
                  <div className="w-3 h-3 bg-heading-black rounded-sm"></div>

                  {/* Continuous vertical line from departure to arrival */}
                  <div className="w-0.5 bg-heading-black flex-1 min-h-[100px] relative overflow-visible">
                    {/* Animated moving dot - reversed for return journey */}
                    <div
                      className="absolute left-1/2 w-2.5 h-2.5 rounded-full shadow-lg"
                      style={{
                        backgroundColor: PRIMARY_COLOR,
                        animation: 'moveUp 2.5s ease-in-out infinite',
                      }}
                    />
                  </div>

                  {/* Arrival point (swapped: to fromLocation) */}
                  <div className="w-3 h-3 rounded-sm relative" style={{ backgroundColor: PRIMARY_COLOR }}>
                    {/* Animated dot at arrival point */}
                    <div
                      className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full shadow-lg"
                      style={{
                        backgroundColor: PRIMARY_COLOR,
                        animation: 'pulseAtDestination 2.5s ease-in-out infinite',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  </div>
                </div>

                {/* Location details container */}
                <div className="flex-1">
                  {/* Departure (swapped: toLocation) */}
                  <div className="mb-3">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <h3 className="font-bold text-base text-heading-black mb-0.5">
                          {toLocationData.name || toLocation || 'Pickup location'}
                        </h3>
                        {toLocationData.city && (
                          <p className="text-sm text-text-gray">{toLocationData.city}</p>
                        )}
                      </div>
                      {returnTime && (
                        <span className="text-sm text-heading-black font-medium ml-2">{returnTime}</span>
                      )}
                    </div>
                  </div>

                  {/* Travel Time and Distance (same as outward) */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-text-gray">
                      ~ {durationData.minutes} min
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-text-gray">
                      ~ {distanceData.km} Km / {distanceData.miles} Mi
                    </span>
                  </div>

                  {/* Arrival (swapped: fromLocation) */}
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <h3 className="font-bold text-base text-heading-black mb-0.5">
                          {fromLocationData.name || fromLocation || 'Drop-off location'}
                        </h3>
                        {fromLocationData.city && (
                          <p className="text-sm text-text-gray">{fromLocationData.city}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Selected Vehicle Section - Only on passenger-details page */}
          {showVehicle && selectedFleet && (
            <div className="mb-4">
              <h3 className="font-semibold text-base text-heading-black mb-3">Selected Vehicle</h3>
              <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Image 
                    src={selectedFleet.image} 
                    alt={selectedFleet.name} 
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-base text-heading-black mb-1">{selectedFleet.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-text-gray">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span> {selectedFleet.passengers} passengers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Luggage size={14} />
                      <span>{selectedFleet.suitcases} suitcases</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Price Details */}
          <div className="mb-4">
            <h3 className="font-semibold text-base text-heading-black mb-3">Price details</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-gray">Total</span>
              <span className="text-base font-semibold text-heading-black">€ {formattedPrice}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-gray">Outward</span>
              <span className="text-base font-semibold text-heading-black">€ {formatPriceValue(outwardPrice.toString())}</span>
            </div>
            {category !== 'hourly' && formData.isReturn?.value && returnPrice > 0 && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-gray">Return</span>
                  <span className="text-base font-semibold text-heading-black">€ {formatPriceValue(returnPrice.toString())}</span>
                </div>
                {returnDiscountAmount > 0 && returnDiscountPercent > 0 && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-green-600">Return Discount ({returnDiscountPercent}%)</span>
                    <span className="text-base font-semibold text-green-600">-€ {formatPriceValue(returnDiscountAmount.toString())}</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Service Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-green-500 rounded-full bg-green-50">
              <Check size={14} className="text-green-500" />
              <span className="text-xs text-green-700 font-medium">Free cancellation</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full bg-white">
              <Check size={14} className="text-heading-black" />
              <span className="text-xs text-text-gray font-medium">Door-to-door service</span>
            </div>
          </div>
        </div>
      </div>


      <style>{`
        @keyframes moveDown {
          0% {
            top: 0%;
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
          50% {
            top: 50%;
            opacity: 1;
            transform: translateX(-50%) scale(1.2);
          }
          90% {
            top: 100%;
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
          100% {
            top: 100%;
            opacity: 0;
            transform: translateX(-50%) scale(0.8);
          }
        }
        @keyframes moveUp {
          0% {
            top: 100%;
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
          50% {
            top: 50%;
            opacity: 1;
            transform: translateX(-50%) scale(1.2);
          }
          90% {
            top: 0%;
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
          100% {
            top: 0%;
            opacity: 0;
            transform: translateX(-50%) scale(0.8);
          }
        }
        @keyframes pulseAtDestination {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          40% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
          60% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </>
  );
}

export default PickupTripDetails;
