import { createContext, useContext } from 'react'
import { useApi } from '../hooks/useApi'

const ProductsContext = createContext({})

export function ProductsProvider({ children }) {
  const productsApi = useApi('/products')
  const storeApi = useApi('/store_info')

  return (
    <ProductsContext.Provider
      value={{
        products: productsApi.data,
        productLoading: productsApi.loading || storeApi.loading,
        productError: productsApi.error || storeApi.error,
        createProduct: productsApi.createItem,
        updateProduct: productsApi.updateItem,
        deleteProduct: productsApi.deleteItem,
        refreshProducts: productsApi.refetch,
        storeInfo: storeApi.data[0] ?? null,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductsContext)
}
