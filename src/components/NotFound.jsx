import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="empty-state">
      <h2>Page not found</h2>
      <p className="note">The route you requested does not exist.</p>
      <Link className="button" to="/">
        Return home
      </Link>
    </section>
  )
}
