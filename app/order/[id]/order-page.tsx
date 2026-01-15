'use client';

import React, { useEffect, useState } from 'react';
import { getOrderById } from '@/actions/get-order';
import useFormStore from '@/stores/form-store';
import { TbCopy } from 'react-icons/tb';
import { MdOutlineFlight, MdOutlineEmail, MdOutlinePhone, MdOutlinePayment, MdAirlines } from 'react-icons/md';
import { IoCarSportSharp } from 'react-icons/io5';
import { BiUserCircle } from 'react-icons/bi';
import Image from 'next/image';
import { Timer } from 'lucide-react';
import WhiteLogo from '@/assets/logo-white.png';

interface OrderPageProps {
  id: string;
}

export interface OrderProps {
  id: number;
  category: string;
  price: string;
  car: string;
  distance?: string | null;
  stops?: string[] | null;
  pickup_date?: string | null;
  pickup_time?: string | null;
  return_date?: string | null;
  return_time?: string | null;
  is_return?: boolean | null;
  pickup_location: string;
  dropoff_location?: string | null;
  passengers: number;
  bags: number;
  name: string;
  email: string;
  phone: string;
  flight_name?: string | null;
  flight_number?: string | null;
  payment_id?: string | null;
  payment_method?: string | null;
  duration?: number | null;
  flight_track?: boolean | null;
  meet_greet?: boolean | null;
  extra_stops_count?: number | null;
  return_flight_track?: boolean | null;
  return_meet_greet?: boolean | null;
  return_extra_stops_count?: number | null;
  instructions?: string | null;
  updated_at: string;
  created_at: string;
}

