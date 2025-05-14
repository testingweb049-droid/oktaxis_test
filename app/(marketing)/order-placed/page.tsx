'use client'
import { StatusCard } from '@/components/Sections/StatusCard'
import { useRouter } from 'next/navigation'
import React from 'react'

function Page() {
  const router = useRouter()
  return (
    <div className={` w-full h-full z-50 `}>
      <div className="w-full h-full bg-black/5 flex items-center justify-center transition-all duration-300 relative px-4 py-20 ">

        <StatusCard type="success" onClose={() => { router.push("/") }} />
      </div>
    </div>
  )
}

export default Page