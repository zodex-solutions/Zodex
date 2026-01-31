import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
// import UpperBar from "./upperbar";

// import Prism from "../AnimationBg/prism";
import Footer from "./Footer";
import { WebHeader } from "./WebHeader";
import UpperBar from "./UpperBar";
// import PrismaticBurst from "../AnimationBg/PrismaticBurst";
// import BlogSection from "../../../Pages/Web/Landing/BlogSection";
// import DownloadAppSection from "../../../Pages/Web/Landing/DownloadAppSection";

const UserLayout = () => {
  const [sidebar, setSidebar] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  console.log("showHeader", showHeader);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
        // setSidebar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <section className="h-full w-full bg-[#111]">
      <WebHeader
        sidebar={sidebar}
        setSidebar={setSidebar}
        showHeader={showHeader}
        setShowHeader={setShowHeader}
      />
      <UpperBar sidebar={sidebar} setSidebar={setSidebar} />
      {/* <div className="absolute !bg-red-500 top-0 bottom-0 h-full z-10  right-0 left-0  "> */}
      <main className="h-full -mb-6 smooth-content   w-[100vw] relative z-10 ">
        <Outlet />
        <Footer />
      </main>
      {/* </div> */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-0">
        {/* <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={0.5}
        /> */}
        {/* <PrismaticBurst
          animationType="rotate3d"
          intensity={2}
          speed={0.5}
          distort={1.0}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.25}
          rayCount={24}
          mixBlendMode="lighten"
          colors={["#ff007a", "#4d3dff", "#ffffff"]}
        /> */}
      </div>
    </section>
  );
};

export default UserLayout;
