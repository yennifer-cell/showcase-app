import { useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'

export default function ProductForm() {
  const nameId = useId()
  const originId = useId()
  const descriptionId = useId()
  const priceId = useId()
  const nameInputRef = useRef(null)
  const navigate = useNavigate()
  const { createProduct } = useProducts()

  const [name, setName] = useState('')
  const [origin, setOrigin] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus(null)
    setError(null)

    if (!name || !origin || !description || !price) {
      setError('Please complete every field before submitting.')
      return
    }

    const parsedPrice = Number(price)
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Price must be a number greater than zero.')
      return
    }

    try {
      await createProduct({
        name: name.trim(),
        origin: origin.trim(),
        description: description.trim(),
        price: parsedPrice,
      })
      setStatus('Product added successfully.')
      setName('')
      setOrigin('')
      setDescription('')
      setPrice('')
      nameInputRef.current?.focus()
      navigate('/products')
    } catch (submitError) {
      setError(submitError.message)
    }
  }

  return (
    <section className="form-panel">
      <div>
        <h2>Add a new product</h2>
        <p className="note">
          Use this form to create a new inventory item. The new product will be
          stored in the simulated backend.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor={nameId}>
            Product name
          </label>
          <input
            ref={nameInputRef}
            id={nameId}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Vanilla Bean"
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
            placeholder="Colombia"
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
            placeholder="Medium roast with warm vanilla notes"
          />
        </div>

        <div className="field">
          <label className="label" htmlFor={priceId}>
            Price (USD)
          </label>
          <input
            id={priceId}
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="10.00"
          />
        </div>

        <div className="button-group">
          <button className="button" type="submit">
            Save product
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={() => navigate('/products')}
          >
            Cancel
          </button>
        </div>

        {status && <div className="alert">{status}</div>}
        {error && <div className="alert">{error}</div>}
      </form>
    </section>
  )
}
