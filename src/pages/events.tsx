import { useLocation, useParams } from "wouter";
import Calendar, { monthNames } from "../components/calendar";
import HomeLayout from "../layouts/home";
import { useEvents } from "../components/contexts/events";

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

  const [_, navigate] = useLocation();

  const event = getEventById!(params.id || "");

  return (
    <HomeLayout>
      <div>
        <h1>{event?.name}</h1>
        <p>{event?.description || "No description provided"}</p>
        <button
          className="bg-brand-pink p-2 rounded border-2 border-brand-black self-start"
          onClick={() => navigate(`/event/${params.id}/register`)}
        >
          Get Tickets
        </button>
      </div>
    </HomeLayout>
  );
}

export default Events;
