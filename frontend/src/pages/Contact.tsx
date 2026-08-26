import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Instagram, 
  ShieldCheck, 
  MessageSquare,
  Sparkles 
} from 'lucide-react';
import { BRAND_INFO, TEST_LOCATIONS } from '../data/content';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { submitContact } from '../services/api';

export const Contact: React.FC = () => {
  const savedSettings = localStorage.getItem('canguruber_business_settings');
  const businessInfo = savedSettings ? JSON.parse(savedSettings) : {
    phone: BRAND_INFO.phonePlaceholder,
    email: BRAND_INFO.emailPlaceholder,
    address: BRAND_INFO.serviceArea,
    openingHours: BRAND_INFO.hoursPlaceholder
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: '',
    serviceInterest: 'driving-lesson',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitContact(formData);
    setSubmitting(false);
    if (res && res.inquiryId) {
      setInquiryRef(res.inquiryId);
    }
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <PageHeader 
        tag="GET IN TOUCH"
        title="CONTACT OUR INSTRUCTOR DIRECTLY."
        subtitle="Have questions about lesson availability, test centre preparation, or overseas licence conversions? Send us a message or call directly."
        breadcrumb="Contact"
      />

      <section className="section-padding contact-main-section">
        <div className="container">
          <div className="contact-grid-layout">
            {/* Left Info Column */}
            <div className="contact-info-col">
              <div className="contact-info-card aura-card">
                <div className="badge-wrapper">
                  <span className="contact-tag-badge">DIRECT SUPPORT</span>
                </div>
                <h3 className="info-title">Instructor Contact & Operations</h3>
                <p className="info-desc">
                  We respond to all enquiries within 2–4 hours. For urgent test day car hire bookings within 48 hours, direct phone call or SMS is recommended.
                </p>

                <div className="contact-detail-items">
                  <div className="detail-item">
                    <div className="detail-icon"><Phone size={18} /></div>
                    <div className="detail-content">
                      <span className="detail-label">Phone & SMS (Direct Instructor)</span>
                      <a href={`tel:${businessInfo.phone}`} className="detail-val-link">
                        {businessInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon"><Mail size={18} /></div>
                    <div className="detail-content">
                      <span className="detail-label">Email Inquiries</span>
                      <a href={`mailto:${businessInfo.email}`} className="detail-val-link">
                        {businessInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon"><Clock size={18} /></div>
                    <div className="detail-content">
                      <span className="detail-label">Operating Hours</span>
                      <strong className="detail-val">{businessInfo.openingHours}</strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon"><MapPin size={18} /></div>
                    <div className="detail-content">
                      <span className="detail-label">Primary Service Area</span>
                      <strong className="detail-val">{businessInfo.address}</strong>
                    </div>
                  </div>
                </div>

                <div className="contact-hubs-box">
                  <h4 className="hubs-heading">Popular Service NSW Test Centres Covered:</h4>
                  <div className="hubs-pills-grid">
                    {TEST_LOCATIONS.map((loc) => (
                      <div key={loc.id} className="hub-pill">
                        <MapPin size={12} className="hub-pin-icon" />
                        <span>{loc.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="contact-accreditation-footer">
                  <ShieldCheck size={20} className="gold-accent" />
                  <span>NSW Transport Accredited Driving Instructor Fleet</span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="contact-form-col">
              <div className="contact-form-card aura-card">
                {submitted ? (
                  <div className="form-success-box">
                    <div className="success-icon-circle">
                      <CheckCircle2 size={44} className="success-icon" />
                    </div>
                    <h3 className="success-title">Enquiry Received!</h3>
                    <p className="success-desc">
                      Thank you, <strong>{formData.name || 'Student'}</strong>. Your message has been sent directly to our instructor. We will review your test details and get in touch with you shortly.
                    </p>
                    <button 
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          suburb: '',
                          serviceInterest: 'driving-lesson',
                          message: ''
                        });
                      }} 
                      className="btn btn-gold"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="enquiry-form">
                    <div className="badge-wrapper">
                      <span className="contact-tag-badge">ONLINE ENQUIRY FORM</span>
                    </div>
                    <h3 className="form-heading">Send Us a Direct Message</h3>
                    
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Alex Johnson"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number *</label>
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="e.g. 0400 000 000"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                          placeholder="e.g. alex@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Your Suburb in Sydney</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Mascot, Botany, Marrickville"
                          value={formData.suburb}
                          onChange={(e) => setFormData({...formData, suburb: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Service of Interest</label>
                      <select 
                        className="form-select"
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                      >
                        <option value="driving-lesson">Driving Lesson (1-on-1 Practice)</option>
                        <option value="car-hire">Car Hire for Practical Driving Test</option>
                        <option value="lesson-and-car">Lesson + Car Combo (Warm-up + Test)</option>
                        <option value="test-preparation">Service NSW Test Route Mock Audit</option>
                        <option value="overseas-conversion">Overseas Driver Licence Conversion</option>
                        <option value="other">General Question / Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Your Message or Test Date *</label>
                      <textarea 
                        className="form-textarea" 
                        rows={4}
                        placeholder="Tell us about your driving experience, target test date, or any specific concerns..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-gold w-full submit-contact-btn">
                      <span>SEND ENQUIRY MESSAGE</span>
                      <Send size={16} />
                    </button>

                    <p className="form-footer-disclaimer">
                      🔒 We respect your privacy. Your information is used strictly to coordinate your driving lessons and licence preparation.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-main-section {
          background-color: var(--bg-warm-white);
        }
        .contact-grid-layout {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 2.5rem;
          align-items: flex-start;
        }
        @media (max-width: 960px) {
          .contact-grid-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        /* Info Card */
        .contact-info-card {
          background: #FFFFFF;
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          box-shadow: 0 10px 30px rgba(7, 19, 29, 0.05);
        }
        .badge-wrapper {
          margin-bottom: 0.75rem;
        }
        .contact-tag-badge {
          display: inline-block;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          color: var(--accent-gold);
          background: rgba(210, 176, 76, 0.12);
          border: 1px solid rgba(210, 176, 76, 0.3);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
        }
        .info-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: #07131D;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }
        .info-desc {
          font-size: 0.925rem;
          color: #4A5866;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .contact-detail-items {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-light);
        }
        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .detail-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: rgba(7, 19, 29, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-gold);
          flex-shrink: 0;
        }
        .detail-content {
          display: flex;
          flex-direction: column;
        }
        .detail-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #718096;
          font-weight: 700;
          margin-bottom: 0.15rem;
        }
        .detail-val {
          font-size: 0.975rem;
          color: #07131D;
          font-weight: 700;
        }
        .detail-val-link {
          font-size: 0.975rem;
          color: #07131D;
          font-weight: 700;
          transition: color 0.2s ease;
        }
        .detail-val-link:hover {
          color: var(--accent-gold);
        }

        .contact-hubs-box {
          margin-bottom: 1.75rem;
        }
        .hubs-heading {
          font-size: 0.85rem;
          font-weight: 800;
          color: #07131D;
          margin-bottom: 0.75rem;
        }
        .hubs-pills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }
        @media (max-width: 600px) {
          .hubs-pills-grid {
            grid-template-columns: 1fr;
          }
        }
        .hub-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #2D3748;
          background: #F7F5F0;
          border: 1px solid var(--border-light);
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
        }
        .hub-pin-icon {
          color: var(--accent-gold);
          flex-shrink: 0;
        }

        .contact-accreditation-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
          font-size: 0.8rem;
          font-weight: 700;
          color: #4A5866;
        }
        .gold-accent {
          color: var(--accent-gold);
          flex-shrink: 0;
        }

        /* Form Card */
        .contact-form-card {
          background: #FFFFFF;
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          box-shadow: 0 10px 30px rgba(7, 19, 29, 0.05);
        }
        @media (max-width: 600px) {
          .contact-form-card {
            padding: 1.75rem 1.25rem;
          }
        }
        .form-heading {
          font-size: 1.5rem;
          font-weight: 900;
          color: #07131D;
          margin-bottom: 1.5rem;
        }

        /* Form Fields Styling */
        .enquiry-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.15rem;
        }
        @media (max-width: 640px) {
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 1.15rem;
          }
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .form-label {
          font-family: var(--font-display);
          font-size: 0.825rem;
          font-weight: 700;
          color: #07131D;
          letter-spacing: 0.02em;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          font-family: var(--font-body);
          font-size: 0.925rem;
          color: #07131D;
          background: #FAFAF8;
          border: 1.5px solid #DDD9CE;
          border-radius: var(--radius-md);
          padding: 0.8rem 1rem;
          outline: none;
          transition: all 0.2s ease;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          background: #FFFFFF;
          border-color: var(--accent-gold);
          box-shadow: 0 0 0 3.5px rgba(210, 176, 76, 0.18);
        }
        .form-input::placeholder, .form-textarea::placeholder {
          color: #A0AEC0;
        }
        .form-textarea {
          resize: vertical;
          min-height: 100px;
          line-height: 1.5;
        }
        .form-select {
          cursor: pointer;
        }

        .submit-contact-btn {
          margin-top: 0.5rem;
          width: 100%;
          padding: 0.95rem;
        }
        .form-footer-disclaimer {
          font-size: 0.775rem;
          color: #718096;
          text-align: center;
          margin-top: 0.5rem;
          line-height: 1.5;
        }

        /* Success State */
        .form-success-box {
          text-align: center;
          padding: 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }
        .success-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .success-icon {
          color: #16A34A;
        }
        .success-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 900;
          color: #07131D;
        }
        .success-desc {
          font-size: 0.95rem;
          color: #4A5866;
          max-width: 420px;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};
