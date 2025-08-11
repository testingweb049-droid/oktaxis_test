import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormikContext } from "formik";

export default function BagCount() {
  const { values, setFieldValue } = useFormikContext<any>();

  const baggageNumbers = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="w-full">
      <Select
        defaultValue={values.bagCount}
        onValueChange={(value) => setFieldValue("bagCount", value)} // Update form state
      >
        <SelectTrigger className="w-full bg-white py-7 flex gap-2 rounded-lg focus:ring-0">
          <span className="text-base text-gray-500">Bags:</span>
          <SelectValue placeholder="Please select your bags" className="text-base" />
        </SelectTrigger>
        <SelectContent>
          {baggageNumbers.map((number) => (
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
