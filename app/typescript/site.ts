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
  destination_id: string;
  destinations: Destination;
  description: string | null;
  short_desc: string | null;
  image: string | null;
}
