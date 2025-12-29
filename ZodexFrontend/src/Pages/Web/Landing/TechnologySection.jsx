import React from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";
import { padding } from "../../../Common/tailwindStyles";

const techs = [
  { icon: <SiJavascript />, label: "JavaScript" },
  { icon: <SiTypescript />, label: "TypeScript" },
  { icon: <SiReact />, label: "React.js" },
  { icon: <SiNextdotjs />, label: "Next.js" },
  { icon: <SiAngular />, label: "Angular" },
  { icon: <SiRedux />, label: "Redux" },
  { icon: <SiNodedotjs />, label: "Node.js" },
  { icon: <SiExpress />, label: "Express.js" },
  { icon: <SiMysql />, label: "MySQL" },
  { icon: <SiMongodb />, label: "MongoDB" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
];

const TechnologySection = () => {
  return (
    <section className={`${padding.t} relative overflow-hidden `}>
      <div className="flex lg:gap-4 md:gap-3 gap-3 animate-scroll whitespace-nowrap ">
        {[...techs, ...techs].map((tech, idx) => (
          <div
            key={idx}
            className="flex  border-[0.5px] border-gray-50/15 backdrop-blur-2xl shadow-2xl items-center gap-2 md:px-6 md:py-3 px-3 py-2  bg-backdrop-xl  text-slate-200 rounded-full lg:text-xl md:text-lg sm:text-sm text-xs min-w-max"
          >
            <span className="lg:text-3xl md:text-2xl sm:text-xl text-sm">
              {tech.icon}
            </span>
            <span>{tech.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologySection;
