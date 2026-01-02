import { useEffect, useState } from "react"
import ProductTable from "./components/ProductTable"
import ProductGrid from "./components/ProductGrid"
import ProductForm from "./components/ProductForm"
import Pagination from "./components/Pagination"
import SearchBar from "./components/SearchBar"

const initialProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    category: "Electronics",
    stock: 10,
    description: "15-inch display laptop"
  },
  {
    id: 2,
    name: "Chair",
    price: 2500,
    category: "Furniture",
    stock: 20,
    description: "Comfortable office chair"
  }
]

export default function App() {
  const [products, setProducts] = useState(initialProducts)
  const [view, setView] = useState("list")
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [editingProduct, setEditingProduct] = useState(null)

  const itemsPerPage = 5

  // 🔹 Debounce Search (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handleSave = (product) => {
    if (product.id) {
      setProducts(products.map(p => p.id === product.id ? product : p))
    } else {
      setProducts([...products, { ...product, id: Date.now() }])
    }
    setEditingProduct(null)
  }

  return (
    <div className="container">
      <h1>Product Management</h1>

      <div className="toolbar">
        {/* Left: Search */}
        <div className="toolbar-left">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Right: View / Action buttons */}
        <div className="toolbar-right">
          <div className="btn-group">
            <button
              className={view === "list" ? "active" : ""}
              onClick={() => setView("list")}
            >
              List View
            </button>
            <button
              className={view === "grid" ? "active" : ""}
              onClick={() => setView("grid")}
            >
              Card View
            </button>
            <button onClick={() => setEditingProduct({})}>
              Add Product
            </button>
          </div>
        </div>
      </div>

      {editingProduct !== null && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      {view === "list" ? (
        <ProductTable
          products={paginatedProducts}
          onEdit={setEditingProduct}
        />
      ) : (
        <ProductGrid
          products={paginatedProducts}
          onEdit={setEditingProduct}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );

}
