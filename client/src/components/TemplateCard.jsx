// TemplateCard.jsx
import React from 'react'
import { Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TemplateCard({
    template,
    isFavorited,
    onFavoriteToggle,
    small = false,
    onClick, // optional click handler
}) {
    const navigate = useNavigate()

    const handleClick = () => {
        if (onClick) {
            onClick(template)
        } else {
            // Default behavior: navigate to template details
            navigate(`/templates/${template._id || template.id}`, { state: { template } })
        }
    }

    return (
        <div
            className={`card-bg border rounded-lg overflow-hidden transition-colors duration-300 shadow-sm hover:shadow-md relative group ${small ? 'w-full' : 'w-full'
                }`}
            style={{ borderStyle: 'solid', borderWidth: '1px', cursor: 'pointer' }}
            onClick={handleClick}
        >
            {/* Thumbnail */}
            <img
                src={template.thumbnail || template.thumbnail_url || 'https://via.placeholder.com/600x360?text=No+Image'}
                alt={template.title || template.name}
                className={`group-hover:scale-110 transition-transform duration-300 overflow-hidden ${small ? 'w-full h-32 object-cover' : 'w-full h-48 object-cover'
                    }`}
            />

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold">{template.title || template.name}</h3>
                <p className="text-sm mt-1 mb-3">{template.description}</p>

                <div className="flex items-center justify-between ">
                    <span className="text-xs px-2 py-1 rounded border">
                        {template.category}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation() // prevent navigating when clicking favorite
                            onFavoriteToggle(template)
                        }}
                        className="px-3 py-1 cursor-pointer rounded text-sm transition-colors border-none"
                    >
                        {isFavorited ? (
                            <Heart className="fill-red-500 text-red-500 size-8" />
                        ) : (
                            <Heart className="text-gray-400 size-8" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
