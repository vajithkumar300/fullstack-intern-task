import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTemplates, fetchFavorites, addFavorite, removeFavorite } from '../store/slices/templatesSlice'
import TemplateCard from '../components/TemplateCard'
// import Navbar from '../components/Navbar'

export default function Templates() {
    const dispatch = useDispatch()
    const templates = useSelector(s => s.templates.items)
    const favorites = useSelector(s => s.templates.favorites)
    const user = useSelector(s => s.auth.user)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        dispatch(fetchTemplates())
        if (user) dispatch(fetchFavorites())
    }, [dispatch, user])

    // 🔹 Debounce effect for live search
    useEffect(() => {
        const delay = setTimeout(() => {
            dispatch(fetchTemplates({ search, category }))
        }, 400) // waits 400ms after user stops typing

        return () => clearTimeout(delay)
    }, [search, category, dispatch])

    const isFavorited = (template) => {
        if (!favorites) return false
        return favorites.some(f => (f._id ? f._id === template._id : f === template._id))
    }

    const handleFavoriteToggle = async (template) => {
        if (!user) return alert('Login to favorite templates')
        if (isFavorited(template)) {
            await dispatch(removeFavorite(template._id))
            dispatch(fetchFavorites())
        } else {
            await dispatch(addFavorite(template._id))
            dispatch(fetchFavorites())
        }
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Templates</h1>

                <div className="flex gap-2 mb-6">
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search templates..."
                        className="p-2 border rounded flex-1 bg-transparent"
                    />
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="p-2 border rounded card-bg"
                    >
                        <option value="">All</option>
                        <option value="portfolio">Portfolio</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="saas">SaaS</option>
                        <option value="blog">Blog</option>
                        <option value="dashboard">Dashboard</option>
                    </select>
                </div>
                {templates.length ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map(t => (
                            <TemplateCard
                                key={t._id}
                                template={t}
                                isFavorited={isFavorited(t)}
                                onFavoriteToggle={handleFavoriteToggle}
                            />
                        ))
                        }
                    </div>
                    : <p className=' text-center' >No templates found.</p>}
            </div>
        </>
    )
}
