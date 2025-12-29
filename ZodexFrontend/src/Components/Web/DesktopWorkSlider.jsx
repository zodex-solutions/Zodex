import React from "react";
import mac from "../../assets/mac.png"; // your phone image
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DesktopWorkSlider = ({ image, title, fade }) => {
  return (
    <div className="relative w-full flex justify-center min-w-full max-h-[100vw mx-auto">
      {/* Mac Frame */}
      <img
        loading="lazy"
        src={mac}
        alt="Mac Frame"
        className="min-w-full lg:max-h-[50vw] w-[200vw max-h-[100vw] w-full xl:max-h-[50vw] relative z-10 object-pointer-events-none overflow-hidden"
      />

      {/* Background overlay */}
      <div className="absolute z-0 inset-0 bg-white xl:top-11 rounded-t-[2%] lg:top-[8%] top-[8%] md:top-[8%] lg:bottom-[8%] md:bottom-10 bottom-8 xl:left-[10%] xl:right-[10%] lg:left-[9%] lg:right-[9%] md:left-[9%] md:right-[9%] left-[9%] right-[9%] overflow-hidden" />

      {/* Product image */}
      <div
        className={`absolute inset-0 xl:top-11 rounded-t-[2%] lg:top-[8%] top-[8%] md:top-[8%] lg:bottom-[8%] md:bottom-10 bottom-8 xl:left-[10%] xl:right-[10%] lg:left-[9%] lg:right-[9%] md:left-[9%] md:right-[9%] left-[9%] right-[9%] transition-opacity duration-700 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default DesktopWorkSlider;
