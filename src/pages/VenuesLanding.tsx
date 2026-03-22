import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Check, X, Zap, QrCode, BarChart3, Heart, Users, Calendar, TrendingUp, Shield, Globe, Headphones, Sparkles } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
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

// Counter component
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
      <div className="font-mono text-2xl md:text-3xl font-semibold text-gold mb-2">
        {displayValue > 0 ? `${displayValue.toLocaleString()}+` : value}
      </div>
      <p className="text-sm md:text-base text-white/70">{label}</p>
    </motion.div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 bg-charcoal overflow-hidden">
      <div className="absolute inset-0 bg-gold-mesh opacity-60" />
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201, 161, 74, 0.1), transparent)',
          backgroundSize: '200% 200%',
        }}
      />
      <div className="absolute inset-0 grain opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-glow rounded-full border border-gold/30 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gold">The #1 Venue Platform in Poland</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-['Instrument_Serif'] font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Everything your venue needs to <span className="text-gradient-gold">thrive</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Bookings, menus, QR codes, staff profiles, reviews, analytics, and tipping — all in one platform built for modern venues in Poland and Europe.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {['Smart Bookings', 'QR Menus', 'Analytics', 'Tipping'].map((pill, i) => (
                <div key={i} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium text-white/90 backdrop-blur-sm hover:bg-white/15 transition-colors">
                  {pill}
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a
                href="https://topspots.global/apply"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-charcoal font-semibold rounded-xl shadow-xl shadow-gold/30 hover:shadow-gold/50 hover:scale-105 transition-all duration-300"
              >
                Start Free Trial
                <Sparkles className="w-5 h-5" />
              </a>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
              >
                See How It Works
              </button>
            </motion.div>

            <motion.p
              className="text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              30-day free trial · No credit card · Cancel anytime
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl blur-3xl" />
              <div className="glass-card-gold p-8 rounded-2xl backdrop-blur-xl relative z-10">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold text-lg">Today's Overview</h3>
                    <div className="text-2xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">+23%</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { value: '18', label: 'Bookings Today' },
                    { value: '342', label: 'Profile Views', color: 'text-gold' },
                    { value: '4.8★', label: 'Avg Rating' },
                    { value: '+12%', label: 'Revenue' },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className={`text-2xl font-bold mb-1 ${stat.color || 'text-white'}`}>{stat.value}</div>
                      <p className="text-xs text-white/60">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-6 pb-6 border-b border-white/10">
                  <p className="text-xs text-white/60 mb-3">Weekly Bookings</p>
                  <div className="flex items-end justify-between gap-1 h-12">
                    {[40, 65, 45, 78, 92, 55, 70].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-gold to-gold-light rounded-t-sm opacity-80" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-white/60 mb-3">Upcoming Reservations</p>
                  <div className="space-y-2">
                    {[{ name: 'Table 4 - Party of 2', time: '7:30 PM' }, { name: 'Table 2 - Party of 6', time: '8:00 PM' }].map((res, i) => (
                      <div key={i} className="flex items-center justify-between text-sm p-2 bg-white/5 rounded border border-white/10">
                        <p className="text-white font-medium">{res.name}</p>
                        <p className="text-gold font-mono text-xs">{res.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-20 left-12 hidden lg:block"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="glass-card p-4 rounded-lg max-w-xs border border-gold/40"
          >
            <p className="text-sm text-white font-medium"><span className="text-gold">New booking</span> from Anna K.</p>
            <p className="text-xs text-white/60 mt-1">Table 3 • 7:45 PM</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-40 right-12 hidden lg:block"
        >
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="glass-card p-4 rounded-lg max-w-xs border border-gold/40"
          >
            <p className="text-sm text-white font-medium"><span className="text-gold">+25 PLN</span> tip received</p>
            <p className="text-xs text-white/60 mt-1">From anonymous guest</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Social Proof Bar
function SocialProofBar() {
  return (
    <section className="py-12 border-y border-gold/20 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Counter value="340+" label="Premium Venues" />
          <Counter value="25,000+" label="Bookings Managed" />
          <Counter value="4.8" label="Owner Satisfaction" />
          <Counter value="8" label="Languages Supported" />
        </motion.div>
      </div>
    </section>
  )
}

// Venue Types Section
function VenueTypesSection() {
  return (
    <section className="py-20 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-['Instrument_Serif'] font-bold text-charcoal mb-4">
            One platform, every venue type
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
            Whether you run a fine-dining restaurant, trendy bar, cozy cafe, or event space — TopSpots adapts to your needs.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { name: 'Restaurants', desc: 'Fine dining to casual', icon: Sparkles },
            { name: 'Bars & Clubs', desc: 'Cocktail bars to nightclubs', icon: Heart },
            { name: 'Cafes', desc: 'Coffee shops & bakeries', icon: Users },
            { name: 'Events', desc: 'Venues & event spaces', icon: Calendar },
          ].map((type, i) => {
            const Icon = type.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-3d group p-8 bg-surface-elevated rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-300"
              >
                <Icon className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-charcoal mb-2">{type.name}</h3>
                <p className="text-text-muted">{type.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-mesh opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-['Instrument_Serif'] font-bold text-white mb-4">
            Everything your venue needs
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Powerful features built for modern hospitality venues.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              title: 'Venue Profile & Menu',
              desc: 'Rich venue page with photos, gallery, detailed menu items, and your unique story.',
              icon: Users,
              span: 'md:col-span-2',
              tag: 'Core',
            },
            {
              title: 'Smart Booking System',
              desc: 'Customers book online, manage reservations, track parties.',
              icon: Calendar,
              span: '',
              tag: 'Core',
            },
            {
              title: 'QR Code System',
              desc: 'Generate permanent QR codes for menus, reviews, and tipping.',
              icon: QrCode,
              span: '',
              tag: 'Core',
            },
            {
              title: 'Analytics Dashboard',
              desc: 'Track bookings, profile views, revenue trends, and insights.',
              icon: BarChart3,
              span: '',
              tag: 'Growth',
            },
            {
              title: 'Digital Tipping',
              desc: 'Staff earn tips directly via QR codes, cashless and instant.',
              icon: Heart,
              span: '',
              tag: 'Revenue',
            },
            {
              title: 'Staff Management',
              desc: 'Add your team, assign roles, manage schedules professionally.',
              icon: Users,
              span: '',
              tag: 'Core',
            },
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`glass-card-gold p-8 rounded-2xl hover:gold-glow-sm transition-all duration-300 group cursor-pointer ${feature.span || 'md:col-span-1'}`}
              >
                <Icon className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gold-light transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{feature.desc}</p>
                <span className="inline-block px-3 py-1 text-xs font-medium text-gold bg-gold/10 rounded-full">
                  {feature.tag}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// How It Works
function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-['Instrument_Serif'] font-bold text-charcoal mb-4">
            How it works
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
            Get your venue live in three simple steps.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { number: '1', title: 'Apply & Get Approved', desc: 'Submit your venue details. Our team reviews and approves your profile within 24 hours.' },
            { number: '2', title: 'Set Up Your Profile', desc: 'Add photos, menus, staff, and customize your venue page. Generate QR codes for your tables.' },
            { number: '3', title: 'Go Live & Grow', desc: 'Start accepting bookings, collecting reviews, and growing your digital presence.' },
          ].map((step, i) => (
            <motion.div key={i} variants={itemVariants} className="relative">
              {i < 2 && (
                <div className="hidden md:block absolute top-12 -right-2 w-4 h-0.5 bg-gradient-to-r from-gold to-transparent" />
              )}

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-light text-charcoal font-bold text-2xl mb-6 shadow-lg shadow-gold/30">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">{step.title}</h3>
                <p className="text-text-muted leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Why TopSpots
function WhyTopSpotsSection() {
  return (
    <section className="py-20 md:py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-mesh opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-['Instrument_Serif'] font-bold text-white mb-4">
            Why TopSpots
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            The all-in-one platform designed for modern hospitality venues.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { title: 'Built for Poland & Europe', desc: 'Localized for the Polish and European market. Multi-currency, multi-language, local payment methods.', icon: Globe },
            { title: 'All-in-One Platform', desc: 'No more juggling 5 different tools. Everything in one place.', icon: Zap },
            { title: 'Zero Hardware Needed', desc: 'No tablets, no POS integration. Everything works through QR codes.', icon: Shield },
            { title: 'Real-Time Analytics', desc: 'Know exactly how your venue is performing. Track trends and identify opportunities.', icon: TrendingUp },
            { title: 'Staff Empowerment', desc: 'Give your team professional profiles, digital tipping, and performance tracking.', icon: Users },
            { title: 'Dedicated Support', desc: 'Polish and English-speaking support team for onboarding and ongoing help.', icon: Headphones },
          ].map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-card-gold p-8 rounded-2xl hover:gold-glow-sm transition-all duration-300 group"
              >
                <Icon className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-gold-light transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// Pricing Section
function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-['Instrument_Serif'] font-bold text-charcoal mb-4">
            Pricing built for growth
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
            Start free, upgrade as you grow. All plans include a 30-day free trial.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              name: 'Basic',
              price: '99',
              popular: false,
              features: [
                { text: 'Venue profile & menu', included: true },
                { text: 'Up to 50 bookings/month', included: true },
                { text: 'Basic QR codes', included: true },
                { text: 'Up to 5 staff profiles', included: true },
                { text: 'Email support', included: true },
                { text: 'Advanced analytics', included: false },
              ],
            },
            {
              name: 'Pro',
              price: '199',
              popular: true,
              badge: 'Most Popular',
              features: [
                { text: 'Everything in Basic', included: true },
                { text: 'Unlimited bookings', included: true },
                { text: 'Advanced QR codes with analytics', included: true },
                { text: 'Unlimited staff profiles', included: true },
                { text: 'Reviews & ratings', included: true },
                { text: 'Analytics dashboard', included: true },
              ],
            },
            {
              name: 'Pro+',
              price: '399',
              popular: false,
              features: [
                { text: 'Everything in Pro', included: true },
                { text: 'Multi-language menus (8 languages)', included: true },
                { text: 'Loyalty program', included: true },
                { text: 'Advanced analytics & reports', included: true },
                { text: 'Custom branding', included: true },
                { text: 'API access', included: true },
              ],
            },
          ].map((plan, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? 'md:scale-105 border-2 border-gold bg-charcoal-mid'
                  : 'border border-gold/20 bg-surface-elevated'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2 -right-2 px-4 py-1 bg-gradient-to-r from-gold to-gold-light text-charcoal text-xs font-bold rounded-bl-lg">
                  {plan.badge}
                </div>
              )}

              <div className="p-8">
                <h3 className={`text-2xl font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-charcoal'}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className={`text-5xl font-bold font-mono ${plan.popular ? 'text-gold' : 'text-charcoal'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.popular ? 'text-white/70' : 'text-text-muted'}> PLN/mo</span>
                </div>

                <a
                  href="https://topspots.global/apply"
                  className={`block w-full py-3 px-4 rounded-lg font-semibold mb-8 text-center transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-gold to-gold-light text-charcoal hover:shadow-lg hover:shadow-gold/30'
                      : 'border border-gold/30 text-charcoal hover:bg-gold/5'
                  }`}
                >
                  Start Free Trial
                </a>

                <div className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-gold' : 'text-gold'}`} />
                      ) : (
                        <X className="w-5 h-5 flex-shrink-0 text-gray-300 mt-0.5" />
                      )}
                      <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-charcoal/70'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// FAQ Item Component
function FAQItem({ question, answer, index, openFaq, setOpenFaq }: { question: string; answer: string; index: number; openFaq: number | null; setOpenFaq: (i: number | null) => void }) {
  return (
    <motion.div
      variants={itemVariants}
      className="glass-card-gold rounded-lg p-6 cursor-pointer hover:gold-glow-sm transition-all duration-300"
      onClick={() => setOpenFaq(openFaq === index ? null : index)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white pr-4">{question}</h3>
        <motion.div
          animate={{ rotate: openFaq === index ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gold" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: openFaq === index ? 1 : 0, height: openFaq === index ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-white/70 pt-4 leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  )
}

// FAQ Section
function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 md:py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-mesh opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-['Instrument_Serif'] font-bold text-white mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-white/70">
            Everything you need to know about TopSpots for your venue.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { q: 'How long does the approval process take?', a: 'Most venues are approved within 24 hours. We review your submission to ensure quality and accuracy.' },
            { q: 'Do I need any special hardware?', a: 'No. TopSpots works entirely through web browsers and QR codes. No POS integration, tablets, or special equipment needed.' },
            { q: 'Can I customize my venue\'s profile?', a: 'Absolutely. You control your photos, menu, description, opening hours, and more. Your profile is your digital storefront.' },
            { q: 'How does the tipping system work?', a: 'Customers scan a QR code at your venue to tip staff directly. Tips are processed digitally — no cash handling needed.' },
            { q: 'Is there a contract or commitment?', a: 'No long-term contracts. All plans are month-to-month. You can upgrade, downgrade, or cancel anytime.' },
            { q: 'What languages are supported?', a: 'The platform supports 8 languages: English, Polish, Ukrainian, German, Spanish, French, Italian, and Portuguese.' },
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} index={i} openFaq={openFaq} setOpenFaq={setOpenFaq} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-20 md:py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-mesh opacity-50" />
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201, 161, 74, 0.15), transparent)',
          backgroundSize: '200% 200%',
        }}
      />
      <div className="absolute inset-0 grain opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-['Instrument_Serif'] font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to transform your venue?
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Join 340+ premium venues already growing with TopSpots.
        </motion.p>

        <motion.a
          href="https://topspots.global/apply"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-gold to-gold-light text-charcoal font-bold text-lg rounded-xl shadow-xl shadow-gold/30 hover:shadow-gold/50 transition-all duration-300"
        >
          Start Your Free Trial
          <Sparkles className="w-6 h-6" />
        </motion.a>

        <p className="text-white/60 mt-6 text-sm">
          30-day free trial · No credit card · Cancel anytime
        </p>
      </div>
    </section>
  )
}

// Main Page Component
export default function VenuesLanding() {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <VenueTypesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyTopSpotsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  )
}
