import React, { useState } from 'react';
import { 
  Navigation, 
  Car, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  Radio
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const LiveTracking: React.FC = () => {
  const [bookingId, setBookingId] = useState('BOOK-847291');
  const [isTracking, setIsTracking] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId.trim()) return;
    setIsTracking(true);
  };

  return (
    <div className="live-tracking-page">
      <PageHeader 
        tag="REAL-TIME TELEMETRY & PARENT MODE"
        title="LIVE LESSON GPS MAP TRACKER."
        subtitle="Track live student driving lesson routes, vehicle speed, and instructor dual-control safety status in real time."
        breadcrumb="GPS Tracking"
      />

      <section className="section-padding">
        <div className="container">
          {/* Booking ID Search Bar */}
          <div className="tracking-search-card aura-card" style={{ maxWidth: '640px', margin: '0 auto 2.5rem auto' }}>
            <form onSubmit={handleSearch} className="tracking-search-form">
              <div className="search-input-wrap">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  className="form-input search-input" 
                  placeholder="Enter Booking Reference ID (e.g. BOOK-847291)..."
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="yellow" size="md">
                TRACK LESSON
              </Button>
            </form>
          </div>

          {isTracking && (
            <div className="tracking-display-grid">
              {/* Map Screen Container */}
              <div className="map-view-card aura-card dark-theme">
                <div className="map-top-bar">
                  <div className="live-status-indicator">
                    <Radio size={16} className="pulse-red" />
                    <span>LIVE GPS FEED • BOTANY ROUTE #2</span>
                  </div>
                  <span className="speed-badge">42 KM/H</span>
                </div>

                {/* Simulated Visual Route Track */}
                <div className="simulated-map-canvas">
                  <div className="map-route-line" />
                  
                  <div className="moving-car-indicator">
                    <Car size={24} className="car-icon" />
                    <span className="car-label">Instructor Alex • Corolla</span>
                  </div>

                  <div className="checkpoint-marker start">
                    <MapPin size={18} />
                    <span>Pickup: Mascot</span>
                  </div>

                  <div className="checkpoint-marker end">
                    <MapPin size={18} />
                    <span>Service NSW Botany</span>
                  </div>
                </div>
              </div>

              {/* Telemetry Sidebar */}
              <div className="telemetry-card aura-card">
                <span className="pill-badge accent">VEHICLE TELEMETRY</span>
                <h3 className="telemetry-title">Session Telemetry</h3>

                <div className="telemetry-list">
                  <div className="tele-item">
                    <ShieldCheck size={20} className="green" />
                    <div>
                      <span className="tele-label">Safety Status</span>
                      <strong className="tele-val green">100% SAFE • DUAL CONTROL ACTIVE</strong>
                    </div>
                  </div>

                  <div className="tele-item">
                    <Car size={20} className="gold" />
                    <div>
                      <span className="tele-label">Assigned Instructor & Car</span>
                      <strong className="tele-val">Alex Vance (Toyota Corolla Dual-Control)</strong>
                    </div>
                  </div>

                  <div className="tele-item">
                    <Clock size={20} className="gold" />
                    <div>
                      <span className="tele-label">Elapsed / Remaining Time</span>
                      <strong className="tele-val">38 Mins Completed (22 Mins Remaining)</strong>
                    </div>
                  </div>
                </div>

                <div className="checkpoints-box">
                  <span className="box-title">Lesson Milestones Completed:</span>
                  <div className="check-row">
                    <CheckCircle2 size={16} className="green" />
                    <span>Parallel Parking Practice — PASSED</span>
                  </div>
                  <div className="check-row">
                    <CheckCircle2 size={16} className="green" />
                    <span>Kerbside Stop & Signal — PASSED</span>
                  </div>
                  <div className="check-row">
                    <Clock size={16} className="gold" />
                    <span>Roundabout Merging — IN PROGRESS</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .tracking-search-form {
          display: flex;
          gap: 0.75rem;
        }
        @media (max-width: 600px) {
          .tracking-search-form { flex-direction: column; }
        }
        .search-input-wrap {
          flex: 1;
          position: relative;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94A3B8;
        }
        .search-input {
          padding-left: 2.75rem !important;
        }

        .tracking-display-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2rem;
        }
        @media (max-width: 900px) {
          .tracking-display-grid { grid-template-columns: 1fr; }
        }

        .map-view-card {
          padding: 1.5rem;
          min-height: 420px;
          display: flex;
          flex-direction: column;
        }
        .map-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .live-status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.775rem;
          font-weight: 800;
          color: #EF4444;
          letter-spacing: 0.04em;
        }
        .pulse-red {
          animation: pulseRed 1.5s infinite;
        }
        @keyframes pulseRed {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .speed-badge {
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 900;
          background: rgba(210, 176, 76, 0.2);
          color: var(--accent-gold);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--accent-gold);
        }

        .simulated-map-canvas {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          min-height: 300px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .map-route-line {
          position: absolute;
          width: 80%;
          height: 4px;
          background: repeating-linear-gradient(90deg, var(--accent-gold) 0, var(--accent-gold) 15px, transparent 15px, transparent 25px);
          top: 50%;
        }
        .moving-car-indicator {
          position: absolute;
          top: calc(50% - 24px);
          left: 55%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          animation: carDrive 4s infinite ease-in-out alternate;
        }
        @keyframes carDrive {
          from { left: 25%; }
          to { left: 70%; }
        }
        .car-icon {
          color: var(--accent-gold);
        }
        .car-label {
          font-size: 0.7rem;
          font-weight: 800;
          background: #07131D;
          color: #FFFFFF;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          border: 1px solid var(--accent-gold);
          white-space: nowrap;
        }

        .checkpoint-marker {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: #94A3B8;
        }
        .checkpoint-marker.start { left: 10%; top: 40%; }
        .checkpoint-marker.end { right: 10%; top: 40%; }

        .telemetry-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .telemetry-title {
          font-size: 1.6rem;
        }
        .telemetry-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .tele-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          background: #FAFAF8;
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
        }
        .tele-label {
          display: block;
          font-size: 0.75rem;
          color: #64748B;
        }
        .tele-val {
          display: block;
          font-size: 0.9rem;
          color: #07131D;
        }
        .green { color: #16A34A; }
        .gold { color: #B38E2A; }

        .checkpoints-box {
          background: #FAFAF8;
          border: 1px solid var(--border-light);
          padding: 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .box-title {
          font-size: 0.8rem;
          font-weight: 800;
          color: #07131D;
          margin-bottom: 0.25rem;
        }
        .check-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.825rem;
          color: #475569;
        }
      `}</style>
    </div>
  );
};
