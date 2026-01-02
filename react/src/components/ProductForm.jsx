import { useState } from "react"

export default function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: product.name || "",
    price: product.price || "",
    category: product.category || "",
    stock: product.stock || "",
    description: product.description || ""
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const err = {}
    if (!form.name) err.name = "Name is required"
    if (!form.price) err.price = "Price is required"
    if (!form.category) err.category = "Category is required"
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSave({ ...product, ...form })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>{product.id ? "Edit Product" : "Add Product"}</h3>

      <input placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />
      {errors.name && <span>{errors.name}</span>}

      <input type="number" placeholder="Price"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })} />
      {errors.price && <span>{errors.price}</span>}

      <input placeholder="Category"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })} />
      {errors.category && <span>{errors.category}</span>}

      <input type="number" placeholder="Stock"
        value={form.stock}
        onChange={e => setForm({ ...form, stock: e.target.value })} />

      <textarea placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })} />

      <div className="actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
