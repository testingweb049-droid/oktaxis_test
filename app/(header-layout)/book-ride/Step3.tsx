import { ArrowRightLeft, LuggageIcon, MessageSquare, Phone, User, User2, Users } from 'lucide-react'
import React from 'react'
import DetailsInput from './UserDetailInput'
import NewDateTimePicker from './NewDateTimePicker'
import useFormStore from '@/stores/FormStore'
import NewDropdownInput from './DropDownInput'
import { fleets } from './CarList'
import SelectableCheckbox from './SelectableCheckbox'
import AddReturn from './AddReturn'

function Step3() {
    const {formData, setFormData, changeStep} = useFormStore();
    const selectedFleet = fleets.find((item)=>item.name===formData.car.value)
    const passengersArray = Array.from(
  { length: selectedFleet?.passengers ?? 0 },
  (_, i) => {
    const count = i + 1
    return {
      label: `${count} ${count === 1 ? "Passenger" : "Passengers"}`,
      value: count.toString(),
    }
  }
)

const bagsArray = Array.from(
  { length: selectedFleet?.suitcases ?? 0 },
  (_, i) => {
    const count = i + 1
    return {
      label: `${count} ${count === 1 ? "Bag" : "Bags"}`,
      value: count.toString(),
    }
  }
)
  return (
    <div className='flex flex-col gap-5 w-full'>
        <div className='text-2xl'>Details</div>
        <div className='flex flex-col gap-3 w-full max-lg:bg-gray-200 max-lg:px-2 max-lg:py-3 max-lg:rounded-md '>
            <DetailsInput field='name' placeholder='Passenger full name' Icon={User} />
            <DetailsInput field='phone' placeholder='Phone Number' Icon={Phone} />
            <DetailsInput field='email' placeholder='Your email' Icon={MessageSquare} />
            <NewDateTimePicker 
        selectedDate={formData.date.value}
        selectedTime={formData.time.value}
        setFormData={setFormData}
        dateFieldName="date"
        timeFieldName="time"/>
        <div className='grid grid-cols-2 gap-3' >
            <NewDropdownInput Icon={Users} fieldName='passengers' placeholder='No. of Passengers' options={passengersArray} />
            <NewDropdownInput Icon={LuggageIcon} fieldName='bags' placeholder='No. of Bags' options={bagsArray} />
        </div>
        <AddReturn/>
         {formData.isReturn.value && <NewDateTimePicker 
        selectedDate={formData.returnDate.value}
        selectedTime={formData.returnTime.value}
        setFormData={setFormData}
        dateFieldName="returnDate"
        timeFieldName="returnTime"/>}
        <SelectableCheckbox fieldName='isAirportPickup' label='Ariport Pickup Details'  />
           {formData.isAirportPickup.value && <DetailsInput field='flightName' placeholder='Ariline Name' Icon={MessageSquare} />}
           {formData.isAirportPickup.value && <DetailsInput field='flightNumber' placeholder='Ariline Number' Icon={MessageSquare} />}
           <div className='font-bold'>Equipment and Extras</div>
        <SelectableCheckbox fieldName='isFlightTrack' label='Flight Track' subLabel='£ 7'  />
        <SelectableCheckbox fieldName='isMeetGreet' label='Meet & Greet' subLabel='£ 15'  />
        </div>
         <div onClick={()=>{changeStep(true,3);}} className='p-2 rounded-lg border border-gray-200 w-full text-center text-black font-bold cursor-pointer bg-brand'>
                    Continue 
         </div>
         <div onClick={()=>{changeStep(false,3);}} className='p-2 rounded-lg border border-gray-500 w-full text-center text-gray-700 font-semibold cursor-pointer'>
                    Back 
         </div>
    </div>
  )
}

export default Step3