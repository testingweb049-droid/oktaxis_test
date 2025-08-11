import { useFormikContext } from "formik";
import { Button } from "@/components/ui/button";
import Autocomplete from "../AddressAutoComplete";
import { X } from "lucide-react";

interface StopInputProps {
  index: number;
  onRemove: () => void;
}

export default function StopInput({ index, onRemove }: StopInputProps) {
  const { values, setFieldValue, errors, touched } = useFormikContext<{
    stops: string[];
  }>();

  const stopError = errors.stops?.[index];
  // const stopTouched = touched.stops?.[index];
  

  return (
    <div className="flex overflow-hidden rounded-lg bg-gray-50 h-[54px] shadow-sm">
      <div className="flex w-[80px] items-center justify-end px-4 text-base font-medium text-gray-700">
        Stop {index + 1}:
      </div>
      <div className="relative flex-1">
        <Autocomplete
          value={values.stops[index] || ""}
          onChange={(value) => setFieldValue(`stops[${index}]`, value)}
          placeholder="Enter Stop Address"
        />
        {stopError && (
          <p className="text-red-500 text-xs mt-1 pl-2">{stopError}</p>
        )}
        <Button
          type="button"
          onClick={onRemove}
          size="sm"
          variant="ghost"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-red-700 hover:bg-red-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
