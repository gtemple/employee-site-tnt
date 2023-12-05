import Destination from "./destination";
import School from "./school";
import Profile from "./profile";
import { Itinerary } from "./itinerary";
import { Dayjs } from "dayjs";
export default interface Tour {
  id: string;
  start: Dayjs;
  end: Dayjs;
  school_id: number;
  students: number
  schedule: Itinerary;
  destination_id: string;
  notes: string;
  profile_id: string;
  available: boolean;
  requested: {id: string, first_name:string, last_name: string}[];
  profiles: Profile;
  schools: School;
  destinations: Destination
}