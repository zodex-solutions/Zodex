const mongoose = require("mongoose");

const blogCategorySchema = new mongoose.Schema(
  {
    image: {
      type: String, // URL or file path of the image
      required: [true, "Blog image is required"],
    },
    title: {
      type: String,
      required: [true, " title is required"],
    },
    description: {
      type: String,
      required: [true, " description is required"],
    },
    category: {
      type: String,
      required: [true, " category is required"],
    },
    colSpan: {
      type: String,
      required: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("BlogCategory", blogCategorySchema);
