import React, { useState, useMemo } from 'react'
import { useToys } from '../context/AppContext'
import ToyCard from '../components/ToyCard'
import { CATEGORIES, CONDITIONS, UWS_AREAS } from '../data/mockToys'

export default function Browse() {
  const { toys } = useToys()

  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterCondition, setFilterCondition] = useState('')
  const [filterArea, setFilterArea] = useState('')
  const [filterAge, setFilterAge] = useState('')
  const [showClaimed, setShowClaimed] = useState(false)

  const filtered = useMemo(() => {
    return toys.filter((toy) => {
      if (!showClaimed && toy.status === 'claimed') return false
      if (filterCategory && toy.category !== filterCategory) return false
      if (filterCondition && toy.condition !== filterCondition) return false
      if (filterArea && toy.area !== filterArea) return false
      if (filterAge) {
        const age = parseInt(filterAge)
        if (age < toy.ageMin || age > toy.ageMax) return false
      }
      if (search) {
        const q = search.toLowerCase()
        if (
          !toy.title.toLowerCase().includes(q) &&
          !toy.description.toLowerCase().includes(q)
        )
          return false
      }
      return true
    })
  }, [toys, search, filterCategory, filterCondition, filterArea, filterAge, showClaimed])

  const available = filtered.filter((t) => t.status === 'available').length

  function clearFilters() {
    setSearch('')
    setFilterCategory('')
    setFilterCondition('')
    setFilterArea('')
    setFilterAge('')
    setShowClaimed(false)
  }

  const hasFilters = search || filterCategory || filterCondition || filterArea || filterAge

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl text-gray-800">Browse Toys</h1>
        <p className="mt-1 text-gray-500">
          {available} toy{available !== 1 ? 's' : ''} available on the Upper West Side — all free
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search toys..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Category */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="input w-auto min-w-[160px] py-2 text-sm"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
          ))}
        </select>

        {/* Condition */}
        <select
          value={filterCondition}
          onChange={(e) => setFilterCondition(e.target.value)}
          className="input w-auto min-w-[140px] py-2 text-sm"
        >
          <option value="">Any condition</option>
          {CONDITIONS.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>

        {/* Area */}
        <select
          value={filterArea}
          onChange={(e) => setFilterArea(e.target.value)}
          className="input w-auto min-w-[200px] py-2 text-sm"
        >
          <option value="">All UWS areas</option>
          {UWS_AREAS.map((a) => (
            <option key={a.id} value={a.id}>{a.label}</option>
          ))}
        </select>

        {/* Age */}
        <select
          value={filterAge}
          onChange={(e) => setFilterAge(e.target.value)}
          className="input w-auto min-w-[110px] py-2 text-sm"
        >
          <option value="">Any age</option>
          {[5, 6, 7, 8, 9].map((age) => (
            <option key={age} value={age}>Age {age}</option>
          ))}
        </select>

        {/* Show claimed toggle */}
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50">
          <input
            type="checkbox"
            checked={showClaimed}
            onChange={(e) => setShowClaimed(e.target.checked)}
            className="rounded accent-brand-600"
          />
          Show claimed
        </label>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-brand-700 px-3 py-2 font-medium transition-colors"
          >
            Clear filters ×
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center gap-4 py-20 text-center">
          <span className="text-5xl">🔍</span>
          <h3 className="font-semibold text-gray-700">No toys found</h3>
          <p className="text-sm text-gray-400 max-w-xs">
            Try adjusting your filters or check back soon — new toys are listed every day.
          </p>
          <button onClick={clearFilters} className="btn-secondary text-sm">Clear filters</button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((toy) => (
            <div key={toy.id} className="relative">
              <ToyCard toy={toy} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
