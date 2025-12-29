import { useEffect, useState } from "react";
import axiosInstance from "../../API/instance";
import RippleButton from "../../Common/Button/AminatedButton";
import Title from "../../Components/Web/Text/title";

const AdminCounters = () => {
  const [form, setForm] = useState({ build: "", identity: "", growth: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAndSetCounter = async () => {
    try {
      const res = await axiosInstance.get(`/get-all-counters`);
      const counters = res.data.data;
      console.log("counters", counters.length);

      if (counters.length > 0) {
        const first = counters[0];
        setForm({
          build: first.build,
          identity: first.identity,
          growth: first.growth,
        });
        setEditingId(first._id.$oid);
      } else {
        setForm({ build: "", identity: "", growth: "" });
        setEditingId(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchAndSetCounter();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (editingId) {
        await axiosInstance.put(`/update-counters/${editingId}`, form);
        alert("Counter updated successfully");
      } else {
        await axiosInstance.post(`/add-counters`, form);
        alert("New counter added successfully");
      }
      fetchAndSetCounter();
      setForm({ build: "", identity: "", growth: "" });
    } catch (error) {
      console.error("Submit error:", error);
      alert("An error occurred. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 ">
      <div className=" p-4 input !bg-transparent !pb-4">
        <form onSubmit={handleSubmit}>
          {[
            { label: "Build:", name: "build" },
            { label: "Identity:", name: "identity" },
            { label: "Growth:", name: "growth" },
          ].map(({ label, name }) => (
            <div key={name} className="mb-4">
              <Title css="mt-2" text={label} />
              <input
                required
                type="text"
                name={name}
                value={form?.[name] || ""}
                onChange={handleChange}
                className="input"
                placeholder={`Enter ${label}`}
              />
            </div>
          ))}

          <RippleButton
            editingId={editingId}
            loading={loading}
            text1="Update Counter"
            text2="Add Counter"
          />
        </form>
      </div>
    </div>
  );
};

export default AdminCounters;
