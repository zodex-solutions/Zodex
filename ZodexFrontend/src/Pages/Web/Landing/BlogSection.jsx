import { useEffect, useState } from "react";
import { padding } from "../../../Common/tailwindStyles";
import BlogGrid from "../../../Components/BlogGrid";
import Heading from "../../../Components/Web/Text/heading";
import axiosInstance from "../../../API/instance";
import { toast } from "react-toastify";

const BlogSection = () => {
  // Fetch products from API

  const [blogCt, setBlogCt] = useState({});

  console.log(blogCt);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get(`/blogCategory`);
      const data = res?.data?.data;
      setBlogCt(data);
    } catch (err) {
      console.log("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section
      id="blogs"
      className={`${padding.t} ${padding.x} bg-gradient-to-b from-[#000] via-black/50 to-transparent relative z-10 `}
    >
      <div className="xl:container mx-auto">
        <div className={`${padding.title_y}`}>
          <Heading
            css="text-whit text-center font- lg:!pb-10 md: pb-5 lg:!text-[60px] md:!text-[40px]  !text-[30px] text-blue-100"
            line1={"Stay up to date with our newest blog articles"}
            // line2={"our newest blog articles"}
          />
        </div>

        <BlogGrid blogCt={blogCt} />
      </div>
    </section>
  );
};

export default BlogSection;
