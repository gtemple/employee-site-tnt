import Destination from "./destination";

export default interface Site {
  id: string;
  name: string;
  created_at: string;
  city: number;
  address: string;
  website: string;
  postal: string;
  phone: string | null;
  destinations: Destination;
  description: string | null;
  image: string | null;
}