import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageControls from "../../Components/Admin/Common/AdminPageControls";
import ProductTable from "../../Components/Admin/Products/ProductTable";
import ProductFormDrawer from "../../Components/Admin/Products/ProductFormDrawer";
import axiosInstance from "../../API/instance";
import config from "../../API/config";

const initialForm = {
  title: "",
  image: "",
};

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [mode, setMode] = useState("add");
  const [submitting, setSubmitting] = useState(false);

  console.log(products);
  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      const data = res.data.data.reverse();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setFormData(product);
    setMode("edit");
    setIsDrawerOpen(true);
  };

  const handleSearch = (term) => {
    if (!term.trim()) {
      setFilteredProducts(products);
      return;
    }
    const result = products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(result);
  };

  const handleFilter = (order) => {
    const sorted = [...filteredProducts].sort((a, b) =>
      order === "newer"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
    setFilteredProducts(sorted);
  };

  const openAddForm = () => {
    setMode("add");
    setFormData(initialForm);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Error deleting product. Please try again.");
    }
  };

  return (
    <div className="p-6 text-white">
      <PageControls
        text={"Product"}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onAdd={openAddForm}
      />

      <ProductTable
        data={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductFormDrawer
        isOpen={isDrawerOpen}
        refresh={fetchProducts}
        onClose={() => setIsDrawerOpen(false)}
        formData={formData}
        setFormData={setFormData}
        mode={mode}
        submitting={submitting}
      />
    </div>
  );
};

export default AdminProduct;
