import React, { useState, useEffect } from "react"
import "../styles/interview.scss"
import { BsChevronDown, BsChevronUp, BsArrowLeft } from "react-icons/bs"
import { BiCodeAlt, BiMessageRounded } from "react-icons/bi"
import { TbMap2 } from "react-icons/tb"
import { useInterview } from "../hooks/useInterview"
import { useParams, useNavigate } from "react-router"

// ── Helpers ─────────────────────────────────────────────────────────
function getScoreColor(score = 0) {
  if (score >= 75) return "#22c55e"
  if (score >= 50) return "#eab308"
  return "rgb(244,71,71)"
}
function getScoreLabel(score = 0) {
  if (score >= 75) return "Strong match for this role"
  if (score >= 50) return "Moderate match for this role"
  return "Low match for this role"
}

// ── Question accordion ───────────────────────────────────────────────
function QuestionCard({ num, question, intention, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`qc ${open ? "qc--open" : ""}`}>
      <button className="qc__toggle" onClick={() => setOpen(p => !p)}>
        <span className="qc__num">Q{num}</span>
        <span className="qc__question">{question}</span>
        <span className="qc__chevron">
          {open ? <BsChevronUp size={13} /> : <BsChevronDown size={13} />}
        </span>
      </button>
      {open && (
        <div className="qc__body">
          <span className="qc__pill qc__pill--intention">INTENTION</span>
          <p className="qc__text">{intention}</p>
          <span className="qc__pill qc__pill--answer">MODEL ANSWER</span>
          <p className="qc__text">{answer}</p>
        </div>
      )}
    </div>
  )
}

// ── Road map timeline ────────────────────────────────────────────────
function RoadMap({ plan = [] }) {
  return (
    <div className="timeline">
      {plan.map(p => (
        <div key={p._id || p.day} className="timeline__item">
          <div className="timeline__dot" />
          <div className="timeline__content">
            <div className="timeline__heading">
              <span className="timeline__day">Day {p.day}</span>
              <span className="timeline__focus">{p.focus}</span>
            </div>
            <ul className="timeline__tasks">
              {p.task?.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Nav config ───────────────────────────────────────────────────────
const NAV = [
  { id: "technical",  label: "Technical Questions",  icon: <BiCodeAlt size={15} /> },
  { id: "behavioral", label: "Behavioral Questions", icon: <BiMessageRounded size={15} /> },
  { id: "roadmap",    label: "Road Map",             icon: <TbMap2 size={15} /> },
]

// ── Main ─────────────────────────────────────────────────────────────
const Interview = () => {
  const navigate = useNavigate()
  const { interviewId } = useParams()
  const { report, loading, getReportById } = useInterview()
  const [activeTab, setActiveTab] = useState("technical")

  useEffect(() => {
    if (interviewId && (!report || report._id !== interviewId)) {
      getReportById(interviewId)
    }
  }, [interviewId])

  if (loading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', color: '#94a3b8' }}>
        <p>Loading interview report...</p>
      </div>
    )
  }

  if (!report) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', color: '#94a3b8' }}>
        <p>No report found for this interview.</p>
      </div>
    )
  }

  const scoreColor = getScoreColor(report?.matchScore)

  return (
    <main className="iv">
      <div className="iv__layout">

        {/* ── Left sidebar ── */}
        <aside className="iv__sidebar">
          <button className="iv__back-btn" onClick={() => navigate("/")}>
            <BsArrowLeft size={16} /> Back to Home
          </button>
          <p className="iv__sections-label">SECTIONS</p>
          <nav className="iv__nav">
            {NAV.map(item => (
              <button
                key={item.id}
                className={`iv__nav-item ${activeTab === item.id ? "iv__nav-item--active" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="iv__nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Center ── */}
        <section className="iv__main">

          {activeTab === "technical" && (
            <>
              <div className="iv__content-hdr">
                <h2 className="iv__content-title">Technical Questions</h2>
                <span className="iv__count-badge">
                  {report.technicalQuestions?.length || 0} questions
                </span>
              </div>
              <div className="iv__qlist">
                {report.technicalQuestions?.map((q, i) => (
                  <QuestionCard key={q._id || i} num={i + 1} {...q} />
                ))}
              </div>
            </>
          )}

          {activeTab === "behavioral" && (
            <>
              <div className="iv__content-hdr">
                <h2 className="iv__content-title">Behavioral Questions</h2>
                <span className="iv__count-badge">
                  {report.behavioralQuestions?.length || 0} questions
                </span>
              </div>
              <div className="iv__qlist">
                {report.behavioralQuestions?.map((q, i) => (
                  <QuestionCard key={q._id || i} num={i + 1} {...q} />
                ))}
              </div>
            </>
          )}

          {activeTab === "roadmap" && (
            <>
              <div className="iv__content-hdr">
                <h2 className="iv__content-title">Preparation Road Map</h2>
                <span className="iv__count-badge">7-day plan</span>
              </div>
              <RoadMap plan={report.preparationPlan || []} />
            </>
          )}

        </section>

        {/* ── Right sidebar ── */}
        <aside className="iv__right">
          <p className="iv__right-label">MATCH SCORE</p>

          <div
            className="iv__score-ring"
            style={{ "--score-color": scoreColor, "--score-pct": `${report.matchScore || 0}%` }}
          >
            <div className="iv__score-inner">
              <span className="iv__score-num">{report.matchScore || 0}</span>
              <span className="iv__score-pct">%</span>
            </div>
          </div>
          <p className="iv__score-desc" style={{ color: scoreColor }}>
            {getScoreLabel(report.matchScore)}
          </p>

          <p className="iv__right-label iv__right-label--gap">SKILL GAPS</p>
          <div className="iv__gaps-list">
            {report.skillGaps?.map((g, i) => (
              <span key={g._id || i} className={`iv__gap-tag iv__gap-tag--${g.severity}`}>
                {g.skillName}
              </span>
            ))}
          </div>
        </aside>

      </div>
    </main>
  )
}

export default Interview
