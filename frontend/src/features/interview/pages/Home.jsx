import React from 'react'
import '../styles/home.scss'
import { FiUploadCloud } from 'react-icons/fi'
import { BsInfoCircleFill } from 'react-icons/bs'

function Home() {
  return (
    <main className="home">

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
            maxLength={5000}
          />

          <p className="panel__char-count">0 / 5000 chars</p>
        </div>

        {/* Divider */}
        <div className="home__divider" />

        {/* Right panel — Your Background */}
        <div className="home__panel home__panel--right">
          <h2 className="panel__title">Your Background</h2>

          {/* Upload zone */}
          <label className="upload-zone" htmlFor="resume">
            <FiUploadCloud className="upload-zone__icon" size={28} />
            <span className="upload-zone__primary">Click to upload or drag &amp; drop</span>
            <span className="upload-zone__secondary">PDF or DOCX (Max 3MB)</span>
            <input
              hidden
              type="file"
              id="resume"
              name="resume"
              accept="application/pdf,.docx"
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
          <button className="home__cta" id="generateStrategy">
            Generate Strategy
          </button>
          <p className="home__cta-hint">AI-Powered Strategy Generation · Approx 30s</p>
        </div>

      </section>

    </main>
  )
}

export default Home
