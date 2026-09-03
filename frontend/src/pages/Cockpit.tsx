import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Car, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Calendar,
  Award,
  BookOpen,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { fetchBookings, fetchStudentProgress, fetchStudentBadges } from '../services/api';

export const Cockpit: React.FC = () => {
  const { user, token, isAuthenticated } = useAuth();

  const [bookings, setBookings] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      if (!isAuthenticated || !user || !token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [bookingsData, progressData, badgesData] = await Promise.all([
          fetchBookings(user.email, token),
          fetchStudentProgress(user.id, token),
          fetchStudentBadges(user.id, token)
        ]);

        const today = new Date().toISOString().split('T')[0];
        const upcoming = (bookingsData || []).filter(
          (b: any) => (b.status === 'confirmed' || b.status === 'pending') && (b.date >= today)
        );

        setBookings(upcoming);
        setSkills(progressData || []);
        setBadges(badgesData || []);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user, token, isAuthenticated]);

  if (!isAuthenticated || !user) {
    return (
      <div className="cockpit-page">
        <PageHeader 
          tag="STUDENT COMMAND COCKPIT"
          title="YOUR PERSONAL DRIVING DASHBOARD."
          subtitle="Please log in to view your upcoming lesson schedule, logbook progress, and earned driver badges."
          breadcrumb="Student Dashboard"
        />
        <section className="section-padding">
          <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <div className="aura-card" style={{ padding: '3rem 2rem' }}>
              <UserCheck size={48} style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Student Login Required</h3>
              <p style={{ color: '#64748B', marginBottom: '2rem', lineHeight: '1.6' }}>
                Access your personalized NSW driving progress, scheduled instructor sessions, and competency badges.
              </p>
              <Button to="/admin" variant="yellow" size="lg" icon={<ArrowRight size={18} />}>
                LOGIN TO STUDENT PORTAL
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const masteredCount = skills.filter(s => s.status === 'mastered').length;
  const inProgressCount = skills.filter(s => s.status === 'in_progress').length;
  const totalSkills = skills.length || 8;
  const progressPercent = Math.round((masteredCount / totalSkills) * 100);

  return (
    <div className="cockpit-page">
      <PageHeader 
        tag={`WELCOME BACK, ${user.fullName.toUpperCase()}`}
        title="STUDENT COMMAND COCKPIT & PROGRESS."
        subtitle="Track real-time upcoming bookings, master NSW driving competencies, and view your earned milestone badges."
        breadcrumb="Student Dashboard"
      />

      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div className="aura-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
              <Clock size={32} className="spinning" style={{ marginBottom: '1rem', color: 'var(--accent-gold)' }} />
              <p>Loading your student dashboard data...</p>
            </div>
          ) : (
            <div className="dashboard-grid">
              {/* Left Column: Progress & Bookings */}
              <div className="main-dash-col">
                {/* Overall Competency Metric */}
                <div className="aura-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                  <div className="dash-card-header">
                    <div>
                      <span className="pill-badge accent">NSW DRIVER COMPETENCY</span>
                      <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
                        Skill Mastery: {masteredCount} of {totalSkills} Completed
                      </h3>
                    </div>
                    <span className="mastery-percent">{progressPercent}%</span>
                  </div>

                  <div className="progress-bar-bg" style={{ margin: '1.25rem 0 1rem 0' }}>
                    <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
                  </div>

                  <div className="skills-summary-pills">
                    <span className="status-pill mastered"><CheckCircle2 size={14} /> {masteredCount} Mastered</span>
                    <span className="status-pill in-progress"><Clock size={14} /> {inProgressCount} In Progress</span>
                    <span className="status-pill not-started">{totalSkills - (masteredCount + inProgressCount)} Pending</span>
                  </div>
                </div>

                {/* Upcoming Bookings Card */}
                <div className="aura-card" style={{ padding: '2rem' }}>
                  <div className="dash-card-header">
                    <div>
                      <span className="pill-badge accent">SCHEDULED LESSONS</span>
                      <h3 style={{ fontSize: '1.4rem', marginTop: '0.5rem' }}>Upcoming Driving Sessions</h3>
                    </div>
                    <Button to="/book" variant="outline" size="sm">BOOK NEW LESSON</Button>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="empty-state-box">
                      <Calendar size={32} style={{ color: '#94A3B8', marginBottom: '0.75rem' }} />
                      <p>You have no upcoming driving lessons scheduled.</p>
                      <Button to="/book" variant="yellow" size="sm" style={{ marginTop: '1rem' }}>
                        SCHEDULE YOUR NEXT SESSION
                      </Button>
                    </div>
                  ) : (
                    <div className="bookings-list">
                      {bookings.map((booking: any) => (
                        <div key={booking.id} className="booking-dash-item">
                          <div className="booking-date-badge">
                            <Calendar size={18} style={{ color: 'var(--accent-gold)' }} />
                            <span>{booking.date}</span>
                          </div>
                          <div className="booking-details">
                            <strong>{booking.timeSlot}</strong>
                            <span className="booking-sub">
                              {booking.serviceId === 'car-hire-test' ? 'Service NSW Test Day Car Hire' : 'Structured Driving Lesson'} • {booking.transmission.toUpperCase()}
                            </span>
                            {booking.pickupAddress && (
                              <span className="booking-address">📍 Pickup: {booking.pickupAddress}</span>
                            )}
                          </div>
                          <span className="booking-status-tag confirmed">{booking.status.toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Skills Detail & Badges */}
              <div className="side-dash-col">
                {/* Earned Badges Showcase */}
                <div className="aura-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                  <div className="dash-card-header">
                    <div>
                      <span className="pill-badge accent">ACHIEVEMENTS</span>
                      <h3 style={{ fontSize: '1.25rem', marginTop: '0.35rem' }}>Earned Badges ({badges.length})</h3>
                    </div>
                    <Link to="/badges" style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                      View All →
                    </Link>
                  </div>

                  {badges.length === 0 ? (
                    <div className="empty-state-box" style={{ padding: '1.5rem' }}>
                      <Award size={28} style={{ color: '#94A3B8', marginBottom: '0.5rem' }} />
                      <p style={{ fontSize: '0.85rem' }}>Master driving skills during lessons to unlock achievement badges!</p>
                    </div>
                  ) : (
                    <div className="mini-badges-grid">
                      {badges.map((b: any) => (
                        <div key={b.id} className="mini-badge-card">
                          <span className="badge-icon-lg">{b.icon}</span>
                          <div>
                            <strong>{b.name}</strong>
                            <p>{b.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skills Progress Checklist */}
                <div className="aura-card" style={{ padding: '2rem' }}>
                  <span className="pill-badge accent">NSW COMPETENCIES</span>
                  <h3 style={{ fontSize: '1.25rem', marginTop: '0.35rem', marginBottom: '1rem' }}>Key Driving Skills</h3>

                  {skills.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: '#64748B' }}>No skill evaluations recorded yet.</p>
                  ) : (
                    <div className="skills-checklist">
                      {skills.map((sk: any) => (
                        <div key={sk.skillId} className="skill-check-item">
                          <div className="skill-info">
                            <span className="skill-cat">{sk.category}</span>
                            <strong>{sk.skillName}</strong>
                            {sk.instructorNotes && <p className="notes-text">"{sk.instructorNotes}"</p>}
                          </div>
                          <span className={`skill-status-tag ${sk.status}`}>
                            {sk.status === 'mastered' ? 'MASTERED' : sk.status === 'in_progress' ? 'IN PROGRESS' : 'NOT STARTED'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2rem;
        }
        @media (max-width: 900px) {
          .dashboard-grid { grid-template-columns: 1fr; }
        }

        .dash-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mastery-percent {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 900;
          color: var(--accent-gold);
        }

        .progress-bar-bg {
          width: 100%;
          height: 10px;
          background: #E2DFD6;
          border-radius: 99px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: var(--accent-gold);
          border-radius: 99px;
          transition: width 0.4s ease;
        }

        .skills-summary-pills {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .status-pill {
          font-size: 0.775rem;
          font-weight: 800;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .status-pill.mastered { background: rgba(22, 163, 74, 0.15); color: #16A34A; }
        .status-pill.in-progress { background: rgba(217, 119, 6, 0.15); color: #D97706; }
        .status-pill.not-started { background: #F1F5F9; color: #64748B; }

        .empty-state-box {
          background: #FAFAF8;
          border: 1px solid var(--border-light);
          padding: 2rem;
          border-radius: var(--radius-md);
          text-align: center;
          margin-top: 1.25rem;
        }

        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.25rem;
        }
        .booking-dash-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: #FAFAF8;
          padding: 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
        }
        .booking-date-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 0.8rem;
          font-weight: 800;
          color: #07131D;
        }
        .booking-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .booking-sub { font-size: 0.8rem; color: #64748B; }
        .booking-address { font-size: 0.775rem; color: #475569; }
        .booking-status-tag {
          font-size: 0.725rem;
          font-weight: 900;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }
        .booking-status-tag.confirmed { background: rgba(22, 163, 74, 0.15); color: #16A34A; }

        .mini-badges-grid {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-top: 1rem;
        }
        .mini-badge-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #FAFAF8;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
        }
        .badge-icon-lg { font-size: 1.75rem; }
        .mini-badge-card strong { font-size: 0.9rem; display: block; }
        .mini-badge-card p { font-size: 0.775rem; color: #64748B; margin: 0; }

        .skills-checklist {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .skill-check-item {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.85rem 0;
          border-bottom: 1px solid var(--border-light);
        }
        .skill-info { display: flex; flex-direction: column; gap: 0.15rem; }
        .skill-cat { font-size: 0.7rem; font-weight: 800; color: #94A3B8; text-transform: uppercase; }
        .notes-text { font-size: 0.775rem; font-style: italic; color: #64748B; margin-top: 0.2rem; }
        .skill-status-tag {
          font-size: 0.7rem;
          font-weight: 900;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          white-space: nowrap;
        }
        .skill-status-tag.mastered { background: rgba(22, 163, 74, 0.15); color: #16A34A; }
        .skill-status-tag.in_progress { background: rgba(217, 119, 6, 0.15); color: #D97706; }
        .skill-status-tag.not_started { background: #F1F5F9; color: #94A3B8; }
      `}</style>
    </div>
  );
};

export default Cockpit;
