import React, { useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { PLACEHOLDER_REVIEWS } from '../../data/content';

export const EditorialTestimonials: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  const reviewBackgrounds = [
    'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85'
  ];

  const total = PLACEHOLDER_REVIEWS.length;

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const targetIdx = (index + total) % total;
    const slideWidth = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({
      left: targetIdx * slideWidth,
      behavior: 'smooth'
    });
    setActiveIdx(targetIdx);
  };

  // Sync activeIdx on scroll (for touch swipe on mobile and trackpad)
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const width = sliderRef.current.offsetWidth;
    if (width > 0) {
      const newIdx = Math.round(scrollLeft / width);
      if (newIdx !== activeIdx && newIdx >= 0 && newIdx < total) {
        setActiveIdx(newIdx);
      }
    }
  };

  // Mouse Drag to slide on desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.scrollBehavior = 'auto';
    sliderRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDownRef.current || !sliderRef.current) return;
    isDownRef.current = false;
    sliderRef.current.style.cursor = 'grab';
    sliderRef.current.style.scrollBehavior = 'smooth';
    
    // Snap to nearest slide
    const width = sliderRef.current.offsetWidth;
    const currentScroll = sliderRef.current.scrollLeft;
    const nearest = Math.round(currentScroll / width);
    scrollToSlide(nearest);
  };

  return (
    <section className="editorial-testimonials-section section-padding">
      <div className="container">
        <div className="section-header-row">
          <div className="section-header">
            <span className="testimonials-eyebrow">
              SECTION 08 // STUDENT STORIES
            </span>
            <h2 className="testimonials-headline">DRIVEN BY OUR STUDENTS.</h2>
          </div>
        </div>

        {/* Native Touch & Drag Snap-Slider Viewport */}
        <div 
          className="testimonials-viewport"
          ref={sliderRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          role="region"
          aria-label="Student testimonials slider"
        >
          {PLACEHOLDER_REVIEWS.map((review, i) => {
            const bg = reviewBackgrounds[i % reviewBackgrounds.length];
            return (
              <div className="testimonial-slide" key={review.id}>
                <div className="magazine-quote-card">
                  {/* Background Photo */}
                  <div className="card-bg-photo-layer">
                    <img 
                      src={bg} 
                      alt="Confident student driver with Drivinity" 
                      className="girl-driving-bg-img"
                      draggable={false}
                    />
                    <div className="card-photo-dark-scrim" />
                  </div>

                  <div className="quote-top-strip">
                    <div className="stars-cluster">
                      {[...Array(5)].map((_, starI) => (
                        <Star key={starI} size={18} className="star-yellow" fill="currentColor" />
                      ))}
                    </div>
                    <span className="pass-status-pill">{review.passStatus}</span>
                  </div>

                  <blockquote className="master-quote-text">
                    "{review.reviewText}"
                  </blockquote>

                  <div className="student-profile-footer">
                    <div className="student-avatar-box">
                      <span className="avatar-letter">{review.studentName.charAt(0)}</span>
                    </div>
                    <div className="student-meta">
                      <strong className="student-name">{review.studentName}</strong>
                      <span className="student-detail">{review.serviceType} • {review.locationTag} • {review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicator dots */}
        <div className="testimonial-dots-row">
          {PLACEHOLDER_REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`t-dot ${i === activeIdx ? 'active' : ''}`}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .editorial-testimonials-section {
          background-color: #FFFFFF;
          color: var(--drivinity-navy);
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        @media (max-width: 768px) {
          .editorial-testimonials-section {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
        }
        .testimonials-eyebrow {
          display: inline-block;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(0.725rem, 2.5vw, 0.825rem);
          letter-spacing: 0.16em;
          color: #B28F00;
          margin-bottom: 0.5rem;
        }
        .testimonials-headline {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 5.5vw, 3.2rem);
          font-weight: 900;
          letter-spacing: -0.035em;
          color: var(--drivinity-navy);
        }
        .section-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2rem;
          gap: 1rem;
        }
        .carousel-nav-buttons {
          display: flex;
          gap: 0.5rem;
        }
        .nav-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #0A1420;
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (max-width: 640px) {
          .nav-arrow {
            width: 38px;
            height: 38px;
          }
        }
        .nav-arrow:hover {
          background: var(--accent-gold);
          color: #0A1420;
          border-color: var(--accent-gold);
          transform: translateY(-2px);
        }

        /* Testimonials Viewport & Multi-Slide Snap Track */
        .testimonials-viewport {
          position: relative;
          width: 100%;
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          border-radius: var(--radius-lg);
          user-select: none;
          cursor: grab;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }
        .testimonials-viewport::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .testimonials-viewport {
            border-radius: var(--radius-md);
          }
        }
        .testimonial-slide {
          flex: 0 0 100%;
          min-width: 100%;
          width: 100%;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          box-sizing: border-box;
        }

        /* Magazine Card */
        .magazine-quote-card {
          position: relative;
          background: #07131D;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: var(--radius-lg);
          padding: 3.5rem 4rem;
          min-height: 340px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .magazine-quote-card {
            padding: 2rem 1.35rem;
            min-height: auto;
            border-radius: var(--radius-md);
          }
        }

        /* Background Photo Layer */
        .card-bg-photo-layer {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        .girl-driving-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 35%;
          transform: scale(1.03);
        }
        .card-photo-dark-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg, 
            rgba(7, 19, 29, 0.95) 0%, 
            rgba(7, 19, 29, 0.9) 50%, 
            rgba(7, 19, 29, 0.78) 100%
          );
        }

        /* Foreground Elements (z-index: 5) */
        .quote-top-strip {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.65rem;
        }
        .stars-cluster {
          display: flex;
          gap: 0.25rem;
        }
        .star-yellow {
          color: #FFD000;
          filter: drop-shadow(0 0 8px rgba(255, 208, 0, 0.6));
        }
        .pass-status-pill {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.3rem 0.85rem;
          background: rgba(255, 208, 0, 0.18);
          color: #FFD000;
          border: 1.5px solid #FFD000;
          border-radius: var(--radius-full);
          letter-spacing: 0.05em;
          backdrop-filter: blur(8px);
        }
        .master-quote-text {
          position: relative;
          z-index: 5;
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 3.8vw, 2.15rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.4;
          color: #FFFFFF !important;
          margin-bottom: 1.5rem;
          text-shadow: 0 3px 15px rgba(0, 0, 0, 0.8);
        }
        .student-profile-footer {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          flex-wrap: wrap;
        }
        .student-avatar-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #FFD000;
          color: #07131D;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(255, 208, 0, 0.4);
          flex-shrink: 0;
        }
        .student-meta {
          display: flex;
          flex-direction: column;
        }
        .student-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFFFF !important;
        }
        .student-detail {
          font-size: 0.8rem;
          color: #CBD5E1 !important;
        }

        .testimonial-dots-row {
          display: flex;
          justify-content: center;
          gap: 0.6rem;
          margin-top: 1.75rem;
        }
        .t-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--border-light);
          transition: all 0.25s;
        }
        .t-dot.active {
          width: 32px;
          border-radius: 6px;
          background: #FFD000;
        }
      `}</style>
    </section>
  );
};
