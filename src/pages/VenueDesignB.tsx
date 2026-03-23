import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  CalendarCheck,
  QrCode,
  BarChart3,
  Wallet,
  Users,
  Star,
  Check,
  X,
  TrendingUp,
  Clock,
  ArrowUpRight,
  AlertTriangle,
  Zap,
  Shield,
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

function AnimatedCounter({
  target,
  duration = 2000,
  prefix = '',
  suffix = '',
}: {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true)
      const startTime = Date.now()
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress >= 1) clearInterval(interval)
      }, 16)
      return () => clearInterval(interval)
    }
  }, [isInView, hasStarted, target, duration])

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

const features = [
  {
    icon: CalendarCheck,
    title: 'Smart Bookings',
    description:
      'Online reservations with real-time availability management. Never double-book again. Automated confirmations and reminders reduce no-shows by 60%.',
    tag: 'Core',
    span: 'col-span-1 md:col-span-2',
  },
  {
    icon: QrCode,
    title: 'QR Code System',
    description:
      'Menus, tips, and reviews from one scan. Modernize the guest experience instantly.',
    tag: 'Core',
    span: 'col-span-1',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Real-time data and trends. Know what works, cut what doesn\'t. Revenue insights at your fingertips.',
    tag: 'Growth',
    span: 'col-span-1',
  },
  {
    icon: Wallet,
    title: 'Digital Tipping',
    description:
      'Cashless tips for your staff. Happier team, lower turnover. Tips increase 3x with digital.',
    tag: 'Revenue',
    span: 'col-span-1',
  },
  {
    icon: Users,
    title: 'Staff Management',
    description:
      'Team profiles, schedules, and performance tracking. Manage your team from one place.',
    tag: 'Core',
    span: 'col-span-1',
  },
  {
    icon: Star,
    title: 'Reviews & Ratings',
    description:
      'Build your reputation and respond to feedback in real time. Aggregate reviews from all platforms and turn guests into advocates.',
    tag: 'Growth',
    span: 'col-span-1 md:col-span-2',
  },
]

const comparisonFeatures = [
  'Online Bookings',
  'QR Menus',
  'Digital Tipping',
  'Staff Profiles',
  'Analytics Dashboard',
  'Multi-Language',
  'Review Management',
  'All-in-One Platform',
]

const comparisonData: Record<string, ('yes' | 'partial' | 'no')[]> = {
  TopSpots: ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'],
  'Traditional Tools': [
    'partial',
    'partial',
    'no',
    'no',
    'partial',
    'no',
    'partial',
    'no',
  ],
  'No System': ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'],
}

