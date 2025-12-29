const express = require("express");
const {
  createBlogCategory,
  getBlogsCategory,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
} = require("../controllers/blog.ct.controller");

const router = express.Router();

router.post("/", createBlogCategory);
router.get("/", getBlogsCategory);
router.get("/:id", getBlogCategoryById);
router.put("/:id", updateBlogCategory); // ✅ FIXED
router.delete("/:id", deleteBlogCategory);

module.exports = router;
