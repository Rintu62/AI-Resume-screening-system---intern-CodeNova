import React, { useState } from 'react';

export default function Auth({ mode, onClose, onLoginSuccess }) {
  const [currentMode, setCurrentMode] = useState(mode); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (currentMode === 'register' && !fullName)) {
      setError('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('ats_users') || '[]');

    if (currentMode === 'register') {
      const userExists = users.some(u => u.email === email);
      if (userExists) {
        setError('An account with this email already exists.');
        return;
      }

      const newUser = { email, password, name: fullName };
      users.push(newUser);
      localStorage.setItem('ats_users', JSON.stringify(users));
      localStorage.setItem('ats_logged_in_user', JSON.stringify({ email, name: fullName }));
      onLoginSuccess({ email, name: fullName });
      onClose();
    } else {
      // login mode
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        // Support default mock account for easy testing
        if (email === 'demo@example.com' && password === 'demo123') {
          const demoUser = { email: 'demo@example.com', name: 'Demo User' };
          localStorage.setItem('ats_logged_in_user', JSON.stringify(demoUser));
          onLoginSuccess(demoUser);
          onClose();
          return;
        }
        setError('Invalid email or password.');
        return;
      }

      localStorage.setItem('ats_logged_in_user', JSON.stringify({ email: user.email, name: user.name }));
      onLoginSuccess({ email: user.email, name: user.name });
      onClose();
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>
          &times;
        </button>
        <div className="auth-header">
          <h2 className="auth-title">
            {currentMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="auth-subtitle">
            {currentMode === 'login'
              ? 'Enter your credentials to access the ATS scanner.'
              : 'Sign up to start scanning and optimizing resumes.'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {currentMode === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Rigu"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="e.g. email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          {currentMode === 'login' && (
            <div style={{ textSelf: 'flex-start', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '-0.5rem' }}>
              💡 Quick test: Use <strong>demo@example.com</strong> / <strong>demo123</strong>
            </div>
          )}

          <button type="submit" className="btn btn-primary auth-btn">
            {currentMode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          {currentMode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <span className="auth-link text-primary" onClick={() => { setError(''); setCurrentMode('register'); }}>
                Create one
              </span>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <span className="auth-link text-primary" onClick={() => { setError(''); setCurrentMode('login'); }}>
                Log in
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
