import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Moon, 
  Sun, 
  Car 
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const LogbookCalculator: React.FC = () => {
  const [dayHours, setDayHours] = useState(30);
  const [nightHours, setNightHours] = useState(8);
  const [instructorHours, setInstructorHours] = useState(6);

  // NSW Transport Rule: 1 hr with structured driving instructor = 3 logbook hrs (up to 10 hrs max = 30 credit hrs)
  const instructorBonusCredits = Math.min(instructorHours, 10) * 3;
  const hoursSavedByInstructor = Math.min(instructorHours, 10) * 2;
  const totalAccreditedHours = dayHours + nightHours + (instructorBonusCredits - Math.min(instructorHours, 10));
  
  const targetTotal = 120;
  const progressPercent = Math.min(100, Math.round((totalAccreditedHours / targetTotal) * 100));
  const remainingHours = Math.max(0, targetTotal - totalAccreditedHours);

  return (
    <div className="logbook-calculator-page">
      <PageHeader 
        tag="NSW TRANSPORT LOGBOOK ASSISTANT"
        title="120-HOUR LOGBOOK & 3-FOR-1 CALCULATOR."
        subtitle="Calculate your NSW Learner Licence logbook progress and see how 10 instructor hours credit 30 logbook hours!"
        breadcrumb="Logbook Calculator"
      />

      <section className="section-padding">
        <div className="container">
          <div className="logbook-layout-grid">
            {/* Left Controls Column */}
            <div className="controls-col aura-card">
              <div className="col-header">
                <span className="pill-badge accent">INTERACTIVE CALCULATOR</span>
                <h3 className="col-title">Enter Your Logbook Hours</h3>
                <p className="col-desc">Adjust the sliders below to match your current NSW logbook entries.</p>
              </div>

              {/* Slider 1: Day Hours */}
              <div className="slider-group">
                <div className="slider-label-row">
                  <div className="icon-label">
                    <Sun size={18} className="sun-icon" />
                    <strong>Day Driving Hours Completed</strong>
                  </div>
                  <span className="slider-val-badge">{dayHours} / 100 Hours</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={dayHours} 
                  onChange={(e) => setDayHours(parseInt(e.target.value))}
                  className="logbook-range-slider"
                />
                <span className="slider-hint">100 Day Hours required by Transport for NSW</span>
              </div>

              {/* Slider 2: Night Hours */}
              <div className="slider-group">
                <div className="slider-label-row">
                  <div className="icon-label">
                    <Moon size={18} className="moon-icon" />
                    <strong>Night Driving Hours Completed</strong>
                  </div>
                  <span className="slider-val-badge">{nightHours} / 20 Hours</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={nightHours} 
                  onChange={(e) => setNightHours(parseInt(e.target.value))}
                  className="logbook-range-slider"
                />
                <span className="slider-hint">20 Night Hours (between sunset & sunrise) required</span>
              </div>

              {/* Slider 3: Instructor Hours */}
              <div className="slider-group bonus-group">
                <div className="slider-label-row">
                  <div className="icon-label">
                    <Car size={18} className="gold-icon" />
                    <strong>Professional Instructor Lessons</strong>
                  </div>
                  <span className="slider-val-badge gold">{instructorHours} / 10 Hours</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={instructorHours} 
                  onChange={(e) => setInstructorHours(parseInt(e.target.value))}
                  className="logbook-range-slider gold"
                />
                <span className="slider-hint gold-hint">
                  ⚡ 1 hr with Canguruber Instructor = 3 Logbook Hours (Max 10 hrs = 30 credits)
                </span>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="summary-col aura-card dark-theme">
              <span className="pill-badge accent">PROGRESS SUMMARY</span>
              <h3 className="summary-title" style={{ color: '#FFF' }}>Your Licensing Goal</h3>

              {/* Progress Gauge */}
              <div className="gauge-box">
                <div className="gauge-progress-bar-bg">
                  <div 
                    className="gauge-progress-bar-fill" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="gauge-text-row">
                  <span className="percent-num">{progressPercent}%</span>
                  <span className="total-ratio">{totalAccreditedHours} / 120 Hours</span>
                </div>
              </div>

              {/* Key Metric Highlights */}
              <div className="metrics-summary-list">
                <div className="metric-item">
                  <div className="metric-icon-wrap"><Award size={20} /></div>
                  <div>
                    <span className="item-label">Instructor Bonus Logbook Credits</span>
                    <strong className="item-val gold">{instructorBonusCredits} Hours Credited</strong>
                  </div>
                </div>

                <div className="metric-item">
                  <div className="metric-icon-wrap"><Clock size={20} /></div>
                  <div>
                    <span className="item-label">Driving Time Saved</span>
                    <strong className="item-val">{hoursSavedByInstructor} Hours Saved</strong>
                  </div>
                </div>

                <div className="metric-item">
                  <div className="metric-icon-wrap"><TrendingUp size={20} /></div>
                  <div>
                    <span className="item-label">Hours Left to Book Test</span>
                    <strong className="item-val">{remainingHours > 0 ? `${remainingHours} Hours Needed` : 'LOGBOOK COMPLETE! READY FOR TEST'}</strong>
                  </div>
                </div>
              </div>

              <div className="cta-box">
                <p>Maximize your logbook credits with Canguruber driving packages.</p>
                <Button to={`/book?service=driving-lesson`} variant="primary" size="lg" icon={<ArrowRight size={16} />} style={{ width: '100%' }}>
                  BOOK INSTRUCTOR LESSONS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .logbook-layout-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2rem;
        }
        @media (max-width: 900px) {
          .logbook-layout-grid {
            grid-template-columns: 1fr;
          }
        }
        .controls-col {
          padding: 2.25rem;
        }
        .col-header {
          margin-bottom: 2rem;
        }
        .col-title {
          font-size: 1.6rem;
          margin-top: 0.5rem;
          margin-bottom: 0.35rem;
        }
        .col-desc {
          font-size: 0.9rem;
          color: #64748B;
        }

        .slider-group {
          margin-bottom: 1.75rem;
          background: #FAFAF8;
          padding: 1.25rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
        }
        .slider-group.bonus-group {
          background: rgba(210, 176, 76, 0.08);
          border-color: var(--accent-gold);
        }
        .slider-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }
        .icon-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }
        .sun-icon { color: #F59E0B; }
        .moon-icon { color: #6366F1; }
        .gold-icon { color: #B38E2A; }

        .slider-val-badge {
          font-size: 0.825rem;
          font-weight: 800;
          padding: 0.25rem 0.65rem;
          background: #FFFFFF;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
        }
        .slider-val-badge.gold {
          background: var(--accent-gold);
          color: #07131D;
          border-color: var(--accent-gold);
        }

        .logbook-range-slider {
          width: 100%;
          height: 8px;
          border-radius: 99px;
          background: #E2DFD6;
          outline: none;
          accent-color: #07131D;
          cursor: pointer;
        }
        .logbook-range-slider.gold {
          accent-color: var(--accent-gold);
        }

        .slider-hint {
          display: block;
          font-size: 0.775rem;
          color: #64748B;
          margin-top: 0.5rem;
        }
        .slider-hint.gold-hint {
          color: #B38E2A;
          font-weight: 700;
        }

        .summary-col {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .summary-title {
          font-size: 1.6rem;
        }
        .gauge-box {
          background: rgba(255, 255, 255, 0.06);
          padding: 1.25rem;
          border-radius: var(--radius-lg);
        }
        .gauge-progress-bar-bg {
          width: 100%;
          height: 12px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 0.85rem;
        }
        .gauge-progress-bar-fill {
          height: 100%;
          background: var(--accent-gold);
          border-radius: 99px;
          transition: width 0.4s ease;
        }
        .gauge-text-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .percent-num {
          font-size: 1.6rem;
          font-family: var(--font-display);
          font-weight: 900;
          color: var(--accent-gold);
        }
        .total-ratio {
          font-size: 0.95rem;
          color: #94A3B8;
          font-weight: 700;
        }

        .metrics-summary-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .metric-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
        }
        .metric-icon-wrap {
          color: var(--accent-gold);
        }
        .item-label {
          display: block;
          font-size: 0.775rem;
          color: #94A3B8;
        }
        .item-val {
          display: block;
          font-size: 1rem;
          color: #FFFFFF;
        }
        .item-val.gold {
          color: var(--accent-gold);
        }

        .cta-box {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .cta-box p {
          font-size: 0.85rem;
          color: #94A3B8;
          text-align: center;
        }
      `}</style>
    </div>
  );
};
