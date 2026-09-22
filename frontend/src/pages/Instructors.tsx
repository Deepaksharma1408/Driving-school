

import React, { useState } from 'react';
import {
  ShieldCheck,
  Star,
  Award,
  MapPin,
  Languages,
  Car,
  CheckCircle2,
  ArrowRight,
  Filter
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const Instructors: React.FC = () => {
  const [locationFilter, setLocationFilter] = useState('all');

  const INSTRUCTORS_DATA = [
    {
      id: 'inst-1',
      name: 'Instructor Alex Vance',
      title: 'Senior NSW Head Driving Instructor',
      experience: '12+ Years Experience',
      rating: 4.9,
      reviewsCount: 310,
      passRate: '97.2% Pass Rate',
      portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      languages: ['English', 'Hindi', 'Punjabi'],
      testCentres: ['Service NSW Botany', 'Service NSW Marrickville'],
      specialities: ['Parallel Parking Specialist', 'Anxious Learner Coach', 'Mock Test Audit'],
      carModel: '2025 Toyota Corolla Dual-Control Automatic',
      bio: 'Specializing in calm, structured instruction for first-time drivers and international licence conversions around Botany and Marrickville test routes.'
    },
    {
      id: 'inst-2',
      name: 'Instructor Sarah Jenkins',
      title: 'Licensed High-Density Area Specialist',
      experience: '9+ Years Experience',
      rating: 5.0,
      reviewsCount: 240,
      passRate: '98.0% Pass Rate',
      portrait: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
      languages: ['English', 'Spanish'],
      testCentres: ['Service NSW Rockdale', 'Service NSW Miranda'],
      specialities: ['Kerbside Stops', 'School Zone Speed Management', 'Night Driving'],
      carModel: '2025 Mazda 3 Dual-Control Automatic',
      bio: 'Patient and encouraging instruction tailored for nervous drivers. Known for high first-time pass rates at Rockdale & Miranda Service NSW.'
    },
    {
      id: 'inst-3',
      name: 'Instructor David Kumar',
      title: 'Practical Drive Test Assessor Coach',
      experience: '15+ Years Experience',
      rating: 4.9,
      reviewsCount: 420,
      passRate: '96.5% Pass Rate',
      portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      languages: ['English', 'Hindi', 'Gujarati'],
      testCentres: ['Service NSW Silverwater', 'Service NSW Botany'],
      specialities: ['Complex Roundabouts', 'Highway Merging', 'Refresher Driving'],
      carModel: '2026 Hyundai i30 Dual-Control Automatic',
      bio: 'Former RMS test route expert with over 15 years of instruction experience across Sydney Western & Southern suburbs.'
    }
  ];

  const filteredInstructors = INSTRUCTORS_DATA.filter(inst => {
    if (locationFilter === 'all') return true;
    return inst.testCentres.some(tc => tc.toLowerCase().includes(locationFilter.toLowerCase()));
  });

  return (
    <div className="instructors-page">
      <PageHeader
        tag="NSW AUTHORIZED INSTRUCTORS"
        title="MEET YOUR DRIVING INSTRUCTORS."
        subtitle="Professional, friendly, and fully certified dual-control driving instructors with proven test pass records."
        breadcrumb="Instructors"
      />

      <section className="section-padding">
        <div className="container">
          {/* Location Filter Pills */}
          <div className="filter-controls-bar">
            <span className="filter-label">Filter by Test Centre:</span>
            <div className="filter-pills-row">
              {[
                { id: 'all', label: 'All Sydney Centres' },
                { id: 'botany', label: 'Botany' },
                { id: 'marrickville', label: 'Marrickville' },
                { id: 'rockdale', label: 'Rockdale' },
                { id: 'miranda', label: 'Miranda' },
                { id: 'silverwater', label: 'Silverwater' }
              ].map(f => (
                <button
                  key={f.id}
                  className={`filter-pill-btn ${locationFilter === f.id ? 'active' : ''}`}
                  onClick={() => setLocationFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Instructors List Grid */}
          <div className="instructors-cards-grid">
            {filteredInstructors.map((inst) => (
              <div key={inst.id} className="instructor-card aura-card">
                <div className="card-header-row">
                  <div className="inst-avatar">
                    <img src={inst.portrait} alt={inst.name} className="inst-avatar-img" />
                  </div>
                  <div className="inst-meta">
                    <h3 className="inst-name">{inst.name}</h3>
                    <span className="inst-title">{inst.title}</span>
                    <div className="rating-row">
                      <Star size={14} fill="#D2B04C" color="#D2B04C" />
                      <strong>{inst.rating}</strong>
                      <span className="reviews-cnt">({inst.reviewsCount})</span>
                      <span className="pass-badge">{inst.passRate}</span>
                    </div>
                  </div>
                </div>

                <p className="inst-bio">{inst.bio}</p>

                <div className="inst-details-grid">
                  <div className="detail-item">
                    <Languages size={16} className="gold" />
                    <div>
                      <span className="detail-label">Languages Spoken</span>
                      <strong className="detail-val">{inst.languages.join(', ')}</strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <MapPin size={16} className="gold" />
                    <div>
                      <span className="detail-label">Test Centres Covered</span>
                      <strong className="detail-val">{inst.testCentres.join(' • ')}</strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <Car size={16} className="gold" />
                    <div>
                      <span className="detail-label">Vehicle</span>
                      <strong className="detail-val">{inst.carModel}</strong>
                    </div>
                  </div>
                </div>

                <div className="specialities-tags">
                  {inst.specialities.map((spec, i) => (
                    <span key={i} className="spec-tag">{spec}</span>
                  ))}
                </div>

                <div className="card-footer-action">
                  <Button to="/book" variant="primary" size="md" icon={<ArrowRight size={16} />} style={{ width: '100%' }}>
                    BOOK LESSON WITH THIS INSTRUCTOR
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .filter-controls-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          background: #FAFAF8;
          padding: 1rem 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
        }
        @media (max-width: 768px) {
          .filter-controls-bar {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.15rem 1rem;
            margin-bottom: 1.75rem;
            gap: 0.75rem;
          }
        }
        .filter-label {
          font-size: 0.85rem;
          font-weight: 800;
          color: #07131D;
        }
        .filter-pills-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .filter-pill-btn {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          background: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 700;
          color: #64748B;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-pill-btn.active {
          background: #07131D;
          color: #FFFFFF;
          border-color: #07131D;
        }

        .instructors-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          align-items: stretch;
        }

        @media (max-width: 1024px) {
          .instructors-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 680px) {
          .instructors-cards-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .instructor-card {
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 1.85rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: all 0.35s var(--ease-cinematic);
          box-shadow: 0 4px 20px rgba(17, 17, 17, 0.03);
        }

        @media (max-width: 480px) {
          .instructor-card {
            padding: 1.25rem;
          }
        }

        .instructor-card:hover {
          transform: translateY(-6px);
          border-color: rgba(197, 168, 128, 0.45);
          box-shadow: 0 20px 45px rgba(17, 17, 17, 0.09);
        }

        .card-header-row {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .inst-avatar {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          overflow: hidden;
          background: #07131D;
          flex-shrink: 0;
          border: 2px solid var(--accent-champagne);
        }

        .inst-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .inst-name {
          font-family: var(--font-display);
          font-size: 1.22rem;
          font-weight: 700;
          margin-bottom: 0.15rem;
          color: var(--text-primary);
        }

        .inst-title {
          font-size: 0.78rem;
          color: #64748B;
          display: block;
          margin-bottom: 0.3rem;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
        }

        .reviews-cnt {
          color: #64748B;
        }

        .pass-badge {
          font-size: 0.68rem;
          font-weight: 800;
          background: rgba(22, 163, 74, 0.12);
          color: #16A34A;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          margin-left: 0.4rem;
        }

        .inst-bio {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
          flex: 1;
        }

        .inst-details-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: #FAFAF8;
          padding: 1rem 1.15rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
        }
        @media (max-width: 768px) {
          .inst-details-grid { grid-template-columns: 1fr; }
        }
        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }
        .gold { color: #B38E2A; margin-top: 2px; }
        .detail-label {
          display: block;
          font-size: 0.75rem;
          color: #64748B;
        }
        .detail-val {
          display: block;
          font-size: 0.875rem;
          color: #07131D;
        }

        .specialities-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .spec-tag {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          color: #07131D;
        }
      `}</style>
    </div>
  );
};
