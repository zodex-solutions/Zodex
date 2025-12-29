import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

import { HiMiniBars3CenterLeft } from "react-icons/hi2";
// import { wha } from "lucide-react";

import { FaGithub, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

import { useMediaQuery } from "react-responsive";
import Title from "../Text/title";
import { useScroll } from "../../../Context/ScrollContext";

const tabs = [
  { name: "Home", path: "/" },
  { name: "Blogs", path: "/blogs" },
  // { name: "Products", path: "#products" },
  { name: "Reach Us", path: "/reach-us" },
];

export const WebHeader = ({
  sidebar,
  setSidebar,
  setShowHeader,
  showHeader,
}) => {
  const location = useLocation();
  const { isAtTop, setIsAtTop } = useScroll();
  const isDesktop = useMediaQuery({ query: "(min-width: 1340px)" });

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "Home";
  });

  const NavLinks = () => (
    <nav
      className={`lg:flex  hidden backdrop-blur-2xl shadow-2xl bg-black/10 border-[0.5px] border-gray-50/20 rounded-full px-2 py-1.5  items-end gap-1 `}
    >
      {tabs.map((tab) => (
        <a
          key={tab.name}
          onClick={() => {
            goTop();
            setActiveTab(tab.name);
            localStorage.setItem("activeTab", tab.name);
          }}
          href={tab.path}
          className={`px-5 py-[7.5px]  rounded-full text-sm font-medium transition-all duration-300 ${
            activeTab === tab.name
              ? "bg-white/10 text-white shadow-md "
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Title text={tab.name} />
        </a>
      ))}
    </nav>
  );

  const HeaderCompo = ({ Text, search, invertText }) => {
    return (
      <div className="  py-1.5  flex gap-2 items-center justify-between">
        <div className="flex gap-3 items-center cursor-pointer">
          <FaDiscord className="text-white text-3xl   cursor-pointer" />
          <h1 className="!text-2xl font-bold"> zodex</h1>
        </div>

        <div className="flex gap-3 items-center ">
          <NavLinks />
          {icons(
            location.pathname === "/" ? Text : "text-slate-600",
            invertText,
            Text
          )}
          <HiMiniBars3CenterLeft
            size={28}
            className={` ${
              location.pathname === "/" ? Text : "text-red-700"
            } lg:hidden cursor-pointer text-red-700 ${
              !sidebar ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => {
              setShowHeader(true);
              setSidebar(!sidebar);
            }}
          />

          {/* <AnimatedHamburgerButton
            setShowHeader={setShowHeader}
            setSidebar={setSidebar}
          /> */}
        </div>
      </div>
    );
  };

  const icons = (textColor, borderColor, Text) => {
    return (
      <>
        <a
          href="https://wa.me/919511564276"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 bg-green-600/50 cursor-pointer items-center gap-4 backdrop-blur-2xl shadow-2xl bg-black/10 border-[0.5px] border-gray-50/20 rounded-full px-2 py-1.5"
        >
          <FaWhatsapp className="text-white text-3xl" />
        </a>
      </>
    );
  };

  const [delayedWidth, setDelayedWidth] = useState("98%");

  useEffect(() => {
    let timer;
    if (isAtTop) {
      timer = setTimeout(() => {
        setDelayedWidth("50%");
      }, 650); // 20 seconds
    } else {
      setDelayedWidth("50%");
    }

    return () => clearTimeout(timer);
  }, [isAtTop, sidebar]);

  return (
    <>
      {/* Transparent Header */}
      <header
        className={`fixed top-3  px-2 xl:px-0 left-3 right-3 transform  z-50     lg:py-0 py-2   xl:container  mx-auto rounded-full  transition-all duration-700   `}
        style={{
          transform:
            (location.pathname === "/" ? isAtTop : showHeader) || sidebar
              ? "translateY(-20rem)"
              : "translateY(0)",
          transition: "all 0.7s ease-in-out",
        }}
      >
        <HeaderCompo Text={"text-white"} search={"bg-black text-white"} />
      </header>
    </>
  );
};
