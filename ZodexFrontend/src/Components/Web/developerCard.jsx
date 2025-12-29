import React from "react";

const DeveloperCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col items-start gap-4">
      {/* Icon */}
      <div className="text-3xl text-gray-700">{icon}</div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm">{description}</p>

      {/* Button */}
      <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
        Learn more
      </button>
    </div>
  );
};

export default DeveloperCard;
