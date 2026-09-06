import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, Send, CheckCircle, MapPin, AlertCircle } from 'lucide-react'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { fadeLeft, fadeRight, fadeUp, stagger } from '../utils/animations'

const SOCIALS = [
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/adhirajkorde',
    href: 'https://github.com/adhirajkorde',
    color: '#f9fafb',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/adhiraj-korde-42aa56316',
    href: 'https://www.linkedin.com/in/adhiraj-korde-42aa56316',
    color: '#0a66c2',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'adhirajkorde@gmail.com',
    href: 'mailto:adhirajkorde@gmail.com',
    color: '#6366f1',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 94042 00148',
    href: 'tel:+919404200148',
    color: '#10b981',
  },
]

const INITIAL = { name: '', email: '', subject: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email address'
  if (!form.subject.trim()) errors.subject = 'Subject is required'
  if (!form.message.trim()) errors.message = 'Message is required'
  else if (form.message.trim().length < 20) errors.message = 'Message must be at least 20 characters'
  return errors
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder, rows }) {
  const Tag = rows ? 'textarea' : 'input'
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-muted tracking-wide uppercase">{label}</label>
      <Tag
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 text-sm text-white placeholder-subtle bg-white/[0.03] border rounded-xl outline-none transition-all duration-200 resize-none
          focus:border-accent/60 focus:bg-white/[0.05] focus:ring-1 focus:ring-accent/20
          ${error ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'}`}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1 text-xs text-red-400"
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/adhirajkorde@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Portfolio Contact: ${form.subject}`, _captcha: 'false' }),
      })
      if (res.ok) { setStatus('success'); setForm(INITIAL) }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionWrapper id="contact" className="bg-surface/30">
      <SectionTitle
        label="Get In Touch"
        title="Contact Me"
        subtitle="Have an opportunity or want to collaborate? I'd love to hear from you."
      />

      <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
        {/* Left — info */}
        <motion.div variants={fadeLeft} className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Let's work together</h3>
            <p className="text-sm text-muted leading-relaxed">
              I'm actively looking for full-time opportunities as a Full Stack, MERN Stack, or Python Developer.
              Open to remote and on-site roles.
            </p>
          </div>

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 glass rounded-xl border border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-green-400 font-medium">Available for opportunities</span>
          </div>

          {/* Social links */}
          <motion.div variants={stagger} className="space-y-3">
            {SOCIALS.map(({ icon: Icon, label, value, href, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                className="flex items-center gap-4 p-4 glass rounded-xl group glow-hover transition-all duration-300"
                whileHover={{ x: 4 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  <Icon size={17} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted">{label}</p>
                  <p className="text-sm text-white font-medium truncate group-hover:text-accent transition-colors">{value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin size={14} className="text-accent" />
            Nashik, Maharashtra, India
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div variants={fadeRight} className="lg:col-span-3">
          <div className="glass rounded-2xl p-8">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center"
                  >
                    <CheckCircle size={32} className="text-green-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-sm text-muted max-w-xs">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => setStatus('idle')}
                    className="mt-2 px-6 py-2.5 text-sm font-semibold bg-accent text-white rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Adhiraj Korde" />
                    <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="hello@example.com" />
                  </div>
                  <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} error={errors.subject} placeholder="Job Opportunity / Collaboration" />
                  <Field label="Message" name="message" value={form.message} onChange={handleChange} error={errors.message} placeholder="Tell me about the opportunity or project..." rows={5} />

                  {status === 'error' && (
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle size={14} />
                      Something went wrong. Please try again or email directly.
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold bg-accent hover:bg-accent/90 text-white rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={status !== 'sending' ? { scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.4)' } : {}}
                    whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
