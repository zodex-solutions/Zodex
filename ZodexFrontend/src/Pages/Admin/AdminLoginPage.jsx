import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const staticEmail = "admin@gmail.com";
    const staticPassword = "ipkoliki";

    if (email === staticEmail && password === staticPassword) {
      localStorage.setItem("admin_token", "dummy_token"); // Store token
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1218] px-4">
      <div className="w-full max-w-md bg-[#1a1d24] p-8 rounded-xl shadow-lg border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-white mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#2a2d35] text-white border border-gray-600 outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-white mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#2a2d35] text-white border border-gray-600 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
