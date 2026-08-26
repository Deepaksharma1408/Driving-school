import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldAlert } from 'lucide-react';
import { PLACEHOLDER_REVIEWS } from '../../data/content';

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragEndX, setDragEndX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const minSwipeThreshold = 40;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PLACEHOLDER_REVIEWS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PLACEHOLDER_REVIEWS.length) % PLACEHOLDER_REVIEWS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragEndX(null);
    setDragStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setDragEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (dragStartX === null || dragEndX === null) return;
    const diff = dragStartX - dragEndX;
    if (diff > minSwipeThreshold) {
      nextSlide();
    } else if (diff < -minSwipeThreshold) {
      prevSlide();
    }
    setDragStartX(null);
    setDragEndX(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragEndX(null);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragEndX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragStartX === null || dragEndX === null) return;
    const diff = dragStartX - dragEndX;
    if (diff > minSwipeThreshold) {
      nextSlide();
    } else if (diff < -minSwipeThreshold) {
      prevSlide();
    }
    setDragStartX(null);
    setDragEndX(null);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        <div className="section-header-row">
          <div className="section-header">
            <span className="pill-badge">VERIFIED STUDENT EXPERIENCES</span>
            <h2 className="section-title">WHAT OUR STUDENTS SAY</h2>
            <p className="section-subtitle">
              Feedback from learner drivers and international licence holders who prepared for their practical driving tests with us.
            </p>
          </div>

          <div className="carousel-controls hide-mobile">
            <button 
              onClick={prevSlide} 
              className="carousel-arrow-btn" 
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide} 
              className="carousel-arrow-btn" 
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Placeholder disclaimer pill */}
        <div className="disclaimer-banner">
          <ShieldAlert size={15} />
          <span>Internal Note: Testimonial placeholders shown below — easily replaceable with live Google review feed.</span>
        </div>

        {/* Carousel / Cards Track */}
        <div 
          className="testimonials-grid"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {PLACEHOLDER_REVIEWS.map((review, idx) => (
            <div 
              key={review.id} 
              className={`testimonial-card aura-card ${idx === currentIndex ? 'active-mobile' : ''}`}
            >
              <div className="review-top">
                <div className="stars-row">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} className="star-filled" fill="currentColor" />
                  ))}
                </div>
                <span className="review-status-tag">{review.passStatus}</span>
              </div>

              <div className="review-quote-body">
                <Quote size={24} className="quote-icon" />
                <p className="review-text">"{review.reviewText}"</p>
              </div>

              <div className="review-author">
                <div className="author-avatar">{review.studentName.charAt(0)}</div>
                <div className="author-info">
                  <span className="author-name">{review.studentName}</span>
                  <span className="author-meta">{review.serviceType} • {review.locationTag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile controls */}
        <div className="mobile-dots hide-desktop">
          {PLACEHOLDER_REVIEWS.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)} 
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          background-color: var(--bg-main);
        }
        .section-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        .carousel-controls {
          display: flex;
          gap: 0.75rem;
        }
        .carousel-arrow-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: all 0.2s ease;
        }
        .carousel-arrow-btn:hover {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }
        .disclaimer-banner {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.9rem;
          font-size: 0.775rem;
          background: #FFFFFF;
          border: 1px dashed var(--border-medium);
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          margin-bottom: 2rem;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1200px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .testimonials-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 1rem;
            -webkit-overflow-scrolling: touch;
          }
          .testimonial-card {
            min-width: 85%;
            scroll-snap-align: center;
          }
        }
        .testimonial-card {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .review-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .stars-row {
          display: flex;
          gap: 0.2rem;
          color: #EAB308;
        }
        .review-status-tag {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          background: #DCFCE7;
          color: #15803D;
          border-radius: var(--radius-full);
        }
        .review-quote-body {
          margin-bottom: 1.75rem;
          position: relative;
          flex: 1;
        }
        .quote-icon {
          color: var(--accent-subtle);
          opacity: 0.6;
          margin-bottom: 0.5rem;
        }
        .review-text {
          font-size: 0.95rem;
          color: var(--text-primary);
          line-height: 1.6;
          font-style: italic;
        }
        .review-author {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
        }
        .author-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--bg-surface-alt);
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          border: 1px solid var(--border-medium);
        }
        .author-info {
          display: flex;
          flex-direction: column;
        }
        .author-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .author-meta {
          font-size: 0.775rem;
          color: var(--text-muted);
        }
        .mobile-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-medium);
          transition: all 0.2s ease;
        }
        .dot.active {
          background: var(--text-primary);
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};
