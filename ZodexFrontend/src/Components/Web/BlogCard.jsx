import config from "../../API/config";
import { formatDistanceToNow } from "date-fns";

export default function BlogCard({ blog }) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-xl hover:shadow-lg  transition-shadow duration-300 backdrop-blur-xs">
      <img
        src={blog?.image}
        alt={blog?.headline}
        className="h-48 w-full object-cover"
      />

      <div className="p-4 border-[0.5px] border-t-0 border-gray-50/15 rounded-b-2xl">
        <div className="flex justify-between text-sm text-gray-200">
          {/* <span>{blog?.author}</span> */}
          <span className="bg-blue-100 text-black px-2 py-[1.5px] rounded-full">
            {blog?.blogCategory?.category}
          </span>
          <span>
            {blog?.createdAt
              ? formatDistanceToNow(new Date(blog.createdAt), {
                  addSuffix: true,
                })
              : ""}
          </span>
        </div>
        <h2 className="mt-2 text-lg font-semibold text-gray-300 truncate">
          {blog?.headline}
        </h2>
        <p className="mt-1 text-gray-400 text-sm line-clamp-3">
          {blog?.content}
        </p>

        {/* <div className="mt-3 flex flex-wrap gap-2"> */}
        {/* <div className="bg-blue-50 text-blue-600 px-2 py-1 text-xs rounded-full">
            {blog?.blogCategory?.category}
          </div> */}
        {/* {blog.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-50 text-blue-600 px-2 py-1 text-xs rounded-full"
            >
              {tag}
            </span>
          ))} */}
        {/* </div> */}
      </div>
    </div>
  );
}
