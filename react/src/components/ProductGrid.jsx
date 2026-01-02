export default function ProductGrid({ products, onEdit }) {
  return (
    <div className="grid">
      {products.map(p => (
        <div key={p.id} className="card">
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <p>{p.category}</p>
          <p>Stock: {p.stock}</p>
          <button onClick={() => onEdit(p)}>Edit</button>
        </div>
      ))}
    </div>
  )
}
