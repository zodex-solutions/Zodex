import SubmitButtonWithRipple from "../../../Common/Button/SubmitButton";
import Title from "../../Web/Text/title";
import ImageUpload from "../Common/ImageUpload";

const BlogCategoryForm = ({
  formData,
  onChange,
  onSubmit,
  onClose,
  mode,
  submitting,
  setFormData,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image */}
    
      <ImageUpload
        imageUrl={formData.image}
        setImageUrl={(url) => setFormData((prev) => ({ ...prev, image: url }))}
      />

      {/* Title */}
      <div>
        <Title css="mt-2" text="Title" />
        <input
          required
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Enter blog title"
          className="input w-full bg-[#1a1d24] px-4 py-2 rounded outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <Title css="mt-2" text="Description" />
        <textarea
          required
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Enter description"
          className="input w-full bg-[#1a1d24] px-4 py-2 rounded outline-none min-h-[100px]"
        />
      </div>

      {/* Category */}
      <div>
        <Title css="mt-2" text="Category" />
        <input
          required
          name="category"
          value={formData.category}
          onChange={onChange}
          placeholder="Enter category"
          className="input w-full bg-[#1a1d24] px-4 py-2 rounded outline-none"
        />
      </div>
      {/* colSpan */}
      <div>
        <Title css="mt-2" text="Col Span" />
        <input
          name="colSpan"
          value={formData.colSpan}
          onChange={onChange}
          placeholder="Enter Col Span"
          className="input w-full bg-[#1a1d24] px-4 py-2 rounded outline-none"
        />
      </div>

      {/* Image URL
      <div>
        <Title css="mt-2" text="Image URL" />
        <input
          required
          type="url"
          name="image"
          value={formData.image}
          onChange={onChange}
          placeholder="Enter image URL"
          className="input w-full bg-[#1a1d24] px-4 py-2 rounded outline-none"
        />
      </div> */}

      {/* Actions */}
      <div className="mt-6 flex justify-between">
        <SubmitButtonWithRipple
          submitting={submitting}
          mode={mode}
          color={"green"}
        />

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

export default BlogCategoryForm;
