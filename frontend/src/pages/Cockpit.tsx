import React, { useState } from 'react';
import { 
  Eye, 
  ShieldCheck, 
  Car, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const Cockpit: React.FC = () => {
  const [activeSpot, setActiveSpot] = useState<string | null>('pedals');

  const HOTSPOTS: { [key: string]: { title: string; subtitle: string; desc: string; tips: string[] } } = {
    pedals: {
      title: 'Dual-Control Passenger Safety Pedals',
      subtitle: 'Instructor Emergency Brake & Clutch',
      desc: 'Your Canguruber instructor has an auxiliary dual-brake pedal on the passenger side. If you ever hesitate or face an unexpected hazard, your instructor can safely stop the vehicle instantly.',
      tips: [
        'Zero stress: Your instructor always has full braking capability.',
        'RMS Approved dual-control setup in all vehicles.'
      ]
    },
    steering: {
      title: 'Steering Wheel & Hand Position',
      subtitle: '9 and 3 o\'clock Grip Position',
      desc: 'Transport for NSW examiners evaluate smooth pull-push steering without crossing arms awkwardly during turns.',
      tips: [
        'Keep hands at 9 and 3 o\'clock positions.',
        'Use smooth pull-push technique when taking tight roundabouts.'
      ]
    },
    gear: {
      title: 'Automatic Gear Shifter',
      subtitle: 'P - R - N - D Shift Operations',
      desc: 'Dual-control Toyota Corolla & Mazda 3 vehicles feature smooth automatic transmissions with Park, Reverse, Neutral, and Drive modes.',
      tips: [
        'Ensure foot is firmly on brake pedal before shifting into Drive.',
        'Check rear mirrors before engaging Reverse gear.'
      ]
    },
    mirrors: {
      title: 'Rear Vision & Side Mirrors',
      subtitle: '5-Second Head Checks & Blind Spots',
      desc: 'Examiners check whether you perform shoulder head checks before merging or changing lanes.',
      tips: [
        'Perform head shoulder checks before pulling out from the kerb.',
        'Check rear vision mirror every 8-10 seconds.'
      ]
    }
  };

  const currentInfo = activeSpot ? HOTSPOTS[activeSpot] : HOTSPOTS['pedals'];

  return (
    <div className="cockpit-page">
      <PageHeader 
        tag="INTERACTIVE CABIN SIMULATOR"
        title="360° VEHICLE COCKPIT & CONTROLS."
        subtitle="Explore the interior controls of our dual-control Toyota Corolla before your first driving lesson!"
        breadcrumb="Cockpit Simulator"
      />

      <section className="section-padding">
        <div className="container">
          <div className="cockpit-grid">
            {/* Visual Cabin Container */}
            <div className="cabin-visual-card aura-card dark-theme">
              <div className="cabin-top-bar">
                <span className="pill-badge accent">CLICK HOTSPOTS TO EXPLORE</span>
                <span className="car-model-tag">2025 Toyota Corolla Dual-Control</span>
              </div>

              {/* Interactive Cabin Graphic */}
              <div className="cabin-graphic-container">
                <div className="windshield-view">
                  <span>ROAD AHEAD • SERVICE NSW TEST ROUTE</span>
                </div>

                {/* Hotspot 1: Steering */}
                <button 
                  className={`hotspot-pin steering ${activeSpot === 'steering' ? 'active' : ''}`}
                  onClick={() => setActiveSpot('steering')}
                >
                  <Eye size={16} />
                  <span>Steering</span>
                </button>

                {/* Hotspot 2: Dual Pedals */}
                <button 
                  className={`hotspot-pin pedals ${activeSpot === 'pedals' ? 'active' : ''}`}
                  onClick={() => setActiveSpot('pedals')}
                >
                  <ShieldCheck size={16} />
                  <span>Dual Pedals</span>
                </button>

                {/* Hotspot 3: Gear Shifter */}
                <button 
                  className={`hotspot-pin gear ${activeSpot === 'gear' ? 'active' : ''}`}
                  onClick={() => setActiveSpot('gear')}
                >
                  <Car size={16} />
                  <span>Shifter</span>
                </button>

                {/* Hotspot 4: Mirrors */}
                <button 
                  className={`hotspot-pin mirrors ${activeSpot === 'mirrors' ? 'active' : ''}`}
                  onClick={() => setActiveSpot('mirrors')}
                >
                  <Eye size={16} />
                  <span>Mirrors</span>
                </button>
              </div>
            </div>

            {/* Explanation Drawer */}
            <div className="cockpit-drawer-card aura-card">
              <span className="pill-badge accent">CONTROL EXPLANATION</span>
              <h3 className="drawer-title">{currentInfo.title}</h3>
              <span className="drawer-sub">{currentInfo.subtitle}</span>

              <p className="drawer-desc">{currentInfo.desc}</p>

              <div className="tips-box">
                <strong>💡 Test Day Inspection Tips:</strong>
                <ul>
                  {currentInfo.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="drawer-cta-box">
                <Button to="/book" variant="yellow" size="lg" icon={<ArrowRight size={16} />} style={{ width: '100%' }}>
                  BOOK LESSON IN THIS VEHICLE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .cockpit-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2rem;
        }
        @media (max-width: 900px) {
          .cockpit-grid { grid-template-columns: 1fr; }
        }

        .cabin-visual-card {
          padding: 1.5rem;
          min-height: 440px;
          display: flex;
          flex-direction: column;
        }
        .cabin-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .car-model-tag {
          font-size: 0.775rem;
          font-weight: 700;
          color: #94A3B8;
        }

        .cabin-graphic-container {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          position: relative;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .windshield-view {
          width: 80%;
          height: 120px;
          border-radius: var(--radius-md);
          background: linear-gradient(180deg, rgba(37, 99, 235, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 800;
          color: #94A3B8;
          letter-spacing: 0.06em;
        }

        .hotspot-pin {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-full);
          background: #07131D;
          border: 1.5px solid var(--accent-gold);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
        }
        .hotspot-pin:hover, .hotspot-pin.active {
          background: var(--accent-gold);
          color: #07131D;
          transform: scale(1.1);
        }

        .hotspot-pin.steering { top: 40%; left: 25%; }
        .hotspot-pin.pedals { bottom: 20%; right: 30%; }
        .hotspot-pin.gear { bottom: 25%; left: 45%; }
        .hotspot-pin.mirrors { top: 20%; right: 15%; }

        .cockpit-drawer-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .drawer-title {
          font-size: 1.5rem;
          margin-bottom: 0.15rem;
        }
        .drawer-sub {
          font-size: 0.85rem;
          color: #64748B;
          font-weight: 700;
          display: block;
        }
        .drawer-desc {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.5;
        }

        .tips-box {
          background: #FAFAF8;
          padding: 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.85rem;
        }
        .tips-box ul {
          padding-left: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          color: #475569;
        }

        .drawer-cta-box {
          margin-top: auto;
        }
      `}</style>
    </div>
  );
};
