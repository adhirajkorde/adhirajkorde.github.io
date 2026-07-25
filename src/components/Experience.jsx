import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { fadeUp, fadeLeft, stagger } from '../utils/animations'

const EXPERIENCES = [
  {
    role: 'Data Science Intern',
    company: 'Netleap IT and Training Solution',
    location: 'Remote',
    period: 'Jan 2025 – Feb 2025',
    type: 'Internship',
    description:
      'Worked on real-world data science projects involving machine learning model development, data preprocessing, and exploratory data analysis.',
    responsibilities: [
      'Assisted in development and testing of machine learning models',
      'Performed data cleaning, preprocessing, and exploratory data analysis',
      'Collaborated with senior data scientists on real-world datasets',
      'Prepared technical documentation and visual reports',
    ],
    accent: '#6366f1',
  },
]

export default function Experience() {
  return (
    <SectionWrapper id="experience" className="bg-surface/50">
      <SectionTitle
        label="Work History"
        title="Experience"
        subtitle="Professional experience building real-world solutions."
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
            {EXPERIENCES.map(({ role, company, location, period, type, description, responsibilities, accent }, i) => (
              <motion.div
                key={`${company}-${i}`}
                variants={fadeLeft}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-5 w-12 h-12 rounded-full flex items-center justify-center"
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
                  className="glass rounded-2xl p-6 glow-hover transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{role}</h3>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>{company}</p>
                    </div>
                    <span
                      className="px-3 py-1 text-xs font-semibold rounded-full"
                      style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}
                    >
                      {type}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-4 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} />
                      {location}
                    </span>
                  </div>

                  <p className="text-sm text-muted mb-4 leading-relaxed">{description}</p>

                  {/* Responsibilities */}
                  <ul className="space-y-2">
                    {responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-xs text-muted">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}

            {/* Future placeholder */}
            <motion.div variants={fadeUp} className="relative pl-16">
              <div className="absolute left-0 top-5 w-12 h-12 rounded-full flex items-center justify-center glass-light border border-dashed border-accent/30">
                <span className="text-accent text-lg font-bold">?</span>
              </div>
              <div className="glass-light rounded-2xl p-6 border border-dashed border-accent/20">
                <p className="text-sm text-muted">
                  <span className="text-accent font-semibold">Your company?</span> — I'm actively looking for my next opportunity as a Full Stack / MERN Stack Developer.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
