import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormikContext } from "formik";
import AirportSelector from "./AirportSelector/AirportSelector";
import Autocomplete from "./AddressAutoComplete";

const PickUpAddressInput = ({ showAirportSelector, bookingType }: any) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<{
    pickUpAddress: string;
    stops: string[];
  }>();

  

  // Error handling for pickUpAddress
  const errorMessage =
    touched.pickUpAddress && typeof errors.pickUpAddress === "string"
      ? errors.pickUpAddress
      : null;

  const handleAirportSelect = (selectedAirport: string) => {
    setFieldValue("pickUpAddress", selectedAirport); // Update Formik's pickUpAddress field
  };


  return (
    <>
    <div className="relative flex h-20 lg:h-[55px] flex-col md:flex-row overflow-hidden rounded-lg bg-gray-50 shadow-sm ">
      <div className="flex w-full h-8 md:h-14 md:w-[80px] items-center justify-start md:justify-end px-4 py-1 text-base font-medium text-gray-700">
        From:
      </div>
      <div className="w-full flex-1">
        {showAirportSelector ? (
          <>
            <div className="absolute mt-0 lg:-mt-2.5 top-[68%] -translate-y-1/2 z-10 w-full p-0 border-none shadow-none outline-none">
              <AirportSelector onSelect={handleAirportSelect} />
            </div>
          
          </>
        ) : (
          <Autocomplete
            value={values.pickUpAddress}
            onChange={(value) => setFieldValue('pickUpAddress', value)}
            restrictAirports={bookingType === 'point'} 
            placeholder="Enter Full Pick-Up Address & Select From Autocomplete"
          />
        )}
        
        {/* <Button
          type="button"
          size="sm"
          onClick={() => setFieldValue("stops", [...values.stops, ""])} // Add new stop
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-950 px-3 text-white hover:bg-gray-800"
        >
          Add Stop
        </Button> */}
      </div>
    </div>
      {errorMessage && <p className="text-red-500 text-xs !-mt-2 pl-2">{errorMessage}</p>}
    </>
  );
};

export default PickUpAddressInput;
