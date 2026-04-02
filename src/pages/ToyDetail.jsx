import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useToys } from '../context/AppContext'
import { CATEGORIES, CONDITIONS, UWS_AREAS } from '../data/mockToys'

export default function ToyDetail() {
  const { id } = useParams()
  const { toys, claimToy } = useToys()
  const navigate = useNavigate()

  const toy = toys.find((t) => t.id === id)

  const [showContact, setShowContact] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [form, setForm] = useState({ name: '', message: '' })
  const [sent, setSent] = useState(false)

  if (!toy) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="font-display text-2xl text-gray-800 mb-3">Toy not found</h2>
        <p className="text-gray-500 mb-6">It may have already been claimed.</p>
        <Link to="/browse" className="btn-primary">Browse available toys</Link>
      </div>
    )
  }

  const category  = CATEGORIES.find((c) => c.id === toy.category)
  const condition = CONDITIONS.find((c) => c.id === toy.condition)
  const area      = UWS_AREAS.find((a) => a.id === toy.area)

  const daysAgo = Math.floor((Date.now() - new Date(toy.postedDate)) / 86400000)
  const timeLabel = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`

  function handleClaim(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    claimToy(toy.id)
    setClaimed(true)
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-1 text-sm text-gray-500 hover:text-brand-700 transition-colors"
      >
        ← Back
      </button>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left: emoji + meta */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Emoji card */}
          <div className="card flex items-center justify-center h-56 bg-gradient-to-br from-brand-50 to-brand-100 text-8xl select-none">
            {toy.emoji || category?.emoji || '🧸'}
          </div>

          {/* Tags */}
          <div className="card p-4 flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Condition</span>
              <span className={`badge ${condition?.color ?? 'bg-gray-100 text-gray-700'}`}>
                {condition?.label ?? toy.condition}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Age range</span>
              <span className="badge bg-purple-100 text-purple-700">
                {toy.ageMin}–{toy.ageMax} years
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Category</span>
              <span className="badge bg-gray-100 text-gray-600">
                {category?.emoji} {category?.label}
              </span>
            </div>
            {toy.pieces && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Pieces</span>
                <span className="font-medium text-gray-700">{toy.pieces}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Location</span>
              <span className="text-gray-700 text-right max-w-[160px]">
                {toy.street}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Area</span>
              <span className="text-gray-700">{area?.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Posted</span>
              <span className="text-gray-700">{timeLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">From</span>
              <span className="font-medium text-gray-700">{toy.posterName}</span>
            </div>
          </div>
        </div>

        {/* Right: details + CTA */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div>
            <h1 className="font-display text-3xl text-gray-800 leading-snug mb-3">
              {toy.title}
            </h1>
            <p className="text-gray-600 leading-relaxed">{toy.description}</p>
          </div>

          {toy.tags && toy.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {toy.tags.map((tag) => (
                <span key={tag} className="badge bg-gray-100 text-gray-600 text-sm px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Status / CTA */}
          {toy.status === 'claimed' || claimed ? (
            <div className="card p-6 bg-gray-50 text-center flex flex-col items-center gap-3">
              <span className="text-4xl">✅</span>
              <h3 className="font-semibold text-gray-700">This toy has been claimed</h3>
              <p className="text-sm text-gray-500">Check out other available toys below.</p>
              <Link to="/browse" className="btn-primary text-sm">Browse more toys</Link>
            </div>
          ) : sent ? (
            <div className="card p-6 bg-brand-50 text-center flex flex-col items-center gap-3">
              <span className="text-4xl">🎉</span>
              <h3 className="font-semibold text-brand-800">Request sent!</h3>
              <p className="text-sm text-brand-700">
                {toy.posterName} will be in touch soon to arrange pickup.
              </p>
            </div>
          ) : !showContact ? (
            <div className="card p-6 bg-brand-50 flex flex-col gap-4">
              <div>
                <h3 className="font-semibold text-brand-800 text-lg">
                  Interested in this toy?
                </h3>
                <p className="text-sm text-brand-700 mt-1">
                  It's completely free — just connect with {toy.posterName} to arrange pickup.
                </p>
              </div>
              <button
                onClick={() => setShowContact(true)}
                className="btn-primary w-full justify-center"
              >
                I want this toy!
              </button>
            </div>
          ) : (
            <div className="card p-6 flex flex-col gap-4">
              <h3 className="font-semibold text-gray-800">Send a message to {toy.posterName}</h3>
              <form onSubmit={handleClaim} className="flex flex-col gap-4">
                <div>
                  <label className="label">Your name *</label>
                  <input
                    type="text"
                    placeholder="Your first name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Message (optional)</label>
                  <textarea
                    rows={3}
                    placeholder={`Hi ${toy.posterName}, I'm interested in the ${toy.title}…`}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="input resize-none"
                  />
                </div>
                {toy.userAdded && toy.posterContact && (
                  <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm text-gray-600">
                    <strong>Contact:</strong> {toy.posterContact}
                  </div>
                )}
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1 justify-center">
                    Send request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContact(false)}
                    className="btn-secondary py-3"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Safety note */}
          <div className="rounded-2xl bg-yellow-50 border border-yellow-100 p-4 text-sm text-yellow-800 flex gap-2">
            <span className="shrink-0">👨‍👩‍👦</span>
            <span>
              <strong>Parent supervision required.</strong> Always arrange pickup in a public place
              or building lobby. Never send payment — all toys on ToyCircle are free.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
