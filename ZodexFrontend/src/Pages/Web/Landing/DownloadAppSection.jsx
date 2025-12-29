import { motion, useScroll, useTransform } from "framer-motion";
import appImage1 from "../../../assets/iphone_2.png";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import Title from "../../../Components/Web/Text/title";
import DownloadButton from "../../../Components/Web/Button/DownloadButton";
import { padding } from "../../../Common/tailwindStyles";

const DownloadAppSection = () => {
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [450, -20]);

  return (
    <section className={`rounded-2xl ${padding.t} lg:pb-16 w-full`}>
      <section
        id="download"
        className="lg:backdrop-blur-2xl lg:!max-w-[70vw] mx-auto lg:shadow-2xl bg-black/10 lg:border-[0.5px] lg:border-gray-50/15  relative overflow-hidden  lg:max-h-[320px] md:max-h-[320px]   lg:bg-gradient-tor     from-[#10101047]  to-[#0101015c]  lg:rounded-2xl  w-full"
      >
        <div className=" lg:stick  top-0 z-0 relative   overflow-hidden">
          <div className="max-w-7xl mx-auto   lg:flex-row md:flex-row  flex  flex-col  grid-cols-1 lg:grid-cols-2  lg:gap-16 md:gap-16 md:px-10 px-5">
            {/* Left Side */}

            <motion.div
              // style={{ y: translateY }}
              className="  place-content-cente w-full flex flex-1 overflow-hidden"
            >
              <img
                src={appImage1}
                alt="App Preview"
                className="w-full mt-12 z-20 lg:max-w-[20vw] md:max-w-[30vw] sm:!max-w-[270px] max-w-[270px] mx-auto  lg:mx-0 drop-shadow-2xl transform scale-x-[-1]"
              />
            </motion.div>

            {/* Right Side  */}
            <div className="text-white  text-center lg:py-8 md:py-8 pb-10  lg:text-left md:text-left w-full flex flex-col flex-1/4">
              <h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="text-3xl mt-5  md:text-3xl font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-black/50  to-black"
              >
                <Title
                  type="heading"
                  text={`Download Our\nMusic App`}
                  css="lg:mb-1 !text-4xl md:!flex !hidden poppins-semibold capitalize whitespace-pre-line"
                />

                <div className="flex place-content-center p">
                  <Title
                    type={"heading"}
                    text={`Download Our Music App`}
                    css={
                      "lg:mb-1 !text-4xl md:!hidden flex !text-center w-full bg-red-600 !flex poppins-semibold  capitalise"
                    }
                  />
                </div>
              </h2>

              <p
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="mb-5 max-w-xl mx-auto mt-3 lg:mx-0"
              >
                <Title
                  text={
                    "Discover the ultimate music experience with Download Music, your all-in-one solution for streaming and downloading your favorite songs, albums, and playlists — completely free and offline!"
                  }
                  css={" lg:mb-1 !text  poppins-light capitalise"}
                />
              </p>

              <div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="flex flex-wrap items-center justify-center lg:justify-start md:justify-start gap-4"
              >
                <DownloadButton
                  text={"Get it on"}
                  title={"App Store"}
                  icon={<FaGooglePlay className="animate-pulse !text-2xl" />}
                />
                <DownloadButton
                  text={"Download on the"}
                  title={"GooglePlay"}
                  icon={<FaApple className="animate-pulse !text-2xl" />}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default DownloadAppSection;
