import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Users, ShoppingBag, ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const cards = [
  {
    to: '/venues',
    icon: Building2,
    label: 'For Venues',
    description: 'Manage staff tips, track performance, and grow your venue with powerful analytics.',
    badge: 'Venue Owners',
    gradient: 'from-gold/20 to-gold/5',
    glowColor: 'rgba(201, 161, 74, 0.25)',
  },
  {
    to: '/staff',
    icon: Users,
    label: 'For Staff',
    description: 'Collect digital tips seamlessly, build your reputation, and maximize your earnings.',
    badge: 'Hospitality Staff',
    gradient: 'from-gold/15 to-gold/5',
    glowColor: 'rgba(201, 161, 74, 0.2)',
  },
  {
    to: '/marketplace',
    icon: ShoppingBag,
    label: 'Marketplace',
    description: 'Discover top venues, find the best shifts, and connect with the hospitality community.',
    badge: 'Coming Soon',
    gradient: 'from-white/5 to-white/2',
    glowColor: 'rgba(255, 255, 255, 0.08)',
  },
]

// Dot pattern background
function DotPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.035]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#C9A14A" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-charcoal relative overflow-hidden flex flex-col items-center justify-center px-4 py-16">
      {/* Background layers */}
      <DotPattern />
      <div className="absolute inset-0 bg-gold-mesh opacity-40 pointer-events-none" />
      <motion.div
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201, 161, 74, 0.07), transparent)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Logo + headline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <Link to="/" className="inline-flex items-center gap-3 group mb-8">
            <img
              src="/topspots-icon-logo.png"
              alt="TopSpots"
              className="h-12 w-12 group-hover:scale-105 transition-transform duration-200"
            />
            <span className="font-display text-2xl font-semibold text-white tracking-tight">
              TopSpots
            </span>
          </Link>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
            The Future of<br />
            <span className="text-gradient-gold">Hospitality</span>
          </h1>
          <p className="text-white/50 text-base sm:text-lg max-w-md mx-auto">
            Choose your experience to get started
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div key={card.to} variants={itemVariants}>
                <Link
                  to={card.to}
                  className="group relative block h-full rounded-2xl overflow-hidden"
                  style={{ perspective: '1000px' }}
                >
                  {/* Card hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      boxShadow: `0 0 60px ${card.glowColor}, 0 0 120px ${card.glowColor}`,
                    }}
                  />

                  {/* Card body */}
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative h-full glass-card bg-gradient-to-br ${card.gradient} border border-white/10 group-hover:border-gold/30 rounded-2xl p-7 flex flex-col gap-5 transition-colors duration-300`}
                  >
                    {/* Badge */}
                    <div className="flex items-start justify-between">
                      <span className="text-[11px] font-semibold tracking-widest uppercase text-gold/70 bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                        {card.badge}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 group-hover:border-gold/30 flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-7 h-7 text-gold/80 group-hover:text-gold transition-colors duration-300" />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h2 className="font-display text-2xl text-white mb-2 group-hover:text-gradient-gold transition-all duration-300">
                        {card.label}
                      </h2>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* CTA arrow */}
                    <div className="flex items-center gap-2 text-gold/60 group-hover:text-gold transition-colors duration-300">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center text-white/20 text-xs mt-12 tracking-widest uppercase"
        >
          TopSpots &mdash; Built for hospitality
        </motion.p>
      </div>
    </div>
  )
}
