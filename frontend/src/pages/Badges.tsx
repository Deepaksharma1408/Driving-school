import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  Moon, 
  Car, 
  TrendingUp, 
  Download 
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const Badges: React.FC = () => {
  const BADGES_DATA = [
    {
      id: 'bdg-1',
      title: 'First Reverse Park Mastered',
      category: 'Maneuver Mastery',
      unlocked: true,
      desc: 'Completed perfect kerbside parallel parking on Service NSW test route without touching kerb.',
      icon: <Car size={24} />
    },
    {
      id: 'bdg-2',
      title: 'Night Driving Hero',
      category: 'Night Operations',
      unlocked: true,
      desc: 'Completed 20 required night driving logbook hours in sunset & dark conditions.',
      icon: <Moon size={24} />
    },
    {
      id: 'bdg-3',
      title: '3-for-1 Bonus Credit Unlocked',
      category: 'NSW Logbook',
      unlocked: true,
      desc: 'Completed 10 structured instructor lessons, unlocking 30 credit hours.',
      icon: <Award size={24} />
    },
    {
      id: 'bdg-4',
      title: 'Mock Test Auditor 100%',
      category: 'Test Prep',
      unlocked: true,
      desc: 'Passed pre-test audit drive at Botany Service NSW test center with zero critical errors.',
      icon: <ShieldCheck size={24} />
    },
    {
      id: 'bdg-5',
      title: 'Highway Merging Champion',
      category: 'Advanced Driving',
      unlocked: false,
      desc: 'Mastered 90 km/h highway merging on M5 motorway.',
      icon: <TrendingUp size={24} />
    },
    {
      id: 'bdg-6',
      title: 'NSW P1 Licence Passed!',
      category: 'Final Graduation',
      unlocked: false,
      desc: 'Passed practical drive test and received official P1 Provisional licence.',
      icon: <Sparkles size={24} />
    }
  ];

  const unlockedCount = BADGES_DATA.filter(b => b.unlocked).length;

  return (
    <div className="badges-page">
      <PageHeader 
        tag="GAMIFIED LEARNING PORTAL"
        title="STUDENT ACHIEVEMENT BADGES & MILESTONES."
        subtitle="Track your driving progress, earn milestone badges, and download your Canguruber graduation certificate!"
        breadcrumb="Student Badges"
      />

      <section className="section-padding">
        <div className="container">
          {/* Progress Header Box */}
          <div className="badges-progress-card aura-card" style={{ marginBottom: '2.5rem' }}>
            <div className="progress-top-row">
              <div>
                <span className="pill-badge accent">LEVEL 3 LEARNER</span>
                <h3 className="prog-title">Achievement Progress: {unlockedCount} / {BADGES_DATA.length} Badges Unlocked</h3>
              </div>
              <Button to="/book" variant="yellow" size="md">
                CONTINUE LESSONS
              </Button>
            </div>

            <div className="bar-bg">
              <div className="bar-fill" style={{ width: `${(unlockedCount / BADGES_DATA.length) * 100}%` }} />
            </div>
          </div>

          {/* Badges Grid */}
          <div className="badges-grid">
            {BADGES_DATA.map((b) => (
              <div key={b.id} className={`badge-item-card aura-card ${b.unlocked ? 'unlocked' : 'locked'}`}>
                <div className="badge-icon-badge">
                  {b.unlocked ? b.icon : <Lock size={20} />}
                </div>

                <span className="badge-cat">{b.category}</span>
                <h4 className="badge-name">{b.title}</h4>
                <p className="badge-desc">{b.desc}</p>

                <div className="badge-status-tag">
                  {b.unlocked ? (
                    <span className="status-unlocked">UNLOCKED ✓</span>
                  ) : (
                    <span className="status-locked">LOCKED 🔒</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .badges-progress-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .progress-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .prog-title {
          font-size: 1.5rem;
          margin-top: 0.5rem;
        }

        .bar-bg {
          width: 100%;
          height: 10px;
          background: #E2DFD6;
          border-radius: 99px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          background: var(--accent-gold);
          border-radius: 99px;
          transition: width 0.4s ease;
        }

        .badges-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .badges-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .badges-grid { grid-template-columns: 1fr; }
        }

        .badge-item-card {
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }
        .badge-item-card.locked {
          opacity: 0.65;
          filter: grayscale(0.8);
        }
        .badge-icon-badge {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(210, 176, 76, 0.15);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .badge-item-card.locked .badge-icon-badge {
          background: #FAFAF8;
          color: #94A3B8;
        }

        .badge-cat {
          font-size: 0.725rem;
          font-weight: 800;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.35rem;
        }
        .badge-name {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
        }
        .badge-desc {
          font-size: 0.85rem;
          color: #64748B;
          line-height: 1.4;
          margin-bottom: 1.25rem;
        }

        .badge-status-tag {
          margin-top: auto;
        }
        .status-unlocked {
          font-size: 0.725rem;
          font-weight: 900;
          color: #16A34A;
          background: rgba(22, 163, 74, 0.15);
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
        }
        .status-locked {
          font-size: 0.725rem;
          font-weight: 900;
          color: #64748B;
          background: #FAFAF8;
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
        }
      `}</style>
    </div>
  );
};
