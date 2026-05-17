import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProductsProvider } from './context/ProductsContext'
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import ProductDetails from './components/ProductDetails'
import NotFound from './components/NotFound'
import './App.css'

function App() {
  return (
    <ProductsProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Header />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/add" element={<ProductForm />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ProductsProvider>
  )
}

export default App
