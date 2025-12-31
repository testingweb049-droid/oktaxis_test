import { User, Mail, Plane, Loader } from 'lucide-react'
import React, { useState } from 'react'
import { DetailsInput, PhoneInput } from '@/components/booking/forms/UserDetailInput'
import useFormStore from '@/stores/FormStore'
import SelectableCheckbox from '@/components/booking/forms/SelectableCheckbox'
import QuantityCheckbox from '@/components/booking/forms/QuantityCheckbox'
import AddReturn from '@/components/booking/forms/AddReturn'
import NewDateTimePicker from '@/components/booking/forms/NewDateTimePicker'
import { useRouter } from 'next/navigation'

function Step3() {
    const { formData, setFormData, changeStep, formLoading, category } = useFormStore();
    const [isProcessing, setIsProcessing] = useState(false);

    // Calculate total price
    const basePrice = Number(formData.price.value ?? 0);
    const returnPrice = category !== 'hourly' && formData.isReturn?.value ? basePrice - (basePrice / 10) : 0;
    const meetGreetFee = formData.isMeetGreet?.value ? 15 : 0;
    const flightTrackFee = formData.isFlightTrack?.value ? 7 : 0;
    const extraStopsFee = category !== 'hourly' ? Number(formData.extraStopsCount?.value || 0) * 7 : 0;
    const returnMeetGreetFee = category !== 'hourly' && formData.isReturnMeetGreet?.value ? 15 : 0;
    const returnFlightTrackFee = category !== 'hourly' && formData.isReturnFlightTrack?.value ? 7 : 0;
    const returnExtraStopsFee = category !== 'hourly' ? Number(formData.returnExtraStopsCount?.value || 0) * 7 : 0;
    
    const totalPrice = (
        basePrice + 
        returnPrice + 
        meetGreetFee + 
        flightTrackFee + 
        extraStopsFee + 
        returnMeetGreetFee + 
        returnFlightTrackFee + 
        returnExtraStopsFee
    ).toFixed(2);
    return (
        <div className='flex flex-col gap-5 w-full'>
            <div className='text-2xl'>Add Details</div>
            {/* max-lg:bg-gray-200 max-lg:px-2 max-lg:py-3 max-lg:rounded-md  */}
            <div className='flex flex-col gap-3 w-full'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <DetailsInput field='name' placeholder='Full Name' Icon={User} type='text' />
                    <DetailsInput field='email' placeholder='Your email' Icon={Mail} type='email' />
                </div>
                <PhoneInput />

                {/* Airport Pickup Details - After Phone Number - Hide for hourly */}
                {category !== 'hourly' && (
                <div className="w-full rounded-lg bg-gray-200 px-4 py-3 border border-gray-200 flex flex-col">
                    <SelectableCheckbox fieldName='isAirportPickup' label='Airport Pickup Details' />

                    <div className="w-full overflow-hidden transition-all duration-500"
                        style={{ maxHeight: formData.isAirportPickup.value ? '200px' : '0' }}>
                        <div className={`flex flex-col gap-3 pt-3 opacity-${formData.isAirportPickup.value ? '100' : '0'} transition-opacity duration-500`}>
                            <DetailsInput field='flightName' placeholder='Airline Name' Icon={Plane} type='text' />
                            <DetailsInput field='flightNumber' placeholder='Flight Number' Icon={Plane} type='text' />
                        </div>
                    </div>
                </div>
                )}

                {/* Add Return - Hide for hourly */}
                {category !== 'hourly' && <AddReturn />}

                {/* Return Block - Show when return is checked - Hide for hourly */}
                {category !== 'hourly' && formData.isReturn?.value && (
                    <div className="w-full rounded-lg bg-gray-200 px-4 py-3 border border-gray-200 flex flex-col gap-2">
                        <div className='font-bold text-gray-900'>Return Journey</div>
                        {/* Return Date and Time */}
                        <NewDateTimePicker
                            selectedDate={formData.returnDate?.value || ''}
                            selectedTime={formData.returnTime?.value || ''}
                            setFormData={setFormData}
                            dateFieldName="returnDate"
                            timeFieldName="returnTime"
                            placeholder='Select Return Date & Time'
                            minSelectableDate={formData.date?.value ? new Date(formData.date.value) : null}
                            isDisable={!formData.date?.value}
                            dateLabel="Return date"
                            timeLabel="Return time"
                        />

                      <div className='flex flex-col gap-2'>
                          {/* Return Equipment and Extras */}
                          <div className='font-bold text-gray-900 mt-3'>Return Equipment and Extras</div>
                        <QuantityCheckbox 
                          fieldName='isReturnFlightTrack' 
                          label='Flight Track' 
                          subLabel='£ 7'
                          description='Track your flight'
                          maxQuantity={1}
                          minQuantity={0}
                          getQuantity={() => formData.isReturnFlightTrack?.value ? 1 : 0}
                          onQuantityChange={(qty) => setFormData('isReturnFlightTrack', qty === 1)}
                        />
                        <QuantityCheckbox 
                          fieldName='isReturnMeetGreet' 
                          label='Meet & Greet' 
                          subLabel='£ 15'
                          maxQuantity={1}
                          minQuantity={0}
                          getQuantity={() => formData.isReturnMeetGreet?.value ? 1 : 0}
                          onQuantityChange={(qty) => setFormData('isReturnMeetGreet', qty === 1)}
                        />
                        <QuantityCheckbox 
                          fieldName='isReturnExtraStops' 
                          label='Extra Stops' 
                          subLabel='£ 7'
                          maxQuantity={100}
                          getQuantity={() => Number(formData.returnExtraStopsCount?.value || 0)}
                          onQuantityChange={(qty) => setFormData('returnExtraStopsCount', qty.toString())}
                        />
                      </div>
                    </div>
                )}

                {/* Equipment and Extras Block */}
                <div className="w-full rounded-lg bg-gray-200 px-4 py-3 border border-gray-200 flex flex-col gap-4">
                    <div className='font-bold text-gray-900'>Equipment and Extras</div>
                    <QuantityCheckbox 
                      fieldName='isFlightTrack' 
                      label='Flight Track' 
                      subLabel='£ 7'
                      description='Track your flight'
                      maxQuantity={1}
                      minQuantity={0}
                      getQuantity={() => formData.isFlightTrack?.value ? 1 : 0}
                      onQuantityChange={(qty) => setFormData('isFlightTrack', qty === 1)}
                    />
                    <QuantityCheckbox 
                      fieldName='isMeetGreet' 
                      label='Meet & Greet' 
                      subLabel='£ 15'
                      maxQuantity={1}
                      minQuantity={0}
                      getQuantity={() => formData.isMeetGreet?.value ? 1 : 0}
                      onQuantityChange={(qty) => setFormData('isMeetGreet', qty === 1)}
                    />
                    {/* Extra Stops - Hide for hourly */}
                    {category !== 'hourly' && (
                    <QuantityCheckbox 
                      fieldName='isExtraStops' 
                      label='Extra Stops' 
                      subLabel='£ 7'
                      maxQuantity={999}
                      getQuantity={() => Number(formData.extraStopsCount?.value || 0)}
                      onQuantityChange={(qty) => setFormData('extraStopsCount', qty.toString())}
                    />
                    )}
                </div>

                {/* Add Instructions */}
                <div className="w-full rounded-lg bg-gray-200 px-4 py-3 border border-gray-200 flex flex-col">
                    <SelectableCheckbox fieldName='isAddInstructions' label='Add Instructions' />

                    <div className="w-full overflow-hidden transition-all duration-500"
                        style={{ maxHeight: formData.isAddInstructions?.value ? '200px' : '0' }}>
                        <div className={`flex flex-col gap-3 pt-3 opacity-${formData.isAddInstructions?.value ? '100' : '0'} transition-opacity duration-500`}>
                            <div className={`w-full rounded-lg bg-gray-200 px-4 py-3 border ${formData.instructions?.error ? 'border-red-500' : 'border-gray-300'}`}>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Instructions
                                </label>
                                <textarea
                                    value={formData.instructions?.value || ''}
                                    onChange={(e) => setFormData('instructions', e.target.value)}
                                    placeholder="Enter your instructions here..."
                                    rows={4}
                                    className={`w-full text-base bg-transparent text-gray-800 placeholder:text-gray-400 outline-none focus:text-gray-900 resize-none ${formData.instructions?.error ? 'text-red-600' : ''}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Continue Button */}
            <div 
                onClick={async () => { 
                    if (formLoading || isProcessing) return;
                    const isValid = await changeStep(true, 3); 
                    if (isValid) {
                        setIsProcessing(true);
                        try {
                            // Prepare order data
                            const stops = formData.stops?.map(stop => stop.value).filter(Boolean) || [];
                            const orderData = {
                                name: formData.name.value,
                                email: formData.email.value,
                                phone: formData.phone.value,
                                car: formData.car.value,
                                price: totalPrice, // Use total price (includes all extras), not base price
                                totalAmount: parseFloat(totalPrice), // Also include as totalAmount for compatibility
                                distance: formData.distance.value || 0,
                                fromLocation: formData.fromLocation.value,
                                toLocation: formData.toLocation.value || '',
                                stops: stops,
                                date: formData.date.value,
                                time: formData.time.value,
                                duration: formData.duration.value || '',
                                passengers: formData.passengers.value,
                                bags: formData.bags.value,
                                isReturn: formData.isReturn?.value || false,
                                returnDate: formData.returnDate?.value || '',
                                returnTime: formData.returnTime?.value || '',
                                isFlightTrack: formData.isFlightTrack?.value || false,
                                isMeetGreet: formData.isMeetGreet?.value || false,
                                extraStopsCount: formData.extraStopsCount?.value || '0',
                                isReturnFlightTrack: formData.isReturnFlightTrack?.value || false,
                                isReturnMeetGreet: formData.isReturnMeetGreet?.value || false,
                                returnExtraStopsCount: formData.returnExtraStopsCount?.value || '0',
                                isAirportPickup: formData.isAirportPickup?.value || false,
                                flightName: formData.flightName?.value || '',
                                flightNumber: formData.flightNumber?.value || '',
                                instructions: formData.instructions?.value || '',
                                category: category || 'trip',
                            };

                            // Create Stripe Checkout Session
                            const response = await fetch('/api/create-checkout-session', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    amount: parseFloat(totalPrice),
                                    orderData,
                                }),
                            });

                            const data = await response.json();

                            if (!response.ok || !data.url) {
                                throw new Error(data.error || 'Failed to create checkout session');
                            }

                            // Redirect to Stripe Checkout
                            window.location.href = data.url;
                        } catch (error) {
                            console.error('Error creating checkout session:', error);
                            alert('Failed to proceed to payment. Please try again.');
                            setIsProcessing(false);
                        }
                    }
                }} 
                className='p-2 rounded-lg border border-gray-200 w-full text-center text-black font-bold cursor-pointer bg-brand hover:bg-primary-yellow/90 transition-colors flex justify-center items-center gap-2'
            >
                {(formLoading || isProcessing) && (
                    <Loader className="animate-spin w-4 h-4" />
                )}
                <span>Continue to Payment - £{totalPrice}</span>
            </div>
        </div>
    )
}

export default Step3