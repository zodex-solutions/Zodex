import React, { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import HomeSection from "./HeroSection";
import AboutUsSection from "./AboutUsSection";

const TechnologySection = lazy(() => import("./TechnologySection"));
const ProductSection = lazy(() => import("./ProductsSection"));
const BlogSection = lazy(() => import("./BlogSection"));
const DownloadAppSection = lazy(() => import("./DownloadAppSection"));

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const LandingPage = () => {
  const main = useRef();
  const smoother = useRef();

  const scrollTo = () => {
    smoother.current.scrollTo(".box-c", true, "center center");
  };

  // useGSAP(
  //   () => {
  //     smoother.current = ScrollSmoother.create({
  //       smooth: 2,
  //       effects: true,
  //       smoothTouch: 3,
  //     });
  //     ScrollTrigger.create({
  //       trigger: ".box-c",
  //       pin: true,
  //       start: "center center",
  //       end: "+=300",
  //       // markers: true,
  //     });
  //   },
  //   { scope: main }
  // );

  return (
    <section className="">
      <HomeSection />
      <AboutUsSection />
      <TechnologySection />
      <ProductSection />
      <div className="bg-gradient-to-b  backdrop-blu-md from-black via-black/50 to-black/40">
        <BlogSection />
        <DownloadAppSection />
      </div>
    </section>
  );
};

export default LandingPage;
