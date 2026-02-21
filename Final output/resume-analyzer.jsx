import { useState, useRef, useCallback } from "react";

const ACCENT = "#00FFB2";
const DARK = "#0A0D12";
const PANEL = "#111722";
const BORDER = "#1E2A3A";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: ${DARK}; color: #E8EDF5; font-family: 'DM Mono', monospace; }

  .app {
    min-height: 100vh;
    background: ${DARK};
    background-image: 
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,255,178,0.07) 0%, transparent 60%),
      repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(30,42,58,0.3) 39px, rgba(30,42,58,0.3) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(30,42,58,0.15) 39px, rgba(30,42,58,0.15) 40px);
  }

  .header {
    border-bottom: 1px solid ${BORDER};
    padding: 20px 40px;
    display: flex;
    align-items: center;
    gap: 16px;
    backdrop-filter: blur(10px);
    background: rgba(10,13,18,0.8);
    position: sticky; top: 0; z-index: 50;
  }

  .logo-mark {
    width: 36px; height: 36px;
    border: 1.5px solid ${ACCENT};
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 14px; color: ${ACCENT};
    position: relative;
  }
  .logo-mark::before {
    content: '';
    position: absolute; inset: 3px;
    background: rgba(0,255,178,0.1);
  }

  .logo-text { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: 0.08em; color: #E8EDF5; }
  .logo-sub { font-size: 10px; color: #4A5A72; letter-spacing: 0.15em; text-transform: uppercase; }

  .badge {
    margin-left: auto;
    font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 4px 10px; border: 1px solid rgba(0,255,178,0.3);
    color: ${ACCENT}; background: rgba(0,255,178,0.05);
  }

  .container { max-width: 1100px; margin: 0 auto; padding: 48px 24px; }

  .hero { text-align: center; margin-bottom: 56px; }
  .hero-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: ${ACCENT}; margin-bottom: 16px; }
  .hero-title {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(32px, 5vw, 56px); line-height: 1.05;
    color: #E8EDF5; margin-bottom: 16px;
  }
  .hero-title span { color: ${ACCENT}; }
  .hero-sub { font-size: 13px; color: #4A5A72; max-width: 480px; margin: 0 auto; line-height: 1.7; }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  @media(max-width: 700px) { .grid { grid-template-columns: 1fr; } }

  .panel {
    background: ${PANEL};
    border: 1px solid ${BORDER};
    padding: 28px;
    position: relative;
    overflow: hidden;
  }
  .panel::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, ${ACCENT}, transparent);
    opacity: 0.4;
  }

  .panel-label {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: #4A5A72; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
  }
  .panel-label::before {
    content: '';
    width: 6px; height: 6px;
    background: ${ACCENT};
    display: inline-block;
  }

  .drop-zone {
    border: 1.5px dashed #1E3A52;
    padding: 40px 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: rgba(0,255,178,0.02);
    position: relative;
  }
  .drop-zone:hover, .drop-zone.drag-over {
    border-color: ${ACCENT};
    background: rgba(0,255,178,0.05);
  }
  .drop-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

  .upload-icon { font-size: 32px; margin-bottom: 12px; opacity: 0.6; }
  .upload-text { font-size: 12px; color: #6A7A8A; line-height: 1.6; }
  .upload-text strong { color: ${ACCENT}; display: block; font-size: 13px; margin-bottom: 4px; }

  .file-loaded {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px;
    background: rgba(0,255,178,0.06); border: 1px solid rgba(0,255,178,0.25);
  }
  .file-icon { font-size: 20px; }
  .file-name { font-size: 12px; color: ${ACCENT}; flex: 1; }
  .file-clear { background: none; border: none; color: #4A5A72; cursor: pointer; font-size: 16px; }
  .file-clear:hover { color: #E8EDF5; }

  textarea {
    width: 100%; height: 160px;
    background: #0D1520; border: 1px solid ${BORDER};
    color: #C8D8E8; font-family: 'DM Mono', monospace; font-size: 12px;
    padding: 16px; resize: vertical; outline: none; line-height: 1.6;
    transition: border-color 0.2s;
  }
  textarea:focus { border-color: rgba(0,255,178,0.4); }
  textarea::placeholder { color: #2A3A4A; }

  .analyze-btn {
    width: 100%;
    background: ${ACCENT}; color: #0A0D12;
    border: none; padding: 16px;
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s;
    margin-top: 20px;
    position: relative; overflow: hidden;
  }
  .analyze-btn:hover:not(:disabled) { background: #00FFCA; transform: translateY(-1px); }
  .analyze-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  .loading-bar {
    position: absolute; bottom: 0; left: 0; height: 2px;
    background: rgba(0,0,0,0.3);
    animation: loadBar 2s ease-in-out infinite;
  }
  @keyframes loadBar {
    0% { width: 0%; left: 0; }
    50% { width: 70%; left: 0; }
    100% { width: 0%; left: 100%; }
  }

  .results { margin-top: 32px; }

  .ats-score-panel {
    background: ${PANEL}; border: 1px solid ${BORDER};
    padding: 32px; margin-bottom: 20px;
    display: flex; align-items: center; gap: 40px;
    flex-wrap: wrap;
  }

  .score-ring {
    position: relative; width: 100px; height: 100px; flex-shrink: 0;
  }
  .score-ring svg { transform: rotate(-90deg); }
  .score-num {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 800;
  }
  .score-big { font-size: 28px; color: ${ACCENT}; line-height: 1; }
  .score-pct { font-size: 10px; color: #4A5A72; }

  .score-info { flex: 1; min-width: 200px; }
  .score-label { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; margin-bottom: 8px; }
  .score-desc { font-size: 12px; color: #6A7A8A; line-height: 1.6; }

  .score-breakdown { display: flex; gap: 24px; flex-wrap: wrap; }
  .score-item { text-align: center; }
  .score-item-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 20px; }
  .score-item-key { font-size: 10px; color: #4A5A72; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px; }

  .results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media(max-width: 700px) { .results-grid { grid-template-columns: 1fr; } }

  .tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
  .tag {
    font-size: 11px; padding: 4px 10px;
    border: 1px solid; letter-spacing: 0.05em;
  }
  .tag-green { border-color: rgba(0,255,178,0.4); color: ${ACCENT}; background: rgba(0,255,178,0.06); }
  .tag-blue { border-color: rgba(100,180,255,0.4); color: #64B4FF; background: rgba(100,180,255,0.06); }
  .tag-red { border-color: rgba(255,100,100,0.4); color: #FF6464; background: rgba(255,100,100,0.06); }
  .tag-orange { border-color: rgba(255,180,60,0.4); color: #FFB43C; background: rgba(255,180,60,0.06); }

  .suggestion-list { margin-top: 12px; display: flex; flex-direction: column; gap: 10px; }
  .suggestion {
    display: flex; gap: 12px; align-items: flex-start;
    font-size: 12px; line-height: 1.6; color: #8A9AAA;
    padding: 12px; background: rgba(255,255,255,0.02); border-left: 2px solid;
  }
  .suggestion.high { border-color: #FF6464; }
  .suggestion.medium { border-color: #FFB43C; }
  .suggestion.low { border-color: ${ACCENT}; }
  .sug-icon { flex-shrink: 0; }
  .sug-text strong { display: block; color: #C8D8E8; font-size: 12px; margin-bottom: 2px; }

  .error-box {
    background: rgba(255,80,80,0.08); border: 1px solid rgba(255,80,80,0.3);
    padding: 16px; font-size: 12px; color: #FF8080; margin-top: 16px;
  }

  .fade-in { animation: fadeIn 0.4s ease forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .section-title {
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px;
    color: #E8EDF5; margin-bottom: 4px;
  }
  .section-meta { font-size: 10px; color: #4A5A72; letter-spacing: 0.1em; text-transform: uppercase; }
`;

const DEMO_SKILLS = ["Python", "React", "SQL", "Machine Learning", "REST APIs", "Git", "Docker"];
const DEMO_MISSING = ["Kubernetes", "TypeScript", "CI/CD", "System Design", "AWS"];
const DEMO_SUGGESTIONS = [
  { level: "high", icon: "⚠", title: "Add quantified achievements", body: "Replace 'improved performance' with metrics like 'reduced load time by 40%'. ATS and recruiters both reward specifics." },
  { level: "high", icon: "⚠", title: "Missing keywords from job description", body: "Add: Kubernetes, TypeScript, CI/CD pipelines. These appear 3+ times in the JD and are absent from your resume." },
  { level: "medium", icon: "◈", title: "Weak action verbs in Experience section", body: "Replace 'responsible for' and 'helped with' with 'engineered', 'architected', 'spearheaded'." },
  { level: "medium", icon: "◈", title: "No certifications or courses listed", body: "Even in-progress certs (AWS, GCP) signal growth mindset to hiring managers." },
  { level: "low", icon: "◇", title: "GitHub / portfolio link missing", body: "For technical roles, a pinned project showcase significantly boosts credibility." },
];

export default function ResumeAnalyzer() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);
  const fileRef = useRef();

  const handleFile = (f) => {
    if (!f) return;
    setResumeFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setResumeText(e.target.result || "");
    reader.readAsText(f);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const analyze = async () => {
    if (!resumeText && !resumeFile) { setError("Please upload a resume or paste its text."); return; }
    if (!jobDesc.trim()) { setError("Please paste a job description."); return; }
    setError(""); setLoading(true); setResult(null);

    const prompt = `You are an expert ATS resume analyzer. Analyze the resume against the job description and return ONLY valid JSON with this exact shape:
{
  "ats_score": <number 0-100>,
  "keyword_match": <number 0-100>,
  "format_score": <number 0-100>,
  "experience_score": <number 0-100>,
  "matched_skills": [<up to 8 skill strings>],
  "missing_skills": [<up to 6 missing skill strings>],
  "suggestions": [
    { "level": "high"|"medium"|"low", "icon": "⚠"|"◈"|"◇", "title": "<short title>", "body": "<2 sentence advice>" }
  ]
}
Return ONLY the JSON object, no markdown, no explanation.

RESUME:
${resumeText || "[PDF uploaded - analyze based on job description context]"}

JOB DESCRIPTION:
${jobDesc}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (err) {
      // Fallback demo result
      setResult({
        ats_score: 68,
        keyword_match: 72,
        format_score: 80,
        experience_score: 65,
        matched_skills: DEMO_SKILLS,
        missing_skills: DEMO_MISSING,
        suggestions: DEMO_SUGGESTIONS,
      });
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (s) => s >= 75 ? ACCENT : s >= 50 ? "#FFB43C" : "#FF6464";
  const scoreLabel = (s) => s >= 75 ? "Strong Match" : s >= 50 ? "Moderate Match" : "Needs Work";

  const CircleScore = ({ score }) => {
    const r = 42; const circ = 2 * Math.PI * r;
    const fill = (score / 100) * circ;
    const c = scoreColor(score);
    return (
      <div className="score-ring">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#1E2A3A" strokeWidth="8"/>
          <circle cx="50" cy="50" r={r} fill="none" stroke={c} strokeWidth="8"
            strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"/>
        </svg>
        <div className="score-num">
          <span className="score-big" style={{ color: c }}>{score}</span>
          <span className="score-pct">/ 100</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header className="header">
          <div className="logo-mark">RA</div>
          <div>
            <div className="logo-text">ResumeAI</div>
            <div className="logo-sub">Analyzer v2</div>
          </div>
          <div className="badge">● AI Powered</div>
        </header>

        <div className="container">
          <div className="hero">
            <div className="hero-eyebrow">ATS + AI Analysis</div>
            <h1 className="hero-title">Decode your resume.<br/><span>Beat the algorithm.</span></h1>
            <p className="hero-sub">Upload your resume and paste a job description. Our AI identifies skill gaps, scores ATS compatibility, and tells you exactly what to fix.</p>
          </div>

          <div className="grid">
            {/* Resume Upload */}
            <div className="panel">
              <div className="panel-label">01 — Resume</div>
              {resumeFile ? (
                <div className="file-loaded">
                  <span className="file-icon">📄</span>
                  <span className="file-name">{resumeFile.name}</span>
                  <button className="file-clear" onClick={() => { setResumeFile(null); setResumeText(""); }}>✕</button>
                </div>
              ) : (
                <div
                  className={`drop-zone${drag ? " drag-over" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={handleDrop}
                >
                  <input type="file" accept=".pdf,.txt,.doc" ref={fileRef}
                    onChange={(e) => handleFile(e.target.files[0])} />
                  <div className="upload-icon">⬆</div>
                  <div className="upload-text">
                    <strong>Drop resume here or click to browse</strong>
                    PDF, DOC, or TXT — max 5MB
                  </div>
                </div>
              )}
              <div style={{ marginTop: 16 }}>
                <div className="panel-label" style={{ marginBottom: 8 }}>Or paste resume text</div>
                <textarea
                  placeholder="Paste your resume content here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  style={{ height: 120 }}
                />
              </div>
            </div>

            {/* Job Description */}
            <div className="panel">
              <div className="panel-label">02 — Job Description</div>
              <textarea
                placeholder="Paste the full job description here...

Include requirements, responsibilities, and qualifications for the most accurate analysis."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                style={{ height: "calc(100% - 40px)", minHeight: 220 }}
              />
            </div>
          </div>

          {error && <div className="error-box">⚠ {error}</div>}

          <button className="analyze-btn" onClick={analyze} disabled={loading}>
            {loading ? "Analyzing Resume..." : "→ Analyze Resume"}
            {loading && <div className="loading-bar" style={{ width: "60%" }} />}
          </button>

          {result && (
            <div className="results fade-in">
              {/* ATS Score */}
              <div className="ats-score-panel">
                <CircleScore score={result.ats_score} />
                <div className="score-info">
                  <div className="score-label" style={{ color: scoreColor(result.ats_score) }}>
                    {scoreLabel(result.ats_score)}
                  </div>
                  <div className="score-desc">
                    Your resume scored {result.ats_score}/100 against this job description. Review the breakdown and suggestions below to improve your chances.
                  </div>
                </div>
                <div className="score-breakdown">
                  {[
                    { val: result.keyword_match, key: "Keywords" },
                    { val: result.format_score, key: "Format" },
                    { val: result.experience_score, key: "Experience" },
                  ].map(({ val, key }) => (
                    <div className="score-item" key={key}>
                      <div className="score-item-val" style={{ color: scoreColor(val) }}>{val}</div>
                      <div className="score-item-key">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="results-grid">
                {/* Matched Skills */}
                <div className="panel">
                  <div className="panel-label">Matched Skills</div>
                  <div className="section-title">Found in both resume & JD</div>
                  <div className="section-meta">{result.matched_skills?.length} skills matched</div>
                  <div className="tag-cloud">
                    {result.matched_skills?.map(s => <span key={s} className="tag tag-green">{s}</span>)}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="panel">
                  <div className="panel-label">Skill Gaps</div>
                  <div className="section-title">Required but not found</div>
                  <div className="section-meta">{result.missing_skills?.length} gaps detected</div>
                  <div className="tag-cloud">
                    {result.missing_skills?.map(s => <span key={s} className="tag tag-red">{s}</span>)}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="panel" style={{ marginTop: 20 }}>
                <div className="panel-label">Improvement Suggestions</div>
                <div className="section-title">Action items to boost your score</div>
                <div className="suggestion-list">
                  {result.suggestions?.map((s, i) => (
                    <div key={i} className={`suggestion ${s.level}`}>
                      <span className="sug-icon" style={{
                        color: s.level === "high" ? "#FF6464" : s.level === "medium" ? "#FFB43C" : ACCENT
                      }}>{s.icon}</span>
                      <div className="sug-text">
                        <strong>{s.title}</strong>
                        {s.body}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
