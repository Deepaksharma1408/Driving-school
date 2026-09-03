import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  Send, 
  Award, 
  MapPin, 
  MessageSquare, 
  Sparkles 
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { submitReview } from '../services/api';
import { TEST_LOCATIONS } from '../data/content';

export const SubmitReview: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    locationTag: 'Service NSW Botany Test Centre',
    rating: 5,
    serviceType: 'Car Hire + Warmup',
    reviewText: '',
    passStatus: 'PASSED FIRST ATTEMPT'
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.reviewText) return;
    setSubmitting(true);
    await submitReview(formData);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="submit-review-page">
      <PageHeader 
        tag="STUDENT SUCCESS WALL"
        title="SUBMIT YOUR PASS STORY & REVIEW."
        subtitle="Did you recently pass your Service NSW Practical Driving Test with Apex Driving Academy? Share your experience with future learners!"
        breadcrumb="Submit Review"
      />

      <section className="section-padding">
        <div className="container" style={{ maxWidth: '680px' }}>
          {!submitted ? (
            <div className="review-form-card aura-card">
              <div className="card-top">
                <span className="pill-badge accent">SHARE YOUR TEST DAY SUCCESS</span>
                <h3>Post Your Verified Driving Review</h3>
                <p>Your feedback helps new learners prepare for their driving test with confidence.</p>
              </div>

              <form onSubmit={handleSubmit} className="review-form">
                {/* Rating Selector */}
                <div className="form-group text-center" style={{ alignItems: 'center' }}>
                  <label className="form-label">Your Rating</label>
                  <div className="stars-selector-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        type="button"
                        className={`star-btn ${formData.rating >= star ? 'selected' : ''}`}
                        onClick={() => setFormData({ ...formData, rating: star })}
                      >
                        <Star size={28} fill={formData.rating >= star ? '#D2B04C' : 'none'} color={formData.rating >= star ? '#D2B04C' : '#CBD5E1'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Your Full Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Marcus T."
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Service NSW Test Centre</label>
                    <select 
                      className="form-select"
                      value={formData.locationTag}
                      onChange={(e) => setFormData({ ...formData, locationTag: e.target.value })}
                    >
                      {TEST_LOCATIONS.map(loc => (
                        <option key={loc.id} value={loc.name}>{loc.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Package / Service Used</label>
                    <select 
                      className="form-select"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    >
                      <option value="Car Hire + Warmup">Test Day Car Hire + Warmup</option>
                      <option value="3-Lesson Combo Package">3-Lesson Combo Package</option>
                      <option value="Driving Lessons">Standard Driving Lessons</option>
                      <option value="Mock Test Audit">Mock Test Audit</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Test Outcome</label>
                    <select 
                      className="form-select"
                      value={formData.passStatus}
                      onChange={(e) => setFormData({ ...formData, passStatus: e.target.value })}
                    >
                      <option value="PASSED FIRST ATTEMPT">PASSED FIRST ATTEMPT 🎉</option>
                      <option value="PASSED TEST">PASSED TEST 🚗</option>
                      <option value="HIGH SCORE PASS">HIGH SCORE PASS 💯</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Review & Test Day Story *</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="Tell us how your instructor helped you prepare for test routes, reverse parking, and test day nerves..."
                    value={formData.reviewText}
                    onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="yellow" 
                  size="lg" 
                  disabled={submitting}
                  icon={<Send size={18} />}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {submitting ? 'PUBLISHING REVIEW...' : 'SUBMIT VERIFIED REVIEW'}
                </Button>
              </form>
            </div>
          ) : (
            <div className="review-success-card aura-card text-center">
              <div className="success-icon-wrap">
                <CheckCircle2 size={56} className="green" />
              </div>
              <span className="pill-badge accent">REVIEW PUBLISHED</span>
              <h2 className="success-title">Thank You, {formData.studentName}!</h2>
              <p className="success-desc">
                Your review has been saved into our PostgreSQL database and will inspire new learner drivers preparing for their Service NSW test.
              </p>

              <div className="success-actions">
                <Button to="/" variant="primary" size="lg">
                  Return to Homepage
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .review-form-card {
          padding: 2.5rem;
        }
        .card-top {
          margin-bottom: 2rem;
        }
        .card-top h3 {
          font-size: 1.6rem;
          margin-top: 0.5rem;
          margin-bottom: 0.35rem;
        }
        .card-top p {
          font-size: 0.9rem;
          color: #64748B;
        }

        .stars-selector-row {
          display: flex;
          gap: 0.4rem;
          margin-top: 0.4rem;
        }
        .star-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .star-btn:hover {
          transform: scale(1.2);
        }

        .review-success-card {
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .success-icon-wrap {
          margin-bottom: 1rem;
        }
        .green { color: #16A34A; }
        .success-title {
          font-size: 2rem;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .success-desc {
          font-size: 1rem;
          color: #64748B;
          max-width: 500px;
          margin-bottom: 2rem;
        }
        .success-actions {
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
};
