import React, { createContext, useContext, useEffect, useState } from 'react'
import { MOCK_TOYS } from '../data/mockToys'

const AppContext = createContext(null)

const STORAGE_KEY = 'toycircle_toys'

export function AppProvider({ children }) {
  const [toys, setToys] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Merge: keep mock toys that haven't been removed, plus user-added ones
        const userToys = parsed.filter((t) => t.userAdded)
        return [...MOCK_TOYS, ...userToys]
      }
    } catch {
      // ignore
    }
    return MOCK_TOYS
  })

  useEffect(() => {
    const userToys = toys.filter((t) => t.userAdded)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userToys))
  }, [toys])

  function addToy(toy) {
    const newToy = {
      ...toy,
      id: `user-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'available',
      userAdded: true,
    }
    setToys((prev) => [newToy, ...prev])
    return newToy.id
  }

  function claimToy(id) {
    setToys((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'claimed' } : t))
    )
  }

  return (
    <AppContext.Provider value={{ toys, addToy, claimToy }}>
      {children}
    </AppContext.Provider>
  )
}

export function useToys() {
  return useContext(AppContext)
}
