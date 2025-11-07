// TemplateDetails.jsx
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTemplateById, addFavorite, removeFavorite } from '../store/slices/templatesSlice'
import TemplateCard from '../components/TemplateCard'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function TemplateDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()

    const { currentTemplate, favorites, loading, error } = useSelector(
        state => state.templates
    )

    useEffect(() => {
        if (id) dispatch(fetchTemplateById(id))
    }, [dispatch, id])

    const handleFavoriteToggle = (template, e) => {
        e?.stopPropagation() // prevent card click if button clicked
        const isFavorited = favorites.some(f => f._id === template._id || f === template._id)
        if (isFavorited) {
            dispatch(removeFavorite(template._id))
        } else {
            dispatch(addFavorite(template._id))
        }
    }

    if (loading) return <div className="text-center py-20">Loading...</div>
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>
    if (!currentTemplate?.template) return <div className="text-center py-20">Template not found</div>

    const mainTemplate = currentTemplate.template
    const relatedTemplates = currentTemplate.relatedTemplates || []

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

            {/* Main Template */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card-bg rounded-xl border border-2  p-8 flex flex-col md:flex-row items-center md:items-start gap-8"
            >
                <img
                    src={mainTemplate.thumbnail_url || 'https://via.placeholder.com/600x360'}
                    alt={mainTemplate.name}
                    className="w-full md:w-1/2 rounded-lg shadow-md object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="flex-1 space-y-4">
                    <h1 className="text-4xl font-bold">{mainTemplate.name}</h1>
                    <p className=" text-lg">{mainTemplate.description}</p>
                    <div className="flex items-center gap-4 mt-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                            {mainTemplate.category}
                        </span>
                        <button
                            onClick={(e) => handleFavoriteToggle(mainTemplate, e)}
                            className="px-3 py-1 cursor-pointer rounded text-sm transition-colors border-none"
                        >
                            {favorites.some(f => f._id === mainTemplate._id || f === mainTemplate._id) ? (
                                <Heart className="fill-red-500 text-red-500 size-8" />
                            ) : (
                                <Heart className="text-gray-400 size-8" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Trending / Related Templates */}
            {relatedTemplates.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-3xl font-semibold">Trending Templates</h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex gap-6 overflow-x-auto scrollbar-hide py-4"
                    >
                        {relatedTemplates.map(template => (
                            <motion.div
                                key={template._id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-shrink-0 w-64"
                            >
                                <TemplateCard
                                    template={template}
                                    isFavorited={favorites.some(f => f._id === template._id || f === template._id)}
                                    onFavoriteToggle={handleFavoriteToggle}
                                    small
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )}
        </div>
    )
}
