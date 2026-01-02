export default function ProductTable({ products, onEdit }) {
  return (
    <table className="product-table responsive-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td data-label="Name">{p.name}</td>
            <td data-label="Price">₹{p.price}</td>
            <td data-label="Category">{p.category}</td>
            <td data-label="Stock">{p.stock}</td>
            <td data-label="Action" className="action-cell">
              <button
                className="table-action-btn"
                onClick={() => onEdit(p)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