const pricingPlans = [
  {
    name: 'Basic',
    price: '99',
    period: '/mo',
    description: 'Essential tools for small venues getting started.',
    cta: 'Start Free Trial',
    href: 'https://topspots.global/apply',
    highlighted: false,
    features: [
      { name: 'Venue Profile', included: true },
      { name: 'QR Code Menu', included: true },
      { name: 'Basic Bookings', included: true },
      { name: 'Digital Tipping', included: true },
      { name: 'Up to 5 Staff', included: true },
      { name: 'Analytics Dashboard', included: false },
      { name: 'Review Management', included: false },
      { name: 'Multi-Language', included: false },
      { name: 'Priority Support', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '199',
    period: '/mo',
    description: 'Everything you need to grow and outperform competitors.',
    cta: 'Start Free Trial',
    href: 'https://topspots.global/apply',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      { name: 'Venue Profile', included: true },
      { name: 'QR Code Menu', included: true },
      { name: 'Advanced Bookings', included: true },
      { name: 'Digital Tipping', included: true },
      { name: 'Up to 20 Staff', included: true },
      { name: 'Analytics Dashboard', included: true },
      { name: 'Review Management', included: true },
      { name: 'Multi-Language', included: true },
      { name: 'Priority Support', included: false },
    ],
  },
  {
    name: 'Pro+',
    price: '399',
    period: '/mo',
    description: 'For ambitious venues that demand the best.',
    cta: 'Contact Sales',
    href: 'https://topspots.global/apply',
    highlighted: false,
    features: [
      { name: 'Venue Profile', included: true },
      { name: 'QR Code Menu', included: true },
      { name: 'Advanced Bookings', included: true },
      { name: 'Digital Tipping', included: true },
      { name: 'Unlimited Staff', included: true },
      { name: 'Analytics Dashboard', included: true },
      { name: 'Review Management', included: true },
      { name: 'Multi-Language', included: true },
      { name: 'Priority Support', included: true },
    ],
  },
]

const stats = [
  {
    label: 'Avg Revenue Increase',
    value: 23,
    suffix: '%',
    prefix: '+',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    label: 'Time Saved Weekly',
    value: 15,
    suffix: ' hrs',
    prefix: '',
    icon: Clock,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    label: 'Bookings Increase',
    value: 40,
    suffix: '%',
    prefix: '+',
    icon: ArrowUpRight,
    color: 'text-gold-dark',
    bg: 'bg-amber-50',
  },
  {
    label: 'Customer Retention',
    value: 35,
    suffix: '%',
    prefix: '+',
    icon: Shield,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
]

export default function VenueDesignB() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#FDFCFA]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/8 border border-gold/15 text-gold-dark text-sm font-medium mb-6">
                  <Zap className="w-4 h-4 text-gold" />
                  340+ venues already growing
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-['Instrument_Serif'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[1.1] mb-6"
              >
                Stop losing revenue to{' '}
                <span className="text-gradient-gold">chaos</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-text-muted leading-relaxed mb-8 max-w-lg"
              >
                Your competitors are already using smart venue management.
                Every day without TopSpots is revenue lost.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 mb-6"
              >
                <a
                  href="https://topspots.global/apply"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-white font-bold rounded-full shadow-lg shadow-gold/20 hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 text-base"
                >
                  Start Free Trial
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 text-charcoal font-semibold rounded-full hover:border-gold/30 hover:shadow-md transition-all duration-200 text-base"
                >
                  See the Difference
                </a>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-sm text-text-muted"
              >
                30-day free trial &middot; No credit card &middot; Cancel
                anytime
              </motion.p>
            </motion.div>

            {/* Right column: Before/After split card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white">
                <div className="grid grid-cols-2 min-h-[380px] md:min-h-[420px]">
                  {/* Without TopSpots */}
                  <div className="bg-gradient-to-br from-red-50 to-white p-6 md:p-8 flex flex-col justify-between border-r border-gray-100">
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
                          Without TopSpots
                        </span>
                      </div>
                      <ul className="space-y-4">
                        {[
                          'Scattered bookings',
                          'Lost tips & revenue',
                          'No analytics',
                          'Manual everything',
                          'Bad reviews pile up',
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-3 text-sm text-charcoal-mid/60"
                          >
                            <X className="w-4 h-4 text-red-400 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 pt-4 border-t border-red-100">
                      <p className="text-red-400 text-xs font-medium">
                        Avg. revenue loss: -18%/year
                      </p>
                    </div>
                  </div>

                  {/* With TopSpots */}
                  <div className="bg-gradient-to-br from-emerald-50 to-white p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <Check className="w-5 h-5 text-emerald-500" />
                        <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">
                          With TopSpots
                        </span>
                      </div>
                      <ul className="space-y-4">
                        {[
                          'Organized dashboard',
                          'Digital tips flowing',
                          'Real-time data',
                          'Automated workflows',
                          'Reputation growing',
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-3 text-sm text-charcoal-mid"
                          >
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 pt-4 border-t border-emerald-100">
                      <p className="text-emerald-600 text-xs font-medium">
                        Avg. revenue gain: +23%/year
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider glow */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-red-200 via-gray-200 to-emerald-200" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* REVENUE COUNTER */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-text-muted text-sm font-semibold uppercase tracking-widest mb-4">
              Revenue generated for our venues
            </p>
            <h2 className="font-['Instrument_Serif'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal mb-4">
              <span className="text-gradient-gold">
                <AnimatedCounter
                  target={250000}
                  duration={2500}
                  suffix="+"
                />
              </span>
            </h2>
            <p className="text-text-muted text-lg mb-2">PLN</p>
            <p className="text-text-muted/60 text-sm">
              and counting...
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-gold/20 hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg} mb-4`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  <AnimatedCounter
                    target={stat.value}
                    duration={2000}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-text-muted text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES SHOWCASE */}
      <section id="features" className="py-20 md:py-28 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold-dark text-sm font-semibold uppercase tracking-widest mb-4">
              Features
            </p>
            <h2 className="font-['Instrument_Serif'] text-3xl sm:text-4xl md:text-5xl text-charcoal mb-4">
              Built for venues that want to{' '}
              <span className="text-gradient-gold">win</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Every tool you need to outperform the competition, in one platform.
            </p>
          </motion.div>

          {/* Bento grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className={`${feature.span} bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-gold/20 hover:shadow-lg transition-all duration-300 group cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/8 group-hover:bg-gold/12 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest ${
                      feature.tag === 'Core'
                        ? 'bg-blue-50 text-blue-600'
                        : feature.tag === 'Growth'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-['Instrument_Serif'] text-xl md:text-2xl text-charcoal mb-3 group-hover:text-gold-dark transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COMPETITOR COMPARISON */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold-dark text-sm font-semibold uppercase tracking-widest mb-4">
              Comparison
            </p>
            <h2 className="font-['Instrument_Serif'] text-3xl sm:text-4xl md:text-5xl text-charcoal mb-4">
              See how TopSpots{' '}
              <span className="text-gradient-gold">compares</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              The all-in-one platform that replaces scattered tools and
              guesswork.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 md:px-6 text-sm font-semibold text-text-muted uppercase tracking-wider">
                    Feature
                  </th>
                  {Object.keys(comparisonData).map((col) => (
                    <th
                      key={col}
                      className={`py-4 px-4 md:px-6 text-center text-sm font-semibold uppercase tracking-wider ${
                        col === 'TopSpots'
                          ? 'text-gold-dark border-x-2 border-t-2 border-gold/20 bg-gold/5 rounded-t-xl'
                          : 'text-text-muted'
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr
                    key={feature}
                    className={
                      i % 2 === 0 ? 'bg-[#F8F9FB]' : 'bg-transparent'
                    }
                  >
                    <td className="py-4 px-4 md:px-6 text-sm font-medium text-charcoal-mid">
                      {feature}
                    </td>
                    {Object.entries(comparisonData).map(([col, values]) => (
                      <td
                        key={`${feature}-${col}`}
                        className={`py-4 px-4 md:px-6 text-center ${
                          col === 'TopSpots'
                            ? 'border-x-2 border-gold/20 bg-gold/5'
                            : ''
                        } ${
                          i === comparisonFeatures.length - 1 && col === 'TopSpots'
                            ? 'border-b-2 border-gold/20 rounded-b-xl'
                            : ''
                        }`}
                      >
                        {values[i] === 'yes' ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-600">
                            <Check className="w-4 h-4" />
                          </span>
                        ) : values[i] === 'partial' ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-50 text-amber-600 text-xs font-bold">
                            ~
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-50 text-red-400">
                            <X className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-28 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold-dark text-sm font-semibold uppercase tracking-widest mb-4">
              Pricing
            </p>
            <h2 className="font-['Instrument_Serif'] text-3xl sm:text-4xl md:text-5xl text-charcoal mb-4">
              Invest in your{' '}
              <span className="text-gradient-gold">growth</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Choose the plan that matches your ambition. All plans include a
              30-day free trial.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                className={`relative bg-white rounded-2xl p-6 md:p-8 border transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-gold/30 shadow-xl'
                    : 'border-gray-100 hover:border-gold/20 hover:shadow-lg'
                }`}
              >
                {plan.highlighted && plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-gold to-gold-light text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-['Instrument_Serif'] text-2xl text-charcoal mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-text-muted text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-charcoal">
                      {plan.price}
                    </span>
                    <span className="text-text-muted text-sm">
                      PLN{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f.name}
                      className="flex items-center gap-3 text-sm"
                    >
                      {f.included ? (
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300 shrink-0" />
                      )}
                      <span
                        className={
                          f.included ? 'text-charcoal-mid' : 'text-gray-300'
                        }
                      >
                        {f.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  className={`block w-full text-center py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-gold to-gold-light text-white shadow-lg shadow-gold/20 hover:shadow-xl'
                      : 'border border-gray-200 text-charcoal-mid hover:border-gold/30 hover:text-gold-dark'
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Instrument_Serif'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
              Your competitors won't wait.{' '}
              <span className="text-gradient-gold">
                Neither should you.
              </span>
            </h2>
            <p className="text-text-muted text-lg md:text-xl mb-10">
              340+ venues are already ahead.
            </p>

            <a
              href="https://topspots.global/apply"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-gold to-gold-light text-white font-bold rounded-full shadow-lg shadow-gold/20 hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 text-lg"
            >
              Start Your Free Trial Now
              <ArrowUpRight className="w-5 h-5" />
            </a>

            <p className="text-text-muted text-sm mt-6">
              30-day free trial &middot; No credit card &middot; Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
