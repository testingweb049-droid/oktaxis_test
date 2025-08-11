import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormikContext } from "formik";

export default function ChildCount() {
  const { values, setFieldValue } = useFormikContext<any>();

  const childNumbers = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="w-full">
      <Select
        defaultValue={values.childCount}
        onValueChange={(value) => setFieldValue("childCount", value)} 
      >
        <SelectTrigger className="w-full bg-white py-7 flex gap-2 rounded-lg focus:ring-0">
          <span className="text-base text-gray-500">Childs:</span>
          <SelectValue placeholder="Please select your childs" className="text-base" />
        </SelectTrigger>
        <SelectContent>
          {childNumbers.map((number) => (
            <SelectItem
              key={number}
              value={number.toString()}
              className="cursor-pointer focus:bg-gray-800 focus:text-white outline-none focus-visible:ring-0"
            >
              <span className="block py-2 px-2 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                {number}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
