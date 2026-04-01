import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive
        ? 'text-brand-700'
        : 'text-gray-600 hover:text-brand-700'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none" onClick={() => setMenuOpen(false)}>
          <span className="text-2xl">🧸</span>
          <div className="leading-tight">
            <span className="font-display text-xl text-brand-700 tracking-wide">ToyCircle</span>
            <span className="ml-1.5 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-bold text-brand-700">UWS</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:flex">
          <NavLink to="/browse" className={navLinkClass}>Browse Toys</NavLink>
          <NavLink to="/give" className={navLinkClass}>Give a Toy</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <button
            onClick={() => navigate('/give')}
            className="btn-primary text-sm py-2 px-5"
          >
            + List a Toy
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 sm:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            <NavLink to="/browse" className={navLinkClass} onClick={() => setMenuOpen(false)}>Browse Toys</NavLink>
            <NavLink to="/give" className={navLinkClass} onClick={() => setMenuOpen(false)}>Give a Toy</NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
            <button
              onClick={() => { navigate('/give'); setMenuOpen(false) }}
              className="btn-primary mt-1 w-full justify-center text-sm"
            >
              + List a Toy
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
