import { useEffect, useState } from "react";
import Heading from "../../../Components/Web/Text/heading";
import DesktopWorkSlider from "../../../Components/Web/DesktopWorkSlider";
import axiosInstance from "../../../API/instance";
import config from "../../../API/config";
import { padding } from "../../../Common/tailwindStyles";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      const data = res.data.data.reverse();
      console.log(data);
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Auto-change slider every 4 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % products.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [products]);

  if (!products.length) return null;

  const activeProduct = products[activeIndex];

  return (
    <section
      className={` ${padding.x} lg:h-[200vh] md:h-[200vh]  pt-10 sm:pt-10 lg:pt-16 bg-gradient-to-t from-[#000] via-black/50 to-transparent  `}
    >
      <div className="lg: sticky top-0 xl:container mx-auto lg:h-screen md:h-screen flex flex-col justify-center">
        <Heading
          css="text-whit text-center  lg:!text-[60px] md:!text-[40px] !ext-[40px] text-blue-100"
          line1="Explore fresh features"
          line2="in our latest product releases"
        />

        <div className="w-full flex items-center justify-center">
          <div className="xl:max-w-[60%] lg:max-w-[60%] md:max-w-[90%]">
            <DesktopWorkSlider
              fade={fade}
              image={activeProduct?.image}
              title={activeProduct?.title}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
