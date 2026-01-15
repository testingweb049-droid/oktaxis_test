'use client';

import { getOrderById } from '@/actions/get-order';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';

function FindOrderForm() {
  const [orderId, setOrderId] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
  const [isFetching, startFetching] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isFetching) {
      return;
    }

    startFetching(async () => {
      const res = await getOrderById(orderId);
      if (res.status !== 200 || !res.order) {
        setError(res.error ?? 'Order Not Found');
        return;
      }
      router.push(`/order/${res.order.id}`);
    });
  };

  return (
    <div className="flex justify-center py-28 items-center min-h-screen bg-gradient-to-r from-black/90 to-stone-900 w-full">
      <div className="w-full max-w-md p-2 sm:p-8 bg-white rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Find Your Order by ID
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="orderId" className="block text-lg text-gray-700 mb-2">
              Enter Order ID
            </label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g., 12345"
              className="w-full p-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <div>
            {error && <p className='text-red-500 text-center text-sm'>{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-brand text-white text-lg font-semibold rounded-xl hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand"
            >
              {isFetching ? 'Finding...' : 'Find Order'}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Looking for a specific order? Just type the ID and we'll show you the details.
        </p>
      </div>
    </div>
  );
}

export default FindOrderForm;
