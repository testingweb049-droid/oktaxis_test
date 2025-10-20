'use client';

import React, { useEffect, useState } from 'react';
import { getOrderById } from '@/actions/get-order';
import { OrderProps } from '@/types/OrderProps';
import { TbCopy } from 'react-icons/tb';
import useFormStore from '@/stores/FormStore';

function OrderPage({ id }: { id: string }) {
  const [order, setOrder] = useState<OrderProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { resetForm, isOrderDone } = useFormStore()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const result = await getOrderById(id);
        console.log(order)
        if (result.status === 200 && result.order) {
          setOrder(result.order);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.log('error : ', err);
        setError('Failed to fetch the order.');
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const toMiles = (km: number) => (km * 0.621371).toFixed(2);

  if (error) {
    return <div className="text-center py-40 text-2xl text-red-500">{error}</div>;
  }

  if (!order) {
    return <div className="text-center py-40 text-2xl animate-pulse">Loading...</div>;
  }

  useEffect(()=>{
    if(isOrderDone){
      resetForm()
    }
  },[])

  return (
    <div className=''>
    <div className='h-24 bg-black'></div>
   
    <div className="bg-gray-100 py-28 flex justify-center items-center min-h-screen border-b border-gray-300">
      <div className="max-w-4xl w-full bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-gray-200">
        {/* Main Headings */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white bg-brand py-4 rounded-md shadow">
            Order Details
          </h1>
        </div>

        {/* Primary Journey Info */}
        {/* Conditional Journey Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[15px] mb-8">
          <Field label="Pick-Up Location" value={order.pickup_location} />
          {order.category === 'hourly' ? (
            <>
              <Field label="Duration (hours)" value={`${order.duration ?? 0}`} />
              <Field label="Price" value={`£${Number(order.price).toFixed(2)}`} />
              <Field
                label="Pick-Up Date"
                value={
                  order.pickup_date
                    ? new Date(order.pickup_date).toLocaleDateString()
                    : 'N/A'
                }
              />
              <Field label="Pick-Up Time" value={order.pickup_time || 'N/A'} />
            </>
          ) : (
            <>
              <Field label="Drop-Off Location" value={order.dropoff_location || 'N/A'} />
              <Field label="Distance" value={order.distance ? `${toMiles(Number(order.distance))} miles` : 'N/A'} />
              <Field
                label="Pick-Up Date"
                value={
                  order.pickup_date
                    ? new Date(order.pickup_date).toLocaleDateString()
                    : 'N/A'
                }
              />
              <Field label="Pick-Up Time" value={order.pickup_time || 'N/A'} />
              <Field label="Price" value={`£${Number(order.price).toFixed(2)}`} />
              <Field label="Car" value={order.car || 'N/A'} />
            </>
          )}
        </div>


        <div className="mb-10 text-sm text-gray-600">
          <p className="font-medium text-gray-700">Order ID:</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-900 font-bold break-all">{order.id}</p>
            <TbCopy onClick={() => navigator.clipboard.writeText(order.id)} className="cursor-pointer text-gray-500 hover:text-brandColor" />
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Optional Stops & Timing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700 mb-10">
          {order.stops?.map((item,i)=>{
            return <Field key={i} label={`Stop ${i+1} Location`} value={item} />
          })}
          {/* {order.duration && <Field label="Duration" value={`${order.duration} Hours`} />} */}
          {order.is_return && (
            <>
              <Field label="Return Date" value={order.return_date ? new Date(order.return_date).toLocaleDateString() : 'N/A'} />
              <Field label="Return Time" value={order.return_time || 'N/A'} />
            </>
          )}
        </div>

        {/* Customer & Extras */}
        {/* Customer & Extras */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
          <Field label="Name" value={order.name} />
          <Field label="Email" value={order.email} />
          <Field label="Phone" value={order.phone} />

          {order.category !== 'hourly' && (
            <>
              <Field label="Flight Number" value={order.flight || 'No'} />
              <Field label="Flight Track (7£)" value={order.flight_track ? 'Yes' : 'No'} />
              <Field label="Meet & Greet (15£)" value={order.meet_greet ? 'Yes' : 'No'} />
              <Field label="Payment Method" value={order.payment_method || 'N/A'} />
            </>
          )}

          <Field label="Created At" value={new Date(order.created_at).toLocaleString()} />
        </div>

      </div>
    </div>
     </div>
  );
}

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-500 font-medium mb-1">{label}:</p>
    <p className="text-gray-900 font-semibold">{value}</p>
  </div>
);

export default OrderPage;
