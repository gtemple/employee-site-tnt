"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "@/app/styles/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const AddTourDay = () => {
  const [data, setData] = useState({});
  const [dateValue, setDateValue] = useState(dayjs());
  const [addDayWidget, setAddDayWidget] = useState(false);

  const startDateExists = () => {
    const keys = Object.keys(data);
    if (keys.length > 0) {
      return true;
    }
    return false;
  };

  const startDate = () => {
    const keys = Object.keys(data);
    if (keys.length > 0) {
      return;
    }
    setData({
      0: {
        date: dateValue,
      },
    });
    return;
  };

  // this function adds a day to the schedule by doing the following:
  // 1. gets current amount of days
  // 2. adds the current trip length to the starting date (thus adding the next date... if start date is Nov 12th and trip length is already 3 days, 12 + 3 creates the 15th)
  const addDay = () => {
    const nextDayOnTrip = Object.keys(data).length;
    const nextDate = dayjs(dateValue).add(nextDayOnTrip, "day").toDate();
    setData((prev) => ({ ...prev, [nextDayOnTrip]: { date: nextDate } }));
  };

  const handleOpenDayWidget = () => setAddDayWidget(true);
  const handleCloseDayWidget = (submit: boolean) => {
    if (!submit) {
      setAddDayWidget(false);
    }
    startDate();
    setAddDayWidget(false);
  };

  return (
    <div>
      <button onClick={() => console.log(data)}>test data</button>
      {/* checks to see if there is already a start date, if so gives the option to add the following day */}
      {startDateExists() ? (
        <button onClick={addDay}>Add Day</button>
      ) : !addDayWidget ? (
        <button onClick={handleOpenDayWidget}>Set Start Date</button>
      ) : (
        <div>
          <Calendar onChange={setDateValue} value={dateValue} />
          <button onClick={() => handleCloseDayWidget(true)}>Submit</button>
          <button onClick={() => handleCloseDayWidget(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};
