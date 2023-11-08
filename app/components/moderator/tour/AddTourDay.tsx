"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import '@/app/styles/Calendar.css'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const AddTourDay = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [addDayWidget, setAddDayWidget] = useState(false);

  const data = {};

  const handleOpenDayWidget = () => setAddDayWidget(true);
  const handleCloseDayWidget = (submit: boolean) => {
    if (!submit) {
      setAddDayWidget(false);
    }
    setAddDayWidget(false);
    console.log(date)
    console.log("post request to add date");
  };

  return (
    <div>
      {!addDayWidget ? (
        <button onClick={handleOpenDayWidget}>Add Day</button>
      ) : (
        <div>
          <Calendar onChange={setDate} value={date} />
          <button onClick={() => handleCloseDayWidget(true)}>Submit</button>
          <button onClick={() => handleCloseDayWidget(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};
