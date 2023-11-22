"use client";

import { ItineraryDay } from "@/app/typescript/itinerary";
import Event from "@/app/typescript/event";
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  itinerary: ItineraryDay;
  deleteEvent: (event: Event) => void;
};

const PrintTourDay = ({ itinerary, deleteEvent }: Props) => {
  const printActivities = () => {
    const activitiesKeys = Object.keys(itinerary.schedule);

    // Sort activities by start time
    const sortedActivitiesKeys = activitiesKeys.sort((a, b) => {
      const activityA = itinerary.schedule[a];
      const activityB = itinerary.schedule[b];
      return dayjs(activityA.start).diff(dayjs(activityB.start));
    });

    return sortedActivitiesKeys.map((key: string) => {
      const activity = itinerary.schedule[key];
      return (
        <div className="activity" key={key}>
          <div className="time-display">
            {dayjs(activity.start).format("HH:mm")} - {dayjs(activity.end).format("HH:mm")}
          </div>
          <div className='activity-text'>
            <div className="activity-name">{activity.activity.name}</div>
            <div className='activity-address'>{activity.activity.address} - {activity.activity.phone}</div>
            <div>{activity.activity.short_desc}</div>
          </div>
          <div className="delete-section">
            <div
              onClick={() => {
                deleteEvent(activity);
              }}
            >
              <DeleteIcon />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {printActivities()}
    </div>
  );
};

export default PrintTourDay;