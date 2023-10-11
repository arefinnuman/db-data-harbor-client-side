/* eslint-disable react-hooks/exhaustive-deps */

import logo from "@/assets/logo.gif";
import { removeUser } from "@/redux/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typewriter } from "react-simple-typewriter";
import LoadingScreen from "./LoadingScreen";

const NavbarComponent = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user?.user);

  const fullName = [
    user?.fullName?.firstName,
    user?.fullName?.middleName,
    user?.fullName?.lastName,
  ]
    .filter((namePart) => namePart)
    .join(" ");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setTimeout(() => {
      dispatch(removeUser());
      router.push("/login");
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <section className="bg-gradient-to-r from-blue-200 via-yellow-300 to-pink-200 h-16">
          <div className="navbar bg-gradient-to-r from-blue-200 via-yellow-300 to-pink-200 h-14">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                ></ul>
              </div>
              <Link href="/">
                <Image src={logo} alt="logo" width={200} height={100} />
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <div>
                  <span className="font-bold text-xl text-neutral py-2">
                    <Typewriter
                      words={[
                        "DB Data Harbor",
                        "Digital Banking",
                        "Eastern Bank Plc.",
                      ]}
                      loop={999}
                      cursor
                      cursorStyle="_"
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </span>
                </div>
              </ul>
            </div>
            <div className="navbar-end">
              <div>
                <h1 className="mr-3 text-black">{fullName}</h1>
              </div>
              <button
                onClick={handleLogout}
                className="bg-indigo-400 text-white font-semibold py-1 px-4 rounded-full transform transition-transform duration-200 hover:scale-105 focus:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-60 shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NavbarComponent;
