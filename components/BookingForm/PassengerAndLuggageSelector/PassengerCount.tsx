import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormikContext } from "formik";

export default function PassengerCount() {
  const { values, setFieldValue } = useFormikContext<any>();

  const passengerNumbers = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="w-full">
      <Select
        defaultValue={values.passengerCount}
        onValueChange={(value) => setFieldValue("passengerCount", value)} // Update form state
      >
        <SelectTrigger className="w-full bg-white rounded-lg py-7 flex gap-2">
          <span className="text-base text-gray-500">Passengers:</span>
          <SelectValue placeholder="Please select your passengers" className="text-base" />
        </SelectTrigger>
        <SelectContent>
          {passengerNumbers.map((number) => (
            <SelectItem
              key={number}
              value={number.toString()}
              className="cursor-pointer focus:bg-gray-950 focus:text-white outline-none focus-visible:ring-0"
            >
              <span className="block py-2 px-2 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                {number}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
