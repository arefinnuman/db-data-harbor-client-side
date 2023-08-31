import { useState } from "react";

function SecondaryOutlineButton({ children, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`relative bg-transparent border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:border-yellow-500 hover:text-yellow-500 shadow-lg hover:scale-105 transition-transform duration-300 transform focus:outline-none hover:-translate-y-1 text-sm ${
        hovered ? "ring-2 ring-offset-1 ring-yellow-500" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default SecondaryOutlineButton;

