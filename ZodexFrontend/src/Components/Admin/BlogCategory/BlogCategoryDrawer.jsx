import { motion } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";
import axiosInstance from "../../../API/instance";
import BlogCategoryForm from "./BlogCategoryForm";

const BlogCategoryDrawer = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  mode,
  refresh,
  setSubmitting,
  submitting,
}) => {
  console.log(formData);
  useEffect(() => {
    if (mode === "add") {
      setFormData({
        image: "",
        title: "",
        description: "",
        category: "",
        colSpan: "",
      });
    }
  }, [mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const url =
      mode === "edit" ? `/blogCategory/${formData._id}` : `/blogCategory`;

    const method = mode === "edit" ? "put" : "post";

    try {
      await axiosInstance({
        method,
        url,
        data: formData,
      });

      alert(mode === "edit" ? "Category updated" : "Category added");
      refresh();
      onClose();
    } catch (error) {
      console.log("Error submitting category:", error);
    } finally {
      setSubmitting(false);
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
          {mode === "edit" ? "Edit" : "Add"} Category
        </h2>
        <a className="text-xl mb-4 cursor-pointer" onClick={onClose}>
          <X className="hover:scale-110" />
        </a>
      </div>
      <BlogCategoryForm
        formData={formData}
        setFormData={setFormData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={onClose}
        mode={mode}
        submitting={submitting}
      />
    </motion.div>
  );
};

export default BlogCategoryDrawer;
