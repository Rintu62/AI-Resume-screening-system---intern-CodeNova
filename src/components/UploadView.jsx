import React, { useState, useRef } from 'react';
import { mockProfiles } from '../mockData';

export default function UploadView({ onStartScan }) {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'text'
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setSelectedProfileId(null); // Clear predefined profile for custom file
      // Make some mock resume text based on filename
      setResumeText(`Mock resume parsed from ${file.name}.\nSkills: Product, Mobile, Product management, JavaScript.`);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedProfileId(null);
      setResumeText(`Mock resume parsed from ${file.name}.\nSkills: Product, Mobile, Product management, JavaScript.`);
    }
  };

  const selectSampleProfile = (profileId) => {
    const profile = mockProfiles[profileId];
    if (profile) {
      setJobDescription(profile.jobDescription);
      setResumeText(profile.resumeText || '');
      setSelectedFile({ name: profile.resumeFileName, size: 45000 });
      setSelectedProfileId(profileId);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobDescription) {
      alert('Please enter a job description.');
      return;
    }
    if (uploadMode === 'file' && !selectedFile) {
      alert('Please upload a resume file.');
      return;
    }
    if (uploadMode === 'text' && !resumeText) {
      alert('Please paste your resume text.');
      return;
    }

    // Pass data back
    onStartScan({
      profileId: selectedProfileId, // Will be 'pm', 'engineer', or null (custom)
      jobDescription,
      resumeText: uploadMode === 'text' ? resumeText : (resumeText || 'Sample Resume'),
      fileName: uploadMode === 'file' ? (selectedFile ? selectedFile.name : 'resume.pdf') : 'pasted_resume.pdf'
    });
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h2 className="upload-title">Scan Your Resume</h2>
        <p className="upload-subtitle">Compare your resume against any job description to discover matching keywords and score optimizations.</p>
      </div>

      <form className="scanner-form" onSubmit={handleSubmit}>
        <div className="job-desc-section">
          <label className="form-label" htmlFor="jd-textarea">Job Description</label>
          <textarea
            id="jd-textarea"
            className="job-desc-textarea"
            placeholder="Paste the job requirements or job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div className="job-desc-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label className="form-label" style={{ margin: 0 }}>Resume Input</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                className={`btn btn-secondary ${uploadMode === 'file' ? 'btn-primary' : ''}`}
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', borderRadius: '4px' }}
                onClick={() => setUploadMode('file')}
              >
                📁 Upload File
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${uploadMode === 'text' ? 'btn-primary' : ''}`}
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', borderRadius: '4px' }}
                onClick={() => setUploadMode('text')}
              >
                📝 Paste Text
              </button>
            </div>
          </div>

          {uploadMode === 'file' ? (
            <div
              className={`dropzone ${isDragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
              />
              <div className="dropzone-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div className="dropzone-text">Drag and drop your resume file here</div>
              <div className="dropzone-hint">or click to browse files (PDF, DOCX)</div>
            </div>
          ) : (
            <textarea
              className="job-desc-textarea"
              placeholder="Paste your resume text here (e.g. skills, experience, education, contact info)..."
              value={resumeText}
              onChange={(e) => {
                setResumeText(e.target.value);
                setSelectedProfileId(null);
              }}
              style={{ minHeight: '180px' }}
            />
          )}

          {uploadMode === 'file' && selectedFile && (
            <div style={{ textAlign: 'left', marginTop: '0.5rem' }}>
              <div className="selected-file-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{selectedFile.name}</span>
                <button
                  type="button"
                  className="selected-file-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setSelectedProfileId(null);
                    setResumeText('');
                  }}
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="samples-wrapper">
          <div className="samples-label">💡 Test quickly with a sample profile:</div>
          <div className="samples-list">
            <button
              type="button"
              className="sample-chip"
              onClick={() => {
                setUploadMode('file');
                selectSampleProfile('pm');
              }}
            >
               Senior Product Manager (Aesthetics exactly as screenshot - Score 72%)
            </button>
            <button
              type="button"
              className="sample-chip"
              onClick={() => {
                setUploadMode('file');
                selectSampleProfile('engineer');
              }}
            >
               Mobile Software Engineer (High match - Score 85%)
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary scan-submit-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Scan & Analyze Resume
        </button>
      </form>
    </div>
  );
}
