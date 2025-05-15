"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { createOrderById } from "@/actions/add-order-by-id";
import Link from "next/link";

function SuccessComponent({ orderId }: { orderId: string }) {
  const params = useSearchParams();
  const clientSecret = params.get("clientSecret");

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [orderDone, setOrderDone] = useState(false)
  
  const [email, setEmail] = useState('')
  let orderAdded= false
 async function AddOrder() {
    if (!orderId || !clientSecret  || orderAdded) {
      return;
    }
    orderAdded = true
    setError('')
   setLoading(true)
      console.log('working 1')
      const res = await createOrderById({ orderId, clientSecret })
      
      if (res.status !== 201) {
        setError(res.error);
       setLoading(false)
        return;
      }
      setEmail(res.data?.email ?? '')
      setOrderDone(true)
      setLoading(false)

    
  }

  useEffect(() => {

    if (orderId && clientSecret ) {
      AddOrder()
    }

  }, [clientSecret, orderId])




  if (!orderId && !clientSecret) {
    return <div className="py-20 text-center text-red-500">Order Id and Payment Id not Found</div>
  } else if (!orderId) {

    return <div className="py-20 text-center text-red-500">Order Id not Found</div>
  } else if (!clientSecret) {
    return <div className="py-20 text-center text-red-500">Payment Id not Found</div>
  }

  if (loading) {
    return <div className="py-20 text-center text-brand font-semibold">Please Wait Order Placing...</div>
  }

  if (error !== '') {
    return <div className="py-20 text-center text-red-500">{error}</div>
  }

  return (
    <div>
      <div className="w-full flex justify-center py-20">
        { orderDone && <div className="max-w-screen-sm w-full p-3 sm:p-8 bg-black text-white rounded-lg shadow-xl space-y-6">
          <div className="flex justify-center">
            <div className="bg-brand text-black p-3 rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.07-9.707a1 1 0 00-1.414 0L10 11.586 7.354 9.93a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-center text-2xl font-extrabold text-brand">
            Order Placed Successfully!
          </h2>

          <p className="text-center text-lg font-medium text-gray-300">
            Thank you for placing your order with us.
            <br />
            Please check your Email (
            <span className="text-brand">{email}</span>) for the order confirmation and further details.
          </p>

          <div className="flex items-center justify-center w-full">

          <Link
              href="/"
              className="text-white bg-brand px-4 py-2 rounded-md mx-auto mt-5 hover:opacity-90"
              >
              Go to Home
            </Link>
          
              </div>
        </div>}
        {!orderDone && <div className="max-w-screen-sm w-full p-3 sm:p-8 bg-black text-white rounded-sm shadow-xl space-y-6">
          <p>These is an error occur while adding order. Please contact with Admin</p>
          <p>Your Order Id : {orderId}</p>
          <p>Your Payment Id : {clientSecret}</p>
          </div>}
      </div>
    </div>
  );
}

export default SuccessComponent;
