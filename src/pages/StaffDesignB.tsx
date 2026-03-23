import { motion, useInView } from 'framer-motion'
import {
  ArrowRight, Crown, Star, Trophy, Users, Flame,
  TrendingUp, Zap, Quote, Sparkles
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
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

const stagger = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let current = 0
    const step = Math.ceil(target / 80)
    const interval = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(interval)
      }
      setCount(current)
    }, 25)
    return () => clearInterval(interval)
  }, [isInView, target])

  return (
    <span ref={ref} className="font-mono">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StaffDesignB() {
  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#0D0D0F]" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute inset-0 bg-gold-mesh" />
        <div className="absolute top-1/4 -left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-gold via-gold-light to-transparent opacity-6 blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-gold-light to-transparent opacity-5 blur-[100px]" />
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left -- Copy */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
              <motion.div variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 px-4 py-2.5 glass-card-gold rounded-full">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                </span>
                <span className="text-sm font-medium text-gold">Join the top 1% of hospitality pros</span>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1}
                className="text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-tight text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}>
                The best bartenders in the city are{' '}
                <span className="text-gradient-gold">already here</span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2}
                className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-lg">
                The top-rated pros are earning more, getting hired faster, and building reputations that follow them. Don't get left behind.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="https://topspots.global/staff/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-charcoal text-base font-semibold rounded-xl shadow-xl shadow-gold/30 hover:shadow-2xl hover:scale-[1.02] transition-all">
                  Claim Your Spot <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#community"
                  className="inline-flex items-center justify-center px-8 py-4 glass-card text-white text-base font-semibold rounded-xl hover:glass-card-gold hover:border-gold/20 transition-all">
                  See Who's Here
                </a>
              </motion.div>

              <motion.div variants={fadeUp} custom={4}
                className="flex flex-wrap gap-6 text-sm text-white/40 pt-2">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold" /> 2,000+ pros
                </span>
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" /> 500+ venues
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gold" /> 100% Free
                </span>
              </motion.div>
            </motion.div>

            {/* Right -- Leaderboard Card */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block">
              <div className="glass-card rounded-3xl p-6 card-3d border border-gold/10">
                {/* Leaderboard Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-light rounded-xl flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Top Rated This Week</h4>
                    <p className="text-white/40 text-xs">Krakow Region</p>
                  </div>
                </div>

                {/* Leaderboard Rows */}
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Jakub M.', role: 'Bartender', rating: 4.98, tips: '1,240 PLN', badge: 'bg-gradient-to-r from-yellow-400 to-amber-500' },
                    { rank: 2, name: 'Natalia S.', role: 'Mixologist', rating: 4.95, tips: '1,180 PLN', badge: 'bg-gradient-to-r from-gray-300 to-gray-400' },
                    { rank: 3, name: 'Marta K.', role: 'Waitress', rating: 4.93, tips: '980 PLN', badge: 'bg-gradient-to-r from-amber-600 to-amber-700' },
                    { rank: 4, name: 'Tomasz R.', role: 'Barista', rating: 4.91, tips: '870 PLN', badge: 'bg-white/10' },
                    { rank: 5, name: 'Ola W.', role: 'Host', rating: 4.89, tips: '760 PLN', badge: 'bg-white/10' },
                  ].map((person, i) => (
                    <motion.div key={person.rank}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                      className={`flex items-center gap-4 p-3 rounded-xl transition-all ${person.rank <= 3 ? 'bg-gradient-to-r from-gold/10 to-transparent border border-gold/10' : 'bg-white/2 border border-white/5'}`}>
                      <div className={`w-8 h-8 rounded-full ${person.badge} flex items-center justify-center text-xs font-bold ${person.rank <= 3 ? 'text-white' : 'text-white/60'}`}>
                        {person.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm">{person.name}</p>
                        <p className="text-white/40 text-xs">{person.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-gold fill-gold" />
                          <span className="text-white font-mono text-sm font-bold">{person.rating}</span>
                        </div>
                        <p className="text-gold/60 text-xs font-mono">{person.tips}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <p className="text-white/30 text-xs">Updated in real-time</p>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-6 glass-card-gold rounded-xl p-3 border border-gold/30 shadow-2xl shadow-gold/20">
                <div className="flex items-center gap-2 min-w-max">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gold">+50 PLN tip!</p>
                    <p className="text-[10px] text-white/40">Just now</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
                className="absolute -bottom-8 -left-6 glass-card-gold rounded-xl p-3 border border-gold/30 shadow-2xl shadow-gold/20">
                <div className="flex items-center gap-2 min-w-max">
                  <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gold">Top Earner This Week!</p>
                    <p className="text-[10px] text-white/40">Jakub M.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SHIFT HERO ═══════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/3 via-transparent to-gold/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="inline-block px-4 py-2 glass-card-gold rounded-full text-xs font-semibold text-gold mb-4 uppercase tracking-wider">Gamified Excellence</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-white mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              Become the{' '}
              <span className="text-gradient-gold">shift hero</span>
            </h2>
            <p className="text-lg text-white/60 mt-4 max-w-2xl mx-auto leading-relaxed">
              Earn badges, climb the leaderboard, and get recognized. Your performance unlocks real rewards.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Crown,
                title: 'Top Earner',
                stat: '90%',
                statLabel: 'beat peers',
                desc: 'Earn more tips than 90% of your peers',
                gradient: 'from-yellow-400 to-amber-600',
              },
              {
                icon: Star,
                title: '5-Star Legend',
                stat: '50+',
                statLabel: 'perfect reviews',
                desc: 'Maintain a perfect rating streak',
                gradient: 'from-gold to-gold-light',
              },
              {
                icon: Trophy,
                title: 'Shift MVP',
                stat: '#1',
                statLabel: 'ranked',
                desc: 'Get recognized by venues and customers',
                gradient: 'from-amber-500 to-orange-600',
              },
            ].map((badge, i) => (
              <motion.div key={badge.title} variants={itemVariants}
                className="group relative">
                <div className="glass-card rounded-2xl p-8 border border-gold/20 hover:border-gold/40 transition-all duration-500 text-center card-3d overflow-hidden">
                  {/* Pulse glow behind icon */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold/10 rounded-full blur-[60px] group-hover:bg-gold/20 transition-all duration-500" />

                  <div className="relative z-10">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      className={`w-20 h-20 mx-auto bg-gradient-to-br ${badge.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gold/20`}>
                      <badge.icon className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">{badge.title}</h3>

                    <div className="mb-4">
                      <span className="text-4xl font-mono font-bold text-gradient-gold">{badge.stat}</span>
                      <p className="text-sm text-white/40 mt-1">{badge.statLabel}</p>
                    </div>

                    <p className="text-sm text-white/60 leading-relaxed">{badge.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TIP COUNTER ═══════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0D0D0F]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/8 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="inline-block px-4 py-2 glass-card-gold rounded-full text-xs font-semibold text-gold mb-4 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 inline mr-1.5" />
              Live Stats
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-white mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              Tips earned on{' '}
              <span className="text-gradient-gold">TopSpots</span>
            </h2>
          </motion.div>

          {/* Big counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <div className="inline-block glass-card-gold rounded-3xl px-12 py-10 border border-gold/30">
              <p className="text-6xl sm:text-7xl lg:text-8xl font-mono font-bold text-gradient-gold tracking-tight">
                <AnimatedCounter target={2450000} suffix="+" />
              </p>
              <p className="text-lg text-white/50 mt-3 font-medium">PLN in tips</p>
            </div>
          </motion.div>

          {/* Stat cards */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { label: 'Average tip', value: '25', unit: 'PLN', icon: TrendingUp },
              { label: 'Tips today', value: '3,400', unit: '+', icon: Zap },
              { label: 'Top earner this month', value: '8,200', unit: 'PLN', icon: Crown },
              { label: 'Venues tipping', value: '340', unit: '+', icon: Users },
            ].map((stat) => (
              <motion.div key={stat.label} variants={itemVariants}
                className="glass-card rounded-2xl p-6 border border-white/5 hover:border-gold/20 transition-all text-center card-3d">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-gold/20 to-gold-light/10 rounded-xl flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-gold" />
                </div>
                <p className="text-2xl lg:text-3xl font-mono font-bold text-white">
                  {stat.value}<span className="text-gold text-lg">{stat.unit}</span>
                </p>
                <p className="text-sm text-white/40 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ COMMUNITY ═══════════════ */}
      <section id="community" className="py-24 lg:py-32 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,161,74,0.07) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-xs font-semibold text-gold-dark mb-4 uppercase tracking-wider">Community</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-charcoal mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              Join the{' '}
              <span className="text-gradient-gold">community</span>
            </h2>
            <p className="text-lg text-charcoal/60 mt-4 max-w-2xl mx-auto leading-relaxed">
              Thousands of hospitality professionals are already here. Find your crew.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {[
              { role: 'Bartender', emoji: '\uD83C\uDF78', members: '640+', color: 'from-blue-500/10 to-indigo-500/5', border: 'hover:border-blue-400/40' },
              { role: 'Waiter', emoji: '\uD83C\uDF7D\uFE0F', members: '520+', color: 'from-purple-500/10 to-pink-500/5', border: 'hover:border-purple-400/40' },
              { role: 'Chef', emoji: '\uD83D\uDC68\u200D\uD83C\uDF73', members: '310+', color: 'from-orange-500/10 to-red-500/5', border: 'hover:border-orange-400/40' },
              { role: 'Host', emoji: '\uD83C\uDF89', members: '180+', color: 'from-rose-500/10 to-pink-500/5', border: 'hover:border-rose-400/40' },
              { role: 'Barista', emoji: '\u2615', members: '220+', color: 'from-amber-500/10 to-orange-500/5', border: 'hover:border-amber-400/40' },
              { role: 'Manager', emoji: '\uD83D\uDCCB', members: '130+', color: 'from-teal-500/10 to-cyan-500/5', border: 'hover:border-teal-400/40' },
            ].map((r, i) => (
              <motion.div key={r.role} variants={itemVariants}
                className={`group bg-white rounded-2xl p-6 lg:p-8 border-2 border-transparent ${r.border} shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${r.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{r.emoji}</span>
                </div>
                <h4 className="text-xl font-bold text-charcoal mb-1">{r.role}</h4>
                <p className="text-sm text-charcoal/50 font-medium">{r.members} members</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIAL ═══════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0D0D0F]" />
        <div className="absolute inset-0 bg-gradient-to-b from-gold/3 via-transparent to-gold/2 pointer-events-none" />
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="inline-block px-4 py-2 glass-card-gold rounded-full text-xs font-semibold text-gold mb-4 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              Hear from the{' '}
              <span className="text-gradient-gold">pros</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: 'I earned 3x more tips since joining TopSpots. The QR code system is genius.',
                name: 'Jakub M.',
                role: 'Bartender',
                city: 'Krakow',
                stars: 5,
              },
              {
                quote: 'My profile got me hired at the best cocktail bar in Warsaw.',
                name: 'Natalia S.',
                role: 'Mixologist',
                city: 'Warsaw',
                stars: 5,
              },
            ].map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass-card rounded-2xl p-8 lg:p-10 border border-gold/20 hover:border-gold/40 transition-all card-3d relative overflow-hidden">
                {/* Gold accent top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />

                <Quote className="w-10 h-10 text-gold/20 mb-6" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>

                <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-8 font-medium">
                  "{t.quote}"
                </p>

                <div>
                  <p className="text-white font-bold">{t.name}</p>
                  <p className="text-white/40 text-sm">{t.role} &middot; {t.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0D0D0F]" />
        <div className="absolute inset-0 bg-gold-mesh" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gold/8 rounded-full blur-[140px]" />
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-card-gold rounded-full mb-8">
              <Flame className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-gold">2,000+ professionals joined this month</span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-[4rem] leading-[1.05] text-white mb-6"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              Don't get{' '}
              <span className="text-gradient-gold">left behind</span>
            </h2>

            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              The best are already here. Are you?
            </p>

            <a href="https://topspots.global/staff/signup"
              className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-gold to-gold-light text-charcoal text-lg font-bold rounded-xl shadow-xl shadow-gold/30 hover:shadow-2xl hover:scale-[1.03] transition-all">
              Claim Your Spot &mdash; It's Free <ArrowRight className="w-6 h-6" />
            </a>

            <p className="text-white/30 text-sm mt-6">No credit card required. Setup in under 2 minutes.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
