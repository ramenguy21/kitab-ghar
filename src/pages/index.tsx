import { Link } from "wouter";
import Calendar from "../components/calendar";

function Home() {
  return (
    <>
      <div>
        <h1 className="text-center font-bold text-2xl">Kitab Ghar</h1>
        <Calendar />
        <Link to="/who-we-are">What is Kitab Ghar ?</Link>
      </div>
    </>
  );
}

export default Home;
