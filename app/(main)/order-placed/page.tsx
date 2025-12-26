'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useRef, Suspense } from 'react';
import { MdDone } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import { fleetsLocal } from '@/lib/fleet-data';

function OrderPlacedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [orderData, setOrderData] = useState<any>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const processCheckout = async () => {
      if (!sessionId) {
        router.replace('/');
        return;
      }

      // Check if this session was already processed (prevent duplicate processing on refresh)
      const processedKey = `checkout_processed_${sessionId}`;
      const alreadyProcessed = sessionStorage.getItem(processedKey);
      
      if (alreadyProcessed) {
        // Already processed - just load the data without calling API
        try {
          const savedData = JSON.parse(alreadyProcessed);
          setOrderId(savedData.orderId);
          setOrderData(savedData.order);
          setEmail(savedData.email || '');
          setLoading(false);
          return;
        } catch (e) {
          // If parsing fails, continue with API call
          console.error('Error parsing saved data:', e);
        }
      }

      try {
        const response = await fetch('/api/checkout-success', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (data.success && data.orderId) {
          // Save to sessionStorage to prevent re-processing on refresh
          sessionStorage.setItem(processedKey, JSON.stringify({
            orderId: data.orderId,
            order: data.order,
            email: data.order?.email || ''
          }));

          setOrderId(data.orderId);
          setOrderData(data.order);
          setEmail(data.order?.email || '');
        } else {
          console.error('Failed to process checkout:', data.error);
          router.replace('/booking?error=payment_failed');
        }
      } catch (error) {
        console.error('Error processing checkout:', error);
        router.replace('/booking?error=payment_failed');
      } finally {
        setLoading(false);
      }
    };

    processCheckout();
  }, [sessionId, router]);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Processing your order...</p>
        </div>
      </div>
    );
  }

  if (!orderId) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <p className="text-red-600 mb-4 font-semibold">Failed to process your order</p>
          <Link href="/booking" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  const selectedFleet = fleetsLocal.find((item) => item.name === orderData?.car);
  
  // Build locations array from order data
  const locations: any[] = [];
  if (orderData?.pickup_location) {
    locations.push(orderData.pickup_location);
  }
  if (orderData?.stops && Array.isArray(orderData.stops)) {
    locations.push(...orderData.stops);
  }
  if (orderData?.category === 'hourly' && orderData?.duration) {
    locations.push({ value: `${orderData.duration} Hours` });
  } else if (orderData?.dropoff_location) {
    locations.push(orderData.dropoff_location);
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col min-h-screen">
      <div ref={headerRef} className="h-24 w-full bg-black"></div>

      <div className="max-w-5xl mx-auto py-16 lg:py-24 w-full flex items-center justify-center flex-col gap-6 lg:gap-12 text-center p-3">
        <div className="w-full flex items-center justify-center flex-col gap-3 lg:gap-5">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <MdDone className="text-white" size={45} />
          </div>
          <div className="text-gray-800 text-lg font-medium">
            Great choice{orderData?.name ? `, ${orderData.name}` : ''}!
          </div>
          <div className="text-black text-2xl lg:text-4xl font-bold">
            YOUR RESERVATION IS CONFIRMED
          </div>
          {email && (
            <div className="text-gray-800 text-lg">
              We&apos;ve sent a confirmation email to {email}
            </div>
          )}
        </div>

        <div className="w-full grid md:grid-cols-3 lg:gap-5">
          <div className="lg:col-span-2 w-full bg-white max-lg:rounded-b-xl max-lg:order-2 lg:rounded-l-xl border-2 border-gray-300 shadow-lg py-6 px-4 gap-8 flex flex-col justify-center text-start">
            <div className="text-xl lg:text-2xl font-bold text-gray-900">
              Your itinerary
            </div>

            <div className="flex gap-3 w-full">
              <div className="w-1 h-full py-2">
                <div className="w-full h-full bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-3 w-full">
                {locations.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 md:gap-5">
                    <div className="max-lg:text-sm text-gray-700">
                      {typeof item === 'string' ? item : item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-gray-500 text-sm font-medium">Pickup Date & Time</div>
              <div className="text-gray-900 font-semibold">
                {orderData?.pickup_date
                  ? new Date(orderData.pickup_date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'N/A'}{' '}
                {orderData?.pickup_time || ''}
              </div>
            </div>

            <div className="flex items-center justify-end w-full pt-4">
              <div className="flex items-center gap-5">
                <Link
                  href="/"
                  className="bg-gray-200 px-4 py-2 text-gray-800 font-semibold w-fit rounded-md hover:bg-gray-300 transition"
                >
                  Home
                </Link>
                <Link
                  href={`/order/${orderId}`}
                  className="bg-brand hover:bg-[#e6a200] px-6 py-3 text-black font-semibold w-fit rounded-md transition shadow-lg"
                >
                  View Order Details
                </Link>
              </div>
            </div>
          </div>

          {selectedFleet && (
            <div className="max-lg:rounded-t-xl lg:rounded-r-xl border-2 border-gray-300 shadow-lg p-4 gap-5 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 max-lg:order-1">
              <div className="relative w-full h-64 flex items-center justify-center bg-white rounded-lg">
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
              <div className="font-bold text-gray-900 text-lg">{selectedFleet.name}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      }
    >
      <OrderPlacedContent />
    </Suspense>
  );
}

export default Page;
