'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to cars page (first step of booking)
    router.replace('/book-ride/select-car')
  }, [router])

  return null
}

export default Page