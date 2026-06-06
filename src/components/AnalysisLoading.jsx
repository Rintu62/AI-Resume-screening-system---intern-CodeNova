import React, { useState, useEffect } from 'react';

const STEPS = [
  { label: "Reading resume file content...", minPct: 0, maxPct: 15 },
  { label: "Extracting contact info & education details...", minPct: 16, maxPct: 35 },
  { label: "Checking resume layout, fonts & margins...", minPct: 36, maxPct: 55 },
  { label: "Running soft skills matching...", minPct: 56, maxPct: 70 },
  { label: "Running hard skills alignment checks...", minPct: 71, maxPct: 85 },
  { label: "Formatting recruiter guidelines & warnings...", minPct: 86, maxPct: 95 },
  { label: "Calculating overall ATS score...", minPct: 96, maxPct: 100 }
];

export default function AnalysisLoading({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        // Increment progress speed dynamically
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  const getStepStatus = (step) => {
    if (progress > step.maxPct) return 'done';
    if (progress >= step.minPct && progress <= step.maxPct) return 'active';
    return 'pending';
  };

  return (
    <div className="loading-view">
      <div className="loading-spinner-wrapper">
        <div className="loading-spinner"></div>
      </div>
      
      <h2 className="loading-title-status">
        Analyzing Resume... <span className="loading-percentage">{progress}%</span>
      </h2>
      
      <div className="loading-progress-bar-bg">
        <div className="loading-progress-bar-fg" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="loading-steps-list">
        {STEPS.map((step, idx) => {
          const status = getStepStatus(step);
          return (
            <div key={idx} className={`loading-step-item ${status}`}>
              <span className="loading-step-icon">
                {status === 'done' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-success">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {status === 'active' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary" style={{ animation: 'spin 1s linear infinite' }}>
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                  </svg>
                )}
                {status === 'pending' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted" style={{ opacity: 0.4 }}>
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
              </span>
              <span>{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
