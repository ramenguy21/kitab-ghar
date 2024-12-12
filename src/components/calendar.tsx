import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useEvents } from "./contexts/events";

type CalendarType = {
  //this is an index signature
  [month: number]: Date[];
};

type EventType = {
  id: string;
  name: string;
  date: Date;
  seatsAvailable: number;
  seatsBooked: number;
  paymentOptions: string;
};

export const monthNames = new Map([
  [1, "January"],
  [2, "Feburary"],
  [3, "March"],
  [4, "April"],
  [5, "May"],
  [6, "June"],
  [7, "July"],
  [8, "August"],
  [9, "September"],
  [10, "October"],
  [11, "November"],
  [12, "December"],
]);
const Calendar = () => {
  // Since date isn't reactive, it's fine to define it like this I think.
  const date = new Date();

  const [_, navigate] = useLocation();

  function generateCalendar(year: number) {
    const data: CalendarType = [];

    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      data[month + 1] = [];

      for (let day = 1; day <= daysInMonth; day++) {
        data[month + 1].push(new Date(year, month, day));
      }
    }

    return data;
  }

  const [calendar, setCalendar] = useState<CalendarType>([]);
  const { events } = useEvents();
  const [selectedDate, setSelectedDate] = useState<string>(date.toDateString());

  useEffect(() => {
    const year = date.getFullYear();
    setCalendar(generateCalendar(year));
  }, []);

  const eventsForSelectedDate = events.filter(
    (ev) => ev.date.toDateString() === selectedDate
  );

  return (
    <div className="flex flex-col justify-around md:flex-row">
      <div className="grid grid-cols-7 gap-2 basis-3/5">
        {
          //Extract out day names and add them as the first row
          calendar[date.getMonth() + 1] &&
            calendar[date.getMonth() + 1].slice(0, 7).map((dayDP) => (
              <p
                key={dayDP.toDateString()}
                className="text-center font-bold text-brand-gray"
              >
                {dayDP.toDateString().split(" ")[0]}
              </p>
            ))
        }
        {calendar[date.getMonth() + 1] &&
          calendar[date.getMonth() + 1].map((day) => {
            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day.toDateString())}
                className={
                  selectedDate === day.toDateString()
                    ? "p-2 text-xl rounded-full text-brand-white w-fit m-auto bg-brand-pink"
                    : "p-2 text-xl rounded-full text-brand-black w-fit m-auto hover:bg-gray-400 hover:text-white"
                }
              >
                {day.toDateString().split(" ")[2]}
              </button>
            );
          })}
      </div>
      <div className="flex ">
        <div className="border-2 p-4 border-brand-black rounded-[64px] flex flex-col justify-around items-center transition-shadow duration-300 hover:shadow-[8px_8px_0px_rgba(255,196,225,1)]">
          <h4>{selectedDate}</h4>
          {/*Add a map function after the filter cuz selectedDate may have
          multiple events */}
          <h2 className="text-xl font-bold p-4">
            {eventsForSelectedDate[0]?.name || "No events scheduled"}
          </h2>
          {eventsForSelectedDate.length ? (
            <button
              onClick={() => navigate(`/event/${eventsForSelectedDate[0].id}`)}
              className="bg-brand-pink p-2 rounded border-2 border-brand-black self-start"
            >
              See details
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
