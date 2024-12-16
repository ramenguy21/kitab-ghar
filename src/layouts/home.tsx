import { ReactNode, useState } from "react";
import { Link, useRoute } from "wouter";
import Icon from "../components/icon";

interface HomeLayoutProps {
  children: ReactNode;
}

function HomeLayout({ children }: HomeLayoutProps) {
  const [match] = useRoute("/");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    {
      label: "Who We Are",
      page: "/who-we-are",
    },
    { label: "Courses & Workshops", page: "/events" },
    { label: "Shop", page: "/shop" },
    { label: "Join The Movement", page: "/join" },
  ];

  return (
    <div className="h-screen flex flex-col justify-between">
      <header className="bg-brand-black">
        <div className="flex flex-col w-fit m-auto">
          {!match && (
            <Link
              to="/"
              className="text-2xl p-4 text-brand-white text-center underline p-1 hidden md:block"
            >
              (Ghar Chalo)
            </Link>
          )}
        </div>
        <div className="justify-center space-x-4 text-white py-5 hidden md:flex">
          {links.map(({ page, label }) => (
            <Link
              className={`w-fit underline hover:no-underline hover:cursor-pointer p-2`}
              to={page}
            >
              {label}
            </Link>
          ))}
        </div>
        <button
          className="m-4 rounded  text-white md:hidden basis-1/5"
          onClick={() => setSidebarOpen(true)}
        >
          <Icon color="white" name="fa-bars" />
        </button>
      </header>
      <main className="mb-auto flex">
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
                key={label}
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
        <div className="w-full">{children}</div>
      </main>
      <footer className="bg-brand-dark_green p-4 text-white w-full text-center">
        <div className="w-3/4 m-auto">
          <p className=" text-3xl font-bold">Library chalo !</p>
          <div className="my-6">
            <div className="my-1">
              <h2 className="font-bold">KARACHI</h2>
              <a
                className="flex justify-center"
                target="_blank"
                href="https://instagram.com/kitabghar.karachi"
              >
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
          <div className="my-6">
            <div className="my-1">
              <h2 className="font-bold">LAHORE</h2>
              <a
                className="flex justify-center"
                target="_blank"
                href="https://instagram.com/kitabgharlahore"
              >
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
