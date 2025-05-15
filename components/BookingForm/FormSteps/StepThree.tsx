import { useState } from "react";
import { Button } from "@/components/ui/button";
import PassengerInfo from "../PassengerPersonalInfo/PassengerInfo";
import { DialogTitle, Dialog, DialogContent } from "@/components/ui/dialog";
import { useFormikContext } from "formik";
import StepThreeSummary from "./StepSummaries/StepThreeSummary";
import ChildCount from "../PassengerAndLuggageSelector/ChildCount";
import { TextareaInstruction } from "../PassengerPersonalInfo/TextArea";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../PaymentCardModal/PaymentCarModal2";
import PaymentCardModal from "../PaymentCardModal/PaymentCardModal";
import {CrossCircledIcon} from "@radix-ui/react-icons"

interface StepThreeProps {
  isActive: boolean;
  completedSteps: any;
  setCompletedSteps: any;
  onEdit: () => void;
  stepThreeHeaderRef: any;
}

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function StepThree({
  isActive,
  completedSteps,
  setCompletedSteps,
  onEdit,
  stepThreeHeaderRef,
}: StepThreeProps) {
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSummary, setShowSummary] = useState(false); 
  const [showHeader, setShowHeader] = useState(false); 
  const [paymentDone, setPaymentDone] = useState(false)
  const { values, validateForm } = useFormikContext<any>();

  const handleOpenDialog = () => setPaymentDialogOpen(true);
  const handleCloseDialog = () => setPaymentDialogOpen(false);
  

  const handleEdit = () => {
    setShowSummary(false); 
    setIsEditing(true); 
    onEdit();
  };

  // Toggle function for the summary visibility
  const handleToggleSummary = () => {
    setShowSummary((prev) => !prev);
  };
  
  // Function to validate all fields before moving to  the next step...
  const validateFields = () => {
  
    // Check if any passengerInfo field is empty
    const passengerInfo = values.passengerInfo || {};
    const isPassengerInfoFilled =
      passengerInfo.name?.trim() &&
      passengerInfo.email?.trim() &&
      passengerInfo.phone?.trim();
  
    return isPassengerInfoFilled;
  };
  
  

  const handleBookNow = async () => {
    const isValid = await validateFields();
  
    if (isValid) {
      setIsEditing(false);
      setShowHeader(true);
      setShowSummary(true);
      setCompletedSteps((prev: any) => ({ ...prev, Step3: true }));
    } else {
      setShowSummary(false);
      setCompletedSteps((prev: any) => ({ ...prev, Step3: false }));
      console.log("Please fill all the required fields properly");
    }
  };
  

  return (
    <div className="w-full flex flex-col gap-y-3 items-center"  ref={stepThreeHeaderRef}>
      {/* Step Three Header */}
     
      {showHeader && (
        <div className="w-[320px] lg:w-full h-12 bg-gray-800 text-white rounded-lg flex items-center align-middle justify-between px-3">
          <h1
            className={`capitalize text-[15px] lg:text-lg font-medium tracking-wider cursor-pointer ${
              !isActive ? "opacity-100" : ""
            }`}
            onClick={handleToggleSummary}
          >
            Step 3: Passenger Details
          </h1>
          {completedSteps.Step3 && !isEditing && (
            <Button
              onClick={handleEdit}
              className="bg-white text-gray-950 hover:bg-white px-6 py-3.5 h-0"
            >
              Edit
            </Button>
          )}
        </div>
      )}

      {/* Step Three Content */}
      {((completedSteps.Step2 && !completedSteps.Step3) || isEditing) ? (
        <div className="w-full flex flex-col gap-y-3">
          <PassengerInfo />
          <div className="flex flex-col lg:flex-row gap-x-3 gap-y-3 w-full">
            <ChildCount />
            <TextareaInstruction />
          </div>

          {/* Book Now Button */}
          <Button
            className="p-4 bg-brand hover:bg-brand text-white rounded-lg mt-4"
            onClick={handleBookNow}
          >
            {isEditing ? "Save Changes" : "Book Now"}
          </Button>
        </div>
      ) : (
        showSummary && (
          <StepThreeSummary
            passengerInfo={values.passengerInfo}
            bagCount={values.bagCount || "Not Provided"}
            passengerCount={values.passengerCount || "Not Provided"}
            passengerNotes={values.passengerNotes}
            textarea={values.textarea}
            childCount={values.childCount}
          />
        )
      )}

      {/* Pay Now Button */}
      {completedSteps.Step3 && (
        <div className="w-full flex items-center">
          <Button
            className="w-[400px] md:w-[350px] lg:w-full p-6 bg-gray-800 hover:bg-gradient-to-l from-gray-700 via-gray-800 to-gray-700 text-white rounded-lg"
            onClick={handleOpenDialog}
          >
            <span className="flex flex-col font-bold">
              {values.totalPrice} £
              <p>Pay Now</p>
            </span>
          </Button>

          <Dialog open={isPaymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
            <DialogTitle></DialogTitle>
            <DialogContent className="sm:max-w-[425px] bg-transparent border-0 shadow-none">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
       

           <div className="bg-white w-[95%] sm:w-[500px] p-4 sm:p-8 rounded-lg shadow-lg relative">

           <div
                onClick={() => {
                  setPaymentDialogOpen(false)
                }}
                className="text-black font-semibold cursor-pointer absolute top-1 right-1 "
                >
                <CrossCircledIcon className="size-7"/>
              </div>
                
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: Math.round(values.totalPrice * 100),
                  currency: "gbp",
                }}
              >
                <CheckoutForm amount={Math.round(values.totalPrice * 100)}  />
              </Elements>
              
            </div>
          </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
