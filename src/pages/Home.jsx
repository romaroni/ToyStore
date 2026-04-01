import React from 'react'
import { Link } from 'react-router-dom'
import { useToys } from '../context/AppContext'
import ToyCard from '../components/ToyCard'

const HOW_IT_WORKS = [
  {
    step: '1',
    emoji: '📦',
    title: 'List a toy',
    desc: 'Your kid outgrew it? List it in 60 seconds — no sign-up, no fees.',
  },
  {
    step: '2',
    emoji: '🔍',
    title: 'Browse & discover',
    desc: 'Find toys near you on the Upper West Side, filtered by age and category.',
  },
  {
    step: '3',
    emoji: '🤝',
    title: 'Connect & pick up',
    desc: 'Reach out to the family and arrange a free handoff in the neighborhood.',
  },
]

const STATS = [
  { value: '100%', label: 'Free — always' },
  { value: 'UWS only', label: 'Hyperlocal & safe' },
  { value: '♻️', label: 'Zero waste mission' },
]

export default function Home() {
  const { toys } = useToys()
  const recent = toys.filter((t) => t.status === 'available').slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none text-[180px] leading-none overflow-hidden flex flex-wrap gap-4 p-4">
          {['🧸','🚗','🦕','🧱','🎲','🦸','⚽','🔬','🎭','🧸','🚗','🦕'].map((e, i) => (
            <span key={i} style={{ transform: `rotate(${(i % 3 - 1) * 12}deg)` }}>{e}</span>
          ))}
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
            <span>📍</span> Upper West Side · W60 – W125 · CPW to Riverside
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Give your toys<br />
            <span className="text-brand-200">a second life</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-brand-100 mb-10 leading-relaxed">
            Free toy sharing for UWS families. When your kid ages out of a toy,
            pass it to another kid who'll love it just as much — no cost, no waste.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/browse" className="btn-primary bg-white text-brand-700 hover:bg-brand-50 w-full sm:w-auto justify-center text-base px-8 py-4">
              Browse Toys
            </Link>
            <Link to="/give" className="btn-secondary border-white text-white hover:bg-white/10 w-full sm:w-auto justify-center text-base px-8 py-4">
              Give a Toy
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl sm:text-3xl text-brand-600">{s.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl text-center text-gray-800 mb-2">How it works</h2>
        <p className="text-center text-gray-500 mb-10">Three simple steps to give or get a toy</p>
        <div className="grid gap-6 sm:grid-cols-3">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.step} className="card flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-3xl">
                {step.emoji}
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {step.step}
                </span>
                <h3 className="font-semibold text-gray-800">{step.title}</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent toys */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl text-gray-800">Available now</h2>
              <p className="text-gray-500 mt-1">Free toys waiting for a new home</p>
            </div>
            <Link to="/browse" className="text-sm font-semibold text-brand-700 hover:text-brand-800 hidden sm:block">
              View all →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((toy) => (
              <div key={toy.id} className="relative">
                <ToyCard toy={toy} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/browse" className="btn-secondary text-sm">View all toys →</Link>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <div className="card p-10 bg-gradient-to-br from-warm-50 to-brand-50">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="font-display text-3xl text-gray-800 mb-3">Got a toy to give?</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Listing takes under a minute. No sign-up required. Just post it and connect with a nearby family.
          </p>
          <Link to="/give" className="btn-warm text-base px-8 py-4">
            List a Toy for Free
          </Link>
        </div>
      </section>
    </div>
  )
}
