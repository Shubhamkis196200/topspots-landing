import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Bell,
  Bookmark,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  Eye,
  ExternalLink,
  Globe,
  MapPin,
  Sparkles,
  Star,
  TrendingUp,
  User,
  Users,
  Zap,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  staffMembers,
  jobPostings,
  venues,
  urgencyLabels,
  urgencyColors,
  type StaffMember,
  type JobPosting,
} from '@/data/marketplaceData'

// ----- Helpers -----

const currentUser: StaffMember = staffMembers[0] // Maria Kowalska

function computeMatchScore(job: JobPosting): number {
  let score = 60
  const roleLower = job.role.toLowerCase()
  const userRoleLower = currentUser.role.toLowerCase()
  if (roleLower === userRoleLower) score += 20
  else if (roleLower.includes('bar') && userRoleLower.includes('bar')) score += 15
  else if (roleLower === 'sommelier' && currentUser.certifications.some(c => c.includes('WSET'))) score += 18
  if (job.city === currentUser.city) score += 10
  if (currentUser.rating >= 4.8) score += 5
  const langOverlap = job.languages.filter(l => currentUser.languages.includes(l)).length
  score += langOverlap * 3
  score = Math.min(score, 99)
  return score
}

function matchTags(job: JobPosting): string[] {
  const tags: string[] = []
  if (job.role.toLowerCase() === currentUser.role.toLowerCase()) tags.push('Role match')
  else if (job.role === 'Sommelier' && currentUser.certifications.some(c => c.includes('WSET'))) tags.push('Cert match')
  if (job.city === currentUser.city) tags.push('Same city')
  if (currentUser.rating >= 4.8) tags.push('High rating')
  const langOverlap = job.languages.filter(l => currentUser.languages.includes(l))
  if (langOverlap.length >= 2) tags.push('Language fit')
  if (job.urgency === 'tonight' || job.urgency === 'this-weekend') tags.push('Urgent')
  return tags.length > 0 ? tags : ['Recommended']
}

type SlotState = 'available' | 'busy' | 'empty'

const DAYS = ['Mon 24', 'Tue 25', 'Wed 26', 'Thu 27', 'Fri 28', 'Sat 29', 'Sun 30']
const PERIODS = ['Morning', 'Afternoon', 'Evening'] as const

const initialCalendar: SlotState[][] = [
  ['busy', 'busy', 'available'],       // Mon
  ['empty', 'available', 'available'],  // Tue
  ['busy', 'busy', 'available'],        // Wed
  ['empty', 'empty', 'available'],      // Thu
  ['empty', 'available', 'available'],  // Fri
  ['available', 'available', 'available'], // Sat
  ['available', 'available', 'available'], // Sun
]

interface Application {
  venueName: string
  role: string
  appliedDate: string
  status: 'Interview' | 'Under Review' | 'Applied' | 'Accepted'
}

const applications: Application[] = [
  { venueName: 'Craft & Cork', role: 'Bartender', appliedDate: 'Mar 18, 2026', status: 'Interview' },
  { venueName: 'Smoke & Mirrors', role: 'Sommelier', appliedDate: 'Mar 16, 2026', status: 'Under Review' },
  { venueName: 'Skyline Lounge', role: 'Bartender', appliedDate: 'Mar 14, 2026', status: 'Applied' },
  { venueName: 'The Green Bean', role: 'Barista', appliedDate: 'Mar 10, 2026', status: 'Accepted' },
]

const statusColors: Record<Application['status'], string> = {
  Interview: 'bg-blue-100 text-blue-700',
  'Under Review': 'bg-amber-100 text-amber-700',
  Applied: 'bg-gray-100 text-gray-600',
  Accepted: 'bg-emerald-100 text-emerald-700',
}

// ----- Animation variants -----

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

const sectionFade = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// ----- Component -----

