"use client";
import { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

const BACKGROUND_COLOR = "hsla(230, 60%, 8%, 1)"; 
const CYBERPUNK_COLORS = [180, 290]; 
const PARTICLE_COUNT = 600; 
const PARTICLE_PROP_COUNT = 9;
const PARTICLE_PROPS_LENGTH = PARTICLE_COUNT * PARTICLE_PROP_COUNT;
const NOISE_STEPS = 10;

export default function SwirlBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleProps = useRef(new Float32Array(PARTICLE_PROPS_LENGTH));
  const noise3D = createNoise3D();
  const tickRef = useRef(0);

  const [disableParticles, setDisableParticles] = useState(false);
  const [showFPSWarning, setShowFPSWarning] = useState(false);

  useEffect(() => {
    /** Performance Check - Less Aggressive */
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 3) {
      console.warn("Low CPU cores detected, disabling SwirlBackground.");
      setDisableParticles(true);
      setShowFPSWarning(true);
      setTimeout(() => setShowFPSWarning(false), 5000);
      return;
    }

    let frameCount = 0;
    const startTime = performance.now();
    let lowFpsCount = 0;
    let stopCheck = false;

    const fpsCheck = () => {
      if (stopCheck) return;
      frameCount++;
      requestAnimationFrame(fpsCheck);
    };

    const checkFPS = () => {
      const elapsed = performance.now() - startTime;
      const fps = (frameCount / elapsed) * 1000;

      if (fps < 15) {
        lowFpsCount++;
      } else if (fps > 20) {
        lowFpsCount = 0; // Reset if FPS recovers
      }

      if (lowFpsCount >= 4) { // Require 8 seconds of low FPS before disabling
        console.warn("Consistently low FPS detected, disabling SwirlBackground.");
        setDisableParticles(true);
        setShowFPSWarning(true);
        setTimeout(() => setShowFPSWarning(false), 5000);
        stopCheck = true;
      } else {
        setTimeout(checkFPS, 2000); // Check every 2 seconds
      }
    };

    setTimeout(checkFPS, 8000); // Start checking after 8 seconds to avoid false positives
    fpsCheck();

    return () => { stopCheck = true; };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || disableParticles) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticle = (i: number) => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = 60 + Math.random() * 120;
      const speed = 0.5 + Math.random() * 3;
      const radius = 1.5 + Math.random() * 2;
      const hue = CYBERPUNK_COLORS[Math.floor(Math.random() * CYBERPUNK_COLORS.length)];

      particleProps.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    };

    const initParticles = () => {
      for (let i = 0; i < PARTICLE_PROPS_LENGTH; i += PARTICLE_PROP_COUNT) {
        initParticle(i);
      }
    };

    window.addEventListener("resize", resize);
    resize();

    let animationFrameId: number;

    const drawParticles = () => {
      for (let i = 0; i < PARTICLE_PROPS_LENGTH; i += PARTICLE_PROP_COUNT) {
        updateParticle(i);
      }
    };

    const updateParticle = (i: number) => {
      const i2 = i + 1, i3 = i + 2, i4 = i + 3, i5 = i + 4, i6 = i + 5, i7 = i + 6, i8 = i + 7, i9 = i + 8;

      const x = particleProps.current[i];
      const y = particleProps.current[i2];

      // **Less Frequent Noise Calculation Calls**
      const noiseFactor = tickRef.current % 3 === 0 ? noise3D(x * 0.0015, y * 0.0015, tickRef.current * 0.0004) * NOISE_STEPS : 0;
      const vx = Math.cos(noiseFactor) * 0.5 + particleProps.current[i3] * 0.5;
      const vy = Math.sin(noiseFactor) * 0.5 + particleProps.current[i4] * 0.5;

      const life = particleProps.current[i5];
      const ttl = particleProps.current[i6];
      const speed = particleProps.current[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = particleProps.current[i8];
      const hue = particleProps.current[i9];

      drawParticle(ctx, x, y, x2, y2, life, ttl, radius, hue);

      particleProps.current[i] = x2;
      particleProps.current[i2] = y2;
      particleProps.current[i3] = vx;
      particleProps.current[i4] = vy;
      particleProps.current[i5] = life + 1;

      if (life > ttl || x2 < 0 || x2 > canvas.width || y2 < 0 || y2 > canvas.height) {
        initParticle(i);
      }
    };

    const draw = () => {
      tickRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawParticles();
      animationFrameId = requestAnimationFrame(draw);
    };

    initParticles();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [disableParticles, noise3D]);

  return (
    <>
      {!disableParticles && (
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none"></canvas>
      )}


      {/* Moving Aurora Background */}
      <div className="aurora-bg"></div>
      
      {/* Layered Radial Glow for Depth */}
      <div className="fixed inset-0 bg-radial-gradient mix-blend-overlay opacity-50"></div>

      {/* FPS Warning Message */}
      {showFPSWarning && (
        <div className="fps-warning">
          FPS too low. Disabling particles...
        </div>
      )}
    </>
  );
}

const drawParticle = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  x2: number, 
  y2: number, 
  life: number, 
  ttl: number, 
  radius: number, 
  hue: number
) => {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineWidth = radius;
  ctx.strokeStyle = `hsla(${hue}, 100%, 80%, ${fadeInOut(life, ttl)})`;
  ctx.shadowBlur = radius * 4;
  ctx.shadowColor = `hsla(${hue}, 100%, 70%, 0.5)`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};

const fadeInOut = (t: number, m: number) => {
  const halfM = 0.5 * m;
  return Math.abs(((t + halfM) % m) - halfM) / halfM;
};