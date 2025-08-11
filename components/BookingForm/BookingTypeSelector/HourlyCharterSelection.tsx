import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormikContext } from "formik";

export default function HourlyCharterSelection() {
  const { values, setFieldValue } = useFormikContext<any>();

  // Generate hours array from 2 to 24
  const hours = Array.from({ length: 23 }, (_, i) => i + 2);

  const handleChange = (value: string) => {
    setFieldValue("hourlyCharter", value); // Update Formik field with selected hour
  };

  return (
    <div className="w-full space-y-2">
      <p className="text-base text-gray-500">Enter hours (Minimum 2 hours)</p>
      <Select
        value={values.hourlyCharter || "2"}
        onValueChange={handleChange} 
      >
        <SelectTrigger className="w-full bg-white text-gray-950 outline-none py-6 focus:ring-0">
          <SelectValue placeholder="Select hours" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((hour) => (
            <SelectItem 
              key={hour} 
              value={hour.toString()} 
              className="cursor-pointer focus:bg-gray-700 focus:text-white"
            >
              <span className="block py-2 px-2 rounded transition-colors">
                {hour} HRS
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