function orderPage({ id }: OrderPageProps) {
  const [order, setOrder] = useState<OrderProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { resetForm, isOrderDone } = useFormStore();

  useEffect(() => {
    if (!id || id === 'undefined' || id === 'null') {
      setError('Invalid order ID');
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getOrderById(id);

        if (result.status === 200 && result.order) {
          const orderData = result.order;

          // Verify payment was confirmed before showing order
          if (!orderData.payment_id) {
            setError('Payment not confirmed for this order. Please contact support.');
            setLoading(false);
            return;
          }

          // Convert Date fields to string (handle both Date objects and strings)
          const formatDateField = (date: any): string | null => {
            if (!date) return null;
            if (typeof date === 'string') return date;
            if (date instanceof Date) return date.toISOString();
            return null;
          };

          const formattedOrder: OrderProps = {
            ...orderData,
            pickup_date: formatDateField(orderData.pickup_date),
            return_date: formatDateField(orderData.return_date),
            updated_at: formatDateField(orderData.updated_at) || '',
            created_at: formatDateField(orderData.created_at) || '',
          };

          setOrder(formattedOrder);
        } else {
          setError(result.error || 'Order not found.');
        }
      } catch (err: unknown) {
        console.error('Error in OrderPage:', err);
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (isOrderDone) resetForm();
  }, [isOrderDone, resetForm]);

  const formatMiles = (miles?: string | number | null): string => {
    if (!miles && miles !== 0) return '0';
    const num = typeof miles === 'number' ? miles : parseFloat(miles);
    return isNaN(num) ? '0' : num.toFixed(2);
  };

  const formatPrice = (price: string | null | undefined): string => {
    if (!price) return '£0.00';
    const num = parseFloat(price);
    return isNaN(num) ? '£0.00' : `£${num.toFixed(2)}`;
  };

  const handleCopy = (text: string, field: string): void => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }).catch((copyError: Error) => {
      console.error('Failed to copy text:', copyError);
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Order Details</h2>
          <p className="text-gray-600">Please wait while we fetch your order information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Order</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No order found
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600">The requested order could not be found.</p>
        </div>
      </div>
    );
  }

  const stops = order.stops || [];

  // The stored price is the TOTAL price including all extras
  const totalPrice = Number(order.price) || 0;
  
  // Calculate all extras fees using constants
  const MEET_GREET_FEE = 15;
  const FLIGHT_TRACK_FEE = 7;
  const EXTRA_STOP_FEE = 7;
  
  const meetGreetPrice = order.meet_greet ? MEET_GREET_FEE : 0;
  const flightTrackPrice = order.flight_track ? FLIGHT_TRACK_FEE : 0;
  const extraStopsPrice = (order.extra_stops_count || 0) * EXTRA_STOP_FEE;
  const returnMeetGreetPrice = order.return_meet_greet ? MEET_GREET_FEE : 0;
  const returnFlightTrackPrice = order.return_flight_track ? FLIGHT_TRACK_FEE : 0;
  const returnExtraStopsPrice = (order.return_extra_stops_count || 0) * EXTRA_STOP_FEE;
  
  // Total of all extras
  const totalExtras = meetGreetPrice + flightTrackPrice + extraStopsPrice + 
                      returnMeetGreetPrice + returnFlightTrackPrice + returnExtraStopsPrice;
  
  // Price without extras (this is the transfer price)
  const transferPriceWithoutExtras = Math.max(0, totalPrice - totalExtras);
  
  // For return trips, calculate base and return prices
  // The stored price includes both trips with discount applied
  let basePrice = transferPriceWithoutExtras;
  let returnPrice = 0;
  
  if (order.is_return && order.category === 'trip') {
    // For return trips, the base price is for one-way, return is discounted
    // Since the total already includes discount, we split it roughly
    basePrice = transferPriceWithoutExtras / 1.9; // Approximate split accounting for discount
    returnPrice = transferPriceWithoutExtras - basePrice;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="h-14 sm:h-20 w-full bg-black"></div>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Order Header */}
        <header className="bg-heading-black text-white flex flex-col sm:flex-row justify-between items-center px-6 sm:px-8 py-6 rounded-2xl mb-8">
          <div className="mb-4 sm:mb-0">
            <Image
              src={WhiteLogo}
              alt="OKTaxis Logo"
              width={140}
              height={70}
              className="w-24 sm:w-32 object-contain"
              priority
            />
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm text-gray-300 mb-1">Order ID</p>
            <div className="flex items-center gap-2 justify-center sm:justify-end">
              <p className="text-white font-medium text-sm sm:text-base">#{order.id}</p>
              <button
                onClick={() => handleCopy(order.id.toString(), 'orderId')}
                className="flex items-center gap-1 text-gray-400 hover:text-gray-200 transition-colors"
                title="Copy Order ID"
              >
                <TbCopy className="text-lg" />
                {copiedField === 'orderId' && (
                  <span className="text-xs text-green-400">Copied!</span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SummaryCard
              label="Total Amount"
              value={formatPrice(order.price)}
              color="text-green-600"
            />
            {order.category === 'hourly' ? (
              <SummaryCard
                label="Duration"
                value={`${order.duration || 0} hours`}
              />
            ) : (
              <SummaryCard
                label="Distance"
                value={`${formatMiles(order.distance)} miles`}
              />
            )}
            <SummaryCard
              label="Trip Type"
              value={order.category?.toUpperCase() || 'N/A'}
            />
          </div>

          {/* Route Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <IoCarSportSharp className="text-blue-600 text-xl" />
              Route Information
            </h2>
            <div className="relative pl-6">
              {/* Pickup Location */}
              <TimelineItem
                color="var(--color-text-gray)"
                label="Pick-Up Location"
                value={order.pickup_location}
                date={order.pickup_date}
                time={order.pickup_time}
                dateLabel="Pickup Date"
                timeLabel="Pickup Time"
              />

              {/* Stops */}
              {stops.map((stop, index) => (
                <TimelineItem
                  key={index}
                  color="var(--color-text-gray)"
                  label={`Stop ${index + 1}`}
                  value={stop}
                />
              ))}

              {/* Destination or Duration */}
              {order.category === 'hourly' ? (
                <TimelineItem
                  color="var(--color-text-gray)"
                  label="Duration"
                  value={`${order.duration || 0} hours`}
                />
              ) : (
                <TimelineItem
                  color="var(--color-text-gray)"
                  label="Drop-Off Location"
                  value={order.dropoff_location || 'N/A'}
                />
              )}

              {/* Return Trip */}
              {order.is_return && order.return_date && (
                <>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">Return Trip</h3>
                    <TimelineItem
                      color="var(--color-text-gray)"
                      label="Pick-Up Location"
                      value={order.dropoff_location || order.pickup_location}
                      date={order.return_date}
                      time={order.return_time}
                      dateLabel="Return Date"
                      timeLabel="Return Time"
                    />
                    <TimelineItem
                      color="var(--color-text-gray)"
                      label="Drop-Off Location"
                      value={order.pickup_location}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trip Details */}
            <InfoCard title="Trip Details">
              <InfoField label="Car Type" value={order.car || 'N/A'} />
              <InfoField label="Trip Type" value={order.category?.toUpperCase() || 'N/A'} />
              {order.is_return && (
                <>
                  <InfoField label="Return Date" value={formatDate(order.return_date)} />
                  <InfoField label="Return Time" value={formatTime(order.return_time)} />
                </>
              )}
              <InfoField label="Flight Tracking" value={order.flight_track ? 'Yes' : 'No'} />
              <InfoField label="Meet & Greet" value={order.meet_greet ? 'Yes' : 'No'} />
              {order.is_return && (
                <InfoField label="Return Meet & Greet" value={order.return_meet_greet ? 'Yes' : 'No'} />
              )}
              {order.extra_stops_count && order.extra_stops_count > 0 && (
                <InfoField label="Extra Stops" value={order.extra_stops_count.toString()} />
              )}
              {order.return_extra_stops_count && order.return_extra_stops_count > 0 && (
                <InfoField label="Return Extra Stops" value={order.return_extra_stops_count.toString()} />
              )}
            </InfoCard>

            {/* Passenger & Vehicle Info */}
            <InfoCard title="Passenger & Vehicle">
              <InfoField label="Passengers" value={order.passengers?.toString() || 'N/A'} />
              <InfoField label="Bags" value={order.bags?.toString() || 'N/A'} />
            </InfoCard>

            {/* Customer Information */}
            <InfoCard title="Customer Information">
              <InfoField
                label="Name"
                value={order.name}
                icon={<BiUserCircle className="text-blue-600" />}
                onCopy={() => handleCopy(order.name, 'name')}
                copied={copiedField === 'name'}
              />
              <InfoField
                label="Email"
                value={order.email}
                icon={<MdOutlineEmail className="text-green-600" />}
                onCopy={() => handleCopy(order.email, 'email')}
                copied={copiedField === 'email'}
              />
              <InfoField
                label="Phone"
                value={order.phone}
                icon={<MdOutlinePhone className="text-purple-600" />}
                onCopy={() => handleCopy(order.phone, 'phone')}
                copied={copiedField === 'phone'}
              />
              {order.flight_number && (
                <InfoField
                  label="Flight Number"
                  value={order.flight_number}
                  icon={<MdOutlineFlight className="text-orange-600" />}
                />
              )}
              {order.flight_name && (
                <InfoField
                  label="Airline"
                  value={order.flight_name}
                  icon={<MdAirlines className="text-red-600" />}
                />
              )}
              {order.payment_id && (
                <InfoField
                  label="Payment ID"
                  value={order.payment_id}
                  icon={<MdOutlinePayment className="text-indigo-600" />}
                  onCopy={() => handleCopy(order.payment_id || '', 'paymentId')}
                  copied={copiedField === 'paymentId'}
                />
              )}
              <InfoField
                label="Order Date"
                value={formatDate(order.created_at)}
                icon={<Timer className="text-gray-600" size={18} />}
              />
            </InfoCard>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Price Breakdown</h2>
            <div className="space-y-3 text-sm">
              {/* Base Transfer */}
              {order.is_return && order.category === 'trip' ? (
                <>
                  <PriceItem label={`${order.car} Transfer (One-way)`} value={formatPrice(basePrice.toFixed(2))} />
                  <PriceItem label={`${order.car} Transfer (Return)`} value={formatPrice(returnPrice.toFixed(2))} />
                </>
              ) : (
                <PriceItem label={`${order.car} Transfer`} value={formatPrice(basePrice.toFixed(2))} />
              )}

              {/* Additional Services */}
              {meetGreetPrice > 0 && (
                <PriceItem label="Meet & Greet" value={formatPrice(meetGreetPrice.toFixed(2))} />
              )}
              {flightTrackPrice > 0 && (
                <PriceItem label="Flight Track" value={formatPrice(flightTrackPrice.toFixed(2))} />
              )}
              {extraStopsPrice > 0 && (
                <PriceItem
                  label={`Extra Stops (${order.extra_stops_count})`}
                  value={formatPrice(extraStopsPrice.toFixed(2))}
                />
              )}

              {/* Return Trip Services */}
              {returnMeetGreetPrice > 0 && (
                <PriceItem label="Return Meet & Greet" value={formatPrice(returnMeetGreetPrice.toFixed(2))} />
              )}
              {returnFlightTrackPrice > 0 && (
                <PriceItem label="Return Flight Track" value={formatPrice(returnFlightTrackPrice.toFixed(2))} />
              )}
              {returnExtraStopsPrice > 0 && (
                <PriceItem
                  label={`Return Extra Stops (${order.return_extra_stops_count})`}
                  value={formatPrice(returnExtraStopsPrice.toFixed(2))}
                />
              )}

              {/* Instructions */}
              {order.instructions && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700">
                    <span className="font-medium">Instructions:</span> {order.instructions}
                  </p>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t-2 border-dashed border-gray-300 mt-6 pt-4 text-lg font-bold text-gray-900">
              <span>Total Amount</span>
              <span className="text-green-600">{formatPrice(order.price)}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */

interface SummaryCardProps {
  label: string;
  value: string;
  color?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
    <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
    <p className={`text-xl font-bold ${color || 'text-gray-800'}`}>{value}</p>
  </div>
);

interface TimelineItemProps {
  color: string;
  label: string;
  value?: string;
  date?: string | null;
  time?: string | null;
  timeLabel?: string; // Optional label for time (e.g., "Pickup Time", "Return Time")
  dateLabel?: string; // Optional label for date (e.g., "Pickup Date", "Return Date")
}

const TimelineItem: React.FC<TimelineItemProps> = ({ color, label, value, date, time, timeLabel, dateLabel }) => (
  <div className="relative pb-6 last:pb-0">
    <div
      className="absolute -left-0.5 w-4 h-4 top-1 rounded-full border-2 border-white shadow-sm"
      style={{ backgroundColor: color }}
    ></div>
    <div className="ml-6">
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      {(date || time) && (
        <div className="text-sm font-semibold text-blue-600 mt-1 bg-blue-50 px-3 py-1.5 rounded border border-blue-200 inline-block">
      {date && (
            <span>
              {dateLabel || 'Date'}: <span className="font-bold">{formatDate(date)}</span>
            </span>
          )}
          {date && time && <span className="mx-2">•</span>}
          {time && (
            <span>
              {timeLabel || 'Time'}: <span className="font-bold">{formatTime(time)}</span>
            </span>
      )}
        </div>
      )}
      {value && (
        <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded border">{value}</p>
      )}
    </div>
  </div>
);

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

interface InfoFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  onCopy?: () => void;
  copied?: boolean;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, icon, onCopy, copied = false }) => (
  <div className="flex items-start justify-between group">
    <div className="flex items-start gap-3 flex-1">
      {icon && <span className="text-lg mt-0.5 flex-shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">
        <p className="text-gray-500 text-xs font-medium">{label}</p>
        <p className="text-gray-800 font-medium text-sm break-words">{value}</p>
      </div>
    </div>
    {onCopy && (
      <button
        onClick={onCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600"
        title="Copy to clipboard"
      >
        {copied ? (
          <span className="text-green-500 text-xs">Copied!</span>
        ) : (
          <TbCopy size={16} />
        )}
      </button>
    )}
  </div>
);

interface PriceItemProps {
  label: string;
  value: string;
  isDiscount?: boolean;
}

const PriceItem: React.FC<PriceItemProps> = ({ label, value, isDiscount = false }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-gray-600">{label}</span>
    <span className={`font-medium ${isDiscount ? 'text-red-600' : 'text-gray-800'}`}>
      {value}
    </span>
  </div>
);

/* ---------- Utility Functions ---------- */

function formatDate(date?: string | null): string {
  if (!date) return 'N/A';
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'N/A';
  }
}

function formatTime(time?: string | null): string {
  if (!time) return 'N/A';
  try {
    // If time is in HH:mm format, convert to 12h format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  } catch {
    return time || 'N/A';
  }
}

const OrderPage = orderPage;
export default OrderPage;
