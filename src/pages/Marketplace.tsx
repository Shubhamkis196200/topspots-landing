import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Star,
  UserCheck,
  Users,
  Briefcase,
  Building2,
  MapPin,
  Clock3,
  Sparkles,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type StaffProfile = {
  name: string
  role: string
  rating: number
  availability: string
  skills: string[]
}

type Venue = {
  name: string
  type: string
  location: string
  rating: number
  openings: number
}

type Job = {
  title: string
  venue: string
  jobType: string
  salary: string
  posted: string
}

const staffProfiles: StaffProfile[] = [
  {
    name: 'Maya Torres',
    role: 'Bartender',
    rating: 4.9,
    availability: 'Available Tonight',
    skills: ['Mixology', 'Wine Service', 'POS'],
  },
  {
    name: 'Luca Bennett',
    role: 'Chef',
    rating: 4.8,
    availability: 'Full-time',
    skills: ['Fine Dining', 'Menu Design', 'Prep'],
  },
  {
    name: 'Ariana Cole',
    role: 'Server',
    rating: 4.7,
    availability: 'Weekends',
    skills: ['Upselling', 'Guest Care', 'Team Lead'],
  },
  {
    name: 'Jordan Kim',
    role: 'Host',
    rating: 4.8,
    availability: 'Part-time',
    skills: ['Reservations', 'Guest Flow', 'Front Desk'],
  },
  {
    name: 'Theo Malik',
    role: 'Manager',
    rating: 5.0,
    availability: 'Immediate',
    skills: ['Operations', 'Hiring', 'Training'],
  },
]

const venues: Venue[] = [
  {
    name: 'Amber & Oak',
    type: 'Restaurant',
    location: 'Downtown District',
    rating: 4.8,
    openings: 4,
  },
  {
    name: 'Velvet Hour',
    type: 'Bar',
    location: 'Riverside',
    rating: 4.7,
    openings: 2,
  },
  {
    name: 'Morning Guild',
    type: 'Cafe',
    location: 'Midtown',
    rating: 4.9,
    openings: 3,
  },
  {
    name: 'Noir House',
    type: 'Club',
    location: 'City Core',
    rating: 4.6,
    openings: 6,
  },
  {
    name: 'The Grand Quarter',
    type: 'Hotel',
    location: 'Old Town',
    rating: 4.9,
    openings: 5,
  },
]

const jobs: Job[] = [
  {
    title: 'Senior Bartender',
    venue: 'Velvet Hour',
    jobType: 'Full-time',
    salary: '$4,500 - $5,800/mo',
    posted: '2 days ago',
  },
  {
    title: 'Line Cook',
    venue: 'Amber & Oak',
    jobType: 'Part-time',
    salary: '$22 - $28/hr',
    posted: 'Today',
  },
  {
    title: 'Floor Manager',
    venue: 'The Grand Quarter',
    jobType: 'Full-time',
    salary: '$5,500 - $6,700/mo',
    posted: '1 day ago',
  },
  {
    title: 'Event Server',
    venue: 'Noir House',
    jobType: 'Casual',
    salary: '$18 - $24/hr',
    posted: '3 days ago',
  },
]

