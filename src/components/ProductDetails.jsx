import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'

export default function ProductDetails() {
  const { id } = useParams()
  const { products, productLoading, updateProduct, deleteProduct } = useProducts()
  const navigate = useNavigate()
  const priceId = useId()
  const originId = useId()
  const descriptionId = useId()
  const priceRef = useRef(null)

  const productId = Number(id)
  const product = products.find((item) => item.id === productId)

  const [price, setPrice] = useState('')
  const [origin, setOrigin] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (product) {
      setPrice(product.price.toString())
      setOrigin(product.origin)
      setDescription(product.description)
    }
  }, [product])

  async function handleSave(event) {
    event.preventDefault()
    setStatus(null)
    setError(null)

    const parsedPrice = Number(price)
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Enter a valid price before saving.')
      priceRef.current?.focus()
      return
    }

    try {
      await updateProduct(product.id, {
        price: parsedPrice,
        origin: origin.trim(),
        description: description.trim(),
      })
      setStatus('Product updated successfully.')
    } catch (saveError) {
      setError(saveError.message)
    }
  }

  async function handleDelete() {
    try {
      await deleteProduct(product.id)
      navigate('/products')
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  if (productLoading) {
    return <div className="empty-state">Loading product details…</div>
  }

  if (!product) {
    return (
      <section className="empty-state">
        <h2>Product not found</h2>
        <p className="note">The requested product does not exist in the inventory.</p>
      </section>
    )
  }

  return (
    <section className="detail-panel">
      <div>
        <h2>Manage product</h2>
        <p className="note">Update pricing or remove products from the storefront.</p>
      </div>

      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="note">Origin: {product.origin}</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="field">
          <label className="label" htmlFor={priceId}>
            Price (USD)
          </label>
          <input
            ref={priceRef}
            id={priceId}
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor={originId}>
            Origin
          </label>
          <input
            id={originId}
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor={descriptionId}>
            Description
          </label>
          <textarea
            id={descriptionId}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="button" type="submit">
            Save changes
          </button>
          <button className="button secondary" type="button" onClick={handleDelete}>
            Delete product
          </button>
          <button className="button secondary" type="button" onClick={() => navigate('/products')}>
            Back to products
          </button>
        </div>

        {status && <div className="alert">{status}</div>}
        {error && <div className="alert">{error}</div>}
      </form>
    </section>
  )
}
