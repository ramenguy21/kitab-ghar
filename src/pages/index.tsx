import Calendar from "../components/calendar";
import Icon from "../components/icon";
import HomeLayout from "../layouts/home";

function Home() {
  return (
    <HomeLayout>
      <div>
        <div className="md:hidden">
          <Calendar />
          <Icon name="fa-instagram" color="red" />
        </div>
      </div>
    </HomeLayout>
  );
}

export default Home;
