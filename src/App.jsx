import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import GiveToy from './pages/GiveToy'
import ToyDetail from './pages/ToyDetail'
import About from './pages/About'

export default function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/browse"   element={<Browse />} />
            <Route path="/give"     element={<GiveToy />} />
            <Route path="/toy/:id"  element={<ToyDetail />} />
            <Route path="/about"    element={<About />} />
            <Route path="*"         element={
              <div className="mx-auto max-w-xl px-4 py-24 text-center">
                <div className="text-5xl mb-4">🧸</div>
                <h2 className="font-display text-2xl text-gray-800 mb-3">Page not found</h2>
                <a href="/" className="btn-primary inline-flex">Go home</a>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}
