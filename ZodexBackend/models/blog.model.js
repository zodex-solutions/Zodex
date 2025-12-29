const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, "slug is required"],
    },
    meta_title: {
      type: String,
      required: [true, "SEO title is required"],
    },
    metaDescription: {
      type: String,
      required: [true, "Meta description is required"],
    },
    metaKeywords: {
      type: [String],
      required: [true, "Meta keywords are required"],
    },
    blogCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory", // 👈 reference to BlogCategory
      required: [true, "Blog category is required"],
    },
    headline: {
      type: String,
      required: [true, "Blog headline is required"],
    },
    image: {
      type: String,
      required: [true, "Blog image is required"],
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
