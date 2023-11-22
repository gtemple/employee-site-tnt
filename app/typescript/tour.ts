import Destination from "./destination";
import School from "./school";
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
  schools: School;
  destinations: Destination
}