import React, { useState, useEffect } from 'react';
import { 
  Gift, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Sparkles,
  Tag
} from 'lucide-react';
import { Button } from './Button';

export const ExitIntentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('drivinity_exit_modal_shown');
    if (hasSeenModal) return;

    // Trigger on mouse exit intent or after 12 seconds
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('drivinity_exit_modal_shown')) {
        setIsOpen(true);
        sessionStorage.setItem('drivinity_exit_modal_shown', 'true');
      }
    }, 12000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !sessionStorage.getItem('drivinity_exit_modal_shown')) {
        setIsOpen(true);
        sessionStorage.setItem('drivinity_exit_modal_shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const handleClaimDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsClaimed(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('SAVE20-CANGURU');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="exit-modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="exit-modal-card aura-card dark-theme" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setIsOpen(false)} className="exit-modal-close" aria-label="Close modal">
          <X size={20} />
        </button>

        {!isClaimed ? (
          <div className="exit-content-body text-center">
            <div className="gift-badge-icon">
              <Gift size={36} />
            </div>

            <span className="pill-badge accent">SPECIAL LEARNER OFFER</span>
            <h2 className="exit-title">WAIT! CLAIM $20 OFF YOUR FIRST LESSON BLOCK!</h2>
            <p className="exit-desc">
              Don't leave empty handed! Enter your email to unlock an instant <strong>$20 Discount Voucher Code</strong> for driving lesson packages.
            </p>

            <form onSubmit={handleClaimDiscount} className="exit-form">
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" variant="yellow" size="lg" style={{ width: '100%' }}>
                CLAIM MY $20 VOUCHER CODE
              </Button>
            </form>

            <p className="exit-small-note">
              * Valid for new students booking 3-lesson combos or car hire packages. No spam ever.
            </p>
          </div>
        ) : (
          <div className="exit-claimed-body text-center">
            <div className="claimed-check-wrap">
              <CheckCircle2 size={48} className="green" />
            </div>
            <span className="pill-badge accent">VOUCHER ACTIVATED</span>
            <h3 className="claimed-title">Your $20 Voucher is Ready!</h3>
            <p className="claimed-desc">
              Use the promo code below at checkout on our booking page to claim your $20 discount.
            </p>

            <div className="voucher-code-box">
              <div className="code-display">
                <Tag size={18} className="gold" />
                <strong>SAVE20-CANGURU</strong>
              </div>
              <button onClick={handleCopyCode} className="copy-code-btn">
                {isCopied ? 'COPIED! ✓' : <Copy size={16} />}
              </button>
            </div>

            <div className="claimed-actions">
              <Button to="/book?service=3-lesson-combo" variant="yellow" size="lg" icon={<ArrowRight size={16} />} style={{ width: '100%' }}>
                USE PROMO CODE ON BOOKING WIZARD
              </Button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .exit-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 20, 32, 0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: exitFade 0.3s ease;
        }
        @keyframes exitFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .exit-modal-card {
          position: relative;
          width: 100%;
          max-width: 520px;
          padding: 2.75rem 2.25rem;
          border-radius: var(--radius-xl);
          border: 1px solid rgba(210, 176, 76, 0.3);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          animation: modalScale 0.35 cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modalScale {
          from { transform: scale(0.9) translateY(20px); }
          to { transform: scale(1) translateY(0); }
        }
        .exit-modal-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: #94A3B8;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .exit-modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
        }
        .gift-badge-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(210, 176, 76, 0.2);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem auto;
        }
        .exit-title {
          font-size: 1.6rem;
          color: #FFFFFF;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .exit-desc {
          font-size: 0.95rem;
          color: #94A3B8;
          margin-bottom: 1.75rem;
          line-height: 1.5;
        }
        .exit-form {
          margin-bottom: 1.25rem;
        }
        .exit-small-note {
          font-size: 0.75rem;
          color: #64748B;
        }

        .claimed-check-wrap {
          margin-bottom: 1rem;
        }
        .green { color: #22C55E; }
        .claimed-title {
          font-size: 1.8rem;
          color: #FFFFFF;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .claimed-desc {
          font-size: 0.95rem;
          color: #94A3B8;
          margin-bottom: 1.5rem;
        }
        .voucher-code-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.08);
          border: 1px dashed var(--accent-gold);
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.75rem;
        }
        .code-display {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1.1rem;
          color: var(--accent-gold);
        }
        .gold { color: var(--accent-gold); }
        .copy-code-btn {
          background: var(--accent-gold);
          color: #07131D;
          border: none;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          font-weight: 800;
          font-size: 0.775rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
