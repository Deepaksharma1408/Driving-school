import React, { useState } from 'react';
import { Gauge, Shield, Navigation, Play, Pause } from 'lucide-react';

export const RunningCarVisual: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="running-car-stage">
      {/* Video / Animated Drive Scene */}
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

        {/* Dynamic Road Speed Streaks & Motion Overlay */}
        <div className="road-speed-motion-lines" />
        <div className="asphalt-reflection-vignette" />

        {/* Live HUD Telemetry Overlay */}
        <div className="car-hud-overlay">
          <div className="hud-badge live-status">
            <span className="live-pulsar-dot" />
            <span>LIVE MOCK ROUTE</span>
          </div>

          <div className="hud-bottom-telemetry">
            <div className="hud-chip">
              <Gauge size={14} className="hud-icon-gold" />
              <span>58 KM/H</span>
            </div>
            <div className="hud-chip">
              <Shield size={14} className="hud-icon-gold" />
              <span>DUAL CONTROL ACTIVE</span>
            </div>
            <div className="hud-chip">
              <Navigation size={14} className="hud-icon-gold" />
              <span>SERVICE NSW ROUTE</span>
            </div>
          </div>
        </div>

        {/* Pause/Play Toggle Button */}
        <button 
          className="playback-toggle-btn"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause car motion' : 'Play car motion'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          <span>{isPlaying ? 'MOTION ACTIVE' : 'RESUME'}</span>
        </button>
      </div>

      <style>{`
        .running-car-stage {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 440px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: #050B12;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        }
        @media (max-width: 960px) {
          .running-car-stage {
            min-height: 320px;
            border-radius: var(--radius-lg);
          }
        }
        @media (max-width: 600px) {
          .running-car-stage {
            min-height: 280px;
          }
        }
        .running-car-viewport {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* Live video */
        .live-driving-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.04);
          transition: filter 0.3s ease;
        }
        .running-car-viewport.paused .live-driving-video {
          filter: grayscale(30%) brightness(0.85);
        }

        /* Dynamic Moving Road Lines */
        .road-speed-motion-lines {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg, 
            rgba(0, 0, 0, 0.1) 0%, 
            rgba(10, 20, 32, 0.3) 60%, 
            rgba(10, 20, 32, 0.85) 100%
          );
          pointer-events: none;
        }
        .asphalt-reflection-vignette {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.6);
          pointer-events: none;
        }

        /* HUD Overlay */
        .car-hud-overlay {
          position: absolute;
          inset: 0;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          pointer-events: none;
          z-index: 10;
        }
        @media (max-width: 600px) {
          .car-hud-overlay {
            padding: 0.75rem;
          }
        }
        .hud-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(10, 20, 32, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          width: fit-content;
        }
        .live-pulsar-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22C55E;
          box-shadow: 0 0 10px #22C55E;
          animation: pulseLive 1.5s infinite;
        }
        @keyframes pulseLive {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }

        .hud-bottom-telemetry {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .hud-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(10, 20, 32, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
        }
        .hud-icon-gold {
          color: var(--accent-gold);
        }

        /* Playback toggle */
        .playback-toggle-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          z-index: 20;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(10, 20, 32, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
          cursor: pointer;
        }
        @media (max-width: 600px) {
          .playback-toggle-btn {
            top: 0.75rem;
            right: 0.75rem;
          }
        }
        .playback-toggle-btn:hover {
          background: var(--accent-gold);
          color: #0A1420;
          border-color: var(--accent-gold);
        }
      `}</style>
    </div>
  );
};
