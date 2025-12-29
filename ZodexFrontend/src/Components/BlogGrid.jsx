import { FaTools, FaFileAlt } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import config from "../API/config";

const features = [
  {
    title: "Get Quotes across Carriers",
    description: "Saves 90+ mins per request",
    colSpan: "md:col-span-2",
  },
  {
    title: "Policy Binding",
    description: "Up to 20 mins saved per policy",
  },
  {
    title: "Generate ACORDs, COIs, Proposals",
    description: "Seamless, even in E&S",
  },
  {
    title: "Maintain AMS",
    description: "Upload docs, update policies, offload tasks.",
    icon: <FaTools className="text-xl text-purple-600" />,
  },
  {
    title: "Endorsements",
    description: "Talks to carriers so you don’t have to.",
    icon: <FaFileAlt className="text-xl text-purple-600" />,
  },
  {
    title: "Bulk Renew",
    description: "Automate your whole renewal book",
    icon: <FiRepeat className="text-xl text-purple-600" />,
    colSpan: "md:col-span-2",
  },
];

const BlogGrid = ({ blogCt }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {blogCt.length >= 0 &&
        blogCt?.map((item, idx) => (
          <a
            href={`/blogs?category=${item?.category
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            key={idx}
            className={`relative  rounded-2xl hover:scale-[102%] transition-all duration-500  p-6 h-60 backdrop-blur-2xl shadow-2xl bg-black/10 border-[0.5px] cursor-pointer border-gray-50/20 hover:shadow-md  flex flex-col gap-2 ${
              item.colSpan || ""
            }`}
            style={{
              backgroundImage: `url(${item.image})`, // ✅ Add image dynamically
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>

            <div className="relative z-10 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-gray-200">{item.description}</p>
            </div>
          </a>
        ))}
    </div>
  );
};

export default BlogGrid;
