import  { Dayjs } from "dayjs";
import Site from "./site";

export default interface Event {
  activity: Site,
  type: string;
  day: string;
  start: Dayjs;
  end: Dayjs;
}