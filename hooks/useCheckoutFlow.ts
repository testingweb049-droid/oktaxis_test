import { useCallback } from 'react';
import { useCreateCheckoutSession } from './useCheckout';
import { useCreatePendingBooking } from './useBooking';
import { useToast } from '@/components/ui/use-toast';
import useFormStore from '@/stores/form-store';

interface CheckoutFlowOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useCheckoutFlow = (options: CheckoutFlowOptions = {}) => {
  const { toast } = useToast();
  const { formData, category } = useFormStore();
  const createPendingBookingMutation = useCreatePendingBooking();
  const createCheckoutMutation = useCreateCheckoutSession();

  const prepareOrderData = useCallback((price: string) => {
    const stops = formData.stops?.map(stop => stop.value).filter(Boolean) || [];

    return {
      name: formData.name.value,
      email: formData.email.value,
      phone: formData.phone.value,
      car: formData.car.value,
      price: price,
      totalAmount: parseFloat(price),
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
      flightArrivalTime: formData.flightArrivalTime?.value || '',
      flightNumber: formData.flightNumber?.value || '',
      instructions: formData.instructions?.value || '',
      category: category || 'trip',
    };
  }, [formData, category]);

  const getErrorMessage = useCallback((error: any): string => {
    if (error?.response?.status === 400) {
      const errorMessage = error?.response?.data?.message || error?.response?.data?.error;
      if (errorMessage) {
        return errorMessage;
      }
      return 'Invalid booking information. Please check your details and try again.';
    }
    if (error?.response?.status === 404) {
      return 'Booking not found. Please start over.';
    }
    if (error?.response?.status === 500) {
      return 'Server error. Please try again in a few moments or contact support.';
    }
    if (error?.message) {
      return error.message;
    }
    return 'Failed to proceed to payment. Please try again.';
  }, []);

  const initiateCheckout = useCallback(async (totalPrice: string) => {
    try {
      const orderData = prepareOrderData(totalPrice);
      
      const bookingResult = await createPendingBookingMutation.mutateAsync(orderData);
      
      if (!bookingResult.data?.bookingId) {
        throw new Error('Failed to create booking. Please try again.');
      }

      const bookingId = bookingResult.data.bookingId;

      const checkoutResult = await createCheckoutMutation.mutateAsync({
        amount: parseFloat(totalPrice),
        bookingId,
      });

      const checkoutUrl = checkoutResult.data?.url || checkoutResult.url;
      
      if (!checkoutUrl) {
        throw new Error('Failed to create checkout session. Please try again.');
      }

      window.location.href = checkoutUrl;
      
      if (options.onSuccess) {
        options.onSuccess();
      }
    } catch (error: any) {
      console.error('Checkout flow error:', error);
      
      const errorMessage = getErrorMessage(error);
      
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });

      if (options.onError) {
        options.onError(errorMessage);
      }
    }
  }, [
    prepareOrderData,
    createPendingBookingMutation,
    createCheckoutMutation,
    toast,
    getErrorMessage,
    options
  ]);

  const isLoading = createPendingBookingMutation.isPending || createCheckoutMutation.isPending;

  return {
    initiateCheckout,
    isLoading,
    isCreatingBooking: createPendingBookingMutation.isPending,
    isCreatingCheckout: createCheckoutMutation.isPending,
  };
};

