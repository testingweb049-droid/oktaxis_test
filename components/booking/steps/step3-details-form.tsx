'use client'
import { User, Mail, Plane, Loader } from 'lucide-react'
import React, { useMemo, memo, useCallback } from 'react'
import { DetailsInput, PhoneInput } from '@/components/booking/forms/user-detail-input'
import useFormStore from '@/stores/form-store'
import SelectableCheckbox from '@/components/booking/forms/selectable-checkbox'
import QuantityCheckbox from '@/components/booking/forms/quantity-checkbox'
import AddReturn from '@/components/booking/forms/add-return'
import NewDateTimePicker from '@/components/booking/forms/new-date-time-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCheckoutFlow } from '@/hooks/useCheckoutFlow'
import { calculateReturnPrice, formatPrice } from '@/lib/utils/pricing'
import { usePricing, DEFAULT_PRICING } from '@/hooks/usePricing'
import { validateReturnDate } from '@/lib/utils/validation'

function Step3DetailsForm() {
    const { formData, setFormData, changeStep, formLoading, category } = useFormStore();
    const { data: pricing = DEFAULT_PRICING } = usePricing();
    const { initiateCheckout, isLoading: checkoutLoading } = useCheckoutFlow();
    
    const totalPrice = useMemo(() => {
        const basePrice = Number(formData.price.value ?? 0);

        let returnPrice = 0;
        if (category !== 'hourly' && formData.isReturn?.value && basePrice > 0) {
            const vehicleReturnDiscount = pricing.returnDiscount[formData.car.value] ?? 0;
            const discountedPrice = calculateReturnPrice(basePrice, vehicleReturnDiscount);
            returnPrice = discountedPrice;
        }

        const meetGreetFee = formData.isMeetGreet?.value ? pricing.outbound.meetGreet : 0;
        const flightTrackFee = formData.isFlightTrack?.value ? pricing.outbound.flightTrack : 0;
        const extraStopsFee = category !== 'hourly' ? Number(formData.extraStopsCount?.value || 0) * pricing.outbound.extraStop : 0;
        const returnMeetGreetFee = category !== 'hourly' && formData.isReturnMeetGreet?.value ? pricing.return.meetGreet : 0;
        const returnFlightTrackFee = category !== 'hourly' && formData.isReturnFlightTrack?.value ? pricing.return.flightTrack : 0;
        const returnExtraStopsFee = category !== 'hourly' ? Number(formData.returnExtraStopsCount?.value || 0) * pricing.return.extraStop : 0;

        const total = (
            basePrice +
            returnPrice +
            meetGreetFee +
            flightTrackFee +
            extraStopsFee +
            returnMeetGreetFee +
            returnFlightTrackFee +
            returnExtraStopsFee
        );

        return formatPrice(total);
    }, [
        formData.price.value,
        formData.isReturn?.value,
        formData.car.value,
        formData.isMeetGreet?.value,
        formData.isFlightTrack?.value,
        formData.extraStopsCount?.value,
        formData.isReturnMeetGreet?.value,
        formData.isReturnFlightTrack?.value,
        formData.returnExtraStopsCount?.value,
        category,
        pricing
    ]);


    const validateReturnJourney = useCallback((): boolean => {
        const state = useFormStore.getState();
        if (state.category === 'hourly') {
            return true;
        }
        if (!state.formData.isReturn?.value) {
            return true;
        }

        const returnValidation = validateReturnDate(
            state.formData.date.value,
            state.formData.time.value,
            state.formData.returnDate?.value || '',
            state.formData.returnTime?.value || ''
        );

        if (!returnValidation.isValid) {
            const errorMessage = returnValidation.error || "Return date must be after pickup date";
            useFormStore.setState((currentState) => {
                const updatedFormData = { ...currentState.formData };

                if (updatedFormData.returnDate) {
                    updatedFormData.returnDate = { ...updatedFormData.returnDate, error: errorMessage };
                }

                if (updatedFormData.returnTime) {
                    updatedFormData.returnTime = { ...updatedFormData.returnTime, error: errorMessage };
                }

                return { formData: updatedFormData };
            });
            return false;
        }

        useFormStore.setState((currentState) => {
            const updatedFormData = { ...currentState.formData };
            if (updatedFormData.returnDate) {
                updatedFormData.returnDate = { ...updatedFormData.returnDate, error: '' };
            }
            if (updatedFormData.returnTime) {
                updatedFormData.returnTime = { ...updatedFormData.returnTime, error: '' };
            }
            return { formData: updatedFormData };
        });

        return true;
    }, []);

    const handleContinueToPayment = useCallback(async () => {
        if (formLoading || checkoutLoading) return;
        if (!validateReturnJourney()) return;
        
        const isValid = await changeStep(true, 3);
        if (!isValid) return;
        
        await initiateCheckout(totalPrice);
    }, [
        formLoading,
        checkoutLoading,
        validateReturnJourney,
        changeStep,
        initiateCheckout,
        totalPrice
    ]);

    return (
        <div className='flex flex-col gap-5 w-full'>
            <div className='text-xl sm:text-2xl text-heading-black font-semibold'>Add Details</div>
            <div className='flex flex-col gap-3 w-full'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <DetailsInput field='name' placeholder='Full Name' Icon={User} type='text' />
                    <DetailsInput field='email' placeholder='Your email' Icon={Mail} type='email' />
                </div>
                <PhoneInput />

                {category !== 'hourly' && (
                    <div className="w-full rounded-lg bg-white border border-gray-200 flex flex-col overflow-hidden">
                        <SelectableCheckbox fieldName='isAirportPickup' label='Airport Pickup Details' noBorder />

                        <div className="w-full overflow-hidden transition-all duration-500 px-4"
                            style={{ maxHeight: formData.isAirportPickup.value ? '300px' : '0' }}>
                            <div className={`flex flex-col gap-3 pb-4 pt-2 opacity-${formData.isAirportPickup.value ? '100' : '0'} transition-opacity duration-500`}>
                                <DetailsInput field='flightArrivalTime' placeholder='Flight arrival time' Icon={Plane} type='text' />
                                <DetailsInput field='flightNumber' placeholder='Flight Number' Icon={Plane} type='text' />
                            </div>
                        </div>
                    </div>
                )}

                {category !== 'hourly' && <AddReturn />}

                {category !== 'hourly' && formData.isReturn?.value && (
                    <div className="w-full rounded-lg bg-white px-4 py-3 border border-gray-200 flex flex-col gap-2">
                        <div className='font-bold text-base sm:text-lg text-heading-black'>Return Journey</div>
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
                            <div className='font-bold text-base sm:text-lg text-heading-black mt-3'>Return Equipment and Extras</div>
                            <QuantityCheckbox
                                fieldName='isReturnFlightTrack'
                                label='Flight Track'
                                subLabel={`£ ${pricing.return.flightTrack.toFixed(2)}`}
                                description='Track your flight'
                                maxQuantity={1}
                                minQuantity={0}
                                getQuantity={() => formData.isReturnFlightTrack?.value ? 1 : 0}
                                onQuantityChange={(qty) => setFormData('isReturnFlightTrack', qty === 1)}
                            />
                            <QuantityCheckbox
                                fieldName='isReturnMeetGreet'
                                label='Meet & Greet'
                                subLabel={`£ ${pricing.return.meetGreet.toFixed(2)}`}
                                maxQuantity={1}
                                minQuantity={0}
                                getQuantity={() => formData.isReturnMeetGreet?.value ? 1 : 0}
                                onQuantityChange={(qty) => setFormData('isReturnMeetGreet', qty === 1)}
                            />
                            <QuantityCheckbox
                                fieldName='isReturnExtraStops'
                                label='Extra Stops'
                                subLabel={`£ ${pricing.return.extraStop.toFixed(2)}`}
                                maxQuantity={100}
                                getQuantity={() => Number(formData.returnExtraStopsCount?.value || 0)}
                                onQuantityChange={(qty) => setFormData('returnExtraStopsCount', qty.toString())}
                            />
                        </div>
                    </div>
                )}

                {/* Equipment and Extras Block */}
                <div className="w-full rounded-lg bg-white px-4 py-3 border border-gray-200 flex flex-col gap-4">
                    <div className='font-bold text-base sm:text-lg text-heading-black'>Equipment and Extras</div>
                    <QuantityCheckbox
                        fieldName='isFlightTrack'
                        label='Flight Track'
                        subLabel={`£ ${pricing.outbound.flightTrack.toFixed(2)}`}
                        description='Track your flight'
                        maxQuantity={1}
                        minQuantity={0}
                        getQuantity={() => formData.isFlightTrack?.value ? 1 : 0}
                        onQuantityChange={(qty) => setFormData('isFlightTrack', qty === 1)}
                    />
                    <QuantityCheckbox
                        fieldName='isMeetGreet'
                        label='Meet & Greet'
                        subLabel={`£ ${pricing.outbound.meetGreet.toFixed(2)}`}
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
                            subLabel={`£ ${pricing.outbound.extraStop.toFixed(2)}`}
                            maxQuantity={999}
                            getQuantity={() => Number(formData.extraStopsCount?.value || 0)}
                            onQuantityChange={(qty) => setFormData('extraStopsCount', qty.toString())}
                        />
                    )}
                </div>

                {/* Add Instructions */}
                <div className="w-full rounded-lg bg-white border border-gray-200 flex flex-col overflow-hidden">
                    <SelectableCheckbox fieldName='isAddInstructions' label='Add Instructions' noBorder />

                    <div className="w-full overflow-hidden transition-all duration-500 px-4"
                        style={{ maxHeight: formData.isAddInstructions?.value ? '300px' : '0' }}>
                        <div className={`flex flex-col gap-3 pb-4 pt-2 opacity-${formData.isAddInstructions?.value ? '100' : '0'} transition-opacity duration-500`}>
                            {(() => {
                                const instructionsHasError = !!formData.instructions?.error
                                return (
                                    <div className={cn(
                                        "w-full rounded-lg bg-white px-4 py-3 border",
                                        instructionsHasError ? "border-red-500" : "border-gray-200"
                                    )}>
                                        <label className="block text-sm sm:text-base font-medium text-text-gray mb-1">
                                            Instructions
                                        </label>
                                        <textarea
                                            value={formData.instructions?.value || ''}
                                            onChange={(e) => setFormData('instructions', e.target.value)}
                                            placeholder="Enter your instructions here..."
                                            rows={4}
                                            className={cn(
                                                "w-full bg-transparent text-heading-black placeholder:text-text-gray outline-none focus:outline-none text-base",
                                                "resize-none",
                                                instructionsHasError && "text-red-600 placeholder:text-red-400"
                                            )}
                                        />
                                    </div>
                                )
                            })()}
                        </div>
                    </div>
                </div>
            </div>

            <Button
                onClick={handleContinueToPayment}
                disabled={formLoading || checkoutLoading}
                className="w-full"
                size="lg"
                aria-label="Continue to payment"
            >
                {(formLoading || checkoutLoading) && (
                    <Loader className="animate-spin w-4 h-4 mr-2" aria-hidden="true" />
                )}
                <span>Continue to Payment - £{totalPrice}</span>
            </Button>
        </div>
    )
}

export default memo(Step3DetailsForm);

