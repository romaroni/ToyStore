import React from 'react'
import { Link } from 'react-router-dom'

const VALUES = [
  {
    emoji: '♻️',
    title: 'Circular Economy',
    desc: 'Every toy re-homed is one fewer toy in a landfill. Kids grow fast — their toys shouldn\'t go to waste.',
  },
  {
    emoji: '🏘️',
    title: 'Hyperlocal & Safe',
    desc: 'Only Upper West Side families. Pickups within walking distance, between neighbors who share a community.',
  },
  {
    emoji: '💚',
    title: 'Always Free',
    desc: 'No fees, no subscriptions, no ads. ToyCircle is a community project, not a marketplace.',
  },
  {
    emoji: '👶',
    title: 'Made for Kids 5–9',
    desc: 'Focused on the years when kids go through toys the fastest — and when quality pre-loved toys matter most.',
  },
]

const BOUNDARIES = [
  { dir: 'North', val: 'W 125th Street' },
  { dir: 'South', val: 'W 60th Street' },
  { dir: 'East',  val: 'Central Park West' },
  { dir: 'West',  val: 'Riverside Drive' },
]

const AREAS = [
  { name: 'Lincoln Square',      range: '60s – 70s' },
  { name: 'Central UWS',         range: '70s – 80s' },
  { name: 'Upper UWS',           range: '80s – 100s' },
  { name: 'Morningside Heights', range: '100s – 125th' },
]

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="text-6xl mb-4">🧸</div>
        <h1 className="font-display text-4xl sm:text-5xl text-gray-800 mb-4">About ToyCircle UWS</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          A free, neighbor-to-neighbor toy sharing service for Upper West Side families.
          When a toy has run its course in one home, it finds a new life in another.
        </p>
      </div>

      {/* Values */}
      <section className="mb-14">
        <h2 className="font-display text-2xl text-gray-800 text-center mb-6">Our values</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="card p-6 flex gap-4">
              <div className="text-3xl shrink-0">{v.emoji}</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service area */}
      <section className="mb-14">
        <h2 className="font-display text-2xl text-gray-800 text-center mb-6">Service area</h2>
        <div className="card p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-3xl shrink-0">📍</span>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Upper West Side, Manhattan</h3>
              <p className="text-sm text-gray-500">
                ToyCircle is currently available exclusively to families on the Upper West Side.
                This intentionally hyperlocal focus keeps pickups easy, safe, and within walking
                distance for most families.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 mb-6">
            {BOUNDARIES.map((b) => (
              <div key={b.dir} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{b.dir}</span>
                <span className="text-sm font-semibold text-gray-700">{b.val}</span>
              </div>
            ))}
          </div>

          <h4 className="text-sm font-semibold text-gray-600 mb-3">Neighborhoods covered</h4>
          <div className="grid gap-2 sm:grid-cols-2">
            {AREAS.map((a) => (
              <div key={a.name} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0"></span>
                <span className="font-medium">{a.name}</span>
                <span className="text-gray-400">({a.range})</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-brand-50 border border-brand-100 p-3 text-sm text-brand-700">
            ✨ More NYC neighborhoods coming soon — stay tuned!
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-14">
        <h2 className="font-display text-2xl text-gray-800 text-center mb-6">FAQ</h2>
        <div className="flex flex-col gap-4">
          {[
            {
              q: 'Is this really free?',
              a: 'Yes — completely free, forever. Toys are given, not sold. ToyCircle has no fees, no tips, no premium tier.',
            },
            {
              q: 'Do I need to create an account?',
              a: 'No sign-up required. Just fill in the form and list your toy. We keep things simple.',
            },
            {
              q: 'How do I arrange pickup?',
              a: 'Once you express interest in a toy, you\'ll connect directly with the giver. We recommend meeting in a lobby, doorstep, or nearby park.',
            },
            {
              q: 'What if a toy is in poor condition?',
              a: 'Honesty is key — describe the condition accurately. "Fair" condition toys are welcome as long as they\'re safe and still fun.',
            },
            {
              q: 'Is it just for boys?',
              a: 'The initial focus is toys suited for boys 5–9 (action figures, cars, LEGO, dinos, etc.) but any child who loves those toys is welcome!',
            },
            {
              q: 'What about safety?',
              a: 'Always have a parent arrange and supervise pickup. Never send money — all toys are free. Meet in public spaces.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="card p-5">
              <h3 className="font-semibold text-gray-800 mb-1.5">Q: {q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">A: {a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="card p-10 text-center bg-gradient-to-br from-brand-50 to-warm-50">
        <div className="text-4xl mb-3">🚀</div>
        <h2 className="font-display text-2xl text-gray-800 mb-3">Ready to join?</h2>
        <p className="text-gray-500 mb-6">Browse free toys near you, or give one a new home today.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/browse" className="btn-primary justify-center">Browse Toys</Link>
          <Link to="/give" className="btn-secondary justify-center">Give a Toy</Link>
        </div>
      </div>
    </div>
  )
}
