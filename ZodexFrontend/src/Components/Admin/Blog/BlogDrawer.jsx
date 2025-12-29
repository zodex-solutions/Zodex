// BlogDrawer.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosInstance from "../../../API/instance";
import BlogForm from "./BlogForm";

const BlogDrawer = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  mode,
  refresh,
  setSubmitting,
  submitting,
  initialForm,
}) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get(`/blogCategory`);
      setCategories(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (mode === "add") {
      setFormData(initialForm);
    }
    fetchCategories();
  }, [mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async () => {
  //   setSubmitting(true);
  //   try {
  //     const url = mode === "edit" ? `/blogs/${formData?._id}` : `/blogs`;
  //     const method = mode === "edit" ? "put" : "post";

  //     await axiosInstance({ method, url, data: formData });
  //     alert(mode === "edit" ? "Blog updated" : "Blog added");
  //     refresh();
  //     onClose();
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  console.log(formData);
  const handleSubmit = async () => {
    setSubmitting(true);
    const url = mode === "edit" ? `/blogs/${formData._id}` : `/blogs`;
    const method = mode === "edit" ? "put" : "post";

    try {
      await axiosInstance({
        method,
        url,
        data: formData,
      });

      alert(mode === "edit" ? "Blog updated" : "Blog added");
      refresh();
      onClose();
    } catch (error) {
      console.log("Error submitting Blog:", error);
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
      <div className="flex justify-between items-center mb-4 pt-16">
        <h2 className="text-xl font-semibold">
          {mode === "edit" ? "Edit" : "Add"} Blog
        </h2>
        <X className="cursor-pointer" onClick={onClose} />
      </div>

      <BlogForm
        formData={formData}
        setFormData={setFormData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={onClose}
        mode={mode}
        submitting={submitting}
        categories={categories}
      />
    </motion.div>
  );
};

export default BlogDrawer;
