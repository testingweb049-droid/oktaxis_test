'use client'

import {
  Clock,
  MapPin,
  Users,
  Car,
  Briefcase,
  CreditCard,
  Phone,
} from 'lucide-react'
import Image from 'next/image'
import { useOrderContext } from '../../context/OrderContext'

interface StatusCardProps {
  type: 'success' | 'error'
  onClose: () => void
}

export default function StatusCard({ type, onClose }: StatusCardProps) {
  const { order } = useOrderContext()

  if (!order) {
    return <p className="text-center text-red-500 py-12">Order not found.</p>
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-7 flex flex-col items-center">
      <div className="max-w-2xl w-full text-center">
        {/* Icon + Header */}
        <div className="mb-8">
          <Image
            src="/successIcon.svg"
            alt="Booking Success"
            width={96}
            height={96}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 text-sm mb-1">
            Thank you for choosing TransferPro
          </p>
          <p className="text-gray-800 font-semibold">{order.id}</p>
        </div>

        {/* Transfer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 text-sm text-left text-gray-700">
          <Detail icon={<MapPin />} title="Pickup Location" value={order.pickup_location ?? 'N/A'} />

          {order.category === 'hourly' ? (
            <>
              <Detail icon={<Clock />} title="Pickup Date" value={order.pickup_date ? new Date(order.pickup_date).toLocaleDateString() : 'N/A'} />
              <Detail icon={<Clock />} title="Pickup Time" value={order.pickup_time ?? 'N/A'} />
              <Detail icon={<Car />} title="Car" value={order.car ?? 'N/A'} />
              <Detail icon={<Briefcase />} title="Duration" value={`${order.duration ?? 0} hours`} />
              <Detail icon={<Briefcase />} title="Flight" value={order.flight ?? 'No'} />
              <Detail icon={<Briefcase />} title="Flight Track (£7)" value={order.flight_track ? 'Yes' : 'No'} />
              <Detail icon={<Briefcase />} title="Meet & Greet (£15)" value={order.meet_greet ? 'Yes' : 'No'} />
              <Detail icon={<CreditCard />} title="Price" value={`£${(parseFloat(order.price) || 0).toFixed(2)}`} />
            </>
          ) : (
            <>
              <Detail icon={<MapPin />} title="Dropoff Location" value={order.dropoff_location ?? 'N/A'} />
              <Detail icon={<Clock />} title="Pickup Date" value={order.pickup_date ? new Date(order.pickup_date).toLocaleDateString() : 'N/A'} />
              <Detail icon={<Clock />} title="Pickup Time" value={order.pickup_time ?? 'N/A'} />
              <Detail icon={<Clock />} title="Return Date" value={order.is_return ? (order.return_date ? new Date(order.return_date).toLocaleDateString() : 'N/A') : 'No'} />
              <Detail icon={<Clock />} title="Return Time" value={order.return_time ?? 'No'} />
              <Detail icon={<Car />} title="Car" value={order.car ?? 'N/A'} />
              <Detail icon={<Briefcase />} title="Distance" value={`${Number(order.distance ?? 0).toFixed(2)} miles`} />
              <Detail icon={<Briefcase />} title="Flight" value={order.flight ?? 'No'} />
              <Detail icon={<Briefcase />} title="Flight Track (£7)" value={order.flight_track ? 'Yes' : 'No'} />
              <Detail icon={<Briefcase />} title="Meet & Greet (£15)" value={order.meet_greet ? 'Yes' : 'No'} />
              <Detail icon={<CreditCard />} title="Payment Method" value={order.payment_method === 'online' ? 'Paid Online' : (order.payment_method ?? 'Not Provided')} />
              <Detail icon={<CreditCard />} title="Price" value={`£${(parseFloat(order.price) || 0).toFixed(2)}`} />
            </>
          )}

          <Detail icon={<CreditCard />} title="Order ID" value={order.id ?? 'N/A'} />
          <Detail icon={<Clock />} title="Created At" value={new Date().toLocaleString()} />
        </div>

        <div className="text-left mb-8 bg-gray-200 p-6 mt-7  rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Price Summary
          </h2>
          <div className="space-y-2">
            <PriceRow
              label="Base fare"
              amount={`£${(parseFloat(order.price) || 0).toFixed(2)}`}
            />

            <PriceRow
              label="Total paid"
              amount={`£${(parseFloat(order.price) || 0).toFixed(2)}`}
              bold
            />
            <div className="flex items-center space-x-2 pt-2">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <p className="text-gray-600 text-sm">
                {order?.payment_method === 'online'
                  ? 'Paid Online'
                  : 'Cash on Delivery'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm mt-8">
          <p className="mb-2 sm:mb-0">
            Your driver details will be sent 2 hours before pickup
          </p>
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-gray-800"
          >
            <Phone className="w-4 h-4 text-[#1E3D59]" />
            <span className="text-[#1E3D59]">Need Help?</span>
          </a>
        </div>
      </div>
    </div>
  )
}

function Detail({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode
  title: string
  value: string
}) {
  return (
    <div className="flex items-start space-x-3">
      <div className="text-gray-500 mt-1">{icon}</div>
      <div>
        <p className="text-gray-700 font-medium">{title}</p>
        <p className="text-gray-600 text-sm">{value}</p>
      </div>
    </div>
  )
}
function PriceRow({
  label,
  amount,
  bold = false,
}: {
  label: string
  amount: string
  bold?: boolean
}) {
  return (
    <div
      className={`flex justify-between items-center ${bold ? 'pt-2 border-t border-gray-200' : ''
        }`}
    >
      <p className={bold ? 'text-gray-800 font-bold' : 'text-gray-700'}>
        {label}
      </p>
      <p className={bold ? 'text-gray-800 font-bold' : 'text-gray-700'}>
        {amount}
      </p>
    </div>
  )
}