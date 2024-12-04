import { ReactNode, useState } from "react";
import { Link, useRoute } from "wouter";
import Icon from "../components/icon";

interface HomeLayoutProps {
  children: ReactNode;
}

function HomeLayout({ children }: HomeLayoutProps) {
  const [match, params] = useRoute("/");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    {
      label: "Who We are",
      page: "/who-we-are",
    },
    { label: "Courses & Workshops", page: "/events" },
    { label: "Shop", page: "/shop" },
    { label: "Join The Movement", page: "/join" },
    { label: "", page: "" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header>
        <div className="flex flex-col w-fit m-auto">
          <h1 className="text-2xl font-bold text-center">Kitab Ghar</h1>
          {!match && (
            <Link
              to="/"
              className="text-sm text-right underline p-1 hidden md:block"
            >
              (Ghar Chalo)
            </Link>
          )}
        </div>
        <div className="justify-center space-x-4 hidden md:flex">
          {links.map(({ page, label }) => (
            <Link
              className={`w-fit underline hover:no-underline hover:cursor-pointer p-2 ${
                page === "/join" ? "bg-red-500 text-white rounded" : ""
              } `}
              to={page}
            >
              {label}
            </Link>
          ))}
        </div>
        <button
          className="m-4 rounded bg-blue-500 p-2 text-white md:hidden basis-1/5"
          onClick={() => setSidebarOpen(true)}
        >
          <Icon name="fa-bars" />
        </button>
      </header>
      <main className="m-3 mb-auto flex">
        <div
          className={`fixed inset-y-0 left-0 w-64 transform bg-gray-800 text-white transition-transform md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between bg-white">
            <div className="p-4 text-lg font-bold text-gray-700">
              Kidhr Chalein ?
            </div>
            <button
              className="p-5 bg-red-500 text-white"
              onClick={() => setSidebarOpen(false)}
            >
              X
            </button>
          </div>

          <div className="flex flex-col space-y-2 p-4">
            {!match && (
              <Link to="/" className="w-fit p-2">
                Ghar Chalo
              </Link>
            )}
            {links.map(({ page, label }) => (
              <Link
                className={`w-fit p-2 ${
                  page === "/join" ? "bg-red-500 text-white rounded" : ""
                } `}
                to={page}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full mx-4 my-5 md:mx-64">{children}</div>
      </main>
      <footer className="bg-yellow-700 p-4 text-white w-full">
        <div className="w-3/4 m-auto">
          <p className=" text-2xl font-bold">Library chalo</p>
          <div className="my-4">
            <div className="my-2">
              <h2 className="font-bold">KARACHI</h2>
              <a target="_blank" href="https://instagram.com/kitabghar.karachi">
                <Icon name="fa-instagram" color="white" />
              </a>
            </div>
            <p>
              Top floor of the Climate Action Center,
              <br />
              Bungalow 236-B, PECHS 2
              <br />
              Off Shahrah e Quaideen,
              <br />
              Karachi, Sindh
            </p>
          </div>
          <div className="my-4">
            <div className="my-2">
              <h2 className="font-bold">LAHORE</h2>
              <a target="_blank" href="https://instagram.com/kitabgharlahore">
                <Icon name="fa-instagram" color="white" />
              </a>
            </div>
            <p>
              23-A, Sultan Ahmed Road,
              <br />
              Rehmanpura Icchra,
              <br />
              Near Gourmet Bakers,
              <br />
              Lahore, Punjab
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeLayout;
