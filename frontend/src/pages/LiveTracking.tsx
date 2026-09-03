import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  Car, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Calendar,
  AlertTriangle,
  UserCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { fetchBookings } from '../services/api';

export const LiveTracking: React.FC = () => {
  const { user, token, isAuthenticated } = useAuth();

  const [nextBooking, setNextBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNextBooking() {
      if (!isAuthenticated || !user || !token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const bookingsData = await fetchBookings(user.email, token);
        const today = new Date().toISOString().split('T')[0];
        
        const upcoming = (bookingsData || [])
          .filter((b: any) => (b.status === 'confirmed' || b.status === 'pending') && b.date >= today)
          .sort((a: any, b: any) => a.date.localeCompare(b.date));

        if (upcoming.length > 0) {
          setNextBooking(upcoming[0]);
        } else {
          setNextBooking(null);
        }
      } catch (err) {
        console.error('Error loading next booking for tracking page:', err);
      } finally {
        setLoading(false);
      }
    }

    loadNextBooking();
  }, [user, token, isAuthenticated]);

  if (!isAuthenticated || !user) {
    return (
      <div className="live-tracking-page">
        <PageHeader 
          tag="REAL-TIME LESSON DISPATCH"
          title="NEXT LESSON DISPATCH & COUNTDOWN."
          subtitle="Please log in to view your scheduled lesson pickup, assigned dual-control vehicle, and countdown timer."
          breadcrumb="Lesson Dispatch"
        />
        <section className="section-padding">
          <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <div className="aura-card" style={{ padding: '3rem 2rem' }}>
              <UserCheck size={48} style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Student Login Required</h3>
              <p style={{ color: '#64748B', marginBottom: '2rem', lineHeight: '1.6' }}>
                Log in to access your dispatch countdown, instructor details, and pickup location for your next scheduled session.
              </p>
              <Button to="/admin" variant="yellow" size="lg" icon={<ArrowRight size={18} />}>
                LOGIN TO DISPATCH HUB
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="live-tracking-page">
      <PageHeader 
        tag="REAL-TIME LESSON DISPATCH"
        title="NEXT LESSON DISPATCH & COUNTDOWN."
        subtitle={`Live dispatch countdown and pickup details for ${user.fullName}.`}
        breadcrumb="Lesson Dispatch"
      />

      <section className="section-padding">
        <div className="container">
          {/* Live GPS Tracking Coming Soon Notice */}
          <div className="telemetry-notice-banner aura-card" style={{ marginBottom: '2rem' }}>
            <Navigation size={20} className="notice-icon" />
            <div>
              <strong>Live GPS Vehicle Tracking — Coming Soon</strong>
              <p>
                Real-time map tracking feature will be available in a future app update. In the meantime, your confirmed lesson dispatch schedule and pickup details are shown below.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="aura-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
              <Clock size={32} className="spinning" style={{ marginBottom: '1rem', color: 'var(--accent-gold)' }} />
              <p>Loading your upcoming dispatch schedule...</p>
            </div>
          ) : !nextBooking ? (
            <div className="aura-card" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
              <Calendar size={48} style={{ color: '#94A3B8', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Upcoming Lesson Scheduled</h3>
              <p style={{ color: '#64748B', marginBottom: '1.75rem', lineHeight: '1.5' }}>
                You currently have no confirmed upcoming driving lessons or test car hire bookings. Book a session to activate your dispatch countdown.
              </p>
              <Button to="/book" variant="yellow" size="lg" icon={<ArrowRight size={18} />}>
                SCHEDULE A DRIVING LESSON
              </Button>
            </div>
          ) : (
            <div className="dispatch-grid">
              {/* Main Dispatch Countdown Card */}
              <div className="dispatch-main-card aura-card dark-theme">
                <div className="dispatch-header">
                  <span className="pill-badge accent">CONFIRMED DISPATCH</span>
                  <span className="booking-ref-tag">REF: {nextBooking.id}</span>
                </div>

                <div className="countdown-box">
                  <span className="countdown-label">NEXT LESSON DATE & TIME:</span>
                  <h2 className="countdown-date">{nextBooking.date}</h2>
                  <span className="countdown-slot">{nextBooking.timeSlot}</span>
                </div>

                <div className="dispatch-details-list">
                  <div className="detail-row">
                    <MapPin size={18} className="gold" />
                    <div>
                      <span className="detail-lbl">Pickup Location</span>
                      <strong className="detail-val">{nextBooking.pickupAddress || 'Address specified during booking'}</strong>
                    </div>
                  </div>

                  <div className="detail-row">
                    <Car size={18} className="gold" />
                    <div>
                      <span className="detail-lbl">Vehicle & Transmission</span>
                      <strong className="detail-val">Dual-Control Toyota Corolla ({nextBooking.transmission.toUpperCase()})</strong>
                    </div>
                  </div>

                  <div className="detail-row">
                    <ShieldCheck size={18} className="green" />
                    <div>
                      <span className="detail-lbl">Safety & Audit Status</span>
                      <strong className="detail-val green">FULLY INSURED • DUAL CONTROLS AUDITED</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Checklist */}
              <div className="dispatch-side-card aura-card">
                <span className="pill-badge accent">PRE-LESSON CHECKLIST</span>
                <h3 style={{ fontSize: '1.4rem', marginTop: '0.35rem', marginBottom: '1.25rem' }}>Pre-Drive Requirements</h3>

                <div className="pre-checklist">
                  <div className="check-item">
                    <CheckCircle2 size={18} className="green" />
                    <div>
                      <strong>Physical NSW Learner Licence</strong>
                      <p>Ensure you have your physical plastic licence or digital NSW licence app ready.</p>
                    </div>
                  </div>

                  <div className="check-item">
                    <CheckCircle2 size={18} className="green" />
                    <div>
                      <strong>Comfortable Enclosed Footwear</strong>
                      <p>Wear flat, enclosed shoes for proper pedal sensitivity.</p>
                    </div>
                  </div>

                  <div className="check-item">
                    <CheckCircle2 size={18} className="green" />
                    <div>
                      <strong>Service NSW Logbook App</strong>
                      <p>Ensure your logbook app is logged in to record 3-for-1 bonus hours.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .telemetry-notice-banner {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: rgba(210, 176, 76, 0.1);
          border: 1px solid var(--accent-gold);
          border-radius: var(--radius-md);
        }
        .notice-icon { color: var(--accent-gold); flex-shrink: 0; margin-top: 0.15rem; }
        .telemetry-notice-banner p { font-size: 0.85rem; color: #475569; margin-top: 0.25rem; line-height: 1.4; }

        .dispatch-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2rem;
        }
        @media (max-width: 900px) {
          .dispatch-grid { grid-template-columns: 1fr; }
        }

        .dispatch-main-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .dispatch-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .booking-ref-tag {
          font-size: 0.775rem;
          font-weight: 800;
          color: #94A3B8;
        }

        .countdown-box {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        .countdown-label { font-size: 0.75rem; font-weight: 800; color: #94A3B8; letter-spacing: 0.05em; }
        .countdown-date { font-size: 2.25rem; font-family: var(--font-display); font-weight: 900; color: var(--accent-gold); margin: 0.35rem 0; }
        .countdown-slot { font-size: 1.1rem; color: #FFFFFF; font-weight: 700; }

        .dispatch-details-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .detail-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.04);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
        }
        .detail-lbl { display: block; font-size: 0.75rem; color: #94A3B8; }
        .detail-val { display: block; font-size: 0.95rem; color: #FFFFFF; }
        .gold { color: var(--accent-gold); }
        .green { color: #16A34A; }

        .dispatch-side-card { padding: 2.25rem; }
        .pre-checklist { display: flex; flex-direction: column; gap: 1.25rem; }
        .check-item { display: flex; align-items: flex-start; gap: 0.85rem; }
        .check-item strong { font-size: 0.9rem; display: block; }
        .check-item p { font-size: 0.8rem; color: #64748B; margin-top: 0.15rem; }
      `}</style>
    </div>
  );
};

export default LiveTracking;
