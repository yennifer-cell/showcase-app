import { useProducts } from '../context/ProductsContext'

export default function LandingPage() {
  const { storeInfo, products, productLoading, productError } = useProducts()

  return (
    <section className="hero-panel">
      <div>
        <p className="note">Administrator portal for Coffee R Us</p>
        <h1>Manage coffee inventory in one dashboard</h1>
        <p>
          Review current products, add new coffee blends, and update pricing from a
          centralized admin experience.
        </p>

        {productError && (
          <div className="alert">Unable to load product data. Try refreshing.</div>
        )}

        <div className="shop-stats">
          <span>
            <strong>{products.length}</strong>
            Products available
          </span>
          <span>
            <strong>{productLoading ? 'Loading…' : 'Live'}</strong>
            Backend connection
          </span>
          <span>
            <strong>{storeInfo?.phone_number ?? '555-5555'}</strong>
            Store support
          </span>
        </div>
      </div>

      <div className="hero-card">
        <strong>{storeInfo?.name ?? 'Coffee R Us'}</strong>
        <p>{storeInfo?.description ?? 'Track product updates, search inventory, and keep pricing fresh.'}</p>
      </div>
    </section>
  )
}
