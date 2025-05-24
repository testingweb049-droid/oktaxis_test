export interface OrderProps {
    id: string; 
    category: string;
    price: string;
    car: string;
    distance?: string | null; 
    stop_1?: string | null; 
    stop_2?: string | null; 
    stop_3?: string | null; 
    pickup_date: Date;
    pickup_time: string;
    return_date: Date | null;
    return_time: string | null;
    is_return:boolean | null,
    pickup_location: string;
    dropoff_location: string | null;
    passengers: number;
    kids: number;
    bags: number;
    name: string;
    email: string;
    phone: string;
    payment_method: string|null;
    flight: string | null;
    duration?: number | null;
    flight_track:boolean | null, 
    meet_greet:boolean | null, 
    updated_at: Date; 
    created_at: Date; 
  }
  