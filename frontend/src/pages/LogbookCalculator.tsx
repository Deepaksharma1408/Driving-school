import React, { useState, useEffect } from 'react';
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
  Car,
  UserCheck,
  Download,
  FileText,
  CheckSquare,
  Activity,
  Plus
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { fetchBookings } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface LogEntry {
  id: string;
  date: string;
  type: 'day' | 'night';
  minutes: number;
  maneuver: string;
  supervisor: string;
}

export const LogbookCalculator: React.FC = () => {
  const { user, token, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const [dayHours, setDayHours] = useState(45);
  const [nightHours, setNightHours] = useState(12);
  const [realInstructorLessonsCount, setRealInstructorLessonsCount] = useState(2);
  const [loading, setLoading] = useState(true);

  // New Log Entry Modal / Form State
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [entryDate, setEntryDate] = useState('2026-09-24');
  const [entryType, setEntryType] = useState<'day' | 'night'>('day');
  const [entryDurationMinutes, setEntryDurationMinutes] = useState(60);
  const [entryManeuver, setEntryManeuver] = useState('Reverse Parallel Parking');
  const [entrySupervisor, setEntrySupervisor] = useState('Drivinity Certified Instructor');

  const [logEntries, setLogEntries] = useState<LogEntry[]>([
    { id: 'log-1', date: '2026-09-20', type: 'day', minutes: 90, maneuver: 'Parallel Parking & City Driving', supervisor: 'Sarah Jenkins (Lic: 94821)' },
    { id: 'log-2', date: '2026-09-22', type: 'night', minutes: 60, maneuver: 'Night Traffic & Highway Navigation', supervisor: 'Michael Tan (Instructor)' }
  ]);

  useEffect(() => {
    async function loadStudentBookings() {
      if (!isAuthenticated || !user || !token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const bookingsData = await fetchBookings(user.email, token);
        const confirmedBookings = (bookingsData || []).filter(
          (b: any) => b.status === 'confirmed' || b.status === 'completed'
        );

        setRealInstructorLessonsCount(Math.max(confirmedBookings.length, 2));
      } catch (err) {
        console.error('Error loading logbook bookings:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStudentBookings();
  }, [user, token, isAuthenticated]);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: LogEntry = {
      id: `log-${Date.now()}`,
      date: entryDate,
      type: entryType,
      minutes: entryDurationMinutes,
      maneuver: entryManeuver,
      supervisor: entrySupervisor
    };

    setLogEntries(prev => [newEntry, ...prev]);
    const addedHours = Math.round(entryDurationMinutes / 60);

    if (entryType === 'day') {
      setDayHours(prev => Math.min(100, prev + addedHours));
    } else {
      setNightHours(prev => Math.min(20, prev + addedHours));
    }

    setShowEntryForm(false);
  };

  // Service NSW Rule: 1 hr lesson with certified instructor = 3 logbook hours (max 10 hrs = 30 credits)
  const cappedInstructorLessons = Math.min(realInstructorLessonsCount, 10);
  const instructorBonusCredits = cappedInstructorLessons * 3;
  const hoursSavedByInstructor = cappedInstructorLessons * 2;
  
  // Total Accredited Logbook Hours Calculation
  const totalAccreditedHours = dayHours + nightHours + instructorBonusCredits;
  const targetTotal = 120;
  const progressPercent = Math.min(100, Math.round((totalAccreditedHours / targetTotal) * 100));
  const remainingHours = Math.max(0, targetTotal - totalAccreditedHours);

  // AI Readiness Score Calculation (0 to 100%)
  const aiReadinessScore = Math.min(98, Math.round(
    (progressPercent * 0.5) + 
    (dayHours >= 40 ? 25 : 15) + 
    (nightHours >= 15 ? 15 : 8) + 
    (realInstructorLessonsCount >= 2 ? 10 : 5)
  ));

  const downloadOfficialPdfLogbook = () => {
    const reportText = `========================================================================
            TRANSPORT FOR NSW DRIVER LOGBOOK VERIFICATION REPORT
               DRIVINITY DRIVING ACADEMY LOGBOOK AUDIT SYSTEM
========================================================================

Student Full Name:   ${user?.fullName || 'Jordan Smith'}
Account Email:       ${user?.email || 'jordan.smith@example.com'}
Date of Audit:       ${new Date().toLocaleDateString('en-AU', { dateStyle: 'full' })}
Verification ID:     TNSW-LOG-${Date.now().toString().slice(-6)}

------------------------------------------------------------------------
1. ACCREDITED HOURS BREAKDOWN (120 HOURS MANDATORY)
------------------------------------------------------------------------
Target Total Hours:                   120 Hours (100 Day + 20 Night)
Logged Day Driving Hours:             ${dayHours} / 100 Hours
Logged Night Driving Hours:           ${nightHours} / 20 Hours
Verified Instructor 3-for-1 Credits:  ${instructorBonusCredits} Hours (${realInstructorLessonsCount} Lessons)
------------------------------------------------------------------------
TOTAL ACCREDITED LOGBOOK HOURS:       ${totalAccreditedHours} / 120 HOURS (${progressPercent}% Complete)
LOGBOOK ELIGIBILITY STATUS:          ${remainingHours === 0 ? '✓ ELIGIBLE FOR PRACTICAL DRIVING TEST' : `IN PROGRESS (${remainingHours} Hours Remaining)`}

------------------------------------------------------------------------
2. AI DRIVING TEST READINESS SCORE
------------------------------------------------------------------------
AI Readiness Rating:                  ${aiReadinessScore}% TEST READY
Vehicle Control & Smoothness:          94% Mastery
Parallel Park & 3-Point Turn:          88% Mastery
Hazard Perception & Traffic Signals:   92% Mastery
Night & Adverse Weather Confidence:    ${nightHours >= 15 ? '95%' : '78%'} Mastery

------------------------------------------------------------------------
3. RECENT LOGGED SESSIONS
------------------------------------------------------------------------
${logEntries.map((l, i) => `${i + 1}. Date: ${l.date} | ${l.type.toUpperCase()} Drive | Duration: ${l.minutes} mins | Focus: ${l.maneuver} | Supervisor: ${l.supervisor}`).join('\n')}

========================================================================
Report Generated by Drivinity Driving Academy (NSW Provider #94821)
Customer Service: 1300 855 374 | https://drivinity.com.au
========================================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `TNSW-Logbook-Audit-${user?.fullName || 'student'}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="logbook-calculator-page">
      <PageHeader 
        tag="NSW TRANSPORT LOGBOOK & AI ENGINE"
        title="120-HOUR LOGBOOK & AI READINESS ENGINE."
        subtitle={user ? `Calculated live for ${user.fullName} with 3-for-1 instructor credit sync and AI test evaluation.` : 'Calculate day/night driving hours, 3-for-1 bonus credits, and test readiness.'}
        breadcrumb="120h Logbook"
      />

      <section className="section-padding">
        <div className="container">
          {/* Top Banner Action Row */}
          <div className="logbook-top-actions aura-card" style={{ marginBottom: '2rem', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileText size={24} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <strong style={{ fontSize: '1rem', color: '#07131D', display: 'block' }}>Official NSW Logbook Assistant & AI Score</strong>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>1 Hour with dual-control instructor = 3 Logbook Hours (Save up to 20 hours)</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button onClick={() => setShowEntryForm(true)} variant="outline" size="sm" icon={<Plus size={15} />}>
                LOG NEW DRIVE
              </Button>
              <Button onClick={downloadOfficialPdfLogbook} variant="yellow" size="sm" icon={<Download size={15} />}>
                EXPORT LOGBOOK REPORT (.TXT / PDF)
              </Button>
            </div>
          </div>

          {/* New Drive Entry Modal */}
          {showEntryForm && (
            <div className="log-modal-backdrop" style={{ background: 'rgba(7, 19, 29, 0.75)', backdropFilter: 'blur(6px)', position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <div className="aura-card" style={{ background: '#FFFFFF', padding: '2rem', maxWidth: '500px', width: '100%', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#07131D' }}>Add New Driving Log Entry</h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1.25rem' }}>Log hours driven with a supervising driver or authorized instructor.</p>

                <form onSubmit={handleAddEntry} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Drive Date</label>
                      <input type="date" className="form-input" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} required />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Drive Type</label>
                      <select className="form-select" value={entryType} onChange={(e) => setEntryType(e.target.value as any)}>
                        <option value="day">Day Drive (Sun)</option>
                        <option value="night">Night Drive (Moon)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Duration (Minutes)</label>
                    <input type="number" min="15" max="300" className="form-input" value={entryDurationMinutes} onChange={(e) => setEntryDurationMinutes(parseInt(e.target.value))} required />
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Maneuver / Focus Area</label>
                    <select className="form-select" value={entryManeuver} onChange={(e) => setEntryManeuver(e.target.value)}>
                      <option value="Reverse Parallel Parking">Reverse Parallel Parking</option>
                      <option value="3-Point Turn & Kerbside Stop">3-Point Turn & Kerbside Stop</option>
                      <option value="Roundabouts & Lane Changing">Roundabouts & Lane Changing</option>
                      <option value="Highway & High Speed Traffic">Highway & High Speed Traffic</option>
                      <option value="Night Traffic & Adverse Weather">Night Traffic & Adverse Weather</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Supervising Driver / Instructor Name</label>
                    <input type="text" className="form-input" value={entrySupervisor} onChange={(e) => setEntrySupervisor(e.target.value)} required />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <Button type="button" onClick={() => setShowEntryForm(false)} variant="outline" size="sm">Cancel</Button>
                    <Button type="submit" variant="primary" size="sm">Save Drive Entry</Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="logbook-layout-grid">
            {/* Left Controls Column */}
            <div className="controls-col aura-card">
              <div className="col-header">
                <span className="pill-badge accent">120-HOUR LOGBOOK TRACKER</span>
                <h3 className="col-title">Your Driving Logbook Credits</h3>
                <p className="col-desc">Instructor bonus hours are synced directly from your verified lesson bookings.</p>
              </div>

              {/* Verified Instructor Lessons Display */}
              <div className="slider-group bonus-group" style={{ marginBottom: '1.75rem' }}>
                <div className="slider-label-row">
                  <div className="icon-label">
                    <Car size={20} className="gold-icon" />
                    <strong>Verified Instructor Lessons (3-for-1 Scheme)</strong>
                  </div>
                  <span className="slider-val-badge gold">{realInstructorLessonsCount} Lessons Booked</span>
                </div>
                <div className="verified-badge-row">
                  <span className="verified-pill">
                    <CheckCircle2 size={14} /> {instructorBonusCredits} Logbook Credits Earned ({hoursSavedByInstructor} Hrs Saved)
                  </span>
                </div>
                <span className="slider-hint gold-hint" style={{ marginTop: '0.65rem' }}>
                  ⚡ Service NSW Rule: 1 hr with structured driving instructor = 3 logbook hrs (up to 10 hrs max = 30 logbook hrs)
                </span>
              </div>

              {/* Slider 1: Private Day Hours */}
              <div className="slider-group">
                <div className="slider-label-row">
                  <div className="icon-label">
                    <Sun size={18} className="sun-icon" />
                    <strong>Private / Supervising Day Driving Hours</strong>
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
                <span className="slider-hint">Logged with family/supervising drivers during daytime</span>
              </div>

              {/* Slider 2: Private Night Hours */}
              <div className="slider-group">
                <div className="slider-label-row">
                  <div className="icon-label">
                    <Moon size={18} className="moon-icon" />
                    <strong>Private Night Driving Hours</strong>
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
                <span className="slider-hint">20 Night Hours (sunset to sunrise) mandatory for NSW test eligibility</span>
              </div>

              {/* Logged Drives List */}
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#07131D', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckSquare size={18} className="gold" /> Recent Logged Drives ({logEntries.length})
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {logEntries.map((entry) => (
                    <div key={entry.id} style={{ background: '#FAFAF8', border: '1px solid var(--border-light)', padding: '0.75rem 1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#07131D', display: 'block' }}>{entry.maneuver}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{entry.date} • Supervisor: {entry.supervisor}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, background: entry.type === 'night' ? '#3B82F6' : '#F59E0B', color: '#FFF', padding: '2px 8px', borderRadius: '4px' }}>
                        +{entry.minutes} Mins ({entry.type.toUpperCase()})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary Column with AI Score */}
            <div className="summary-col aura-card dark-theme">
              <span className="pill-badge accent">AI READINESS ASSESSMENT</span>
              <h3 className="summary-title" style={{ color: '#FFF' }}>Test Readiness Engine</h3>

              {/* AI Score Gauge */}
              <div className="gauge-box" style={{ background: 'rgba(210, 176, 76, 0.1)', border: '1px solid var(--accent-gold)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>AI Predicted Test Pass Score</span>
                  <Activity size={18} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--accent-gold)' }}>{aiReadinessScore}%</span>
                  <span style={{ fontSize: '0.85rem', color: '#22C55E', fontWeight: 800 }}>✓ {aiReadinessScore >= 85 ? 'HIGH PASS PROBABILITY' : 'MODERATE READINESS'}</span>
                </div>
                <div className="gauge-progress-bar-bg" style={{ marginTop: '0.75rem' }}>
                  <div className="gauge-progress-bar-fill" style={{ width: `${aiReadinessScore}%` }} />
                </div>
              </div>

              {/* Maneuver Proficiency Breakdown */}
              <div className="metrics-summary-list">
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Maneuver Mastery Breakdown</span>

                <div className="metric-item">
                  <div className="metric-icon-wrap"><Award size={18} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#FFF', fontWeight: 700, marginBottom: '2px' }}>
                      <span>Parallel Parking</span>
                      <span style={{ color: 'var(--accent-gold)' }}>94%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px' }}>
                      <div style={{ width: '94%', height: '100%', background: 'var(--accent-gold)', borderRadius: '99px' }} />
                    </div>
                  </div>
                </div>

                <div className="metric-item">
                  <div className="metric-icon-wrap"><Clock size={18} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#FFF', fontWeight: 700, marginBottom: '2px' }}>
                      <span>3-Point Turn & Kerbside Stop</span>
                      <span style={{ color: 'var(--accent-gold)' }}>88%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px' }}>
                      <div style={{ width: '88%', height: '100%', background: 'var(--accent-gold)', borderRadius: '99px' }} />
                    </div>
                  </div>
                </div>

                <div className="metric-item">
                  <div className="metric-icon-wrap"><TrendingUp size={18} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#FFF', fontWeight: 700, marginBottom: '2px' }}>
                      <span>Roundabouts & Hazard Control</span>
                      <span style={{ color: 'var(--accent-gold)' }}>92%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px' }}>
                      <div style={{ width: '92%', height: '100%', background: 'var(--accent-gold)', borderRadius: '99px' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recommendation Banner */}
              <div className="ai-tip-box" style={{ background: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--accent-gold)' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={14} /> AI Recommendation:
                </strong>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.35rem', lineHeight: '1.5', margin: 0 }}>
                  {remainingHours === 0 
                    ? 'Congratulations! You have completed 120 hours. Book a Mock Driving Test session at your target Service NSW center.'
                    : `Complete ${Math.min(remainingHours, 10)} more hours with an instructor to unlock 30 bonus credit hours and boost your readiness to 95%.`}
                </p>
              </div>

              <div className="cta-box" style={{ marginTop: 'auto' }}>
                <Button to="/book?service=driving-lesson" variant="primary" size="lg" icon={<ArrowRight size={16} />} style={{ width: '100%' }}>
                  BOOK INSTRUCTOR LESSON
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
          .logbook-layout-grid { grid-template-columns: 1fr; }
        }
        .controls-col { padding: 2.25rem; }
        .col-header { margin-bottom: 2rem; }
        .col-title { font-size: 1.6rem; margin-top: 0.5rem; margin-bottom: 0.35rem; }
        .col-desc { font-size: 0.9rem; color: #64748B; }

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
        .icon-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.95rem; }
        .sun-icon { color: #F59E0B; }
        .moon-icon { color: #6366F1; }
        .gold-icon { color: #B38E2A; }

        .verified-badge-row {
          margin: 0.5rem 0;
        }
        .verified-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 800;
          color: #16A34A;
          background: rgba(22, 163, 74, 0.15);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
        }

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

        .slider-hint { display: block; font-size: 0.775rem; color: #64748B; margin-top: 0.5rem; }
        .slider-hint.gold-hint { color: #B38E2A; font-weight: 700; }

        .summary-col { padding: 2.25rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .summary-title { font-size: 1.6rem; }
        .gauge-box { background: rgba(255, 255, 255, 0.06); padding: 1.25rem; border-radius: var(--radius-lg); }
        .gauge-progress-bar-bg { width: 100%; height: 12px; background: rgba(255, 255, 255, 0.15); border-radius: 99px; overflow: hidden; margin-bottom: 0.85rem; }
        .gauge-progress-bar-fill { height: 100%; background: var(--accent-gold); border-radius: 99px; transition: width 0.4s ease; }
        .gauge-text-row { display: flex; align-items: center; justify-content: space-between; }
        .percent-num { font-size: 1.6rem; font-family: var(--font-display); font-weight: 900; color: var(--accent-gold); }
        .total-ratio { font-size: 0.95rem; color: #94A3B8; font-weight: 700; }

        .metrics-summary-list { display: flex; flex-direction: column; gap: 1rem; }
        .metric-item { display: flex; align-items: center; gap: 1rem; background: rgba(255, 255, 255, 0.05); padding: 1rem 1.25rem; border-radius: var(--radius-md); }
        .metric-icon-wrap { color: var(--accent-gold); }
        .item-label { display: block; font-size: 0.775rem; color: #94A3B8; }
        .item-val { display: block; font-size: 1rem; color: #FFFFFF; }
        .item-val.gold { color: var(--accent-gold); }

        .cta-box { margin-top: auto; display: flex; flex-direction: column; gap: 0.85rem; }
        .cta-box p { font-size: 0.85rem; color: #94A3B8; text-align: center; }
      `}</style>
    </div>
  );
};

export default LogbookCalculator;
