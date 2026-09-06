import { useRef, useState, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import {
  ExternalLink, Github, Sparkles, FileText, Wallet, Users,
  CheckCircle2, Search, LayoutGrid, Code2, Layers, Calendar,
} from 'lucide-react'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { fadeUp, scaleIn, stagger } from '../utils/animations'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 1,
    title: 'Daily Scheduler — Employee Attendance Management System',
    subtitle: 'Full Stack Remote Attendance & HR Platform',
    category: 'Full Stack',
    status: 'Live',
    duration: '5 weeks',
    description:
      'A full-stack attendance system built for remote teams featuring employee check-in/out, leave request workflows, real-time attendance tracking, automated record processing, and Excel reports to streamline HR administration.',
    highlights: [
      'Employee check-in & check-out',
      'Leave management system',
      'Role-based access control (RBAC)',
      'Real-time attendance tracking',
      'Automated record processing',
      'Excel reports to reduce HR load',
      'PostgreSQL & FastAPI backend',
    ],
    tech: ['Next.js', 'FastAPI', 'TypeScript', 'Python', 'PostgreSQL', 'Tailwind CSS', 'JWT', 'REST APIs'],
    liveUrl: 'https://daily-scheduler-web.vercel.app',
    githubUrl: 'https://github.com/adhirajkorde',
    accent: '#8b5cf6',
    icon: Calendar,
  },
  {
    id: 2,
    title: 'SmartHire — Resume Screening & Candidate Ranking',
    subtitle: 'AI & MERN Recruitment Platform',
    category: 'MERN Stack',
    status: 'Live',
    duration: '5 weeks',
    description:
      'A modern resume screening and candidate ranking platform that extracts candidate skills, education, and experience from resumes, calculates matching scores against job descriptions, and ranks applicants for recruiters.',
    highlights: [
      'Resume parsing (PDF/DOC)',
      'Candidate matching engine',
      'Skills & experience scoring',
      'Recruiter dashboard',
      'CSV export functionality',
      'JWT authentication & Prisma',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Prisma', 'JWT'],
    liveUrl: 'https://resume-screening-and-candidate-ranking-c8ue.onrender.com',
    githubUrl: 'https://github.com/adhirajkorde',
    accent: '#f59e0b',
    icon: Users,
  },
  {
    id: 3,
    title: 'AI-First HCP CRM Interaction Logger',
    subtitle: 'Enterprise AI-Powered Healthcare CRM',
    category: 'AI',
    status: 'Completed',
    duration: '2 months',
    description:
      'An enterprise-grade AI-powered Healthcare Professional CRM enabling pharma reps to log doctor interactions via structured forms or natural language AI chat — extracting insights, automating follow-up tasks, and analyzing sentiment.',
    highlights: [
      'Multi-agent AI workflows',
      'LangGraph & LangChain automation',
      'LLM-based entity extraction',
      'Doctor interaction sentiment analysis',
      'Interactive analytics dashboard',
      'PostgreSQL database & Redis caching',
    ],
    tech: ['React', 'Redux Toolkit', 'FastAPI', 'Python', 'LangGraph', 'LangChain', 'Groq API', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    liveUrl: 'https://github.com/adhirajkorde',
    githubUrl: 'https://github.com/adhirajkorde',
    accent: '#6366f1',
    icon: Sparkles,
  },
  {
    id: 4,
    title: 'Personal Expense Tracker & Budget Manager',
    subtitle: 'Full Stack Finance Application',
    category: 'Python',
    status: 'Live',
    duration: '4 weeks',
    description:
      'A modern responsive personal finance app that helps users track income, expenses, monthly budgets, and spending analytics through an interactive dashboard with real-time Chart.js charts.',
    highlights: [
      'Expense & income tracking',
      'Monthly budget management',
      'Interactive charts & analytics',
      'JWT authentication',
      'Dark & light mode support',
      'Responsive design',
    ],
    tech: ['Python', 'Flask', 'HTML5', 'CSS3', 'JavaScript', 'SQLite', 'Chart.js', 'JWT'],
    liveUrl: 'https://personal-expense-tracker-budget-manager.onrender.com',
    githubUrl: 'https://github.com/adhirajkorde',
    accent: '#10b981',
    icon: Wallet,
  },
  {
    id: 5,
    title: 'DocFlow — Collaborative Document Editor',
    subtitle: 'Google Docs-Inspired Editor',
    category: 'Full Stack',
    status: 'Completed',
    duration: '6 weeks',
    description:
      'A Google Docs-inspired collaborative document editor where users can create, edit, import markdown, autosave, and securely share rich-text documents with view or edit permissions using JWT authentication.',
    highlights: [
      'Rich text editing workspace',
      'JWT authentication',
      'Real-time autosave',
      'Secure document sharing',
      'Markdown import & export',
      'Role-based permissions',
    ],
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'SQLite', 'Prisma', 'JWT', 'Axios'],
    liveUrl: 'https://github.com/adhirajkorde',
    githubUrl: 'https://github.com/adhirajkorde',
    accent: '#06b6d4',
    icon: FileText,
  },
]

const FILTERS = ['All', 'AI', 'Full Stack', 'MERN Stack', 'Python']

