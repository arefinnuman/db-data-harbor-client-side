import { useState } from "react";

function PrimaryOutlineButton({ children, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`relative bg-transparent border border-yellow-500 text-yellow-500 px-6 py-2 rounded-md hover:border-blue-500 hover:text-blue-500 shadow-lg hover:scale-105 transition-transform duration-300 transform focus:outline-none hover:-translate-y-1 ${
        hovered ? "ring-2 ring-offset-1 ring-blue-500" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default PrimaryOutlineButton;

