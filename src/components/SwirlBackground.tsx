"use client";
import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

const BACKGROUND_COLOR = "hsla(220, 100%, 5%, 1)";
const CYBERPUNK_COLORS = [180, 290]; // ✅ Teal & Purple only
const PARTICLE_COUNT = 500; // ✅ Optimized density
const PARTICLE_PROP_COUNT = 9;
const PARTICLE_PROPS_LENGTH = PARTICLE_COUNT * PARTICLE_PROP_COUNT;
const NOISE_STEPS = 8;
const GRAIN_DENSITY = 10000; // ✅ Strong grain effect without overloading CPU
const GRAIN_SIZE = 2;
const GRAIN_TEXTURES_COUNT = 5; // ✅ Number of pre-generated grain textures
const FRAME_RATE_LIMIT = 45; // ✅ Less CPU/GPU load

export default function SwirlBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleProps = useRef(new Float32Array(PARTICLE_PROPS_LENGTH));
  const grainTextures = useRef<HTMLCanvasElement[]>([]);
  const currentGrainTextureIndex = useRef(0); // ✅ Fix: Store index in useRef

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let tick = 0;
    const noise3D = createNoise3D();
    let lastRenderTime = 0;

    // ✅ Define `generateGrainTextures` BEFORE `resize`
    const generateGrainTextures = () => {
      grainTextures.current = [];
      for (let i = 0; i < GRAIN_TEXTURES_COUNT; i++) {
        const grainCanvas = document.createElement("canvas");
        grainCanvas.width = window.innerWidth;
        grainCanvas.height = window.innerHeight;
        const grainCtx = grainCanvas.getContext("2d");
        generateGrainTexture(grainCtx, grainCanvas);
        grainTextures.current.push(grainCanvas);
      }
    };

    const generateGrainTexture = (grainCtx: CanvasRenderingContext2D | null, grainCanvas: HTMLCanvasElement) => {
      if (!grainCtx) return;
      grainCtx.clearRect(0, 0, grainCanvas.width, grainCanvas.height);
      grainCtx.fillStyle = "rgba(255, 255, 255, 0.03)";
      for (let i = 0; i < GRAIN_DENSITY; i++) {
        const x = Math.random() * grainCanvas.width;
        const y = Math.random() * grainCanvas.height;
        grainCtx.fillRect(x, y, GRAIN_SIZE, GRAIN_SIZE);
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateGrainTextures();
    };

    window.addEventListener("resize", resize);
    resize();

    const initParticles = () => {
      for (let i = 0; i < PARTICLE_PROPS_LENGTH; i += PARTICLE_PROP_COUNT) {
        initParticle(i);
      }
    };

    const initParticle = (i: number) => {
      const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
      const y = Math.random() * canvas.height * 0.8 + canvas.height * 0.1;
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = 50 + Math.random() * 150;
      const speed = 0.1 + Math.random() * 2;
      const radius = 1 + Math.random() * 3;
      const hue = CYBERPUNK_COLORS[Math.floor(Math.random() * CYBERPUNK_COLORS.length)];

      particleProps.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    };

    const drawParticles = () => {
      for (let i = 0; i < PARTICLE_PROPS_LENGTH; i += PARTICLE_PROP_COUNT) {
        updateParticle(i);
      }
    };

    const updateParticle = (i: number) => {
      const i2 = i + 1, i3 = i + 2, i4 = i + 3, i5 = i + 4, i6 = i + 5, i7 = i + 6, i8 = i + 7, i9 = i + 8;

      const x = particleProps.current[i];
      const y = particleProps.current[i2];
      const noiseValue = noise3D(x * 0.00125, y * 0.00125, tick * 0.0005) * NOISE_STEPS;
      const vx = lerp(particleProps.current[i3], Math.cos(noiseValue), 0.5);
      const vy = lerp(particleProps.current[i4], Math.sin(noiseValue), 0.5);

      const life = particleProps.current[i5];
      const ttl = particleProps.current[i6];
      const speed = particleProps.current[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = particleProps.current[i8];
      const hue = particleProps.current[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue);

      particleProps.current[i] = x2;
      particleProps.current[i2] = y2;
      particleProps.current[i3] = vx;
      particleProps.current[i4] = vy;
      particleProps.current[i5] = life + 1;

      if (life > ttl || x2 < 0 || x2 > canvas.width || y2 < 0 || y2 > canvas.height) {
        initParticle(i);
      }
    };

    const drawParticle = (x: number, y: number, x2: number, y2: number, life: number, ttl: number, radius: number, hue: number) => {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue}, 100%, 80%, ${fadeInOut(life, ttl)})`;
      ctx.shadowBlur = radius * 4;
      ctx.shadowColor = `hsla(${hue}, 100%, 70%, 0.7)`;
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

    const draw = (timestamp: number) => {
      if (timestamp - lastRenderTime < 1000 / FRAME_RATE_LIMIT) {
        requestAnimationFrame(draw);
        return;
      }
      lastRenderTime = timestamp;

      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ✅ Alternate between the 5 pre-rendered grain textures
      currentGrainTextureIndex.current = (currentGrainTextureIndex.current + 1) % GRAIN_TEXTURES_COUNT;
      ctx.drawImage(grainTextures.current[currentGrainTextureIndex.current], 0, 0);

      drawParticles();
      requestAnimationFrame(draw);
    };

    generateGrainTextures();
    initParticles();
    draw(0);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />;
}

const lerp = (n1: number, n2: number, speed: number) => (1 - speed) * n1 + speed * n2;
