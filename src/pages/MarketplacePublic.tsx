import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import {
  Search,
  MapPin,
  Clock,
  Star,
  Sparkles,
  DollarSign,
  Users,
  Building2,
  Briefcase,
  ArrowRight,
  Globe,
  Award,
  UserCheck,
  X,
  TrendingUp,
  Coffee,
  Music,
  ChefHat,
  Wine,
  Ticket,
  Mic2,
  UtensilsCrossed,
  GlassWater,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  staffMembers,
  venues,
  jobPostings,
  urgencyLabels,
  urgencyColors,
  type StaffMember,
  type VenuePost,
  type JobPosting,
} from '@/data/marketplaceData'

// ---------------------------------------------------------------------------
// Animated counter hook
// ---------------------------------------------------------------------------
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - (1 - progress) * (1 - progress)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

// ---------------------------------------------------------------------------
// Stars component
// ---------------------------------------------------------------------------
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(rating) ? 'fill-[var(--color-gold)] text-[var(--color-gold)]' : 'text-gray-300'}
        />
      ))}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Fade-in-on-scroll wrapper
// ---------------------------------------------------------------------------
function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Stat counter
// ---------------------------------------------------------------------------
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value)
  return (
    <div className="text-center">
      <span ref={ref} className="block text-4xl md:text-5xl font-display text-gray-900">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-sm text-gray-500 font-body mt-1 block">{label}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Filter pills
// ---------------------------------------------------------------------------
const filterPills = ['All', 'Bartenders', 'Waiters', 'Chefs', 'Venues', 'Events'] as const
type FilterPill = (typeof filterPills)[number]

// ---------------------------------------------------------------------------
// Category definitions
// ---------------------------------------------------------------------------
const categories = [
  { name: 'Bartender', icon: GlassWater, count: 320 },
  { name: 'Waiter', icon: UtensilsCrossed, count: 450 },
  { name: 'Chef', icon: ChefHat, count: 180 },
  { name: 'Barista', icon: Coffee, count: 210 },
  { name: 'DJ', icon: Music, count: 95 },
  { name: 'Host', icon: Mic2, count: 130 },
  { name: 'Sommelier', icon: Wine, count: 75 },
  { name: 'Event Staff', icon: Ticket, count: 260 },
  { name: 'Manager', icon: Briefcase, count: 110 },
]

// ---------------------------------------------------------------------------
// City data
// ---------------------------------------------------------------------------
const cityData = [
  { name: 'Wroclaw', staff: 85, venues: 24, gradient: 'from-amber-400 to-orange-500' },
  { name: 'Warsaw', staff: 120, venues: 45, gradient: 'from-blue-400 to-indigo-500' },
  { name: 'Krakow', staff: 65, venues: 18, gradient: 'from-emerald-400 to-teal-500' },
  { name: 'Gdansk', staff: 40, venues: 12, gradient: 'from-purple-400 to-pink-500' },
]

// ---------------------------------------------------------------------------
// Trending data
// ---------------------------------------------------------------------------
const trendingItems = [
  { text: 'Craft & Cork is hiring 3 positions', type: 'venue' as const },
  { text: 'Maria K. rated Top Bartender in Wroclaw', type: 'staff' as const },
  { text: '12 new positions in Warsaw this weekend', type: 'jobs' as const },
  { text: 'Skyline Lounge needs urgent event staff', type: 'venue' as const },
  { text: 'Elena P. named Best Sommelier Q1 2026', type: 'staff' as const },
  { text: 'Gdansk cafe scene booming - 8 new openings', type: 'jobs' as const },
]

// ---------------------------------------------------------------------------
// Modal: Staff Profile
// ---------------------------------------------------------------------------
function StaffModal({ member, onClose }: { member: StaffMember; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
        <div className="flex items-center gap-4 mb-4">
          <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-100" />
          <div>
            <h3 className="text-xl font-display text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500 font-body">{member.role} &middot; {member.specialty}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Stars rating={member.rating} size={12} />
              <span className="text-xs text-gray-500">{member.rating} ({member.reviews} reviews)</span>
            </div>
          </div>
        </div>
        {member.openToWork && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-3 py-1 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Open to Work
          </span>
        )}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 font-body mb-4">
          <div className="flex items-center gap-2"><DollarSign size={14} className="text-[var(--color-gold)]" />{member.hourlyRate}</div>
          <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-400" />{member.city}</div>
          <div className="flex items-center gap-2"><Briefcase size={14} className="text-gray-400" />{member.experience}</div>
          <div className="flex items-center gap-2"><Clock size={14} className="text-gray-400" />{member.availability}</div>
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <Globe size={12} className="text-gray-400" />
          {member.languages.map((l) => (
            <span key={l} className="text-[11px] font-semibold bg-blue-50 text-blue-600 rounded-md px-1.5 py-0.5">{l}</span>
          ))}
        </div>
        {member.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {member.certifications.map((c) => (
              <span key={c} className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-700 rounded-lg px-2 py-0.5 border border-amber-100">
                <Award size={10} />{c}
              </span>
            ))}
          </div>
        )}
        <Link
          to="/marketplace/staff"
          className="block w-full text-center bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors font-body"
        >
          View Full Profile
        </Link>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Modal: Venue Detail
// ---------------------------------------------------------------------------
function VenueModal({ venue, onClose }: { venue: VenuePost; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur rounded-full p-1 text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
        <img src={venue.image} alt={venue.name} className="w-full h-48 object-cover" />
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{venue.type}</span>
            <div className="flex items-center gap-1">
              <Stars rating={venue.rating} size={12} />
              <span className="text-xs text-gray-500">{venue.rating}</span>
            </div>
          </div>
          <h3 className="text-xl font-display text-gray-900 mb-2">{venue.name}</h3>
          <p className="text-sm text-gray-500 font-body mb-3 flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-400" />{venue.city}
          </p>
          <p className="text-sm text-gray-600 font-body mb-4">{venue.description}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-1">
              {venue.hiringRoles.length} position{venue.hiringRoles.length !== 1 ? 's' : ''} open
            </span>
            <span className="text-xs text-gray-500">{venue.payRange}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {venue.hiringRoles.map((r) => (
              <span key={r} className="text-xs bg-[var(--color-gold)]/10 text-[var(--color-gold)] rounded-lg px-2 py-0.5 font-semibold">{r}</span>
            ))}
          </div>
          <Link
            to="/marketplace/venue"
            className="block w-full text-center bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors font-body"
          >
            View Venue
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Modal: Job Detail
// ---------------------------------------------------------------------------
function JobModal({ job, onClose }: { job: JobPosting; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur rounded-full p-1 text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
        <img src={job.venueImage} alt={job.venueName} className="w-full h-44 object-cover" />
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{job.venueType}</span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${urgencyColors[job.urgency]}`}>
              {urgencyLabels[job.urgency]}
            </span>
          </div>
          <h3 className="text-xl font-display text-gray-900">{job.role}</h3>
          <p className="text-sm text-gray-500 font-body mb-4">at {job.venueName}</p>
          <div className="space-y-2 text-sm text-gray-600 font-body mb-4">
            <div className="flex items-center gap-2"><DollarSign size={14} className="text-[var(--color-gold)]" />{job.payRange}</div>
            <div className="flex items-center gap-2"><Clock size={14} className="text-gray-400" />{job.shiftTime}</div>
            <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-400" />{job.city} &middot; {job.distance}</div>
            <div className="flex items-center gap-2"><Users size={14} className="text-gray-400" />{job.applicants} applicants</div>
          </div>
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-1.5">Requirements</p>
            <div className="flex flex-wrap gap-1.5">
              {job.requirements.map((r) => (
                <span key={r} className="text-[11px] bg-gray-50 text-gray-600 rounded-lg px-2 py-0.5 border border-gray-100">{r}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5 mb-4">
            <Globe size={12} className="text-gray-400" />
            {job.languages.map((l) => (
              <span key={l} className="text-[11px] font-semibold bg-blue-50 text-blue-600 rounded-md px-1.5 py-0.5">{l}</span>
            ))}
          </div>
          <button className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors font-body">
            Apply Now
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">Posted {job.postedAgo}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function MarketplacePublic() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterPill>('All')
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)
  const [selectedVenue, setSelectedVenue] = useState<VenuePost | null>(null)
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)

  // Filter staff based on search + pill
  const filteredStaff = useMemo(() => {
    return staffMembers.filter((s) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)
      const matchesPill =
        activeFilter === 'All' ||
        (activeFilter === 'Bartenders' && s.role === 'Bartender') ||
        (activeFilter === 'Waiters' && (s.role === 'Waiter' || s.role === 'Waitress')) ||
        (activeFilter === 'Chefs' && (s.role === 'Chef' || s.role === 'Cook')) ||
        (activeFilter === 'Events' && s.role === 'Event Staff')
      return matchesSearch && matchesPill
    })
  }, [searchQuery, activeFilter])

  // Filter venues
  const filteredVenues = useMemo(() => {
    return venues.filter((v) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch = !q || v.name.toLowerCase().includes(q) || v.type.toLowerCase().includes(q) || v.city.toLowerCase().includes(q)
      const matchesPill = activeFilter === 'All' || activeFilter === 'Venues'
      return matchesSearch && matchesPill
    })
  }, [searchQuery, activeFilter])

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobPostings.filter((j) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch = !q || j.venueName.toLowerCase().includes(q) || j.role.toLowerCase().includes(q) || j.city.toLowerCase().includes(q)
      const matchesPill =
        activeFilter === 'All' ||
        (activeFilter === 'Bartenders' && j.role === 'Bartender') ||
        (activeFilter === 'Waiters' && (j.role === 'Waiter' || j.role === 'Waitress')) ||
        (activeFilter === 'Chefs' && (j.role === 'Chef' || j.role === 'Cook')) ||
        (activeFilter === 'Events' && j.role === 'Event Staff') ||
        activeFilter === 'Venues'
      return matchesSearch && matchesPill
    })
  }, [searchQuery, activeFilter])

  // Top rated staff (sorted by rating, pick top 5)
  const topStaff = useMemo(() => {
    return [...filteredStaff].sort((a, b) => b.rating - a.rating).slice(0, 6)
  }, [filteredStaff])

  // Featured venues
  const featuredVenues = useMemo(() => {
    return [...filteredVenues].sort((a, b) => b.rating - a.rating).slice(0, 4)
  }, [filteredVenues])

  const handleCategoryClick = useCallback((categoryName: string) => {
    const pillMap: Record<string, FilterPill> = {
      Bartender: 'Bartenders',
      Waiter: 'Waiters',
      Waitress: 'Waiters',
      Chef: 'Chefs',
      Cook: 'Chefs',
      'Event Staff': 'Events',
    }
    const pill = pillMap[categoryName]
    if (pill) {
      setActiveFilter(pill)
    } else {
      setSearchQuery(categoryName)
      setActiveFilter('All')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />

      {/* Modals */}
      <AnimatePresence>
        {selectedStaff && <StaffModal member={selectedStaff} onClose={() => setSelectedStaff(null)} />}
        {selectedVenue && <VenueModal venue={selectedVenue} onClose={() => setSelectedVenue(null)} />}
        {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>

      {/* ===== 1. HERO ===== */}
      <section className="bg-gradient-to-b from-[#FDFCFA] to-white pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-600 shadow-sm mb-6"
          >
            <Sparkles size={14} className="text-[var(--color-gold)]" />
            <span className="font-semibold font-body">TopSpots Marketplace</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl text-gray-900 leading-tight"
          >
            Discover Poland's Hospitality{' '}
            <span className="text-gradient-gold bg-clip-text text-transparent">Talent & Venues</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-body"
          >
            Browse top-rated staff, trending venues, and open positions across Poland
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search staff, venues, or jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white text-base font-body text-gray-700 shadow-md focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition"
              />
            </div>
          </motion.div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-5 flex flex-wrap justify-center gap-2"
          >
            {filterPills.map((pill) => (
              <button
                key={pill}
                onClick={() => setActiveFilter(pill)}
                className={`px-4 py-2 rounded-full text-sm font-semibold font-body transition-all ${
                  activeFilter === pill
                    ? 'bg-[var(--color-gold)] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]'
                }`}
              >
                {pill}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 2. TRENDING NOW ===== */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <FadeInSection>
            <h2 className="font-display text-2xl text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp size={22} className="text-[var(--color-gold)]" />
              Trending This Week
            </h2>
          </FadeInSection>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {trendingItems.map((item, i) => (
              <FadeInSection key={i} delay={i * 0.06}>
                <div className="flex-shrink-0 bg-gray-50 rounded-xl px-5 py-3.5 border border-gray-100 hover:border-[var(--color-gold)]/30 hover:shadow-sm transition-all cursor-pointer min-w-[280px]">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {item.type === 'venue' ? '\u{1F3E2}' : item.type === 'staff' ? '\u{2B50}' : '\u{1F4BC}'}
                    </span>
                    <p className="text-sm font-body text-gray-700 font-medium">{item.text}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. TOP RATED STAFF ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeInSection>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gray-900">Top Rated Staff</h2>
              <Link
                to="/marketplace/staff"
                className="text-sm font-semibold text-[var(--color-gold)] font-body flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All Staff <ArrowRight size={16} />
              </Link>
            </div>
          </FadeInSection>

          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {topStaff.map((member, i) => (
              <FadeInSection key={member.id} delay={i * 0.08}>
                <button
                  onClick={() => setSelectedStaff(member)}
                  className="flex-shrink-0 w-[260px] bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100" />
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 font-body truncate">{member.name}</h3>
                      <span className="text-xs text-gray-500 font-body">{member.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Stars rating={member.rating} size={12} />
                    <span className="text-xs text-gray-500">{member.rating}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-body mb-2">
                    <MapPin size={12} />{member.city}
                  </div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Globe size={11} className="text-gray-400" />
                    {member.languages.map((l) => (
                      <span key={l} className="text-[10px] font-semibold bg-blue-50 text-blue-600 rounded px-1 py-0.5">{l}</span>
                    ))}
                  </div>
                  {member.openToWork && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Open to Work
                    </span>
                  )}
                </button>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. FEATURED VENUES ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <FadeInSection>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gray-900">Featured Venues</h2>
              <Link
                to="/marketplace/venue"
                className="text-sm font-semibold text-[var(--color-gold)] font-body flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All Venues <ArrowRight size={16} />
              </Link>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVenues.map((v, i) => (
              <FadeInSection key={v.id} delay={i * 0.08}>
                <button
                  onClick={() => setSelectedVenue(v)}
                  className={`w-full bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left ${
                    v.rating >= 4.8 ? 'ring-2 ring-[var(--color-gold)]/40' : 'border border-gray-100'
                  }`}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                    {v.rating >= 4.8 && (
                      <span className="absolute top-3 left-3 text-[11px] font-bold bg-[var(--color-gold)] text-white rounded-full px-2.5 py-0.5">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{v.type}</span>
                      <div className="flex items-center gap-0.5">
                        <Star size={12} className="fill-[var(--color-gold)] text-[var(--color-gold)]" />
                        <span className="text-xs text-gray-600 font-semibold">{v.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 font-body">{v.name}</h3>
                    <p className="text-xs text-gray-500 font-body flex items-center gap-1 mt-0.5">
                      <MapPin size={11} />{v.city}
                    </p>
                    <span className="inline-block mt-2 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2 py-0.5">
                      {v.hiringRoles.length} position{v.hiringRoles.length !== 1 ? 's' : ''} open
                    </span>
                  </div>
                </button>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. LATEST JOB OPENINGS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeInSection>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gray-900">Latest Job Openings</h2>
              <Link
                to="/marketplace/demo"
                className="text-sm font-semibold text-[var(--color-gold)] font-body flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All Jobs <ArrowRight size={16} />
              </Link>
            </div>
          </FadeInSection>

          <div className="space-y-3">
            {filteredJobs.slice(0, 8).map((job, i) => (
              <FadeInSection key={job.id} delay={i * 0.04}>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="w-full flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-[var(--color-gold)]/20 transition-all text-left group"
                >
                  <img src={job.venueImage} alt={job.venueName} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-gray-900 font-body">{job.role}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${urgencyColors[job.urgency]}`}>
                        {urgencyLabels[job.urgency]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-body">{job.venueName} &middot; {job.venueType}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500 font-body shrink-0">
                    <span className="flex items-center gap-1"><MapPin size={12} />{job.city}</span>
                    <span className="flex items-center gap-1 text-[var(--color-gold)] font-semibold"><DollarSign size={12} />{job.payRange}</span>
                    <span className="text-gray-400">{job.postedAgo}</span>
                  </div>
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-[var(--color-gold)] transition-colors shrink-0" />
                </button>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. MARKETPLACE STATS ===== */}
      <section className="py-20 bg-[#FDFCFA] border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <StatCounter value={12000} suffix="+" label="Hospitality Pros" />
              <StatCounter value={340} suffix="+" label="Premium Venues" />
              <StatCounter value={2500} suffix="+" label="Jobs Filled" />
              <StatCounter value={48} suffix="" label="Average Rating" />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===== 7. HOW IT WORKS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeInSection>
            <h2 className="font-display text-2xl md:text-3xl text-gray-900 text-center mb-12">How It Works</h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Staff */}
            <FadeInSection delay={0}>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center mb-4">
                  <UserCheck size={20} className="text-[var(--color-gold)]" />
                </div>
                <h3 className="font-display text-lg text-gray-900 mb-3">For Staff</h3>
                <div className="space-y-3">
                  {['Create Profile', 'Get Matched', 'Start Earning'].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-sm text-gray-700 font-body font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>

            {/* For Venues */}
            <FadeInSection delay={0.1}>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center mb-4">
                  <Building2 size={20} className="text-[var(--color-gold)]" />
                </div>
                <h3 className="font-display text-lg text-gray-900 mb-3">For Venues</h3>
                <div className="space-y-3">
                  {['Post a Shift', 'Review Candidates', 'Hire Instantly'].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-sm text-gray-700 font-body font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>

            {/* For Everyone */}
            <FadeInSection delay={0.2}>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center mb-4">
                  <Search size={20} className="text-[var(--color-gold)]" />
                </div>
                <h3 className="font-display text-lg text-gray-900 mb-3">For Everyone</h3>
                <div className="space-y-3">
                  {['Browse', 'Discover', 'Connect'].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-sm text-gray-700 font-body font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ===== 8. CATEGORIES GRID ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <FadeInSection>
            <h2 className="font-display text-2xl md:text-3xl text-gray-900 text-center mb-10">Browse by Category</h2>
          </FadeInSection>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {categories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <FadeInSection key={cat.name} delay={i * 0.04}>
                  <button
                    onClick={() => handleCategoryClick(cat.name)}
                    className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 border border-gray-100 hover:border-[var(--color-gold)]/30 hover:shadow-md hover:-translate-y-0.5 transition-all w-full"
                  >
                    <Icon size={24} className="text-[var(--color-gold)]" />
                    <span className="text-xs font-semibold text-gray-800 font-body">{cat.name}</span>
                    <span className="text-[10px] text-gray-400 font-body">{cat.count}</span>
                  </button>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 9. CITY SPOTLIGHT ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeInSection>
            <h2 className="font-display text-2xl md:text-3xl text-gray-900 text-center mb-10">Explore by City</h2>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cityData.map((city, i) => (
              <FadeInSection key={city.name} delay={i * 0.08}>
                <div className="relative rounded-2xl overflow-hidden h-48 group cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${city.gradient} opacity-90`} />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                    <h3 className="text-2xl font-display mb-2">{city.name}</h3>
                    <div className="flex items-center gap-4 text-sm font-body opacity-90">
                      <span>{city.staff} staff</span>
                      <span className="w-1 h-1 rounded-full bg-white/60" />
                      <span>{city.venues} venues</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. CTA SECTION ===== */}
      <section className="py-20 bg-[#FDFCFA] border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInSection>
            <h2 className="font-display text-3xl md:text-4xl text-gray-900 text-center mb-4">Ready to Get Started?</h2>
            <p className="text-gray-500 font-body text-center mb-10 max-w-xl mx-auto">
              Whether you're looking for your next role or searching for top talent, TopSpots has you covered.
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-6">
            <FadeInSection delay={0}>
              <Link
                to="/marketplace/staff"
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-8 block hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center mb-4">
                  <UserCheck size={22} className="text-[var(--color-gold)]" />
                </div>
                <h3 className="font-display text-xl text-gray-900 mb-2">I'm Looking for Work</h3>
                <p className="text-sm text-gray-500 font-body mb-4">
                  Browse hundreds of shifts at top venues. Apply instantly and start earning.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold bg-[var(--color-gold)] text-white px-5 py-2.5 rounded-xl font-body group-hover:gap-2 transition-all">
                  Browse Jobs <ArrowRight size={16} />
                </span>
              </Link>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <Link
                to="/marketplace/venue"
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-8 block hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center mb-4">
                  <Building2 size={22} className="text-[var(--color-gold)]" />
                </div>
                <h3 className="font-display text-xl text-gray-900 mb-2">I'm Hiring Staff</h3>
                <p className="text-sm text-gray-500 font-body mb-4">
                  Access vetted hospitality professionals. Fill shifts in hours, not days.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold border-2 border-[var(--color-gold)] text-[var(--color-gold)] px-5 py-2.5 rounded-xl font-body group-hover:gap-2 transition-all">
                  Find Talent <ArrowRight size={16} />
                </span>
              </Link>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ===== 11. FOOTER ===== */}
      <Footer />
    </div>
  )
}
