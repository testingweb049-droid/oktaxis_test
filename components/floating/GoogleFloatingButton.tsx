"use client"

import { useState, useEffect } from "react"
import { Star, X, Gift, ExternalLink } from "lucide-react"

export default function FloatingReviewWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Show the widget after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  const handleReviewClick = () => {
    window.open("https://g.page/r/Cbd6R350MtHREBM/review", "_blank")
  }

  if (isDismissed) return null

  return (
    <>
      {/* Floating Widget */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        {/* Main Widget Container */}
        <div className="relative">
          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-60 animate-pulse-slow"></div>

          {/* Floating Particles */}
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-float-1"></div>
          <div className="absolute -top-1 -right-3 w-2 h-2 bg-blue-400 rounded-full animate-float-2"></div>
          <div className="absolute -bottom-2 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-float-3"></div>
          <div className="absolute -bottom-1 -right-2 w-3 h-3 bg-green-400 rounded-full animate-float-4"></div>

          {/* Main Widget */}
          <div
            className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-500 ease-out animate-float-main ${
              isExpanded ? "w-80 h-auto" : "w-16 h-16 cursor-pointer hover:scale-110"
            }`}
            onClick={() => !isExpanded && setIsExpanded(true)}
          >
            {!isExpanded ? (
              /* Collapsed State - Floating Icon */
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl animate-gradient-shift"></div>
                <Star className="w-8 h-8 text-white animate-spin-slow relative z-10" fill="currentColor" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping"></div>
              </div>
            ) : (
              /* Expanded State - Full Widget */
              <div className="p-6 relative">
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDismiss()
                  }}
                  className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>

                {/* Header with Stars */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 animate-star-twinkle"
                        fill="currentColor"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 animate-fade-in">Rate Us!</span>
                </div>

                {/* Main Content */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 animate-slide-up">Love Our Service?</h3>
                    <p
                      className="text-sm text-gray-600 leading-relaxed animate-slide-up"
                      style={{ animationDelay: "0.1s" }}
                    >
                      Share your experience and help others discover our amazing taxi services!
                    </p>
                  </div>

                  {/* Discount Offer */}
                  <div
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 relative overflow-hidden animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
                    <div className="relative flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                        <Gift className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-800">Special Offer!</p>
                        <p className="text-xs text-green-600">Get 2.5% discount on every ride</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleReviewClick}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 animate-slide-up relative overflow-hidden group"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <Star className="w-4 h-4" fill="currentColor" />
                    <span>Leave a Review</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  {/* Footer */}
                  <p className="text-xs text-gray-500 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    Your feedback helps us improve our services
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float-main {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(5px); }
          66% { transform: translateY(-5px) translateX(-3px); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-8px) translateX(-7px); }
          66% { transform: translateY(-12px) translateX(4px); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(-4px); }
          66% { transform: translateY(-3px) translateX(6px); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-6px) translateX(3px); }
          66% { transform: translateY(-14px) translateX(-5px); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background: linear-gradient(45deg, #fbbf24, #f59e0b); }
          50% { background: linear-gradient(45deg, #f59e0b, #d97706); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
        
        @keyframes star-twinkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0px); opacity: 1; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-float-main { animation: float-main 4s ease-in-out infinite; }
        .animate-float-1 { animation: float-1 3s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 4s ease-in-out infinite 0.5s; }
        .animate-float-3 { animation: float-3 3.5s ease-in-out infinite 1s; }
        .animate-float-4 { animation: float-4 4.5s ease-in-out infinite 1.5s; }
        .animate-gradient-shift { animation: gradient-shift 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-star-twinkle { animation: star-twinkle 2s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `}</style>
    </>
  )
}
