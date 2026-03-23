import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import {
  ArrowRight, Star, CheckCircle2, Sparkles, Wallet,
  UserCircle, TrendingUp, QrCode, Clock, Bell,
  Globe, BadgeCheck, Briefcase, Quote
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ── Animation variants ──────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

// ── Animated counter component ──────────────────────────────────────

function AnimatedCounter({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toLocaleString())
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          animate(count, target, { duration: 2, ease: [0.22, 1, 0.36, 1] })
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [count, target])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  )
}

// ── Main component ──────────────────────────────────────────────────

export default function StaffDesignA() {
  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[#0D0D0F]" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute inset-0 bg-gold-mesh" />
        <div className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-gold via-gold-light to-transparent opacity-5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-gold-light to-transparent opacity-4 blur-[100px]" />
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left -- Copy */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
              <motion.div variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 px-4 py-2.5 glass-card-gold rounded-full">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-gold">The future of hospitality careers</span>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1}
                className="text-5xl md:text-7xl font-['Instrument_Serif'] font-bold text-white mb-6 leading-tight">
                Your talent deserves
                <br />
                to be <span className="text-gradient-gold">seen</span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2}
                className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-lg">
                Whether you're a bartender crafting cocktails, a chef plating art, or a waiter delivering unforgettable experiences — it's time the world sees what you bring to the table.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="https://topspots.global/staff/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-charcoal text-base font-semibold rounded-xl shadow-xl shadow-gold/30 hover:shadow-2xl hover:scale-[1.02] transition-all">
                  Create Your Profile <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 glass-card text-white text-base font-semibold rounded-xl border border-white/10 hover:border-gold/20 transition-all">
                  See How It Works
                </a>
              </motion.div>

              <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-4 text-sm text-white/40 pt-2">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> 100% Free</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> No hidden fees</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Setup in 2 min</span>
              </motion.div>
            </motion.div>

            {/* Right -- Floating Profile Card */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block">
              <div className="glass-card rounded-3xl p-8 card-3d">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                  {/* Cover */}
                  <div className="h-28 bg-gradient-to-r from-gold via-gold-light to-gold relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                      backgroundSize: '24px 24px'
                    }} />
                    <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white flex items-center gap-1.5 border border-white/30">
                      <BadgeCheck className="w-3.5 h-3.5" /> PRO
                    </div>
                  </div>

                  <div className="px-6 pb-6 -mt-10 relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full border-4 border-white mb-4 flex items-center justify-center shadow-lg">
                      <Briefcase className="w-8 h-8 text-gray-400" />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-xl font-bold text-gray-900">Anna Kowalska</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 font-medium">Senior Bartender</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-sm font-bold text-gray-900 ml-1">4.9</span>
                      <span className="text-xs text-gray-400">(127 reviews)</span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Mixology', 'Wine Service', 'Craft Cocktails', 'POS Systems'].map((s) => (
                        <span key={s} className="text-xs font-medium px-3 py-1.5 bg-gradient-to-r from-gold/10 to-gold/5 text-[#A8843A] rounded-full border border-gold/20">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <Globe className="w-4 h-4 text-[#A8843A]" />
                      <span>English, Polish, German</span>
                    </div>
                  </div>
                </div>

                {/* QR hint */}
                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/40">
                  <QrCode className="w-4 h-4" />
                  <span>Scannable QR code for tips</span>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 -right-8 bg-white rounded-xl shadow-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 min-w-max">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">+25 PLN tip</p>
                    <p className="text-[10px] text-gray-400">from Table 7</p>
                  </div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
                className="absolute -bottom-12 -left-8 bg-white rounded-xl shadow-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 min-w-max">
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">New 5-star review!</p>
                    <p className="text-[10px] text-gray-400">"Exceptional service!"</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 3 ASPIRATION CARDS ═══════════════ */}
      <section id="how-it-works" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/3 via-transparent to-gold/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-20">
            <span className="inline-block px-4 py-2 glass-card-gold rounded-full text-xs font-semibold text-gold mb-4 uppercase tracking-wider">Your Path Forward</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-['Instrument_Serif'] leading-[1.1] text-white mb-4">
              Unlock your <span className="text-gradient-gold">potential</span>
            </h2>
            <p className="text-lg text-white/60 mt-6 max-w-2xl mx-auto leading-relaxed">
              TopSpots gives hospitality professionals the tools to build a brand, earn more, and grow a career that lasts.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: UserCircle,
                title: 'Build Your Brand',
                desc: 'Create a professional profile that works like a digital resume. Showcase your skills, certifications, and experience. Get discovered by top venues looking for talent like you.',
                gradient: 'from-blue-500 to-indigo-600'
              },
              {
                icon: Wallet,
                title: 'Earn More',
                desc: 'Receive digital tips via your personal QR code — cashless, instant, transparent. Track your earnings in real time and watch your income grow week over week.',
                gradient: 'from-gold to-gold-light'
              },
              {
                icon: TrendingUp,
                title: 'Grow Your Career',
                desc: 'Customer reviews build your professional reputation. Higher ratings mean more visibility. Career marketplace access coming soon — be first in line.',
                gradient: 'from-emerald-500 to-teal-600'
              },
            ].map((card) => (
              <motion.div key={card.title} variants={itemVariants}
                className="group glass-card-gold rounded-2xl p-10 border border-gold/10 hover:border-gold/30 transition-all duration-300 card-3d relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-gold/5 to-transparent" />

                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                  <p className="text-base text-white/60 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ APP MOCKUP ═══════════════ */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-transparent via-white/2 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left -- Copy */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="inline-block px-4 py-2 glass-card-gold rounded-full text-xs font-semibold text-gold mb-6 uppercase tracking-wider">Your Dashboard</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-['Instrument_Serif'] leading-[1.1] text-white mb-6">
                Your professional
                <br />
                <span className="text-gradient-gold">command center</span>
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg">
                Everything you need to manage your hospitality career in one place. Track tips, monitor reviews, view your schedule, and stay on top of every opportunity.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  'Real-time tip tracking and earnings analytics',
                  'Customer reviews and rating trends',
                  'Shift schedule at a glance',
                  'Activity feed for new opportunities',
                  'Professional profile management',
                ].map((item) => (
                  <motion.div key={item} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/80 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
              <a href="https://topspots.global/staff/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-charcoal font-semibold rounded-xl shadow-xl shadow-gold/30 hover:shadow-2xl hover:scale-[1.02] transition-all">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Right -- App Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="glass-card rounded-3xl p-6 lg:p-8 card-3d">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Rating', value: '4.9', icon: Star, color: 'text-amber-400' },
                    { label: 'Tips (PLN)', value: '2,450', icon: Wallet, color: 'text-emerald-400' },
                    { label: 'Reviews', value: '127', icon: BadgeCheck, color: 'text-blue-400' },
                  ].map((stat) => (
                    <div key={stat.label} className="glass-card rounded-xl p-4 text-center border border-white/5">
                      <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-[11px] text-white/40 mt-1 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Shift Schedule */}
                <div className="glass-card rounded-xl p-5 border border-white/5 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-gold" />
                    <span className="text-sm font-semibold text-white">Upcoming Shifts</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { day: 'Today', time: '18:00 - 02:00', venue: 'The Golden Tap', status: 'Confirmed' },
                      { day: 'Tomorrow', time: '16:00 - 00:00', venue: 'Skybar Lounge', status: 'Pending' },
                      { day: 'Fri, Mar 26', time: '19:00 - 03:00', venue: 'The Golden Tap', status: 'Confirmed' },
                    ].map((shift) => (
                      <div key={shift.day + shift.venue} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-white">{shift.day} <span className="text-white/40">{shift.time}</span></p>
                          <p className="text-xs text-white/50">{shift.venue}</p>
                        </div>
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${shift.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                          {shift.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card rounded-xl p-5 border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-4 h-4 text-gold" />
                    <span className="text-sm font-semibold text-white">Recent Activity</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { text: 'New 5-star review from guest', time: '2h ago', color: 'bg-amber-500/10 text-amber-400' },
                      { text: '+35 PLN tip received', time: '4h ago', color: 'bg-emerald-500/10 text-emerald-400' },
                      { text: 'Shift confirmed at Skybar', time: '1d ago', color: 'bg-blue-500/10 text-blue-400' },
                    ].map((activity) => (
                      <div key={activity.text} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${activity.color.split(' ')[0].replace('/10', '')}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/80 truncate">{activity.text}</p>
                        </div>
                        <span className="text-[10px] text-white/30 flex-shrink-0">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#0D0D0F]" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute inset-0 bg-gold-mesh" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-['Instrument_Serif'] leading-[1.1] text-white mb-4">
              Trusted by <span className="text-gradient-gold">thousands</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Hospitality professionals across Europe are already building their careers on TopSpots.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: 12000, suffix: '+', label: 'Active Professionals', decimals: 0 },
              { value: 500, suffix: '+', label: 'Partner Venues', decimals: 0 },
              { value: 15, suffix: '+', label: 'Countries', decimals: 0 },
              { value: 4.8, suffix: '', label: 'Average Rating', decimals: 1 },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-gold-light to-gold bg-clip-text mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="text-sm text-white/50 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIAL ═══════════════ */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/3 via-transparent to-gold/2 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="glass-card rounded-3xl p-10 md:p-16 border border-gold/10 relative overflow-hidden">
            {/* Gold accent top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <Quote className="w-12 h-12 text-gold/30 mb-8" />

              <blockquote className="text-2xl md:text-3xl font-['Instrument_Serif'] text-white leading-relaxed mb-10">
                TopSpots changed how I think about my career. I went from invisible to <span className="text-gradient-gold">in-demand</span>. Now venues reach out to me, my tips have doubled, and I finally feel like a professional — not just "the bartender."
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-gold-light/10 rounded-full flex items-center justify-center border border-gold/20">
                  <UserCircle className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Maria K.</p>
                  <p className="text-sm text-white/50">Senior Bartender, Warsaw</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0D0D0F]" />
        <div className="absolute inset-0 bg-gold-mesh" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-['Instrument_Serif'] leading-[1.1] text-white mb-6">
              Ready to be <span className="text-gradient-gold">seen?</span>
            </h2>
            <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 12,000+ hospitality professionals who are building their brand, earning more, and unlocking career opportunities on TopSpots.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="https://topspots.global/staff/signup"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-gold to-gold-light text-charcoal text-lg font-semibold rounded-xl shadow-xl shadow-gold/30 hover:shadow-2xl hover:scale-[1.02] transition-all">
                Join Free <ArrowRight className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-white/30">
              100% Free — No credit card required — Setup in under 2 minutes
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
