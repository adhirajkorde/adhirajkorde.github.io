import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react'
import { stagger, fadeUp, blurReveal } from '../utils/animations'

const ROLES = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'AI & MCP Developer',
  'Software Engineer',
  'React & Next.js Builder',
]

const TECH_ICONS = [
  { label: 'React', color: '#61DAFB', pos: 'top-[15%] left-[8%]', delay: 0 },
  { label: 'Node', color: '#68A063', pos: 'top-[25%] right-[10%]', delay: 0.5 },
  { label: 'Python', color: '#FFD43B', pos: 'bottom-[30%] left-[6%]', delay: 1 },
  { label: 'Next.js', color: '#FFFFFF', pos: 'bottom-[20%] right-[8%]', delay: 0.8 },
  { label: 'MCP', color: '#A78BFA', pos: 'top-[55%] left-[3%]', delay: 1.2 },
  { label: 'AI/LLM', color: '#06b6d4', pos: 'top-[10%] right-[25%]', delay: 0.3 },
]

function TypingText() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[index]
    let timeout

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % ROLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <span className="text-gradient">
      {displayed}
      <span className="animate-pulse text-accent">|</span>
    </span>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)', top: '-10%', left: '-10%' }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', bottom: '0%', right: '-5%' }}
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', top: '40%', left: '40%' }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating tech badges */}
      {TECH_ICONS.map(({ label, color, pos, delay }) => (
        <motion.div
          key={label}
          className={`absolute hidden lg:flex items-center justify-center px-3 h-10 rounded-xl glass-light text-xs font-bold ${pos}`}
          style={{ color, borderColor: `${color}30` }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {label}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center gap-6">

          {/* Badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-accent/20 text-sm text-muted">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for Opportunities
          </motion.div>

          {/* Name */}
          <motion.h1 variants={blurReveal} className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none">
            <span className="text-gradient-2">Adhiraj</span>
            <br />
            <span className="text-gradient-2">Korde</span>
          </motion.h1>

          {/* Typing role */}
          <motion.div variants={fadeUp} className="text-2xl sm:text-3xl font-semibold h-10">
            <TypingText />
          </motion.div>

          {/* Description */}
          <motion.p variants={fadeUp} className="max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
            Computer Science Graduate passionate about Full Stack Web Development (MERN Stack), AI-powered applications, and Model Context Protocol (MCP) server development.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <motion.button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-200"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              View Projects
            </motion.button>

            <motion.a
              href="./Adhiraj_Korde_Resume.pdf"
              download="Adhiraj_Korde_Resume.pdf"
              className="flex items-center gap-2 px-7 py-3.5 glass-light border border-white/10 hover:border-accent/40 text-white font-semibold rounded-xl transition-all duration-200"
              whileHover={{ scale: 1.05, borderColor: '#6366f1' }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              Download Resume
            </motion.a>

            <motion.button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-7 py-3.5 glass-light border border-white/10 hover:border-accent/40 text-white font-semibold rounded-xl transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={16} />
              Contact Me
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mt-2">
            {[
              { icon: Github, href: 'https://github.com/adhirajkorde', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/adhiraj-korde-42aa56316', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:adhirajkorde@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 flex items-center justify-center rounded-xl glass-light border border-white/10 text-muted hover:text-white hover:border-accent/40 transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
