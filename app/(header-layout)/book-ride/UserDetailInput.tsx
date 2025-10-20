import useFormStore, { FormDataType } from '@/stores/FormStore';
import { LucideProps, User } from 'lucide-react'
import React from 'react'

interface DetailInputType {
    field: keyof FormDataType;
    placeholder: string;
    Icon : React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    type: 'number' | 'email' | 'text'

}

function DetailsInput({field, placeholder, Icon, type}:DetailInputType) {
    const {formData, setFormData} = useFormStore()
  return (
    <div className={`p-2 rounded-md w-full border text-sm flex items-center gap-2 md:gap-5 bg-white ${!Array.isArray(formData[field]) && formData[field].error ? 'border-red-500' : 'border-gray-300'}`}>
           <Icon color='gray'/>
           <input type={type}  value={!Array.isArray(formData[field]) ? formData[field].value.toString() : ''} className='w-full focus:outline-none bg-transparent border-transparent' placeholder={placeholder} onChange={(e)=>setFormData(field, e.target.value)}  />
    </div>
  )
}

export default DetailsInput