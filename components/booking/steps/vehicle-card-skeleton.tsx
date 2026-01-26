"use client";

export function VehicleCardSkeleton() {
  return (
    <div className="flex flex-col bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden">
      <div className="flex flex-col px-2.5 sm:px-3 md:px-3.5 py-3 sm:py-0">
        <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4 py-2">
          <div className="flex-shrink-0 w-28 flex justify-center items-center">
            <div className="w-full h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          
          <div className="flex flex-col items-start justify-center gap-1.5 flex-1 min-w-0">
            <div className="h-5 sm:h-6 md:h-7 w-32 sm:w-36 md:w-40 bg-gray-200 rounded animate-pulse"></div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="h-3.5 sm:h-4 w-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-3.5 sm:h-4 w-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-3.5 sm:h-4 w-3 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div className="h-3 sm:h-4 w-40 sm:w-48 md:w-52 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="flex flex-col items-end justify-center gap-0.5 flex-shrink-0">
            <div className="flex flex-col items-end gap-0.5">
              <div className="h-3 sm:h-3.5 w-16 sm:w-20 bg-gray-200 rounded animate-pulse mb-0.5"></div>
              <div className="h-6 sm:h-8 md:h-10 w-20 sm:w-24 md:w-28 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-3 w-16 bg-gray-200 rounded mt-1 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="w-full border-t border-gray-200">
        <div className="w-full px-2 sm:px-2.5 md:px-3 py-2 sm:py-2 md:py-2">
          <div className="h-8 sm:h-9 md:h-10 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

