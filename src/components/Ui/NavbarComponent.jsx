import logo from "@/assets/logo.gif";
import Image from "next/image";
import Link from "next/link";
import SecondaryOutlineButton from "../Buttons/SecondaryOutlineButton";

const NavbarComponent = () => {
  const navbarItems = (
    <>
      <li>
        <Link href="/terminals">Terminals</Link>
      </li>
      <li>
        <Link href="/add-books">About Us</Link>
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
            {" "}
            <Image src={logo} alt="logo" width={250} height={250} />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navbarItems}</ul>
        </div>
        <div className="navbar-end">
          <SecondaryOutlineButton>Login</SecondaryOutlineButton>
        </div>
      </div>
    </section>
  );
};

export default NavbarComponent;

