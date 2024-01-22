import Link from "next/link";
import { FaCube, FaHome, FaTasks, FaTerminal, FaWpforms } from "react-icons/fa";

function SidebarComponent() {
  const navbarItems = [
    { href: "/ebl-365", label: "Ebl 365", Icon: FaHome },
    { href: "/terminals", label: "Terminals", Icon: FaTerminal },
    { href: "/booth-acquisition", label: "Booth Acquisition", Icon: FaCube },
    { href: "/booth-management", label: "Booth Management", Icon: FaTasks },
    { href: "/issue-form", label: "Issue Form", Icon: FaWpforms },
    { href: "/asset-book-value", label: "Asset Book Value", Icon: FaWpforms },
  ];

  return (
    <div className="hidden md:flex md:w-64 lg:w-72  bg-gray-200 text-gray-800 flex-col">
      <ul className="flex flex-col py-4">
        {navbarItems.map((item, index) => (
          <li
            key={index}
            className="flex flex-row items-center h-12 hover:bg-blue-200 transition-transform ease-in "
          >
            <Link
              href={item.href}
              className="flex items-center justify-start text-md pl-4 w-full"
            >
              <item.Icon className="w-6 h-6 text-blue-500" />
              <span className="ml-2">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarComponent;
