import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Car, 
  User, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { SERVICES, TEST_LOCATIONS, BRAND_INFO } from '../data/content';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { createBooking } from '../services/api';

export const Book: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || 'driving-lesson';
  const initialLocation = searchParams.get('location') || 'loc-01';

  // Multi-step state: 1: Service, 2: Location, 3: Date/Time, 4: Student Details, 5: Review & Confirmed
  const [step, setStep] = useState<number>(1);

  const [booking, setBooking] = useState({
    serviceId: initialService,
    locationId: initialLocation,
    transmission: 'automatic',
    date: '2026-09-10',
    timeSlot: '09:00 AM - 10:30 AM',
    fullName: '',
    email: '',
    phone: '',
    licenceType: 'NSW Learner Licence',
    pickupAddress: '',
    notes: ''
  });

  const [isCompleted, setIsCompleted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (searchParams.get('service')) {
      setBooking(prev => ({ ...prev, serviceId: searchParams.get('service') || prev.serviceId }));
    }
    if (searchParams.get('location')) {
      setBooking(prev => ({ ...prev, locationId: searchParams.get('location') || prev.locationId }));
    }
  }, [searchParams]);

  const selectedServiceObj = SERVICES.find(s => s.id === booking.serviceId) || SERVICES[0];
  const selectedLocationObj = TEST_LOCATIONS.find(l => l.id === booking.locationId) || TEST_LOCATIONS[0];

  const timeSlots = [
    '07:30 AM - 09:00 AM (Early Slot)',
    '09:30 AM - 11:00 AM (Morning Test Prep)',
    '11:30 AM - 01:00 PM (Midday Session)',
    '02:00 PM - 03:30 PM (Afternoon Traffic)',
    '04:00 PM - 05:30 PM (School Zone & Peak)',
    '05:45 PM - 07:15 PM (Twilight/Dusk Drive)'
  ];

  const nextStep = () => {
    if (step === 4) {
      if (!booking.fullName || !booking.email || !booking.phone) {
        alert('Please fill in your name, email, and phone number to continue.');
        return;
      }
    }
    setStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    const res = await createBooking(booking);
    setSubmitting(false);
    if (res && res.bookingId) {
      setBookingRef(res.bookingId);
    }
    setIsCompleted(true);
  };

  const downloadICalFile = () => {
    const title = `Canguruber Driving Session: ${selectedServiceObj.title}`;
    const description = `Driving Lesson / Test Hire with Canguruber Driving School at ${selectedLocationObj.name}. Reference ID: ${bookingRef || 'BOOK-CONFIRMED'}`;
    const locationName = selectedLocationObj.name;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Canguruber Driving School//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${locationName}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `canguruber-booking-${bookingRef || 'session'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="book-page">
      <PageHeader 
        tag="ONLINE BOOKING WIZARD"
        title="SCHEDULE YOUR DRIVING SESSION."
        subtitle="Select your preferred service, Service NSW test location, date, and time slot. Instant UI mock booking confirmation."
        breadcrumb="Book Online"
      />

      <section className="book-page-section">
        <div className="container">
          {/* Progress Indicator with Moving Car Badge & High Contrast Numbers */}
          {!isCompleted && (
            <div className="booking-stepper-wrapper aura-card">
              <div className="stepper-road-track">
                {/* Background Road Line */}
                <div className="stepper-road-line-bg" />
                
                {/* Active Progress Line */}
                <div 
                  className="stepper-road-line-active" 
                  style={{ width: `${((step - 1) / 4) * 100}%` }} 
                />

                {/* Moving Driving Car Badge */}
                <div 
                  className="stepper-car-badge" 
                  style={{ left: `calc(${((step - 1) / 4) * 100}% - 18px)` }}
                  title={`Driving to Step ${step}`}
                >
                  <Car size={18} />
                </div>

                {/* Step Nodes 1 through 5 */}
                {[
                  { num: 1, label: 'Select Service' },
                  { num: 2, label: 'Location / Centre' },
                  { num: 3, label: 'Date & Time' },
                  { num: 4, label: 'Student Details' },
                  { num: 5, label: 'Review' }
                ].map((item) => {
                  const isDone = step > item.num;
                  const isActive = step === item.num;
                  return (
                    <div 
                      key={item.num} 
                      className={`step-node ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
                      onClick={() => { if (isDone) setStep(item.num); }}
                      title={isDone ? `Return to Step ${item.num}` : `Step ${item.num}: ${item.label}`}
                    >
                      <div className="node-num-wrapper">
                        <span className="node-num">
                          {isDone ? `✓ ${item.num}` : item.num}
                        </span>
                      </div>
                      <span className="node-label">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="booking-layout-grid">
            {/* Main Interactive Form Body */}
            <div className="booking-main-col">
              {isCompleted ? (
                /* Success Screen */
                <div className="booking-success-card aura-card text-center">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={64} className="success-check-icon" />
                  </div>
                  <span className="pill-badge accent">MOCK BOOKING CONFIRMED</span>
                  <h2 className="success-title">Your Driving Session Request is Reserved!</h2>
                  <p className="success-p">
                    Thank you, <strong>{booking.fullName}</strong>. Your instructor will confirm your test slot via SMS and email.
                  </p>

                  <div className="booking-summary-receipt aura-card">
                    <h4>Booking Summary & Receipt</h4>
                    {bookingRef && (
                      <div className="receipt-row" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                        <span>Booking Reference:</span>
                        <strong style={{ color: 'var(--accent-primary)', fontSize: '1.05rem' }}>{bookingRef}</strong>
                      </div>
                    )}
                    <div className="receipt-row">
                      <span>Service:</span>
                      <strong>{selectedServiceObj.title} ({selectedServiceObj.pricePlaceholder})</strong>
                    </div>
                    <div className="receipt-row">
                      <span>Location:</span>
                      <strong>{selectedLocationObj.name}</strong>
                    </div>
                    <div className="receipt-row">
                      <span>Date & Time:</span>
                      <strong>{booking.date} @ {booking.timeSlot}</strong>
                    </div>
                    <div className="receipt-row">
                      <span>Contact:</span>
                      <strong>{booking.phone} ({booking.email})</strong>
                    </div>
                    <div className="receipt-row">
                      <span>Licence Status:</span>
                      <strong>{booking.licenceType}</strong>
                    </div>
                  </div>

                  <div className="success-actions">
                    <Button onClick={downloadICalFile} variant="yellow" size="lg" icon={<CalendarIcon size={16} />}>
                      ADD TO CALENDAR (.ICS)
                    </Button>
                    <Button onClick={() => { setIsCompleted(false); setStep(1); }} variant="primary" size="lg">
                      Book Another Session
                    </Button>
                    <Button to="/" variant="outline" size="lg">
                      Return to Homepage
                    </Button>
                  </div>
                </div>
              ) : (
                /* Multi-Step Wizard */
                <div className="booking-step-container aura-card">
                  {/* STEP 1: SERVICE SELECTION */}
                  {step === 1 && (
                    <div className="step-content">
                      <div className="step-heading-row">
                        <span className="pill-badge accent">STEP 1 OF 5</span>
                        <h3 className="step-title">Choose Your Training or Test Service</h3>
                        <p className="step-desc">Select whether you need driving instruction, practical test car rental, or the combined package.</p>
                      </div>

                      <div className="service-select-grid">
                        {SERVICES.map((s) => {
                          const isSelected = booking.serviceId === s.id;
                          return (
                            <div 
                              key={s.id} 
                              className={`service-option-card ${isSelected ? 'selected' : ''}`}
                              onClick={() => setBooking({ ...booking, serviceId: s.id })}
                            >
                              <div className="option-top">
                                <span className="option-num">{s.number}</span>
                                <span className="option-price">{s.pricePlaceholder}</span>
                              </div>
                              <h4 className="option-title">{s.title}</h4>
                              <p className="option-desc">{s.shortDesc}</p>
                              <span className="option-badge">{s.badge}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: LOCATION SELECTION */}
                  {step === 2 && (
                    <div className="step-content">
                      <div className="step-heading-row">
                        <span className="pill-badge accent">STEP 2 OF 5</span>
                        <h3 className="step-title">Select Your Service NSW Test Centre / Region</h3>
                        <p className="step-desc">Choose the testing center where you will take your test or nearby training suburb.</p>
                      </div>

                      <div className="location-select-grid">
                        {TEST_LOCATIONS.map((loc) => {
                          const isSelected = booking.locationId === loc.id;
                          return (
                            <div 
                              key={loc.id} 
                              className={`location-option-card ${isSelected ? 'selected' : ''}`}
                              onClick={() => setBooking({ ...booking, locationId: loc.id })}
                            >
                              <div className="loc-card-header">
                                <MapPin size={20} className="loc-pin" />
                                <span className="loc-code">{loc.code}</span>
                              </div>
                              <h4 className="loc-name">{loc.name}</h4>
                              <p className="loc-desc">{loc.description}</p>
                              <span className="loc-type-tag">{loc.testCenterType}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: DATE & TIME */}
                  {step === 3 && (
                    <div className="step-content">
                      <div className="step-heading-row">
                        <span className="pill-badge accent">STEP 3 OF 5</span>
                        <h3 className="step-title">Select Preferred Date & Starting Time</h3>
                        <p className="step-desc">Pick your target lesson or test appointment date and preferred time window.</p>
                      </div>

                      <div className="datetime-grid">
                        <div className="form-group">
                          <label className="form-label">Select Date</label>
                          <div className="input-with-icon">
                            <input 
                              type="date" 
                              className="form-input" 
                              value={booking.date}
                              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Select Transmission Type</label>
                          <div className="transmission-toggle">
                            <button 
                              type="button" 
                              className={`trans-btn ${booking.transmission === 'automatic' ? 'active' : ''}`}
                              onClick={() => setBooking({ ...booking, transmission: 'automatic' })}
                            >
                              Automatic Transmission (Default)
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="timeslots-section">
                        <label className="form-label">Available Time Windows</label>
                        <div className="slots-grid">
                          {timeSlots.map((slot, i) => (
                            <button 
                              key={i} 
                              type="button" 
                              className={`slot-chip ${booking.timeSlot === slot ? 'active' : ''}`}
                              onClick={() => setBooking({ ...booking, timeSlot: slot })}
                            >
                              <Clock size={14} />
                              <span>{slot}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: STUDENT DETAILS */}
                  {step === 4 && (
                    <div className="step-content">
                      <div className="step-heading-row">
                        <span className="pill-badge accent">STEP 4 OF 5</span>
                        <h3 className="step-title">Student & Licence Information</h3>
                        <p className="step-desc">Enter your contact details so the instructor can confirm your pickup and booking schedule.</p>
                      </div>

                      <div className="form-row-2">
                        <div className="form-group">
                          <label className="form-label">Full Name *</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="e.g. Jordan Smith"
                            value={booking.fullName}
                            onChange={(e) => setBooking({ ...booking, fullName: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Mobile Phone (for SMS confirmation) *</label>
                          <input 
                            type="tel" 
                            className="form-input" 
                            placeholder="e.g. 0412 345 678"
                            value={booking.phone}
                            onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row-2">
                        <div className="form-group">
                          <label className="form-label">Email Address *</label>
                          <input 
                            type="email" 
                            className="form-input" 
                            placeholder="e.g. jordan@example.com"
                            value={booking.email}
                            onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Current Licence Type</label>
                          <select 
                            className="form-select"
                            value={booking.licenceType}
                            onChange={(e) => setBooking({ ...booking, licenceType: e.target.value })}
                          >
                            <option value="NSW Learner Licence">NSW Learner Licence (L-Plate)</option>
                            <option value="Overseas Driver Licence">Overseas / International Licence</option>
                            <option value="Provisional P1/P2 Refresher">Provisional P1/P2 Refresher</option>
                            <option value="Full Licence Refresher">Full Licence Refresher</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Pickup Address or Suburb (Optional)</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. 124 Botany Rd, Mascot NSW"
                          value={booking.pickupAddress}
                          onChange={(e) => setBooking({ ...booking, pickupAddress: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Special Notes / Test Booking Reference (Optional)</label>
                        <textarea 
                          className="form-textarea" 
                          placeholder="e.g. Test booked for 10:15 AM with Service NSW Botany, or specific parking concerns..."
                          value={booking.notes}
                          onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 5: REVIEW & CONFIRM */}
                  {step === 5 && (
                    <div className="step-content">
                      <div className="step-heading-row">
                        <span className="pill-badge accent">STEP 5 OF 5</span>
                        <h3 className="step-title">Review & Finalize Your Booking</h3>
                        <p className="step-desc">Please verify all details before submitting your driving appointment request.</p>
                      </div>

                      <div className="review-cards-list">
                        <div className="review-block">
                          <span className="rev-label">Selected Service</span>
                          <strong className="rev-val">{selectedServiceObj.title}</strong>
                          <span className="rev-sub">{selectedServiceObj.pricePlaceholder} • {selectedServiceObj.badge}</span>
                        </div>

                        <div className="review-block">
                          <span className="rev-label">Location / Centre</span>
                          <strong className="rev-val">{selectedLocationObj.name}</strong>
                          <span className="rev-sub">{selectedLocationObj.addressPlaceholder}</span>
                        </div>

                        <div className="review-block">
                          <span className="rev-label">Appointment Time</span>
                          <strong className="rev-val">{booking.date}</strong>
                          <span className="rev-sub">{booking.timeSlot} ({booking.transmission} vehicle)</span>
                        </div>

                        <div className="review-block">
                          <span className="rev-label">Student Details</span>
                          <strong className="rev-val">{booking.fullName}</strong>
                          <span className="rev-sub">{booking.phone} • {booking.email} • {booking.licenceType}</span>
                        </div>
                      </div>

                      <div className="policy-notice-box">
                        <ShieldCheck size={18} className="notice-icon" />
                        <div>
                          <strong>Zero Risk Mock Reservation:</strong>
                          <p>No immediate payment required at this step. Your instructor will contact you to confirm timing details.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stepper Navigation Buttons */}
                  <div className="stepper-nav-bar">
                    {step > 1 ? (
                      <Button onClick={prevStep} variant="outline" icon={<ArrowLeft size={16} />}>
                        Previous Step
                      </Button>
                    ) : <div />}

                    {step < 5 ? (
                      <Button onClick={nextStep} variant="primary" icon={<ArrowRight size={16} />}>
                        Continue to Step {step + 1}
                      </Button>
                    ) : (
                      <Button onClick={handleFinalSubmit} variant="primary" size="lg" icon={<CheckCircle2 size={18} />}>
                        CONFIRM BOOKING REQUEST
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Order Summary Sidebar (Steps 1 to 4) */}
            {!isCompleted && step < 5 && (
              <div className="booking-summary-col">
                <div className="summary-sidebar-card aura-card">
                  <span className="pill-badge">SESSION OVERVIEW</span>
                  <h4 className="sidebar-title">Your Booking Details</h4>

                  <div className="sidebar-summary-list">
                    <div className="sidebar-item">
                      <span className="side-label">Selected Service</span>
                      <strong className="side-val">{selectedServiceObj.title}</strong>
                      <span className="side-chip">{selectedServiceObj.badge}</span>
                    </div>

                    <div className="sidebar-item">
                      <span className="side-label">Test / Practice Centre</span>
                      <strong className="side-val">{selectedLocationObj.name}</strong>
                    </div>

                    <div className="sidebar-item">
                      <span className="side-label">Date & Time</span>
                      <strong className="side-val">{booking.date}</strong>
                      <span className="side-time">{booking.timeSlot}</span>
                    </div>

                    <div className="sidebar-item price-row">
                      <span className="side-label">Total Estimated Price</span>
                      <strong className="side-price">{selectedServiceObj.pricePlaceholder}</strong>
                    </div>
                  </div>

                  <div className="sidebar-trust-box">
                    <div className="trust-point">
                      <CheckCircle2 size={14} className="green" />
                      <span>NSW Dual-Control Automatic Car</span>
                    </div>
                    <div className="trust-point">
                      <CheckCircle2 size={14} className="green" />
                      <span>Authorized Driving Instructor</span>
                    </div>
                    <div className="trust-point">
                      <CheckCircle2 size={14} className="green" />
                      <span>Flexible Rescheduling Policy</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .book-page-section {
          padding-top: 1.5rem;
          padding-bottom: 2.5rem;
        }
        /* Stepper Road Track Bar */
        .booking-stepper-wrapper {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 1.25rem 2.25rem;
          margin-bottom: 1.5rem;
          border: 1px solid var(--border-light);
          box-shadow: 0 6px 24px rgba(7, 19, 29, 0.04);
        }
        @media (max-width: 768px) {
          .booking-stepper-wrapper {
            padding: 1rem 0.85rem;
            margin-bottom: 1.25rem;
          }
        }
        .stepper-road-track {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          width: 100%;
        }

        /* Track Lines */
        .stepper-road-line-bg {
          position: absolute;
          top: 18px;
          left: 0;
          right: 0;
          height: 4px;
          background: #E2DFD6;
          border-radius: 99px;
          z-index: 1;
        }
        .stepper-road-line-active {
          position: absolute;
          top: 18px;
          left: 0;
          height: 4px;
          background: var(--accent-gold);
          border-radius: 99px;
          z-index: 2;
          transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Moving Car Badge */
        .stepper-car-badge {
          position: absolute;
          top: 2px;
          z-index: 5;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-deep-charcoal);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(7, 19, 29, 0.3);
          border: 2px solid var(--accent-gold);
          transition: left 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Step Nodes */
        .step-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          position: relative;
          z-index: 4;
        }
        .node-num-wrapper {
          padding: 2px;
          background: #FFFFFF;
          border-radius: 50%;
        }
        .node-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #E8E5DC;
          color: #07131D;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border: 2px solid #DDD9CE;
        }

        /* Completed Steps (1, 2, 3, 4) */
        .step-node.done .node-num {
          background: #07131D;
          color: #FFFFFF;
          border-color: #07131D;
          font-size: 0.775rem;
        }

        /* Active Current Step */
        .step-node.active .node-num {
          background: var(--accent-gold);
          color: #07131D;
          border-color: #07131D;
          box-shadow: 0 0 0 4px rgba(210, 176, 76, 0.3);
          transform: scale(1.08);
        }

        .node-label {
          font-size: 0.775rem;
          font-weight: 700;
          color: #64748B;
          transition: color 0.2s ease;
          white-space: nowrap;
        }
        .step-node.active .node-label {
          color: #07131D;
          font-weight: 800;
        }
        .step-node.done .node-label {
          color: #07131D;
        }
        @media (max-width: 640px) {
          .node-label {
            display: none;
          }
        }

        /* Layout Grid */
        .booking-layout-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 1.75rem;
          align-items: flex-start;
        }
        @media (max-width: 960px) {
          .booking-layout-grid {
            grid-template-columns: 1fr;
          }
        }
        .booking-step-container {
          background: #FFFFFF;
          padding: 1.85rem 2rem;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
        }
        @media (max-width: 600px) {
          .booking-step-container {
            padding: 1.25rem;
          }
        }
        .step-heading-row {
          margin-bottom: 1.25rem;
        }
        .step-title {
          font-size: 1.45rem;
          font-weight: 900;
          margin-top: 0.4rem;
          margin-bottom: 0.25rem;
        }
        .step-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        /* Step 1: Services */
        .service-select-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 640px) {
          .service-select-grid {
            grid-template-columns: 1fr;
          }
        }
        .service-option-card {
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 0.85rem 1.15rem;
          cursor: pointer;
          transition: all 0.2s ease;
          background: #FAFAF8;
        }
        .service-option-card:hover {
          border-color: var(--accent-gold);
          background: #FFFFFF;
        }
        .service-option-card.selected {
          border-color: #07131D;
          background: rgba(210, 176, 76, 0.12);
          box-shadow: 0 4px 14px rgba(7, 19, 29, 0.05);
        }
        .option-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.35rem;
        }
        .option-num {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1rem;
          color: #07131D;
        }
        .option-price {
          font-size: 0.825rem;
          font-weight: 800;
          color: #07131D;
        }
        .option-title {
          font-size: 1.05rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }
        .option-desc {
          font-size: 0.8rem;
          color: #64748B;
          margin-bottom: 0.5rem;
          line-height: 1.35;
        }
        .option-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          background: #FFFFFF;
          padding: 0.15rem 0.55rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
        }

        /* Step 2: Locations */
        .location-select-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 600px) {
          .location-select-grid {
            grid-template-columns: 1fr;
          }
        }
        .location-option-card {
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 0.85rem 1.15rem;
          cursor: pointer;
          transition: all 0.2s;
          background: #FAFAF8;
        }
        .location-option-card:hover {
          border-color: var(--accent-gold);
          background: #FFFFFF;
        }
        .location-option-card.selected {
          border-color: #07131D;
          background: rgba(210, 176, 76, 0.12);
        }
        .loc-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.35rem;
        }
        .loc-pin {
          color: #07131D;
        }
        .loc-code {
          font-size: 0.725rem;
          font-weight: 700;
          color: #64748B;
        }
        .loc-name {
          font-size: 0.95rem;
          font-weight: 800;
          margin-bottom: 0.2rem;
        }
        .loc-desc {
          font-size: 0.775rem;
          color: #64748B;
          margin-bottom: 0.4rem;
          line-height: 1.35;
        }
        .loc-type-tag {
          font-size: 0.675rem;
          font-weight: 700;
          color: #64748B;
        }

        /* Step 3: Date / Time */
        .datetime-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 600px) {
          .datetime-grid {
            grid-template-columns: 1fr;
          }
        }
        .trans-btn {
          width: 100%;
          padding: 0.75rem;
          background: #FAFAF8;
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.825rem;
          color: #07131D;
        }
        .trans-btn.active {
          background: #07131D;
          color: #FFFFFF;
          border-color: #07131D;
        }
        .slots-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-top: 0.4rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 600px) {
          .slots-grid {
            grid-template-columns: 1fr;
          }
        }
        .slot-chip {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.65rem 0.85rem;
          background: #FAFAF8;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          font-weight: 600;
          color: #07131D;
          transition: all 0.2s;
        }
        .slot-chip:hover {
          border-color: var(--accent-gold);
        }
        .slot-chip.active {
          background: var(--accent-gold);
          border-color: #07131D;
          font-weight: 800;
          color: #07131D;
        }

        /* Step 5: Review */
        .review-cards-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 600px) {
          .review-cards-list {
            grid-template-columns: 1fr;
          }
        }
        .review-block {
          background: #FAFAF8;
          border: 1px solid var(--border-light);
          padding: 0.85rem 1.15rem;
          border-radius: var(--radius-md);
        }
        .rev-label {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
        }
        .rev-val {
          display: block;
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .rev-sub {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .policy-notice-box {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: #FFFFFF;
          border: 1px dashed var(--border-medium);
          padding: 1.25rem;
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
        }
        .notice-icon {
          color: var(--brand-success);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .policy-notice-box strong {
          display: block;
          font-size: 0.85rem;
        }
        .policy-notice-box p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* Stepper Navigation */
        .stepper-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.75rem;
          border-top: 1px solid var(--border-light);
        }

        /* Sidebar */
        .summary-sidebar-card {
          background: #FFFFFF;
          padding: 2.25rem;
          border-radius: var(--radius-xl);
          position: sticky;
          top: 100px;
        }
        .sidebar-title {
          font-size: 1.35rem;
          font-weight: 900;
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .sidebar-summary-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 1.75rem;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid var(--border-light);
        }
        .side-label {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
        }
        .side-val {
          display: block;
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .side-chip {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          background: var(--bg-surface-alt);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          margin-top: 0.25rem;
        }
        .side-time {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .price-row {
          padding-top: 0.75rem;
          border-top: 1px dashed var(--border-light);
        }
        .side-price {
          font-size: 1.4rem;
          font-family: var(--font-heading);
          color: var(--text-primary);
        }
        .sidebar-trust-box {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .trust-point {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .green {
          color: #16A34A;
        }

        /* Success */
        .booking-success-card {
          background: #FFFFFF;
          padding: 4rem 2.5rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .success-icon-wrap {
          margin-bottom: 1rem;
        }
        .success-check-icon {
          color: #16A34A;
        }
        .success-title {
          font-size: 2.2rem;
          font-weight: 900;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .success-p {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin-bottom: 2rem;
        }
        .booking-summary-receipt {
          background: var(--bg-surface-alt);
          padding: 2rem;
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 540px;
          margin-bottom: 2.5rem;
          text-align: left;
        }
        .booking-summary-receipt h4 {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-medium);
        }
        .receipt-row {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0;
          font-size: 0.9rem;
        }
        .receipt-row span {
          color: var(--text-muted);
        }
        .success-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
