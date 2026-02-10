"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export function HeartParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  const drawHeart = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(
        x - size / 2,
        y + (size + topCurveHeight) / 2,
        x,
        y + (size + topCurveHeight) / 2,
        x,
        y + size
      );
      ctx.bezierCurveTo(
        x,
        y + (size + topCurveHeight) / 2,
        x + size / 2,
        y + (size + topCurveHeight) / 2,
        x + size / 2,
        y + topCurveHeight
      );
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "rgba(255, 107, 107,",
      "rgba(255, 153, 200,",
      "rgba(255, 201, 201,",
      "rgba(255, 135, 135,",
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn particles
      if (particlesRef.current.length < 30 && Math.random() < 0.05) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 1,
          vy: -(0.5 + Math.random() * 1.5),
          size: 8 + Math.random() * 12,
          alpha: 0.3 + Math.random() * 0.4,
          decay: 0.001 + Math.random() * 0.003,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) return false;

        ctx.fillStyle = `${p.color} ${p.alpha})`;
        drawHeart(ctx, p.x, p.y, p.size);
        return true;
      });
    };

    gsap.ticker.add(animate);

    return () => {
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(animate);
    };
  }, [drawHeart]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
