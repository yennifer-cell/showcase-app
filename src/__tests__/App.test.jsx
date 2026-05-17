import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from '../App'

vi.mock('../context/ProductsContext', () => ({
  ProductsProvider: ({ children }) => <>{children}</>,
  useProducts: () => ({
    products: [],
    productLoading: false,
    productError: null,
    createProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
    refreshProducts: vi.fn(),
    storeInfo: { name: 'Coffee R Us', description: 'The go to store for coffee', phone_number: '555-5555' },
  }),
}))

test('renders the main navigation links', () => {
  render(<App />)

  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /add product/i })).toBeInTheDocument()
})
