import { useFormikContext, FieldArray, Field } from "formik";
import StopInput from "./StopAddressList/StopAddress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AirportSelector from "./AirportSelector/AirportSelector";
import Autocomplete from "./AddressAutoComplete";



export default function DropOffAddressInput({ bookingType, showAirportSelector = true, }: { showAirportSelector?: boolean, bookingType: string, }) {
  const { values, setFieldValue, errors, touched } = useFormikContext<{
    dropOffAddress: string;
    stops: string[];
  }>();

  // Error handling for dropOffAddress...s
  const errorMessage =
    touched.dropOffAddress && typeof errors.dropOffAddress === "string"
      ? errors.dropOffAddress
      : null;

      // Handle airport selector value change
      const handleAirportSelect = (airport: string) => {
        setFieldValue("dropOffAddress", airport); 
      };

  return (
    <div className="w-full md:w-[550px] max-w-3xl space-y-3">
      <FieldArray
        name="stops"
        render={({ push, remove }) => (
          <>
            {values.stops.map((_, index) => (
              <StopInput
                key={index}
                index={index}
                onRemove={() => remove(index)}
              />
            ))}

            {/* Add stop input field */}
            <div className="relative h-20 lg:h-[54px] flex flex-col md:flex-row overflow-hidden rounded-lg bg-gray-50 shadow-sm">
              <div className="flex w-full h-7 md:h-14 md:w-[80px] items-center justify-start md:justify-end px-4 py-1 text-base font-medium text-gray-700">
                To:
              </div>
              <div className=" flex-1">
                {showAirportSelector ? (
                   <div className="absolute mt-0 lg:-mt-2.5  top-[68%] -translate-y-1/2 z-10 w-full p-0 border-none shadow-none outline-none">
                      <AirportSelector 
                        onSelect={handleAirportSelect}
                        
                      />
                   </div>
                ) : (
                  <Autocomplete
                  value={values.dropOffAddress}
                  onChange={(value) => setFieldValue('dropOffAddress', value)}
                  placeholder="Enter Full Drop-Off Address & Select From Autocomplete"
                  restrictAirports={bookingType === 'point'} 

                />
                  // <Field
                  //   name="dropOffAddress"
                  //   as={Input}
                  //   type="text"
                  //   className="w-full text-[16px] border-0 bg-white pr-24 py-7 focus-visible:ring-0 focus-visible:ring-offset-0"
                  //   placeholder="Enter Full Pick-Up Address & Select From Autocomplete"
                  // />
                )}
                
              
                <Button
                  type="button"
                  onClick={() => push("")} // Add a new stop to Formik's state
                  size="sm"
                  className="absolute right-2 md:right-3 top-[25px] md:top-1/2 -translate-y-1/2 z-20 bg-gray-800 px-3 text-white hover:bg-gray-700"
                >
                  Add Stop
                </Button>
              </div>
            </div>
              {errorMessage && (
                  <p className="text-red-500 text-xs !mt-0.5 pl-2">{errorMessage}</p>
                )}
          </>
        )}
      />
    </div>
  );
}
