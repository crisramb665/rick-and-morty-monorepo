/** npm imports */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY = 'favorites'

interface FavoritesContextType {
  favorites: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
}

// Favorites as a context in order to update them across all the app
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

// Favorites stored on Local Storage to avoid data persistance in the db
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) setFavorites(JSON.parse(stored))
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites, loaded])

  const isFavorite = (id: string) => favorites.includes(id)

  const toggleFavorite = (id: string) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>{children}</FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider')
  return context
}
