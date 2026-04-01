import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🧸</span>
              <span className="font-display text-xl text-brand-700">ToyCircle UWS</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Keeping toys in play and out of landfill — one Upper West Side family at a time.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/browse" className="hover:text-brand-700 transition-colors">Browse Available Toys</Link></li>
              <li><Link to="/give" className="hover:text-brand-700 transition-colors">Give a Toy</Link></li>
              <li><Link to="/about" className="hover:text-brand-700 transition-colors">About ToyCircle</Link></li>
            </ul>
          </div>

          {/* Area info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Service Area</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Currently serving the <strong className="text-gray-700">Upper West Side</strong> of Manhattan:
            </p>
            <ul className="mt-2 space-y-1 text-xs text-gray-400">
              <li>• W 60th St to W 125th St</li>
              <li>• Central Park West to Riverside Drive</li>
            </ul>
            <p className="mt-3 text-xs text-gray-400">
              More neighborhoods coming soon!
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ToyCircle UWS. A community project. Free forever.
          </p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <span>♻️</span> Circular economy for the next generation
          </p>
        </div>
      </div>
    </footer>
  )
}
