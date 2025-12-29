import React, { useEffect, useState } from "react";
import axiosInstance from "../../API/instance";
import { Trash } from "lucide-react";

const ContactQueries = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/contact");
      setContacts(res?.data?.data || []);
    } catch (err) {
      console.log("Failed to fetch contact queries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ✅ Delete contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      await axiosInstance.delete(`/contact/${id}`);
      fetchContacts(); // refresh list
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  return (
    <div className="text-white p-6">
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm border border-gray-800">
          <thead className="bg-[#0f1218] text-gray-300">
            <tr>
              <th className="px-4 py-2 border border-gray-800">S.No</th>
              <th className="px-4 py-2 border border-gray-800">First Name</th>
              <th className="px-4 py-2 border border-gray-800">Last Name</th>
              <th className="px-4 py-2 border border-gray-800">Email</th>
              <th className="px-4 py-2 border border-gray-800">Phone</th>
              <th className="px-4 py-2 border border-gray-800">Message</th>
              <th className="px-4 py-2 border border-gray-800">Date</th>
              <th className="px-4 py-2 border border-gray-800">Action</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id} className="hover:bg-[#0f1218e2]">
                <td className="px-4 py-2 border border-gray-800">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {contact.firstName}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {contact.lastName}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {contact.email}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {contact.phone || "-"}
                </td>
                <td className="px-4 py-2 border border-gray-800 max-w-xs truncate">
                  {contact.message}
                </td>
                <td className="px-4 py-2 border border-gray-800">
                  {new Date(contact.createdAt).toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-2 border border-gray-800 text-center">
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}

            {!loading && contacts.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-400">
                  No contact queries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {loading && (
          <p className="text-center mt-4 text-gray-400">Loading contacts...</p>
        )}
      </div>
    </div>
  );
};

export default ContactQueries;
