import { Heart } from 'lucide-react'
import React from 'react'

export default function TemplateCard({ template, isFavorited, onFavoriteToggle, small = false }) {
  return (
    <div
      className="card-bg border rounded-lg overflow-hidden transition-colors duration-300 shadow-sm hover:shadow-md relative group"
      style={{ borderStyle: 'solid', borderWidth: '1px' }}
    >
        
      <img
        src={template.thumbnail_url || 'https://via.placeholder.com/600x360?text=No+Image'}
        alt={template.name}
        className={` group-hover:scale-110 transition-transform duration-300 overflow-hidden ${small ? 'w-full h-32 object-cover' : 'w-full h-48 object-cover'}`}
      />
      <div className="p-4">
        <h3 className="font-semibold bg-ard">{template.name}</h3>
        <p className="text-sm mt-1 mb-3  bg-card">{template.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--card-border)',  }}>
            {template.category}
          </span>
          <button
            onClick={() => onFavoriteToggle(template)}
            className={`px-3 py-1 cursor-pointer rounded text-sm transition-colors border-none`}
          >
            
            
            {isFavorited ? <Heart className='fill-red-500 border-red-500 border-none text-red-500 size-8' /> : <Heart className='text-4xl size-8' />}
          </button>
        </div>
      </div>
    </div>
  )
}