const STATS = [
  { value: '5', label: 'Total Projects', icon: LayoutGrid },
  { value: '20+', label: 'Technologies', icon: Code2 },
  { value: '5', label: 'GitHub Repos', icon: Github },
  { value: '3', label: 'Live Deployments', icon: Layers },
]

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 20 })
  const sy = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(sy, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-5deg', '5deg'])

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0); setHovered(false) }

  const { title, subtitle, description, highlights, tech, liveUrl, githubUrl, accent, icon: Icon, status, duration } = project
  const hasLiveUrl = liveUrl && liveUrl !== '#' && !liveUrl.startsWith('https://github')

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="relative flex flex-col rounded-2xl overflow-hidden group transition-all duration-300"
      whileHover={{ y: -6 }}
    >
      {/* Gradient border wrapper */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          padding: '1px',
          background: `linear-gradient(135deg, ${accent}50, transparent 50%, ${accent}25)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 blur-3xl pointer-events-none"
        style={{ background: accent }}
      />

      {/* Card bg */}
      <div className="absolute inset-0 rounded-2xl bg-card" />

      {/* Preview banner */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ background: `radial-gradient(ellipse at 30% 40%, ${accent}14, transparent 65%)` }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Floating icon */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-3"
          animate={hovered ? { scale: 1.08, y: -4 } : { scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: `${accent}18`, border: `1px solid ${accent}35` }}
          >
            <Icon size={30} style={{ color: accent }} />
          </div>
        </motion.div>

        {/* Status + duration badges — top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span
            className="px-2 py-0.5 text-[10px] font-bold rounded-full"
            style={{
              background: status === 'Live' ? '#10b98120' : `${accent}20`,
              color: status === 'Live' ? '#10b981' : accent,
              border: `1px solid ${status === 'Live' ? '#10b98140' : `${accent}35`}`,
            }}
          >
            {status}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 text-subtle border border-white/8">
            {duration}
          </span>
        </div>

        {/* Tech badges — bottom */}
        <motion.div
          className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1"
          animate={hovered ? { y: 0, opacity: 1 } : { y: 4, opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] font-semibold rounded-md"
              style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}28` }}
            >
              {t}
            </span>
          ))}
          {tech.length > 4 && (
            <span
              className="px-2 py-0.5 text-[10px] font-semibold rounded-md"
              style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}28` }}
            >
              +{tech.length - 4}
            </span>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 p-6 gap-4">
        {/* Title block */}
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: accent }}>
            {subtitle}
          </p>
          <h3 className="text-lg font-black text-white leading-snug">{title}</h3>
        </div>

        <p className="text-xs text-muted leading-relaxed flex-1">{description}</p>

        {/* Highlights */}
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-1.5 text-[11px] text-muted">
              <CheckCircle2 size={11} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
              <span className="line-clamp-1">{h}</span>
            </li>
          ))}
        </ul>

        {/* Full tech stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tech.map((t) => (
            <motion.span
              key={t}
              className="px-2 py-1 text-[10px] font-medium rounded-lg cursor-default"
              style={{ background: `${accent}0d`, border: `1px solid ${accent}20`, color: '#9ca3af' }}
              whileHover={{ background: `${accent}20`, color: '#fff', scale: 1.05 }}
              transition={{ duration: 0.15 }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {hasLiveUrl ? (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white rounded-xl transition-all duration-200"
              style={{ background: accent }}
              whileHover={{ scale: 1.04, boxShadow: `0 0 22px ${accent}45` }}
              whileTap={{ scale: 0.96 }}
            >
              <ExternalLink size={12} />
              Live Demo
            </motion.a>
          ) : (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white rounded-xl transition-all duration-200"
              style={{ background: `${accent}30`, border: `1px solid ${accent}50` }}
              whileHover={{ scale: 1.04, background: accent }}
              whileTap={{ scale: 0.96 }}
            >
              <Github size={12} />
              View Source
            </motion.a>
          )}

          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white rounded-xl glass-light border border-white/10 hover:border-white/25 transition-all duration-200"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Github size={12} />
            GitHub
          </motion.a>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 z-10"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        initial={{ width: '0%' }}
        whileInView={{ width: '70%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchCat = activeFilter === 'All' || p.category === activeFilter
      const q = query.toLowerCase()
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.tech.some((t) => t.toLowerCase().includes(q))
      return matchCat && matchQ
    })
  }, [activeFilter, query])

  return (
    <SectionWrapper id="projects" className="bg-surface/30">
      <SectionTitle
        label="What I've Built"
        title="Featured Projects"
        subtitle="A selection of production-grade projects showcasing full-stack engineering, AI/MCP systems, and modern web applications."
      />

      {/* Stats */}
      <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {STATS.map(({ value, label, icon: Icon }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className="glass rounded-xl p-4 text-center group glow-hover transition-all duration-300"
            whileHover={{ y: -3 }}
          >
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-accent/20 transition-colors">
              <Icon size={16} className="text-accent" />
            </div>
            <div className="text-2xl font-black text-gradient">{value}</div>
            <div className="text-[11px] text-muted mt-0.5">{label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter + Search */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10"
      >
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'glass-light text-muted hover:text-white border border-white/10 hover:border-accent/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f}
            </motion.button>
          ))}
        </div>

        <div className="relative sm:ml-auto">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or tech..."
            className="w-full sm:w-56 pl-9 pr-4 py-2 text-xs text-white placeholder-subtle bg-white/[0.03] border border-white/10 rounded-lg outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
          />
        </div>
      </motion.div>

      {/* Cards grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-24 text-muted"
          >
            <Search size={36} className="mx-auto mb-4 opacity-20" />
            <p className="text-sm">No projects match your search.</p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* GitHub CTA */}
      <motion.div variants={fadeUp} className="mt-14 text-center">
        <motion.a
          href="https://github.com/adhirajkorde"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold glass border border-accent/30 text-white rounded-xl hover:border-accent/60 transition-all duration-200"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99,102,241,0.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={16} />
          View All Projects on GitHub
        </motion.a>
      </motion.div>
    </SectionWrapper>
  )
}
