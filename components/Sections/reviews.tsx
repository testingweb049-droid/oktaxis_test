import React from 'react'

interface Review {
  name: string
  date: string
  platform: 'google' | 'facebook' | 'spotify'
  review: string
  rating: number
}

const reviews: Review[] = [
  {
    name: 'Marvin McKinney',
    date: '12/15/2024',
    platform: 'google',
    review: 'Absolutely brilliant service! The driver arrived right on time, and the car was immaculate. The fixed pricing gave me peace of mind, and the journey was smooth and comfortable.',
    rating: 5
  },
  {
    name: 'Bessie Cooper',
    date: '09/25/2025',
    platform: 'facebook',
    review: 'Smooth experience, great car, fair price. A top-notch experience.',
    rating: 5
  },
  {
    name: 'Dianne Russell',
    date: '11/18/2024',
    platform: 'google',
    review: 'Absolutely brilliant service! The driver arrived right on time, and the car was immaculate. The fixed pricing gave me peace of mind, and the journey was smooth and comfortable.',
    rating: 5
  },
  {
    name: 'John Doe',
    date: '01/15/2025',
    platform: 'spotify',
    review: 'Absolutely brilliant service! The driver arrived right on time, and the car was immaculate. The fixed pricing gave me peace of mind, and the journey was smooth and comfortable.',
    rating: 5
  }
]

// Star SVG Component
const StarIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.06342 1.3563L5.28467 4.96282L1.30497 5.54303C0.591294 5.64654 0.305279 6.52638 0.822831 7.03031L3.70205 9.83599L3.02107 13.7993C2.89849 14.5157 3.65302 15.0524 4.28498 14.7173L7.8452 12.846L11.4054 14.7173C12.0374 15.0496 12.7919 14.5157 12.6693 13.7993L11.9883 9.83599L14.8676 7.03031C15.3851 6.52638 15.0991 5.64654 14.3854 5.54303L10.4057 4.96282L8.62697 1.3563C8.30827 0.713449 7.38485 0.705278 7.06342 1.3563Z"
      fill="#FFB400"
    />
  </svg>
)

// Platform Logo Component
const PlatformLogo = ({ platform }: { platform: 'google' | 'facebook' | 'spotify' }) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'google':
        return (
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" className="flex-shrink-0">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>
        )
      case 'facebook':
        return (
          <div className="w-5 h-5 bg-[#1877F2] rounded-full flex items-center justify-center shadow-sm">
            <span className="text-[10px] font-bold text-white">f</span>
          </div>
        )
      case 'spotify':
        return (
          <div className="w-5 h-5 bg-[#1DB954] rounded-full flex items-center justify-center shadow-sm">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white" className="flex-shrink-0">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="absolute -bottom-0.5 -right-0.5 border-2 border-white rounded-full">
      {getPlatformIcon()}
    </div>
  )
}

// Verification Checkmark Component
const VerifiedBadge = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <circle cx="8" cy="8" r="8" fill="#10B981" />
    <path
      d="M5.5 8L7 9.5L10.5 6"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Reviews() {
  return (
    <section className="font-inter py-12 lg:py-16 bg-white">
      <div className="full-width-section mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 lg:mb-12 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
            Latest reviews from our customers
          </h2>
          <p className="text-base md:text-lg text-black">
            Hear what our clients say about their experience.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col"
            >
              {/* User Info */}
              <div className="flex items-start gap-3 mb-4">
                {/* Avatar with Platform Logo */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-600">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <PlatformLogo platform={review.platform} />
                </div>

                {/* Name and Date */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-black truncate">
                      {review.name}
                    </h3>
                    <VerifiedBadge />
                  </div>
                  <p className="text-sm text-gray-600">{review.date}</p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm md:text-base text-black mb-4 flex-1 leading-relaxed">
                {review.review}
              </p>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

