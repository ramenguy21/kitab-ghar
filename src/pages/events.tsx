import { monthNames } from "../components/calendar";
import HomeLayout from "../layouts/home";

// courses and workshops
function Events() {
  return (
    <HomeLayout>
      <h1>Upcoming Events for {monthNames.get(new Date().getMonth())}</h1>
    </HomeLayout>
  );
}

export default Events;
