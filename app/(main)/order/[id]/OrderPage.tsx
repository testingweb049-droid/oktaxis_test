'use client';

import React, { useEffect, useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Plane,
  CreditCard,
  MapPin,
  ClipboardCopy,
  CheckCircle2,
  Navigation,
  Calendar,
  Users,
  Luggage,
  Star,
  Car,
} from 'lucide-react';
import { getOrderById } from '@/actions/get-order';
import useFormStore from '@/stores/FormStore';
import { fleetsLocal } from '@/lib/fleet-data';
import Image from 'next/image';

// 🕒 Helpers
const formatDate = (date?: string | Date | null) => {
  if (!date) return '';
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
};

const formatTime = (time?: string | null) => {
  if (!time) return '';
  try {
    const parsed = new Date(`1970-01-01T${time}`);
    return parsed.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch {
    return time;
  }
};

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

export default function OrderPage({ id }: OrderPageProps) {
  const [order, setOrder] = useState<OrderProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { resetForm, isOrderDone } = useFormStore();

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const result = await getOrderById(id);
        if (result.status === 200 && result.order) {
          const orderData = result.order;

          // ✅ Verify payment was confirmed before showing order
          if (!orderData.payment_id) {
            setError('Payment not confirmed for this order. Please contact support.');
            setLoading(false);
            return;
          }

          // Convert Date fields to string
          const formattedOrder = {
            ...orderData,
            pickup_date: orderData.pickup_date ? orderData.pickup_date.toISOString() : null,
            return_date: orderData.return_date ? orderData.return_date.toISOString() : null,
            updated_at: orderData.updated_at ? orderData.updated_at.toISOString() : '',
            created_at: orderData.created_at ? orderData.created_at.toISOString() : '',
          };

          setOrder(formattedOrder);
        } else {
          setError(result.error || 'Order not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load order.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (isOrderDone) resetForm();
  }, [isOrderDone, resetForm]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 font-medium">
        Loading your booking...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        {error}
      </div>
    );

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-52">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Booking Confirmed
            </h1>
            <p className="text-gray-600">Your ride is ready to go</p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-600 mb-1">Booking ID</p>
              <p className="font-mono font-bold text-gray-900 truncate">
                {order.id}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(String(order.id))}
              className="p-2 hover:bg-white rounded-lg transition-all duration-200"
              title="Copy ID"
            >
              {copied ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <ClipboardCopy className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 lg:flex lg:gap-8">
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              label="Total Price" 
              value={`£${Number(order.price).toFixed(2)}`} 
              icon={<CreditCard className="w-5 h-5" />} 
            />
            <StatCard 
              label="Vehicle" 
              value={order.car} 
              icon={<Car className="w-5 h-5" />} 
            />
            <StatCard 
              label="Passengers" 
              value={order.passengers} 
              icon={<Users className="w-5 h-5" />} 
            />
            <StatCard 
              label="Bags" 
              value={order.bags} 
              icon={<Luggage className="w-5 h-5" />} 
            />
          </div>

          {/* Journey Details */}
          <Section title="Journey Details" icon={<Navigation />}>
            <div className="space-y-4">
              {/* Pickup */}
              <RouteStop
                type="pickup"
                location={order.pickup_location}
                date={order.pickup_date}
                time={order.pickup_time}
              />

              {/* Stops */}
              {order.stops?.map((stop: string, i: number) => (
                <RouteStop key={i} type="stop" location={stop} number={i + 1} />
              ))}

              {/* Dropoff or Duration */}
              {order.category === 'hourly' ? (
                <RouteStop 
                  type="dropoff" 
                  location={`${order.duration} hours`} 
                />
              ) : (
                order.dropoff_location && (
                  <RouteStop type="dropoff" location={order.dropoff_location} />
                )
              )}

              {/* Return Trip */}
              {order.is_return && (
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Return Trip</h3>
                  <RouteStop
                    type="pickup"
                    location={order.dropoff_location || ''}
                    date={order.return_date}
                    time={order.return_time}
                  />
                  <RouteStop
                    type="dropoff"
                    location={order.pickup_location}
                  />
                </div>
              )}
            </div>
          </Section>

          {/* Contact & Passengers */}
          <div className="grid gap-6 mt-6">
            <Section title="Contact Information" icon={<User />}>
              <div className="grid sm:grid-cols-2 gap-4">
                <DetailItem icon={<User />} label="Name" value={order.name} />
                <DetailItem icon={<Mail />} label="Email" value={order.email} />
                <DetailItem icon={<Phone />} label="Phone" value={order.phone} />
                {order.flight_name && (
                  <DetailItem icon={<Plane />} label="Flight Name" value={order.flight_name} />
                )}
                {order.flight_number && (
                  <DetailItem icon={<Plane />} label="Flight Number" value={order.flight_number} />
                )}
              </div>
            </Section>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6 mt-8 lg:mt-0">
          {/* Vehicle Image */}
          {(() => {
            const selectedFleet = fleetsLocal.find((fleet) => fleet.name === order.car);
            return selectedFleet ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <img
                      src={selectedFleet.image}
                      alt={selectedFleet.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.error('Image failed to load:', selectedFleet.image);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="font-bold text-gray-900 text-lg text-center">{selectedFleet.name}</div>
                  <div className="text-sm text-gray-600 text-center">{selectedFleet.cars}</div>
                </div>
              </div>
            ) : null;
          })()}

          {/* Payment */}
          <Section title="Payment" icon={<CreditCard />}>
            <PaymentItem label="Method" value={order.payment_method || '—'} />
            <PaymentItem label="Booking Date" value={formatDate(order.created_at)} />
            <PaymentItem label="Pickup Date" value={formatDate(order.pickup_date)} />
            <PaymentItem label="Pickup Time" value={formatTime(order.pickup_time)} />
            {order.is_return && (
              <>
                <PaymentItem label="Return Date" value={formatDate(order.return_date)} />
                <PaymentItem label="Return Time" value={formatTime(order.return_time)} />
              </>
            )}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Paid</span>
              <span className="text-2xl font-bold text-emerald-600">£{Number(order.price).toFixed(2)}</span>
            </div>
          </Section>

          {/* Extras */}
          {(order.flight_track || order.meet_greet || order.extra_stops_count || order.instructions || 
            order.return_flight_track || order.return_meet_greet || order.return_extra_stops_count) && (
            <Section title="Extras" icon={<Star />}>
              <div className="space-y-2 text-sm">
                {order.flight_track && <p className="break-words">✓ Flight Tracking</p>}
                {order.meet_greet && <p className="break-words">✓ Meet & Greet</p>}
                {order.extra_stops_count && order.extra_stops_count > 0 && (
                  <p className="break-words">Extra Stops: {order.extra_stops_count}</p>
                )}
                {order.is_return && (
                  <>
                    {order.return_flight_track && <p className="break-words">✓ Return Flight Tracking</p>}
                    {order.return_meet_greet && <p className="break-words">✓ Return Meet & Greet</p>}
                    {order.return_extra_stops_count && order.return_extra_stops_count > 0 && (
                      <p className="break-words">Return Extra Stops: {order.return_extra_stops_count}</p>
                    )}
                  </>
                )}
                {order.instructions && (
                  <p className="break-words mt-2 pt-2 border-t border-gray-200">
                    <span className="font-medium">Instructions:</span> {order.instructions}
                  </p>
                )}
              </div>
            </Section>
          )}
        </div>
      </main>
    </div>
  );
}

