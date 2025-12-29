import React, { useRef } from "react";

const SubmitButtonWithRipple = ({ submitting, mode = "add", color }) => {
  const btnRef = useRef(null);

  const createRipple = (event) => {
    const button = btnRef.current;
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

    const existing = button.getElementsByClassName("ripple")[0];
    if (existing) existing.remove();

    button.appendChild(circle);
  };

  return (
    <button
      type="submit"
      disabled={submitting}
      ref={btnRef}
      onClick={createRipple}
      className={`relative overflow-hidden !bg-${color}-600 !border !border-gray-800 hover:!outline-amber-100 !rounded !px-6 !py-2 text-white font-semibold disabled:opacity-60`}
    >
      {submitting
        ? mode === "edit"
          ? "Updating..."
          : "Adding..."
        : mode === "edit"
        ? "Update"
        : "Add"}
    </button>
  );
};

export default SubmitButtonWithRipple;
