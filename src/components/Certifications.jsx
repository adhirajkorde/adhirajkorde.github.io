import { motion } from 'framer-motion'
import { Award, ExternalLink, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { scaleIn, stagger } from '../utils/animations'

const CERTS = [
  {
    title: 'AI Prompt Learning Journey',
    subtitle: 'Comprehensive AI Prompting & Workflows Mastery',
    issuer: 'Naukri Campus',
    year: 'Aug 2026',
    date: '2026-08-19',
    certId: '6a859b44c5c5cf5905f6f910',
    description:
      'Completed all levels of the AI Prompt Learning Journey: Prompt Fundamentals (clear & effective prompts), Structured Prompting (step-by-step workflows for complex tasks), and Advanced Prompting Techniques (solving real-world use cases).',
    skills: ['Prompt Fundamentals', 'Structured Prompting', 'Advanced AI Workflows'],
    accent: '#a855f7',
    featured: true,
    url: 'https://campus.naukri.com/',
  },
  {
    title: 'AWS Solution Architecture',
    subtitle: 'Cloud Architecture & Infrastructure Design',
    issuer: 'Forage',
    year: '2024',
    description: 'Completed job simulation focusing on designing resilient, scalable, and secure cloud architectures on Amazon Web Services.',
    skills: ['Cloud Architecture', 'AWS Services', 'System Design'],
    accent: '#f97316',
    url: 'https://www.theforage.com/',
  },
  {
    title: 'AWS Gen AI Virtual Internship',
    subtitle: 'Generative AI Engineering on AWS',
    issuer: 'AICTE & AWS',
    year: '2024',
    description: 'Practical training on deploying generative AI foundation models, prompt pipelines, and intelligent workflows using AWS cloud infrastructure.',
    skills: ['Generative AI', 'AWS Bedrock', 'LLM Pipelines'],
    accent: '#10b981',
    url: 'https://internship.aicte-india.org/',
  },
  {
    title: 'Python Full Stack Development',
    subtitle: 'Full Stack Web Architecture with Python',
    issuer: 'AICTE',
    year: '2024',
    description: 'Hands-on certification covering frontend web technologies, Python backend frameworks, RESTful API design, and database integration.',
    skills: ['Python', 'Flask / Django', 'REST APIs', 'Full Stack'],
    accent: '#3b82f6',
    url: 'https://internship.aicte-india.org/',
  },
  {
    title: 'AI-ML Virtual Internship',
    subtitle: 'Artificial Intelligence & Machine Learning',
    issuer: 'AICTE',
    year: '2024',
    description: 'Practical internship covering machine learning pipelines, data preprocessing, model evaluation, and predictive analytics.',
    skills: ['Machine Learning', 'Data Preprocessing', 'Model Evaluation'],
    accent: '#8b5cf6',
    url: 'https://internship.aicte-india.org/',
  },
  {
    title: 'TATA Data Visualization',
    subtitle: 'Empowering Business with Effective Insights',
    issuer: 'Forage & TATA',
    year: '2024',
    description: 'Completed simulation creating visual dashboards and communicating data-driven insights to executive stakeholders.',
    skills: ['Data Visualization', 'Executive Reporting', 'Analytics'],
    accent: '#f59e0b',
    url: 'https://www.theforage.com/',
  },
]

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" className="bg-surface/50">
      <SectionTitle
        label="Credentials & Certifications"
        title="Certifications"
        subtitle="Industry certifications validating practical expertise in AI Prompt Engineering, Cloud Architecture, and Full-Stack Development."
      />

      <motion.div
        variants={stagger}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {CERTS.map(({ title, subtitle, issuer, year, date, certId, description, skills, accent, featured, url }, i) => (
          <motion.div
            key={title}
            variants={scaleIn}
            className={`glass rounded-2xl p-6 group glow-hover transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              featured ? 'border-accent/40 ring-1 ring-accent/30 sm:col-span-2 lg:col-span-3' : ''
            }`}
            whileHover={{ y: -5 }}
          >
            {/* Ambient glow */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl pointer-events-none"
              style={{ background: accent }}
            />

            <div>
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ background: `${accent}18`, border: `1px solid ${accent}35` }}
                  >
                    {featured ? <Sparkles size={20} style={{ color: accent }} /> : <Award size={20} style={{ color: accent }} />}
                  </div>
                  <div>
                    <span
                      className="inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-full mb-1"
                      style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}
                    >
                      {issuer}
                    </span>
                    {featured && (
                      <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-semibold text-accent-2">
                        <ShieldCheck size={12} /> Featured Certification
                      </span>
                    )}
                  </div>
                </div>

                {url && (
                  <motion.a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg glass-light border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-accent/40 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`View ${title} issuer`}
                  >
                    <ExternalLink size={13} />
                  </motion.a>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-bold text-white text-base leading-snug mb-1">{title}</h3>
              <p className="text-xs text-muted mb-3 font-medium">{subtitle}</p>

              {/* Description */}
              <p className="text-xs text-muted leading-relaxed mb-4">{description}</p>

              {/* Skills Tags */}
              {skills && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[10px] font-medium rounded-md"
                      style={{ background: `${accent}10`, color: '#d1d5db', border: `1px solid ${accent}20` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-subtle">
              {certId ? (
                <span className="font-mono text-[11px] text-muted">
                  ID: <span className="text-white/80">{certId}</span>
                </span>
              ) : (
                <span className="text-muted">{issuer}</span>
              )}
              <span className="text-[11px] font-medium text-muted">{date || year}</span>
            </div>

            {/* Bottom accent */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl"
              style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              initial={{ width: '0%' }}
              whileInView={{ width: '65%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
