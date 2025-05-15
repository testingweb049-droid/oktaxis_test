'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
interface StatusCardProps {
  type: 'success' | 'error';
  onClose: () => void;
}

export function StatusCard({ type, onClose }: StatusCardProps) {
  const router = useRouter()
  return (
    <Card className="w-full max-w-xs mx-auto shadow-lg bg-white">
      <CardContent className="pt-6 text-center space-y-4">
        <div className={`mx-auto size-16 rounded-full flex items-center justify-center ${
          type === 'success' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {type === 'success' ? (
            <span role="img" aria-label="success" className="text-3xl">
              😊
            </span>
          ) : (
            <span role="img" aria-label="error" className="text-3xl">
              😔
            </span>
          )}
        </div>
        
        <div className={`text-xl font-semibold ${
          type === 'success' ? 'text-brand' : 'text-red-600'
        }`}>
          {type === 'success' ? 'Success' : 'Error!'}
        </div>
        
        <p className="text-gray-600">
          {type === 'success' 
            ? 'Your request was submitted. Please check your email.' 
            : 'Something went wrong.'}
        </p>
        
        <Button 
             onClick={() => {
                if (type === 'success') {
                  document.body.style.overflow = 'auto'
                  router.replace('/')
                  // window.location.reload(); 

                  onClose(); 
                } else {
                  onClose(); 
                }
              }}
          className={`w-full text-white ${
            type === 'success' 
              ? 'bg-brand hover:bg-brand' 
              : 'bg-brand hover:bg-brand'
          }`}
        >
          {type === 'success' ? 'Done' : 'Try Again'}
        </Button>
      </CardContent>
    </Card>
  )
}
