import { Dayjs } from "dayjs";
import Event from "./event";

export interface ItineraryDay {
  date: Dayjs;
  schedule: {
    [key: string]: Event;
  };
}

export interface Itinerary {
  [key: number]: {
    date: Dayjs;
    schedule: {
      [key: string]: Event
    };
  };
}
