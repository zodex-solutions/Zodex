import { HiXMark } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";

const UpperBar = ({ sidebar, setSidebar }) => {
  const location = useLocation();

  return (
    <>
      {/* Backdrop */}
      {sidebar && (
        <div
          onClick={() => setSidebar(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Top Slide Menu */}
      <div
        className={`
          fixed top-0 left-0 w-full z-50 lg:hidden
          bg-black/20 backdrop-blur-2xl text-white
          transform transition-transform duration-500 ease-in-out
          ${sidebar ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Menu</h2>
          <HiXMark
            size={26}
            className="cursor-pointer"
            onClick={() => setSidebar(false)}
          />
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-6 px-6 py-8 text-lg">
          <Link
            to="/"
            onClick={() => setSidebar(false)}
            className={`${
              location.pathname === "/" ? "text-red-500" : "text-white"
            } hover:text-red-500 transition`}
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setSidebar(false)}
            className={`${
              location.pathname === "/about" ? "text-red-500" : "text-white"
            } hover:text-red-500 transition`}
          >
            About
          </Link>

          <Link
            to="/services"
            onClick={() => setSidebar(false)}
            className={`${
              location.pathname === "/services" ? "text-red-500" : "text-white"
            } hover:text-red-500 transition`}
          >
            Services
          </Link>

          <Link
            to="/contact"
            onClick={() => setSidebar(false)}
            className={`${
              location.pathname === "/contact" ? "text-red-500" : "text-white"
            } hover:text-red-500 transition`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
};

export default UpperBar;
