import React, { useRef } from "react";

const RippleButton = ({
  text1 = "Click Me",
  onClick,
  editingId,
  loading,
  text2 = "Click Me",
}) => {
  const buttonRef = useRef(null);

  const createRipple = (event) => {
    const button = buttonRef.current;
    const circle = document.createElement("span");

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      event.clientX - button.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      event.clientY - button.getBoundingClientRect().top - radius
    }px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <button
      ref={buttonRef}
      disabled={loading}
      onClick={(e) => {
        createRipple(e);
        onClick && onClick(e);
      }}
      className="relative w-full !outline-none !border-none !bg-[#1a1d24] hover:border-none !rounded overflow-hidden px-6 py-3  text-white font-semibold  shadow-md transition duration-300"
    >
      {editingId ? text1 : text2}
    </button>
  );
};

export default RippleButton;
