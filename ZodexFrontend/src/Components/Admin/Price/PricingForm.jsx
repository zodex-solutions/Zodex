import React from "react";
import Title from "../../user/title";

const PricingForm = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  console.log(formData);

  const handleFeatureChange = (index, field, value) => {
    const updated = [...formData.features];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { label: "", included: false }],
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Title css={"mt-2"} text={"Title"} />
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input"
          placeholder="Title"
          required
        />
      </div>

      <div>
        <Title css={"mt-2"} text={"price"} />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="input"
          placeholder="Price"
          required
        />
      </div>
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="monthly"
            checked={formData.monthly}
            onChange={handleChange}
          />
          <span>Monthly Plan?</span>
        </label>
      </div>
      <div>
        <Title css={"mt-2"} text={"description"} />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input"
          placeholder="Description"
          required
        />
      </div>
      <div>
        <Title css={"mt-2"} text={"Discount"} />
        <input
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          className="input"
          placeholder="Discount"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold">Features:</h4>
        {formData.features.map((feat, i) => (
          <div key={i} className="flex space-x-2">
            <div>
              <Title css={"mt-2"} text={"label"} />
              <input
                className="input"
                value={feat.label}
                onChange={(e) =>
                  handleFeatureChange(i, "label", e.target.value)
                }
                placeholder="Label"
              />
            </div>

            <input
              type="checkbox"
              checked={feat.included}
              onChange={(e) =>
                handleFeatureChange(i, "included", e.target.checked)
              }
            />
          </div>
        ))}

        <button type="button" onClick={addFeature} className="text-blue-400">
          + Add Feature
        </button>
      </div>

      <button type="submit" className="bg-blue-600 px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default PricingForm;
