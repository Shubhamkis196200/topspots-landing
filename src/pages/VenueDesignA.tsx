import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  X,
  QrCode,
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
  Globe,
  Headphones,
  Sparkles,
  Eye,
  Star,
  DollarSign,
  Layers,
  Banknote,
  ArrowRight,
  Bell,
  Clock,
  Crown,
  Heart,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function Counter({ value, label }: { value: string; label: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const numValue = parseInt(value.replace(/[^0-9]/g, ''), 10)

  return (
    <motion.div
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        let current = 0
        const increment = Math.ceil(numValue / 30)
        const timer = setInterval(() => {
          current += increment
          if (current >= numValue) {
            setDisplayValue(numValue)
            clearInterval(timer)
          } else {
            setDisplayValue(current)
          }
        }, 20)
      }}
      className="text-center"
    >
      <div className="font-mono text-2xl md:text-3xl font-semibold text-gradient-gold mb-2">
        {displayValue > 0 ? `${displayValue.toLocaleString()}+` : value}
      </div>
      <p className="text-sm md:text-base text-text-muted">{label}</p>
    </motion.div>
  )
}

// HERO SECTION
function HeroSection() {
  const stats = [
    { label: 'Bookings', value: '18' },
    { label: 'Profile Views', value: '342' },
    { label: 'Avg Rating', value: '4.8' },
    { label: 'Revenue', value: '+12%' },
  ]

  const weeklyData = [65, 45, 80, 55, 90, 70, 85]
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const reservations = [
    { name: 'Anna K.', time: '18:00', guests: 4 },
    { name: 'Marek S.', time: '19:30', guests: 2 },
    { name: 'Julia W.', time: '20:00', guests: 6 },
  ]

  return (
    <section className="relative min-h-screen pt-24 pb-16 bg-[#FDFCFA] overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/6 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/8 border border-gold/15 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs font-medium text-gold-dark tracking-wide uppercase">
                The #1 Venue Platform in Poland
              </span>
            </motion.div>

            <h1 className="font-['Instrument_Serif'] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-charcoal leading-[1.1] mb-6">
              Everything your venue needs to{' '}
              <span className="text-gradient-gold">thrive</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-muted leading-relaxed mb-8 max-w-xl">
              Bookings, digital menus, QR ordering, staff management, reviews,
              analytics, and tipping — all in one calm, powerful platform built
              for hospitality.
            </p>

            {/* Value pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Smart Bookings', 'QR Menus', 'Analytics', 'Tipping'].map(
                (pill) => (
                  <span
                    key={pill}
                    className="px-3 py-1.5 rounded-full bg-[#F5F3EF] border border-gray-200 text-sm text-charcoal-mid"
                  >
                    {pill}
                  </span>
                )
              )}
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href="https://topspots.global/apply"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-white font-semibold text-base shadow-lg shadow-gold/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-gray-200 text-charcoal font-medium text-base hover:border-gold/30 hover:shadow-md transition-all duration-300"
              >
                See How It Works
              </a>
            </div>

            <p className="text-sm text-text-muted">
              30-day free trial &middot; No credit card &middot; Cancel anytime
            </p>
          </motion.div>

          {/* Right — Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 relative">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-['Instrument_Serif'] text-xl text-charcoal">
                  Today's Overview
                </h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-600">Live</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#F8F9FB] rounded-xl p-3 border border-gray-100"
                  >
                    <p className="text-xs text-text-muted mb-1">{stat.label}</p>
                    <p className="text-lg font-semibold text-charcoal">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Weekly bookings bar chart */}
              <div className="mb-5">
                <p className="text-xs text-text-muted mb-3">Weekly Bookings</p>
                <div className="flex items-end gap-2 h-20">
                  {weeklyData.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${val}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.08 }}
                        className="w-full rounded-t-md bg-gradient-to-t from-gold/60 to-gold"
                      />
                      <span className="text-[10px] text-text-muted">
                        {days[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming reservations */}
              <div>
                <p className="text-xs text-text-muted mb-2">
                  Upcoming Reservations
                </p>
                <div className="space-y-2">
                  {reservations.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-[#F8F9FB] rounded-lg px-3 py-2 border border-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center text-xs text-gold-dark font-medium">
                          {r.name.charAt(0)}
                        </div>
                        <span className="text-sm text-charcoal-mid">{r.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <span>{r.time}</span>
                        <span>{r.guests} guests</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating notification — new booking */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-2.5 flex items-center gap-2 border border-gray-100 shadow-lg animate-float"
            >
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                <Bell className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-xs font-medium text-charcoal">New Booking</p>
                <p className="text-[10px] text-text-muted">Table for 4 at 20:00</p>
              </div>
            </motion.div>

            {/* Floating notification — tip received */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2.5 flex items-center gap-2 border border-gray-100 shadow-lg animate-float"
              style={{ animationDelay: '1s' }}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-charcoal">Tip Received</p>
                <p className="text-[10px] text-text-muted">25 PLN for Kasia M.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// PAIN POINTS SECTION
function PainPointsSection() {
  const painPoints = [
    {
      icon: Layers,
      title: 'Scattered Systems',
      description:
        'Multiple apps for bookings, menus, and staff scheduling. Hours wasted switching between platforms that don\'t talk to each other.',
      solution:
        'One unified dashboard for every aspect of your venue operations.',
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    {
      icon: Eye,
      title: 'Invisible Online',
      description:
        'No digital presence means missed customers every single day. Lost revenue from people who searched but couldn\'t find you.',
      solution:
        'A premium venue profile that ranks on search and converts browsers into guests.',
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      icon: Banknote,
      title: 'Cash Chaos',
      description:
        'Paper tips, manual revenue tracking, staff frustration over fairness. End-of-month accounting becomes a nightmare.',
      solution:
        'Digital tipping, automated tracking, and transparent staff payouts.',
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium text-gold-dark tracking-wide uppercase mb-3"
          >
            The Problem
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-['Instrument_Serif'] text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4"
          >
            Stop juggling 5 different tools
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Running a venue is hard enough. Your tech stack shouldn't make it
            harder.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {painPoints.map((point) => (
            <motion.div
              key={point.title}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold/20 hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl ${point.bg} flex items-center justify-center mb-4`}
              >
                <point.icon className={`w-6 h-6 ${point.color}`} />
              </div>

              <h3 className="font-['Instrument_Serif'] text-xl text-charcoal mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-5">
                {point.description}
              </p>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-5" />

              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-gold" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gold-dark mb-1">
                    With TopSpots:
                  </p>
                  <p className="text-sm text-charcoal-mid">{point.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// DASHBOARD MOCKUP SECTION
function DashboardSection() {
  const features = [
    { icon: Calendar, label: 'Real-time bookings' },
    { icon: TrendingUp, label: 'Revenue analytics' },
    { icon: Users, label: 'Staff performance' },
    { icon: Heart, label: 'Customer insights' },
  ]

  const chartData = [42, 58, 35, 72, 88, 64, 78]
  const chartDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const statCards = [
    { label: 'Revenue Today', value: '4,280 PLN', change: '+18%' },
    { label: 'Avg. Spend', value: '86 PLN', change: '+5%' },
  ]

  const reservations = [
    { name: 'Tomasz B.', time: '17:30', guests: 3, status: 'Confirmed' },
    { name: 'Ewa P.', time: '18:00', guests: 2, status: 'Confirmed' },
    { name: 'Piotr K.', time: '19:00', guests: 5, status: 'Pending' },
    { name: 'Magda R.', time: '20:30', guests: 4, status: 'Confirmed' },
  ]

  return (
    <section id="dashboard" className="py-24 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p
              variants={itemVariants}
              className="text-sm font-medium text-gold-dark tracking-wide uppercase mb-3"
            >
              Command Center
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-['Instrument_Serif'] text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6 leading-tight"
            >
              Your command center
              <br />
              <span className="text-gradient-gold">for every detail</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-text-muted leading-relaxed mb-8 max-w-md"
            >
              See everything that matters at a glance. From today's bookings to
              this month's revenue trends — all in one place.
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="space-y-4"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.label}
                  variants={itemVariants}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/8 border border-gold/15 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-base text-charcoal-mid font-medium">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-['Instrument_Serif'] text-lg text-charcoal">
                    Dashboard
                  </h3>
                  <p className="text-xs text-text-muted">Saturday, March 23</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-600">Live</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {statCards.map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#F8F9FB] rounded-xl p-3 border border-gray-100"
                  >
                    <p className="text-xs text-text-muted mb-1">{s.label}</p>
                    <div className="flex items-end gap-2">
                      <p className="text-lg font-semibold text-charcoal">
                        {s.value}
                      </p>
                      <span className="text-xs text-emerald-500 mb-0.5">
                        {s.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <p className="text-xs text-text-muted mb-3">
                  Bookings This Week
                </p>
                <div className="flex items-end gap-2 h-24">
                  {chartData.map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.06 }}
                        className="w-full rounded-t-md bg-gradient-to-t from-gold/50 to-gold"
                      />
                      <span className="text-[10px] text-text-muted">
                        {chartDays[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-text-muted mb-2">Reservations</p>
                <div className="space-y-2">
                  {reservations.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-[#F8F9FB] rounded-lg px-3 py-2 border border-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center text-xs text-gold-dark font-medium">
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <span className="text-sm text-charcoal-mid block leading-tight">
                            {r.name}
                          </span>
                          <span className="text-[10px] text-text-muted">
                            {r.guests} guests
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-text-muted">{r.time}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            r.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                              : 'bg-amber-50 text-amber-600 border border-amber-200'
                          }`}
                        >
                          {r.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// SOCIAL PROOF SECTION
function SocialProofSection() {
  const stats = [
    { value: '340+', label: 'Premium Venues' },
    { value: '25000+', label: 'Bookings Managed' },
    { value: '4.8/5', label: 'Owner Satisfaction' },
    { value: '8', label: 'Languages' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-gold-dark tracking-wide uppercase mb-3">
            Trusted by the best
          </p>
          <h2 className="font-['Instrument_Serif'] text-3xl sm:text-4xl text-charcoal">
            Numbers that speak for themselves
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <Counter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}

// PRICING SECTION
interface PricingFeature {
  text: string
  included: boolean
}

interface PricingTier {
  name: string
  price: string
  period: string
  badge?: string
  features: PricingFeature[]
  cta: string
  ctaLink: string
  highlighted: boolean
}

function PricingSection() {
  const tiers: PricingTier[] = [
    {
      name: 'Basic',
      price: '99',
      period: '/mo',
      features: [
        { text: 'Venue profile', included: true },
        { text: 'Up to 50 bookings/mo', included: true },
        { text: 'Basic QR menu', included: true },
        { text: 'Up to 5 staff members', included: true },
        { text: 'Email support', included: true },
        { text: 'Review management', included: false },
        { text: 'Analytics dashboard', included: false },
        { text: 'Custom branding', included: false },
      ],
      cta: 'Start Free Trial',
      ctaLink: 'https://topspots.global/apply',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '199',
      period: '/mo',
      badge: 'Most Popular',
      features: [
        { text: 'Venue profile', included: true },
        { text: 'Unlimited bookings', included: true },
        { text: 'Advanced QR menu', included: true },
        { text: 'Unlimited staff members', included: true },
        { text: 'Priority support', included: true },
        { text: 'Review management', included: true },
        { text: 'Analytics dashboard', included: true },
        { text: 'Custom branding', included: false },
      ],
      cta: 'Start Free Trial',
      ctaLink: 'https://topspots.global/apply',
      highlighted: true,
    },
    {
      name: 'Pro+',
      price: '399',
      period: '/mo',
      features: [
        { text: 'Multi-language support', included: true },
        { text: 'Loyalty programmes', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom branding', included: true },
        { text: 'API access', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Unlimited everything', included: true },
        { text: 'White-label option', included: true },
      ],
      cta: 'Contact Sales',
      ctaLink: 'https://topspots.global/apply',
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium text-gold-dark tracking-wide uppercase mb-3"
          >
            Pricing
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-['Instrument_Serif'] text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4"
          >
            Pricing built for growth
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Start free for 30 days. Scale as your venue grows.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={itemVariants}
              className={`relative rounded-2xl p-6 border transition-shadow duration-300 ${
                tier.highlighted
                  ? 'bg-white border-gold/30 scale-100 md:scale-105 shadow-xl z-10'
                  : 'bg-white border-gray-100 hover:shadow-lg'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-gold to-gold-light text-white text-xs font-semibold">
                    <Crown className="w-3 h-3" />
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className={`${tier.highlighted ? 'pt-2' : ''}`}>
                <h3 className="font-['Instrument_Serif'] text-2xl mb-1 text-charcoal">
                  {tier.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-bold ${tier.highlighted ? 'text-gradient-gold' : 'text-charcoal'}`}>
                    {tier.price}
                  </span>
                  <span className="text-sm text-text-muted">
                    PLN{tier.period}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <div
                      key={feature.text}
                      className="flex items-center gap-2.5"
                    >
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-gold" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <X className="w-3 h-3 text-gray-300" />
                        </div>
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? 'text-charcoal-mid'
                            : 'text-gray-300'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={tier.ctaLink}
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-gold to-gold-light text-white shadow-lg shadow-gold/20 hover:shadow-xl'
                      : 'bg-gold/8 text-gold-dark border border-gold/15 hover:bg-gold/15'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// FINAL CTA SECTION
function FinalCTASection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/8 border border-gold/15 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-medium text-gold-dark tracking-wide uppercase">
              Get Started Today
            </span>
          </div>

          <h2 className="font-['Instrument_Serif'] text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4 leading-tight">
            Ready to transform
            <br />
            <span className="text-gradient-gold">your venue?</span>
          </h2>

          <p className="text-lg text-text-muted mb-8 max-w-lg mx-auto">
            Join 340+ premium venues already using TopSpots to manage bookings,
            delight customers, and grow revenue.
          </p>

          <a
            href="https://topspots.global/apply"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-gold to-gold-light text-white font-semibold text-base shadow-lg shadow-gold/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Start Your Free Trial
            <ArrowRight className="w-4 h-4" />
          </a>

          <p className="text-sm text-text-muted mt-6">
            30-day free trial &middot; No credit card required &middot; Cancel
            anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// MAIN PAGE
export default function VenueDesignA() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <PainPointsSection />
      <DashboardSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </div>
  )
}
