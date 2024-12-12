import { Link } from "wouter";
import HomeLayout from "../layouts/home";

function Join() {
  return (
    <HomeLayout>
      <div className="flex flex-col items-center align-center justify-between mx-10 md:mx-64 my-5">
        <p className="italic my-2">
          Kitab Ghar defines itself as an open-source revolutionary movement. We
          want you to join us on your own volition and help build a new South
          Asia.
        </p>
        <div className="my-5">
          <h1 className="font-bold text-2xl text-center my-4">VOLUNTEER</h1>
          <div className="flex flex-col align-center text-center text-white items-center">
            <Link className="my-2 bg-red-600 w-fit p-2 rounded" to="#">
              PICK UP A SHIFT
            </Link>
            <Link className="my-2 bg-red-600 w-fit p-2 rounded" to="#">
              APPLY FOR AN INTERNSHIP {"(for ages 15-18)"}
            </Link>
          </div>
        </div>

        <div className="my-5">
          <h1 className="font-bold text-2xl text-center my-4">
            BECOME A MONTHLY PLEDGER/PARTNER ORGANIZATION
          </h1>
          <p>Our financial modus operandi is simple:</p>
          <ul className="list-disc">
            <li>
              <b>Founders</b> collect a small angel investment
              {"(ranging from 1 to 10 lakh PKR, depending on the city)"}, and
              through volunteer labor, establish a community library.
            </li>
            <li>
              Citizens are invited to join as <b>Monthly Pledgers</b>, earning
              patron privileges, or as Partner Organizations to help sustain the
              initiative.
            </li>
          </ul>
          <p>
            Patrons commit a monthly pledge of PKR 5000 or above, for at least a
            period of 6 months, and earn patron privileges that make them a
            contributing member of our library community.
          </p>
          <h2>Patron Privileges, include:</h2>
          <ul className="list-disc">
            <li>
              After-hours access for library use, requested at least 48 hours in
              advance
            </li>
            <li>
              Ability to host private and public community events, in
              collaboration with the Kitab Ghar team
            </li>
            <li>Advisory capacity to request certain types of programming</li>
            <li>
              Receive a monthly newsletter report on our activities, financing
              strategies, and progress
            </li>
            <li>
              Receive complimentary copies of our current and future
              publications
            </li>
          </ul>
          <p>
            If you are sure, become a monthly patron or partner organisation by
            contacting us here
          </p>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Join;
