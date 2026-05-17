import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>

      <div className="note">
        Origin: {product.origin} · ${product.price.toFixed(2)}
      </div>

      <Link className="button" to={`/product/${product.id}`}>
        Manage product
      </Link>
    </article>
  )
}
