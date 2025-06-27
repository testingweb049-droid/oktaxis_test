import { Textarea } from "@/components/ui/textarea";
import { useFormikContext } from "formik";

export function TextareaInstruction() {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div className="w-full">
      <Textarea
        placeholder="Your instructions..."
        className="w-full h-[56px] p-4 text-[16px] !bg-white border border-none rounded-lg shadow-sm focus:ring-0 focus-visible:ring-0"
        aria-label="Your message"
        onChange={(e) => setFieldValue("textarea", e.target.value)}
      />
    </div>
  );
}
