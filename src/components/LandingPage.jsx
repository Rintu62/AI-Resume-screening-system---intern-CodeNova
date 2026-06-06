import React from 'react';

export default function LandingPage({ onOpenAuth }) {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary" style={{ marginRight: '4px' }}>
            {/* <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /> */}
            {/* <polyline points="14 2 14 8 20 8" /> */}
            {/* <path d="M12 18v-6" />
            <path d="m9 15 3-3 3 3" /> */}
          </svg>
          Smart Resume Screening-<span>ATS</span>
        </div>
        <p className="landing-tagline">Optimize your resume for Applicant Tracking Systems and get more interviews.</p>
      </header>

      <div className="landing-hero">
        <div className="landing-info">
          <h1 className="landing-title">
            Beat the bots. <br />
            <span>Land the interview.</span>
          </h1>
          <p className="landing-description">
            Upload your resume alongside any job description. SmartATS instantly analyzes your keywords, formatting, soft & hard skills, and gives you actionable recruiter insights to double your response rate.
          </p>
          <div className="landing-ctas">
            <button className="btn btn-primary" onClick={() => onOpenAuth('register')}>
              Get Started for Free
            </button>
            <button className="btn btn-secondary" onClick={() => onOpenAuth('login')}>
              Log In
            </button>
          </div>
        </div>

        <div className="landing-preview">
          <div style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)', textAlign: 'left', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span> ATS Analysis Dashboard</span>
            <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--success-bg)', color: 'var(--success)', padding: '2px 8px', borderRadius: '10px' }}>Match Score: 72%</span>
          </div>
          <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <strong>Formatting Check</strong>
              <span style={{ color: 'var(--success)' }}>✓ Passed (12/12)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <strong>Soft Skills Matching</strong>
              <span style={{ color: 'var(--warning)' }}>⚠ 3 Skills Missing</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <strong>Hard Skills Matching</strong>
              <span style={{ color: 'var(--success)' }}>✓ High Match (4/5)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Recruiter Recommendations</strong>
              <span style={{ color: 'var(--error)' }}>✗ 2 Warnings</span>
            </div>
          </div>
        </div>
      </div>

      <section className="features-section">
        <h2 className="features-title">Features Built to Optimize Your Resume</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="7" y1="21" x2="7" y2="3" />
                <line x1="17" y1="21" x2="17" y2="3" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
              </svg>
            </div>
            <h3 className="feature-name">Formatting Audit</h3>
            <p className="feature-text">
              Checks your font usage, layout alignment, margins, headers, and footers to ensure the ATS parses your details accurately without breaking.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <h3 className="feature-name">Skills Gap Analysis</h3>
            <p className="feature-text">
              Directly compares the soft and hard skills found on your resume against the job description, showing frequency counts and missing competencies.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className="feature-name">Recruiter Tips</h3>
            <p className="feature-text">
              Get warnings regarding experience mismatches, overly long paragraphs, negative clichés, and missing URLs, helping you structure your content like a top candidate.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
