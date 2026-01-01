import useFormStore from '@/stores/FormStore';
import { Loader } from 'lucide-react';
import React from 'react'
import { cn } from '@/lib/utils';

function ContinueButton({title, loading , type, step}:{title:string, loading?:boolean, type:'submit'|'button', step:number}) {
    const {changeStep, formLoading} = useFormStore()
  return (
    <button 
      type={type} 
      onClick={()=>{changeStep(true,step); }} 
      className={cn(
        "flex items-center justify-center gap-2 w-full p-2 rounded-lg cursor-pointer font-semibold",
        "bg-primary-yellow hover:bg-primary-yellow/90 text-heading-black font-semibold transition-all duration-200",
        "px-4 py-2.5 text-base rounded-lg",
        (formLoading || loading) && "opacity-75 cursor-not-allowed"
      )}
    >
      <Loader className={cn("animate-spin", (formLoading || loading) ? '' : 'hidden')} size={20} />
          {formLoading ? 'Loading' : title}
         </button>
  )
}

export default ContinueButton