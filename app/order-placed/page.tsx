'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { MdDone } from 'react-icons/md';
import { useOrder } from '@/hooks/useOrder';

function OrderPlacedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  const sessionId = searchParams.get('session_id');
  const { data: order} = useOrder(sessionId);

  // Countdown timer and redirect
  useEffect(() => {
    if (!order) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [order, router]);

  if (!order) return null;

  return (
    <div className="w-full bg-light-background flex flex-col min-h-screen">
      <div className="h-24 w-full bg-heading-black"></div>

      <div className="max-w-5xl mx-auto py-16 lg:py-24 w-full flex items-center justify-center flex-col gap-6 lg:gap-12 text-center p-3">
        <div className="w-full flex items-center justify-center flex-col gap-3 lg:gap-5">
          <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center">
            <MdDone className="text-heading-black" size={45} />
          </div>
          <div className="text-heading-black text-lg font-medium">
            Great choice{order.name ? `, ${order.name}` : ''}!
          </div>
          <div className="text-heading-black text-2xl lg:text-4xl font-bold">
            YOUR RESERVATION IS CONFIRMED
          </div>
          {order.email && (
            <div className="text-heading-black text-lg">
              We&apos;ve sent a confirmation email to {order.email}
            </div>
          )}
          <div className="text-text-gray text-sm mt-2">
            Redirecting to home in {countdown} second{countdown !== 1 ? 's' : ''}...
          </div>
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
                {order.pickup_location && (
                  <div className="flex items-start gap-3 md:gap-5">
                    <div className="max-lg:text-sm text-heading-black">{order.pickup_location}</div>
                  </div>
                )}
                {order.stops && order.stops.length > 0 && order.stops.map((stop, index) => (
                  <div key={index} className="flex items-start gap-3 md:gap-5">
                    <div className="max-lg:text-sm text-heading-black">{stop}</div>
                  </div>
                ))}
                {order.category === 'hourly' && order.duration && (
                  <div className="flex items-start gap-3 md:gap-5">
                    <div className="max-lg:text-sm text-heading-black">{order.duration} Hours</div>
                  </div>
                )}
                {order.category !== 'hourly' && order.dropoff_location && (
                  <div className="flex items-start gap-3 md:gap-5">
                    <div className="max-lg:text-sm text-heading-black">{order.dropoff_location}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-text-gray text-sm font-medium">Pickup Date & Time</div>
              <div className="text-heading-black font-semibold">
                {order.pickup_date 
                  ? new Date(order.pickup_date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'N/A'}{' '}
                {order.pickup_time || ''}
              </div>
            </div>
          </div>

          {order.fleet && (
            <div className="max-lg:rounded-t-xl lg:rounded-r-xl border-2 border border-text-gray shadow-lg p-4 gap-1 flex flex-col items-center justify-center bg-light-background max-lg:order-1">
              {order.fleet.image && (
                <div className="relative w-full h-64 flex items-center justify-center bg-white rounded-lg">
                  <img
                    src={order.fleet.image}
                    alt={order.fleet.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="font-bold text-heading-black text-lg">{order.fleet.name}</div>
              {order.fleet.cars && (
                <div className="text-text-gray text-sm text-center">{order.fleet.cars}</div>
              )}
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
