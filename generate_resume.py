import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

os.makedirs('public', exist_ok=True)
pdf_path = 'public/Adhiraj_Korde_Resume.pdf'

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=40,
    rightMargin=40,
    topMargin=32,
    bottomMargin=32
)

styles = getSampleStyleSheet()

name_style = ParagraphStyle(
    'NameStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=20,
    leading=24,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#000000'),
    spaceAfter=2
)

location_style = ParagraphStyle(
    'LocationStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=10,
    leading=13,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#333333'),
    spaceAfter=2
)

contact_style = ParagraphStyle(
    'ContactStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#000000')
)

section_heading = ParagraphStyle(
    'SectionHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10.5,
    leading=14,
    textColor=colors.HexColor('#000000'),
    spaceBefore=5,
    spaceAfter=1
)

body_text = ParagraphStyle(
    'BodyText',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.5,
    alignment=TA_JUSTIFY,
    textColor=colors.HexColor('#222222')
)

bold_title = ParagraphStyle(
    'BoldTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9,
    leading=12,
    textColor=colors.HexColor('#000000')
)

title_tech = ParagraphStyle(
    'TitleTech',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.5,
    textColor=colors.HexColor('#111111')
)

meta_right = ParagraphStyle(
    'MetaRight',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.5,
    alignment=TA_RIGHT,
    textColor=colors.HexColor('#333333')
)

meta_right_bold = ParagraphStyle(
    'MetaRightBold',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8.5,
    leading=11.5,
    alignment=TA_RIGHT,
    textColor=colors.HexColor('#000000')
)

bullet_style = ParagraphStyle(
    'BulletStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.2,
    leading=11,
    textColor=colors.HexColor('#222222'),
    leftIndent=12
)

skills_line = ParagraphStyle(
    'SkillsLine',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.5,
    textColor=colors.HexColor('#222222'),
    leftIndent=10
)

elements = []

# Header
elements.append(Paragraph("<b>ADHIRAJ VIJAY KORDE</b>", name_style))
elements.append(Paragraph("Nashik, Maharashtra", location_style))
elements.append(Paragraph("+91-9404200148 &nbsp;&nbsp;|&nbsp;&nbsp; adhirajkorde@gmail.com &nbsp;&nbsp;|&nbsp;&nbsp; www.linkedin.com/in/adhiraj-korde-42aa56316", contact_style))
elements.append(Spacer(1, 4))

def add_section_header(title):
    elements.append(Paragraph(f"<b><u>{title.upper()}</u></b>", section_heading))
    elements.append(Spacer(1, 2))

# ABOUT ME
add_section_header("ABOUT ME")
about_text = (
    "Computer Science graduate passionate about Full Stack Web Development with hands-on experience in the MERN "
    "Stack (MongoDB, Express.js, React.js, and Node.js). Skilled in building responsive web applications, REST APIs, "
    "and database-driven applications. Proficient in Python and have a basic understanding of Generative AI, LLMs, "
    "and prompt engineering, while actively learning and exploring AI technologies. Familiar with Git, GitHub, and "
    "cloud computing. Eager to contribute as a Frontend Developer, Backend Developer, Full Stack Developer, or "
    "AI/GenAI Developer while continuously learning modern technologies."
)
elements.append(Paragraph(about_text, body_text))
elements.append(Spacer(1, 4))

# EDUCATION
add_section_header("EDUCATION")
edu_row1 = [
    Paragraph("<b>Guru Gobind Singh College of Engineering and Research, Nashik</b>", bold_title),
    Paragraph("<b>2022 – 2026</b>", meta_right_bold)
]
edu_row2 = [
    Paragraph("Bachelor of Computer Engineering", body_text),
    Paragraph("Nashik, Maharashtra", meta_right)
]
t_edu = Table([edu_row1, edu_row2], colWidths=[380, 150])
t_edu.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ('TOPPADDING', (0,0), (-1,-1), 1),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
]))
elements.append(t_edu)
elements.append(Spacer(1, 4))

# PROJECTS
add_section_header("PROJECTS")

def add_project(name, tech, bullets, right_text=""):
    title_p = Paragraph(f"<b>{name}</b> | <font color='#444444'>{tech}</font>", title_tech)
    meta_p = Paragraph(right_text, meta_right)
    t = Table([[title_p, meta_p]], colWidths=[380, 150])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(t)
    for b in bullets:
        elements.append(Paragraph(f"&bull;&nbsp; {b}", bullet_style))
    elements.append(Spacer(1, 3))

