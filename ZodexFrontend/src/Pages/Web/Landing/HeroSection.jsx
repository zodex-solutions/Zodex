import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import BlurText from "../../../Components/Web/Text/BlurText";
import RotatingText from "../../../Components/Web/Text/RotatingText";
import SubHeading from "../../../Components/Web/Text/subHeading";
import GridDistortion from "../../../Components/Web/AnimationBg/GridDistortion";
import bg from "../../../assets/bg.jpeg";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "../../../Context/ScrollContext";
import RippleGrid from "../../../Components/Web/AnimationBg/RippleGrid";
import Prism from "../../../Components/Web/AnimationBg/prism";
import PrismaticBurst from "../../../Components/Web/AnimationBg/PrismaticBurst";
import { padding } from "../../../Common/tailwindStyles";

const handleAnimationComplete = () => {
  // console.log("Animation completed!");
};

const HomeSection = () => {
  const { setIsAtTop, isAtTop } = useScroll();
  const bottomRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const top = entry.boundingClientRect.top;

          // ✅ Bottom of section touches or crosses top
          if (top <= 0) {
            setIsAtTop(true);
          } else {
            // ✅ When scrolling up again (bottom goes back below top)
            setIsAtTop(false);
          }
        });
      },
      {
        root: null,
        threshold: 0,
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, []);
  console.log(isAtTop);
  return (
    <div
      id="home"
      className={` ${padding.x} relative   lg:h-[105vh] md:h-[90vh] sm:h-[90%] h-[90%]  flex w-full items-center justify-center  overflow-hidden z-20  `}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="  z-10 text-center relative xl:container mx-auto w-full py-20 "
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* <div className=""> */}
          <div className="flex lg:flex-row flex-col mb-6  md: items-center items-left justify-center lg:gap-5">
            <BlurText
              text={`Creative`}
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="lg:!text-[130px] md:!text-[100px] sm:!text-[18vw] !text-[20vw] mt-1  text-slate800 text-blue-100 poppins-extrabold mb !text-center font-bold"
            />

            <RotatingText
              texts={["solutions", "coding", "ideas", "thinking!"]}
              mainClassName=""
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="lg:!text-[70px] md:!text-[60px] !text-[12vw] border-[0.5px] border-gray-50/15 text-blue-50  backdrop-blur-xl shadow-2xl   !text-slate800  rounded-full px-7 py-1  poppins-extrabold text-whit overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
        </motion.h1>

        <TypeAnimation
          sequence={[
            "We are experts in IT Solutions.",
            2000,
            "We build scalable Web Applications.",
            2000,
            "We drive businesses through Technology.",
            2000,
          ]}
          speed={50}
          className="lg:!text-[40px] md:!text-[5vw] !text-[7vw]  py-5   !text-blue-100  block mb-3"
          wrapper="span"
          repeat={Infinity}
        />

        <SubHeading
          css={
            "lg:!max-w-2xl md:!max-w-xl !max-w-xl mx-auto lg:!text-[17px] md:!text-[18px] sm:!text-[17px] !text-[16px]"
          }
          line1={
            " We deliver custom software, cloud, and AI-powered solutions to help businesses grow and adapt in the digital age. From full-stack development to enterprise-grade IT services, our team builds with precision, speed, and security in mind."
          }
        />
      </motion.div>
      {/* <div className="absolute bg-black   !z-0  h-[110vh]  ">
        <RippleGrid
          enableRainbow={false}
          gridColor="#ffffff"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.8}
        />
      </div> */}
      <div className="absolute bg-black !z-0 w-[100vw] lg: h-[110vh]   ">
        {/* <RippleGrid
          enableRainbow={false}
          gridColor="#ffffff"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.8}
        /> */}

        {/* <PrismaticBurst
          animationType="rotate3d"
          intensity={3}
          speed={0.6}
          distort={0}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.25}
          rayCount={5}
          mixBlendMode="lighten"
          // colors={["#000000", "#4d3dff", "#ffffff"]}
        /> */}

        <GridDistortion
          imageSrc={bg}
          // imageSrc="https://picsum.photos/1920/1080"
          grid={8}
          mouse={0}
          strength={0.1}
          relaxation={0.91}
          className="custom-clas lg : h-full w-[180vh]"
        />
      </div>

      {/* Section bottom marker */}
      <div ref={bottomRef} className="h-0  absolute bottom-0 w-full" />
    </div>
  );
};

export default HomeSection;
