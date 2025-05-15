import { Button } from "@/components/ui/button";
import { useFormikContext } from "formik";
import { useState } from "react";
import BookingTypeOption from "../BookingTypeSelector/BookingTypeOption";
import CustomDateSelector from "../DateAndTimeSelector/CustomDateSelector";
import CustomTimeSelector from "../DateAndTimeSelector/CustomTimeSelector";
import DistanceCalculator from "../DistanceCalculator/DistanceCalculator";
import AirlineInput from "../LocationSelector/AirlineInput";
import DropOffAddressInput from "../LocationSelector/DropOffAddressInput";
import PickUpAddressInput from "../LocationSelector/PickUpAddressInput";
import StepOneSummary from "./StepSummaries/StepOneSumary";

interface StepOneProps {
  isActive: boolean;
  completedSteps: any;
  setCompletedSteps: any;
  onEdit: () => void;
  bookingType: any;
}

export default function StepOne({
  isActive,
  completedSteps,
  setCompletedSteps,
  onEdit,
  bookingType,
}: StepOneProps) {
  const { values, setFieldValue, errors, validateForm } =
    useFormikContext<any>();

  const [isEditing, setIsEditing] = useState(false);
  const [showSummary, setShowSummary] = useState(true);
  const [airportSelectorFor, setAirportSelectorFor] = useState<
    "to" | "from" | null
  >("to");

  const handleAirportSelectChange = (value: "to" | "from" | null) => {
    setAirportSelectorFor(value);
  };

  const handleToggleSummary = () => {
    setShowSummary((prev) => !prev);
  };

  const validateAllFields = () => {
    const validationErrors = validateForm();

    const areFieldsFilled =
      values.bookingType &&
      values.pickUpAddress &&
      values.date &&
      values.time &&
      (values.bookingType !== "hourly" ? values.dropOffAddress : true);

    return Object.keys(validationErrors).length === 0 && areFieldsFilled;
  };


  const handleValidationAndNextStep = () => {
    const isValid = validateAllFields();

    if (isValid) {
      setIsEditing(false);
      setShowSummary(true);
      setCompletedSteps((prev: any) => ({ ...prev, Step1: true }));
    } else {
      console.log("Please fill in all required fields correctly.");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowSummary(false);
    onEdit();
  };

  // Callback to pass calculated distance to parent component
  const handleDistanceCalculated = (calculatedDistance: number) => {
    if (values.distance !== calculatedDistance) {
      setFieldValue("distance", calculatedDistance);
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-center gap-y-3 ${
        isActive ? "" : "opacity-90"
      }`}
    >
      {/* Step 1 Header and Summary */}
      {completedSteps.Step1 && !isEditing && (
        <div className="w-[320px] lg:w-full h-12 flex bg-gray-800 text-white rounded-lg align-middle items-center px-3 justify-between">
          <h1
            className={`capitalize text-[15px] lg:text-lg font-medium tracking-wider cursor-pointer ${
              !isActive ? "opacity-100" : ""
            }`}
            onClick={handleToggleSummary}
          >
            Step 1: Ride Info
          </h1>
          <Button
            onClick={handleEditClick}
            className="bg-white text-gray-950 hover:bg-white px-6 py-3.5 h-0"
          >
            Edit
          </Button>
        </div>
      )}

      {/* Show StepOneSummary if not editing */}
      {completedSteps.Step1 && showSummary && !isEditing && (
        <StepOneSummary
          bookingType={values.bookingType}
          pickUpAddress={values.pickUpAddress}
          dropOffAddress={values.dropOffAddress}
          stops={values.stops}
          date={values.date}
          time={values.time}
          hourlyCharter={values.hourlyCharter}
          airline={values.airline}
          flightNumber={values.flightNumber}
          distance={values.distance}
        />
      )}

      {/* Show Form Fields if Editing */}
      {isActive && (isEditing || !completedSteps.Step1) && (
        <>
          <div className="w-full flex md:flex-row flex-col gap-y-3">
            <div>
              <BookingTypeOption
                onAirportSelectChange={handleAirportSelectChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <PickUpAddressInput
                showAirportSelector={airportSelectorFor === "from"}
                bookingType={bookingType}
              />
              {airportSelectorFor === "from" && <AirlineInput />}
              {bookingType !== "hourly" && (
                <DropOffAddressInput
                  showAirportSelector={airportSelectorFor === "to"}
                  bookingType={bookingType}
                />
              )}
              <div className="flex w-full gap-x-3 flex-wrap md:flex-nowrap gap-y-3">
                <CustomTimeSelector />
                <CustomDateSelector />
              </div>
              <div className="flex w-full gap-x-3 flex-wrap md:flex-nowrap gap-y-3">
                <DistanceCalculator
                  pickUpAddress={values.pickUpAddress}
                  dropOffAddress={values.dropOffAddress}
                  onDistanceCalculated={handleDistanceCalculated}
                />
              </div>
            </div>
          </div>
          <Button
            className="w-full backdrop:py-6 text-[16px] bg-brand hover:bg-brand text-white rounded-lg mt-4"
            onClick={handleValidationAndNextStep}
          >
            {isEditing ? "Save Changes" : "Select Vehicle"}
          </Button>
        </>
      )}
    </div>
  );
}
