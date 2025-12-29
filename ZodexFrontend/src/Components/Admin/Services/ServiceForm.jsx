import SubmitButtonWithRipple from "../../../common/SubmitButton";
import Title from "../../user/title";

const ServiceForm = ({
  formData,
  onChange,
  onSubmit,
  onClose,
  mode,
  submitting,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form onSubmit={handleSubmit}>
      {[
        { label: "Icon:", name: "icon" },
        { label: "Title:", name: "title" },
        { label: "Description:", name: "description" },
        { label: "Box Height:", name: "height" },
      ].map(({ label, name }) => (
        <div key={name} className="mb-3">
          <Title css={"mt-2"} text={label} />
          <input
            required
            type="text"
            name={name}
            value={formData?.[name] || ""}
            onChange={onChange}
            className="input w-full bg-[#1a1d24] px-4 py-2 rounded outline-none"
          />
        </div>
      ))}

      <div className="flex justify-between">
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

export default ServiceForm;
