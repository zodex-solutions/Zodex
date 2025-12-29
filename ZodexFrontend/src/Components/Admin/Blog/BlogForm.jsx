import Title from "../../Web/Text/title";
import ImageUpload from "../Common/ImageUpload";

const BlogForm = ({
  formData,
  onChange,
  onSubmit,
  onClose,
  mode,
  submitting,
  categories,
  setFormData,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert metaKeywords from string → array
    const formattedData = {
      ...formData,
      metaKeywords: formData.metaKeywords
        ? formData.metaKeywords.split(",").map((kw) => kw.trim())
        : [],
    };

    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <ImageUpload
          imageUrl={formData?.image || ""}
          setImageUrl={(url) =>
            setFormData((prev) => ({ ...prev, image: url }))
          }
        />
      </div>
      {[
        { label: "Slug", name: "slug" },
        { label: "SEO Title", name: "meta_title" },
        { label: "Meta Description", name: "metaDescription" },
        {
          label: "Meta Keywords (comma separated)",
          name: "metaKeywords",
        },
        { label: "Headline", name: "headline" },
        // { label: "Image URL", name: "image" },
        { label: "Content", name: "content" },
      ].map(({ label, name }) => (
        <div key={name} className="mb-3">
          <Title css={"mt-2 mb-1"} text={label} />
          {name === "content" ? (
            <textarea
              name={name}
              value={formData?.[name] || ""}
              onChange={onChange}
              className="w-full bg-[#1a1d24] px-4 py-2 rounded outline-none min-h-[150px]"
            />
          ) : (
            <input
              type="text"
              name={name}
              value={formData?.[name] || ""}
              onChange={onChange}
              className="w-full bg-[#1a1d24] px-4 py-2 rounded outline-none"
            />
          )}
        </div>
      ))}

      <div className="mb-4">
        <Title css={"mt-2 mb-1"} text={"Category"} />

        <select
          name="blogCategory"
          value={formData?.blogCategory || ""}
          onChange={onChange}
          className="w-full bg-[#1a1d24] !text-sm px-4 py-3 rounded outline-none"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={submitting}
          className="!bg-green-600 !border !border-gray-800 hover:!outline-amber-100 !rounded !px-6 !py-2 text-white font-semibold"
        >
          {submitting
            ? mode === "edit"
              ? "Updating..."
              : "Adding..."
            : mode === "edit"
            ? "Update"
            : "Add"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="!bg-red-600 !border !border-gray-800 hover:!outline-amber-100 !rounded !px-4 !py-2 text-white font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
