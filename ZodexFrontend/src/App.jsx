import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/Web/Landing";
import UserLayout from "./Components/Web/Layout/Layout";

import PrivateRoute from "./Components/Admin/Auth/PrivateRoute";
import LoadingIndicator from "./Components/Web/LoadingIndicator";
import ContactQueries from "./Pages/Admin/contactQueries";

const ContactForm = lazy(() => import("./Pages/Web/ContactPage"));
const AdminBlog = lazy(() => import("./Pages/Admin/AdminBlog"));
const AdminLoginPage = lazy(() => import("./Pages/Admin/AdminLoginPage"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const AdminLayout = lazy(() => import("./Components/Admin/Layout/AdminLayout"));
const AdminProduct = lazy(() => import("./Pages/Admin/AdminProduct"));
const AdminBlogCategory = lazy(() => import("./Pages/Admin/AdminBlogCategory"));
const BlogPage = lazy(() => import("./Pages/Web/BlogPage"));

function App() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<LandingPage />} />
          <Route path="blogs/:category?" element={<BlogPage />} />
          <Route path="reach-us" element={<ContactForm />} />
        </Route>

        <Route path="/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProduct />} />
            <Route path="blogs" element={<AdminBlog />} />
            <Route path="blog-category" element={<AdminBlogCategory />} />
            <Route path="contact-queries" element={<ContactQueries />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
