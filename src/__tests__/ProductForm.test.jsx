import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import ProductForm from '../components/ProductForm'

const createProductMock = vi.fn(() => Promise.resolve({ id: 4 }))

vi.mock('../context/ProductsContext', () => ({
  useProducts: () => ({
    createProduct: createProductMock,
  }),
}))

test('submits a new product and calls createProduct', async () => {
  render(
    <MemoryRouter>
      <ProductForm />
    </MemoryRouter>,
  )

  await userEvent.type(screen.getByLabelText(/product name/i), 'Citrus Roast')
  await userEvent.type(screen.getByLabelText(/origin/i), 'Ethiopia')
  await userEvent.type(screen.getByLabelText(/description/i), 'Bright espresso with citrus notes')
  await userEvent.type(screen.getByLabelText(/price/i), '14.50')

  await userEvent.click(screen.getByRole('button', { name: /save product/i }))

  await waitFor(() => {
    expect(createProductMock).toHaveBeenCalledWith({
      name: 'Citrus Roast',
      origin: 'Ethiopia',
      description: 'Bright espresso with citrus notes',
      price: 14.5,
    })
  })
})
