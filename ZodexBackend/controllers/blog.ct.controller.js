const { get } = require("mongoose");
const BlogCategory = require("../models/blog.ct.model");
const mongoose = require("mongoose");

const createBlogCategory = async (req, res) => {
  try {
    const blogCategory = await BlogCategory.create(req.body);
    res.status(201).json({ success: true, data: blogCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getBlogsCategory = async (req, res) => {
  try {
    const blogs = await BlogCategory.find();
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogCategoryById = async (req, res) => {
  try {
    const blogCategory = await BlogCategory.findById(req.params.id);
    if (!blogCategory)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    res.json({ success: true, data: blogCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateBlogCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check for valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const blog = await BlogCategory.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated doc
      runValidators: true, // enforce schema validation
    });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    console.error("Update BlogCategory Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteBlogCategory = async (req, res) => {
  try {
    const blogCategory = await BlogCategory.findByIdAndDelete(req.params.id);
    if (!blogCategory)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBlogCategory,
  getBlogsCategory,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
};
