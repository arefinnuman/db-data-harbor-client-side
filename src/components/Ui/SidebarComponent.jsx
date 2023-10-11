import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaCube, FaHome, FaTasks, FaTerminal, FaWpforms } from "react-icons/fa";

function SidebarComponent() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navbarItems = [
    { href: "/ebl-365", label: "Ebl 365", Icon: FaHome },
    { href: "/terminals", label: "Terminals", Icon: FaTerminal },
    { href: "/booth-acquisition", label: "Booth Acquisition", Icon: FaCube },
    { href: "/booth-management", label: "Booth Management", Icon: FaTasks },
    { href: "/issue-form", label: "Issue Form", Icon: FaWpforms },
  ];

  return (
    <div className="relative">
      <button
        className="lg:hidden p-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      <aside
        className={`bg-white shadow-lg transform top-0 left-0 w-64 min-h-screen fixed lg:relative transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 overflow-y-auto`}
      >
        <ul className="divide-y divide-gray-200">
          {navbarItems.map((item, index) => (
            <li
              key={index}
              className={`hover:bg-blue-500 transition-colors duration-200 ${
                router.pathname === item.href ? "bg-blue-200" : ""
              }`}
            >
              <Link
                href={item.href}
                className="flex items-center gap-4 p-4 text-gray-800 hover:text-white"
              >
                <item.Icon className="h-5 w-5" aria-hidden="true" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default SidebarComponent;
