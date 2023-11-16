"use client"

import { ItineraryDay } from "@/app/typescript/itinerary"
import Event from "@/app/typescript/event";
import dayjs from "dayjs";

type Props = {
  itinerary: ItineraryDay;
}

const PrintTourDay = ({ itinerary }: Props) => {
  const printActivities = () => {
    const activitiesKeys = Object.keys(itinerary.schedule);
    return activitiesKeys.map((key: string) => {
      const activity = itinerary.schedule[key];
      return (
        <div key={key}>
          {activity.id}, start: {dayjs(activity.start).format('HH:mm')}, end: {dayjs(activity.end).format('HH:mm')}
        </div>
      );
    });
  };

  return (
    <div>
      <h3>PrintTourDay</h3>
      {printActivities()}
    </div>
  );
};

export default PrintTourDay