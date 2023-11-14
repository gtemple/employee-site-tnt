import  { Dayjs } from "dayjs";

export default interface Event {
  id: string;
  type: string;
  start: Dayjs;
  end: Dayjs;
}