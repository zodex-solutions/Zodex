import { useState } from "react";
import Title from "../Text/title";

export default function DownloadButton({ text, icon, title }) {
  const [hover, setHover] = useState(false);

  return (
    <div className={`shiny-container ${hover ? "hover" : ""}`}>
      <div
        className="button-wrapper !px-3 !rounded-lg"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <a
          href="/contact-us"
          className="hover:text-purple-400 !flex items-center flex-row gap-2 "
        >
          {icon}
          <div className="">
            <Title
              text={text}
              css={"!text-[11px] !text-white !poopins-light -mb-1"}
            />
            <Title text={title} css={""} />
          </div>
        </a>
        <div className="mask"></div>
      </div>
    </div>
  );
}
