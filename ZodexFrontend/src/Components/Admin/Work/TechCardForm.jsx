import { useState } from "react";
import SubmitButtonWithRipple from "../../../common/SubmitButton";
import Title from "../../user/title";

const TechCardForm = ({
  formData,
  onChange,
  onSubmit,
  onClose,
  mode,
  submitting,
  setFormData,
}) => {
  const handleCardChange = (index, field, value) => {
    const updatedCards = [...formData.cards];
    updatedCards[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      cards: updatedCards,
    }));
  };

  const addCard = () => {
    setFormData((prev) => ({
      ...prev,
      cards: [...(prev.cards || []), { title: "", desc: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {[
        { label: "Image:", name: "image" },
        { label: "Name:", name: "name" },
        { label: "Link:", name: "href" },
        { label: "Work Type:", name: "work_type" },
      ].map(({ label, name }) => (
        <div key={name} className="mb-3">
          <Title css="mt-2" text={label} />
          <input
            required
            type="text"
            name={name}
            value={formData?.[name] || ""}
            onChange={onChange}
            className="input"
          />
        </div>
      ))}

      <div className="mb-3">
        <Title css="mt-4" text="Tech Cards:" />
        {(formData.cards || []).map((card, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-2 mb-2">
            <input
              required
              placeholder="Tech Title"
              value={card.title}
              onChange={(e) => handleCardChange(idx, "title", e.target.value)}
              className="input"
            />
            <input
              required
              placeholder="Description"
              value={card.desc}
              onChange={(e) => handleCardChange(idx, "desc", e.target.value)}
              className="input"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addCard}
          className="text-blue-600 font-semibold text-sm underline"
        >
          + Add Tech
        </button>
      </div>

      <div className="mt-4 flex justify-between">
        <SubmitButtonWithRipple
          submitting={submitting}
          mode={mode}
          color="green"
        />
        <button
          onClick={onClose}
          type="button"
          className="!bg-red-600 !border !border-gray-800 hover:!outline-amber-100 !rounded !px-4 !py-2 text-white font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TechCardForm;
