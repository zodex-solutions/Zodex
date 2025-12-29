import { useEffect, useState } from "react";
import axiosInstance from "../../API/instance";
import PageControls from "../../Components/Admin/Common/AdminPageControls";
import BlogTable from "../../Components/Admin/Blog/BlogTable";
import BlogDrawer from "../../Components/Admin/Blog/BlogDrawer";

const initialForm = {
  slug: "",
  meta_title: "",
  metaDescription: "",
  metaKeywords: "", // enter comma-separated, will split before saving
  blogCategory: "",
  headline: "",
  image: "",
  content: "",
};

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [mode, setMode] = useState("add");
  const [filtered, setFiltered] = useState([]);
  const [searchUsed, setSearchUsed] = useState(false); // to detect if search/filter is active
  const [submitting, setSubmitting] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await axiosInstance.get(`/blogs`);
      const fetchedBlogs = res.data.data || [];
      console.log(fetchedBlogs);
      setBlogs(fetchedBlogs);
      setFiltered(fetchedBlogs); // default: show all
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setMode("edit");
    setFormData(blog);
    setDrawerOpen(true);
  };

  const handleSearch = (term) => {
    setSearchUsed(true);
    if (!term) {
      setFiltered(blogs);
      return;
    }

    const result = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(term.toLowerCase())
    );
    setFiltered(result);
  };

  const handleFilter = (order) => {
    const toSort = [...filtered];
    const sorted = toSort.sort((a, b) =>
      order === "newer"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
    setFiltered(sorted);
  };

  const openAddForm = () => {
    setMode("add");
    setFormData(initialForm);
    setDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/blogs/${id}`);
      alert("Blog deleted successfully");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Error deleting Blog");
    }
  };

  return (
    <div className="p-6">
      <PageControls
        text={"Blog"}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onAdd={openAddForm}
      />

      <BlogTable
        data={searchUsed ? filtered : blogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        refresh={fetchBlogs}
      />

      <BlogDrawer
        initialForm={initialForm}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        formData={formData}
        setFormData={setFormData}
        mode={mode}
        refresh={fetchBlogs}
        setSubmitting={setSubmitting}
        submitting={submitting}
      />
    </div>
  );
};

export default AdminBlog;
