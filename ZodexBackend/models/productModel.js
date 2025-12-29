const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
    },
    image: {
      type: String, // URL or file path of the image
      required: [true, "Product image is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
