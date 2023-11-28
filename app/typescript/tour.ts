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
  profiles: Profile;
  schools: School;
  destinations: Destination
}