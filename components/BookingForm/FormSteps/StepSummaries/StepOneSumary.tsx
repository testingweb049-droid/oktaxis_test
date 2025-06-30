import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { Car, MapPin, Plane, LandPlot } from "lucide-react"; // Added Plane icon for Airline
import dayjs from "dayjs";

interface StepOneSummaryProps {
  bookingType: string;
  pickUpAddress: string;
  dropOffAddress: string;
  stops?: string[];
  date: string;
  time: string;
  airline?: string;
  flightNumber?: string;
  hourlyCharter?: string;
  distance: number;
}

const StepOneSummary = ({
  bookingType,
  pickUpAddress,
  dropOffAddress,
  stops = [],
  date,
  time,
  airline,
  flightNumber,
  hourlyCharter,
  distance
}: StepOneSummaryProps) => {
  // Helper function to format the date
  const formatDate = (date: string) => {
    return date ? dayjs(date).format("DD MMMM, YYYY") : "Not Selected";
  };

  return (
    <div className="w-[320px] lg:w-full bg-white shadow-lg rounded-lg px-6 py-2 text-gray-800 space-y-2">
      <h2 className="text-[16px] font-bold mb-3 border-b pb-1">Ride Info Summary</h2>

      <div className="flex items-center gap-2">
        <Car className="text-gray-500 w-4 h-4" />
        <p className="font-semibold text-sm">Booking Type:</p>
        <span className="text-sm">{bookingType || "Not Selected"}</span>
      </div>

      {/* Display the selected hours for hourly booking type */}
      {bookingType === "hourly" && (
        <div className="flex items-center gap-2">
          <ClockIcon className="text-brand w-4 h-4" />
          <p className="font-semibold text-sm">Selected Hours:</p>
          <span className="text-sm">{hourlyCharter ? `${hourlyCharter} HRS` : "Not Selected"}</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <MapPin className="text-brand w-4 h-4" />
        <p className="font-semibold text-sm">Pickup Address:</p>
        <span className="text-sm">{pickUpAddress || "Not Selected"}</span>
      </div>

      {/* Display Airline and Flight Number if provided */}
      {airline && (
        <div className="flex items-center gap-2">
          <Plane className="text-blue-500 w-4 h-4" />
          <p className="font-semibold text-sm">Airline:</p>
          <span className="text-sm">{airline || "Not Provided"}</span>
        </div>
      )}

      {flightNumber && (
        <div className="flex items-center gap-2">
          <Plane className="text-blue-500 w-4 h-4" />
          <p className="font-semibold text-sm">Flight Number:</p>
          <span className="text-sm">{flightNumber || "Not Provided"}</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <MapPin className="text-red-500 w-4 h-4" />
        <p className="font-semibold text-sm">Drop-Off Address:</p>
        <span className="text-sm">{dropOffAddress || "Not Selected"}</span>
      </div>

      {/* Display stop addresses if they exist */}
      {stops.length > 0 && (
        <div>

          <p className="font-semibold text-sm">Stops:</p>
          <div className="flex flex-col gap-2 ml-4 mt-2">
            {stops.map((stop, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                <MapPin className="text-blue-500 w-4 h-4" />
                <span className="text-sm">{stop || "No Address Provided"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <CalendarIcon className="text-purple-500 w-4 h-4" />
        <p className="font-semibold text-sm">Date:</p>
        <span className="text-sm">{formatDate(date)}</span>
      </div>

      <div className="flex items-center gap-2">
        <ClockIcon className="text-brand w-4 h-4" />
        <p className="font-semibold text-sm">Time:</p>
        <span className="text-sm">{time || "Not Selected"}</span>
      </div>

      <div className="flex items-center gap-2">
        <LandPlot className="text-gray-800 w-4 h-4" />
        <p className="font-semibold text-sm">Distance:</p>
        <span className="text-sm">{`${distance} miles` || "Not Calculated"}</span>
      </div>
    </div>
  );
};

export default StepOneSummary;
