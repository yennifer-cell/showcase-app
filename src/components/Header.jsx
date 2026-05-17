import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <div className="logo">Coffee R Us</div>
      <nav className="main-nav" aria-label="Primary navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/add">Add Product</NavLink>
      </nav>
    </header>
  )
}
