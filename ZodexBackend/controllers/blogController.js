// const BlogSchema = require('../models/blog.model');

// const createBlog = async (req, res) => {
//   try {
//     const blog = await BlogSchema.create(req.body);
//     res.status(201).json({ success: true, data: blog });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// const getBlogs = async (req, res) => {
//   try {
//     const blogs = await BlogSchema.find();
//     res.json({ success: true, data: blogs });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const getBlogById = async (req, res) => {
//   try {
//     const blog = await BlogSchema.findById(req.params.id);
//     if (!blog)
//       return res
//         .status(404)
//         .json({ success: false, message: "Blog not found" });
//     res.json({ success: true, data: blog });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const updateBlog = async (req, res) => {
//   try {
//     const blog = await BlogSchema.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!blog)
//       return res
//         .status(404)
//         .json({ success: false, message: "Blog not found" });
//     res.json({ success: true, data: blog });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// const deleteBlog = async (req, res) => {
//   try {
//     const blog = await BlogSchema.findByIdAndDelete(req.params.id);
//     if (!blog)
//       return res
//         .status(404)
//         .json({ success: false, message: "Blog not found" });
//     res.json({ success: true, message: "Blog deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// }

// module.exports = {
//   createBlog,
//   getBlogs,
//   getBlogById,
//   updateBlog,
//   deleteBlog,
// };

const Blog = require("../models/blog.model");
const mongoose = require("mongoose");

// Create Blog
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    const populatedBlog = await blog.populate("blogCategory"); // populate after creation
    res.status(201).json({ success: true, data: populatedBlog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("blogCategory");
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("blogCategory");
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog ID" });
    }

    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("blogCategory");

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    console.error("❌ Blog update error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Delete Blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
