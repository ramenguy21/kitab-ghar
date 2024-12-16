import { useLocation } from "wouter";
import Calendar from "../components/calendar";
import HomeLayout from "../layouts/home";
import ImageCarousel from "../components/image_carousel";

function Home() {
  const [_, navigate] = useLocation();

  return (
    <HomeLayout>
      <div className="w-full">
        <div className="hidden md:block">
          <ImageCarousel />
        </div>
        <div className="bg-brand-pink h-96 text-white flex flex-col py-10 h-full mx-10 md:mx-0 mb-10 md:mb-0">
          <h1 className="text-5xl font-bold px-5 text-center">Kitab Ghar</h1>
          <p className="italic my-5 p-2 text-center bg-brand-black rounded w-fit m-auto">
            Kitab Ghar is an entirely free, citizen-funded public library,
            situated in Lahore and Karachi.
          </p>
        </div>
        <div className="md:hidden">
          <Calendar />
        </div>
        <div className="hidden md:flex p-5 justify-evenly space-x-4 mb-10 bg-brand-pink">
          <h2 className="text-3xl text-center font-bold m-4 ">
            View upcoming events
          </h2>
          <button
            onClick={() => navigate("/events")}
            className="border-2 italic rounded border-brand-black p-2 transition-shadow duration-300 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.5)]"
          >
            Visit now
          </button>
        </div>
        <div className="hidden md:flex flex-col p-5 justify-evenly space-x-4 my-10 relative w-fit m-auto">
          <h2 className="text-3xl font-bold text-center my-2">
            Join the Kitab Ghar Movement
          </h2>
          <img
            className="object-contain h-96 rounded"
            src="https://ydjtoaowwbotqberabzh.supabase.co/storage/v1/object/public/kg_lahore/7CF8AE72-9532-4238-BF2D-88BE28E25257.jpeg"
          />
          <button
            onClick={() => navigate("/join")}
            className="absolute bottom-10 right-10 bg-brand-dark_green text-white p-2 rounded transition-shadow duration-300 hover:shadow-[4px_4px_0px_rgba(255,196,225,1)]"
          >
            Learn More
          </button>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Home;