export default function MarketplaceStaffView() {
  const [openToWork, setOpenToWork] = useState(currentUser.openToWork)
  const [calendar, setCalendar] = useState<SlotState[][]>(initialCalendar)
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set())

  const profileCompleteness = 85

  const matchedJobs = jobPostings
    .map(job => ({ ...job, computedScore: computeMatchScore(job) }))
    .sort((a, b) => b.computedScore - a.computedScore)
    .slice(0, 6)

  function cycleSlot(dayIdx: number, periodIdx: number) {
    setCalendar(prev => {
      const next = prev.map(row => [...row])
      const current = next[dayIdx][periodIdx]
      if (current === 'empty') next[dayIdx][periodIdx] = 'available'
      else if (current === 'available') next[dayIdx][periodIdx] = 'busy'
      else next[dayIdx][periodIdx] = 'empty'
      return next
    })
  }

  function toggleSave(jobId: number) {
    setSavedJobs(prev => {
      const next = new Set(prev)
      if (next.has(jobId)) next.delete(jobId)
      else next.add(jobId)
      return next
    })
  }

  function scoreColor(score: number) {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200'
    if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200'
    return 'text-gray-500 bg-gray-50 border-gray-200'
  }

  function slotBg(state: SlotState) {
    if (state === 'available') return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    if (state === 'busy') return 'bg-gray-200 text-gray-500 border-gray-300'
    return 'bg-white text-gray-400 border-gray-200'
  }

  function slotLabel(state: SlotState) {
    if (state === 'available') return 'Free'
    if (state === 'busy') return 'Busy'
    return '-'
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* ===== 1. HEADER BAR ===== */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionFade}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Left: avatar + name */}
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#C9A14A]/30"
              />
              <div>
                <h1 className="font-display text-2xl sm:text-3xl text-gray-900">My Dashboard</h1>
                <p className="text-sm text-gray-500 font-body">{currentUser.name} &middot; {currentUser.role}</p>
              </div>
            </div>

            {/* Right: toggle + progress + bell */}
            <div className="flex items-center gap-6 flex-wrap">
              {/* Open to Work toggle */}
              <button
                onClick={() => setOpenToWork(!openToWork)}
                className="flex items-center gap-3 group"
              >
                <span className="text-sm font-medium text-gray-600 font-body">Open to Work</span>
                <div
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    openToWork ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                      openToWork ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </button>

              {/* Profile completeness ring */}
              <div className="relative w-12 h-12 flex-shrink-0" title={`Profile ${profileCompleteness}% complete`}>
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="#C9A14A"
                    strokeWidth="3"
                    strokeDasharray={`${(profileCompleteness / 100) * 125.66} 125.66`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-gray-700">
                  {profileCompleteness}%
                </span>
              </div>

              {/* Notification bell */}
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </motion.section>

        {/* ===== 2. QUICK STATS ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={sectionFade}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {[
            {
              label: 'Match Score',
              value: '96%',
              sub: '+4% this week',
              icon: <Zap className="w-5 h-5" />,
              trend: true,
            },
            {
              label: 'Profile Views',
              value: '234',
              sub: 'This week',
              icon: <Eye className="w-5 h-5" />,
              trend: false,
            },
            {
              label: 'Applications',
              value: '5',
              sub: 'Pending',
              icon: <BriefcaseBusiness className="w-5 h-5" />,
              trend: false,
            },
            {
              label: 'Avg Rating',
              value: '4.9',
              sub: '142 reviews',
              icon: <Star className="w-5 h-5" />,
              trend: false,
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#C9A14A]/10 flex items-center justify-center text-[#C9A14A] flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide font-body">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-gray-900 font-body">{stat.value}</span>
                  {stat.trend && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                </div>
                <p className="text-xs text-gray-400 mt-0.5 font-body">{stat.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* ===== 3. MATCHED OPPORTUNITIES ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={sectionFade}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-[#C9A14A]" />
            <h2 className="font-display text-2xl text-gray-900">Opportunities For You</h2>
          </div>
          <p className="text-sm text-gray-500 font-body mb-6">
            AI-matched based on your skills, rating, and availability
          </p>

          <div className="grid gap-4">
            {matchedJobs.map((job, i) => {
              const tags = matchTags(job)
              return (
                <motion.div
                  key={job.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-20px' }}
                  variants={fadeUp}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Match score badge */}
                    <div className="flex sm:flex-col items-center gap-3 sm:gap-1 sm:min-w-[72px]">
                      <div
                        className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-bold text-lg ${scoreColor(
                          job.computedScore
                        )}`}
                      >
                        {job.computedScore}%
                        <span className="text-[9px] font-normal uppercase tracking-wide">Match</span>
                      </div>
                    </div>

                    {/* Venue thumbnail */}
                    <img
                      src={job.venueImage}
                      alt={job.venueName}
                      className="w-full sm:w-28 h-20 sm:h-20 object-cover rounded-xl flex-shrink-0"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-display text-lg text-gray-900">{job.venueName}</h3>
                        <span className="text-xs text-gray-400 font-body">{job.venueType}</span>
                        <span className="flex items-center gap-0.5 text-xs text-[#C9A14A]">
                          <Star className="w-3 h-3 fill-[#C9A14A]" /> {job.venueRating}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-gray-700 font-body">{job.role} &middot; {job.payRange}</p>
                      <p className="text-xs text-gray-500 font-body mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {job.shiftTime}
                      </p>
                      <p className="text-xs text-gray-400 font-body mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {job.city} &middot; {job.distance}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${urgencyColors[job.urgency]}`}
                        >
                          {urgencyLabels[job.urgency]}
                        </span>
                        {tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#C9A14A]/10 text-[#C9A14A] border border-[#C9A14A]/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col items-center gap-2 sm:justify-center flex-shrink-0">
                      <button className="px-5 py-2 bg-[#C9A14A] text-white text-sm font-semibold rounded-xl hover:bg-[#b8913e] transition-colors font-body">
                        Apply
                      </button>
                      <button
                        onClick={() => toggleSave(job.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors font-body flex items-center gap-1.5 ${
                          savedJobs.has(job.id)
                            ? 'bg-[#C9A14A]/10 border-[#C9A14A]/30 text-[#C9A14A]'
                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${savedJobs.has(job.id) ? 'fill-[#C9A14A]' : ''}`} />
                        {savedJobs.has(job.id) ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* ===== 4. AVAILABILITY CALENDAR ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={sectionFade}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-5 h-5 text-[#C9A14A]" />
                <h2 className="font-display text-2xl text-gray-900">My Availability</h2>
              </div>
              <p className="text-xs text-gray-400 font-body">Click slots to toggle: Available / Busy / Empty</p>
            </div>
            <p className="text-xs text-gray-400 font-body flex items-center gap-1">
              <Clock className="w-3 h-3" /> Last updated: Today
            </p>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-4 text-xs font-body">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200" /> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-gray-200 border border-gray-300" /> Busy
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-white border border-gray-200" /> Empty
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr>
                  <th className="text-xs font-medium text-gray-400 font-body text-left pb-2 w-24" />
                  {DAYS.map(day => (
                    <th key={day} className="text-xs font-semibold text-gray-600 font-body text-center pb-2 px-1">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERIODS.map((period, pIdx) => (
                  <tr key={period}>
                    <td className="text-xs font-medium text-gray-500 font-body py-1 pr-2">{period}</td>
                    {DAYS.map((_, dIdx) => {
                      const state = calendar[dIdx][pIdx]
                      return (
                        <td key={dIdx} className="p-1 text-center">
                          <button
                            onClick={() => cycleSlot(dIdx, pIdx)}
                            className={`w-full py-2.5 rounded-lg border text-[11px] font-semibold transition-all duration-200 hover:scale-105 cursor-pointer ${slotBg(
                              state
                            )}`}
                          >
                            {slotLabel(state)}
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* ===== 5. APPLIED JOBS ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={sectionFade}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <BriefcaseBusiness className="w-5 h-5 text-[#C9A14A]" />
            <h2 className="font-display text-2xl text-gray-900">My Applications</h2>
          </div>

          <div className="grid gap-3">
            {applications.map((app, i) => (
              <motion.div
                key={`${app.venueName}-${app.role}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-display text-base text-gray-900">
                    {app.venueName} <span className="text-gray-400 font-body text-sm">&mdash; {app.role}</span>
                  </h3>
                  <p className="text-xs text-gray-400 font-body mt-0.5">Applied {app.appliedDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${statusColors[app.status]}`}
                  >
                    {app.status === 'Accepted' && <CheckCircle2 className="w-3 h-3" />}
                    {app.status}
                  </span>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ===== 6. PROFILE SECTION ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={sectionFade}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-12"
        >
          <h2 className="font-display text-2xl text-gray-900 mb-6">My Profile</h2>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar + info */}
            <div className="flex items-start gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#C9A14A]/20"
              />
              <div>
                <h3 className="font-display text-xl text-gray-900">{currentUser.name}</h3>
                <p className="text-sm text-gray-500 font-body">{currentUser.role} &middot; {currentUser.specialty}</p>
                <p className="text-sm text-gray-400 font-body flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {currentUser.city}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-[#C9A14A] fill-[#C9A14A]" />
                  <span className="text-sm font-semibold text-gray-700 font-body">{currentUser.rating}</span>
                  <span className="text-xs text-gray-400 font-body">({currentUser.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              {/* Skills & Certifications */}
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide font-body mb-2">
                  Skills & Certifications
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentUser.certifications.map(cert => (
                    <span
                      key={cert}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-[#C9A14A]/10 text-[#C9A14A] border border-[#C9A14A]/20 font-body"
                    >
                      {cert}
                    </span>
                  ))}
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 font-body">
                    {currentUser.specialty}
                  </span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 font-body">
                    {currentUser.experience} experience
                  </span>
                </div>
              </div>

              {/* Languages */}
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide font-body mb-2">Languages</p>
                <div className="flex gap-2">
                  {currentUser.languages.map(lang => (
                    <span
                      key={lang}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 font-body flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" /> {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A14A] text-white text-sm font-semibold rounded-xl hover:bg-[#b8913e] transition-colors font-body">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-body">
                  <ExternalLink className="w-4 h-4" /> View Public Profile
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== 7. NAVIGATION LINKS ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={sectionFade}
          className="grid sm:grid-cols-2 gap-4"
        >
          <Link
            to="/marketplace/demo"
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md hover:border-[#C9A14A]/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C9A14A]/10 flex items-center justify-center text-[#C9A14A]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display text-base text-gray-900">Browse Marketplace</p>
                <p className="text-xs text-gray-400 font-body">Explore all venues and opportunities</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#C9A14A] transition-colors" />
          </Link>

          <Link
            to="/marketplace/venue"
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md hover:border-[#C9A14A]/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C9A14A]/10 flex items-center justify-center text-[#C9A14A]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display text-base text-gray-900">Switch to Venue View</p>
                <p className="text-xs text-gray-400 font-body">Manage your venue dashboard</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#C9A14A] transition-colors" />
          </Link>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