const StatCard = ({ label, value, icon }: any) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-4">
    {icon && (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center">
        {icon}
      </div>
    )}
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const Section = ({ title, icon, children }: any) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full lg:w-auto">
    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
      <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg text-white">
        {icon}
      </div>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

type RouteStopType = 'pickup' | 'stop' | 'dropoff';

interface RouteStopProps {
  type: RouteStopType;
  location: string;
  date?: string | null;
  time?: string | null;
  number?: number;
}

const RouteStop = ({ type, location, date, time, number }: RouteStopProps) => {
  const config = {
    pickup: { color: 'bg-emerald-500', label: 'Pick-Up' },
    stop: { color: 'bg-blue-500', label: `Stop ${number}` },
    dropoff: { color: 'bg-red-500', label: 'Drop-Off' },
  }[type];

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full ${config.color} flex items-center justify-center text-white`}
        >
          <MapPin className="w-5 h-5" />
        </div>
        {type !== 'dropoff' && <div className="w-0.5 flex-1 bg-gray-300 mt-2"></div>}
      </div>
      <div className="flex-1 pb-6">
        <p className="font-semibold text-gray-900 mb-1">{config.label}</p>
        {date && (
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {formatDate(date)} {formatTime(time)}
          </p>
        )}
        <p className="text-sm text-gray-700 break-words">{location}</p>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }: any) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
    <div className="text-gray-400 w-5 h-5 flex-shrink-0 mt-0.5">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-900 break-all">{value}</p>
    </div>
  </div>
);

const PaymentItem = ({ label, value }: any) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);
