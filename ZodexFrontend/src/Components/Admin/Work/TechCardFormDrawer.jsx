import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import TechCardForm from "./TechCardForm";
import axiosInstance from "../../../API/instance";

const TechCardFormDrawer = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  mode,
  submitting,
  refresh,
}) => {
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && formData) {
      // setTechInput((formData.techStack || []).join(", "));
    } else {
      setFormData({
        name: "",
        image: "",
        href: "",
        work_type: "",
        cards: [{ title: "", desc: "" }],
      });
      setTechInput("");
    }
  }, [isOpen, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (formData.link && !isValidURL(formData.link)) {
      alert("Please enter a valid URL in the 'Link' field.");
      return;
    }

    const url =
      mode === "edit"
        ? `/update-work/${formData._id?.$oid || formData._id}`
        : `/add-work`;

    const method = mode === "edit" ? "put" : "post";

    try {
      await axiosInstance({
        method,
        url,
        data: { ...formData },
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert(
        mode === "edit" ? "TechCard updated" : "TechCard added successfully"
      );
      refresh();
      onClose();
    } catch (error) {
      console.error("Error submitting TechCard:", error);
      alert("Submission failed. Check console for details.");
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 w-full md:w-1/2 lg:w-1/3 h-full bg-[#0f1218] text-white p-6 shadow-lg z-50 overflow-y-auto"
    >
      <div className="flex pt-16 items-center justify-between">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "edit" ? "Edit" : "Add"} Tech Details
        </h2>
        <a className="text-xl mb-4 cursor-pointer" onClick={onClose}>
          <X className="hover:scale-110" />
        </a>
      </div>

      <TechCardForm
        formData={formData}
        techInput={techInput}
        onChange={handleChange}
        onTechChange={setTechInput}
        onSubmit={handleSubmit}
        onClose={onClose}
        mode={mode}
        submitting={submitting}
        setFormData={setFormData} // ✅ ADD THIS
      />
    </motion.div>
  );
};

export default TechCardFormDrawer;
