import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./Header";

function AdminLayout() {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className="flex w-full h-screen ">
      <div className="fixed top-0 w-full right-0 z-10">
        <AdminHeader setSidebar={setSidebar} sidebar={sidebar} />
      </div>
      <div className="z-30">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      </div>
      <main
        className={`flex  bg-[#090b0f]  flex-1 flex-col   top-[60px]  absolute right-0 bottom-0  z-0 duration-500 overflow-auto ${
          sidebar ? "lg:left-60 left-0" : "!left-0"
        }`}
      >
        <div className="">
          <Outlet />
        </div>
      </main>

      {sidebar ? (
        <div
          onClick={() => setSidebar(false)}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className="lg:hidden md:flex flex w-full h-[100%] fixed right-0 top-0 bottom-0 duration-500 transition-all"
        />
      ) : null}
    </div>
  );
}

export default AdminLayout;
