import Link from "next/link";
import { useState } from "react";

function SidebarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const navbarItems = (
    <>
      <li className="p-4 border-b border-r-2 border-gray-300 hover:bg-blue-500">
        <Link href="/ebl-365">Ebl 365</Link>
      </li>
      <li className="p-4 border-b border-r-2 border-gray-300 hover:bg-blue-500">
        <Link href="/terminals">Terminals</Link>
      </li>
      <li className="p-4 border-b border-r-2 border-gray-300 hover:bg-blue-500">
        <Link href="/booth-acquisition">Booth Acquisition</Link>
      </li>
      <li className="p-4 border-b border-r-2 border-gray-300 hover:bg-blue-500">
        <Link href="/booth-management">Booth Management</Link>
      </li>
      <li className="p-4 border-b border-r-2 border-gray-300 hover:bg-blue-500">
        <Link href="/issue-form">Issue Form</Link>
      </li>
    </>
  );

  return (
    <div>
      <button className="lg:hidden p-4" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <aside
        className={`transform top-0 left-0 w-64 absolute lg:relative transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <ul>{navbarItems}</ul>
      </aside>
    </div>
  );
}

export default SidebarComponent;