add_project(
    "SmartHire - Resume Screening & Candidate Ranking System",
    "Next.js, React.js, Node.js, Express.js, MongoDB, Prisma",
    [
        "Built a full-stack resume screening platform that extracts candidate skills, education, experience, and contact details from uploaded resumes.",
        "Developed a candidate ranking system that matches resumes with job descriptions and displays ranked results through an interactive recruiter dashboard."
    ]
)

add_project(
    "Personal Expense Tracker & Budget Manager",
    "Python, Flask, HTML, CSS, JavaScript, SQLite, Chart.js",
    [
        "Developed a personal finance management application to track income, expenses, and monthly budgets with secure user authentication.",
        "Built an interactive dashboard for expense tracking, budgeting, financial analytics, and Chart.js reports."
    ]
)

add_project(
    "AI-First HCP CRM Interaction Logger",
    "React.js, Redux Toolkit, FastAPI, PostgreSQL, LangChain, LangGraph, Groq, Redis, Docker, AWS",
    [
        "Built an AI-powered HCP CRM platform for managing doctor interactions, profiles, follow-ups, and engagement insights.",
        "Developed multi-agent AI workflows using LangChain and LangGraph for interaction analysis, sentiment detection, HCP resolution, and automated follow-up recommendations."
    ]
)

add_project(
    "Daily Scheduler - Employee Attendance Management System",
    "Next.js, FastAPI, TypeScript, Python, PostgreSQL",
    [
        "Built a full-stack attendance system for remote teams with employee check-in/out, leave management, and HR administration.",
        "Implemented role-based access, real-time attendance tracking, automated processing, and Excel reports to reduce HR workload."
    ],
    right_text="daily-scheduler-web.vercel.app"
)

# INTERNSHIP
add_section_header("INTERNSHIP")
intern_row1 = [
    Paragraph("<b>Kyron Data Tech</b>", bold_title),
    Paragraph("<b>20 Aug 2026</b>", meta_right_bold)
]
intern_row2 = [
    Paragraph("<b>&bull; Software Engineering Intern &mdash; MCP Server Development</b>", title_tech),
    Paragraph("Remote / Himachal Pradesh", meta_right)
]
t_intern = Table([intern_row1, intern_row2], colWidths=[380, 150])
t_intern.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ('TOPPADDING', (0,0), (-1,-1), 1),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
]))
elements.append(t_intern)

intern_bullets = [
    "Working on software engineering projects focused on Model Context Protocol (MCP) server development and AI-related applications.",
    "Developing and integrating MCP server components using Python and modern software engineering practices.",
    "Working with APIs and software tools to build practical AI-enabled solutions and improve application workflows.",
    "Collaborating on assigned development tasks, testing implementations, debugging issues, and maintaining project code and documentation."
]
for b in intern_bullets:
    elements.append(Paragraph(f"&bull;&nbsp; {b}", bullet_style))
elements.append(Spacer(1, 4))

# TECHNICAL SKILLS
add_section_header("TECHNICAL SKILLS")
skills_data = [
    "<b>Programming Languages:</b> JavaScript, TypeScript, Python, SQL",
    "<b>Web Technologies:</b> HTML5, CSS3, REST APIs, Tailwind CSS",
    "<b>Frameworks & Libraries:</b> React.js, Next.js, Node.js, Express.js, Django, Flask",
    "<b>Databases:</b> MongoDB, MySQL, PostgreSQL, Neon",
    "<b>Tools & Platforms:</b> Git, GitHub, VS Code, Jupyter Notebook, Google Colab",
    "<b>Cloud & Deployment:</b> AWS, Vercel, Render"
]
for s in skills_data:
    elements.append(Paragraph(f"&bull;&nbsp; {s}", skills_line))

doc.build(elements)

import shutil
shutil.copyfile('public/Adhiraj_Korde_Resume.pdf', 'public/resume.pdf')
os.makedirs('dist', exist_ok=True)
shutil.copyfile('public/Adhiraj_Korde_Resume.pdf', 'dist/Adhiraj_Korde_Resume.pdf')
shutil.copyfile('public/Adhiraj_Korde_Resume.pdf', 'dist/resume.pdf')
print("Resume generated and copied to public and dist successfully!")
