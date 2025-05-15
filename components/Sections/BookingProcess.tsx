'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { cn } from "@/lib/utils"
import { motion, useAnimation, useInView } from 'framer-motion'
import Image from 'next/image'
import image3 from '@/assets/image3.jpg'
interface BookingStep {
  number: number
  title: string
  description: string
}

const bookingSteps: BookingStep[] = [
  {
    number: 1,
    title: "Easy Online Booking",
    description:
      "Head to our website and experience a booking system free of palaver. Select your service, schedule and preferred vehicle from the Oktaxis fleet with ease.",
  },
  {
    number: 2,
    title: "Choose Extra Services",
    description:
      "Choose a date and time and add any extra services you might need, such as luggage assistance, or special requests like child seats.",
  },
  {
    number: 3,
    title: "Confirmation",
    description:
      "When your booking is submitted, our team reviews the details and confirms them promptly so that every requirement is met to your satisfaction.",
  },
  {
    number: 4,
    title: "Seamless Chauffeur Coordination",
    description:
      "Your chauffeur will be on time and prepared to deliver a flawless journey. From start to finish, every detail reflects our commitment to excellence.",
  },
]

const CircularProgress = ({ isHovered }: { isHovered: boolean }) => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
    <circle
      className="text-blue-100"
      strokeWidth="4"
      stroke="currentColor"
      fill="transparent"
      r="48"
      cx="50"
      cy="50"
    />
    <motion.circle
      className="text-brand"
      strokeWidth="4"
      stroke="currentColor"
      fill="transparent"
      r="48"
      cx="50"
      cy="50"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isHovered ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  </svg>
)

const StepItem = ({ step, index, totalSteps }: { step: BookingStep; index: number; totalSteps: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } }
      }}
      className={cn(
        "flex flex-col items-center text-center group",
        "transition-all duration-300 ease-in-out",
        "hover:transform hover:-translate-y-1"
      )}
    >
      {/* Number Badge with Circular Progress */}
      <div 
        className="relative mb-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-20 h-20 relative">
          <CircularProgress isHovered={isHovered} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                "w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center",
                "transition-transform duration-300 group-hover:scale-110",
                "border-2 border-transparent group-hover:border-blue-50"
              )}
            >
              <span className="text-2xl font-semibold text-brand">
                {step.number}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold tracking-tight">
          {step.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function BookingProcess() {
  return (
    <section className="w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Our <span className="text-brand">Booking Process</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A simple and hassle-free way to book your journey with Oktaxis.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {bookingSteps.map((step, index) => (
              <StepItem key={step.number} step={step} index={index} totalSteps={bookingSteps.length} />
            ))}
          </div>
        </div>
       
      </div>
      <div className='px-5 w-full'>

      <div className="rounded-lg shadow-lg w-full max-h-[700px] h-full overflow-hidden max-w-screen-2xl mx-auto mt-10">
          <Image src={image3}  quality={50} alt='image 3' className='w-full h-full object-cover min-h-72'/>
        </div>
      </div>
    </section>
  )
}

