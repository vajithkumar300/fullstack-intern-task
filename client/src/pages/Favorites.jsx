import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites, removeFavorite } from '../store/slices/templatesSlice'
import TemplateCard from '../components/TemplateCard'
import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/ProtectedRoute'

export default function FavoritesPage() {
  const dispatch = useDispatch()
  const favorites = useSelector(s => s.templates.favorites)

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [])

  const handleToggle = async (template) => {
    await dispatch(removeFavorite(template._id))
    dispatch(fetchFavorites())
  }

  return (
    <ProtectedRoute>
      {/* <Navbar /> */}
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">My Favorites</h1>
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(t => <TemplateCard key={t._id} template={t} isFavorited={true} onFavoriteToggle={handleToggle} />)}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
