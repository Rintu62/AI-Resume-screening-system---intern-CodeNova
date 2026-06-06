import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import UploadView from './components/UploadView';
import AnalysisLoading from './components/AnalysisLoading';
import Dashboard from './components/Dashboard';
import { analyzeResume } from './utils/analyzer';
import { mockProfiles } from './mockData';

export default function App() {
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'register' | null
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'upload' | 'loading' | 'dashboard'
  const [activeProfile, setActiveProfile] = useState(null);

  // Check login session on mount
  useEffect(() => {
    const loggedUser = localStorage.getItem('ats_logged_in_user');
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      setUser(parsedUser);
      setCurrentView('upload');
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('upload');
  };

  const handleLogout = () => {
    localStorage.removeItem('ats_logged_in_user');
    setUser(null);
    setCurrentView('landing');
  };

  const handleStartScan = (scanInput) => {
    const { profileId, jobDescription, resumeText, fileName } = scanInput;
    
    let profileData;
    if (profileId && mockProfiles[profileId]) {
      // Use predefined high-fidelity profile
      profileData = mockProfiles[profileId];
    } else {
      // Calculate dynamic scores & matching keywords
      profileData = analyzeResume(jobDescription, resumeText, fileName);
    }
    
    setActiveProfile(profileData);
    setCurrentView('loading');
  };

  const handleScanComplete = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="app-container">
      {currentView === 'landing' && (
        <LandingPage onOpenAuth={(mode) => setAuthModal(mode)} />
      )}

      {currentView === 'upload' && (
        <UploadView 
          onStartScan={handleStartScan} 
        />
      )}

      {currentView === 'loading' && (
        <AnalysisLoading onComplete={handleScanComplete} />
      )}

      {currentView === 'dashboard' && activeProfile && (
        <Dashboard 
          profile={activeProfile}
          user={user}
          onNewUpload={() => setCurrentView('upload')}
          onLogout={handleLogout}
        />
      )}

      {authModal && (
        <Auth 
          mode={authModal} 
          onClose={() => setAuthModal(null)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
