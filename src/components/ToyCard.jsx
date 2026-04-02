import React from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, CONDITIONS, UWS_AREAS } from '../data/mockToys'

export default function ToyCard({ toy }) {
  const category = CATEGORIES.find((c) => c.id === toy.category)
  const condition = CONDITIONS.find((c) => c.id === toy.condition)
  const area = UWS_AREAS.find((a) => a.id === toy.area)

  const daysAgo = Math.floor(
    (Date.now() - new Date(toy.postedDate)) / 86400000
  )
  const timeLabel =
    daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo}d ago`

  return (
    <Link to={`/toy/${toy.id}`} className="card group flex flex-col overflow-hidden">
      {/* Emoji banner */}
      <div className="flex h-36 items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 text-7xl select-none">
        {toy.emoji || category?.emoji || '🧸'}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-800 leading-snug group-hover:text-brand-700 transition-colors line-clamp-2">
            {toy.title}
          </h3>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {toy.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
          {/* Condition badge */}
          <span className={`badge ${condition?.color ?? 'bg-gray-100 text-gray-700'}`}>
            {condition?.label ?? toy.condition}
          </span>

          {/* Age range */}
          <span className="badge bg-purple-100 text-purple-700">
            Age {toy.ageMin}–{toy.ageMax}
          </span>

          {/* Category */}
          <span className="badge bg-gray-100 text-gray-600">
            {category?.emoji} {category?.label ?? toy.category}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 text-xs text-gray-400">
          <span>📍 {area?.label ?? toy.area}</span>
          <span>{timeLabel}</span>
        </div>
      </div>

      {/* Claimed overlay */}
      {toy.status === 'claimed' && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-900/50 backdrop-blur-[1px]">
          <span className="rounded-full bg-gray-800 px-4 py-2 text-sm font-bold text-white">Claimed</span>
        </div>
      )}
    </Link>
  )
}
