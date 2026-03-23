import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Sparkles,
  Plus,
  Briefcase,
  Users,
  Clock3,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Send,
  MessageSquare,
  Eye,
  Edit3,
  XCircle,
  Calendar,
  DollarSign,
  Award,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  History,
  BadgeCheck,
  CheckCircle2,
  Filter,
  UserPlus,
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
} from '@/data/marketplaceData'

const venue = venues[0]

const roleOptions = [
  'Bartender',
  'Waiter',
  'Waitress',
  'Chef',
  'Cook',
  'DJ',
  'Barista',
  'Host',
  'Sommelier',
  'Event Staff',
  'Manager',
]

const languageOptions = ['PL', 'EN', 'DE', 'FR', 'RU', 'ES']

const urgencyOptions: { value: string; label: string }[] = [
  { value: 'tonight', label: 'Tonight' },
  { value: 'this-weekend', label: 'This Weekend' },
  { value: 'this-week', label: 'This Week' },
  { value: 'ongoing', label: 'Ongoing' },
]

interface ShiftFormData {
  role: string
  date: string
  startTime: string
  endTime: string
  payMin: string
  payMax: string
  requirements: string[]
  languages: string[]
  urgency: string
  description: string
}

const emptyForm: ShiftFormData = {
  role: 'Bartender',
  date: '',
  startTime: '',
  endTime: '',
  payMin: '',
  payMax: '',
  requirements: [],
  languages: [],
  urgency: 'this-weekend',
  description: '',
}

interface ShiftHistoryEntry {
  id: number
  staffName: string
  staffAvatar: string
  role: string
  date: string
  hoursWorked: number
  staffRating: number
  venueRating: number
  tipAmount: number
}

const shiftHistory: ShiftHistoryEntry[] = [
  {
    id: 1,
    staffName: 'Maria Kowalska',
    staffAvatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Bartender',
    date: '2026-03-22',
    hoursWorked: 8,
    staffRating: 5,
    venueRating: 4.9,
    tipAmount: 320,
  },
  {
    id: 2,
    staffName: 'Elena Petrova',
    staffAvatar: 'https://i.pravatar.cc/150?img=10',
    role: 'Sommelier',
    date: '2026-03-21',
    hoursWorked: 6,
    staffRating: 5,
    venueRating: 4.8,
    tipAmount: 480,
  },
  {
    id: 3,
    staffName: 'Jakub Nowak',
    staffAvatar: 'https://i.pravatar.cc/150?img=3',
    role: 'Waiter',
    date: '2026-03-20',
    hoursWorked: 7,
    staffRating: 4,
    venueRating: 4.7,
    tipAmount: 210,
  },
  {
    id: 4,
    staffName: 'Natalia Szymanska',
    staffAvatar: 'https://i.pravatar.cc/150?img=21',
    role: 'Barista',
    date: '2026-03-19',
    hoursWorked: 6,
    staffRating: 5,
    venueRating: 4.9,
    tipAmount: 190,
  },
  {
    id: 5,
    staffName: 'Mateusz Wojcik',
    staffAvatar: 'https://i.pravatar.cc/150?img=12',
    role: 'Bartender',
    date: '2026-03-18',
    hoursWorked: 9,
    staffRating: 4,
    venueRating: 4.6,
    tipAmount: 540,
  },
  {
    id: 6,
    staffName: 'Sofia Hernandez',
    staffAvatar: 'https://i.pravatar.cc/150?img=9',
    role: 'Barista',
    date: '2026-03-17',
    hoursWorked: 5,
    staffRating: 5,
    venueRating: 4.8,
    tipAmount: 710,
  },
]

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? 'fill-[#C9A14A] text-[#C9A14A]'
              : 'text-gray-300'
          }
        />
      ))}
    </span>
  )
}

function MatchBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-20 text-gray-500 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            value >= 90
              ? 'bg-emerald-500'
              : value >= 80
                ? 'bg-amber-500'
                : 'bg-gray-400'
          }`}
        />
      </div>
      <span className="w-8 text-right text-gray-600 font-medium">{value}%</span>
    </div>
  )
}

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function MarketplaceVenueView() {
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState<ShiftFormData>({ ...emptyForm })
  const [reqInput, setReqInput] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'price'>('match')
  const [expandedPosting, setExpandedPosting] = useState<number | null>(null)

  // Venue postings from data (venueId=1) plus any newly created
  const basePostings = jobPostings.filter((j) => j.venueId === 1)
  const [localPostings, setLocalPostings] = useState(basePostings)

  // Posting statuses
  const postingStatuses: Record<number, { label: string; color: string }> = {
    3: { label: 'Active', color: 'bg-emerald-100 text-emerald-700' },
  }

  const addRequirement = () => {
    const trimmed = reqInput.trim()
    if (trimmed && !form.requirements.includes(trimmed)) {
      setForm((p) => ({ ...p, requirements: [...p.requirements, trimmed] }))
      setReqInput('')
    }
  }

  const removeRequirement = (req: string) => {
    setForm((p) => ({
      ...p,
      requirements: p.requirements.filter((r) => r !== req),
    }))
  }

  const toggleLanguage = (lang: string) => {
    setForm((p) => ({
      ...p,
      languages: p.languages.includes(lang)
        ? p.languages.filter((l) => l !== lang)
        : [...p.languages, lang],
    }))
  }

  const handleSubmit = () => {
    const newPosting = {
      id: 100 + localPostings.length,
      venueId: 1,
      venueName: venue.name,
      venueType: venue.type,
      venueImage: venue.image,
      venueRating: venue.rating,
      city: venue.city,
      role: form.role,
      payRange: `${form.payMin || '30'}-${form.payMax || '50'} PLN/hr`,
      urgency: form.urgency as 'tonight' | 'this-weekend' | 'this-week' | 'ongoing',
      shiftTime: `${form.date || 'TBD'}, ${form.startTime || '18:00'} - ${form.endTime || '02:00'}`,
      requirements: form.requirements,
      languages: form.languages,
      postedAgo: 'Just now',
      applicants: 0,
      distance: '0 km',
    }
    setLocalPostings((prev) => [newPosting, ...prev])
    postingStatuses[newPosting.id] = { label: 'Active', color: 'bg-emerald-100 text-emerald-700' }
    setForm({ ...emptyForm })
    setFormOpen(false)
    setToast('Shift posted successfully!')
    setTimeout(() => setToast(null), 3000)
  }

  const sortedCandidates = useMemo(() => {
    const sorted = [...staffMembers]
    switch (sortBy) {
      case 'match':
        sorted.sort((a, b) => b.matchScore - a.matchScore)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'price':
        sorted.sort((a, b) => {
          const aVal = parseInt(a.hourlyRate)
          const bVal = parseInt(b.hourlyRate)
          return aVal - bVal
        })
        break
    }
    return sorted
  }, [sortBy])

  const avgStaffRating =
    shiftHistory.reduce((sum, s) => sum + s.staffRating, 0) / shiftHistory.length
  const totalTips = shiftHistory.reduce((sum, s) => sum + s.tipAmount, 0)

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-6 z-50 bg-white border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2"
            >
              <CheckCircle2 size={18} />
              <span className="font-body text-sm font-medium">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ──────────── 1. HEADER ──────────── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
        >
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-gray-900 mb-2">
              Venue Dashboard
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-body text-lg text-gray-700 font-medium">
                {venue.name}
              </span>
              <span className="text-xs font-body font-semibold px-2.5 py-1 rounded-full bg-[#C9A14A]/10 text-[#C9A14A] border border-[#C9A14A]/20">
                {venue.type}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-600">
                <Star size={14} className="fill-[#C9A14A] text-[#C9A14A]" />
                <span className="font-medium">{venue.rating}</span>
              </span>
            </div>
          </div>
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C9A14A] text-white font-body font-semibold text-sm hover:bg-[#b8913f] transition-colors shadow-sm"
          >
            <Plus size={18} />
            Post a Shift
          </button>
        </motion.section>

        {/* ──────────── 2. QUICK STATS ──────────── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {[
            {
              label: 'Active Postings',
              value: '3',
              icon: Briefcase,
              trend: '+1 this week',
              up: true,
            },
            {
              label: 'Total Applicants',
              value: '24',
              icon: Users,
              trend: '+8 today',
              up: true,
            },
            {
              label: 'Shifts Filled',
              value: '156',
              icon: CheckCircle2,
              trend: 'this month',
              up: true,
            },
            {
              label: 'Avg Fill Time',
              value: '4.2 hrs',
              icon: Clock3,
              trend: '-1.3 hrs vs last mo',
              up: false,
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                  <stat.icon size={18} className="text-gray-500" />
                </span>
                <span
                  className={`flex items-center gap-0.5 text-xs font-medium ${
                    stat.up ? 'text-emerald-600' : 'text-emerald-600'
                  }`}
                >
                  {stat.up ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <ArrowDownRight size={12} />
                  )}
                  {stat.trend}
                </span>
              </div>
              <p className="font-display text-2xl text-gray-900">{stat.value}</p>
              <p className="font-body text-xs text-gray-500 mt-0.5">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.section>

        {/* ──────────── 3. POST A SHIFT FORM ──────────── */}
        <AnimatePresence>
          {formOpen && (
            <motion.section
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mb-10"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="font-display text-xl text-gray-900 mb-6">
                  Post a New Shift
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Role */}
                  <div>
                    <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
                      Role
                    </label>
                    <select
                      value={form.role}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, role: e.target.value }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-body text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A14A]/40 focus:border-[#C9A14A] transition-colors"
                    >
                      {roleOptions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, date: e.target.value }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-body text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A14A]/40 focus:border-[#C9A14A] transition-colors"
                    />
                  </div>

                  {/* Start Time */}
                  <div>
                    <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={form.startTime}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, startTime: e.target.value }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-body text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A14A]/40 focus:border-[#C9A14A] transition-colors"
                    />
                  </div>

                  {/* End Time */}
                  <div>
                    <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={form.endTime}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, endTime: e.target.value }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-body text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A14A]/40 focus:border-[#C9A14A] transition-colors"
                    />
                  </div>

                  {/* Pay Min */}
                  <div>
                    <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
                      Pay Range (PLN/hr)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={form.payMin}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, payMin: e.target.value }))
                        }
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-body text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A14A]/40 focus:border-[#C9A14A] transition-colors"
                      />
                      <span className="text-gray-400 text-sm">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={form.payMax}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, payMax: e.target.value }))
                        }
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-body text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A14A]/40 focus:border-[#C9A14A] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Urgency */}
                  <div>
                    <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
                      Urgency
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {urgencyOptions.map((opt) => (
                        <label
                          key={opt.value}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-body font-medium cursor-pointer transition-colors ${
                            form.urgency === opt.value
                              ? 'bg-[#C9A14A]/10 border-[#C9A14A]/40 text-[#C9A14A]'
                              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="urgency"
                            value={opt.value}
                            checked={form.urgency === opt.value}
                            onChange={() =>
                              setForm((p) => ({ ...p, urgency: opt.value }))
                            }
                            className="sr-only"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mt-5">
                  <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
                    Requirements
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type a requirement and press Enter"
                      value={reqInput}
                      onChange={(e) => setReqInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addRequirement()
                        }
                      }}
                      className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2.5 font-body text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A14A]/40 focus:border-[#C9A14A] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={addRequirement}
                      className="px-3 py-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {form.requirements.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.requirements.map((req) => (
                        <span
                          key={req}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-body font-medium"
                        >
                          {req}
                          <button
                            onClick={() => removeRequirement(req)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Languages */}
                <div className="mt-5">
                  <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
                    Language Requirements
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map((lang) => (
                      <label
                        key={lang}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-body font-medium cursor-pointer transition-colors ${
                          form.languages.includes(lang)
                            ? 'bg-[#C9A14A]/10 border-[#C9A14A]/40 text-[#C9A14A]'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.languages.includes(lang)}
                          onChange={() => toggleLanguage(lang)}
                          className="sr-only"
                        />
                        <Globe size={12} />
                        {lang}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-5">
                  <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Describe the shift, expectations, dress code..."
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-body text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C9A14A]/40 focus:border-[#C9A14A] transition-colors resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C9A14A] text-white font-body font-semibold text-sm hover:bg-[#b8913f] transition-colors shadow-sm"
                  >
                    <Send size={16} />
                    Post Shift
                  </button>
                  <button
                    onClick={() => setFormOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-body font-medium text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ──────────── 4. ACTIVE JOB POSTINGS ──────────── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-display text-2xl text-gray-900 mb-5">
            Active Job Postings
          </h2>
          <div className="grid gap-4">
            {localPostings.map((posting) => {
              const status = postingStatuses[posting.id] || {
                label: 'Active',
                color: 'bg-emerald-100 text-emerald-700',
              }
              const isExpanded = expandedPosting === posting.id

              return (
                <motion.div
                  key={posting.id}
                  whileHover={{ y: -1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-1.5">
                        <h3 className="font-body text-base font-semibold text-gray-900">
                          {posting.role}
                        </h3>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${urgencyColors[posting.urgency]}`}
                        >
                          {urgencyLabels[posting.urgency]}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 font-body flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock3 size={13} />
                          {posting.shiftTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={13} />
                          {posting.payRange}
                        </span>
                        <button
                          onClick={() =>
                            setExpandedPosting(isExpanded ? null : posting.id)
                          }
                          className="flex items-center gap-1 text-[#C9A14A] font-medium hover:underline"
                        >
                          <Users size={13} />
                          {posting.applicants} applicants
                          {isExpanded ? (
                            <ChevronUp size={13} />
                          ) : (
                            <ChevronDown size={13} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C9A14A]/10 text-[#C9A14A] text-xs font-body font-semibold hover:bg-[#C9A14A]/20 transition-colors">
                        <Eye size={13} />
                        View Applicants
                      </button>
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-body font-medium hover:bg-gray-50 transition-colors">
                        <Edit3 size={13} />
                        Edit
                      </button>
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-400 text-xs font-body font-medium hover:text-red-500 hover:border-red-200 transition-colors">
                        <XCircle size={13} />
                        Close
                      </button>
                    </div>
                  </div>

                  {/* Expanded applicant preview */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500 font-body mb-3">
                            Top applicants for this posting:
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {staffMembers.slice(0, 3).map((s) => (
                              <div
                                key={s.id}
                                className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2"
                              >
                                <img
                                  src={s.avatar}
                                  alt={s.name}
                                  className="w-7 h-7 rounded-full object-cover"
                                />
                                <div>
                                  <p className="text-xs font-medium text-gray-900 font-body">
                                    {s.name}
                                  </p>
                                  <p className="text-[10px] text-gray-500 font-body">
                                    {s.matchScore}% match
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* ──────────── 5. AI-MATCHED CANDIDATES ──────────── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h2 className="font-display text-2xl text-gray-900 flex items-center gap-2">
                <Sparkles size={22} className="text-[#C9A14A]" />
                Recommended Candidates
              </h2>
              <p className="font-body text-sm text-gray-500 mt-1">
                AI-ranked by skills, reputation, and availability
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'match' | 'rating' | 'price')
                }
                className="rounded-xl border border-gray-200 px-3 py-2 font-body text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A14A]/40 focus:border-[#C9A14A] transition-colors"
              >
                <option value="match">Sort by: Match Score</option>
                <option value="rating">Sort by: Rating</option>
                <option value="price">Sort by: Price (low-high)</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4">
            {sortedCandidates.map((candidate, idx) => {
              const skillsMatch = Math.max(70, candidate.matchScore - Math.floor(Math.random() * 5))
              const reputationMatch = Math.max(65, Math.min(99, candidate.rating * 20 + Math.floor(Math.random() * 3)))
              const availMatch = Math.max(60, candidate.matchScore - 5 - Math.floor(Math.random() * 8))

              return (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-5">
                    {/* Match Score */}
                    <div className="flex lg:flex-col items-center lg:items-center gap-3 lg:gap-1 lg:w-20 shrink-0">
                      <div
                        className={`text-2xl font-display font-bold ${
                          candidate.matchScore >= 90
                            ? 'text-emerald-600'
                            : candidate.matchScore >= 80
                              ? 'text-amber-600'
                              : 'text-gray-500'
                        }`}
                      >
                        {candidate.matchScore}%
                      </div>
                      <span className="text-[10px] font-body text-gray-400 uppercase tracking-wider">
                        Match
                      </span>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-body text-base font-semibold text-gray-900">
                              {candidate.name}
                            </h3>
                            {candidate.openToWork && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#C9A14A]/10 text-[#C9A14A] border border-[#C9A14A]/20">
                                Open to Work
                              </span>
                            )}
                            {candidate.rating >= 4.8 && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#C9A14A] text-white">
                                Top Rated
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 font-body">
                            {candidate.role} &middot; {candidate.specialty}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <StarRating rating={candidate.rating} size={13} />
                            <span className="text-xs text-gray-500 font-body">
                              {candidate.rating} ({candidate.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Details row */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {/* Languages */}
                        <div className="flex items-center gap-1">
                          {candidate.languages.map((lang) => (
                            <span
                              key={lang}
                              className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-body"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                        {/* Certifications */}
                        {candidate.certifications.length > 0 && (
                          <div className="flex items-center gap-1">
                            <BadgeCheck size={12} className="text-blue-500" />
                            <span className="text-xs text-gray-600 font-body">
                              {candidate.certifications.join(', ')}
                            </span>
                          </div>
                        )}
                        {/* Rate */}
                        <span className="text-xs font-medium text-gray-700 font-body bg-gray-50 px-2 py-0.5 rounded-lg">
                          {candidate.hourlyRate}
                        </span>
                      </div>

                      {/* Match Breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <MatchBar label="Skills" value={skillsMatch} />
                        <MatchBar label="Reputation" value={Math.round(reputationMatch)} />
                        <MatchBar label="Availability" value={availMatch} />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col items-center lg:items-stretch gap-2 lg:w-32 shrink-0">
                      <button className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#C9A14A] text-white text-xs font-body font-semibold hover:bg-[#b8913f] transition-colors shadow-sm">
                        <UserPlus size={14} />
                        Invite
                      </button>
                      <button className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-xs font-body font-medium hover:bg-gray-50 transition-colors">
                        <MessageSquare size={14} />
                        Message
                      </button>
                      <button className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-[#C9A14A] text-xs font-body font-medium hover:bg-[#C9A14A]/5 transition-colors">
                        <Eye size={14} />
                        View Profile
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* ──────────── 6. SHIFT HISTORY ──────────── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-display text-2xl text-gray-900 flex items-center gap-2 mb-5">
            <History size={22} className="text-gray-400" />
            Shift History
          </h2>

          {/* Aggregates */}
          <div className="flex flex-wrap gap-4 mb-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-3 flex items-center gap-3">
              <Star size={16} className="fill-[#C9A14A] text-[#C9A14A]" />
              <div>
                <p className="text-xs text-gray-500 font-body">
                  Average staff rating
                </p>
                <p className="font-display text-lg text-gray-900">
                  {avgStaffRating.toFixed(1)}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-3 flex items-center gap-3">
              <Award size={16} className="text-[#C9A14A]" />
              <div>
                <p className="text-xs text-gray-500 font-body">
                  Total tips distributed
                </p>
                <p className="font-display text-lg text-gray-900">
                  {totalTips.toLocaleString()} PLN
                </p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Desktop header */}
            <div className="hidden sm:grid sm:grid-cols-7 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-body font-semibold text-gray-500 uppercase tracking-wider">
              <span className="col-span-2">Staff</span>
              <span>Role</span>
              <span>Date</span>
              <span>Hours</span>
              <span>Rating Given</span>
              <span>Tips</span>
            </div>

            {shiftHistory.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`grid grid-cols-2 sm:grid-cols-7 gap-3 sm:gap-4 px-5 sm:px-6 py-4 items-center ${
                  i < shiftHistory.length - 1 ? 'border-b border-gray-50' : ''
                }`}
              >
                {/* Staff */}
                <div className="col-span-2 flex items-center gap-3">
                  <img
                    src={entry.staffAvatar}
                    alt={entry.staffName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 font-body">
                      {entry.staffName}
                    </p>
                    <p className="text-xs text-gray-400 font-body sm:hidden">
                      {entry.role} &middot; {entry.date}
                    </p>
                  </div>
                </div>
                {/* Role */}
                <span className="hidden sm:block text-sm text-gray-700 font-body">
                  {entry.role}
                </span>
                {/* Date */}
                <span className="hidden sm:block text-sm text-gray-500 font-body">
                  {entry.date}
                </span>
                {/* Hours */}
                <span className="text-sm text-gray-700 font-body">
                  {entry.hoursWorked}h
                </span>
                {/* Rating */}
                <span>
                  <StarRating rating={entry.staffRating} size={12} />
                </span>
                {/* Tips */}
                <span className="text-sm font-medium text-gray-900 font-body">
                  {entry.tipAmount} PLN
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ──────────── 7. NAVIGATION LINKS ──────────── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            to="/marketplace/demo"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 font-body font-medium text-sm hover:border-[#C9A14A]/40 hover:text-[#C9A14A] transition-colors shadow-sm"
          >
            <Briefcase size={16} />
            Browse Marketplace
          </Link>
          <Link
            to="/marketplace/staff"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 font-body font-medium text-sm hover:border-[#C9A14A]/40 hover:text-[#C9A14A] transition-colors shadow-sm"
          >
            <Users size={16} />
            Switch to Staff View
          </Link>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
