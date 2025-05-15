'use client';

import React, {  useEffect, useState } from 'react';
import { getOrderById } from '@/actions/get-order';
import { OrderProps } from '@/types/OrderProps';
import { TbCopy } from "react-icons/tb";


function OrderPage({ id }: { id: string }) {
  const [order, setOrder] = useState<OrderProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const result = await getOrderById(id);
        if (result.status === 200 && result.order) {
          setOrder(result.order);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.log("error : ",err)
        setError('Failed to fetch the order.');
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);



  if (error) {
    return <div className="text-center py-40 text-2xl text-red-500">{error}</div>;
  }

  if (!order) {
    return <div className="text-center py-40 text-2xl animate-pulse">Loading...</div>;
  }

  return (
    <div className="bg-black/5 py-28 flex justify-center items-center min-h-screen border-b border-gray-500">
     
    <div className="max-w-4xl w-full mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-2xl">
      {/* Main Heading */}
      <div className='flex flex-col gap-2 '>

      <h1 className="text-2xl font-semibold text-center mb-8  border border-y border-brandColor py-3 bg-brandColor text-brand">
       Order Details  
      </h1>
      <h1 className="text-2xl font-semibold text-center mb-8 text-brandColor  border-y border-brandColor py-3">
      {order.category.replace('-',' ').toUpperCase()} 
      </h1>
      </div>
      <div className="space-y-6">
        {/* Order Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-gray-700">Order ID:</p>
            <div className='flex items-center gap-2'>
            <p className="text-gray-900 font-bold">{order.id}</p>
            <TbCopy onClick={()=>{navigator.clipboard.writeText(order.id)}} />
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Price:</p>
            <p className="text-gray-900 font-bold">${order.price}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Car:</p>
            <p className="text-gray-900 font-bold">{order.car}</p>
          </div>
          {order.distance && (
            <div>
              <p className="font-semibold text-gray-700">Distance:</p>
              <p className="text-gray-900 font-bold">{order.distance} km</p>
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-700">Pick-Up Date:</p>
            <p className="text-gray-900 font-bold">
              {new Date(order.pickup_date).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Pick-Up Time:</p>
            <p className="text-gray-900 font-bold">
              {order.pickup_time}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Pick-Up Location:</p>
            <p className="text-gray-900 font-bold">{order.pickup_location}</p>
          </div>
          { order.stop_1 &&
            <div>
            <p className="font-semibold text-gray-700">Stop 1 Location:</p>
            <p className="text-gray-900 font-bold">{order.stop_1}</p>
          </div>}
          { order.stop_2 &&
            <div>
            <p className="font-semibold text-gray-700">Stop 2 Location:</p>
            <p className="text-gray-900 font-bold">{order.stop_2}</p>
          </div>}
          { order.stop_3 &&
            <div>
            <p className="font-semibold text-gray-700">Stop 3 Location:</p>
            <p className="text-gray-900 font-bold">{order.stop_3}</p>
          </div>}

          {order.dropoff_location && <div>
            <p className="font-semibold text-gray-700">Drop-Off Location:</p>
            <p className="text-gray-900 font-bold">{order.dropoff_location}</p>
          </div>}
          {order.duration && (
            <div>
              <p className="font-semibold text-gray-700">Duration:</p>
              <p className="text-gray-900 font-bold">
                {order.duration} Hours
              </p>
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-700">Passengers:</p>
            <p className="text-gray-900 font-bold">{order.passengers}</p>
          </div>
          
          <div>
            <p className="font-semibold text-gray-700">Kids:</p>
            <p className="text-gray-900 font-bold">{order.kids}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Bags:</p>
            <p className="text-gray-900 font-bold">{order.bags}</p>
          </div>
          </div>
          <div className='w-full h-1 bg-black rounded-full'></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-gray-700">Name:</p>
            <p className="text-gray-900 font-bold">{order.name}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Email:</p>
            <p className="text-gray-900 font-bold">{order.email}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Phone:</p>
            <p className="text-gray-900 font-bold">{order.phone}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Flight:</p>
            <p className="text-gray-900 font-bold">{order.flight}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Flight Track (7£):</p>
            <p className="text-gray-900 font-bold">{order.flight_track}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Meet & Greet (15£):</p>
            <p className="text-gray-900 font-bold">{order.meet_greet}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Payment Method:</p>
            <p className="text-gray-900 font-bold">{order.payment_method}</p>
          </div>
        
          
          <div>
            <p className="font-semibold text-gray-700">Created At:</p>
            <p className="text-gray-900 font-bold">
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
     
    </div>
  </div>
  
  );
}

export default OrderPage;
