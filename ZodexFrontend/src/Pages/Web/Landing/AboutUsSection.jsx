import { useEffect, useState } from "react";
import { padding } from "../../../Common/tailwindStyles";

export default function AboutUsSection() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`px10 ${padding.t}  ${padding.x}  relative -mt-8 !z-20   !rounded-t-4xl  bg-gradient-to-b  from-[#000] via-black/70 to-transparent       w-full   text-white overflow-hidden  `}
    >
      <div className="xl:container mx-auto">
        <h1 className="min-w-[00vw] 0 rounded-lg lg:text-[110px] md:text-[100px] text-[10vw]  text-yellow-100 ">
          We craft modern digital experiences that empower businesses worldwide.
        </h1>
      </div>

      {/* <CounterSection /> */}
    </section>
  );
}
