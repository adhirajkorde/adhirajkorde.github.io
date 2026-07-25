import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { scaleIn, stagger } from '../utils/animations'

const CERTS = [
  {
    title: 'TATA Data Visualization',
    subtitle: 'Empowering Business with Effective Insights',
    issuer: 'Forage',
    year: '2024',
    accent: '#f59e0b',
    url: '#',
  },
  {
    title: 'Python Full Stack',
    subtitle: 'Full Stack Development with Python',
    issuer: 'AICTE',
    year: '2024',
    accent: '#3b82f6',
    url: '#',
  },
  {
    title: 'AI-ML Virtual Internship',
    subtitle: 'Artificial Intelligence & Machine Learning',
    issuer: 'AICTE',
    year: '2024',
    accent: '#8b5cf6',
    url: '#',
  },
  {
    title: 'AWS Solution Architecture',
    subtitle: 'Job Simulation — Cloud Architecture',
    issuer: 'Forage',
    year: '2024',
    accent: '#f97316',
    url: '#',
  },
  {
    title: 'AWS Gen AI Virtual Internship',
    subtitle: 'Generative AI on AWS',
    issuer: 'AICTE & AWS',
    year: '2024',
    accent: '#10b981',
    url: '#',
  },
]

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" className="bg-surface/50">
      <SectionTitle
        label="Credentials"
        title="Certifications"
        subtitle="Industry-recognized certifications validating my skills across AI, cloud, and full-stack development."
      />

      <motion.div
        variants={stagger}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {CERTS.map(({ title, subtitle, issuer, year, accent, url }, i) => (
          <motion.a
            key={title}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variants={scaleIn}
            className="glass rounded-2xl p-6 group glow-hover transition-all duration-300 relative overflow-hidden block"
            whileHover={{ y: -6 }}
          >
            {/* Ambient glow */}
            <div
              className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl"
              style={{ background: accent }}
            />

            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
              >
                <Award size={20} style={{ color: accent }} />
              </div>
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                whileHover={{ scale: 1.1 }}
              >
                <ExternalLink size={14} className="text-muted" />
              </motion.div>
            </div>

            {/* Content */}
            <h3 className="font-bold text-white text-sm leading-snug mb-1">{title}</h3>
            <p className="text-xs text-muted mb-4 leading-relaxed">{subtitle}</p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span
                className="px-2.5 py-1 text-xs font-semibold rounded-lg"
                style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}25` }}
              >
                {issuer}
              </span>
              <span className="text-xs text-subtle">{year}</span>
            </div>

            {/* Bottom accent */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl"
              style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              initial={{ width: '0%' }}
              whileInView={{ width: '70%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
            />
          </motion.a>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
