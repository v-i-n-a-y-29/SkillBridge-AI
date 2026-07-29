import React, { useState, useRef, useEffect } from 'react'
import '../styles/home.scss'
import { FiUploadCloud, FiLogOut } from 'react-icons/fi'
import { BsInfoCircleFill } from 'react-icons/bs'
import { useInterview } from '../hooks/useInterview'
import { useAuth } from '../../auth/hooks/useAuth'
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  const { handleLogout } = useAuth()
  const { loading, reports, generateReport, getAllReports } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const resumeInputRef = useRef()

  useEffect(() => {
    getAllReports()
  }, [])

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current?.files?.[0]
    const data = await generateReport({ jobDescription, selfDescription, resumeFile })
    if (data?._id) {
      navigate(`/interview/${data._id}`)
    }
  }

  return (
    <main className="home">
      {/* ── Top Bar / Header ── */}
      <div className="home__topbar">
        <button className="home__logout-btn" onClick={handleLogout}>
          <FiLogOut size={16} /> Logout
        </button>
      </div>

      {/* ── Page header ── */}
      <header className="home__header">
        <h1 className="home__title">Professional Interview Strategy Builder</h1>
        <p className="home__subtitle">
          Leverage AI to analyze job requirements and your unique profile to build a winning preparation plan.
        </p>
      </header>

      {/* ── Main card ── */}
      <section className="home__card">
        {/* Left panel — Job Opportunity */}
        <div className="home__panel home__panel--left">
          <h2 className="panel__title">Job Opportunity</h2>

          <textarea
            className="panel__textarea"
            id="jobDescription"
            name="jobDescription"
            placeholder={`Paste the full job description here... e.g., "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."`}
            maxLength={500000}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          {/* <p className="panel__char-count">{jobDescription.length} / 500000 chars</p> */}
        </div>

        {/* Divider */}
        <div className="home__divider" />

        {/* Right panel — Your Background */}
        <div className="home__panel home__panel--right">
          <h2 className="panel__title">Your Background</h2>

          {/* Upload zone */}
          <label className="upload-zone" htmlFor="resume">
            <FiUploadCloud className="upload-zone__icon" size={28} />
            <span className="upload-zone__primary">Click to upload </span>
            <span className="upload-zone__secondary">PDF or DOCX (Max 3MB)</span>
            <input
              hidden
              type="file"
              id="resume"
              name="resume"
              accept="application/pdf,.docx"
              ref={resumeInputRef}
            />
          </label>

          {/* OR separator */}
          <div className="profile__or">
            <span className="profile__or-line" />
            <span className="profile__or-text">OR</span>
            <span className="profile__or-line" />
          </div>

          {/* Quick self-description */}
          <div className="profile__section">
            <label className="profile__label" htmlFor="selfDescription">
              Quick Self-Description
            </label>
            <textarea
              className="panel__textarea panel__textarea--short"
              id="selfDescription"
              name="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              onChange={(e) => setSelfDescription(e.target.value)}
            />
          </div>

          {/* Info banner */}
          <div className="info-banner">
            <BsInfoCircleFill className="info-banner__icon" size={15} />
            <p className="info-banner__text">
              Either a Resume or a Self-Description is required to generate a personalized plan.
            </p>
          </div>

          {/* CTA — inside right panel */}
          <button
            className="home__cta"
            id="generateStrategy"
            onClick={handleGenerateReport}
            disabled={loading}
          >
            {loading ? "Generating Strategy..." : "★ Generate My Interview Strategy"}
          </button>
          <p className="home__cta-hint">AI-Powered Strategy Generation · Approx 30s</p>
        </div>
      </section>

      {/* ── Recent Interview Plans ── */}
      {reports && reports.length > 0 && (
        <section className="home__recent">
          <h2 className="home__recent-title">My Recent Interview Plans</h2>
          <div className="home__recent-grid">
            {reports.map((item) => (
              <div
                key={item._id}
                className="recent-card"
                onClick={() => navigate(`/interview/${item._id}`)}
              >
                <h3 className="recent-card__title">{item.title}</h3>
                <p className="recent-card__date">
                  Generated on {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                </p>
                {item.matchScore !== undefined && (
                  <p className="recent-card__score">
                    Match Score: <span className="recent-card__score-val">{item.matchScore}%</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default Home

