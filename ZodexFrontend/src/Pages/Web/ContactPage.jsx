import { useState } from "react";
import Heading from "../../Components/Web/Text/heading";
import Footer from "../../Components/Web/Layout/Footer";
import axiosInstance from "../../API/instance";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    relationship: "",
    phone: "",
    message: "",
    marketing: false,
  });

  const relationships = ["Prospect", "Client", "Partner", "Employee", "Other"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(`/contact`, formData);

      console.log("Success:", res.data);

      // ✅ Optional: reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        relationship: "",
        phone: "",
        message: "",
        marketing: false,
      });

      alert("Form submitted successfully!");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      alert("Failed to submit form");
    }
  };

  return (
    <section className=" h-screen smooth-content   !overflow-scroll  ">
      <div className="bg-gradient-to-b from-black via-black/50 to-black/40 px-5">
        <div className=" pt-32 l py-20    xl:container mx-auto">
          <Heading line1={"Contact Us"} css={"mb-2"} />
          <p className="mb-6 text-gray-400 max-w-xl ">
            Please let us know what service you are interested in by completing
            the form below. We will get in touch with you shortly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 border-[0.5px] border-gray-50/15 rounded-2xl backdrop-blur-xl p-5 max-w-2xl"
          >
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-[#0f1218] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-[#0f1218] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-[#0f1218] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-[#0f1218] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Relationship with Infosys{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-[#0f1218] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select - Relationship with Infosys</option>
                {relationships.map((rel, i) => (
                  <option key={i} value={rel}>
                    {rel}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-[#0f1218] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Please provide additional information{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded bg-[#0f1218] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            {/* Marketing Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="marketing"
                checked={formData.marketing}
                onChange={handleChange}
                className="h-4 w-4 rounded bg-[#0f1218] border-gray-700"
              />
              <span className="text-sm">
                Opt in for marketing communication{" "}
                <a href="/privacy" className="text-indigo-400 underline">
                  Privacy Statement
                </a>
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
