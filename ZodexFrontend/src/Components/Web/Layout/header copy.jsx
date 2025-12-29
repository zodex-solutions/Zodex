import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { HiMiniBars3CenterLeft } from "react-icons/hi2";

import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

import { useMediaQuery } from "react-responsive";
import Title from "../Text/title";

const tabs = [
  { name: "Home", path: "/" },
  { name: "Blogs", path: "/blogs" },
  { name: "Services", path: "#services" },
  { name: "Products", path: "#products" },
  { name: "Contact Us", path: "/contact-us" },
];

export const HeaderCopy = ({
  sidebar,
  setSidebar,
  setShowWhiteHeader,
  showWhiteHeader,
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1340px)" });

  // console.log("isDesktop", isDesktop);
  const location = useLocation();
  // console.log("location", location.pathname);

  useEffect(() => {
    // if (location.pathname !== "/") return;
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowWhiteHeader(true);
      } else {
        setShowWhiteHeader(false);
        setSidebar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const [loc, setLoc] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setLoc(true);
    } else {
      setLoc(false);
    }
  });

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "Home";
  });

  const NavLinks = ({ showmiddle }) => (
    <nav
      className={`lg:flex hidden ${
        showmiddle ? "backdrop-blur-2xl bg-white/10" : ""
      }  shadow-header-borde rounded-2xl px-2 py-1.5  items-center gap-1`}
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
          className={`px-5 py-[7.5px] rounded-full text-sm font-medium transition-all duration-300 ${
            activeTab === tab.name
              ? "bg-white/10 text-white shadow-md"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Title text={tab.name} />
        </a>
      ))}
    </nav>
  );

  const HeaderCompo = ({ Text, search, invertText, showmiddle }) => {
    return (
      <div className="  py-1.5  mx-auto flex gap-2 items-center justify-between">
        <div className="flex gap-5 ">
          {/* <div
            className={` ${loc ? Text : "text-slate-600"} text-xl font-bold`}
          >
            Logo
          </div> */}
          <FaDiscord className="text-white text-3xl   cursor-pointer" />
        </div>
        <NavLinks showmiddle={showmiddle} />

        {/* {NavLinks(`${loc ? Text : "text-slate-600"}`)} */}
        <div className="flex gap-3 items-center">
          {icons(loc ? Text : "text-slate-600", invertText, Text)}
          <HiMiniBars3CenterLeft
            size={28}
            className={` ${
              loc ? Text : "text-red-700"
            } lg:hidden cursor-pointer text-red-700 ${
              !sidebar ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => {
              setShowWhiteHeader(true);
              setSidebar(!sidebar);
            }}
          />

          {/* <AnimatedHamburgerButton
            setShowWhiteHeader={setShowWhiteHeader}
            setSidebar={setSidebar}
          /> */}
        </div>
      </div>
    );
  };

  const icons = (textColor, borderColor, Text) => {
    return (
      <>
        <div className="flex items-center gap-4">
          {/* <FaDiscord className="text-white text-2xl" /> */}
          {/* <FaReddit className="text-white text-2xl" /> */}
          {/* <FaLinkedinIn className="text-white text-2xl" />
          <FaTwitter className="text-white text-2xl" /> */}
          <FaGithub className="text-white text-3xl" />
        </div>
      </>
    );
  };

  const [delayedWidth, setDelayedWidth] = useState("98%");

  useEffect(() => {
    let timer;

    // console.log("Header", showWhiteHeader);
    if (showWhiteHeader) {
      timer = setTimeout(() => {
        setDelayedWidth("50%");
      }, 650); // 20 seconds
    } else {
      setDelayedWidth("98%");
    }

    return () => clearTimeout(timer);
  }, [showWhiteHeader, sidebar]);

  // console.log("isMobile", isMobile);/
  return (
    <>
      {/* Transparent Header */}
      <header
        className={`fixed top-3 left-3 right-3 transform  z-50 px-5    lg:py-0 py-2   xl:containe mx-auto rounded-[15px]  transition-all duration-700  ${
          showWhiteHeader ? "-translate-y20" : "-translatey-0"
        }  ${loc ? "bg-transparen " : ""} `}
        style={{
          transform:
            showWhiteHeader || sidebar ? "translateY(-20rem)" : "translateY(0)",
          transition: "all 0.7s ease-in-out",
        }}
      >
        <HeaderCompo
          Text={"text-white"}
          search={"bg-black text-white"}
          showmiddle={true}
        />
      </header>

      {/* Backdrop Header */}
      <header
        className={`fixed top-3 left-5 right-5 transform z-50 px-5 lg:py-0 py-1.5 xl:containe mx-auto rounded-2xl [15px] transition-all duration-700 bg-black/40 backdrop-blur-3xl shadow-lg border border-gray-50/15`}
        style={{
          transform:
            showWhiteHeader || sidebar ? "translateY(0)" : "translateY(-20rem)",
          // width: isDesktop ? delayedWidth : "",
          transition: "all 0.8s ease-in-out",
        }}
      >
        <HeaderCompo
          Text={"text-white"}
          invertText={"border-gray-500"}
          search={"bg-gray-100/70 text-slate-800"}
        />
      </header>
    </>
  );
};
