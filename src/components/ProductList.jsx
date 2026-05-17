import { useId, useMemo, useRef, useState } from 'react'
import { useProducts } from '../context/ProductsContext'
import ProductCard from './ProductCard'

export default function ProductList() {
  const searchId = useId()
  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const { products, productLoading, productError } = useProducts()

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.origin.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [products, query])

  return (
    <section className="product-list-panel">
      <div className="product-list-header">
        <div>
          <h2>Product inventory</h2>
          <p className="note">Search products dynamically and click a card for details.</p>
        </div>
        <div className="search-bar">
          <label className="label" htmlFor={searchId}>
            Search inventory
          </label>
          <input
            ref={searchRef}
            id={searchId}
            type="search"
            placeholder="Search by name, origin, or description"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      {productLoading ? (
        <div className="empty-state">Loading products…</div>
      ) : productError ? (
        <div className="alert">Unable to load products from the backend.</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="empty-state">
              No products match "{query}". Try a different search term.
            </div>
          )}
        </div>
      )}
    </section>
  )
}
