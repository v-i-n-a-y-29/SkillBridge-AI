import React, { useState } from "react"
import "../styles/interview.scss"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { BiCodeAlt, BiMessageRounded } from "react-icons/bi"
import { TbMap2 } from "react-icons/tb"

// ── Mock data (matches API shape) ────────────────────────────────────
const MOCK = {
  matchScore: 82,
  technicalQuestions: [
    {
      _id: "1",
      question: "How would you handle state management in a large-scale React application, and when would you choose Redux over React Context API?",
      intention: "To assess the candidat's understanding of React state management options and their ability to make architectural decisions based on application scale.",
      answer: "React Context API is ideal for low-frequency updates (like theme or auth state) but can cause performance issues in complex apps. Redux is suited for large-scale apps with complex, high-frequency state updates — offering predictable state transitions, middleware support, and powerful debugging via Redux DevTools.",
    },
    {
      _id: "2",
      question: "How do you design and implement robust JWT-based authentication and error handling middleware in Express?",
      intention: "To test the candidate's understanding of RESTful API security, authentication flows, and backend robustness using Express.",
      answer: "JWT auth middleware extracts the token from the Authorization header (Bearer), verifies it with jsonwebtoken, and attaches the decoded payload to req. For errors, use a centralized error-handling middleware as the final middleware in the Express stack — returning clean JSON error responses.",
    },
    {
      _id: "3",
      question: "How do SQL and NoSQL databases differ in schema design, and how would you approach schema design in MongoDB?",
      intention: "To evaluate the candidate's flexibility to adapt to NoSQL databases and assess their grasp of normalization vs. denormalization.",
      answer: "SQL uses rigid, table-based schemas with foreign keys and JOINs. MongoDB uses flexible, document-based JSON-like structures. Schema design depends on access patterns — embed for one-to-few relations, reference for one-to-many to avoid document size issues.",
    },
    {
      _id: "4",
      question: "How would you architect a Node.js/Express backend to securely integrate and stream responses from an AI API to a React frontend?",
      intention: "To evaluate ability to handle third-party API integrations, stream-based data handling, and AI application architecture.",
      answer: "Use the official AI SDK to request a streamed response, configure Express to forward chunks via Server-Sent Events (SSE) or chunked transfer encoding. On the React side, use the Fetch API with ReadableStream to update state incrementally as tokens arrive.",
    },
  ],
  behavioralQuestions: [
    {
      _id: "5",
      question: "Describe a major technical hurdle you faced during a project and how you solved it.",
      intention: "To evaluate problem-solving ability, technical depth, and perseverance in a self-directed project.",
      answer: "Use the STAR format (Situation, Task, Action, Result). Focus on a specific challenge — the research you did, the decision you made, and the measurable outcome it produced.",
    },
    {
      _id: "6",
      question: "Share an experience where you had to translate a difficult requirement into a technical solution or handle a conflict of opinion.",
      intention: "To assess collaboration, communication, adaptability, and how you handle technical constraints under product timelines.",
      answer: "Draw from internship experience. Discuss a complex feature request, how you communicated trade-offs openly, proposed an MVP approach that covered 90% of needs with half the effort, and delivered on time.",
    },
  ],
  skillGaps: [
    { _id: "s1", skillName: "State Management (Redux/Redux Toolkit)", severity: "high" },
    { _id: "s2", skillName: "MongoDB & NoSQL Schema Design", severity: "medium" },
    { _id: "s3", skillName: "TypeScript", severity: "low" },
    { _id: "s4", skillName: "Docker & Basic Cloud Services", severity: "medium" },
    { _id: "s5", skillName: "CI/CD Workflows", severity: "low" },
  ],
  preparationPlan: [
    { _id: "p1", day: 1, focus: "Core JavaScript and ES6+ Concepts", task: ["Review Promises, Async/Await, and the Event Loop.", "Practice closures, scoping, prototypes, and array methods.", "Revise ES6+ syntax: destructuring, spread/rest, and modules."] },
    { _id: "p2", day: 2, focus: "React.js Deep Dive & State Management", task: ["Revise core React Hooks — useState, useEffect, useMemo, useCallback.", "Build a sample project using Context API.", "Learn Redux Toolkit basics: Store, Slices, Actions, Reducers."] },
    { _id: "p3", day: 3, focus: "Node.js & Express API Development", task: ["Review Express routing, request lifecycle, and modular router design.", "Implement custom middleware: logging, validation, JWT auth.", "Review RESTful API best practices: status codes and error formats."] },
    { _id: "p4", day: 4, focus: "NoSQL and MongoDB Mastery", task: ["Learn core NoSQL concepts and compare with PostgreSQL/MySQL.", "Study Mongoose schema modeling, validation, and aggregation pipelines.", "Practice CRUD APIs in Express with MongoDB integration."] },
    { _id: "p5", day: 5, focus: "AI Integration, Streaming & TypeScript", task: ["Configure Gemini/OpenAI API in a Node.js environment.", "Implement SSE or chunked streaming HTTP responses in Node.js.", "TypeScript crash course: types, interfaces, and generics."] },
    { _id: "p6", day: 6, focus: "DevOps, Tools & Mock Practice", task: ["Understand Git workflows: branching, merging, PR reviews.", "Read on Docker — write a Dockerfile for a Node.js app.", "Study basic deployment strategies: AWS, Render, Vercel."] },
    { _id: "p7", day: 7, focus: "Behavioral Preparation & Final Review", task: ["Prepare STAR stories for past projects and internships.", "Rehearse resume project explanations with enthusiasm.", "Conduct a mock technical interview on full-stack topics."] },
  ],
}

