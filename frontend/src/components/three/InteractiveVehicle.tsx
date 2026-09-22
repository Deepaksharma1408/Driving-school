import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface InteractiveVehicleProps {
  scrollProgress?: number;
  activePhase?: number;
  onPhaseChange?: (phase: number) => void;
  className?: string;
  showControls?: boolean;
}

export const InteractiveVehicle: React.FC<InteractiveVehicleProps> = ({
  scrollProgress = 0,
  activePhase = 0,
  className = '',
  showControls = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Paint color state
  const [paintColor, setPaintColor] = useState<'champagne' | 'onyx' | 'silver'>('champagne');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // References for Three.js scene
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const bodyMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });
  const targetCamPosRef = useRef(new THREE.Vector3(0, 1.2, 5.5));
  const currentCamPosRef = useRef(new THREE.Vector3(0, 1.2, 5.5));
  const animFrameIdRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  // Color map
  const colorMap = {
    champagne: {
      color: 0xC5A880,
      roughness: 0.25,
      metalness: 0.85,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1
    },
    onyx: {
      color: 0x111111,
      roughness: 0.15,
      metalness: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    },
    silver: {
      color: 0xD0D3D6,
      roughness: 0.2,
      metalness: 0.88,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08
    }
  };

  // Phase camera profiles
  const phaseAngles = [
    { pos: new THREE.Vector3(0.3, 1.1, 5.4), rotY: -0.15 },    // Phase 0: Elegant 3/4 Front Studio Profile
    { pos: new THREE.Vector3(-1.8, 1.3, 4.2), rotY: 0.4 },     // Phase 1: Learn - Driver-side observation
    { pos: new THREE.Vector3(2.2, 0.9, 4.0), rotY: -0.5 },     // Phase 2: Practice - Dynamic corner stance
    { pos: new THREE.Vector3(0, 1.4, 5.8), rotY: 0 }          // Phase 3: Master - Grand horizon stance
  ];

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    try {
      const width = container.clientWidth;
      const height = container.clientHeight;

      // 1. Scene
      const scene = new THREE.Scene();
      // Warm ivory fog to softly blend ground into studio background
      scene.fog = new THREE.FogExp2(0xF3F0E9, 0.045);
      sceneRef.current = scene;

      // 2. Camera
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0.3, 1.1, 5.4);
      cameraRef.current = camera;

      // 3. Renderer with high visual fidelity & soft shadows
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;

      // 4. Studio Lighting Rig (Warm Ivory European Studio Benchmark)
      const ambientLight = new THREE.AmbientLight(0xFDFBF7, 1.4);
      scene.add(ambientLight);

      // Main overhead soft studio key light
      const keyLight = new THREE.DirectionalLight(0xFFF9EE, 2.2);
      keyLight.position.set(4, 8, 5);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.bias = -0.0005;
      scene.add(keyLight);

      // Warm rim/kicker light from behind
      const rimLight = new THREE.DirectionalLight(0xE8D9C0, 1.8);
      rimLight.position.set(-6, 4, -4);
      scene.add(rimLight);

      // Subtle underglow / fill light
      const fillLight = new THREE.DirectionalLight(0xD8D4C8, 0.9);
      fillLight.position.set(0, -2, 4);
      scene.add(fillLight);

      // 5. Studio Ground Plane with Soft Contact Shadow
      const groundGeo = new THREE.PlaneGeometry(30, 30);
      const groundMat = new THREE.ShadowMaterial({
        opacity: 0.18
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.55;
      ground.receiveShadow = true;
      scene.add(ground);

      // Contact shadow disc directly below vehicle
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = 256;
      shadowCanvas.height = 256;
      const ctx = shadowCanvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(128, 128, 15, 128, 128, 120);
        gradient.addColorStop(0, 'rgba(15, 15, 15, 0.45)');
        gradient.addColorStop(0.4, 'rgba(15, 15, 15, 0.18)');
        gradient.addColorStop(1, 'rgba(15, 15, 15, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
      }
      const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
      const contactShadowGeo = new THREE.PlaneGeometry(5.2, 2.8);
      const contactShadowMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false
      });
      const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
      contactShadow.rotation.x = -Math.PI / 2;
      contactShadow.position.y = -0.54;
      scene.add(contactShadow);

      // 6. Luxury Vehicle Architectural Mesh Group
      const carGroup = new THREE.Group();
      carGroupRef.current = carGroup;

      // Premium car paint material
      const bodyMat = new THREE.MeshPhysicalMaterial({
        color: colorMap[paintColor].color,
        roughness: colorMap[paintColor].roughness,
        metalness: colorMap[paintColor].metalness,
        clearcoat: colorMap[paintColor].clearcoat,
        clearcoatRoughness: colorMap[paintColor].clearcoatRoughness,
        reflectivity: 0.95
      });
      bodyMaterialRef.current = bodyMat;

      // Dark carbon / trim material
      const trimMat = new THREE.MeshStandardMaterial({
        color: 0x181818,
        roughness: 0.4,
        metalness: 0.6
      });

      // Glass material
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x11161B,
        roughness: 0.1,
        transmission: 0.85,
        thickness: 0.5,
        transparent: true,
        opacity: 0.92,
        reflectivity: 0.9
      });

      // Chrome / metallic alloy material
      const alloyMat = new THREE.MeshStandardMaterial({
        color: 0xD8D4C8,
        metalness: 0.95,
        roughness: 0.2
      });

      // Headlight optical material
      const headlightMat = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        emissive: 0xE8F4FF,
        emissiveIntensity: 0.8,
        roughness: 0.1
      });

      // Main aerodynamic lower chassis
      const lowerBodyGeo = new THREE.BoxGeometry(3.9, 0.46, 1.76);
      const lowerBody = new THREE.Mesh(lowerBodyGeo, bodyMat);
      lowerBody.position.y = -0.12;
      lowerBody.castShadow = true;
      lowerBody.receiveShadow = true;
      carGroup.add(lowerBody);

      // Front nose slope
      const noseGeo = new THREE.CylinderGeometry(0.78, 0.88, 1.2, 32);
      const nose = new THREE.Mesh(noseGeo, bodyMat);
      nose.rotation.z = Math.PI / 2;
      nose.scale.set(0.35, 1, 0.72);
      nose.position.set(1.45, -0.16, 0);
      nose.castShadow = true;
      carGroup.add(nose);

      // Cabin / Greenhouse
      const cabinGeo = new THREE.BoxGeometry(2.0, 0.44, 1.4);
      const cabin = new THREE.Mesh(cabinGeo, glassMat);
      cabin.position.set(-0.15, 0.26, 0);
      cabin.castShadow = true;
      carGroup.add(cabin);

      // Roof panel
      const roofGeo = new THREE.BoxGeometry(1.65, 0.05, 1.28);
      const roof = new THREE.Mesh(roofGeo, bodyMat);
      roof.position.set(-0.18, 0.49, 0);
      roof.castShadow = true;
      carGroup.add(roof);

      // Front windshield slope
      const windshieldGeo = new THREE.BoxGeometry(0.8, 0.04, 1.36);
      const windshield = new THREE.Mesh(windshieldGeo, glassMat);
      windshield.rotation.z = 0.55;
      windshield.position.set(0.92, 0.16, 0);
      carGroup.add(windshield);

      // Rear window slope
      const rearWindowGeo = new THREE.BoxGeometry(0.72, 0.04, 1.34);
      const rearWindow = new THREE.Mesh(rearWindowGeo, glassMat);
      rearWindow.rotation.z = -0.52;
      rearWindow.position.set(-1.22, 0.16, 0);
      carGroup.add(rearWindow);

      // Underbody diffuser / side skirts
      const skirtGeo = new THREE.BoxGeometry(3.96, 0.1, 1.82);
      const skirt = new THREE.Mesh(skirtGeo, trimMat);
      skirt.position.y = -0.36;
      skirt.receiveShadow = true;
      carGroup.add(skirt);

      // Headlight LED strips
      const headlightLeftGeo = new THREE.BoxGeometry(0.3, 0.06, 0.22);
      const headlightLeft = new THREE.Mesh(headlightLeftGeo, headlightMat);
      headlightLeft.position.set(1.9, -0.05, 0.62);
      carGroup.add(headlightLeft);

      const headlightRight = headlightLeft.clone();
      headlightRight.position.z = -0.62;
      carGroup.add(headlightRight);

      // Wheels helper
      const createWheel = (x: number, z: number) => {
        const wheelGroup = new THREE.Group();
        wheelGroup.position.set(x, -0.32, z);

        // Tire
        const tireGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.24, 24);
        const tireMat = new THREE.MeshStandardMaterial({
          color: 0x1A1A1A,
          roughness: 0.8
        });
        const tire = new THREE.Mesh(tireGeo, tireMat);
        tire.rotation.x = Math.PI / 2;
        tire.castShadow = true;
        wheelGroup.add(tire);

        // Rim
        const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.25, 16);
        const rim = new THREE.Mesh(rimGeo, alloyMat);
        rim.rotation.x = Math.PI / 2;
        wheelGroup.add(rim);

        // Brake Caliper (Subtle Champagne Accent)
        const caliperGeo = new THREE.BoxGeometry(0.08, 0.14, 0.09);
        const caliperMat = new THREE.MeshStandardMaterial({
          color: 0xC5A880,
          metalness: 0.8,
          roughness: 0.3
        });
        const caliper = new THREE.Mesh(caliperGeo, caliperMat);
        caliper.position.set(0.06, 0.1, 0);
        wheelGroup.add(caliper);

        return wheelGroup;
      };

      carGroup.add(createWheel(1.22, 0.86));
      carGroup.add(createWheel(1.22, -0.86));
      carGroup.add(createWheel(-1.22, 0.86));
      carGroup.add(createWheel(-1.22, -0.86));

      scene.add(carGroup);

      // 7. Resize Handler
      const handleResize = () => {
        if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // 8. Intersection Observer for Performance
      const observer = new IntersectionObserver(([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(container);

      // 9. Animation Loop with Cinematic Damping & Subtle Rotation
      let clock = new THREE.Clock();

      const animate = () => {
        animFrameIdRef.current = requestAnimationFrame(animate);

        if (!isVisibleRef.current) return;

        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Subtle ambient floating / breathing motion (very slow and restrained)
        if (carGroupRef.current) {
          // Pointer rotation interpolation
          currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;
          currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;

          // Subtle base turn + mouse reaction
          const baseTurn = phaseAngles[Math.min(activePhase, 3)].rotY;
          carGroupRef.current.rotation.y = baseTurn + currentRotationRef.current.y + Math.sin(time * 0.4) * 0.02;
          carGroupRef.current.rotation.x = currentRotationRef.current.x;
          carGroupRef.current.position.y = Math.sin(time * 0.8) * 0.012;
        }

        // Camera smoothly moves to target phase position
        if (cameraRef.current) {
          const target = phaseAngles[Math.min(activePhase, 3)].pos;
          currentCamPosRef.current.lerp(target, 0.04);
          cameraRef.current.position.copy(currentCamPosRef.current);
          cameraRef.current.lookAt(0, 0.1, 0);
        }

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };

      animate();

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        observer.disconnect();
        cancelAnimationFrame(animFrameIdRef.current);
        renderer.dispose();
      };
    } catch (err) {
      console.warn('WebGL initialization failed, using high-res automotive fallback:', err);
      setWebGLSupported(false);
    }
  }, []);

  // Update Paint Material on State Change
  useEffect(() => {
    if (bodyMaterialRef.current) {
      const cfg = colorMap[paintColor];
      bodyMaterialRef.current.color.setHex(cfg.color);
      bodyMaterialRef.current.roughness = cfg.roughness;
      bodyMaterialRef.current.metalness = cfg.metalness;
      bodyMaterialRef.current.clearcoat = cfg.clearcoat;
      bodyMaterialRef.current.needsUpdate = true;
    }
  }, [paintColor]);

  // Pointer Interaction
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

    // Restrained pointer rotation limits: ±14° yaw, ±4° pitch
    targetRotationRef.current.y = nx * 0.24;
    targetRotationRef.current.x = -ny * 0.07;
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    targetRotationRef.current.y = 0;
    targetRotationRef.current.x = 0;
  }, []);

  // Hotspot details
  const hotspots = [
    { id: 'dual', label: 'DUAL CONTROL SYSTEM', desc: 'Certified dual brake & accelerator safety linkage' },
    { id: 'ancap', label: '5-STAR ANCAP SAFETY', desc: 'Autonomous emergency braking & active lane keep' },
    { id: 'telemetry', label: 'LIVE TELEMETRY', desc: 'Real-time GPS route mapping & speed audit' }
  ];

  return (
    <div 
      ref={containerRef}
      className={`interactive-vehicle-viewport ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
    >
      {/* 3D Canvas */}
      {webGLSupported ? (
        <canvas ref={canvasRef} className="vehicle-three-canvas" />
      ) : (
        /* High-res Automotive Studio Fallback */
        <div className="vehicle-fallback-visual">
          <img 
            src="/assets/real_drift_gold.jpg" 
            alt="Drivinity Luxury Dual-Control Training Vehicle" 
            className="fallback-car-img" 
          />
        </div>
      )}

      {/* Floating Studio Controls (Benchmark: "Hotspots Off/On" & "Change colour") */}
      {showControls && (
        <div className="studio-control-overlay hide-mobile">
          {/* Color Switcher */}
          <div className="studio-pill-control">
            <span className="control-label">FINISH:</span>
            <div className="color-swatches-row">
              <button 
                className={`color-swatch-btn champagne ${paintColor === 'champagne' ? 'active' : ''}`}
                onClick={() => setPaintColor('champagne')}
                aria-label="Select Champagne Metallic Paint"
                title="Champagne Metallic"
              />
              <button 
                className={`color-swatch-btn onyx ${paintColor === 'onyx' ? 'active' : ''}`}
                onClick={() => setPaintColor('onyx')}
                aria-label="Select Onyx Black Paint"
                title="Onyx Black"
              />
              <button 
                className={`color-swatch-btn silver ${paintColor === 'silver' ? 'active' : ''}`}
                onClick={() => setPaintColor('silver')}
                aria-label="Select Silver Pearl Paint"
                title="Silver Pearl"
              />
            </div>
          </div>

          {/* Interactive Specification Hotspots */}
          <div className="hotspot-trigger-strip">
            {hotspots.map((h) => (
              <button
                key={h.id}
                className={`hotspot-tag-btn ${activeHotspot === h.id ? 'active' : ''}`}
                onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
              >
                <span className="hotspot-dot" />
                <span>{h.label}</span>
              </button>
            ))}
          </div>

          {/* Active Hotspot Modal / Popover */}
          {activeHotspot && (
            <div className="hotspot-detail-toast">
              <strong>{hotspots.find(h => h.id === activeHotspot)?.label}</strong>
              <p>{hotspots.find(h => h.id === activeHotspot)?.desc}</p>
            </div>
          )}
        </div>
      )}

      {/* Ground Ambience Horizon Fade */}
      <div className="studio-ground-gradient" />

      <style>{`
        .interactive-vehicle-viewport {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          cursor: grab;
          touch-action: pan-y;
        }
        @media (max-width: 768px) {
          .interactive-vehicle-viewport {
            min-height: 340px;
          }
        }
        .interactive-vehicle-viewport:active {
          cursor: grabbing;
        }
        .vehicle-three-canvas {
          width: 100% !important;
          height: 100% !important;
          display: block;
          outline: none;
        }
        .vehicle-fallback-visual {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .fallback-car-img {
          max-width: 90%;
          max-height: 80%;
          object-fit: contain;
          filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15));
        }

        /* Studio Ground Floor Shadow */
        .studio-ground-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 25%;
          background: linear-gradient(180deg, rgba(243, 240, 233, 0) 0%, rgba(243, 240, 233, 0.8) 100%);
          pointer-events: none;
        }

        /* Studio Controls Overlay (Top Right & Bottom Left) */
        .studio-control-overlay {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          right: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 15;
          pointer-events: none;
        }
        .studio-pill-control {
          pointer-events: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--border-light);
          padding: 0.45rem 1rem;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 16px rgba(17, 17, 17, 0.04);
        }
        .control-label {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--text-muted);
        }
        .color-swatches-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .color-swatch-btn {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1.5px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .color-swatch-btn.champagne {
          background-color: #C5A880;
        }
        .color-swatch-btn.onyx {
          background-color: #1A1A1A;
        }
        .color-swatch-btn.silver {
          background-color: #D4D8DC;
        }
        .color-swatch-btn.active {
          border-color: var(--text-primary);
          transform: scale(1.18);
        }

        /* Hotspot Buttons */
        .hotspot-trigger-strip {
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hotspot-tag-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
        }
        .hotspot-tag-btn:hover, .hotspot-tag-btn.active {
          background: var(--bg-charcoal);
          color: var(--text-white);
          border-color: var(--bg-charcoal);
        }
        .hotspot-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent-champagne);
        }

        /* Hotspot Detail Toast */
        .hotspot-detail-toast {
          position: absolute;
          bottom: 3.5rem;
          right: 0;
          background: rgba(17, 17, 17, 0.92);
          backdrop-filter: blur(16px);
          color: #FFFFFF;
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.12);
          max-width: 280px;
          pointer-events: auto;
          animation: fadeInToast 0.25s ease forwards;
        }
        .hotspot-detail-toast strong {
          display: block;
          font-family: var(--font-display);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: var(--accent-champagne);
          margin-bottom: 0.25rem;
        }
        .hotspot-detail-toast p {
          font-size: 0.8rem;
          color: #E2DFD8;
          line-height: 1.4;
          margin: 0;
        }
        @keyframes fadeInToast {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
