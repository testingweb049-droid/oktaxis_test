import StatusCard from '@/components/Sections/StatusCard'

import { useRouter, useSearchParams } from 'next/navigation';
import React, { SetStateAction, useEffect } from 'react'

function PaymentDone({ setPaymentDone, paymentDone }: { setPaymentDone: React.Dispatch<SetStateAction<boolean>>, paymentDone:boolean }) {
    const search = useSearchParams()
    const paymentId = search.get("paymentId")
    const router = useRouter()

    useEffect(() => {
        if (paymentId) {
            setPaymentDone(true);
            router.push('/order-placed')
        }
    }, [paymentId])
    return (
        <div className={`absolute w-full h-full z-50  hidden ${paymentDone ? "visible" : "hidden"} `}>
            <div className="w-full h-full bg-black/30 flex items-center justify-center transition-all duration-300 relative">

                <StatusCard type="success" onClose={() => { setPaymentDone(false) }} />
            </div>
        </div>
    )
}

export default PaymentDone