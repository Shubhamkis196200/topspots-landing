import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function MarketplaceLanding() {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      <main className="relative flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="absolute inset-0 bg-gold-mesh opacity-30 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center max-w-lg mx-auto"
        >
          <div className="w-20 h-20 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-10 h-10 text-gold" />
          </div>

          <span className="text-[11px] font-semibold tracking-widest uppercase text-gold/70 bg-gold/10 px-3 py-1 rounded-full border border-gold/20 mb-6 inline-block">
            Coming Soon
          </span>

          <h1 className="font-display text-4xl sm:text-5xl text-white mt-4 mb-4 leading-tight">
            The TopSpots<br />
            <span className="text-gradient-gold">Marketplace</span>
          </h1>

          <p className="text-white/50 text-base leading-relaxed mb-10">
            Discover top venues, find the best shifts, and connect with the hospitality community. We're building something special.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-gold transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
