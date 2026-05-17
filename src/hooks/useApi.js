import { useCallback, useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export function useApi(resourcePath) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const endpoint = `${API_URL}${resourcePath}`

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`Failed to load ${resourcePath}`)
      }

      const body = await response.json()
      setData(body)
    } catch (fetchError) {
      setError(fetchError)
    } finally {
      setLoading(false)
    }
  }, [endpoint, resourcePath])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const createItem = async (item) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })

    if (!response.ok) {
      throw new Error('Failed to create item')
    }

    const created = await response.json()
    setData((current) => [...current, created])
    return created
  }

  const updateItem = async (id, changes) => {
    const response = await fetch(`${endpoint}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes),
    })

    if (!response.ok) {
      throw new Error('Failed to update item')
    }

    const updated = await response.json()
    setData((current) => current.map((item) => (item.id === id ? updated : item)))
    return updated
  }

  const deleteItem = async (id) => {
    const response = await fetch(`${endpoint}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete item')
    }

    setData((current) => current.filter((item) => item.id !== id))
  }

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    createItem,
    updateItem,
    deleteItem,
  }
}