const features = [
  { title: 'AI-Powered Matching', description: 'Smart ranking pairs the right talent with the right venue in seconds.', icon: Bot },
  { title: 'Verified Profiles & Reviews', description: 'Trust signals and real feedback ensure quality on both sides.', icon: ShieldCheck },
  { title: 'Instant Hire / Job Offers', description: 'Send offers and confirmations immediately without email ping-pong.', icon: UserCheck },
  { title: 'Availability Calendar', description: 'Live availability helps venues fill shifts faster and avoid overlap.', icon: Calendar },
  { title: 'Portfolio Showcase', description: 'Profiles include experience highlights, certifications, and specialties.', icon: Sparkles },
  { title: 'Real-time Chat', description: 'In-app messaging keeps hiring conversations fast and organized.', icon: MessageSquare },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

function Counter({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0)

  return (
    <motion.div
      className="text-center"
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        let current = 0
        const increment = Math.max(1, Math.ceil(value / 30))
        const timer = setInterval(() => {
          current += increment
          if (current >= value) {
            setCount(value)
            clearInterval(timer)
          } else {
            setCount(current)
          }
        }, 20)
      }}
    >
      <div className="font-mono text-3xl md:text-4xl font-semibold text-gold">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-2 text-sm md:text-base text-white/70">{label}</p>
    </motion.div>
  )
}

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState<'staff' | 'venues' | 'jobs'>('staff')

  return (
    <div className="min-h-screen bg-charcoal text-white">
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-24 bg-charcoal">
        <div className="absolute inset-0 bg-gold-mesh opacity-60" />
        <div className="absolute inset-0 grain opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Users className="w-4 h-4" />
            Marketplace for hospitality professionals
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 text-5xl md:text-7xl leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Where Hospitality Talent
            <span className="text-gradient-gold"> Meets Opportunity</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 text-lg md:text-xl text-white/75 max-w-3xl mx-auto"
          >
            A premium hiring and discovery space connecting skilled staff with venues ready to grow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-gold to-gold-light text-charcoal font-semibold hover:scale-[1.02] transition-transform">
              List Your Profile <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/25 bg-white/5 font-semibold hover:bg-white/10 transition-colors">
              Post a Job <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-charcoal-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center mb-10"
          >
            {[
              { key: 'staff', label: 'Staff Profiles' },
              { key: 'venues', label: 'Venues' },
              { key: 'jobs', label: 'Jobs' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'staff' | 'venues' | 'jobs')}
                className={`px-5 py-3 rounded-full border transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-gold to-gold-light text-charcoal border-gold-light font-semibold'
                    : 'border-white/20 text-white/75 hover:text-white hover:border-gold/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'staff' && (
              <motion.div
                key="staff"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {staffProfiles.map((profile) => (
                  <div key={profile.name} className="glass-card-gold rounded-2xl p-6 card-3d">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 mb-4 flex items-center justify-center">
                      <Users className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-xl font-semibold">{profile.name}</h3>
                    <p className="text-gold mt-1">{profile.role}</p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-white/75">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      {profile.rating.toFixed(1)} rating
                      <span className="ml-auto px-2 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs">
                        {profile.availability}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <span key={skill} className="text-xs px-2.5 py-1.5 rounded-full border border-gold/30 text-gold-light bg-gold/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'venues' && (
              <motion.div
                key="venues"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {venues.map((venue) => (
                  <div key={venue.name} className="glass-card rounded-2xl p-6 border border-white/10 card-3d">
                    <div className="h-32 rounded-xl bg-gradient-to-br from-gold/30 to-gold/5 border border-gold/30 mb-5 flex items-center justify-center">
                      <Building2 className="w-10 h-10 text-gold" />
                    </div>
                    <h3 className="text-xl font-semibold">{venue.name}</h3>
                    <p className="text-gold mt-1">{venue.type}</p>
                    <div className="mt-3 space-y-2 text-sm text-white/75">
                      <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" />{venue.location}</p>
                      <p className="flex items-center gap-2"><Star className="w-4 h-4 text-gold fill-gold" />{venue.rating.toFixed(1)} venue rating</p>
                      <p className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-gold" />{venue.openings} positions open</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'jobs' && (
              <motion.div
                key="jobs"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {jobs.map((job) => (
                  <div key={`${job.title}-${job.venue}`} className="glass-card-gold rounded-2xl p-6 border border-gold/30">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="mt-1 text-gold">{job.venue}</p>
                    <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm text-white/75">
                      <p className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-gold" />{job.jobType}</p>
                      <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" />{job.salary}</p>
                      <p className="flex items-center gap-2"><Clock3 className="w-4 h-4 text-gold" />{job.posted}</p>
                    </div>
                    <button className="mt-5 px-4 py-2 rounded-lg bg-gold text-charcoal font-semibold hover:bg-gold-light transition-colors">
                      Apply
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Built for <span className="text-gradient-gold">modern hiring</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="glass-card rounded-2xl p-6 border border-white/10"
              >
                <feature.icon className="w-7 h-7 text-gold mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-charcoal-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
              How it <span className="text-gradient-gold">works</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card-gold rounded-2xl p-7 border border-gold/30">
              <h3 className="text-2xl font-semibold mb-6 text-gold">For Staff</h3>
              <div className="space-y-4">
                {['Create Profile', 'Get Discovered', 'Get Hired'].map((step, i) => (
                  <div key={step} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-gold text-charcoal font-bold flex items-center justify-center">{i + 1}</div>
                    <p className="font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-7 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6 text-gold">For Venues</h3>
              <div className="space-y-4">
                {['Post Job', 'Browse Talent', 'Make an Offer'].map((step, i) => (
                  <div key={step} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-gold text-charcoal font-bold flex items-center justify-center">{i + 1}</div>
                    <p className="font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-gold/20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-10"
          >
            <Counter value={2500} suffix="+" label="Staff Profiles" />
            <Counter value={800} suffix="+" label="Venues" />
            <Counter value={5000} suffix="+" label="Jobs Posted" />
            <Counter value={95} suffix="%" label="Match Rate" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-charcoal-mid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-gold rounded-3xl p-10 md:p-14 border border-gold/30"
          >
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Join the <span className="text-gradient-gold">Marketplace</span>
            </h2>
            <p className="mt-5 text-white/75 max-w-2xl mx-auto">
              Whether you are building your hospitality career or hiring your next standout team member, this is where the best matches happen.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-charcoal font-semibold hover:scale-[1.02] transition-transform">
                I'm Staff
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/25 bg-white/5 font-semibold hover:bg-white/10 transition-colors">
                I'm a Venue
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
