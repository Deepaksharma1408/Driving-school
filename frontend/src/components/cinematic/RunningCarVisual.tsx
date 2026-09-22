import React, { useState } from 'react';
import { Gauge, Shield, Navigation, Play, Pause } from 'lucide-react';

export const RunningCarVisual: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="running-car-stage">
      <div className={`running-car-viewport ${isPlaying ? 'in-motion' : 'paused'}`}>
        {/* Real Driving Video Layer */}
        <video 
          className="live-driving-video"
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80"
        >
          <source src="/videos/gerte_an_vedio_ofa_moving_car.mp4" type="video/mp4" />
          <source src="/videos/drivinity-hero-driving.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-driving-down-a-coastal-road-42861-large.mp4" type="video/mp4" />
        </video>

        {/* Dynamic Road Vignette & Refined Ambient Mask */}
        <div className="asphalt-reflection-vignette" />

        {/* Minimal Restrained Telemetry Overlay */}
        <div className="car-hud-overlay">
          <div className="hud-badge live-status">
            <span className="live-pulsar-dot" />
            <span>MOCK ROUTE AUDIT ACTIVE</span>
          </div>

          <div className="hud-bottom-telemetry">
            <div className="hud-chip">
              <Gauge size={13} className="hud-icon-champagne" />
              <span>50 KM/H URBAN CORRIDOR</span>
            </div>
            <div className="hud-chip">
              <Shield size={13} className="hud-icon-champagne" />
              <span>DUAL BRAKE ARMED</span>
            </div>
            <div className="hud-chip">
              <Navigation size={13} className="hud-icon-champagne" />
              <span>SERVICE NSW BOTANY / ROCKDALE</span>
            </div>
          </div>
        </div>

        {/* Minimal Playback Toggle */}
        <button 
          className="playback-toggle-btn"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause simulation motion' : 'Play simulation motion'}
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          <span>{isPlaying ? 'PAUSE' : 'RESUME'}</span>
        </button>
      </div>

      <style>{`
        .running-car-stage {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 480px;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #080808;
          border: 1px solid var(--border-light);
          box-shadow: 0 16px 40px rgba(17, 17, 17, 0.08);
        }

        @media (max-width: 960px) {
          .running-car-stage {
            min-height: 340px;
          }
        }

        @media (max-width: 600px) {
          .running-car-stage {
            min-height: 260px;
          }
        }

        .running-car-viewport {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .live-driving-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: filter 0.3s ease;
        }

        .running-car-viewport.paused .live-driving-video {
          filter: grayscale(40%) brightness(0.7);
        }

        .asphalt-reflection-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8, 8, 8, 0.25) 0%, rgba(8, 8, 8, 0.2) 40%, rgba(8, 8, 8, 0.85) 100%);
          pointer-events: none;
        }

        /* Restrained HUD Overlay */
        .car-hud-overlay {
          position: absolute;
          inset: 0;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          pointer-events: none;
          z-index: 10;
        }

        @media (max-width: 600px) {
          .car-hud-overlay {
            padding: 1rem;
          }
        }

        .hud-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(17, 17, 17, 0.82);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          width: fit-content;
        }

        .live-pulsar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #34D399;
          box-shadow: 0 0 8px #34D399;
        }

        .hud-bottom-telemetry {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .hud-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(17, 17, 17, 0.82);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.64rem;
          letter-spacing: 0.08em;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
        }

        .hud-icon-champagne {
          color: var(--accent-champagne);
        }

        .playback-toggle-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 20;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(17, 17, 17, 0.82);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .playback-toggle-btn:hover {
          background: var(--accent-champagne);
          color: #111111;
          border-color: var(--accent-champagne);
        }
      `}</style>
    </div>
  );
};
