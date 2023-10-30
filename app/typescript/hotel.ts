import Destination from "./destination";

export default interface Hotel {
  id: string;
  created_at: string;
  name: string;
  address: string;
  postal: string;
  phone: string;
  email: string;
  destination_id: string;
  destinations: Destination;
}