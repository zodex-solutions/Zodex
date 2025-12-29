import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ServiceForm from "./ServiceForm";
import { X } from "lucide-react";
import axiosInstance from "../../../API/instance";

const ServiceDrawer = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  mode,
  refresh,
  setSubmitting,
  submitting,
}) => {
  useEffect(() => {
    if (mode === "add") {
      setFormData({
        icon: "",
        title: "",
        description: "",
      });
    }
  }, [mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const url =
        mode === "edit"
          ? `/update-Service/${formData._id.$oid}`
          : `/add-service`;
      const method = mode === "edit" ? "put" : "post";

      await axiosInstance({ method, url, data: formData });
      alert(mode === "edit" ? "Service Updated" : "Service Added");
      refresh();
      onClose(); // 🔁 This will now work
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 w-full md:w-1/2  lg:w-1/3  h-full bg-[#0f1218] text-white p-6 shadow-lg z-50 overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-4 pt-16">
        <h2 className="text-xl font-semibold">
          {mode === "edit" ? "Edit" : "Add"} Service
        </h2>
        <X className="cursor-pointer" onClick={onClose} />
      </div>
      <ServiceForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={onClose}
        mode={mode}
        submitting={submitting}
      />
    </motion.div>
  );
};

export default ServiceDrawer;
