import { useState } from "react";

function CoolButton({ children, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`relative bg-gradient-to-r from-yellow-500 to-yellow-300  px-6 py-2 rounded-md shadow-lg hover:scale-105 transition-transform duration-300 transform focus:outline-none hover:-translate-y-1  ${
        hovered ? "ring-2 ring-offset-1 ring-blue-500" : ""
      }`}
    >
      <span
        className="absolute inset-0 z-0 w-full h-full rounded-md shadow-inner"
        style={{
          filter: "blur(5px)",
        }}
      ></span>
      {children}
    </button>
  );
}

export default CoolButton;

