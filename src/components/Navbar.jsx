import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useActiveSection } from '../hooks/useActiveSection'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

const SECTIONS = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const progress = useScrollProgress()
  const active = useActiveSection(SECTIONS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent-2 to-accent-3 z-[100] origin-left"
        style={{ scaleX: progress }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-border/50 py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('#home') }}
            className="text-xl font-bold text-gradient cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AK<span className="text-accent">.</span>
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace('#', '')
              const isActive = active === sectionId
              return (
                <li key={label}>
                  <motion.button
                    onClick={() => handleNav(href)}
                    className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-muted hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-accent/15 rounded-lg border border-accent/30"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </motion.button>
                </li>
              )
            })}
          </ul>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="./Adhiraj_Korde_Resume.pdf"
              download="Adhiraj_Korde_Resume.pdf"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold glass-light border border-white/10 hover:border-accent/40 text-white rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.05, borderColor: '#6366f1' }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={13} />
              Resume
            </motion.a>

            <motion.button
              onClick={() => handleNav('#contact')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-accent hover:bg-accent/90 text-white rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk
            </motion.button>
          </div>

          {/* Mobile menu toggle */}
          <motion.button
            className="lg:hidden text-muted hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[60px] left-0 right-0 z-40 glass border-b border-border/50 lg:hidden shadow-2xl"
          >
            <ul className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => handleNav(href)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li className="mt-2 pt-2 border-t border-white/5 flex gap-2">
                <a
                  href="./Adhiraj_Korde_Resume.pdf"
                  download="Adhiraj_Korde_Resume.pdf"
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-semibold glass-light border border-white/10 text-white rounded-lg text-center"
                >
                  <Download size={14} />
                  Resume
                </a>
                <button
                  onClick={() => handleNav('#contact')}
                  className="flex-1 px-4 py-3 text-sm font-semibold bg-accent text-white rounded-lg"
                >
                  Let's Talk
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
