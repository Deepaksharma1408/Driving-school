import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ShieldCheck } from 'lucide-react';
import { PLACEHOLDER_REVIEWS } from '../../data/content';

export const EditorialTestimonials: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const testimonials = [
    {
      id: 'rev-01',
      quote: "THE LESSONS CHANGED THE WAY I DRIVE.",
      body: "Passed my practical test on the first attempt at Botany Service NSW. The warm-up session on actual test routes completely eliminated my anxiety.",
      author: "LUCAS M.",
      location: "Service NSW Botany",
      service: "Lesson + Car Package",
      result: "PASSED FIRST ATTEMPT",
      portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 'rev-02',
      quote: "CONVERTING MY OVERSEAS LICENCE WAS SEAMLESS.",
      body: "Clear, systematic instruction on Sydney multi-lane roundabouts, safe 3-second buffers, and blind-spot confirmation that examiners look for.",
      author: "ANA CLARA S.",
      location: "Service NSW Silverwater",
      service: "Overseas Conversion Coaching",
      result: "LICENCE CONVERTED",
      portrait: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 'rev-03',
      quote: "PATIENT, METHODICAL, AND TEST-ROUTE MASTERED.",
      body: "My instructor knew every single nuance of the Marrickville test corridor. The dual-control car was smooth, responsive, and incredibly easy to park.",
      author: "MICHAEL K.",
      location: "Service NSW Marrickville",
      service: "Driving Lessons",
      result: "PASSED FIRST ATTEMPT",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 'rev-04',
      quote: "THE DUAL-CONTROL CAR GAVE ME TOTAL POISE.",
      body: "Hiring the car for my driving test was the best decision. The instructor accompanied me to the counter and ensured everything was completely stress-free.",
      author: "CHLOE W.",
      location: "Service NSW Rockdale",
      service: "Car Hire for Test",
      result: "PASSED TEST",
      portrait: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const total = testimonials.length;
  const current = testimonials[activeIdx];

  const nextTestimonial = () => setActiveIdx((prev) => (prev + 1) % total);
  const prevTestimonial = () => setActiveIdx((prev) => (prev - 1 + total) % total);

  return (
    <section className="editorial-testimonials-section section-padding">
      <div className="container-wide">
        {/* Eyebrow */}
        <div className="testimonials-top-row">
          <div className="editorial-meta-tag champagne">
            <span>SECTION 08</span>
            <span className="tag-dash" />
            <span>STUDENT VERIFICATIONS</span>
          </div>

          <div className="carousel-nav-arrows">
            <button 
              className="arrow-circle-btn" 
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="slide-counter-text">
              0{activeIdx + 1} / 0{total}
            </span>
            <button 
              className="arrow-circle-btn" 
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Single Dominant Testimonial Stage */}
        <div className="dominant-testimonial-stage">
          <div className="testimonial-quote-block">
            <blockquote className="dominant-quote-headline font-thin">
              "{current.quote}"
            </blockquote>

            <p className="dominant-body-copy">
              {current.body}
            </p>

            {/* Small Student Metadata */}
            <div className="dominant-meta-row">
              <div className="student-profile-lockup">
                <img 
                  src={current.portrait} 
                  alt={current.author} 
                  className="student-avatar" 
                />
                <div className="student-text">
                  <strong className="student-author-name">{current.author}</strong>
                  <span className="student-location-tag">{current.location} • {current.service}</span>
                </div>
              </div>

              <div className="pass-result-badge">
                <ShieldCheck size={14} className="champagne-icon" />
                <span>{current.result}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ============================================================
           EDITORIAL TESTIMONIALS SECTION STYLING (WARM IVORY)
           ============================================================ */
        .editorial-testimonials-section {
          background-color: var(--bg-warm-ivory);
          border-bottom: 1px solid var(--border-light);
        }

        .testimonials-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3.5rem;
        }

        @media (max-width: 640px) {
          .testimonials-top-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
            margin-bottom: 2rem;
          }
          .carousel-nav-arrows {
            width: 100%;
            justify-content: space-between;
          }
        }

        .carousel-nav-arrows {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .arrow-circle-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border-light);
          background: #FFFFFF;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .arrow-circle-btn:hover {
          background: var(--bg-charcoal);
          color: #FFFFFF;
          border-color: var(--bg-charcoal);
        }

        .slide-counter-text {
          font-family: var(--font-display);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--text-muted);
        }

        /* Dominant Testimonial Stage */
        .dominant-testimonial-stage {
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 5rem 4.5rem;
          box-shadow: 0 16px 40px rgba(17, 17, 17, 0.05);
          position: relative;
        }

        @media (max-width: 900px) {
          .dominant-testimonial-stage {
            padding: 3rem 2rem;
          }
        }

        @media (max-width: 600px) {
          .dominant-testimonial-stage {
            padding: 2rem 1.25rem;
          }
        }

        .testimonial-quote-block {
          max-width: 1040px;
          margin: 0 auto;
        }

        .dominant-quote-headline {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 3.4rem);
          line-height: 1.12;
          letter-spacing: 0.015em;
          color: var(--text-primary);
          text-transform: uppercase;
          margin-bottom: 1.75rem;
        }

        .dominant-body-copy {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.3vw, 1.12rem);
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2.75rem;
          max-width: 820px;
        }

        .dominant-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 2rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .student-profile-lockup {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .student-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--border-light);
        }

        .student-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .student-author-name {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-primary);
        }

        .student-location-tag {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .pass-result-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--accent-champagne);
          background: var(--accent-champagne-subtle);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
        }
      `}</style>
    </section>
  );
};
