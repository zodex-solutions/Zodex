import { useEffect, useState } from "react";

import axiosInstance from "../../API/instance";
import PageControls from "../../Components/Admin/Common/AdminPageControls";
import BlogCategoryTable from "../../Components/Admin/BlogCategory/BlogCategoryTable";
import BlogCategoryDrawer from "../../Components/Admin/BlogCategory/BlogCategoryDrawer";

const initialForm = {
  image: "",
  title: "",
  description: "",
  category: "",
  colSpan: "",
};

const AdminBlogCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [mode, setMode] = useState("add");
  const [submitting, setSubmitting] = useState(false);

  console.log(formData);
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get(`/blogCategory`);
      const data = res.data.data.reverse();
      setCategories(data);
      setFilteredCategories(data);
    } catch (err) {
      console.log("Failed to fetch categories", err);
      alert("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (item) => {
    setFormData(item);
    setMode("edit");
    setIsDrawerOpen(true);
  };

  const handleSearch = (term) => {
    const result = categories.filter((cat) =>
      cat.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCategories(result);
  };

  const handleFilter = (order) => {
    const sorted = [...filteredCards].sort((a, b) =>
      order === "newer"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
    setFilteredCards(sorted);
  };

  const openAddForm = () => {
    setMode("add");
    setFormData(initialForm);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/blogCategory/${id}`);
      alert("Category deleted successfully");
      fetchCategories();
    } catch (err) {
      console.log(err);
      alert("Error deleting category");
    }
  };

  return (
    <div className="p-6  text-white">
      <PageControls
        text={"Category"}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onAdd={openAddForm}
      />

      <BlogCategoryTable
        data={categories}
        refresh={fetchCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BlogCategoryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        formData={formData}
        setFormData={setFormData}
        mode={mode}
        setSubmitting={setSubmitting}
        submitting={submitting}
        refresh={fetchCategories}
      />
    </div>
  );
};

export default AdminBlogCategory;
