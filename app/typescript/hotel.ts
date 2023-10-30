import Destination from "./destination";

export default interface Profile {
  id: string;
  created_at: string;
  name: string;
  address: string;
  postal: string;
  email: string;
  destination_id: string;
  destinations:  Destination;
}