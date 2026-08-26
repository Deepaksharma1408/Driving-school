import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Car
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { TEST_LOCATIONS } from '../data/content';

export const Schedule: React.FC = () => {
  const [selectedInstructor, setSelectedInstructor] = useState('Alex Vance (Botany Specialist)');
  const [selectedDate, setSelectedDate] = useState('2026-08-28');
  const [selectedSlot, setSelectedSlot] = useState('09:00 AM - 10:30 AM');

  const INSTRUCTORS = [
    'Alex Vance (Botany Specialist)',
    'Sarah Jenkins (Rockdale & Miranda Specialist)',
    'David Kumar (Silverwater & Marrickville)'
  ];

  const TIME_SLOTS = [
    { time: '07:30 AM - 09:00 AM', status: 'available' },
    { time: '09:00 AM - 10:30 AM', status: 'available' },
    { time: '11:00 AM - 12:30 PM', status: 'booked' },
    { time: '01:30 PM - 03:00 PM', status: 'available' },
    { time: '03:30 PM - 05:00 PM', status: 'available' },
    { time: '05:30 PM - 07:00 PM (Sunset)', status: 'available' }
  ];

  return (
    <div className="schedule-page">
      <PageHeader 
        tag="REAL-TIME DISPATCH CALENDAR"
        title="LIVE INSTRUCTOR SCHEDULE & SLOT PICKER."
        subtitle="Select your preferred driving instructor, pick an open 90-minute slot, and reserve your driving session instantly."
        breadcrumb="Schedule Calendar"
      />

      <section className="section-padding">
        <div className="container">
          <div className="schedule-grid">
            {/* Calendar Controls */}
            <div className="schedule-controls-card aura-card">
              <div className="card-top">
                <span className="pill-badge accent">SELECT INSTRUCTOR & DATE</span>
                <h3>Live Availability Dispatch</h3>
              </div>

              {/* Instructor Selector */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Select Authorized Instructor</label>
                <select 
                  className="form-select"
                  value={selectedInstructor}
                  onChange={(e) => setSelectedInstructor(e.target.value)}
                >
                  {INSTRUCTORS.map((inst, i) => (
                    <option key={i} value={inst}>{inst}</option>
                  ))}
                </select>
              </div>

              {/* Date Input */}
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label">Select Lesson Date</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              {/* Open Slots Grid */}
              <div className="slots-picker-section">
                <label className="form-label">Available 90-Minute Time Slots for {selectedDate}</label>
                <div className="slots-grid-picker">
                  {TIME_SLOTS.map((slot, i) => {
                    const isBooked = slot.status === 'booked';
                    const isSelected = selectedSlot === slot.time;
                    return (
                      <button 
                        key={i}
                        type="button"
                        disabled={isBooked}
                        className={`slot-picker-btn ${isSelected ? 'active' : ''} ${isBooked ? 'booked' : ''}`}
                        onClick={() => setSelectedSlot(slot.time)}
                      >
                        <Clock size={14} />
                        <span>{slot.time}</span>
                        {isBooked && <span className="booked-tag">BOOKED</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Reservation Summary */}
            <div className="reservation-summary-card aura-card dark-theme">
              <span className="pill-badge accent">RESERVATION OVERVIEW</span>
              <h3 className="summary-title" style={{ color: '#FFF' }}>Selected Appointment</h3>

              <div className="reservation-details-list">
                <div className="res-item">
                  <User size={18} className="gold" />
                  <div>
                    <span className="res-label">Instructor</span>
                    <strong className="res-val">{selectedInstructor}</strong>
                  </div>
                </div>

                <div className="res-item">
                  <CalendarIcon size={18} className="gold" />
                  <div>
                    <span className="res-label">Target Date & Time</span>
                    <strong className="res-val">{selectedDate} @ {selectedSlot}</strong>
                  </div>
                </div>

                <div className="res-item">
                  <Car size={18} className="gold" />
                  <div>
                    <span className="res-label">Vehicle</span>
                    <strong className="res-val">2025 Dual-Control Automatic Car</strong>
                  </div>
                </div>
              </div>

              <div className="res-cta-box">
                <Button 
                  to={`/book?date=${selectedDate}&time=${encodeURIComponent(selectedSlot)}`} 
                  variant="yellow" 
                  size="lg" 
                  icon={<ArrowRight size={16} />}
                  style={{ width: '100%' }}
                >
                  CONFIRM & PROCEED TO BOOKING
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .schedule-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2rem;
        }
        @media (max-width: 900px) {
          .schedule-grid { grid-template-columns: 1fr; }
        }
        .schedule-controls-card {
          padding: 2.25rem;
        }
        .card-top {
          margin-bottom: 1.75rem;
        }
        .card-top h3 {
          font-size: 1.6rem;
          margin-top: 0.5rem;
        }

        .slots-grid-picker {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
          margin-top: 0.5rem;
        }
        @media (max-width: 600px) {
          .slots-grid-picker { grid-template-columns: 1fr; }
        }

        .slot-picker-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          padding: 0.85rem 1rem;
          background: #FAFAF8;
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          font-size: 0.825rem;
          font-weight: 700;
          color: #07131D;
          cursor: pointer;
          transition: all 0.2s;
        }
        .slot-picker-btn:hover:not(:disabled) {
          border-color: var(--accent-gold);
          background: #FFFFFF;
        }
        .slot-picker-btn.active {
          background: #07131D;
          color: #FFFFFF;
          border-color: #07131D;
        }
        .slot-picker-btn.booked {
          opacity: 0.5;
          cursor: not-allowed;
          background: #F1F5F9;
        }
        .booked-tag {
          font-size: 0.65rem;
          font-weight: 800;
          color: #EF4444;
          background: rgba(239, 68, 68, 0.15);
          padding: 0.1rem 0.45rem;
          border-radius: 4px;
        }

        .reservation-summary-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .reservation-details-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 1.35rem;
          border-radius: var(--radius-md);
        }
        .res-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }
        .gold { color: var(--accent-gold); margin-top: 2px; }
        .res-label {
          display: block;
          font-size: 0.775rem;
          color: #94A3B8;
        }
        .res-val {
          display: block;
          font-size: 0.95rem;
          color: #FFFFFF;
        }
        .res-cta-box {
          margin-top: auto;
        }
      `}</style>
    </div>
  );
};
