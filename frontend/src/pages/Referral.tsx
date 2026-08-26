import React, { useState } from 'react';
import { 
  Gift, 
  Share2, 
  Copy, 
  CheckCircle2, 
  MessageCircle, 
  DollarSign, 
  Users, 
  ArrowRight 
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const Referral: React.FC = () => {
  const [name, setName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const cleanName = name.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const link = `${window.location.origin}/book?ref=${cleanName}20`;
    setGeneratedLink(link);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Hey! Use my referral link to get $20 OFF your driving lessons with Canguruber Driving School: ${generatedLink}`)}`;

  return (
    <div className="referral-page">
      <PageHeader 
        tag="REFER & EARN REWARDS"
        title="REFER A FRIEND, GET $20 CASHBACK!"
        subtitle="Give your friends $20 OFF their first lesson package and earn $20 cashback for every successful referral."
        breadcrumb="Referral Program"
      />

      <section className="section-padding">
        <div className="container" style={{ maxWidth: '820px' }}>
          {/* Main Card */}
          <div className="referral-card aura-card text-center">
            <div className="gift-avatar">
              <Gift size={44} />
            </div>

            <span className="pill-badge accent">WIN-WIN REFERRAL REWARDS</span>
            <h2 className="ref-main-title">Share the Joy of Passing First Time</h2>
            <p className="ref-sub-p">
              Enter your name below to generate your personal referral link. Share it on WhatsApp, Instagram, or SMS!
            </p>

            {/* Generator Form */}
            <form onSubmit={handleGenerate} className="ref-generator-form">
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ textAlign: 'left' }}>Your First Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Jordan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" variant="yellow" size="lg" icon={<Share2 size={18} />} style={{ width: '100%' }}>
                GENERATE MY UNIQUE REFERRAL LINK
              </Button>
            </form>

            {/* Link Output Box */}
            {generatedLink && (
              <div className="generated-link-box">
                <span className="box-tag">YOUR PERSONAL REFERRAL LINK:</span>
                <div className="link-row">
                  <input type="text" readOnly value={generatedLink} className="link-input" />
                  <button onClick={handleCopy} className="copy-link-btn">
                    {isCopied ? 'COPIED! ✓' : <Copy size={16} />}
                  </button>
                </div>

                <div className="share-actions">
                  <a 
                    href={whatsappShareUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="whatsapp-share-link-btn"
                  >
                    <MessageCircle size={18} />
                    <span>Share Directly via WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* How It Works Grid */}
            <div className="how-it-works-grid">
              <div className="work-step">
                <div className="step-num">1</div>
                <h4>Send Your Link</h4>
                <p>Share your unique referral link with friends preparing for their driving test.</p>
              </div>

              <div className="work-step">
                <div className="step-num">2</div>
                <h4>Friend Gets $20 OFF</h4>
                <p>Your friend uses your link to book a 3-lesson combo or test car hire.</p>
              </div>

              <div className="work-step">
                <div className="step-num">3</div>
                <h4>You Get $20 Cashback</h4>
                <p>You receive $20 cash transferred to your account or credit toward future lessons!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .referral-card {
          padding: 3rem 2.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gift-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(210, 176, 76, 0.2);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .ref-main-title {
          font-size: 2.2rem;
          margin-top: 0.85rem;
          margin-bottom: 0.5rem;
        }
        .ref-sub-p {
          font-size: 1.05rem;
          color: #64748B;
          max-width: 600px;
          margin-bottom: 2rem;
        }

        .ref-generator-form {
          width: 100%;
          max-width: 480px;
          margin-bottom: 2rem;
        }

        .generated-link-box {
          width: 100%;
          max-width: 580px;
          background: #FAFAF8;
          border: 1.5px dashed var(--accent-gold);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          margin-bottom: 2.5rem;
          text-align: left;
          animation: linkFade 0.3s ease;
        }
        @keyframes linkFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .box-tag {
          display: block;
          font-size: 0.75rem;
          font-weight: 800;
          color: #B38E2A;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }
        .link-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .link-input {
          flex: 1;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
          color: #07131D;
          font-weight: 700;
        }
        .copy-link-btn {
          background: #07131D;
          color: #FFFFFF;
          border: none;
          padding: 0.65rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 800;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .whatsapp-share-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          background: #25D366;
          color: #FFFFFF;
          border-radius: var(--radius-full);
          text-decoration: none;
          font-weight: 800;
          font-size: 0.85rem;
        }

        .how-it-works-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
          text-align: left;
          margin-top: 1rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-light);
        }
        @media (max-width: 768px) {
          .how-it-works-grid { grid-template-columns: 1fr; }
        }
        .work-step {
          background: #FAFAF8;
          padding: 1.35rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
        }
        .step-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent-gold);
          color: #07131D;
          font-family: var(--font-display);
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.85rem;
        }
        .work-step h4 {
          font-size: 1.05rem;
          margin-bottom: 0.35rem;
        }
        .work-step p {
          font-size: 0.85rem;
          color: #64748B;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};
