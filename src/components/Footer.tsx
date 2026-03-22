import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-charcoal text-white overflow-hidden">
      {/* Gold Top Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-16 md:py-20">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative group">
                <img
                  src="/topspots-icon-logo.png"
                  alt="TopSpots"
                  className="h-8 w-8 group-hover:scale-110 transition-transform duration-200"
                />
                <div className="absolute inset-0 rounded-lg bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-lg" />
              </div>
              <span className="font-display text-lg font-semibold text-gold/90 group-hover:text-gold transition-colors duration-200">
                TopSpots
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              The venue management platform for modern hospitality
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/90 mb-6">
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  FAQ
                </button>
              </li>
              <li>
                <a
                  href="https://topspots.global/login"
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  Sign In
                </a>
              </li>
              <li>
                <a
                  href="https://topspots.global/register"
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/90 mb-6">
              Solutions
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/venues"
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  For Venues
                </Link>
              </li>
              <li>
                <Link
                  to="/staff"
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  For Staff
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sm text-white/40">Marketplace</span>
                <span className="inline-block px-2 py-0.5 bg-gold/15 text-gold text-[10px] font-semibold rounded-full uppercase tracking-widest">
                  Soon
                </span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/90 mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://topspots.global/privacy"
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://topspots.global/terms"
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://topspots.global/cookies"
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {currentYear} TopSpots. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>Powered by</span>
            <a
              href="https://adlytica.com"
              className="text-gold/90 hover:text-gold transition-colors duration-200 font-semibold"
            >
              Adlytica
            </a>
          </div>
        </div>
      </div>

      {/* Ambient Gold Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl opacity-20" />
      </div>
    </footer>
  )
}
