import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

const customShortWeekdayNames = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function App() {
  const [dateState, setDateState] = useState(new Date());

  const changeDate = (e) => {
    setDateState(e);
  };

  const formatShortWeekday = (locale, date) => {
    console.log(locale, date.getDay());
    return customShortWeekdayNames[date.getDay()];
  };

  return (
    <>
      <Calendar
        value={dateState}
        onChange={changeDate}
        formatShortWeekday={formatShortWeekday}
        calendarType="US"
      />
    </>
  );
}
