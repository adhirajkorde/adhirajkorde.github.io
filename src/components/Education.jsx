import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award } from 'lucide-react'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { fadeLeft, stagger } from '../utils/animations'

const EDUCATION = [
  {
    degree: 'Bachelor of Engineering — Computer Science',
    institution: 'Guru Gobind Singh College of Engineering and Research',
    location: 'Nashik, Maharashtra',
    period: '2022 – 2026',
    grade: 'Pursuing',
    highlights: ['Full Stack Development', 'Data Structures & Algorithms', 'Database Management', 'Cloud Computing'],
    accent: '#6366f1',
  },
  {
    degree: 'HSC — Science (PCM + CS)',
    institution: 'K.A.M. Patil Higher and Secondary School',
    location: 'Pimpalner, Maharashtra',
    period: '2020 – 2022',
    grade: '83.33%',
    highlights: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    accent: '#8b5cf6',
  },
  {
    degree: 'SSC — Secondary School Certificate',
    institution: 'Indira Gandhi Higher and Secondary School',
    location: 'Pimpalner, Maharashtra',
    period: '2019 – 2020',
    grade: '84.33%',
    highlights: ['Mathematics', 'Science', 'English'],
    accent: '#06b6d4',
  },
]

export default function Education() {
  return (
    <SectionWrapper id="education">
      <SectionTitle
        label="Academic Background"
        title="Education"
        subtitle="My academic journey that laid the foundation for my engineering career."
      />

      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-2 to-accent-3"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div variants={stagger} className="space-y-8">
            {EDUCATION.map(({ degree, institution, location, period, grade, highlights, accent }, i) => (
              <motion.div
                key={degree}
                variants={fadeLeft}
                className="relative pl-16"
              >
                {/* Dot */}
                <motion.div
                  className="absolute left-0 top-5 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: `${accent}18`, border: `2px solid ${accent}` }}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 300 }}
                >
                  <GraduationCap size={18} style={{ color: accent }} />
                </motion.div>

                {/* Card */}
                <motion.div
                  className="glass rounded-2xl p-6 glow-hover transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-white leading-snug">{degree}</h3>
                      <p className="text-sm mt-1" style={{ color: accent }}>{institution}</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>
                      <Award size={11} />
                      {grade}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      {period}
                    </span>
                    <span>{location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 text-xs rounded-lg"
                        style={{ background: `${accent}10`, color: '#9ca3af', border: `1px solid ${accent}20` }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
