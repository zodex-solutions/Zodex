import { motion } from "framer-motion";
import PricingForm from "./PricingForm";
import { X } from "lucide-react";

const AddEditDrawer = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  mode,
}) => {
  console.log("onSubmit", onSubmit);
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 w-full md:w-1/2 lg:w-1/3 h-full bg-[#0f1218] text-white p-6 shadow-lg z-50 overflow-y-auto"
    >
      <div className="flex pt-16 items-center justify-between">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "edit" ? "Edit" : "Add"} Pricing Plan
        </h2>
        <a className="text-xl mb-4 cursor-pointer " onClick={onClose}>
          <X className="hover:scale-110" />
        </a>
      </div>

      <PricingForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </motion.div>
  );
};

export default AddEditDrawer;
