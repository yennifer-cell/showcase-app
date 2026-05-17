import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import ProductDetails from '../components/ProductDetails'

const updateProductMock = vi.fn(() => Promise.resolve({ id: 1 }))
const deleteProductMock = vi.fn(() => Promise.resolve())
const stableProducts = [
  {
    id: 1,
    name: 'Vanilla Bean',
    description: 'Medium roast with warm vanilla notes',
    origin: 'Colombia',
    price: 10.0,
  },
]

vi.mock('../context/ProductsContext', () => ({
  useProducts: () => ({
    products: stableProducts,
    productLoading: false,
    updateProduct: updateProductMock,
    deleteProduct: deleteProductMock,
  }),
}))

test('updates an existing product price and origin', async () => {
  render(
    <MemoryRouter initialEntries={['/product/1']}>
      <Routes>
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </MemoryRouter>,
  )

  const priceInput = screen.getByLabelText(/price \(usd\)/i)
  const originInput = screen.getByLabelText(/origin/i)
  const saveButton = screen.getByRole('button', { name: /save changes/i })

  fireEvent.change(priceInput, { target: { value: '11.25' } })
  fireEvent.change(originInput, { target: { value: 'Brazil' } })
  await userEvent.click(saveButton)

  await waitFor(() => {
    expect(updateProductMock).toHaveBeenCalledWith(1, {
      price: 11.25,
      origin: 'Brazil',
      description: 'Medium roast with warm vanilla notes',
    })
  })
})
