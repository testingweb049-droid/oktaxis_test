import { Check, X } from "lucide-react";
import { useState } from "react";
import { useField } from "formik";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HourlyCharterSelection from "./HourlyCharterSelection";

interface BookingTypeOptionProps {
  onAirportSelectChange: (value: "to" | "from" | null) => void;
}

const BookingTypeOption = ({ onAirportSelectChange }: BookingTypeOptionProps) => {
  const [field, , helpers] = useField("bookingType");
  const { value: selected = "to" } = field;
  const { setValue } = helpers;

  // Toggle state for mobile only
  const [showOptions, setShowOptions] = useState(true);

  const handleOptionChange = (value: string) => {
    setValue(value);
    if (window.innerWidth < 768) setShowOptions(false); // Toggle off for mobile
    if (value === "to" || value === "from") {
      onAirportSelectChange(value);
    } else {
      onAirportSelectChange(null);
    }
  };

  const handleResetSelection = () => {
    setValue("");
    setShowOptions(true);
    onAirportSelectChange(null);
  };


  return (
    <div className="w-full md:w-[230px] md:max-w-[250px] md:pr-3 px-0">
      {/* Mobile Toggle Button */}
      <div className="md:hidden">
        {showOptions ? (
          <RadioGroup
            value={selected}
            onValueChange={handleOptionChange}
            className="flex flex-col gap-y-3"
          >
            {/* To Airport */}
            <Label
              htmlFor="to"
              className={`flex gap-x-3 items-center w-full px-4 py-[19px] rounded-lg cursor-pointer border ${
                selected === "to"
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-700 hover:text-white"
              }`}
            >
              <RadioGroupItem value="to" id="to" className="sr-only" />
              <span
                className={`w-4 h-4 rounded-full ${
                  selected === "to" ? "bg-gray-500 flex items-center justify-center" : "bg-gray-300"
                }`}
              >
                {selected === "to" && <Check className="w-10 h-10 text-white font-semibold" />}
              </span>
              To Airport
            </Label>

            {/* From Airport */}
            <Label
              htmlFor="from"
              className={`flex gap-x-3 items-center w-full px-4 py-[19px] rounded-lg cursor-pointer border ${
                selected === "from"
                  ? "bg-brand hover:bg-gray-300 text-black"
                  : "bg-white hover:bg-gray-700 hover:text-white"
              }`}
            >
              <RadioGroupItem value="from" id="from" className="sr-only" />
              <span
                className={`w-4 h-4 rounded-full ${
                  selected === "from" ? "bg-gray-500 flex items-center justify-center" : "bg-gray-300"
                }`}
              >
                {selected === "from" && <Check className="w-10 h-10 text-white font-bold" />}
              </span>
              From Airport
            </Label>

            {/* Point to Point */}
            <Label
              htmlFor="point"
              className={`flex gap-x-3 items-center w-full px-4 py-[19px] rounded-lg cursor-pointer border ${
                selected === "point"
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-700 hover:text-white"
              }`}
            >
              <RadioGroupItem value="point" id="point" className="sr-only" />
              <span
                className={`w-4 h-4 rounded-full ${
                  selected === "point" ? "bg-gray-500 flex items-center justify-center" : "bg-gray-300"
                }`}
              >
                {selected === "point" && <Check className="w-10 h-10 text-white font-bold" />}
              </span>
              Point to Point
            </Label>

            {/* Hourly Charter */}
            <Label
              htmlFor="hourly"
              className={`flex gap-x-3 items-center w-full px-4 py-[19px] rounded-lg cursor-pointer border ${
                selected === "hourly"
                  ? "bg-brand hover:bg-gray-300 text-black"
                  : "bg-white hover:bg-gray-700 hover:text-white"
              }`}
            >
              <RadioGroupItem value="hourly" id="hourly" className="sr-only" />
              <span
                className={`w-4 h-4 rounded-full ${
                  selected === "hourly" ? "bg-gray-500 flex items-center justify-center" : "bg-gray-300"
                }`}
              >
                {selected === "hourly" && <Check className="w-10 h-10 text-white font-bold" />}
              </span>
              Hourly Charter
            </Label>
          </RadioGroup>
        ) : (
          <div className="relative flex items-center gap-3 p-4 rounded-lg border bg-black text-white">
            <span className="text-lg font-semibold">
              {selected === "to" && "To Airport"}
              {selected === "from" && "From Airport"}
              {selected === "point" && "Point to Point"}
              {selected === "hourly" && "Hourly Charter"}
            </span>
            {selected === "hourly" && <HourlyCharterSelection />}
            
            <button
              type="button"
              onClick={handleResetSelection}
              className="absolute right-4 top-4 text-white hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

  
   
      {/* Desktop View */}
      <div className="hidden md:block">
        <RadioGroup
          value={selected}
          onValueChange={handleOptionChange}
          className="flex flex-col gap-y-3"
        >
          {/* To Airport */}
          <Label
            htmlFor="to"
            className={`flex gap-x-3 h-[54px] items-center w-full px-4 py-[19px] rounded-lg cursor-pointer border ${
              selected === "to"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-700 hover:text-white"
            }`}
          >
            <RadioGroupItem value="to" id="to" className="sr-only" />
            <span
              className={`w-4 h-4 rounded-full ${
                selected === "to" ? "bg-white flex items-center justify-center" : "bg-gray-300"
              }`}
            >
              {selected === "to" && <Check className="w-10 h-10 text-brand font-bold" />}
            </span>
            To Airport
          </Label>

          {/* From Airport */}
          <Label
            htmlFor="from"
            className={`flex h-[54px] gap-x-3 items-center w-full px-4 py-[19px] rounded-lg cursor-pointer border ${
              selected === "from"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-700 hover:text-white"
            }`}
          >
            <RadioGroupItem value="from" id="from" className="sr-only" />
            <span
              className={`w-4 h-4 rounded-full ${
                selected === "from" ? "bg-white flex items-center justify-center" : "bg-gray-300"
              }`}
            >
              {selected === "from" && <Check className="w-10 h-10 text-brand font-bold" />}
            </span>
            From Airport
          </Label>

          {/* Point to Point */}
          <Label
            htmlFor="point"
            className={`flex h-[54px] gap-x-3 items-center w-full px-4 py-[19px] rounded-lg cursor-pointer border ${
              selected === "point"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-700 hover:text-white"
            }`}
          >
            <RadioGroupItem value="point" id="point" className="sr-only" />
            <span
              className={`w-4 h-4 rounded-full ${
                selected === "point" ? "bg-white flex items-center justify-center" : "bg-gray-300"
              }`}
            >
              {selected === "point" && <Check className="w-10 h-10 text-brand font-bold" />}
            </span>
            Point to Point
          </Label>

          {/* Hourly Charter */}
          <Label
            htmlFor="hourly"
            className={`flex flex-col  gap-y-3 w-full px-4 py-[19px] rounded-lg cursor-pointer border ${
              selected === "hourly"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-700 hover:text-white"
            }`}
          >
            <div className="flex gap-x-3 items-center">
              <RadioGroupItem value="hourly" id="hourly" className="sr-only" />
              <span
                className={`w-4 h-4 rounded-full ${
                  selected === "hourly" ? "bg-white flex items-center justify-center" : "bg-gray-300"
                }`}
              >
                {selected === "hourly" && <Check className="w-10 h-10 text-brand font-bold" />}
              </span>
              Hourly Charter
            </div>
            {selected === "hourly" && (
              <div className="mt-3">
                <HourlyCharterSelection />
              </div>
            )}
          </Label>

        </RadioGroup>
      </div>

    </div>
  );
};

export default BookingTypeOption;
