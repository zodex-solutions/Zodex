import { Pencil, Trash2 } from "lucide-react";

const TechCardTable = ({ data, onEdit, onDelete }) => {
  function on(id) {
    console.log(id);
  }
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full table-auto text-sm border border-gray-800 text-left">
        <thead className="bg-[#0f1218] text-gray-300">
          <tr>
            <th className="px-4 py-2 border border-gray-800">Image</th>
            <th className="px-4 py-2 border border-gray-800">Name</th>
            <th className="px-4 py-2 border border-gray-800">Work Type</th>
            <th className="px-4 py-2 border border-gray-800">Link</th>
            <th className="px-4 py-2 border border-gray-800 w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((card, index) => (
              <tr key={index} className="hover:bg-[#0f1218e2]">
                <td className="px-4  border border-gray-800">
                  <img
                    src={card.image}
                    className="h-5 w-12 object-cover rounded"
                    alt="tech"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {card.name}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {card.work_type}
                </td>

                <td className="px-4 py-2 border border-gray-800 text-blue-300">
                  <a href={card.href} target="_blank" rel="noopener noreferrer">
                    Visit
                  </a>
                </td>

                <td className="px-4 py-5   border-b border-gray-800 flex  gap-4 items-center">
                  <Pencil
                    className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                    onClick={() => onEdit(card?.id)}
                    size={18}
                  />
                  <Trash2
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                    onClick={() => onDelete(card?.id)}
                    size={18}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-4 text-gray-400 border border-gray-800"
              >
                No TechCards found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TechCardTable;
