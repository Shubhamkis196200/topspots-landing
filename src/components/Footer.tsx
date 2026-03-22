import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/topspots-icon-logo.png" alt="TopSpots" className="h-8 w-8" />
              <span className="text-lg font-bold">TopSpots</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The venue management platform for bookings, menus, staff, and analytics.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Platform</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => scrollTo('features')} className="text-sm text-gray-400 hover:text-gold transition-colors">Features</button></li>
              <li><button onClick={() => scrollTo('pricing')} className="text-sm text-gray-400 hover:text-gold transition-colors">Pricing</button></li>
              <li><button onClick={() => scrollTo('how-it-works')} className="text-sm text-gray-400 hover:text-gold transition-colors">How It Works</button></li>
              <li><button onClick={() => scrollTo('faq')} className="text-sm text-gray-400 hover:text-gold transition-colors">FAQ</button></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Solutions</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => navigate('/venues')} className="text-sm text-gray-400 hover:text-gold transition-colors">For Venues</button></li>
              <li><button onClick={() => navigate('/staff')} className="text-sm text-gray-400 hover:text-gold transition-colors">For Staff</button></li>
              <li><span className="text-sm text-gray-500">Marketplace <span className="text-[10px] px-1.5 py-0.5 bg-gold/20 text-gold rounded-full ml-1">Soon</span></span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="https://topspots.global/privacy" className="text-sm text-gray-400 hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="https://topspots.global/terms" className="text-sm text-gray-400 hover:text-gold transition-colors">Terms of Service</a></li>
              <li><a href="mailto:hello@topspots.global" className="text-sm text-gray-400 hover:text-gold transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} TopSpots. All rights reserved.</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>Powered by</span>
            <a href="https://adlytica.com" className="text-gold hover:text-gold-light transition-colors font-medium">Adlytica</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
