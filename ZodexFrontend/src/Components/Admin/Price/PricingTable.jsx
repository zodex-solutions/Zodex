import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const PricingTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full table-auto text-sm border border-gray-800 text-left">
        <thead className="bg-[#0f1218] text-gray-300">
          <tr>
            <th className="px-4 py-2 border border-gray-800">Title</th>
            <th className="px-4 py-2 border border-gray-800">Price</th>
            <th className="px-4 py-2 border border-gray-800">Monthly</th>
            <th className="px-4 py-2 border border-gray-800">Discount</th>
            <th className="px-4 py-2 border border-gray-800 w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((plan) => (
              <tr key={plan._id.$oid} className="hover:bg-[#0f1218e2]">
                <td className="px-4 py-2 border border-gray-800">
                  {plan.title}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {plan.price}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {plan.monthly ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {plan.discount || "-"}
                </td>
                <td className="px-4 py-3 border-b border-gray-800 flex gap-4 items-center">
                  <Pencil
                    className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                    size={18}
                    onClick={() => onEdit(plan)}
                  />
                  <Trash2
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                    size={18}
                    onClick={() => onDelete(plan._id.$oid)}
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
                No pricing plans found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;
