import { motion } from 'framer-motion'
import {
  ArrowRight, CalendarCheck, QrCode, BarChart3, Users, Star, Shield,
  Store, Clock, TrendingUp, Zap, Globe, CreditCard, ChevronDown,
  Check, Crown, Sparkles, MapPin, Utensils,
  Award, Smartphone, Palette, ChefHat, Building2
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

export default function VenuesLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-white to-white" />
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] bg-gold/3 rounded-full blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Copy */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
              <motion.div variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full border border-gold/20">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium text-gold">Join 340+ premium venues across Poland</span>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-gray-900">
                Everything your venue
                <br />
                <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                  needs to thrive
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2}
                className="text-lg lg:text-xl text-gray-500 leading-relaxed max-w-lg">
                Bookings, menus, QR codes, staff profiles, reviews, analytics, and tipping — all in one platform built for modern venues in Poland and Europe.
              </motion.p>

              {/* Value pills */}
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
                {[
                  { icon: CalendarCheck, label: 'Smart Bookings' },
                  { icon: QrCode, label: 'QR Menus' },
                  { icon: BarChart3, label: 'Analytics' },
                  { icon: CreditCard, label: 'Tipping' },
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm">
                    <p.icon className="w-4 h-4 text-gold" />
                    <span className="text-sm font-medium text-gray-700">{p.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-4">
                <a href="https://topspots.global/apply"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-white text-base font-semibold rounded-2xl shadow-xl shadow-gold/25 hover:shadow-gold/40 hover:scale-[1.02] transition-all">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-700 text-base font-semibold rounded-2xl hover:border-gold hover:text-gold transition-all">
                  See How It Works
                </a>
              </motion.div>

              <motion.p variants={fadeUp} custom={5} className="text-sm text-gray-400">
                30-day free trial · No credit card required · Cancel anytime
              </motion.p>
            </motion.div>

            {/* Right — Dashboard Preview */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="relative hidden lg:block">
              <div className="rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50 overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-5 py-3.5 bg-gray-50 border-b border-gray-100">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <div className="flex-1 mx-6 h-7 rounded-lg bg-gray-100 flex items-center px-3">
                    <span className="text-[11px] text-gray-400">topspots.global/dashboard</span>
                  </div>
                </div>
                {/* Dashboard content */}
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Welcome back</p>
                      <p className="text-lg font-bold text-gray-900">Cafe Milano</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">Live</span>
                  </div>
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Bookings Today', value: '18', change: '+23%', color: 'text-emerald-600' },
                      { label: 'Profile Views', value: '342', change: '+12%', color: 'text-blue-600' },
                      { label: 'Avg Rating', value: '4.8★', change: '+0.2', color: 'text-amber-600' },
                    ].map((s) => (
                      <div key={s.label} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <p className="text-xl font-bold text-gray-900">{s.value}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{s.label}</p>
                        <p className={`text-[11px] font-medium ${s.color} mt-1`}>{s.change}</p>
                      </div>
                    ))}
                  </div>
                  {/* Chart */}
                  <div className="h-28 rounded-xl bg-gradient-to-t from-gold/5 to-transparent border border-gray-100 flex items-end p-3 gap-1.5">
                    {[35, 55, 45, 70, 60, 85, 75, 90, 65, 80, 70, 95].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-gold to-gold-light opacity-80" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  {/* Bookings */}
                  <div className="space-y-2">
                    {[
                      { name: 'Anna K.', time: '19:00', party: 4, status: 'confirmed' },
                      { name: 'Marek P.', time: '20:30', party: 2, status: 'pending' },
                    ].map((b) => (
                      <div key={b.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${b.status === 'confirmed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span className="text-sm text-gray-700 font-medium">{b.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">{b.time} · Party of {b.party}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating decorations */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gold/10 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gold/5 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SOCIAL PROOF BAR ═══════════════ */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '340+', label: 'Premium Venues' },
              { value: '25,000+', label: 'Bookings Managed' },
              { value: '4.8/5', label: 'Owner Satisfaction' },
              { value: '8', label: 'Languages Supported' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ VENUE TYPES ═══════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">Built for Every Venue</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              One platform, every venue type
            </h2>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
              Whether you run a fine-dining restaurant, trendy bar, cozy cafe, or event space — TopSpots adapts to your needs.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Utensils, label: 'Restaurants', desc: 'Fine dining to casual', color: 'bg-red-50 text-red-600' },
              { icon: ChefHat, label: 'Bars & Clubs', desc: 'Cocktail bars to nightclubs', color: 'bg-purple-50 text-purple-600' },
              { icon: Store, label: 'Cafes', desc: 'Coffee shops & bakeries', color: 'bg-amber-50 text-amber-600' },
              { icon: Building2, label: 'Events', desc: 'Venues & event spaces', color: 'bg-blue-50 text-blue-600' },
            ].map((t) => (
              <motion.div key={t.label} whileHover={{ y: -4 }} className="bg-white border-2 border-gray-100 rounded-2xl p-6 text-center hover:border-gold/30 hover:shadow-lg transition-all cursor-default">
                <div className={`w-14 h-14 ${t.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <t.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES BENTO GRID ═══════════════ */}
      <section id="features" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium mb-4">Features</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Everything your venue needs
            </h2>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
              Real tools that help you manage and grow — no fluff, no gimmicks.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Store, title: 'Venue Profile & Menu',
                desc: 'Rich venue page with photos, gallery, detailed menu items with variants, opening hours, and your unique story — fully customizable.',
                tag: 'Core',
              },
              {
                icon: CalendarCheck, title: 'Smart Booking System',
                desc: 'Customers book online from your profile. Manage reservations — confirm, cancel, track party sizes, special requests, and table assignments.',
                tag: 'Core',
              },
              {
                icon: QrCode, title: 'QR Code System',
                desc: 'Generate permanent QR codes for tables, staff, and menus. Customers scan to view menu, leave tips, write reviews — no app needed.',
                tag: 'Core',
              },
              {
                icon: Users, title: 'Staff Profiles & Scheduling',
                desc: 'Staff profiles with photos, skills, languages. Schedule shifts, track performance, let customers discover and review your team.',
                tag: 'Team',
              },
              {
                icon: Star, title: 'Reviews & Ratings',
                desc: 'Collect real reviews after visits. Respond to feedback, auto-moderate with trust scoring, build social proof that drives bookings.',
                tag: 'Growth',
              },
              {
                icon: BarChart3, title: 'Analytics Dashboard',
                desc: 'Track profile views, booking trends, review scores, engagement metrics. Weekly email summaries with actionable insights.',
                tag: 'Growth',
              },
              {
                icon: CreditCard, title: 'Digital Tipping',
                desc: 'Customers tip staff via QR code — cashless, instant. Track tip analytics, manage payouts through Stripe Connect.',
                tag: 'Revenue',
              },
              {
                icon: Globe, title: '8 Languages Built-In',
                desc: 'English, Polish, German, French, Spanish, Dutch, Russian, Ukrainian — your venue profile auto-translates for international guests.',
                tag: 'Reach',
              },
              {
                icon: Smartphone, title: 'Social Feed',
                desc: 'TikTok-style venue feed with photos, videos, and stories. Post updates, promote events, engage followers directly.',
                tag: 'Engagement',
              },
              {
                icon: MapPin, title: 'Google Maps Integration',
                desc: 'Import venue data from Google Places. Show location on map, sync ratings, enable "Near Me" discovery for customers.',
                tag: 'Discovery',
              },
              {
                icon: Award, title: 'Loyalty Program',
                desc: 'Points system with bronze/silver/gold/platinum tiers. Customers earn points from tips and visits, redeem for rewards.',
                tag: 'Retention',
              },
              {
                icon: Sparkles, title: 'Marketplace',
                desc: 'Coming soon — connect with suppliers, service providers, and partners. One platform for everything your venue needs.',
                tag: 'Coming Soon',
              },
            ].map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-gold/30 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    f.tag === 'Coming Soon' ? 'bg-purple-50 text-purple-600' :
                    f.tag === 'Core' ? 'bg-emerald-50 text-emerald-600' :
                    f.tag === 'Growth' ? 'bg-blue-50 text-blue-600' :
                    f.tag === 'Revenue' ? 'bg-amber-50 text-amber-700' :
                    f.tag === 'Team' ? 'bg-pink-50 text-pink-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>{f.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">Getting Started</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Go live in three simple steps
            </h2>
            <p className="text-lg text-gray-500 mt-4">From application to first booking — faster than you think</p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8">
            {/* Connection line */}
            <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gold via-gold-light to-gold opacity-20" />

            {[
              { num: 1, title: 'Apply', time: '5 minutes', icon: Store, desc: 'Submit your venue details — name, type, location, photos. Quick form, takes under 5 minutes.' },
              { num: 2, title: 'Set Up', time: '24-48 hours', icon: Palette, desc: 'Add your full menu, hours, staff profiles, and photos. Our team verifies your venue within 48 hours.' },
              { num: 3, title: 'Go Live', time: 'Immediate', icon: Zap, desc: 'Start receiving bookings and reviews. Print your QR code, place it on tables — you\'re all set.' },
            ].map((s, i) => (
              <motion.div key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative">
                <div className="absolute -top-4 -left-2 w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-white font-bold text-sm shadow-lg border-4 border-white z-10">
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

      {/* ═══════════════ WHY TOPSPOTS ═══════════════ */}
      <section className="py-20 lg:py-28 bg-charcoal text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-medium mb-4">Why TopSpots</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              Built for real venue challenges
            </h2>
            <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Every feature solves a problem venue owners actually face</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: QrCode, title: 'One QR, Endless Uses', desc: 'Single permanent QR on every table gives customers instant menu, staff profiles, and tipping — no app required.' },
              { icon: CalendarCheck, title: 'Fewer No-Shows', desc: 'Online booking with confirmations. Customers commit. You manage capacity with confidence.' },
              { icon: TrendingUp, title: 'Boost Visibility', desc: 'Get discovered by new customers. Your profile, reviews, and posts help you stand out.' },
              { icon: Users, title: 'Know Your Team', desc: 'Staff profiles, schedules, performance tracking. See who\'s on shift and how they\'re rated.' },
              { icon: Clock, title: 'Save Hours Weekly', desc: 'Stop juggling phone calls, paper menus, spreadsheets. Everything in one place, real time.' },
              { icon: Shield, title: 'Enterprise Security', desc: 'Bank-level encryption for all data. SOC 2 grade security, RLS on every table, audit logging.' },
            ].map((b, i) => (
              <motion.div key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 p-6 rounded-2xl border border-white/10 hover:border-gold/30 hover:bg-white/5 transition-all">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gold/20 flex items-center justify-center">
                  <b.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{b.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">Pricing</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Plans that fit your venue
            </h2>
            <p className="text-lg text-gray-500 mt-4">All plans include a 30-day free trial. No credit card required.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Basic', price: 99, desc: 'Get started with essentials',
                features: ['Venue listing & profile', 'QR code menus', 'Basic analytics', 'Up to 5 staff', 'Email support'],
                highlighted: false,
              },
              {
                name: 'Pro', price: 199, desc: 'For venues serious about growth',
                features: ['Everything in Basic', 'Advanced analytics', 'Staff management', 'Booking system', 'Priority support', 'Social feed'],
                highlighted: true,
              },
              {
                name: 'Pro+', price: 399, desc: 'Full power for ambitious venues',
                features: ['Everything in Pro', 'Multi-venue support', 'Custom branding', 'API access', 'Dedicated manager', 'White-label options'],
                highlighted: false,
              },
            ].map((plan) => (
              <motion.div key={plan.name}
                whileHover={{ y: -4 }}
                className={`relative rounded-2xl p-7 ${
                  plan.highlighted
                    ? 'border-2 border-gold shadow-xl shadow-gold/10 bg-white'
                    : 'border-2 border-gray-100 bg-white hover:border-gold/30'
                } transition-all`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-gold to-gold-light rounded-full shadow-lg flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-white" />
                    <span className="text-white text-xs font-semibold">Most Popular</span>
                  </div>
                )}
                <div className="pt-4 mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{plan.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-sm text-gray-500 ml-1">PLN/month</span>
                </div>
                <a href="https://topspots.global/apply"
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-gold to-gold-light text-white shadow-lg shadow-gold/25 hover:shadow-gold/40'
                      : 'bg-gray-100 text-gray-700 hover:bg-gold hover:text-white'
                  }`}>
                  Start Free Trial
                </a>
                <div className="pt-6 mt-6 border-t border-gray-100 space-y-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">All prices in PLN. Cancel anytime during your trial.</p>
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
              { q: 'How much does TopSpots cost?', a: 'Three plans: Basic (99 PLN/month), Pro (199 PLN/month), and Pro+ (399 PLN/month). All include a 30-day free trial — no credit card required. Cancel anytime.' },
              { q: 'How long does venue verification take?', a: 'Our team reviews new venues within 24–48 hours. We check your business details and ensure everything is set. You\'ll receive an email when approved.' },
              { q: 'How does the QR code system work?', a: 'Each venue gets a unique QR code. Customers scan to view your menu, see staff profiles, and leave reviews — no app needed. Print once, works forever.' },
              { q: 'Can I manage multiple venues?', a: 'Yes! Pro+ plan supports multi-venue management from a single dashboard. Add staff, manage bookings, and track analytics across all locations.' },
              { q: 'What payment methods do you accept?', a: 'We use Stripe for secure payments. Accept credit/debit cards, Apple Pay, Google Pay. For tipping, customers pay directly via the QR code.' },
              { q: 'Is there an app for customers?', a: 'TopSpots is a Progressive Web App — customers use it in their browser, no download needed. Works on any device with a modern browser.' },
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
      <section className="py-20 lg:py-28 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Ready to grow your venue?
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
              Join 340+ premium venues on TopSpots. Set up takes less than 15 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://topspots.global/apply"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-gold to-gold-light text-white text-lg font-semibold rounded-2xl shadow-xl shadow-gold/25 hover:shadow-gold/40 hover:scale-[1.02] transition-all">
                Apply Now <ArrowRight className="w-5 h-5" />
              </a>
              <a href="mailto:hello@topspots.global"
                className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/20 text-white text-lg font-semibold rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all">
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
