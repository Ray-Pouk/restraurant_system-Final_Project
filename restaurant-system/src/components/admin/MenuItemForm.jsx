import { useState } from "react";

const CATEGORIES = ["Starters", "Mains", "Desserts", "Beverages"];
const DIETARY_OPTIONS = ["Vegetarian", "Vegan", "Gluten-Free"];

// Add or edit a menu item (admin).
function MenuItemForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initialValues?.name ?? "",
    category: initialValues?.category ?? "Mains",
    description: initialValues?.description ?? "",
    ingredients: initialValues?.ingredients ?? "",
    price: initialValues?.price ?? "",
    dietary: initialValues?.dietary ?? [],
    isSpecial: initialValues?.isSpecial ?? false,
    popular: initialValues?.popular ?? false,
  });
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function toggleDietary(option) {
    setForm((current) => ({
      ...current,
      dietary: current.dietary.includes(option)
        ? current.dietary.filter((d) => d !== option)
        : [...current.dietary, option],
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const price = Number(form.price);
    if (!form.name.trim()) return setError("Name is required.");
    if (!Number.isFinite(price) || price <= 0) {
      return setError("Price must be greater than 0.");
    }

    setError("");
    onSubmit({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      ingredients: form.ingredients.trim(),
      price: Math.round(price * 100) / 100,
    });

    if (!initialValues) {
      setForm({
        name: "",
        category: "Mains",
        description: "",
        ingredients: "",
        price: "",
        dietary: [],
        isSpecial: false,
        popular: false,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Item name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <select name="category" value={form.category} onChange={handleChange}>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="price"
        step="0.01"
        min="0.01"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="ingredients"
        placeholder="Ingredients (comma separated)"
        value={form.ingredients}
        onChange={handleChange}
        required
      />

      <div>
        {DIETARY_OPTIONS.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              checked={form.dietary.includes(option)}
              onChange={() => toggleDietary(option)}
            />
            {option}{" "}
          </label>
        ))}
      </div>

      <label>
        <input
          type="checkbox"
          name="isSpecial"
          checked={form.isSpecial}
          onChange={handleChange}
        />
        Today's special{" "}
      </label>
      <label>
        <input
          type="checkbox"
          name="popular"
          checked={form.popular}
          onChange={handleChange}
        />
        Popular
      </label>

      {error && <p role="alert">{error}</p>}

      <button type="submit">{submitLabel}</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default MenuItemForm;
