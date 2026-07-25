import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../utils/animations'

export default function SectionWrapper({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-24 px-6 ${className}`}>
      <motion.div
        className="max-w-7xl mx-auto"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {children}
      </motion.div>
    </section>
  )
}

export function SectionTitle({ label, title, subtitle }) {
  return (
    <motion.div variants={fadeUp} className="mb-16 text-center">
      {label && (
        <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-accent">
          {label}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gradient-2">{title}</h2>
      {subtitle && <p className="mt-4 text-muted max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  )
}
