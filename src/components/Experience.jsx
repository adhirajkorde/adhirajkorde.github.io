import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { fadeUp, fadeLeft, stagger } from '../utils/animations'

const EXPERIENCES = [
  {
    role: 'Software Engineering Intern — MCP Server Development',
    company: 'Kyron Data Tech',
    location: 'Remote / Himachal Pradesh',
    period: '20 Aug 2026 – Present',
    type: 'Current Internship',
    isCurrent: true,
    description:
      'Working on software engineering projects focused on Model Context Protocol (MCP) server development and AI-related applications.',
    responsibilities: [
      'Developing and integrating MCP server components using Python and modern software engineering practices.',
      'Working with APIs and software tools to build practical AI-enabled solutions and improve application workflows.',
      'Collaborating on assigned development tasks, testing implementations, debugging issues, and maintaining project code and documentation.',
      'Designing robust schemas and standardized tool endpoints for agentic LLM interaction.',
    ],
    accent: '#8b5cf6',
  },
  {
    role: 'Data Science Intern',
    company: 'Netleap IT and Training Solution',
    location: 'Nashik, Maharashtra',
    period: 'Jan 2025 – Feb 2025',
    type: 'Internship',
    isCurrent: false,
    description:
      'Worked on real-world data science projects involving machine learning model development, data preprocessing, and exploratory data analysis.',
    responsibilities: [
      'Assisted in development and testing of machine learning models.',
      'Performed data cleaning, preprocessing, and exploratory data analysis.',
      'Collaborated with senior data scientists on real-world datasets.',
      'Prepared technical documentation and visual reports.',
    ],
    accent: '#06b6d4',
  },
]

export default function Experience() {
  return (
    <SectionWrapper id="experience" className="bg-surface/50">
      <SectionTitle
        label="Work History"
        title="Experience"
        subtitle="Professional engineering experience building AI systems, MCP servers, and data-driven solutions."
      />

      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div variants={stagger} className="space-y-8">
            {EXPERIENCES.map(({ role, company, location, period, type, isCurrent, description, responsibilities, accent }, i) => (
              <motion.div
                key={`${company}-${i}`}
                variants={fadeLeft}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-5 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: `${accent}18`, border: `2px solid ${accent}` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, type: 'spring', stiffness: 300 }}
                >
                  <Briefcase size={18} style={{ color: accent }} />
                </motion.div>

                {/* Card */}
                <motion.div
                  className="glass rounded-2xl p-6 glow-hover transition-all duration-300 relative overflow-hidden"
                  whileHover={{ y: -3 }}
                >
                  {/* Ambient glow */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none"
                    style={{ background: accent }}
                  />

                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white leading-snug">{role}</h3>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>{company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCurrent && (
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      )}
                      <span
                        className="px-3 py-1 text-xs font-semibold rounded-full"
                        style={{
                          background: isCurrent ? '#10b98118' : `${accent}18`,
                          color: isCurrent ? '#10b981' : accent,
                          border: `1px solid ${isCurrent ? '#10b98130' : `${accent}30`}`,
                        }}
                      >
                        {type}
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-4 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-accent" />
                      {period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-accent" />
                      {location}
                    </span>
                  </div>

                  <p className="text-sm text-muted mb-4 leading-relaxed">{description}</p>

                  {/* Responsibilities */}
                  <ul className="space-y-2">
                    {responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-xs text-muted">
                        <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}

            {/* Next Opportunity placeholder */}
            <motion.div variants={fadeUp} className="relative pl-16">
              <div className="absolute left-0 top-5 w-12 h-12 rounded-full flex items-center justify-center glass-light border border-dashed border-accent/40">
                <Sparkles size={16} className="text-accent animate-pulse" />
              </div>
              <div className="glass-light rounded-2xl p-6 border border-dashed border-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Looking for Full-Time Opportunities</p>
                  <p className="text-xs text-muted mt-0.5">Open to Full Stack Developer, MERN Stack, or AI / GenAI roles.</p>
                </div>
                <motion.button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-4 py-2 text-xs font-semibold bg-accent text-white rounded-lg hover:bg-accent/90 transition-all flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
