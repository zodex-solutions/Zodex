import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosInstance from "../../../API/instance";
import ImageUpload from "../Common/ImageUpload";

const ProductFormDrawer = ({
  isOpen,
  onClose,
  refresh,
  formData,
  setFormData,
  mode,
}) => {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (mode === "edit" && formData) return;
    setFormData({ title: "", image: "" });
  }, [isOpen, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const url = mode === "edit" ? `/products/${formData._id}` : "/products";
      const method = mode === "edit" ? "put" : "post";

      await axiosInstance({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "application/json" },
      });

      alert(mode === "edit" ? "Product updated" : "Product added successfully");
      refresh();
      onClose();
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Submission failed. Check console.");
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
          {mode === "edit" ? "Edit" : "Add"} Product
        </h2>
        <button className="text-xl mb-4 cursor-pointer" onClick={onClose}>
          <X className="hover:scale-110" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <label className="block mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 rounded text-white"
        />

        <label className="block mb-1">Image</label>
        <ImageUpload
          imageUrl={formData.image}
          setImageUrl={(url) =>
            setFormData((prev) => ({ ...prev, image: url }))
          }
        />

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          {mode === "edit" ? "Update Product" : "Add Product"}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductFormDrawer;
