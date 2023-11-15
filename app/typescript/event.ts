import  { Dayjs } from "dayjs";

export default interface Event {
  id: number;
  type: string;
  day: string;
  start: Dayjs;
  end: Dayjs;
}