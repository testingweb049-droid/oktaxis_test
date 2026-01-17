export interface FleetType {
  _id?: string;
  id?: string;
  name: string;
  cars?: string;
  passengers: number;
  suitcases: number;
  image: string;
  description?: string;
  calculatedPrice?: number;
}

