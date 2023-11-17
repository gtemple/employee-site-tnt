import Destination from "./destination";

export default interface Restaurant {
  id: string;
  created_at: string;
  name: string;
  address: string;
  postal: string;
  phone: string;
  email: string;
  capacity: number;
  short_desc: string | null;
  destination_id: string;
  destinations: Destination;
}