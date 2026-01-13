import useFormStore from "@/stores/form-store";
import Image from "next/image";
import { LuggageIcon, Users } from "lucide-react";
import { useEffect, useState } from "react";
import type { FleetType } from "@/lib/fleet-data";
 
function selectedCar() {
  const { formData } = useFormStore();
  const [fleets, setFleets] = useState<FleetType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFleets = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/fleets");
        if (res.ok) {
          const data = await res.json();
          setFleets(data.fleets || []);
        }
      } catch (error) {
        console.error("Failed to load fleets in SelectedCar:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFleets();
  }, []);

  const selectedFleet = fleets.find((item) => item.name === formData.car.value);
  
  if (loading || !selectedFleet) return null;
 
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

const SelectedCar = selectedCar;
export default SelectedCar;