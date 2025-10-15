'use client'
import React from 'react'
import useFormStore from '@/stores/FormStore'
import LocationInput from './LocationPicker'
import { Loader } from 'lucide-react'

function HeroForm() {
  const { category, changeCategory, formError, formLoading, changeStep, formData, manageStops, setFormData } = useFormStore()
  console.log("formData ",formData)

  return (
    <div className='flex flex-col gap-5 w-full max-w-screen-sm'>
      <div className='grid grid-cols-2 gap-5'>
        <div onClick={() => changeCategory('trip')} className={`p-2 w-full text-center font-semibold rounded-lg cursor-pointer ${category==='trip' ? 'bg-brand' : 'bg-white'}`}>Trip</div>
        <div onClick={() => changeCategory('hourly')} className={`p-2 w-full text-center font-semibold rounded-lg cursor-pointer ${category==='hourly' ? 'bg-brand' : 'bg-white'}`}>Hourly</div>
      </div>

      <div className='p-3 rounded-lg bg-white flex flex-col gap-3'>
        <div className='flex gap-3 items-start'>
          {/* Left: Inputs */}
          <div className='flex flex-col gap-3 w-full'>
           <LocationInput field="fromLocation" placeholder="Pickup Location" />

      {formData.stops.map((_, i) => (
        <LocationInput
          key={i}
          field={`stops`}
          index={i}
          isStop
          placeholder={`Stop ${i + 1}`}
          onRemoveStop={() => manageStops('remove', i)}
          onAddStop={() => manageStops('add', i)}
          showAddButton
        />
      ))}

      <LocationInput field="toLocation" placeholder="Drop Off Location" />
          </div>

        
<div className={`w-6 flex flex-col items-center py-[14px] ${category === 'trip' ? 'flex' : 'hidden'}`}>
  
  {(() => {
    const locationsCount = 2 + (formData.stops?.length ?? 0); 
    const nodes: React.ReactNode[] = [];

    for (let i = 0; i < locationsCount; i++) {
      const isStart = i === 0;
      const isEnd = i === locationsCount - 1;
      const stopIndex = i - 1; 
      
      nodes.push(
        <div key={`marker-${i}`} className="relative flex items-center justify-center">
          <div
            className={`rounded-full bg-white z-10 flex items-center justify-center
              ${isStart || isEnd ? 'border-[4px] border-black w-4 h-4' : 'border-[3px] border-gray-600 w-4 h-4'}`}
          >
       
            {!isStart && !isEnd && (
              <button
                onClick={() => manageStops('remove', stopIndex)}
                className="text-xs leading-none text-gray-600 hover:text-red-500"
                title="Remove stop"
                aria-label={`Remove stop ${stopIndex + 1}`}
              >
                ×
              </button>
            )}
          </div>
        </div>
      );

   
      if (!isEnd) {
        nodes.push(
          <div key={`between-${i}`} className="flex flex-col items-center">
           
            <div className="w-px h-[9px] border-l-2 border-dotted border-gray-300" />

           
            <button
              onClick={() => manageStops('add', i)}
              className="mt-1 mb-1 rounded-full border border-gray-400 w-4 h-4 flex items-center justify-center text-[12px] hover:bg-gray-100"
              title="Add stop"
              aria-label={`Add stop between ${i} and ${i + 1}`}
            >
              +
            </button>

            
            <div className="w-px h-[9px] border-l-2 border-dotted border-gray-300" />
          </div>
        );
      }
    }

    return nodes;
  })()}
</div>

        </div>

        {formError && <div className='text-sm text-red-500'>{formError}</div>}

        <div onClick={() => changeStep(true)} className={`flex items-center justify-center gap-2 w-full p-2 rounded-lg cursor-pointer font-semibold ${formLoading ? 'bg-blue-500 text-white' : 'bg-brand text-black '} `}>
          <Loader className={`animate-spin ${formLoading ? '' : 'hidden'}`} size={20} />
          {formLoading ? 'Loading' : 'Quote Now'}
        </div>
      </div>
    </div>
  )
}

export default HeroForm
