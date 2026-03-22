import { motion } from 'framer-motion'
import {
  ArrowRight, UserPlus, Search, Award, Star, ChevronDown,
  Briefcase, Globe, CheckCircle2, TrendingUp, Wallet,
  Smartphone, Sparkles, Calendar, BadgeCheck, Languages, Zap
} from 'lucide-react'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
    transition: { staggerChildren: 0.06, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export default function StaffLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0D0D0F]" />

        {/* Dot pattern */}
        <div className="absolute inset-0 dot-pattern opacity-40" />

        {/* Gold mesh gradient */}
        <div className="absolute inset-0 bg-gold-mesh" />

        {/* Radial glow */}
        <div className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-gold via-gold-light to-transparent opacity-5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-gold-light to-transparent opacity-4 blur-[100px]" />

        {/* Grain overlay */}
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Copy */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
              <motion.div variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 px-4 py-2.5 glass-card-gold rounded-full">
                <Star className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-gold">#1 platform for hospitality professionals</span>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1}
                className="text-5xl sm:text-6xl lg:text-[4rem] font-serif leading-[1.1] tracking-tight text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}>
                Your career in hospitality
                <br />
                <span className="text-gradient-gold">starts here</span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2}
                className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-lg font-body">
                Build your professional profile, get discovered by top venues, earn tips digitally, and take control of your career — all for free.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="https://topspots.global/staff/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-white text-base font-semibold rounded-2xl shadow-lg gold-glow hover:shadow-xl hover:scale-[1.02] transition-all">
                  Create Your Profile <ArrowRight className="w-5 h-5" />
                </a>
                <a href="https://topspots.global/staff/login"
                  className="inline-flex items-center justify-center px-8 py-4 glass-card text-white text-base font-semibold rounded-2xl hover:glass-card-gold hover:border-gold/20 transition-all">
                  Sign In
                </a>
              </motion.div>

              <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-4 text-sm text-white/40 pt-2">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> 100% Free</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> No hidden fees</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Setup in 2 min</span>
              </motion.div>
            </motion.div>

            {/* Right — Profile Preview */}
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
                    <p className="text-sm text-gray-600 mb-4 font-medium">Senior Bartender · Cocktail Specialist</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="text-center p-3 bg-gradient-to-br from-gold/5 to-gold/0 rounded-lg border border-gold/10">
                        <p className="text-xl font-bold text-gray-900">4.9</p>
                        <p className="text-[11px] font-medium text-gray-500 mt-0.5">Rating</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-gold/5 to-gold/0 rounded-lg border border-gold/10">
                        <p className="text-xl font-bold text-gray-900">127</p>
                        <p className="text-[11px] font-medium text-gray-500 mt-0.5">Reviews</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-gold/5 to-gold/0 rounded-lg border border-gold/10">
                        <p className="text-xl font-bold text-gray-900">3yr</p>
                        <p className="text-[11px] font-medium text-gray-500 mt-0.5">Experience</p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Mixology', 'Wine Service', 'POS Systems', 'Craft Beer'].map((s) => (
                        <span key={s} className="text-xs font-medium px-3 py-1.5 bg-gradient-to-r from-gold/10 to-gold/5 text-gold rounded-full border border-gold/20">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <Globe className="w-4 h-4 text-gold" />
                      <span>English, Polish, German</span>
                    </div>
                  </div>
                </div>

                {/* QR Code hint */}
                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/40">
                  <Smartphone className="w-4 h-4" />
                  <span>Scannable QR code included</span>
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
                    <p className="text-[10px] text-gray-400">Excellent service!</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative py-14 border-y border-white/5 bg-gradient-to-r from-white/2 via-gold/3 to-white/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: '2,000+', label: 'Staff Members', icon: '👥' },
              { value: '500+', label: 'Partner Venues', icon: '🍽️' },
              { value: '15+', label: 'Countries', icon: '🌍' },
              { value: '100%', label: 'Free Forever', icon: '✨' },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center">
                <p className="text-3xl mb-1">{s.icon}</p>
                <p className="text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-gold-light to-gold bg-clip-text">{s.value}</p>
                <p className="text-sm text-white/50 mt-2 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section id="features" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/3 via-transparent to-gold/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-20">
            <span className="inline-block px-4 py-2 glass-card-gold rounded-full text-xs font-semibold text-gold mb-4 uppercase tracking-wider">Features</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1] text-white mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              Everything you need
              <br />
              <span className="text-gradient-gold">to succeed</span>
            </h2>
            <p className="text-lg text-white/60 mt-6 max-w-2xl mx-auto leading-relaxed">
              Professional tools designed specifically for hospitality workers who want to build their career and earn more.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: UserPlus, title: 'Professional Profile',
                desc: 'Showcase your photo, bio, headline, skills, experience timeline, education, and certifications. Your digital business card.',
                gradient: 'from-blue-500 to-indigo-600',
                bgGradient: 'from-blue-500/10 to-indigo-600/5'
              },
              {
                icon: Search, title: 'Get Discovered',
                desc: 'Venue owners find you by unique Profile ID. Your skills, languages, and ratings make you stand out to the right employers.',
                gradient: 'from-purple-500 to-pink-600',
                bgGradient: 'from-purple-500/10 to-pink-600/5'
              },
              {
                icon: Award, title: 'Skills & Certifications',
                desc: 'Highlight mixology, wine service, POS systems, food safety certs, barista skills — whatever makes you exceptional.',
                gradient: 'from-green-500 to-emerald-600',
                bgGradient: 'from-green-500/10 to-emerald-600/5'
              },
              {
                icon: Wallet, title: 'Digital Tipping',
                desc: 'Receive tips via QR code — cashless, instant. Track earnings, see your top days, build your income history.',
                gradient: 'from-gold to-gold-light',
                bgGradient: 'from-gold/10 to-gold-light/5'
              },
              {
                icon: Star, title: 'Customer Reviews',
                desc: 'Build your reputation with authentic customer reviews. Higher ratings = more visibility = better venues.',
                gradient: 'from-amber-500 to-orange-600',
                bgGradient: 'from-amber-500/10 to-orange-600/5'
              },
              {
                icon: Calendar, title: 'Shift Scheduling',
                desc: 'See your schedule, swap shifts, track hours. Your venue owner manages it, you stay informed in real time.',
                gradient: 'from-indigo-500 to-cyan-600',
                bgGradient: 'from-indigo-500/10 to-cyan-600/5'
              },
              {
                icon: Languages, title: 'Multi-Language',
                desc: 'Profile available in 8 languages. Work across borders — your skills translate everywhere.',
                gradient: 'from-rose-500 to-pink-600',
                bgGradient: 'from-rose-500/10 to-pink-600/5'
              },
              {
                icon: TrendingUp, title: 'Performance Tracking',
                desc: 'See your ratings trend, tip history, review highlights. Know your strengths and where to grow.',
                gradient: 'from-violet-500 to-purple-600',
                bgGradient: 'from-violet-500/10 to-purple-600/5'
              },
              {
                icon: Sparkles, title: 'Career Marketplace',
                desc: 'Coming soon — browse job openings, apply directly, get matched with venues that need your skills.',
                gradient: 'from-gold to-gold-light',
                bgGradient: 'from-gold/10 to-gold-light/5'
              },
            ].map((f) => (
              <motion.div key={f.title} variants={itemVariants}
                className="group glass-card rounded-2xl p-8 border border-white/5 hover:border-gold/20 hover:bg-white/2 transition-all duration-300 card-3d overflow-hidden">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${f.bgGradient}`} />

                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${f.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-gradient-to-b from-white/3 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-20">
            <span className="inline-block px-4 py-2 glass-card rounded-full text-xs font-semibold text-gold mb-4 uppercase tracking-wider">Getting Started</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1] text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              Three steps to your
              <br />
              <span className="text-gradient-gold">next opportunity</span>
            </h2>
            <p className="text-lg text-white/60 mt-6">Create your profile in under 2 minutes — completely free, no credit card required</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="relative grid md:grid-cols-3 gap-8">
            <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20" />

            {[
              { num: 1, title: 'Sign Up Free', time: 'Under 1 minute', icon: UserPlus, desc: 'Create your account with email. No payment info needed — it\'s free forever.' },
              { num: 2, title: 'Build Your Profile', time: '5 minutes', icon: Briefcase, desc: 'Add your photo, skills, experience, languages, and certifications. Make it shine.' },
              { num: 3, title: 'Get Discovered', time: 'Immediately', icon: Zap, desc: 'Venues find you by Profile ID. Get added to teams, start earning tips and reviews.' },
            ].map((s) => (
              <motion.div key={s.num} variants={itemVariants}
                className="relative">
                <div className="absolute -top-5 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-white font-bold text-lg shadow-lg border-4 border-[#0D0D0F] z-10">
                  {s.num}
                </div>
                <div className="h-full glass-card rounded-2xl p-8 border border-white/5 hover:border-gold/20 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold-light/10 flex items-center justify-center mb-6">
                    <s.icon className="w-7 h-7 text-gold" />
                  </div>
                  <span className="inline-block px-3 py-1.5 border border-gold/30 text-gold text-xs font-semibold rounded-full mb-4">{s.time}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PROFILE SHOWCASE ═══════════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="inline-block px-4 py-2 glass-card-gold rounded-full text-xs font-semibold text-gold mb-6 uppercase tracking-wider">Your Profile</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1] text-white mb-6"
                style={{ fontFamily: "'Instrument Serif', serif" }}>
                Your profile,
                <br />
                <span className="text-gradient-gold">your brand</span>
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg">
                Stand out from the crowd with a complete professional profile that showcases everything that makes you exceptional. Build trust with venues.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  'Professional photo and cover image',
                  'Skills, languages, and specialties',
                  'Work experience timeline',
                  'Education and certifications',
                  'Customer reviews and ratings',
                  'Unique Profile ID for easy discovery',
                  'Personal QR code for receiving tips',
                  'Social links and portfolio',
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
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-white font-semibold rounded-2xl shadow-lg gold-glow hover:shadow-xl hover:scale-[1.02] transition-all">
                Create Your Profile <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Roles */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4 lg:gap-6">
              {[
                { role: 'Bartender', emoji: '🍸', color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30' },
                { role: 'Waiter', emoji: '🍽️', color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30' },
                { role: 'Chef', emoji: '👨‍🍳', color: 'from-orange-500/20 to-red-500/10 border-orange-500/30' },
                { role: 'Host', emoji: '🎉', color: 'from-rose-500/20 to-pink-500/10 border-rose-500/30' },
                { role: 'Barista', emoji: '☕', color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30' },
                { role: 'Manager', emoji: '📋', color: 'from-teal-500/20 to-cyan-500/10 border-teal-500/30' },
              ].map((r, i) => (
                <motion.div key={r.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`glass-card rounded-2xl p-6 border border-white/5 hover:border-gold/20 transition-all group card-3d bg-gradient-to-br ${r.color}`}>
                  <span className="text-4xl mb-3 block">{r.emoji}</span>
                  <h4 className="text-lg font-bold text-white">{r.role}</h4>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section id="faq" className="py-24 lg:py-32 bg-gradient-to-b from-transparent via-gold/3 to-transparent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="inline-block px-4 py-2 glass-card rounded-full text-xs font-semibold text-gold mb-4 uppercase tracking-wider">FAQ</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1] text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              Common
              <br />
              <span className="text-gradient-gold">questions</span>
            </h2>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="space-y-3">
            {[
              { q: 'Is TopSpots really free for staff?', a: 'Yes, 100% free. Creating a profile, receiving tips, getting reviews — all completely free. We make money from venue subscriptions, not from you.' },
              { q: 'How do venues find me?', a: 'Every staff member gets a unique Profile ID. Venue owners search by ID or browse staff in their area. Your skills, reviews, and rating help you get noticed faster.' },
              { q: 'How do tips work?', a: 'Customers scan your personal QR code and tip you directly via card — cashless and instant. You track all tips in your dashboard in real time.' },
              { q: 'Can I work at multiple venues?', a: 'Absolutely. Your profile is yours — you can be linked to multiple venues simultaneously. Each venue sees only their relevant data.' },
              { q: 'What if I change jobs?', a: 'Your profile, reviews, ratings, and tip history stay with you. TopSpots is your professional hospitality resume — it follows your entire career.' },
              { q: 'Is my personal information safe?', a: 'Yes. We use enterprise-grade encryption and you control exactly what\'s visible on your profile. Your contact details are never shared without your permission.' },
            ].map((faq, i) => (
              <motion.div key={i} variants={itemVariants}
                className="glass-card rounded-xl border border-white/5 overflow-hidden hover:border-gold/20 transition-all">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/2 transition-colors">
                  <span className="text-base font-semibold text-white pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6 border-t border-white/5">
                    <p className="text-sm text-white/70 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0D0D0F]" />
        <div className="absolute inset-0 bg-gold-mesh" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1] text-white mb-6"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              Ready to level up your
              <br />
              <span className="text-gradient-gold">hospitality career?</span>
            </h2>
            <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 2,000+ hospitality professionals already building their careers on TopSpots. It's free — always.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://topspots.global/staff/signup"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-gold to-gold-light text-white text-lg font-semibold rounded-2xl shadow-xl gold-glow hover:shadow-2xl hover:scale-[1.02] transition-all">
                Create Your Free Profile <ArrowRight className="w-6 h-6" />
              </a>
              <a href="https://topspots.global/staff/login"
                className="inline-flex items-center justify-center px-10 py-5 glass-card text-white text-lg font-semibold rounded-2xl hover:glass-card-gold hover:border-gold/20 transition-all">
                Sign In
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
