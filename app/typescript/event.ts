import  { Dayjs } from "dayjs";
import Site from "./site";

export default interface Event {
  activity: Site,
  day: string;
  start: Dayjs;
  end: Dayjs;
}