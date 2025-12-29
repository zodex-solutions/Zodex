import { Pencil, Trash2 } from "lucide-react";
import config from "../../../API/config";

const BlogCategoryTable = ({ data, onEdit, refresh, onDelete }) => {
  console.log(data);
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full table-auto text-sm border border-gray-800 text-left">
        <thead className="bg-[#0f1218] text-gray-300">
          <tr>
            <th className="px-4 py-2 border border-gray-800">Image</th>
            <th className="px-4 py-2 border border-gray-800">Title</th>
            <th className="px-4 py-2 border border-gray-800">
              Short Description
            </th>
            <th className="px-4 py-2 border border-gray-800">Category</th>
            <th className="px-4 py-2 border border-gray-800 w-24">Span</th>
            <th className="px-4 py-2 border border-gray-800 w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((category) => (
              <tr key={category._id?.$oid} className="hover:bg-[#0f1218e2]">
                <td className="px-4 py-2 border border-gray-800">
                  <img src={category.image} className="h-32 " />
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {category.title}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {category.description}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {category.category}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {category.colSpan}
                </td>
                <td className="px-4 py-5 border-b border-gray-800 flex gap-4 items-center">
                  <Pencil
                    className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                    onClick={() => onEdit(category)}
                    size={18}
                  />
                  <Trash2
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                    onClick={() => onDelete(category._id)}
                    size={18}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="2"
                className="text-center py-4 text-gray-400 border border-gray-800"
              >
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogCategoryTable;
