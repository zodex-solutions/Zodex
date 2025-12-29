const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    company: {
      type: String,
    },
    relationship: {
      type: String,
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
    },
    marketing: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
