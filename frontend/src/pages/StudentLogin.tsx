import React, { useState } from 'react';
import { 
  Gift, 
  Calendar, 
  MessageCircle, 
  Clock
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const StudentLogin: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Student Profile Data
  const [studentData, setStudentData] = useState({
    name: 'Jordan Smith',
    email: 'jordan.smith@example.com',
    phone: '0412 345 678',
    licenceType: 'NSW Learner Licence (L-Plate)',
    logbookHours: 84,
    targetHours: 120,
    referralCode: 'REF-JORDAN20',
    upcomingBooking: {
      id: 'BOOK-984210',
      service: '3-Lesson Driving Combo + Test Warm-up',
      date: '10th Oct 2026',
      timeSlot: '09:30 AM - 11:00 AM',
      location: 'Service NSW Botany Test Centre',
      instructor: 'Instructor Alex Vance'
    }
  });

  const [copiedLink, setCopiedLink] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (authMode === 'register' && fullName) {
      setStudentData(prev => ({ ...prev, name: fullName, email, phone: phone || prev.phone }));
    }
    setIsLoggedIn(true);
  };

  const handleCopyReferral = () => {
    const link = `${window.location.origin}/book?ref=${studentData.referralCode}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const shareWhatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Hey! Use my referral code ${studentData.referralCode} to get $20 OFF your driving lessons with Drivinity Driving Academy: ${window.location.origin}/book?ref=${studentData.referralCode}`)}`;

  if (!isLoggedIn) {
    return (
      <div className="student-login-page">
        <PageHeader 
          tag="STUDENT PORTAL & REWARDS"
          title="STUDENT LOGIN & REGISTRATION."
          subtitle="Track your 120-hour NSW logbook progress, view scheduled lesson bookings, and share your referral code to earn rewards."
          breadcrumb="Student Login"
        />

        <section className="section-padding">
          <div className="container" style={{ maxWidth: '520px' }}>
            <div className="aura-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', marginBottom: '1.75rem' }}>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  style={{
                    flex: 1,
                    padding: '0.85rem 0',
                    border: 'none',
                    background: 'none',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    color: authMode === 'login' ? '#07131D' : '#94A3B8',
                    borderBottom: authMode === 'login' ? '3px solid #D2B04C' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  STUDENT LOGIN
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  style={{
                    flex: 1,
                    padding: '0.85rem 0',
                    border: 'none',
                    background: 'none',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    color: authMode === 'register' ? '#07131D' : '#94A3B8',
                    borderBottom: authMode === 'register' ? '3px solid #D2B04C' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  NEW STUDENT REGISTRATION
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                {authMode === 'register' && (
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Jordan Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="jordan@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {authMode === 'register' && (
                  <div className="form-group">
                    <label className="form-label">Mobile Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="0412 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" variant="yellow" size="lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                  {authMode === 'login' ? 'ACCESS STUDENT PORTAL' : 'CREATE STUDENT ACCOUNT'}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const logbookPercentage = Math.round((studentData.logbookHours / studentData.targetHours) * 100);

  return (
    <div className="student-portal-dashboard">
      <PageHeader 
        tag={`STUDENT PORTAL • WELCOME, ${studentData.name.toUpperCase()}`}
        title="MY DRIVING JOURNEY DASHBOARD."
        subtitle="View your lesson logbook hours, manage scheduled test preparation sessions, and share your promo referral code."
        breadcrumb="Student Dashboard"
      />

      <section className="section-padding">
        <div className="container">
          <div className="aura-card" style={{ padding: '1.5rem 2rem', marginBottom: '2rem', background: '#07131D', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="pill-badge accent" style={{ marginBottom: '0.4rem' }}>{studentData.licenceType}</span>
              <h2 style={{ color: '#D2B04C', margin: 0 }}>{studentData.name}</h2>
              <p style={{ color: '#94A3B8', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
                Contact: {studentData.phone} • {studentData.email}
              </p>
            </div>

            <Button onClick={() => setIsLoggedIn(false)} variant="outline" size="sm">
              LOGOUT
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {/* CARD 1: REFERRAL & PROMO CODE */}
            <div className="aura-card" style={{ padding: '1.85rem', border: '1.5px dashed #D2B04C', background: '#FAFAF8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <Gift size={24} style={{ color: '#D2B04C' }} />
                <h3 style={{ margin: 0, fontSize: '1.35rem' }}>Your Referral & Promo Code</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.25rem' }}>
                Share your personal code with friends. They get <strong>$20 OFF</strong> their lesson booking, and you get <strong>$20 cashback credit</strong>!
              </p>

              <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', padding: '0.85rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>YOUR PROMO CODE:</span>
                  <strong style={{ fontSize: '1.15rem', color: '#07131D', letterSpacing: '0.05em' }}>{studentData.referralCode}</strong>
                </div>
                <button 
                  type="button"
                  onClick={handleCopyReferral}
                  style={{
                    background: '#07131D',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {copiedLink ? 'COPIED! ✓' : 'COPY LINK'}
                </button>
              </div>

              <a 
                href={shareWhatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.65rem',
                  background: '#25D366',
                  color: '#FFFFFF',
                  borderRadius: '20px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  textDecoration: 'none'
                }}
              >
                <MessageCircle size={18} />
                <span>Share Directly via WhatsApp</span>
              </a>
            </div>

            {/* CARD 2: LOGBOOK PROGRESS */}
            <div className="aura-card" style={{ padding: '1.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <Clock size={24} style={{ color: '#D2B04C' }} />
                <h3 style={{ margin: 0, fontSize: '1.35rem' }}>NSW 120-Hour Logbook</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.25rem' }}>
                You have completed <strong>{studentData.logbookHours}</strong> out of <strong>{studentData.targetHours} hours</strong> required for your P1 Licence test.
              </p>

              <div style={{ background: '#E2E8F0', height: '14px', borderRadius: '99px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                <div style={{ width: `${logbookPercentage}%`, background: '#D2B04C', height: '100%', transition: 'width 0.5s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                <span>{logbookPercentage}% Complete</span>
                <span>{studentData.targetHours - studentData.logbookHours} Hours Remaining</span>
              </div>
            </div>

            {/* CARD 3: UPCOMING BOOKING */}
            <div className="aura-card" style={{ padding: '1.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <Calendar size={24} style={{ color: '#D2B04C' }} />
                <h3 style={{ margin: 0, fontSize: '1.35rem' }}>Next Scheduled Session</h3>
              </div>

              <div style={{ background: '#FAFAF8', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)', marginBottom: '1.25rem' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#07131D' }}>{studentData.upcomingBooking.service}</strong>
                <span style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginTop: '0.25rem' }}>
                  📅 {studentData.upcomingBooking.date} @ {studentData.upcomingBooking.timeSlot}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginTop: '0.15rem' }}>
                  📍 {studentData.upcomingBooking.location}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#D2B04C', fontWeight: 700, display: 'block', marginTop: '0.35rem' }}>
                  👨‍🏫 {studentData.upcomingBooking.instructor}
                </span>
              </div>

              <Button to="/book" variant="yellow" size="sm" style={{ width: '100%' }}>
                BOOK ANOTHER LESSON
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLogin;
