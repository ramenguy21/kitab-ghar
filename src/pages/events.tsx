import { useLocation, useParams } from "wouter";
import Calendar, { monthNames } from "../components/calendar";
import HomeLayout from "../layouts/home";
import { useEvents } from "../components/contexts/events";
import { useRemark } from "react-remark";
import { useEffect } from "react";

// courses and workshops
function Events() {
  return (
    <HomeLayout>
      <h1 className="text-4xl text-center my-10">
        Upcoming Events for <i>{monthNames.get(new Date().getMonth() + 1)}</i>
      </h1>

      <div className="mb-10">
        <Calendar />
      </div>
    </HomeLayout>
  );
}

//singular event page
export function EventPage() {
  const params = useParams();
  const { getEventById } = useEvents();

  const [eventText, setEventText] = useRemark();

  const [_, navigate] = useLocation();

  const event = getEventById!(params.id || "");

  //possible bug, using images crashes the page.

  useEffect(() => {
    setEventText(`### Welcome to Kitab Ghar`);
  });

  //check the event Payment Options against the data

  return (
    <HomeLayout>
      <div className="flex flex-col items-center align-center justify-between mx-10 md:mx-64 my-5">
        <h1>{event?.name}</h1>
        <div className="markdown w-full">
          {
            /*TODO : We can get the list of all images and display them together perhaps ? */
            eventText
          }
        </div>

        <div className="m-4">
          <h4 className="font-bold text-lg">Payment Options</h4>
          <ul className="list-decimal">
            <li className="my-2">
              <h5 className="font-bold">Bank Transfer</h5>
              <p>
                Transfer payment to the below bank account and we'll email you
                the tickets shortly
              </p>
            </li>
            <li className="my-2">
              <h5>{"EasyPaisa - (WIP)"}</h5>
              <button className="disabled p-2 bg-gray-400 text-white rounded my-1">
                Pay Now
              </button>
            </li>
          </ul>
        </div>

        <button
          className="self-end bg-brand-pink p-4 text-xl rounded border-2 border-brand-black self-start shadow-[2px_2px_0px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.5)]"
          onClick={() => navigate(`/event/${params.id}/register`)}
        >
          Get Tickets
        </button>
      </div>
    </HomeLayout>
  );
}

export default Events;
