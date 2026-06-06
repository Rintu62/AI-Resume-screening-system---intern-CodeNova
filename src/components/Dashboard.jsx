import React, { useState, useEffect } from 'react';

const GreenCheckCircle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" strokeWidth="2" />
    <path d="M8 12.5L10.5 15L16 9.5" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RedCrossCircle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" fill="rgba(239, 68, 68, 0.08)" stroke="#ef4444" strokeWidth="2" />
    <path d="M15 9L9 15M9 9L15 15" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RedCrossSmall = () => (
  <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.25rem', lineHeight: '1', display: 'inline-block' }}>✕</span>
);

const YellowWarningTriangle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M12 3L2 20H22L12 3Z" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />
    <line x1="12" y1="9" x2="12" y2="13" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="#f59e0b" />
  </svg>
);

const TooltipIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', opacity: 0.7 }}>
    <circle cx="12" cy="12" r="9" fill="rgba(148, 163, 184, 0.2)" stroke="#94a3b8" strokeWidth="1.5" />
    <text x="12" y="16" fill="currentColor" fontSize="12" fontWeight="700" textAnchor="middle">?</text>
  </svg>
);

export default function Dashboard({ profile, user, onNewUpload, onLogout }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [theme, setTheme] = useState('light');
  const [skillsSubtab, setSkillsSubtab] = useState('comparison');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleCopyAll = (skills) => {
    const text = skills.map(s => s.name).join(', ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (profile.score / 100) * circumference;

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M12 18v-6" />
              <path d="m9 15 3-3 3 3" />
            </svg>
            Smart<span>ATS</span>
          </div>

          <ul className="sidebar-menu">
            <li className={`sidebar-item ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>
             Summary
            </li>
            <li className={`sidebar-item ${activeTab === 'formatting' ? 'active' : ''}`} onClick={() => setActiveTab('formatting')}>
               Formatting
            </li>
            <li className={`sidebar-item ${activeTab === 'soft' ? 'active' : ''}`} onClick={() => setActiveTab('soft')}>
               Soft Skills
            </li>
            <li className={`sidebar-item ${activeTab === 'hard' ? 'active' : ''}`} onClick={() => setActiveTab('hard')}>
               Hard Skills
            </li>
            <li className={`sidebar-item ${activeTab === 'recruiter' ? 'active' : ''}`} onClick={() => setActiveTab('recruiter')}>
               Recruiter Tips
            </li>
            <li className={`sidebar-item ${activeTab === 'ats' ? 'active' : ''}`} onClick={() => setActiveTab('ats')}>
               ATS Checks
            </li>
          </ul>
        </div>

        <div className="sidebar-bottom">
          <div className="user-profile-badge">
            <div className="user-avatar">
              {user ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div className="user-info">
              <span className="user-name">{user ? user.name : 'User'}</span>
              <span className="user-role">Candidate</span>
            </div>
          </div>

          <button className="sidebar-action-btn" onClick={onLogout}>
             Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div className="dash-header-title-wrap">
            <h1 className="dash-title">{profile.name} Scan</h1>
            <p className="dash-subtitle">Resume: <strong>{profile.resumeFileName}</strong></p>
          </div>

          <div className="dash-header-actions">
            <button className="btn btn-secondary" onClick={onNewUpload}>
              Scan New Resume
            </button>
            <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Light/Dark Theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>

        {/* 1. Summary View */}
        {activeTab === 'summary' && (
          <div>
            <div className="score-summary-grid">
              <div className="score-radial-card">
                <div className="radial-progress-svg">
                  <svg width="180" height="180">
                    <circle className="radial-ring-bg" cx="90" cy="90" r={radius} />
                    <circle 
                      className="radial-ring-fg" 
                      cx="90" 
                      cy="90" 
                      r={radius} 
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      style={{ stroke: profile.score >= 80 ? 'var(--success)' : 'var(--primary)' }}
                    />
                  </svg>
                  <div className="radial-text">
                    <div className="radial-score-num">{profile.score}</div>
                    <div className="radial-score-max">/100</div>
                  </div>
                </div>
                <h3 className="score-radial-title">ATS score</h3>
                <span className={`score-radial-status ${profile.score >= 80 ? 'success' : 'warning'}`}>
                  {profile.status}
                </span>
              </div>

              {/* Score Breakdown Bars */}
              <div className="summary-details-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-heading)' }}>Match Score Breakdown</h3>
                
                {profile.scoreBreakdown && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: '600' }}>
                        <span>Keywords Match (Hard & Soft Skills)</span>
                        <span>{profile.scoreBreakdown.keywords.score} / {profile.scoreBreakdown.keywords.max}</span>
                      </div>
                      <div style={{ height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', backgroundColor: 'var(--primary)', width: `${(profile.scoreBreakdown.keywords.score / profile.scoreBreakdown.keywords.max) * 100}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: '600' }}>
                        <span>Formatting & Layout rules</span>
                        <span>{profile.scoreBreakdown.formatting.score} / {profile.scoreBreakdown.formatting.max}</span>
                      </div>
                      <div style={{ height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', backgroundColor: 'var(--success)', width: `${(profile.scoreBreakdown.formatting.score / profile.scoreBreakdown.formatting.max) * 100}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: '600' }}>
                        <span>ATS Technical checks</span>
                        <span>{profile.scoreBreakdown.atsChecks.score} / {profile.scoreBreakdown.atsChecks.max}</span>
                      </div>
                      <div style={{ height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', backgroundColor: profile.scoreBreakdown.atsChecks.score >= 20 ? 'var(--success)' : 'var(--warning)', width: `${(profile.scoreBreakdown.atsChecks.score / profile.scoreBreakdown.atsChecks.max) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendations improvement list */}
            {profile.recommendations && (
              <div className="summary-details-card" style={{ marginTop: '1.5rem' }}>
                <h3 className="summary-details-title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🛠 How to Improve Your Score
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  {profile.recommendations.map((rec, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      <span style={{ color: 'var(--warning)', fontWeight: 'bold' }}>•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 2. Formatting View */}
        {activeTab === 'formatting' && (
          <div>
            <div className="tab-section-header">
              <h2 className="tab-section-title">Formatting</h2>
              <p className="tab-section-desc">Verify that structural components comply with recruitment parsing rules.</p>
            </div>

            <div className="formatting-grid">
              <div className="formatting-card-row">
                <div className="formatting-row-title-wrap">
                  <span className="formatting-row-title">Font Check</span>
                  <button className="formatting-row-icon-btn"><TooltipIcon /></button>
                </div>
                <ul className="formatting-checklist">
                  {profile.formatting.fontCheck.map((check, idx) => (
                    <li key={idx} className="formatting-check-item">
                      <span className="formatting-check-icon"><GreenCheckCircle /></span>
                      <span>{check.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="formatting-card-row">
                <div className="formatting-row-title-wrap">
                  <span className="formatting-row-title">Layout</span>
                  <button className="formatting-row-icon-btn"><TooltipIcon /></button>
                </div>
                <ul className="formatting-checklist">
                  {profile.formatting.layout.map((check, idx) => (
                    <li key={idx} className="formatting-check-item">
                      <span className="formatting-check-icon"><GreenCheckCircle /></span>
                      <span>{check.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="formatting-card-row">
                <div className="formatting-row-title-wrap">
                  <span className="formatting-row-title">Page Setup</span>
                  <button className="formatting-row-icon-btn"><TooltipIcon /></button>
                </div>
                <ul className="formatting-checklist">
                  {profile.formatting.pageSetup.map((check, idx) => (
                    <li key={idx} className="formatting-check-item">
                      <span className="formatting-check-icon"><GreenCheckCircle /></span>
                      <span>{check.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 3. Soft Skills View */}
        {activeTab === 'soft' && (
          <div>
            <div className="tab-section-header" style={{ marginBottom: '1.5rem' }}>
              <h2 className="tab-section-title">
                Soft skills <span className="badge badge-medium">Medium Score Impact</span>
              </h2>
              <p className="tab-section-desc" style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
                Soft skills are your traits and abilities that are not unique to any job. Your soft skills are part of your personality, and can be learned also. These skills are the traits that typically make you a good employee for any company such as time management and communication. Soft skills have a medium impact on your match score.
              </p>
            </div>

            <div className="inner-section-tip">
              <span>💡</span>
              <div>
                <strong>Tip:</strong> Prioritize hard skills in your resume to get interviews, and then showcase your soft skills in the interview to get jobs.
              </div>
            </div>

            {/* Keyword pills matching summaries */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="summary-details-card" style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--success)', fontWeight: '700' }}>✓ Matched Soft Keywords</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {profile.matchedSoft && profile.matchedSoft.length > 0 ? (
                    profile.matchedSoft.map((s, i) => (
                      <span key={i} style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '4px', backgroundColor: 'var(--success-bg)', color: 'var(--success)', fontWeight: '600' }}>{s}</span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No matched soft skills.</span>
                  )}
                </div>
              </div>

              <div className="summary-details-card" style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--error)', fontWeight: '700' }}>✗ Missing Soft Keywords</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {profile.missingSoft && profile.missingSoft.length > 0 ? (
                    profile.missingSoft.map((s, i) => (
                      <span key={i} style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '4px', border: '1px dashed var(--error)', color: 'var(--error)', fontWeight: '600' }}>{s}</span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--success)' }}>All soft skills keywords present!</span>
                  )}
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="skills-tab-headers">
                <button 
                  className={`skills-tab-btn ${skillsSubtab === 'comparison' ? 'active' : ''}`}
                  onClick={() => setSkillsSubtab('comparison')}
                >
                  Skills Comparison
                </button>
                <button 
                  className={`skills-tab-btn ${skillsSubtab === 'highlighted' ? 'active' : ''}`}
                  onClick={() => setSkillsSubtab('highlighted')}
                >
                  Highlighted Skills
                </button>
              </div>

              <div className="skills-pane-content">
                {skillsSubtab === 'comparison' ? (
                  <div className="skills-table-wrapper">
                    <table className="skills-table">
                      <thead>
                        <tr>
                          <th>
                            Skill 
                            <button 
                              className="btn btn-secondary btn-copy-all" 
                              style={{ marginLeft: '1rem' }}
                              onClick={() => handleCopyAll(profile.softSkills)}
                            >
                               {copied ? 'Copied!' : 'Copy All'}
                            </button>
                          </th>
                          <th>Resume</th>
                          <th>Job Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profile.softSkills.map((skill, idx) => (
                          <tr key={idx}>
                            <td style={{ fontWeight: '500' }}>{skill.name}</td>
                            <td>
                              {skill.resume === 'cross' ? (
                                <span className="check-cross-icon-wrap"><RedCrossSmall /></span>
                              ) : (
                                skill.resume
                              )}
                            </td>
                            <td style={{ color: 'var(--text-heading)', fontWeight: '600' }}>{skill.jd}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
                    <p style={{ marginBottom: '1rem' }}>Below are the primary soft skills we found in your job description that make an impact:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {profile.softSkills.map((s, i) => (
                        <span key={i} style={{ padding: '0.5rem 1rem', borderRadius: '8px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>
                          {s.name} ({s.jd}x)
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. Hard Skills View */}
        {activeTab === 'hard' && (
          <div>
            <div className="tab-section-header" style={{ marginBottom: '1.5rem' }}>
              <h2 className="tab-section-title">
                Hard skills <span className="badge badge-high">High Score Impact</span>
              </h2>
              <p className="tab-section-desc" style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
                Hard skills enable you to perform job-specific duties and responsibilities. You can learn hard skills in the classroom, training courses, and on the job. These skills are typically focused on teachable tasks and measurable abilities such as the use of tools, equipment, or software. Hard skills have a high impact on your match score.
              </p>
            </div>

            <div className="inner-section-tip">
              <span>💡</span>
              <div>
                <strong>Tip:</strong> Match the skills in your resume to the exact spelling in the job description. Prioritize skills that appear most frequently in the job description.
              </div>
            </div>

            {/* Keyword pills matching summaries */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="summary-details-card" style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--success)', fontWeight: '700' }}>✓ Matched Hard Keywords</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {profile.matchedHard && profile.matchedHard.length > 0 ? (
                    profile.matchedHard.map((s, i) => (
                      <span key={i} style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '4px', backgroundColor: 'var(--success-bg)', color: 'var(--success)', fontWeight: '600' }}>{s}</span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No matched hard skills.</span>
                  )}
                </div>
              </div>

              <div className="summary-details-card" style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--error)', fontWeight: '700' }}>✗ Missing Hard Keywords</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {profile.missingHard && profile.missingHard.length > 0 ? (
                    profile.missingHard.map((s, i) => (
                      <span key={i} style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '4px', border: '1px dashed var(--error)', color: 'var(--error)', fontWeight: '600' }}>{s}</span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--success)' }}>All hard skills keywords present!</span>
                  )}
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="skills-tab-headers">
                <button 
                  className={`skills-tab-btn ${skillsSubtab === 'comparison' ? 'active' : ''}`}
                  onClick={() => setSkillsSubtab('comparison')}
                >
                  Skills Comparison
                </button>
                <button 
                  className={`skills-tab-btn ${skillsSubtab === 'highlighted' ? 'active' : ''}`}
                  onClick={() => setSkillsSubtab('highlighted')}
                >
                  Highlighted Skills
                </button>
              </div>

              <div className="skills-pane-content">
                {skillsSubtab === 'comparison' ? (
                  <div className="skills-table-wrapper">
                    <table className="skills-table">
                      <thead>
                        <tr>
                          <th>
                            Skill 
                            <button 
                              className="btn btn-secondary btn-copy-all" 
                              style={{ marginLeft: '1rem' }}
                              onClick={() => handleCopyAll(profile.hardSkills)}
                            >
                              📋{copied ? 'Copied!' : 'Copy All'}
                            </button>
                          </th>
                          <th>Resume</th>
                          <th>Job Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profile.hardSkills.map((skill, idx) => (
                          <tr key={idx}>
                            <td style={{ fontWeight: '500' }}>{skill.name}</td>
                            <td>
                              {skill.resume === 'cross' ? (
                                <span className="check-cross-icon-wrap"><RedCrossSmall /></span>
                              ) : (
                                skill.resume
                              )}
                            </td>
                            <td style={{ color: 'var(--text-heading)', fontWeight: '600' }}>{skill.jd}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
                    <p style={{ marginBottom: '1rem' }}>Below are the primary hard skills we found in your job description that make an impact:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {profile.hardSkills.map((s, i) => (
                        <span key={i} style={{ padding: '0.5rem 1rem', borderRadius: '8px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>
                          {s.name} ({s.jd}x)
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 5. Recruiter Tips View */}
        {activeTab === 'recruiter' && (
          <div>
            <div className="tab-section-header">
              <h2 className="tab-section-title">
                Recruiter tips <span className="badge badge-important">Important</span>
              </h2>
              <p className="tab-section-desc">Key recommendations that human recruiters look for in high-ranking resumes.</p>
            </div>

            <div className="dashboard-card">
              <div className="recruiter-tips-list">
                {profile.recruiterTips.map((tip, idx) => (
                  <div key={idx} className="recruiter-tip-row">
                    <div className="recruiter-tip-meta">
                      <span className="recruiter-tip-name">{tip.title}</span>
                      <button className="formatting-row-icon-btn"><TooltipIcon /></button>
                    </div>

                    <div className="recruiter-tip-desc-wrap">
                      <span className="recruiter-tip-icon">
                        {tip.status === 'success' && <GreenCheckCircle />}
                        {tip.status === 'warning' && <YellowWarningTriangle />}
                        {tip.status === 'error' && <RedCrossCircle />}
                      </span>
                      <div className="recruiter-tip-content">
                        <p className="recruiter-tip-message">{tip.message}</p>
                        {tip.actionLabel && (
                          <a href="#" className="recruiter-tip-link" onClick={(e) => { e.preventDefault(); alert(`Executing action: ${tip.actionLabel}`); }}>
                            {tip.actionLabel}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. ATS Checks View */}
        {activeTab === 'ats' && (
          <div>
            <div className="tab-section-header">
              <h2 className="tab-section-title">ATS checks</h2>
              <p className="tab-section-desc">Detailed checklist showing whether critical resume components pass typical parser checks.</p>
            </div>

            <div className="ats-checklist-grid">
              {profile.atsChecks.map((section, idx) => (
                <div key={idx} className="ats-check-row">
                  <div className="ats-check-title-wrap">
                    <span className="ats-check-title">{section.title}</span>
                    <button className="ats-check-help-btn"><TooltipIcon /></button>
                  </div>

                  <ul className="ats-check-items-list">
                    {section.subchecks.map((subcheck, sIdx) => (
                      <li key={sIdx} className="ats-subcheck-item">
                        <span className="ats-subcheck-icon">
                          {subcheck.passed ? <GreenCheckCircle /> : <RedCrossCircle />}
                        </span>
                        <div className="ats-subcheck-details">
                          <p className="ats-subcheck-message">{subcheck.message}</p>
                          {subcheck.actionLabel && (
                            <a href="#" className="ats-subcheck-link" onClick={(e) => { e.preventDefault(); alert(`Executing: ${subcheck.actionLabel}`); }}>
                              {subcheck.actionLabel}
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
