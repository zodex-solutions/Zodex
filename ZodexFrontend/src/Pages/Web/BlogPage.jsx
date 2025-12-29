import React, { useEffect, useState } from "react";

import Heading from "../../Components/Web/Text/heading";
import BlogCard from "../../Components/Web/BlogCard";
import Footer from "../../Components/Web/Layout/Footer";
import axiosInstance from "../../API/instance";
import { useSearchParams } from "react-router-dom";
import { padding } from "../../Common/tailwindStyles";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogsCategory, setBlogsCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";

  // 🔥 function to change category in URL
  const handleCategoryChange = (cat) => {
    if (cat === "all") {
      setSearchParams({}); // remove query param
    } else {
      setSearchParams({ category: cat.toLowerCase() });
    }
  };
  useEffect(() => {
    setSelectedCategory(category.toLowerCase());
  }, [category]);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "all" ||
      blog.blogCategory?.category?.toLowerCase() === selectedCategory;

    const matchesSearch =
      blog.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const fetchBlogs = async () => {
    try {
      const res = await axiosInstance.get(`/blogs`);
      console.log("res", res?.data?.data);
      setBlogs(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchBlogsCategory = async () => {
    try {
      const res = await axiosInstance.get(`/blogCategory`);
      // console.log("res", res?.data?.data);
      setBlogsCategory(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchBlogsCategory();
  }, []);

  return (
    <section className={` h-screen  smooth-content  !overflow-scroll `}>
      <div
        className={`${padding.x} ${padding.t} pb-10 bg-gradient-to-b from-black via-black/50 to-black/40 `}
      >
        <div className=" xl:container mx-auto">
          <div className="mb-10 pt-3 ">
            <Heading
              line1={"Stay up to date with"}
              line2={"our newest blog articles"}
            />
          </div>

          {/* Top Filters */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              <a
                // href={`/blogs?category=all`}
                onClick={() => {
                  handleCategoryChange("all"), setSelectedCategory("all");
                }}
                className={`!outline-none poppins-light cursor-pointer !py-1 !px-3 !rounded-full text-sm transition ${
                  selectedCategory === "all"
                    ? "!bg-white !text-black !border-[0.5px]"
                    : "!border-[0.5px] border-gray-50/15 !bg-transparent text-white"
                }`}
              >
                All
              </a>

              {blogsCategory?.map((cat, index) => (
                <a
                  // href={`/blogs?category=${selectedCategory}`}
                  key={index}
                  onClick={() => {
                    handleCategoryChange(cat?.category.toLowerCase());
                    setSelectedCategory(cat?.category.toLowerCase());
                  }}
                  className={`!outline-none poppins-light cursor-pointer !py-1 !px-3 !rounded-full text-sm transition ${
                    selectedCategory === cat?.category.toLowerCase()
                      ? "!bg-white !text-black !border-[0.5px]"
                      : "!border-[0.5px] border-gray-50/15 !bg-transparent text-white"
                  }`}
                >
                  {cat.category}
                </a>
              ))}
            </div>

            {/* Search Input */}
            <div className="w-full lg:w-1/3">
              <input
                type="text"
                placeholder="Search blogs..."
                className={`w-full p-3 px-5 border border-gray-50/10 text-gray-300 outline-none rounded-full shadow-md `}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Blog Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBlogs?.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;

// const blogs = [
//   {
//     image: blog,
//     author: "Jane Smith",
//     date: "4 weeks ago",
//     tags: ["Cyber data", "Digital"],
//     title: "Top funding strategies every startup founder should know",
//     short_desc:
//       "Learn the best ways to fund your startup and ensure financial stability.",
//   },
//   {
//     image: blog,
//     author: "Jane Smith",
//     date: "4 weeks ago",
//     tags: ["Cyber data", "Digital"],
//     title: "Top funding strategies every startup founder should know",
//     short_desc:
//       "Learn the best ways to fund your startup and ensure financial stability.",
//   },
//   {
//     image: blog,
//     author: "Jane Smith",
//     date: "4 weeks ago",
//     tags: ["Cyber data", "Digital"],
//     title: "Top funding strategies every startup founder should know",
//     short_desc:
//       "Learn the best ways to fund your startup and ensure financial stability.",
//   },
//   {
//     image: blog,
//     author: "Jane Smith",
//     date: "4 weeks ago",
//     tags: ["Cyber data", "Digital"],
//     title: "Top funding strategies every startup founder should know",
//     short_desc:
//       "Learn the best ways to fund your startup and ensure financial stability.",
//   },
//   {
//     image: blog,
//     author: "Jane Smith",
//     date: "4 weeks ago",
//     tags: ["Cyber data", "Digital"],
//     title: "Top funding strategies every startup founder should know",
//     short_desc:
//       "Learn the best ways to fund your startup and ensure financial stability.",
//   },
//   {
//     image: blog,
//     author: "Jane Smith",
//     date: "4 weeks ago",
//     tags: ["Cyber data", "Digital"],
//     title: "Top funding strategies every startup founder should know",
//     short_desc:
//       "Learn the best ways to fund your startup and ensure financial stability.",
//   },
//   {
//     image: blog,
//     author: "Jane Smith",
//     date: "3 months ago",
//     tags: ["Consulting", "Finance"],
//     title: "Marketing strategies to boost your startup’s flow growth",
//     short_desc:
//       "Effective marketing is key for startup growth — here’s how to nail it.",
//   },
//   {
//     image: blog,
//     author: "Jane Smith",
//     date: "3 months ago",
//     tags: ["Digital", "Finance"],
//     title: "How to effectively manage cash challenges for startups",
//     short_desc:
//       "A guide for startup founders to navigate financial difficulties with ease.",
//   },
//   // Add more blogs as needed
// ];

// [
//   {
//     slug: "how-to-learn-nodejs-fast",
//     meta_title: "How to Learn Node.js Fast | Beginner's Guide",
//     metaDescription:
//       "A step-by-step beginner's guide to learning Node.js quickly and effectively. Covers setup, core concepts, and project ideas.",
//     metaKeywords: [
//       "Node.js",
//       "JavaScript",
//       "Backend",
//       "Programming",
//       "Tutorial",
//     ],
//     blogCategory: "Programming",
//     headline: "How to Learn Node.js Fast: A Beginner's Guide",
//     image: "https://example.com/uploads/nodejs-guide.png",
//     content:
//       "<p>Node.js is one of the most popular JavaScript runtime environments...</p>",
//   },
//   {
//     slug: "seo-tips-for-beginners",
//     meta_title: "Top 10 SEO Tips for Beginners in 2025",
//     metaDescription:
//       "Learn the essential SEO tips for beginners to boost your website's ranking on Google in 2025.",
//     metaKeywords: [
//       "SEO",
//       "Google Ranking",
//       "Digital Marketing",
//       "Beginners",
//       "SEO Tips",
//     ],
//     blogCategory: "Digital Marketing",
//     headline: "Top 10 SEO Tips for Beginners in 2025",
//     image: "https://example.com/uploads/seo-tips.png",
//     content:
//       "<p>Search Engine Optimization (SEO) is the backbone of online visibility...</p>",
//   },
//   {
//     slug: "ai-in-daily-life",
//     meta_title: "How AI is Changing Daily Life in 2025",
//     metaDescription:
//       "Artificial Intelligence is no longer the future – it's part of our everyday lives. Here's how AI is shaping 2025.",
//     metaKeywords: [
//       "Artificial Intelligence",
//       "AI",
//       "Technology",
//       "Future",
//       "Automation",
//     ],
//     blogCategory: "Technology",
//     headline: "How AI is Changing Daily Life in 2025",
//     image: "https://example.com/uploads/ai-daily-life.png",
//     content:
//       "<p>Artificial Intelligence (AI) is transforming the way we live, from smart homes to healthcare...</p>",
//   },
//   {
//     slug: "top-javascript-frameworks-2025",
//     meta_title: "Top JavaScript Frameworks to Learn in 2025",
//     metaDescription:
//       "Discover the most popular JavaScript frameworks in 2025, including React, Vue, Angular, and emerging technologies.",
//     metaKeywords: ["JavaScript", "React", "Vue", "Angular", "Web Development"],
//     blogCategory: "Programming",
//     headline: "Top JavaScript Frameworks to Learn in 2025",
//     image: "https://example.com/uploads/js-frameworks.png",
//     content:
//       "<p>JavaScript frameworks continue to evolve, making web development faster and easier...</p>",
//   },
//   {
//     slug: "cloud-computing-trends-2025",
//     meta_title: "Cloud Computing Trends to Watch in 2025",
//     metaDescription:
//       "From edge computing to hybrid clouds, explore the top cloud computing trends shaping 2025.",
//     metaKeywords: ["Cloud Computing", "AWS", "Azure", "Google Cloud", "Trends"],
//     blogCategory: "Technology",
//     headline: "Cloud Computing Trends to Watch in 2025",
//     image: "https://example.com/uploads/cloud-trends.png",
//     content:
//       "<p>Cloud computing has become the backbone of modern IT infrastructure...</p>",
//   },
// ];
