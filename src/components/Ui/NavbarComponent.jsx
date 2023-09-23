import logo from "@/assets/DB-Data-Harbor.png";
import jwtDecode from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavbarComponent = () => {
  const [user, setUser] = useState(null);

  const getUserFromToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          return decodedToken;
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const user = getUserFromToken();
    setUser(user);
  }, []);

  const navbarItems = (
    <>
      <li>
        <Link href="/ebl-365">Ebl 365</Link>
      </li>
      <li>
        <Link href="/terminals">Terminals</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
    </>
  );
  return (
    <section>
      <div className="navbar">
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
            >
              {navbarItems}
            </ul>
          </div>
          <Link href="/">
            <Image src={logo} alt="logo" width={150} height={100} />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navbarItems}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <button className="btn btn-ghost btn-sm rounded-btn">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="btn btn-ghost btn-sm rounded-btn">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default NavbarComponent;
