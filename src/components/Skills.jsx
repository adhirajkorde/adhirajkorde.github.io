import { motion } from 'framer-motion'
import {
  Globe, Layout, Server, Database, Cloud, Brain, Wrench,
} from 'lucide-react'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { fadeUp, stagger, scaleIn } from '../utils/animations'

const CATEGORIES = [
  {
    icon: Layout,
    label: 'Frontend',
    color: '#06b6d4',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Vite'],
  },
  {
    icon: Server,
    label: 'Backend',
    color: '#8b5cf6',
    skills: ['Python', 'Node.js', 'Express.js', 'FastAPI', 'Flask', 'Django', 'REST APIs'],
  },
  {
    icon: Database,
    label: 'Databases',
    color: '#10b981',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite', 'SQL', 'Prisma ORM'],
  },
  {
    icon: Cloud,
    label: 'Cloud & DevOps',
    color: '#3b82f6',
    skills: ['AWS', 'Google Cloud', 'Vercel', 'Render', 'Cloudflare'],
  },
  {
    icon: Brain,
    label: 'Data Science & ML',
    color: '#f59e0b',
    skills: ['NumPy', 'Pandas', 'Scikit-Learn', 'TensorFlow', 'PyTorch', 'Matplotlib', 'Chart.js', 'LangGraph', 'LLMs', 'RAG', 'LangChain', 'Prompt Engineering'],
  },
  {
    icon: Wrench,
    label: 'Tools',
    color: '#ec4899',
    skills: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Google Colab', 'Postman', 'REST APIs', 'Linux'],
  },
]

function SkillCard({ icon: Icon, label, color, skills, index }) {
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      className="glass rounded-2xl p-6 group glow-hover transition-all duration-300 relative overflow-hidden"
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
        style={{ background: color }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <h3 className="font-bold text-white text-sm tracking-wide">{label}</h3>
      </div>

      {/* Skills */}
      <motion.div
        className="flex flex-wrap gap-2"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            variants={fadeUp}
            custom={i}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-default"
            style={{
              background: `${color}10`,
              border: `1px solid ${color}25`,
              color: '#d1d5db',
            }}
            whileHover={{
              background: `${color}22`,
              borderColor: `${color}60`,
              color: '#ffffff',
              scale: 1.05,
            }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        initial={{ width: '0%' }}
        whileInView={{ width: '60%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionTitle
        label="What I Know"
        title="Skills & Expertise"
        subtitle="A curated set of technologies I use to build modern, scalable, and AI-powered applications."
      />

      <motion.div
        variants={stagger}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {CATEGORIES.map((cat, i) => (
          <SkillCard key={cat.label} {...cat} index={i} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
