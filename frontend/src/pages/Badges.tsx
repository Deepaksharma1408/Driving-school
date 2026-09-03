import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  UserCheck,
  ArrowRight
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { fetchAllBadges, fetchStudentBadges } from '../services/api';

export const Badges: React.FC = () => {
  const { user, token, isAuthenticated } = useAuth();

  const [allBadges, setAllBadges] = useState<any[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBadgesData() {
      setLoading(true);
      try {
        const systemBadges = await fetchAllBadges();
        setAllBadges(systemBadges || []);

        if (isAuthenticated && user && token) {
          const studentBadges = await fetchStudentBadges(user.id, token);
          setEarnedBadges(studentBadges || []);
        }
      } catch (err) {
        console.error('Error loading badges:', err);
      } finally {
        setLoading(false);
      }
    }

    loadBadgesData();
  }, [user, token, isAuthenticated]);

  if (!isAuthenticated || !user) {
    return (
      <div className="badges-page">
        <PageHeader 
          tag="GAMIFIED LEARNING PORTAL"
          title="STUDENT ACHIEVEMENT BADGES & MILESTONES."
          subtitle="Please log in to view your unlocked driver achievement badges."
          breadcrumb="Student Badges"
        />
        <section className="section-padding">
          <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <div className="aura-card" style={{ padding: '3rem 2rem' }}>
              <UserCheck size={48} style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Student Login Required</h3>
              <p style={{ color: '#64748B', marginBottom: '2rem', lineHeight: '1.6' }}>
                Log in to view your earned badges, milestone progress, and graduation achievement status.
              </p>
              <Button to="/admin" variant="yellow" size="lg" icon={<ArrowRight size={18} />}>
                LOGIN TO VIEW BADGES
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const earnedBadgeIds = new Set(earnedBadges.map(b => b.badgeId || b.id));
  const earnedMap = new Map(earnedBadges.map(b => [b.badgeId || b.id, b]));

  const totalBadgesCount = allBadges.length || 5;
  const unlockedCount = earnedBadges.length;

  return (
    <div className="badges-page">
      <PageHeader 
        tag="GAMIFIED LEARNING PORTAL"
        title="STUDENT ACHIEVEMENT BADGES & MILESTONES."
        subtitle={`Track your driving milestones, earn achievement badges, and unlock graduation rewards (${user.fullName}).`}
        breadcrumb="Student Badges"
      />

      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div className="aura-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
              <Clock size={32} className="spinning" style={{ marginBottom: '1rem', color: 'var(--accent-gold)' }} />
              <p>Fetching your earned achievement badges...</p>
            </div>
          ) : (
            <>
              {/* Progress Header Box */}
              <div className="badges-progress-card aura-card" style={{ marginBottom: '2.5rem' }}>
                <div className="progress-top-row">
                  <div>
                    <span className="pill-badge accent">VERIFIED MILESTONES</span>
                    <h3 className="prog-title">
                      Achievement Progress: {unlockedCount} of {totalBadgesCount} Badges Unlocked
                    </h3>
                  </div>
                  <Button to="/book" variant="yellow" size="md">
                    CONTINUE LESSONS
                  </Button>
                </div>

                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${totalBadgesCount > 0 ? (unlockedCount / totalBadgesCount) * 100 : 0}%` }} />
                </div>
              </div>

              {/* Badges Grid */}
              <div className="badges-grid">
                {allBadges.map((badge) => {
                  const isUnlocked = earnedBadgeIds.has(badge.id);
                  const earnedInfo = earnedMap.get(badge.id);

                  return (
                    <div key={badge.id} className={`badge-item-card aura-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                      <div className="badge-icon-badge">
                        {isUnlocked ? (
                          <span className="emoji-icon">{badge.icon || '🏆'}</span>
                        ) : (
                          <Lock size={22} />
                        )}
                      </div>

                      <span className="badge-cat">{badge.category || 'Competency'}</span>
                      <h4 className="badge-name">{badge.name}</h4>
                      <p className="badge-desc">{badge.description}</p>

                      <div className="badge-status-tag">
                        {isUnlocked ? (
                          <span className="status-unlocked">
                            UNLOCKED ✓ {earnedInfo?.earnedAt ? `(${new Date(earnedInfo.earnedAt).toLocaleDateString()})` : ''}
                          </span>
                        ) : (
                          <span className="status-locked">LOCKED 🔒 (NOT YET EARNED)</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
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
          filter: grayscale(0.85);
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
        .emoji-icon {
          font-size: 2rem;
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
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }
        .status-locked {
          font-size: 0.725rem;
          font-weight: 900;
          color: #64748B;
          background: #FAFAF8;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }
      `}</style>
    </div>
  );
};

export default Badges;
