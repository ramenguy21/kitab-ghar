import { useLocation } from "wouter";
import Calendar from "../components/calendar";
import HomeLayout from "../layouts/home";

function Home() {
  const [_, navigate] = useLocation();

  return (
    <HomeLayout>
      <div className="w-full">
        <div className="bg-local h-96 text-white flex flex-col py-10 bg-[url('../assets/images/index.png')] bg-cover bg-center h-full">
          <h1 className="text-5xl font-bold px-5 text-center">Kitab Ghar</h1>
          <p className="italic my-5 p-2 text-center bg-brand-black rounded w-fit m-auto">
            Kitab Ghar is an entirely free, citizen-funded public library,
            situated in Lahore and Karachi.
          </p>
        </div>
        <div className="md:hidden">
          <Calendar />
        </div>

        <div className="hidden md:flex p-5 justify-evenly space-x-4">
          <div className="p-2 border-2 border-gray-950">
            <h2 className="text-xl text-center font-bold">
              View upcoming events
            </h2>
          </div>
          <div>
            <img src="" />
          </div>
          <button
            onClick={() => navigate("/events")}
            className="border-2 border-brand-black p-2 transition-shadow duration-300 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.5)]"
          >
            Visit now
          </button>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Home;
