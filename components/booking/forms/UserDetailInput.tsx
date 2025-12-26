import useFormStore, { FormDataType } from '@/stores/FormStore';
import { LucideProps } from 'lucide-react'
import React from 'react'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface DetailInputType {
    field: keyof FormDataType;
    placeholder: string;
    Icon : React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    type: 'number' | 'email' | 'text'

}

export function DetailsInput({field, placeholder, Icon, type}:DetailInputType) {
    const {formData, setFormData} = useFormStore()
    const fieldData = !Array.isArray(formData[field]) ? formData[field] : null
    
  return (
          <div className={`w-full rounded-lg bg-gray-200 px-4 py-3 border ${fieldData?.error ? 'border-red-500' : 'border-gray-300'}`}>
            {/* Label inside box */}
            <label className="block text-[13px] font-medium text-gray-600 mb-1">
              {placeholder}
            </label>
            {/* Input Field */}
            <div className="relative w-full">
              <Icon className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type={type}  
                value={fieldData?.value?.toString() || ''} 
                className={`w-full pl-6 text-[15px] bg-transparent text-gray-800 placeholder:text-gray-400 outline-none focus:text-gray-900 ${fieldData?.error ? 'text-red-600' : ''}`} 
                placeholder={placeholder} 
                onChange={(e)=>setFormData(field, e.target.value)}  
              />
            </div>
    </div>
  )
}
export function PhoneInput() {
    const {formData, setFormData} = useFormStore()
  return (
          <div className={`w-full rounded-lg bg-gray-200 px-4 py-3 border ${formData.phone.error ? 'border-red-500' : 'border-gray-300'}`}>
            {/* Label inside box */}
            <label className="block text-[13px] font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            {/* Phone Input Field */}
            <div className="relative w-full">
    <ReactPhoneInput
    country={'gb'}
    value={formData.phone.value}
    onChange={phone => setFormData('phone', phone)}
    inputStyle={{
   width: '100%',                        
   paddingTop: '8px',                     
    paddingBottom: '8px',
    paddingLeft: '50px',
   paddingRight: '8px',
                  fontSize: '15px',                      
                  backgroundColor: 'transparent',              
                  border: 'none',
                  borderRadius: '6px',
                  color: formData.phone.error ? '#dc2626' : '#1f2937'
    }}
buttonStyle={{
                  border: 'none',
                  backgroundColor: 'transparent'
                }}
                containerStyle={{
                  width: '100%'
}}
    />
            </div>
          </div>
  )
}

