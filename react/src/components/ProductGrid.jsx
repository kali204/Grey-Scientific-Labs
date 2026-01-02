export default function ProductGrid({ products, onEdit }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <div key={p.id} className="card product-card">
          <div className="product-card-header">
            <h3 className="product-name">{p.name}</h3>
            <span className="product-category">{p.category}</span>
          </div>

          <div className="product-card-body">
            <p className="product-price">₹{p.price}</p>
            <p className="product-stock">Stock: {p.stock}</p>
            {p.description && (
              <p className="product-description">{p.description}</p>
            )}
          </div>

          <div className="product-card-footer">
            <button onClick={() => onEdit(p)}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}
