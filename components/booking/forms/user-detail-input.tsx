import useFormStore, { FormDataType } from '@/stores/form-store';
import { LucideProps } from 'lucide-react'
import { Input, PhoneInput as UnifiedPhoneInput } from '@/components/ui/input'

interface DetailInputType {
    field: keyof FormDataType;
    placeholder: string;
    Icon : React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    type: 'number' | 'email' | 'text'
}

export function DetailsInput({field, placeholder, Icon, type}:DetailInputType) {
    const {formData, setFormData} = useFormStore()
    const fieldData = !Array.isArray(formData[field]) ? formData[field] : null
    const hasError = !!fieldData?.error
    
  return (
    <div className={hasError ? "w-full rounded-lg bg-white px-4 py-3 border border-red-500" : "w-full rounded-lg bg-white px-4 py-3 border border-gray-200"}>
      <Input
                type={type}  
        icon={Icon}
        label={placeholder}
                value={fieldData?.value?.toString() || ''} 
                placeholder={placeholder} 
        onChange={(e) => setFormData(field, e.target.value)}
        error={hasError}
        className="bg-transparent text-heading-black placeholder:text-text-gray"
              />
    </div>
  )
}

export function PhoneInput() {
    const {formData, setFormData} = useFormStore()
    const hasError = !!formData.phone.error
  return (
    <div className={hasError ? "w-full rounded-lg bg-white px-4 py-3 border border-red-500" : "w-full rounded-lg bg-white px-4 py-3 border border-gray-200"}>
      <UnifiedPhoneInput
    value={formData.phone.value}
        onChange={(phone) => setFormData('phone', phone)}
        error={hasError}
        label="Phone Number"
        country="gb"
        containerClassName=""
      />
          </div>
  )
}

