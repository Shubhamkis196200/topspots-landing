import { motion } from 'framer-motion'
import {
  ArrowRight, UserPlus, Search, Award, Star, ChevronDown,
  Briefcase, Globe, CheckCircle2, TrendingUp, Wallet,
  Smartphone, Sparkles, Calendar,
  BadgeCheck, Languages, Zap
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
  visible: { transition: { staggerChildren: 0.08 } }
}

export default function StaffLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-charcoal" />
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,161,74,0.3) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold/8 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Copy */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
              <motion.div variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                <Star className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-white/90">The #1 platform for hospitality professionals</span>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-white">
                Your career in
                <br />
                <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                  hospitality starts here
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2}
                className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-lg">
                Build your professional profile, get discovered by top venues, earn tips digitally, and take control of your career — all for free.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
                <a href="https://topspots.global/staff/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-white text-base font-semibold rounded-2xl shadow-xl shadow-gold/25 hover:shadow-gold/40 hover:scale-[1.02] transition-all">
                  Create Your Profile <ArrowRight className="w-5 h-5" />
                </a>
                <a href="https://topspots.global/staff/login"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white text-base font-semibold rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm">
                  Sign In
                </a>
              </motion.div>

              <motion.div variants={fadeUp} custom={4} className="flex items-center gap-6 text-sm text-white/40">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-gold" /> 100% Free</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-gold" /> No hidden fees</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-gold" /> Setup in 2 min</span>
              </motion.div>
            </motion.div>

            {/* Right — Profile Preview */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="relative hidden lg:block">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                  {/* Cover */}
                  <div className="h-28 bg-gradient-to-r from-gold via-gold-light to-gold relative">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3" /> Verified
                    </div>
                  </div>
                  <div className="px-6 pb-6 -mt-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full border-4 border-white mb-3 flex items-center justify-center shadow-lg">
                      <Briefcase className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-bold text-gray-900">Anna Kowalska</h4>
                      <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-bold rounded-full">PRO</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Senior Bartender · Cocktail Specialist</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-lg font-bold text-gray-900">4.9</p>
                        <p className="text-[10px] text-gray-400">Rating</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-lg font-bold text-gray-900">127</p>
                        <p className="text-[10px] text-gray-400">Reviews</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-lg font-bold text-gray-900">3yr</p>
                        <p className="text-[10px] text-gray-400">Experience</p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {['Mixology', 'Wine Service', 'POS Systems', 'Craft Beer'].map((s) => (
                        <span key={s} className="text-xs bg-gold/10 text-gold px-2.5 py-1 rounded-full font-medium">{s}</span>
                      ))}
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Globe className="w-3.5 h-3.5" /> English, Polish, German
                    </div>
                  </div>
                </div>

                {/* QR Code hint */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/40">
                  <Smartphone className="w-4 h-4" />
                  <span>Scannable QR code included</span>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">+25 PLN tip</p>
                    <p className="text-[10px] text-gray-400">Just now</p>
                  </div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">New 5-star review</p>
                    <p className="text-[10px] text-gray-400">"Best service ever!"</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2,000+', label: 'Staff Members' },
              { value: '500+', label: 'Partner Venues' },
              { value: '15+', label: 'Countries' },
              { value: '100%', label: 'Free Forever' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">Features</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
              Your professional profile is your digital resume for the hospitality industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: UserPlus, title: 'Professional Profile',
                desc: 'Showcase your photo, bio, headline, skills, experience timeline, education, and certifications. Your digital business card.',
                gradient: 'from-blue-500 to-indigo-600',
              },
              {
                icon: Search, title: 'Get Discovered',
                desc: 'Venue owners find you by unique Profile ID. Your skills, languages, and ratings make you stand out to the right employers.',
                gradient: 'from-purple-500 to-pink-600',
              },
              {
                icon: Award, title: 'Skills & Certifications',
                desc: 'Highlight mixology, wine service, POS systems, food safety certs, barista skills — whatever makes you the best.',
                gradient: 'from-amber-500 to-orange-600',
              },
              {
                icon: Wallet, title: 'Digital Tipping',
                desc: 'Receive tips via QR code — cashless, instant. Track earnings, see your top days, build your income history.',
                gradient: 'from-emerald-500 to-teal-600',
              },
              {
                icon: Star, title: 'Customer Reviews',
                desc: 'Build your reputation with authentic customer reviews. Higher ratings = more visibility = better venues.',
                gradient: 'from-amber-400 to-yellow-500',
              },
              {
                icon: Calendar, title: 'Shift Scheduling',
                desc: 'See your schedule, swap shifts, track hours. Your venue owner manages it, you stay informed in real time.',
                gradient: 'from-sky-500 to-blue-600',
              },
              {
                icon: Languages, title: 'Multi-Language',
                desc: 'Profile available in 8 languages. International guests can discover you in their native language.',
                gradient: 'from-rose-500 to-pink-600',
              },
              {
                icon: TrendingUp, title: 'Performance Tracking',
                desc: 'See your rating over time, tip trends, review count. Know exactly how you\'re doing and where to improve.',
                gradient: 'from-violet-500 to-purple-600',
              },
              {
                icon: Sparkles, title: 'Career Marketplace',
                desc: 'Coming soon — browse open positions, apply directly, connect with venues looking for talent like you.',
                gradient: 'from-gold to-gold-light',
              },
            ].map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group bg-white border-2 border-gray-100 rounded-2xl p-7 hover:border-gold/30 hover:shadow-xl transition-all duration-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${f.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">Getting Started</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Three steps to get started
            </h2>
            <p className="text-lg text-gray-500 mt-4">Create your profile in under 2 minutes — completely free</p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8">
            <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gold via-gold-light to-gold opacity-20" />

            {[
              { num: 1, title: 'Sign Up', time: 'Under 1 minute', icon: UserPlus, desc: 'Create your free account with email. No payment info needed — it\'s free forever.' },
              { num: 2, title: 'Build Profile', time: '5 minutes', icon: Briefcase, desc: 'Add your photo, skills, experience, languages, and certifications. Make it shine.' },
              { num: 3, title: 'Get Discovered', time: 'Immediately', icon: Zap, desc: 'Venues find you by Profile ID. Get added to teams, start earning tips and reviews.' },
            ].map((s, i) => (
              <motion.div key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative">
                <div className="absolute -top-4 -left-2 w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-white font-bold text-sm shadow-lg border-4 border-gray-50 z-10">
                  {s.num}
                </div>
                <div className="h-full bg-white border-2 border-gray-100 rounded-2xl p-7 hover:shadow-xl hover:border-gold/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                    <s.icon className="w-6 h-6 text-gold" />
                  </div>
                  <span className="inline-block px-3 py-1 border border-gold/20 text-gold text-xs font-medium rounded-full mb-3">{s.time}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROFILE SHOWCASE ═══════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium mb-6">Your Profile</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
                Your profile, <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">your brand</span>
              </h2>
              <p className="text-lg text-gray-500 mb-8">
                Stand out from the crowd with a complete professional profile that showcases everything that makes you exceptional.
              </p>
              <div className="space-y-4">
                {[
                  'Professional photo and cover image',
                  'Skills, languages, and specialties',
                  'Work experience timeline',
                  'Education and certifications',
                  'Customer reviews and ratings',
                  'Unique Profile ID for easy discovery',
                  'Personal QR code for tips',
                  'Social links and portfolio',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
              <a href="https://topspots.global/staff/signup"
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-white font-semibold rounded-2xl shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:scale-[1.02] transition-all">
                Create Your Profile <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Roles */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { role: 'Bartender', icon: '🍸', skills: ['Mixology', 'Wine Service', 'Craft Beer'] },
                { role: 'Waiter/Waitress', icon: '🍽️', skills: ['Table Service', 'POS', 'Multi-language'] },
                { role: 'Chef', icon: '👨‍🍳', skills: ['Fine Dining', 'Pastry', 'Menu Design'] },
                { role: 'Host/Hostess', icon: '🎉', skills: ['Reservations', 'Guest Relations', 'Events'] },
                { role: 'Barista', icon: '☕', skills: ['Latte Art', 'Espresso', 'Pour Over'] },
                { role: 'Manager', icon: '📋', skills: ['Operations', 'Staff', 'P&L'] },
              ].map((r) => (
                <motion.div key={r.role} whileHover={{ y: -4 }}
                  className="bg-white border-2 border-gray-100 rounded-2xl p-5 hover:border-gold/30 hover:shadow-lg transition-all">
                  <span className="text-3xl">{r.icon}</span>
                  <h4 className="text-base font-bold text-gray-900 mt-3">{r.role}</h4>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {r.skills.map((s) => (
                      <span key={s} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section id="faq" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium mb-4">FAQ</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">Common Questions</h2>
          </div>

          <div className="space-y-3">
            {[
              { q: 'Is TopSpots really free for staff?', a: 'Yes, 100% free. Creating a profile, receiving tips, getting reviews — all free. We make money from venue subscriptions, not from you.' },
              { q: 'How do venues find me?', a: 'Every staff member gets a unique Profile ID. Venue owners search by ID or browse staff in their area. Your skills, reviews, and rating help you get noticed.' },
              { q: 'How do tips work?', a: 'Customers scan your personal QR code and tip you directly via card — cashless and instant. You track all tips in your dashboard.' },
              { q: 'Can I work at multiple venues?', a: 'Yes! You can be linked to multiple venues simultaneously. Each venue sees only their relevant data.' },
              { q: 'What if I change jobs?', a: 'Your profile, reviews, and ratings stay with you. When you join a new venue, your reputation comes along.' },
              { q: 'Do I need to download an app?', a: 'No app needed. TopSpots works in your browser on any device. It\'s a Progressive Web App — add it to your home screen for app-like experience.' },
            ].map((faq, i) => (
              <div key={i} className="border-2 border-gray-200 rounded-xl bg-white overflow-hidden hover:border-gold/30 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left">
                  <span className="text-base font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,161,74,0.4) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Ready to build your career?
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
              Join 2,000+ hospitality professionals on TopSpots. It's free — always.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://topspots.global/staff/signup"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-gold to-gold-light text-white text-lg font-semibold rounded-2xl shadow-xl shadow-gold/25 hover:shadow-gold/40 hover:scale-[1.02] transition-all">
                Create Your Profile <ArrowRight className="w-5 h-5" />
              </a>
              <a href="https://topspots.global/staff/login"
                className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/20 text-white text-lg font-semibold rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all">
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
