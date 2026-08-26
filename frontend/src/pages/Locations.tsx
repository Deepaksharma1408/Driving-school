import React from 'react';
import { MapPin, Navigation, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { AbstractMapLocations } from '../components/cinematic/AbstractMapLocations';
import { TEST_LOCATIONS } from '../data/content';
import { LocationCard } from '../components/ui/LocationCard';
import { Button } from '../components/ui/Button';

export const Locations: React.FC = () => {
  return (
    <div className="locations-page">
      <PageHeader 
        tag="GREATER SYDNEY TEST HUBS"
        title="SERVICE NSW TEST LOCATIONS."
        subtitle="Explore our active Service NSW testing centers across Sydney. We provide pre-test lessons, mock route simulations, and test car hire."
        breadcrumb="Test Locations"
        badge="Sydney-Wide Test Route Coverage"
      />

      {/* Abstract Interactive Map Section */}
      <AbstractMapLocations />

      {/* Grid of Locations */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="pill-badge">ALL SERVICE HUBS</span>
            <h2 className="section-title">SELECT YOUR PREFERRED CENTRE</h2>
            <p className="section-subtitle">
              Click any location to lock in your test-day car hire or schedule local route practice.
            </p>
          </div>

          <div className="grid-4">
            {TEST_LOCATIONS.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>

          <div className="custom-location-banner aura-card">
            <div className="custom-loc-text">
              <h3>Need a lesson in a different Sydney suburb?</h3>
              <p>We provide home pickup and customized training routes across surrounding Sydney regions.</p>
            </div>
            <Button to="/contact" variant="dark" icon={<ArrowRight size={16} />}>
              CONTACT INSTRUCTOR
            </Button>
          </div>
        </div>
      </section>

      <style>{`
        .custom-location-banner {
          margin-top: 3.5rem;
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .custom-loc-text h3 {
          font-size: 1.35rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
        }
        .custom-loc-text p {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};
