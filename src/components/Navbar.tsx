'use client'

import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const isVenues = location.pathname === '/venues'

  // Detect scroll for glass morphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const navLinks = [
    { label: 'Features', href: 'features' },
    { label: 'How It Works', href: 'how-it-works' },
    ...(isVenues ? [{ label: 'Pricing', href: 'pricing' }] : []),
    { label: 'FAQ', href: 'faq' },
  ]

  return (
    <>
      {/* Fixed Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-card bg-charcoal/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo + Context Badge */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group"
            >
              <img
                src="/topspots-icon-logo.png"
                alt="TopSpots"
                className="h-8 w-8 sm:h-9 sm:w-9 group-hover:scale-110 transition-transform duration-200"
              />
              <span className="hidden sm:inline font-display text-lg font-semibold text-white">
                TopSpots
              </span>
              <span className="px-2.5 py-1 bg-gradient-to-r from-gold to-gold-light rounded-full text-[10px] sm:text-[11px] font-semibold text-white tracking-widest uppercase shadow-lg shadow-gold/20">
                {isVenues ? 'For Venues' : 'For Staff'}
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isScrolled
                      ? 'text-white/60 hover:text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to={isVenues ? '/staff' : '/venues'}
                className={`text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg ${
                  isScrolled
                    ? 'text-white/60 hover:text-gold'
                    : 'text-white/60 hover:text-gold'
                }`}
              >
                {isVenues ? 'For Staff' : 'For Venues'}
              </Link>

              <a
                href="https://topspots.global/login"
                className={`text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg ${
                  isScrolled
                    ? 'text-white/60 hover:text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Sign In
              </a>

              <a
                href="https://topspots.global/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold to-gold-light text-charcoal text-sm font-semibold rounded-full shadow-lg shadow-gold/30 hover:shadow-gold/50 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            {/* Mobile Menu Button + Get Started */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="https://topspots.global/register"
                className="px-3 py-2 bg-gradient-to-r from-gold to-gold-light text-charcoal text-xs sm:text-sm font-semibold rounded-full shadow-lg shadow-gold/30 hover:shadow-gold/50 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Get Started
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isScrolled
                    ? 'hover:bg-white/10'
                    : 'hover:bg-white/10'
                }`}
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 top-18"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative glass-card bg-charcoal/90 border-b border-white/10"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-1">
                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="w-full text-left px-4 py-3 text-base font-medium text-white/60 hover:text-gold hover:bg-white/5 rounded-lg transition-all duration-200"
                  >
                    {link.label}
                  </button>
                ))}

                <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
                  {/* Cross-link */}
                  <Link
                    to={isVenues ? '/staff' : '/venues'}
                    className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gold hover:bg-gold/10 rounded-lg transition-all duration-200"
                  >
                    {isVenues ? 'For Staff →' : 'For Venues →'}
                  </Link>

                  {/* Sign In */}
                  <a
                    href="https://topspots.global/login"
                    className="block px-4 py-3 text-base font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar Spacer */}
      <div className="h-18" />
    </>
  )
}
