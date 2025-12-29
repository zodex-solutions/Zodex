import { Pencil, Trash2 } from "lucide-react";
import config from "../../../API/config";

const ProductTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full table-auto text-sm border border-gray-800 text-left">
        <thead className="bg-[#0f1218] text-gray-300">
          <tr>
            <th className="px-4 py-2 border border-gray-800">Image</th>
            <th className="px-4 py-2 border border-gray-800">Title</th>
            <th className="px-4 py-2 border border-gray-800 w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((product, index) => (
              <tr key={index} className="hover:bg-[#0f1218e2]">
                <td className="px-4 py-2 border border-gray-800">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-12 w-24 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {product.title}
                </td>
                <td className="px-4 py-2 border border-gray-800 flex gap-4 items-center">
                  <Pencil
                    className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                    size={18}
                    onClick={() => onEdit(product)}
                  />
                  <Trash2
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                    size={18}
                    onClick={() => onDelete(product._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center py-4 text-gray-400 border border-gray-800"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
