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
  totalCalculatedPrice?: number; // Price before display discount
  pricingBreakdown?: {
    basePrice: number;
    dateBasedIncrease?: number;
    dateBasedPercent?: number;
    lastMinuteIncrease?: number;
    lastMinutePercent?: number;
    finalPrice: number;
    displayDiscount?: number;
    originalPrice?: number;
  };
}

