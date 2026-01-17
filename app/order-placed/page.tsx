'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useRef, Suspense } from 'react';
import { MdDone } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useProcessCheckoutSuccess } from '@/hooks/useCheckout';
import { useFleets } from '@/hooks/useFleets';
import type { FleetType } from '@/types/fleet.types';

function OrderPlacedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [orderData, setOrderData] = useState<any>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  
  // Use React Query hooks
  const processCheckoutMutation = useProcessCheckoutSuccess();
  const { data: fleetsData, isLoading: fleetsLoading } = useFleets();
  const fleets: FleetType[] = (fleetsData as FleetType[] | undefined) || [];

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
        // Process checkout success using React Query mutation
        const data = await processCheckoutMutation.mutateAsync({ sessionId });

        if (data.success && data.orderId && data.order) {
          // Booking is already created in backend by checkout-success route
          // Just save the data and display success page
          
          // Save to sessionStorage to prevent re-processing on refresh
          sessionStorage.setItem(processedKey, JSON.stringify({
            orderId: data.orderId,
            order: data.order,
            email: typeof data.order?.email === 'string' ? data.order.email : ''
          }));

          setOrderId(data.orderId);
          setOrderData(data.order);
          setEmail(typeof data.order?.email === 'string' ? data.order.email : '');
        } else {
          console.error('Failed to process checkout:', data.error);
          router.replace('/book-ride?error=payment_failed');
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
      <div className="w-full min-h-screen flex items-center justify-center bg-light-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-yellow mx-auto mb-4"></div>
          <p className="text-text-gray font-medium">Processing your order...</p>
        </div>
      </div>
    );
  }

  if (!orderId) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-light-background">
        <div className="text-center">
          <p className="text-red-600 mb-4 font-semibold">Failed to process your order</p>
          <Button asChild variant="secondary">
            <Link href="/booking">Try Again</Link>
          </Button>
        </div>
      </div>
    );
  }

  const selectedFleet = fleets.find((item) => item.name === orderData?.car);
  
  // Build locations array from order data
  const locations: any[] = [];
  if (orderData?.fromLocation || orderData?.pickup_location) {
    locations.push(orderData.fromLocation || orderData.pickup_location);
  }
  if (orderData?.stops && Array.isArray(orderData.stops)) {
    locations.push(...orderData.stops);
  }
  if (orderData?.category === 'hourly' && orderData?.duration) {
    locations.push({ value: `${orderData.duration} Hours` });
  } else if (orderData?.toLocation || orderData?.dropoff_location) {
    locations.push(orderData.toLocation || orderData.dropoff_location);
  }

  return (
    <div className="w-full bg-light-background flex flex-col min-h-screen">
      <div ref={headerRef} className="h-24 w-full bg-heading-black"></div>

      <div className="max-w-5xl mx-auto py-16 lg:py-24 w-full flex items-center justify-center flex-col gap-6 lg:gap-12 text-center p-3">
        <div className="w-full flex items-center justify-center flex-col gap-3 lg:gap-5">
          <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center">
            <MdDone className="text-heading-black" size={45} />
          </div>
          <div className="text-heading-black text-lg font-medium">
            Great choice{orderData?.name ? `, ${orderData.name}` : ''}!
          </div>
          <div className="text-heading-black text-2xl lg:text-4xl font-bold">
            YOUR RESERVATION IS CONFIRMED
          </div>
          {email && (
            <div className="text-heading-black text-lg">
              We&apos;ve sent a confirmation email to {email}
            </div>
          )}
        </div>

        <div className="w-full grid md:grid-cols-3 lg:gap-5">
          <div className="lg:col-span-2 w-full bg-white max-lg:rounded-b-xl max-lg:order-2 lg:rounded-l-xl border border-text-gray border-2 shadow-lg py-6 px-4 gap-8 flex flex-col justify-center text-start">
            <div className="text-xl lg:text-2xl font-bold text-heading-black">
              Your itinerary
            </div>

            <div className="flex gap-3 w-full">
              <div className="w-1 h-full py-2">
                <div className="w-full h-full bg-gradient-to-b from-primary-yellow to-primary-yellow/80 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-3 w-full">
                {locations.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 md:gap-5">
                    <div className="max-lg:text-sm text-heading-black">
                      {typeof item === 'string' ? item : item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-text-gray text-sm font-medium">Pickup Date & Time</div>
              <div className="text-heading-black font-semibold">
                {orderData?.date || orderData?.pickup_date
                  ? new Date(orderData.date || orderData.pickup_date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'N/A'}{' '}
                {orderData?.time || orderData?.pickup_time || ''}
              </div>
            </div>

            <div className="flex items-center justify-end w-full pt-4">
              <div className="flex items-center gap-5">
                <Button asChild variant="ghost">
                  <Link href="/">Home</Link>
                </Button>
                <Button asChild variant="default" size="lg" className="shadow-lg">
                  <Link href={`/order/${orderId}`}>View Order Details</Link>
                </Button>
              </div>
            </div>
          </div>

          {selectedFleet && (
            <div className="max-lg:rounded-t-xl lg:rounded-r-xl border-2 border border-text-gray shadow-lg p-4 gap-5 flex flex-col items-center justify-center bg-light-background max-lg:order-1">
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
              <div className="font-bold text-heading-black text-lg">{selectedFleet.name}</div>
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
        <div className="w-full min-h-screen flex items-center justify-center bg-light-background">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-yellow mx-auto mb-4"></div>
            <p className="text-text-gray font-medium">Loading...</p>
          </div>
        </div>
      }
    >
      <OrderPlacedContent />
    </Suspense>
  );
}

export default Page;
