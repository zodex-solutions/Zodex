import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import {
  FaEnvelopeOpenText,
  FaLaptopCode,
  FaTags,
  FaBloggerB,
  FaServicestack,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const adminSidebarMenuItems = [
  {
    id: "admin-dashbord",
    label: "Dashboard",
    path: "/admin",
    icon: <MdDashboard />,
  },
  // {
  //   id: "services",
  //   label: "Services",
  //   path: "/admin/services",
  //   icon: <FaServicestack />,
  // },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <FaLaptopCode />,
  },
  // {
  //   id: "pricing",
  //   label: "Pricing",
  //   path: "/admin/pricing",
  //   icon: <FaMoneyBillWave />,
  // },
  {
    id: "blog-category",
    label: "Blog Category",
    path: "/admin/blog-category",
    icon: <FaTags />,
  },
  {
    id: "blogs",
    label: "Blogs",
    path: "/admin/blogs",
    icon: <FaBloggerB />,
  },
  {
    id: "contact-queries",
    label: "Contact Queries",
    path: "/admin/contact-queries",
    icon: <FaEnvelopeOpenText />,
  },
];

const handleLogout = () => {
  localStorage.removeItem("isAuthenticated");
  navigate("/admin/login");
};

function MenuItems({ setSidebar, handleClose }) {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col  pt-5   h-screen ">
      {adminSidebarMenuItems.map((menuItem) => (
        <a
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            handleClose();
          }}
          className="group relative flex items-center justify- gap-5 mx-3 overflow-hidden px-3 py-2 text-md mb-3 font-medium rounded cursor-pointer transition duration-300 hover:bg-white hover:text-slate-900"
        >
          <span className="absolute left-0 top-0 h-full w-1 bg-[#3D5EE1] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"></span>

          <span>{menuItem.icon}</span>
          <span>{menuItem.label}</span>
        </a>
      ))}
    </nav>
  );
}

const Sidebar = ({ setSidebar, sidebar }) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const islargeScreen = useMediaQuery({ query: "(max-width: 1023px)" });

  function handleClose() {
    {
      isSmallScreen
        ? setSidebar(false)
        : islargeScreen
        ? setSidebar(true)
        : null;
    }
  }
  useEffect(() => {
    {
      isSmallScreen
        ? setSidebar(false)
        : islargeScreen
        ? setSidebar(true)
        : null;
    }
  }, [isSmallScreen, islargeScreen]);

  return (
    <div
      className={` h-full !z-0 w-60 overflow-y-auto scrollbar-hide bg-[#0f1218] text-white top-[60px]  fixed duration-500 transition-all  
      ${sidebar ? "" : "-translate-x-60"}`}
    >
      <aside className="flex flex-col bg-transparent w-full scrollbar-hide overflow-y-scroll ">
        <div className=" overflow-y-scroll scrollbar-hide  h-full pb-20  shadow-2x border-r border-gray-50/5">
          <MenuItems setSidebar={setSidebar} handleClose={handleClose} />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
