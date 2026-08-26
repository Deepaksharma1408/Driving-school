import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Car, 
  TrendingUp 
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const SavingsCalculator: React.FC = () => {
  const [lessonCount, setLessonCount] = useState(10);

  const singleLessonRate = 95;
  let packageRatePerHr = singleLessonRate;
  if (lessonCount >= 10) packageRatePerHr = 80;
  else if (lessonCount >= 5) packageRatePerHr = 85;

  const totalStandardCost = lessonCount * singleLessonRate;
  const totalPackageCost = lessonCount * packageRatePerHr;
  const totalSavings = totalStandardCost - totalPackageCost;

  const logbookBonusCredits = Math.min(lessonCount, 10) * 3 + Math.max(0, lessonCount - 10);

  return (
    <div className="savings-calculator-page">
      <PageHeader 
        tag="SMART PRICING COMPARATOR"
        title="BLOCK BOOKING SAVINGS CALCULATOR."
        subtitle="See how much money you save when booking 5-lesson or 10-lesson blocks vs single hourly lessons!"
        breadcrumb="Savings Calculator"
      />

      <section className="section-padding">
        <div className="container">
          <div className="calc-layout-grid">
            {/* Left Control Card */}
            <div className="calc-controls-card aura-card">
              <div className="card-top">
                <span className="pill-badge accent">INTERACTIVE SLIDER</span>
                <h3>Select Lesson Quantity</h3>
                <p>Drag the slider to compare total costs and block package discounts.</p>
              </div>

              <div className="slider-box">
                <div className="slider-header">
                  <div className="icon-wrap">
                    <Car size={20} className="gold" />
                    <strong>Number of Lessons:</strong>
                  </div>
                  <span className="count-badge">{lessonCount} {lessonCount === 1 ? 'Lesson' : 'Lessons'}</span>
                </div>

                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={lessonCount}
                  onChange={(e) => setLessonCount(parseInt(e.target.value))}
                  className="calc-range-slider"
                />

                <div className="slider-marks">
                  <span>1 Hr</span>
                  <span>5 Hrs (Save $50)</span>
                  <span>10 Hrs (Save $150)</span>
                  <span>20 Hrs</span>
                </div>
              </div>

              {/* Package Tier Options */}
              <div className="tiers-grid">
                <div 
                  className={`tier-card ${lessonCount === 1 ? 'active' : ''}`}
                  onClick={() => setLessonCount(1)}
                >
                  <span className="tier-name">Single Lesson</span>
                  <strong className="tier-price">$95 / hr</strong>
                  <span className="tier-sub">Pay as you go</span>
                </div>

                <div 
                  className={`tier-card ${lessonCount === 5 ? 'active' : ''}`}
                  onClick={() => setLessonCount(5)}
                >
                  <span className="tier-name">5-Lesson Package</span>
                  <strong className="tier-price">$425 Total</strong>
                  <span className="tier-sub gold">Save $50 ($85/hr)</span>
                </div>

                <div 
                  className={`tier-card popular ${lessonCount === 10 ? 'active' : ''}`}
                  onClick={() => setLessonCount(10)}
                >
                  <span className="pop-tag">MOST POPULAR</span>
                  <span className="tier-name">10-Lesson Package</span>
                  <strong className="tier-price">$800 Total</strong>
                  <span className="tier-sub gold">Save $150 ($80/hr)</span>
                </div>
              </div>
            </div>

            {/* Right Savings Breakdown */}
            <div className="calc-summary-card aura-card dark-theme">
              <span className="pill-badge accent">YOUR COST & SAVINGS BREAKDOWN</span>
              <h3 className="summary-heading">Package Value Summary</h3>

              <div className="savings-highlight-box">
                <span className="savings-label">TOTAL MONEY SAVED</span>
                <strong className="savings-amount">${totalSavings} AUD</strong>
                <span className="savings-sub">Compared to single hourly rates</span>
              </div>

              <div className="breakdown-list">
                <div className="breakdown-item">
                  <span>Standard Rate ($95 x {lessonCount}):</span>
                  <strong className="strike-text">${totalStandardCost} AUD</strong>
                </div>

                <div className="breakdown-item">
                  <span>Block Package Discounted Rate:</span>
                  <strong className="gold">${totalPackageCost} AUD</strong>
                </div>

                <div className="breakdown-item">
                  <span>Logbook Hours Credited:</span>
                  <strong className="gold">+{logbookBonusCredits} Logbook Hours</strong>
                </div>
              </div>

              <div className="calc-cta-box">
                <Button to={`/book?service=${lessonCount >= 10 ? '10-lesson-pack' : lessonCount >= 5 ? '5-lesson-pack' : 'driving-lesson'}`} variant="yellow" size="lg" icon={<ArrowRight size={16} />} style={{ width: '100%' }}>
                  BOOK {lessonCount} LESSONS & SAVE ${totalSavings}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .calc-layout-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2rem;
        }
        @media (max-width: 900px) {
          .calc-layout-grid { grid-template-columns: 1fr; }
        }
        .calc-controls-card {
          padding: 2.25rem;
        }
        .card-top {
          margin-bottom: 2rem;
        }
        .card-top h3 {
          font-size: 1.6rem;
          margin-top: 0.5rem;
          margin-bottom: 0.35rem;
        }
        .card-top p {
          font-size: 0.9rem;
          color: #64748B;
        }

        .slider-box {
          background: #FAFAF8;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          margin-bottom: 2rem;
        }
        .slider-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .icon-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }
        .gold { color: #B38E2A; }

        .count-badge {
          font-size: 0.9rem;
          font-weight: 800;
          padding: 0.3rem 0.85rem;
          background: #07131D;
          color: #FFFFFF;
          border-radius: var(--radius-full);
        }

        .calc-range-slider {
          width: 100%;
          height: 10px;
          border-radius: 99px;
          background: #E2DFD6;
          outline: none;
          accent-color: #07131D;
          cursor: pointer;
        }
        .slider-marks {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #64748B;
          margin-top: 0.65rem;
          font-weight: 600;
        }

        .tiers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.85rem;
        }
        @media (max-width: 600px) {
          .tiers-grid { grid-template-columns: 1fr; }
        }
        .tier-card {
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          background: #FAFAF8;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .tier-card.popular {
          border-color: var(--accent-gold);
        }
        .pop-tag {
          position: absolute;
          top: -10px;
          right: 10px;
          font-size: 0.65rem;
          font-weight: 800;
          background: var(--accent-gold);
          color: #07131D;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }
        .tier-card:hover {
          border-color: #07131D;
          background: #FFFFFF;
        }
        .tier-card.active {
          border-color: #07131D;
          background: rgba(210, 176, 76, 0.15);
        }
        .tier-name {
          font-size: 0.8rem;
          font-weight: 700;
          color: #64748B;
        }
        .tier-price {
          font-size: 1.1rem;
          font-weight: 800;
          color: #07131D;
          margin: 0.25rem 0;
        }
        .tier-sub {
          font-size: 0.75rem;
          color: #64748B;
        }

        .calc-summary-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .summary-heading {
          font-size: 1.6rem;
          color: #FFFFFF;
        }
        .savings-highlight-box {
          background: rgba(210, 176, 76, 0.15);
          border: 1px solid var(--accent-gold);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          text-align: center;
        }
        .savings-label {
          display: block;
          font-size: 0.775rem;
          letter-spacing: 0.06em;
          color: #94A3B8;
        }
        .savings-amount {
          display: block;
          font-size: 2.4rem;
          font-family: var(--font-display);
          font-weight: 900;
          color: var(--accent-gold);
          margin: 0.25rem 0;
        }
        .savings-sub {
          font-size: 0.8rem;
          color: #CBD5E1;
        }

        .breakdown-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 1.25rem;
          border-radius: var(--radius-md);
        }
        .breakdown-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: #CBD5E1;
        }
        .strike-text {
          text-decoration: line-through;
          color: #94A3B8;
        }

        .calc-cta-box {
          margin-top: auto;
        }
      `}</style>
    </div>
  );
};
