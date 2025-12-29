import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaCompress, FaSignOutAlt } from "react-icons/fa";
import { GoScreenFull } from "react-icons/go";
import { useFullscreen } from "../../../hooks/useFullscreen";

const AdminHeader = ({ setSidebar, sidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isFullScreen, toggleFullScreen } = useFullscreen();

  const routeMap = {
    "/admin": "Admin Panel",
    "/admin/products": "Products",
    "/admin/services": "Services",
    "/admin/contact-queries": "Contact Queries",
    "/admin/tech-work": "Tech Work",
    "/admin/blogs": "Blogs",
    "/admin/pricing": "Pricing",
    "/admin/blog-category": "Blog Category",
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin/login");
  };

  const getRouteName = (pathname) => {
    if (routeMap[pathname]) return routeMap[pathname]; // Exact match
    for (const route in routeMap) {
      if (route.includes(":")) {
        const routeRegex = new RegExp(`^${route.replace(":id", "\\d+")}$`); // Match dynamic route
        if (routeRegex.test(pathname)) return routeMap[route];
      }
    }
    return "Edit";
  };

  const routeName = getRouteName(location.pathname);

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/login");
  };
  
  return (
    <header
      className={`flex relative !z-20  items-center justify-between px-4   bg-[#0f1218]   h-[60px]   shadow-md`}
    >
      <div className="flex items-center gap-4">
        <HiOutlineMenuAlt1
          onClick={() => setSidebar(!sidebar)}
          color="#000"
          className={` ${
            sidebar ? "rotate-180" : ""
          } h-9  w-10 border !text-white  rounded-md p-[2px] border-white  cursor-pointer`}
        />
        <label
          className={`lg:text-2xl md:text-2xl !text-[23px]  !text-white font-bold`}
        >
          {routeName}
        </label>
      </div>
      <div className="flex gap-3 items-center">
        <a
          onClick={() => {
            logout();
          }}
          className="group relative flex  !text-white items-center justify- gap-2 mx-3  bg-slate-8  overflow-hidden px-3 py-1.5 text-md  font-medium rounded cursor-pointer transition duration-300 hover:!text-slate-900"
        >
          <span className="z-10">
            <FaSignOutAlt />
          </span>
          <span className="z-10 ">Logout</span>

          <span className="absolute z-0 bottom-0 right-0 left-0 h-full w-full bg-white b -[rgba(0,0,0,0.5)] scale-y-0 group-hover:scale-y-100 origin-left transition-transform duration-500"></span>
        </a>
        {isFullScreen ? (
          <FaCompress
            onClick={toggleFullScreen}
            className="w-10 h-10 sm:w-10 sm:h-10 !text-white rounded-full  cursor-pointer p-1.5 sm:p-[8px]"
          />
        ) : (
          <GoScreenFull
            onClick={toggleFullScreen}
            className="w-10 h-10 sm:w-10 sm:h-10 !text-white rounded-full  cursor-pointer p-1.5 sm:p-[8px]"
          />
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