// ── Helpers ─────────────────────────────────────────────────────────
function getScoreColor(score) {
  if (score >= 75) return "#22c55e"
  if (score >= 50) return "#eab308"
  return "rgb(244,71,71)"
}
function getScoreLabel(score) {
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
function RoadMap({ plan }) {
  return (
    <div className="timeline">
      {plan.map(p => (
        <div key={p._id} className="timeline__item">
          <div className="timeline__dot" />
          <div className="timeline__content">
            <div className="timeline__heading">
              <span className="timeline__day">Day {p.day}</span>
              <span className="timeline__focus">{p.focus}</span>
            </div>
            <ul className="timeline__tasks">
              {p.task.map((t, i) => <li key={i}>{t}</li>)}
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
function Interview() {
  const [activeTab, setActiveTab] = useState("technical")
  const data = MOCK
  const scoreColor = getScoreColor(data.matchScore)

  return (
    <main className="iv">
      <div className="iv__layout">

        {/* ── Left sidebar ── */}
        <aside className="iv__sidebar">
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
                <span className="iv__count-badge">{data.technicalQuestions.length} questions</span>
              </div>
              <div className="iv__qlist">
                {data.technicalQuestions.map((q, i) => (
                  <QuestionCard key={q._id} num={i + 1} {...q} />
                ))}
              </div>
            </>
          )}

          {activeTab === "behavioral" && (
            <>
              <div className="iv__content-hdr">
                <h2 className="iv__content-title">Behavioral Questions</h2>
                <span className="iv__count-badge">{data.behavioralQuestions.length} questions</span>
              </div>
              <div className="iv__qlist">
                {data.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={q._id} num={i + 1} {...q} />
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
              <RoadMap plan={data.preparationPlan} />
            </>
          )}

        </section>

        {/* ── Right sidebar ── */}
        <aside className="iv__right">
          <p className="iv__right-label">MATCH SCORE</p>

          <div
            className="iv__score-ring"
            style={{ "--score-color": scoreColor, "--score-pct": `${data.matchScore}%` }}
          >
            <div className="iv__score-inner">
              <span className="iv__score-num">{data.matchScore}</span>
              <span className="iv__score-pct">%</span>
            </div>
          </div>
          <p className="iv__score-desc" style={{ color: scoreColor }}>
            {getScoreLabel(data.matchScore)}
          </p>

          <p className="iv__right-label iv__right-label--gap">SKILL GAPS</p>
          <div className="iv__gaps-list">
            {data.skillGaps.map(g => (
              <span key={g._id} className={`iv__gap-tag iv__gap-tag--${g.severity}`}>
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
