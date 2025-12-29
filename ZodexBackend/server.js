const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const blogRoutes = require("./routes/blogRoutes");
const blogCategoryRoutes = require("./routes/blog.ct.routes");
const contactRoutes = require("./routes/contact.routes");
dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://it.zodex.in", "*"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);
app.use(express.json());

// Serve static uploads folder
app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/api/v1/uploads", express.static(path.join(process.cwd(), "uploads")));
// Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/blogCategory", blogCategoryRoutes);
app.use("/api/v1/contact", contactRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is working");
});
