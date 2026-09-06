import { motion } from 'framer-motion'
import { MapPin, Briefcase, Code2, Award } from 'lucide-react'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { fadeUp, stagger } from '../utils/animations'

const STATS = [
  { value: '2+', label: 'Years Coding', icon: Code2 },
  { value: '10+', label: 'Projects Built', icon: Briefcase },
  { value: '6+', label: 'Certifications', icon: Award },
  { value: '2', label: 'Internships', icon: MapPin },
]

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-surface/50">
      <SectionTitle label="Who I Am" title="About Me" />

      {/* Stats */}
      <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map(({ value, label, icon: Icon }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className="glass rounded-2xl p-6 text-center glow-hover transition-all duration-300 group"
            whileHover={{ y: -4 }}
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
              <Icon size={20} className="text-accent" />
            </div>
            <div className="text-3xl font-black text-gradient">{value}</div>
            <div className="text-sm text-muted mt-1">{label}</div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
