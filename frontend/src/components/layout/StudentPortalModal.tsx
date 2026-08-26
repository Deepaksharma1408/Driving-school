import React, { useState } from 'react';
import { X, Lock, User, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({ isOpen, onClose }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="portal-overlay">
      <div className="portal-dialog aura-card">
        <button className="portal-close" onClick={onClose} aria-label="Close portal">
          <X size={20} />
        </button>

        <div className="portal-header">
          <div className="portal-icon-box">
            <ShieldCheck size={26} />
          </div>
          <span className="pill-badge">STUDENT ACCESS</span>
          <h3 className="portal-title">Client & Student Portal</h3>
          <p className="portal-desc">
            View upcoming driving lesson schedules, download test route checklists, and track logbook progress.
          </p>
        </div>

        {submitted ? (
          <div className="portal-success">
            <CheckCircle2 size={48} className="success-icon" />
            <h4>Portal Demo Mode</h4>
            <p>Authentication backend connection placeholder. In the live production version, students can view their upcoming lesson schedule here.</p>
            <Button variant="primary" onClick={() => { setSubmitted(false); onClose(); }} className="w-full">
              Back to Website
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="portal-form">
            <div className="form-group">
              <label className="form-label">Student ID or Email</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. STU-9482 or your email"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Access Code / Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="portal-help-row">
              <label className="remember-check">
                <input type="checkbox" defaultChecked />
                <span>Remember this device</span>
              </label>
              <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Please message your instructor to reset your student access PIN.'); }} className="forgot-link">
                Forgot PIN?
              </a>
            </div>

            <Button type="submit" variant="dark" size="lg" className="w-full">
              LOG IN TO STUDENT PANEL
            </Button>

            <p className="portal-footer-note">
              New student? You will receive login credentials automatically after your first booking confirmation.
            </p>
          </form>
        )}
      </div>

      <style>{`
        .portal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(17, 24, 32, 0.65);
          backdrop-filter: blur(6px);
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.2s ease;
        }
        .portal-dialog {
          width: 100%;
          max-width: 460px;
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          position: relative;
          box-shadow: var(--shadow-xl);
          animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .portal-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-surface-alt);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }
        .portal-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 1.75rem;
        }
        .portal-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: var(--accent-subtle);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .portal-title {
          font-size: 1.4rem;
          font-weight: 800;
          margin-top: 0.5rem;
          margin-bottom: 0.35rem;
          color: var(--text-primary);
        }
        .portal-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .input-with-icon {
          position: relative;
        }
        .input-with-icon .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .input-with-icon .form-input {
          padding-left: 2.75rem;
        }
        .portal-help-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          margin-bottom: 1.5rem;
        }
        .remember-check {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .forgot-link {
          color: var(--text-primary);
          font-weight: 700;
        }
        .portal-footer-note {
          font-size: 0.775rem;
          color: var(--text-muted);
          text-align: center;
          margin-top: 1.25rem;
          line-height: 1.4;
        }
        .portal-success {
          text-align: center;
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .success-icon {
          color: var(--brand-success);
        }
        .portal-success h4 {
          font-size: 1.25rem;
          font-weight: 800;
        }
        .portal-success p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .w-full {
          width: 100%;
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
