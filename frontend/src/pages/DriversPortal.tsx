import React, { useState } from 'react';
import { 
  Car, 
  Calendar, 
  UserCheck, 
  CheckCircle2, 
  MapPin
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

interface LessonItem {
  id: string;
  studentName: string;
  timeSlot: string;
  location: string;
  lessonType: string;
  phone: string;
  transmission: string;
  status: string;
  notes: string;
}

export const DriversPortal: React.FC = () => {
  const [driverEmail, setDriverEmail] = useState('');
  const [driverPassword, setDriverPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const driverName = 'John Doe (Senior Instructor)';
  const vehicleRego = 'DRV-990-NSW (Toyota Corolla Dual-Control)';
  const [activeTab, setActiveTab] = useState<'schedule' | 'students' | 'vehicle'>('schedule');

  const [todayLessons, setTodayLessons] = useState<LessonItem[]>([
    {
      id: 'BKN-8821',
      studentName: 'Jordan Smith',
      timeSlot: '09:30 AM - 11:00 AM',
      location: 'Service NSW Botany Test Centre',
      lessonType: 'Test Preparation & Warm-up',
      phone: '0412 345 678',
      transmission: 'Automatic',
      status: 'upcoming',
      notes: 'Focusing on reverse parallel parking & Botany RMS roundabouts.'
    },
    {
      id: 'BKN-8844',
      studentName: 'Emily Watson',
      timeSlot: '11:30 AM - 01:00 PM',
      location: 'Service NSW Marrickville Hub',
      lessonType: 'Parallel Parking & 3-Point Turn',
      phone: '0433 998 877',
      transmission: 'Automatic',
      status: 'upcoming',
      notes: 'Learner licence logbook signoff session.'
    },
    {
      id: 'BKN-8890',
      studentName: 'Michael Chang',
      timeSlot: '02:00 PM - 03:30 PM',
      location: 'Rockdale Suburbs Practice Route',
      lessonType: 'Highway Merging & Lane Control',
      phone: '0455 112 233',
      transmission: 'Automatic',
      status: 'completed',
      notes: 'Completed successfully! Scored 94% on mock test.'
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (driverEmail && driverPassword) {
      setIsLoggedIn(true);
    } else {
      alert('Please enter your instructor email and password.');
    }
  };

  const handleToggleComplete = (id: string) => {
    setTodayLessons(prev =>
      prev.map(l => (l.id === id ? { ...l, status: l.status === 'completed' ? 'upcoming' : 'completed' } : l))
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="drivers-portal-page">
        <PageHeader 
          tag="NSW CERTIFIED INSTRUCTORS & DRIVERS PORTAL"
          title="INSTRUCTOR & DRIVER DASHBOARD."
          subtitle="Access your assigned student schedules, dual-control vehicle logs, and logbook assessment matrices."
          breadcrumb="Drivers Portal"
        />

        <section className="section-padding">
          <div className="container" style={{ maxWidth: '480px' }}>
            <div className="aura-card" style={{ padding: '2.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <Car size={48} style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Driver / Instructor Access</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                  Sign in with your registered instructor credentials to view today's student roster.
                </p>
              </div>

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <div className="form-group">
                  <label className="form-label">Instructor Email</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="john.d@drivinity.com"
                    value={driverEmail}
                    onChange={(e) => setDriverEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="••••••••"
                    value={driverPassword}
                    onChange={(e) => setDriverPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" variant="yellow" size="lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                  LOGIN TO DRIVER DASHBOARD
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="drivers-portal-page">
      <PageHeader 
        tag={`INSTRUCTOR PORTAL • WELCOME, ${driverName.toUpperCase()}`}
        title="DAILY DRIVING INSTRUCTION ROSTER."
        subtitle="Manage lesson schedules, mark student logbook milestones, and verify dual-control vehicle readiness."
        breadcrumb="Driver Dashboard"
      />

      <section className="section-padding">
        <div className="container">
          <div className="aura-card" style={{ padding: '1.5rem 2rem', marginBottom: '1.5rem', background: '#07131D', color: '#FFFFFF', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div>
              <span className="pill-badge accent" style={{ marginBottom: '0.4rem' }}>ACTIVE SHIFT</span>
              <h3 style={{ color: 'var(--accent-gold)', margin: 0 }}>{driverName}</h3>
              <p style={{ color: '#94A3B8', margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>
                Assigned Fleet Car: <strong>{vehicleRego}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button onClick={() => setIsLoggedIn(false)} variant="outline" size="sm">
                LOGOUT SHIFT
              </Button>
            </div>
          </div>

          <div className="admin-toolbar aura-card" style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem' }}>
            <div className="tabs-row">
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
                onClick={() => setActiveTab('schedule')}
              >
                <Calendar size={16} /> Today's Roster ({todayLessons.length})
              </button>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
                onClick={() => setActiveTab('students')}
              >
                <UserCheck size={16} /> Student Progress Log
              </button>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'vehicle' ? 'active' : ''}`}
                onClick={() => setActiveTab('vehicle')}
              >
                <Car size={16} /> Vehicle Safety Check
              </button>
            </div>
          </div>

          {activeTab === 'schedule' && (
            <div className="schedule-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {todayLessons.map((item) => {
                const isDone = item.status === 'completed';
                return (
                  <div key={item.id} className="lesson-card aura-card" style={{ padding: '1.5rem', borderLeft: isDone ? '4px solid #22C55E' : '4px solid #D2B04C' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                      <div>
                        <span className="pill-badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.55rem' }}>{item.timeSlot}</span>
                        <h3 style={{ fontSize: '1.25rem', marginTop: '0.35rem', marginBottom: '0.15rem' }}>{item.studentName}</h3>
                        <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <MapPin size={14} style={{ color: '#D2B04C' }} />
                          <span>{item.location} • {item.transmission}</span>
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button 
                          type="button"
                          onClick={() => handleToggleComplete(item.id)}
                          style={{
                            backgroundColor: isDone ? '#22C55E' : '#07131D',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '0.55rem 1.15rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <CheckCircle2 size={16} />
                          <span>{isDone ? 'LESSON COMPLETED ✓' : 'MARK COMPLETE'}</span>
                        </button>
                      </div>
                    </div>

                    <div style={{ background: '#FAFAF8', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
                      <strong>Instructor Session Notes:</strong> {item.notes}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'students' && (
            <div className="aura-card" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Student Skills Assessment Matrix</h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Track student progress across key Service NSW driving skills competencies:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div style={{ background: '#FAFAF8', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <h4>Jordan Smith (NSW Learner)</h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Logbook: 84 / 120 Hours Completed</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.85rem', fontSize: '0.85rem' }}>
                    <span>Parallel Parking: <strong style={{ color: '#22C55E' }}>Mastered ✓</strong></span>
                    <span>3-Point Turn: <strong style={{ color: '#22C55E' }}>Mastered ✓</strong></span>
                    <span>Kerbside Stop: <strong style={{ color: '#22C55E' }}>Mastered ✓</strong></span>
                    <span>Botany Test Route Audit: <strong style={{ color: '#D2B04C' }}>In Progress</strong></span>
                  </div>
                </div>

                <div style={{ background: '#FAFAF8', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <h4>Emily Watson (NSW Learner)</h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Logbook: 62 / 120 Hours Completed</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.85rem', fontSize: '0.85rem' }}>
                    <span>Parallel Parking: <strong style={{ color: '#D2B04C' }}>In Progress</strong></span>
                    <span>Speed Management: <strong style={{ color: '#22C55E' }}>Mastered ✓</strong></span>
                    <span>Roundabout Merging: <strong style={{ color: '#22C55E' }}>Mastered ✓</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vehicle' && (
            <div className="aura-card" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Dual-Control Fleet Vehicle Checklist</h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Pre-lesson safety verification for <strong>{vehicleRego}</strong>:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
                  <input type="checkbox" defaultChecked />
                  <span>Dual-Brake Pedal Response Tested & Functioning</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
                  <input type="checkbox" defaultChecked />
                  <span>Auxiliary Passenger Rearview Mirror Adjusted</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
                  <input type="checkbox" defaultChecked />
                  <span>Yellow L-Plates & Inspection Signage Mounted Cleanly</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
                  <input type="checkbox" defaultChecked />
                  <span>Dashcam Telemetry & GPS Tracking Active</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DriversPortal;
