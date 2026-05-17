import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import ProductList from '../components/ProductList'

vi.mock('../context/ProductsContext', () => ({
  useProducts: () => ({
    products: [
      {
        id: 1,
        name: 'Vanilla Bean',
        description: 'Medium roast with warm vanilla notes',
        origin: 'Colombia',
        price: 10.0,
      },
      {
        id: 2,
        name: 'House Blend',
        description: 'Dark roast with rich chocolate flavor',
        origin: 'Vietnam',
        price: 12.0,
      },
    ],
    productLoading: false,
    productError: null,
  }),
}))

test('filters products by user search query', async () => {
  render(
    <MemoryRouter>
      <ProductList />
    </MemoryRouter>,
  )

  const searchInput = screen.getByLabelText(/search inventory/i)
  await userEvent.type(searchInput, 'house')

  expect(screen.getByText(/house blend/i)).toBeInTheDocument()
  expect(screen.queryByText(/vanilla bean/i)).not.toBeInTheDocument()
})
