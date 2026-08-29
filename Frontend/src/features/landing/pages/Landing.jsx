import React from 'react'
import { Link } from 'react-router'
import Navbar from '../../shared/components/Navbar'
import '../style/landing.scss'

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Technical Questions',
    desc: 'AI-crafted questions targeting the exact tech stack in your job description.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Behavioral Insights',
    desc: 'STAR-method answers and intention breakdowns for every behavioral question.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
    title: 'Preparation Road Map',
    desc: 'A day-by-day study plan tailored to close your specific skill gaps.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: '30-Second Generation',
    desc: 'Paste a job description, upload your resume, and get a full plan instantly.'
  }
]

const STEPS = [
  { num: '01', title: 'Paste the Job Description', desc: 'Drop in the full listing from any job board.' },
  { num: '02', title: 'Upload Your Resume', desc: 'PDF or DOCX — or just type a quick self-description.' },
  { num: '03', title: 'Get Your Strategy', desc: 'Receive tailored questions, answers, and a study roadmap.' }
]

const Landing = () => {
  return (
    <div className="landing">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__glow" />
        <div className="hero__content">
          <span className="hero__badge">AI-Powered Interview Prep</span>
          <h1 className="hero__title">
            Walk into every interview<br />
            with a <span className="hero__highlight">winning strategy</span>
          </h1>
          <p className="hero__subtitle">
            ResuMind analyses the job description and your profile to generate
            technical &amp; behavioural questions, model answers, skill-gap insights,
            and a day-by-day preparation roadmap.
          </p>
          <div className="hero__actions">
            <Link to="/register" className="hero__btn hero__btn--primary">
              Start Preparing — It's Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link to="/login" className="hero__btn hero__btn--ghost">
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="steps">
        <h2 className="section-title">How It Works</h2>
        <div className="steps__grid">
          {STEPS.map(step => (
            <div className="step" key={step.num}>
              <span className="step__num">{step.num}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="features">
        <h2 className="section-title">Everything You Need to Ace the Interview</h2>
        <div className="features__grid">
          {FEATURES.map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="cta">
        <div className="cta__card">
          <h2 className="cta__title">Ready to stand out?</h2>
          <p className="cta__desc">
            Join ResuMind and get a personalised interview plan in under a minute.
          </p>
          <Link to="/register" className="cta__btn">
            Get Started for Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} ResuMind. Built with AI to help you land your dream role.</p>
      </footer>
    </div>
  )
}

export default Landing
