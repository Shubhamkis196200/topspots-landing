import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isVenues = location.pathname === '/venues'

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
            <img src="/topspots-icon-logo.png" alt="TopSpots" className="h-9 w-9" />
            <img src="/topspots-text-logo.png" alt="TopSpots" className="h-7 hidden sm:block" />
            <span className="px-2.5 py-1 bg-gradient-to-r from-gold to-gold-light rounded-full text-[11px] font-semibold text-white tracking-wide uppercase">
              {isVenues ? 'For Venues' : 'For Staff'}
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollTo('features')} className="text-sm font-medium text-gray-500 hover:text-gold transition-colors">Features</button>
            <button onClick={() => scrollTo('how-it-works')} className="text-sm font-medium text-gray-500 hover:text-gold transition-colors">How It Works</button>
            {isVenues && <button onClick={() => scrollTo('pricing')} className="text-sm font-medium text-gray-500 hover:text-gold transition-colors">Pricing</button>}
            <button onClick={() => scrollTo('faq')} className="text-sm font-medium text-gray-500 hover:text-gold transition-colors">FAQ</button>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => navigate(isVenues ? '/staff' : '/venues')} className="text-sm font-medium text-gray-500 hover:text-gold transition-colors px-3 py-2">
              {isVenues ? 'For Staff' : 'For Venues'}
            </button>
            <a href="https://topspots.global" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2">
              Sign In
            </a>
            <a
              href="https://topspots.global/apply"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold to-gold-light text-white text-sm font-semibold rounded-full shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all hover:scale-[1.02]"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-6 space-y-4">
            <button onClick={() => scrollTo('features')} className="block w-full text-left text-base font-medium text-gray-700 py-2">Features</button>
            <button onClick={() => scrollTo('how-it-works')} className="block w-full text-left text-base font-medium text-gray-700 py-2">How It Works</button>
            {isVenues && <button onClick={() => scrollTo('pricing')} className="block w-full text-left text-base font-medium text-gray-700 py-2">Pricing</button>}
            <button onClick={() => scrollTo('faq')} className="block w-full text-left text-base font-medium text-gray-700 py-2">FAQ</button>
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <button onClick={() => { navigate(isVenues ? '/staff' : '/venues'); setIsOpen(false) }} className="block w-full text-left text-base font-medium text-gold py-2">
                {isVenues ? 'For Staff →' : 'For Venues →'}
              </button>
              <a href="https://topspots.global/apply" className="block w-full text-center px-5 py-3 bg-gradient-to-r from-gold to-gold-light text-white font-semibold rounded-xl">
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
