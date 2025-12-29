import { Pencil, Trash2 } from "lucide-react";
import config from "../../../API/config";

const BlogTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full table-auto text-sm border border-gray-800 text-left">
        <thead className="bg-[#0f1218] text-gray-300">
          <tr>
            <th className="px-4 py-2 border border-gray-800">Image</th>
            <th className="px-4 py-2 border border-gray-800">Slug</th>
            <th className="px-4 py-2 border border-gray-800">SEO Title</th>
            <th className="px-4 py-2 border border-gray-800">
              Meta Description
            </th>
            <th className="px-4 py-2 border border-gray-800">Keywords</th>
            <th className="px-4 py-2 border border-gray-800">Category</th>
            <th className="px-4 py-2 border border-gray-800">Headline</th>
            <th className="px-4 py-2 border border-gray-800">Content</th>
            <th className="px-4 py-2 border border-gray-800 w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((blog) => (
              <tr key={blog._id} className="hover:bg-[#0f1218e2]">
                <td className="px-4 py-2 border border-gray-800">
                  <img
                    src={blog.image}
                    alt="blog"
                    className="h-8 w-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {blog.slug}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {blog.meta_title}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {blog.metaDescription?.slice(0, 50)}...
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {blog.metaKeywords?.join(", ")}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {blog.blogCategory?.category || "N/A"}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {blog.headline}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {blog.content?.slice(0, 50)}...
                </td>
                <td className="px-4 py-5 border-b border-gray-800 flex gap-4 items-center">
                  <Pencil
                    className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                    size={18}
                    onClick={() => onEdit(blog)}
                  />
                  <Trash2
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                    size={18}
                    onClick={() => onDelete(blog?._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="9"
                className="text-center py-4 text-gray-400 border border-gray-800"
              >
                No blogs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
