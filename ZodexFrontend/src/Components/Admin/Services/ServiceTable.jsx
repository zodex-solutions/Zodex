import { Pencil, Trash2 } from "lucide-react";

const ServiceTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-6 ">
      <table className="w-full table-auto text-sm border border-gray-800 text-left">
        <thead className="bg-[#0f1218] text-gray-300">
          <tr>
            <th className="px-4 py-2 border border-gray-800">SNo.</th>
            <th className="px-4 py-2 border border-gray-800">Icon</th>
            <th className="px-4 py-2 border border-gray-800">Title</th>
            <th className="px-4 py-2 border border-gray-800">Description</th>
            <th className="px-4 py-2 border w-28 border-gray-800">
              Box Height
            </th>

            <th className="px-4 py-2 border border-gray-800 w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((service, index) => (
              <tr key={service._id?.$oid} className="hover:bg-[#0f1218e2]">
                <td className="px-4 py-2 border border-gray-800">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {service.icon}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {service.title}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {service.description}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {service?.height}
                </td>

                <td className="px-4 py-5 border-b border-gray-800 flex gap-4 items-center">
                  <Pencil
                    className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                    size={18}
                    onClick={() => onEdit(service)}
                  />
                  <Trash2
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                    size={18}
                    onClick={() => onDelete(service._id?.$oid)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-4 text-gray-400 border border-gray-800"
              >
                No Services found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
