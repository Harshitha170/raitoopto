import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const JOB_ICONS = {
  default: "🔧",
  laser: "⚡",
  engineer: "⚙️",
  technician: "🛠️",
  manager: "📋",
  sales: "💼",
  software: "💻",
  automation: "🤖",
  cnc: "🏭",
  fiber: "🔦",
  service: "🔩",
  field: "📍"
};

function getJobIcon(title) {
  const t = (title || "").toLowerCase();
  if (t.includes("laser")) return "⚡";
  if (t.includes("field")) return "📍";
  if (t.includes("automation")) return "🤖";
  if (t.includes("software") || t.includes("tech")) return "💻";
  if (t.includes("cnc")) return "🏭";
  if (t.includes("fiber")) return "🔦";
  if (t.includes("sales") || t.includes("business")) return "💼";
  if (t.includes("manager") || t.includes("lead")) return "📋";
  if (t.includes("engineer")) return "⚙️";
  if (t.includes("service")) return "🔩";
  return "🛠️";
}

function JDModal({ job, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.85)", display: "flex",
      alignItems: "center", justifyContent: "center", padding: "20px"
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: "12px", maxWidth: "700px",
        width: "100%", maxHeight: "85vh", overflow: "auto",
        boxShadow: "0 30px 80px rgba(0,0,0,0.4)"
      }} onClick={e => e.stopPropagation()}>
        <div style={{ background: "#0A0A0C", color: "#fff", padding: "24px 30px", borderRadius: "12px 12px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "var(--Y)", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", marginBottom: "4px" }}>JOB DESCRIPTION</div>
            <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: "18px", fontWeight: 900 }}>{getJobIcon(job.title)} {job.title}</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: "36px", height: "36px", borderRadius: "50%", fontSize: "18px", cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ padding: "30px" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
            <span style={{ background: job.status === "Published" ? "#e6f9e6" : "#f3f3f3", color: job.status === "Published" ? "green" : "#666", padding: "4px 14px", borderRadius: "20px", fontSize: "11px", fontWeight: 800 }}>{job.status}</span>
            <span style={{ background: "#fff3cd", color: "#856404", padding: "4px 14px", borderRadius: "20px", fontSize: "11px", fontWeight: 700 }}>Exp: {job.minExperience} – {job.maxExperience} Yrs</span>
          </div>
          {job.description && (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "#888", marginBottom: "10px" }}>DESCRIPTION</div>
              <p style={{ fontFamily: "Exo 2, sans-serif", lineHeight: 1.75, color: "#333" }}>{job.description}</p>
            </div>
          )}
          {job.responsibilities && (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "#888", marginBottom: "10px" }}>RESPONSIBILITIES</div>
              <p style={{ fontFamily: "Exo 2, sans-serif", lineHeight: 1.75, color: "#333", whiteSpace: "pre-wrap" }}>{job.responsibilities}</p>
            </div>
          )}
          {job.skills && (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "#888", marginBottom: "10px" }}>SKILLS REQUIRED</div>
              <p style={{ fontFamily: "Exo 2, sans-serif", lineHeight: 1.75, color: "#333", whiteSpace: "pre-wrap" }}>{job.skills}</p>
            </div>
          )}
          {job.jdFileUrl && (
            <a href={job.jdFileUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0A0A0C", color: "#fff", padding: "12px 24px", borderRadius: "6px", fontFamily: "Exo 2, sans-serif", fontWeight: 700, fontSize: "13px", textDecoration: "none", marginTop: "10px" }}>
              📄 Download Full JD (PDF/DOC)
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Career() {
  const [step, setStep] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jdJob, setJdJob] = useState(null);

  const [candidateInfo, setCandidateInfo] = useState({ name: "", email: "", resume: null });
  const [testResult, setTestResult] = useState(null);

  const [activeJob, setActiveJob] = useState(null);
  const [jobQuestions, setJobQuestions] = useState([]);
  const [jobAnswers, setJobAnswers] = useState({});

 useEffect(() => {
    fetch(`${API_BASE_URL}/api/jobs`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setJobs(d); })
      .catch(err => console.error("Job fetch failed", err));
  }, []);

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    if (!activeJob) { setError("Please select a job to apply for."); return; }
    if (!candidateInfo.resume) { setError("Resume is mandatory."); return; }
    setError(""); selectJob(activeJob);
  };

  const selectJob = (job) => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/jobs/${job._id}/questions`)
      .then(r => r.json())
      .then(d => { setActiveJob(job); setJobQuestions(d); setJobAnswers({}); setStep(3); })
      .finally(() => setLoading(false));
  };

  const submitApplication = async (e) => {
    e.preventDefault();
    const missing = jobQuestions.some(q => q.isMandatory && !jobAnswers[q._id]);
    if (missing) { setError("Please answer all questions before submitting."); return; }
    setLoading(true);
    const data = new FormData();
    data.append("name", candidateInfo.name);
    data.append("email", candidateInfo.email);
    data.append("jobRole", activeJob.title);
    data.append("jobId", activeJob._id);
    const responses = jobQuestions.map(q => ({ questionId: q._id, answer: jobAnswers[q._id] || "" }));
    data.append("jobResponses", JSON.stringify(responses));
    data.append("resume", candidateInfo.resume);
    try {
      const resp = await fetch(`${API_BASE_URL}/api/career/apply`, { method: "POST", body: data });
      const res = await resp.json();
      if (res.success) { setTestResult(res); setStep(4); }
      else setError(res.message);
    } catch (err) { setError("Connection failure."); }
    setLoading(false);
  };

  const STEPS = [
    { num: 1, label: "ROLE", icon: "🎯" },
    { num: 2, label: "INFO", icon: "📝" },
    { num: 3, label: "TEST", icon: "📋" },
    { num: 4, label: "DONE", icon: "✅" }
  ];

  return (
    <div className="career-module">
      <div className="ph" style={{ minHeight: "35vh" }}>
        <div className="ph-grid"></div>
        <div className="ph-glow"></div>
        <div className="wrap">
          <div className="ph-bc"><Link to="/">Home</Link> / Careers</div>
          <h1>WORK <span className="yl">STATION</span></h1>
          <p>The Future of Laser Automation is Built Here.</p>
        </div>
      </div>

      <section className="sp">
        <div className="wrap">

          {/* 4-STEP STEPPER */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0", marginBottom: "60px" }}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "50%",
                    background: step >= s.num ? "var(--Y)" : step === s.num - 1 ? "rgba(255,239,0,0.15)" : "#eee",
                    color: step >= s.num ? "#0A0A0C" : "#aaa",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, fontSize: step >= s.num ? "20px" : "16px",
                    border: step === s.num ? "3px solid #0A0A0C" : step > s.num ? "none" : "2px solid #ddd",
                    boxShadow: step >= s.num ? "0 6px 20px rgba(255,239,0,0.45)" : "none",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                  }}>
                    {step > s.num ? "✓" : s.icon}
                  </div>
                  <div style={{
                    fontSize: "10px", fontWeight: 800, letterSpacing: "2px",
                    color: step >= s.num ? "#0A0A0C" : "#bbb",
                    transition: "color 0.3s"
                  }}>{s.label}</div>
                </div>
                {i < 3 && (
                  <div style={{
                    width: "70px", height: "3px",
                    background: step > s.num ? "var(--Y)" : "#eee",
                    margin: "0 6px", marginBottom: "20px",
                    borderRadius: "2px", transition: "background 0.4s"
                  }}></div>
                )}
              </React.Fragment>
            ))}
          </div>
           {/* Step 1: Job Selection with icons + JD viewer */}
          {step === 1 && (
            <div>
              <h2 className="sh" style={{ textAlign: "center", marginBottom: "50px" }}>Available <span className="yl">Roles</span></h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "26px" }}>
                {jobs.map(j => (
                  <div key={j._id} style={{
                    background: "white", border: "1px solid #E2E2D8", borderRadius: "10px",
                    overflow: "hidden", display: "flex", flexDirection: "column",
                    transition: "all 0.3s", boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
                  }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.12)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)"}
                  >
                    {/* Card Header with icon */}
                    <div style={{ background: "linear-gradient(135deg, #0A0A0C 0%, #1a1a2e 100%)", padding: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{
                        width: "56px", height: "56px", borderRadius: "12px",
                        background: "rgba(255,239,0,0.15)", border: "1.5px solid rgba(255,239,0,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "28px", flexShrink: 0
                      }}>{getJobIcon(j.title)}</div>
                      <div>
                        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "9px", fontWeight: 700, letterSpacing: "2px", marginBottom: "4px" }}>OPEN POSITION</div>
                        <h3 style={{ color: "#fff", fontSize: "18px", fontFamily: "Orbitron, sans-serif", margin: 0, lineHeight: 1.2 }}>{j.title}</h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: "20px", flex: 1 }}>
                      <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
                        <span style={{ background: "#e6f9e6", color: "green", padding: "3px 10px", borderRadius: "20px", fontSize: "10px", fontWeight: 700 }}>{j.status}</span>
                        <span style={{ background: "#fff3cd", color: "#856404", padding: "3px 10px", borderRadius: "20px", fontSize: "10px", fontWeight: 700 }}>Exp: {j.minExperience} – {j.maxExperience} Yrs</span>
                      </div>
                      <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.65, marginBottom: "0" }}>{(j.description || "").substring(0, 130)}...</p>
                    </div>

                    {/* Card Actions */}
                    <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f0f0", display: "flex", gap: "10px" }}>
                      <button onClick={() => setJdJob(j)} style={{
                        flex: 1, background: "transparent", color: "#0A0A0C",
                        border: "1.5px solid #ddd", borderRadius: "6px",
                        padding: "10px", fontWeight: 700, cursor: "pointer",
                        fontSize: "12px", fontFamily: "Exo 2, sans-serif",
                        transition: "all 0.2s"
                      }}
                        onMouseEnter={e => { e.target.borderColor = "var(--Y)"; e.target.style.borderColor = "#0A0A0C"; }}
                        onMouseLeave={e => { e.target.style.borderColor = "#ddd"; }}
                      >📄 View JD</button>
                      <button onClick={() => {setActiveJob(j);setStep(2);}} className="btn-y" style={{ flex: 2, borderRadius: "6px" }}>Apply Now →</button>
                    </div>
                  </div>
                ))}
              </div>
              {jdJob && <JDModal job={jdJob} onClose={() => setJdJob(null)} />}
            </div>
          )}


          {/* Step 2: Info */}
          
          {step === 2 && ( 
            <div style={{ maxWidth: "500px", margin: "0 auto", background: "white", padding: "40px", border: "1px solid #E2E2D8", borderRadius: "8px" }}>
              <p style={{ marginBottom: "15px", fontWeight: "600" }}>
  Applying for: <span style={{ color: "var(--Y)" }}>{activeJob?.title}</span>
</p>
              <h2 className="sh" style={{ fontSize: "24px", marginBottom: "30px" }}>Primary <span className="yl">Details</span></h2>
              <form onSubmit={handleInfoSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <label className="ft-ht" style={{ fontSize: "11px", display: "block", marginBottom: "10px" }}>Full Name</label>
                  <input type="text" value={candidateInfo.name} onChange={e => {setError(""); setCandidateInfo({ ...candidateInfo, name: e.target.value })}} required style={{ width: "100%", padding: "12px", border: "1px solid #ddd" }} />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label className="ft-ht" style={{ fontSize: "11px", display: "block", marginBottom: "10px" }}>Email ID</label>
                  <input type="email" value={candidateInfo.email} onChange={e => {setError(""); setCandidateInfo({ ...candidateInfo, email: e.target.value })}} required style={{ width: "100%", padding: "12px", border: "1px solid #ddd" }} />
                </div>
                <div style={{ marginBottom: "30px" }}>
                  <label className="ft-ht" style={{ fontSize: "11px", display: "block", marginBottom: "10px" }}>Resume (Max 5MB)</label>
                  <input type="file" onChange={e => {setError(""); setCandidateInfo({ ...candidateInfo, resume: e.target.files[0] })}}   required style={{ width: "100%", padding: "10px", border: "1px dashed var(--Y)" }} />
                </div>
                {error && <div style={{ background: "#fee", color: "#a00", padding: "12px", borderRadius: "4px", marginBottom: "15px", fontSize: "12px", border: "1px solid #fcc", fontWeight: 700 }}>{error}</div>}
                <button type="submit" className="btn-dk" style={{ width: "100%" }}>Proceed to Test →</button>
              </form>
            </div>
          )}

         
          {/* Step 3: Test */}
          {step === 3 && activeJob && (
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              <div style={{ background: "linear-gradient(135deg, #0A0A0C, #1a1a2e)", padding: "22px 28px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", borderRadius: "8px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "24px" }}>{getJobIcon(activeJob.title)}</span>
                  Position: <strong>{activeJob.title}</strong>
                </span>
                <span style={{ color: "var(--Y)", fontWeight: 700, fontSize: "12px" }}>📋 MANDATORY EVALUATION</span>
              </div>
              <form onSubmit={submitApplication}>
                {jobQuestions.map((q, idx) => (
                  <div key={q._id} style={{ background: "white", padding: "28px", border: "1px solid #E2E2D8", marginBottom: "20px", borderRadius: "8px" }}>
                    <p style={{ fontWeight: 700, marginBottom: "20px", lineHeight: 1.5 }}>Q{idx + 1}. {q.questionText} <span style={{ color: "red" }}>*</span></p>
                    {q.questionType === "text" && (
                      <input required style={{ width: "100%", padding: "12px", border: "1px solid #ddd" }} value={jobAnswers[q._id] || ""} onChange={e => setJobAnswers({ ...jobAnswers, [q._id]: e.target.value })} />
                    )}
                    {q.questionType === "boolean" && (
                      <div style={{ display: "flex", gap: "30px" }}>
                        <label style={{ display: "flex", gap: "10px", alignItems: "center", cursor: "pointer" }}><input type="radio" value="Yes" checked={jobAnswers[q._id] === "Yes"} onChange={e => setJobAnswers({ ...jobAnswers, [q._id]: e.target.value })} required /> Yes</label>
                        <label style={{ display: "flex", gap: "10px", alignItems: "center", cursor: "pointer" }}><input type="radio" value="No" checked={jobAnswers[q._id] === "No"} onChange={e => setJobAnswers({ ...jobAnswers, [q._id]: e.target.value })} required /> No</label>
                      </div>
                    )}
                    {q.questionType === "mcq" && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        {q.options.map(opt => (
                          <label key={opt} style={{ padding: "15px", border: `1.5px solid ${jobAnswers[q._id] === opt ? "var(--Y)" : "#ddd"}`, background: jobAnswers[q._id] === opt ? "#fdfdf3" : "white", cursor: "pointer", borderRadius: "6px", transition: "all 0.2s" }}>
                            <input type="radio" value={opt} checked={jobAnswers[q._id] === opt} onChange={e => setJobAnswers({ ...jobAnswers, [q._id]: e.target.value })} required style={{ marginRight: "10px" }} /> {opt}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {error && <div style={{ background: "#fee", color: "#a00", padding: "12px", borderRadius: "4px", marginBottom: "15px", fontSize: "12px", border: "1px solid #fcc", fontWeight: 700 }}>{error}</div>}
                <button type="submit" disabled={loading} className="btn-dk" style={{ width: "100%", padding: "18px", fontSize: "14px" }}>
                  {loading ? "⏳ Evaluating..." : "✅ Finish & Submit"}
                </button>
              </form>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && testResult && (
            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto", padding: "60px 20px" }}>
              <div style={{ width: "130px", height: "130px", margin: "0 auto 30px", borderRadius: "50%", background: "linear-gradient(135deg, var(--Y), #ffcc00)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 8px rgba(255,239,0,0.15), 0 20px 50px rgba(255,239,0,0.3)", animation: "amPopIn 0.6s ease" }}>
                <svg style={{ width: "60px", fill: "#0A0A0C" }} viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
              </div>
              <div style={{ display: "inline-block", background: "#e6f9e6", color: "green", padding: "6px 20px", borderRadius: "20px", fontSize: "12px", fontWeight: 800, marginBottom: "20px", letterSpacing: "2px" }}>
                🎉 TEST SUBMITTED SUCCESSFULLY
              </div>
              <h2 className="sh" style={{ marginBottom: "16px" }}>Evaluation <span className="yl">Complete!</span></h2>
              <p style={{ color: "#555", marginBottom: "12px", lineHeight: 1.7, fontFamily: "Exo 2, sans-serif" }}>
                Thank you <strong>{candidateInfo.name}</strong>. Your assessment for the <strong>{activeJob?.title}</strong> role has been recorded and is under review.
              </p>
              <p style={{ color: "#888", fontSize: "13px", marginBottom: "40px", fontFamily: "Exo 2, sans-serif" }}>
                Our team will contact you at <strong>{candidateInfo.email}</strong> if your score and profile match our requirements.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/" className="btn-dk" style={{ padding: "14px 36px" }}>← Back to Home</Link>
                <button onClick={() => { setStep(1); setTestResult(null); setActiveJob(null); setCandidateInfo({ name: "", email: "", resume: null }); }} className="btn-out" style={{ padding: "14px 36px" }}>Apply for Another Role</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* JD Modal */}
      {jdJob && <JDModal job={jdJob} onClose={() => setJdJob(null)} />}
    </div>
  );
}

export default Career;
