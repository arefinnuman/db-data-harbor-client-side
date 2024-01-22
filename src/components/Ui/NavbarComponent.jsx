/* eslint-disable react-hooks/exhaustive-deps */
import logo from "@/assets/logo.gif";
import { removeUser } from "@/redux/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaCube, FaHome, FaTasks, FaTerminal, FaWpforms } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Typewriter } from "react-simple-typewriter";
import LogoutScreen from "./LogoutScreen";

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

  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      dispatch(removeUser());
      localStorage.removeItem("token");
      router.push("/login");
      setIsLoggingOut(false);
    }, 1000);
  };

  if (isLoggingOut) {
    return <LogoutScreen />;
  }

  const navbarItems = [
    { href: "/ebl-365", label: "Ebl 365", Icon: FaHome },
    { href: "/terminals", label: "Terminals", Icon: FaTerminal },
    { href: "/booth-acquisition", label: "Booth Acquisition", Icon: FaCube },
    { href: "/booth-management", label: "Booth Management", Icon: FaTasks },
    { href: "/issue-form", label: "Issue Form", Icon: FaWpforms },
    { href: "/asset-book-value", label: "Asset Book Value", Icon: FaWpforms },
  ];

  return (
    <div>
      <section>
        <div className="navbar bg-blue-200 h-14">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
                onClick={toggleDropdown}
              >
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
              </div>
              <ul
                tabIndex="0"
                className={`menu  dropdown-content mt-2 z-10 shadow-lg rounded-md w-60 ${
                  isOpen ? "block" : "hidden"
                } bg-white text-gray-700`}
              >
                {navbarItems.map((item, index) => (
                  <li
                    key={index}
                    className="hover:bg-gray-100 p-1 rounded-md transition duration-200 ease-in-out"
                    onClick={handleMenuItemClick}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-start text-md hover:bg-blue-200 pl-4 w-full"
                    >
                      <item.Icon className="mr-2" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/">
              <Image src={logo} alt="logo" width={200} height={100} />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <div>
                <span className="font-bold text-sm text-neutral py-2">
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
              <h1 className="mr-5 hidden md:block font-black">{fullName}</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-yellow-200 text-black font-semibold py-1 px-4 rounded-full transform transition-transform duration-200 hover:scale-105 focus:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-60 shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NavbarComponent;
