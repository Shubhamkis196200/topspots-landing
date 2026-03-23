import { useState, useMemo, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  MapPin,
  Clock,
  Star,
  Sparkles,
  DollarSign,
  ChevronDown,
  Users,
  Building2,
  Briefcase,
  ArrowRight,
  BadgeCheck,
  Globe,
  Award,
  UserCheck,
  Zap,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  staffMembers,
  venues,
  jobPostings,
  allCities,
  allRoles,
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
            // ease-out quad
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
// Stat card used in hero
// ---------------------------------------------------------------------------
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value)
  return (
    <div className="flex flex-col items-center">
      <span ref={ref} className="text-3xl md:text-4xl font-display text-gray-900">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-sm text-gray-500 font-body mt-1">{label}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Star rating component
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
// Select dropdown (styled)
// ---------------------------------------------------------------------------
function FilterSelect({
  value,
  onChange,
  options,
  icon,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  icon?: React.ReactNode
}) {
  return (
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pr-9 text-sm font-body text-gray-700 shadow-sm focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition ${icon ? 'pl-9' : 'pl-3'}`}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Card animations
// ---------------------------------------------------------------------------
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
}

// ---------------------------------------------------------------------------
// Job card
// ---------------------------------------------------------------------------
function JobCard({ job, index }: { job: JobPosting; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={job.venueImage}
          alt={job.venueName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Urgency badge */}
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${urgencyColors[job.urgency]}`}
        >
          {urgencyLabels[job.urgency]}
        </span>
      </div>

      <div className="p-5 space-y-3">
        {/* Venue info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-body">{job.venueType}</p>
            <p className="text-sm font-semibold text-gray-800 font-body">{job.venueName}</p>
          </div>
          <div className="flex items-center gap-1">
            <Stars rating={job.venueRating} size={12} />
            <span className="text-xs text-gray-500">{job.venueRating}</span>
          </div>
        </div>

        {/* Role */}
        <h3 className="text-lg font-bold text-gray-900 font-body">{job.role}</h3>

        {/* Details */}
        <div className="space-y-1.5 text-sm text-gray-600 font-body">
          <div className="flex items-center gap-2">
            <DollarSign size={14} className="text-[var(--color-gold)]" />
            <span>{job.payRange}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            <span>{job.shiftTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" />
            <span>{job.city}</span>
            <span className="ml-auto text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">{job.distance}</span>
          </div>
        </div>

        {/* Requirements */}
        <div className="flex flex-wrap gap-1.5">
          {job.requirements.map((r) => (
            <span key={r} className="text-[11px] bg-gray-50 text-gray-600 rounded-lg px-2 py-0.5 border border-gray-100">
              {r}
            </span>
          ))}
        </div>

        {/* Languages */}
        <div className="flex items-center gap-1.5">
          <Globe size={12} className="text-gray-400" />
          {job.languages.map((l) => (
            <span
              key={l}
              className="text-[11px] font-semibold bg-blue-50 text-blue-600 rounded-md px-1.5 py-0.5"
            >
              {l}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gray-50">
          <span>{job.postedAgo}</span>
          <span className="flex items-center gap-1">
            <Users size={12} /> {job.applicants} applicants
          </span>
        </div>

        {/* CTA */}
        <button className="w-full mt-2 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors font-body">
          Apply Now
        </button>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Staff card
// ---------------------------------------------------------------------------
function StaffCard({ member, index }: { member: StaffMember; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      {/* Top row */}
      <div className="flex items-start gap-4">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900 font-body truncate">{member.name}</h3>
            {member.openToWork && (
              <span className="text-[11px] font-semibold bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20 rounded-full px-2 py-0.5 whitespace-nowrap">
                Open to Work
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 font-body">
            {member.role} &middot; {member.specialty}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <Stars rating={member.rating} size={12} />
            <span className="text-xs text-gray-500">
              {member.rating} ({member.reviews})
            </span>
          </div>
        </div>
        {/* Match score */}
        <span
          className={`shrink-0 text-xs font-bold rounded-full px-2.5 py-1 ${
            member.matchScore >= 90
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : member.matchScore >= 80
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'bg-gray-50 text-gray-600 border border-gray-200'
          }`}
        >
          {member.matchScore}% Match
        </span>
      </div>

      {/* Languages */}
      <div className="flex items-center gap-1.5 mt-4">
        <Globe size={12} className="text-gray-400 shrink-0" />
        {member.languages.map((l) => (
          <span key={l} className="text-[11px] font-semibold bg-blue-50 text-blue-600 rounded-md px-1.5 py-0.5">
            {l}
          </span>
        ))}
      </div>

      {/* Certifications */}
      {member.certifications.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {member.certifications.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-700 rounded-lg px-2 py-0.5 border border-amber-100">
              <Award size={10} />
              {c}
            </span>
          ))}
        </div>
      )}

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600 font-body">
        <div className="flex items-center gap-1.5">
          <DollarSign size={14} className="text-[var(--color-gold)]" />
          <span>{member.hourlyRate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-gray-400" />
          <span>{member.city}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase size={14} className="text-gray-400" />
          <span>{member.experience}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-gray-400" />
          <span className="truncate">{member.availability}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-5">
        <button className="flex-1 border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)]/5 font-semibold text-sm py-2.5 rounded-xl transition-colors font-body">
          View Profile
        </button>
        <button className="flex-1 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors font-body">
          Invite
        </button>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function MarketplaceDemo() {
  // Tab state
  const [activeTab, setActiveTab] = useState<'jobs' | 'staff'>('jobs')

  // Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedRole, setSelectedRole] = useState('All Roles')
  const [minRating, setMinRating] = useState('Any')

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobPostings.filter((j) => {
      const matchesSearch =
        !searchQuery ||
        j.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.venueType.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCity = selectedCity === 'All Cities' || j.city === selectedCity
      const matchesRole = selectedRole === 'All Roles' || j.role === selectedRole
      const matchesRating =
        minRating === 'Any' || j.venueRating >= parseFloat(minRating)
      return matchesSearch && matchesCity && matchesRole && matchesRating
    })
  }, [searchQuery, selectedCity, selectedRole, minRating])

  // Filtered staff
  const filteredStaff = useMemo(() => {
    return staffMembers.filter((s) => {
      const matchesSearch =
        !searchQuery ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCity = selectedCity === 'All Cities' || s.city === selectedCity
      const matchesRole = selectedRole === 'All Roles' || s.role === selectedRole
      const matchesRating = minRating === 'Any' || s.rating >= parseFloat(minRating)
      return matchesSearch && matchesCity && matchesRole && matchesRating
    })
  }, [searchQuery, selectedCity, selectedRole, minRating])

  const resultCount = activeTab === 'jobs' ? filteredJobs.length : filteredStaff.length

  const tabs = [
    { id: 'jobs' as const, label: 'Find Jobs', icon: <Briefcase size={16} /> },
    { id: 'staff' as const, label: 'Find Staff', icon: <Users size={16} /> },
  ]

  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />

      {/* ----------------------------------------------------------------- */}
      {/* Hero */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-[#FDFCFA] pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-600 shadow-sm mb-6"
          >
            <Sparkles size={14} className="text-[var(--color-gold)]" />
            <span className="font-semibold font-body">TopSpots Marketplace</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl text-gray-900 leading-tight"
          >
            Find Your Next{' '}
            <span className="text-gradient-gold bg-clip-text text-transparent">Opportunity</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-body"
          >
            Connect top hospitality talent with the best venues in Poland
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-12 flex items-center justify-center gap-10 md:gap-16"
          >
            <StatCard value={340} suffix="+" label="Venues" />
            <div className="h-10 w-px bg-gray-200" />
            <StatCard value={2000} suffix="+" label="Staff" />
            <div className="h-10 w-px bg-gray-200" />
            <StatCard value={12000} suffix="+" label="Shifts Filled" />
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Tabs + Filters + Content */}
      {/* ----------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        {/* Tab navigation */}
        <div className="border-b border-gray-200 mt-4">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 pb-3 pt-2 text-sm font-semibold font-body transition-colors ${
                  activeTab === tab.id ? 'text-[var(--color-gold)]' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-gold)] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={activeTab === 'jobs' ? 'Search roles, venues...' : 'Search names, roles...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-body text-gray-700 shadow-sm focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition"
              />
            </div>

            <FilterSelect
              value={selectedCity}
              onChange={setSelectedCity}
              options={allCities}
              icon={<MapPin size={14} />}
            />
            <FilterSelect
              value={selectedRole}
              onChange={setSelectedRole}
              options={allRoles}
              icon={<Briefcase size={14} />}
            />
            <FilterSelect
              value={minRating}
              onChange={setMinRating}
              options={['Any', '4.0+', '4.5+', '4.8+']}
              icon={<Star size={14} />}
            />
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 font-body mt-5 mb-4">
          Showing <span className="font-semibold text-gray-800">{resultCount}</span> result{resultCount !== 1 ? 's' : ''}
        </p>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'jobs' && (
            <motion.div
              key="jobs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job, i) => (
                    <JobCard key={job.id} job={job} index={i} />
                  ))}
                </div>
              ) : (
                <EmptyState message="No job postings match your filters. Try adjusting your search." />
              )}
            </motion.div>
          )}

          {activeTab === 'staff' && (
            <motion.div
              key="staff"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {filteredStaff.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStaff.map((member, i) => (
                    <StaffCard key={member.id} member={member} index={i} />
                  ))}
                </div>
              ) : (
                <EmptyState message="No staff members match your filters. Try adjusting your search." />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom CTA */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-[#F8F9FB] py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-500 font-body mb-10 max-w-xl mx-auto">
            Whether you are looking for your next hospitality role or searching for top talent, TopSpots has you covered.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Staff CTA */}
            <a
              href="/marketplace/staff"
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-left hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center mb-4">
                <UserCheck size={22} className="text-[var(--color-gold)]" />
              </div>
              <h3 className="font-display text-xl text-gray-900 mb-2">I'm Looking for Work</h3>
              <p className="text-sm text-gray-500 font-body mb-4">
                Browse hundreds of shifts at top venues. Apply instantly and start earning.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-gold)] font-body group-hover:gap-2 transition-all">
                Browse Jobs <ArrowRight size={16} />
              </span>
            </a>

            {/* Venue CTA */}
            <a
              href="/marketplace/venue"
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-left hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center mb-4">
                <Building2 size={22} className="text-[var(--color-gold)]" />
              </div>
              <h3 className="font-display text-xl text-gray-900 mb-2">I'm Hiring Staff</h3>
              <p className="text-sm text-gray-500 font-body mb-4">
                Access vetted hospitality professionals. Fill shifts in hours, not days.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-gold)] font-body group-hover:gap-2 transition-all">
                Find Talent <ArrowRight size={16} />
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Search size={40} className="text-gray-300 mb-4" />
      <p className="text-gray-500 font-body max-w-sm">{message}</p>
    </div>
  )
}
