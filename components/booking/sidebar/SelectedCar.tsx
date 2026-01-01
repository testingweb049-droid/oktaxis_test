import useFormStore from "@/stores/FormStore";
import { fleets } from "@/lib/fleet-data";
import Image from "next/image";
import { LuggageIcon, Users } from "lucide-react";
 
export default function SelectedCar() {
  const { formData } = useFormStore();
  const selectedFleet = fleets.find((item) => item.name === formData.car.value);
  
  if (!selectedFleet) return null;
 
  return (
    <div className="bg-gray-100 rounded-lg border border-gray-200 px-4 flex items-center justify-between gap-2 w-full">
      <Image 
        src={selectedFleet.image} 
        alt={selectedFleet.name} 
        width={96}
        height={96}
        className="w-24 h-24 object-contain"
      />
      <div className="font-bold text-lg">{selectedFleet.name}</div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Users className="size-4 font-bold" />
          <p>{selectedFleet.passengers}</p>
        </div>
        <div className="flex items-center gap-1">
          <LuggageIcon className="size-4 font-bold" />
          <p>{selectedFleet.suitcases}</p>
        </div>
      </div>
    </div>  
  );
}