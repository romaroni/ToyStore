import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToys } from '../context/AppContext'
import { CATEGORIES, CONDITIONS, UWS_AREAS } from '../data/mockToys'

const EMOJI_BY_CATEGORY = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.emoji])
)

export default function GiveToy() {
  const { addToy } = useToys()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    ageMin: '5',
    ageMax: '9',
    area: '',
    street: '',
    posterName: '',
    posterContact: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function validate() {
    const e = {}
    if (!form.title.trim()) e.title = 'Please enter a title.'
    if (!form.description.trim()) e.description = 'Please describe the toy.'
    if (!form.category) e.category = 'Select a category.'
    if (!form.condition) e.condition = 'Select a condition.'
    if (!form.area) e.area = 'Select your area.'
    if (!form.street.trim()) e.street = 'Enter a cross street or intersection.'
    if (!form.posterName.trim()) e.posterName = 'Enter your first name.'
    if (!form.posterContact.trim()) e.posterContact = 'Enter an email or phone.'
    if (parseInt(form.ageMin) > parseInt(form.ageMax))
      e.ageMin = 'Min age must be ≤ max age.'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const id = addToy({
      ...form,
      ageMin: parseInt(form.ageMin),
      ageMax: parseInt(form.ageMax),
      emoji: EMOJI_BY_CATEGORY[form.category] ?? '🧸',
      tags: [],
    })
    setSubmitted(true)
    setTimeout(() => navigate(`/toy/${id}`), 1800)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-display text-3xl text-gray-800 mb-3">Your toy is listed!</h2>
        <p className="text-gray-500">Taking you to the listing…</p>
      </div>
    )
  }

  const Field = ({ id, label, error, children }) => (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-gray-800">Give a Toy</h1>
        <p className="mt-1 text-gray-500">
          Takes about 60 seconds. No account needed — just fill in the details below.
        </p>
      </div>

      {/* Callout */}
      <div className="mb-8 rounded-2xl bg-brand-50 border border-brand-100 p-4 flex gap-3">
        <span className="text-2xl shrink-0">📍</span>
        <div className="text-sm text-brand-800">
          <strong>UWS only:</strong> ToyCircle currently serves families on the Upper West Side
          (W 60th – W 125th, Central Park West to Riverside Drive). Please only list toys
          you can hand off within this area.
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8 flex flex-col gap-6">
        <Field id="title" label="Toy name *" error={errors.title}>
          <input
            id="title"
            type="text"
            placeholder="e.g. LEGO City Police Station"
            value={form.title}
            onChange={set('title')}
            className={`input ${errors.title ? 'border-red-400' : ''}`}
          />
        </Field>

        <Field id="description" label="Description *" error={errors.description}>
          <textarea
            id="description"
            rows={4}
            placeholder="Describe the toy — what's included, what's missing, age it's been used for, any flaws..."
            value={form.description}
            onChange={set('description')}
            className={`input resize-none ${errors.description ? 'border-red-400' : ''}`}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="category" label="Category *" error={errors.category}>
            <select
              id="category"
              value={form.category}
              onChange={set('category')}
              className={`input ${errors.category ? 'border-red-400' : ''}`}
            >
              <option value="">Select category…</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
              ))}
            </select>
          </Field>

          <Field id="condition" label="Condition *" error={errors.condition}>
            <select
              id="condition"
              value={form.condition}
              onChange={set('condition')}
              className={`input ${errors.condition ? 'border-red-400' : ''}`}
            >
              <option value="">Select condition…</option>
              {CONDITIONS.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* Age range */}
        <div>
          <label className="label">Suitable age range *</label>
          <div className="flex items-center gap-3">
            <select
              value={form.ageMin}
              onChange={set('ageMin')}
              className={`input flex-1 ${errors.ageMin ? 'border-red-400' : ''}`}
            >
              {[5,6,7,8,9].map((a) => <option key={a} value={a}>{a} yrs</option>)}
            </select>
            <span className="text-gray-400 shrink-0">to</span>
            <select
              value={form.ageMax}
              onChange={set('ageMax')}
              className="input flex-1"
            >
              {[5,6,7,8,9].map((a) => <option key={a} value={a}>{a} yrs</option>)}
            </select>
          </div>
          {errors.ageMin && <p className="mt-1 text-xs text-red-600">{errors.ageMin}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="area" label="Your area *" error={errors.area}>
            <select
              id="area"
              value={form.area}
              onChange={set('area')}
              className={`input ${errors.area ? 'border-red-400' : ''}`}
            >
              <option value="">Select area…</option>
              {UWS_AREAS.map((a) => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </Field>

          <Field id="street" label="Cross street / intersection *" error={errors.street}>
            <input
              id="street"
              type="text"
              placeholder="e.g. W 79th & Riverside"
              value={form.street}
              onChange={set('street')}
              className={`input ${errors.street ? 'border-red-400' : ''}`}
            />
          </Field>
        </div>

        <hr className="border-gray-100" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="posterName" label="Your first name *" error={errors.posterName}>
            <input
              id="posterName"
              type="text"
              placeholder="e.g. Maria"
              value={form.posterName}
              onChange={set('posterName')}
              className={`input ${errors.posterName ? 'border-red-400' : ''}`}
            />
          </Field>

          <Field id="posterContact" label="Email or phone * (shared only on request)" error={errors.posterContact}>
            <input
              id="posterContact"
              type="text"
              placeholder="email or phone number"
              value={form.posterContact}
              onChange={set('posterContact')}
              className={`input ${errors.posterContact ? 'border-red-400' : ''}`}
            />
          </Field>
        </div>

        <p className="text-xs text-gray-400">
          Your contact info is shown only to families who express interest. ToyCircle never
          sells or shares your data.
        </p>

        <button type="submit" className="btn-warm w-full justify-center text-base py-4">
          List this toy for free →
        </button>
      </form>
    </div>
  )
}
