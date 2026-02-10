"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const emojis = ["🍫", "❤️", "🍬", "🌹", "💕", "🍭", "✨", "💓"];
    const container = containerRef.current;
    const items: HTMLSpanElement[] = [];

    // Create elements
    for (let i = 0; i < 20; i++) {
      const span = document.createElement("span");
      span.innerText = emojis[i % emojis.length];
      span.style.position = "absolute";
      span.style.opacity = "0";
      span.style.fontSize = `${16 + Math.random() * 24}px`;
      span.style.userSelect = "none";
      span.style.pointerEvents = "none";
      container.appendChild(span);
      items.push(span);

      // Initial position
      gsap.set(span, {
        x: gsap.utils.random(0, window.innerWidth),
        y: window.innerHeight + 50,
      });

      // Animate up
      const duration = gsap.utils.random(8, 15);
      const delay = gsap.utils.random(0, 10);

      gsap.to(span, {
        y: -100,
        opacity: gsap.utils.random(0.2, 0.5),
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: "none",
        onRepeat: () => {
          gsap.set(span, { x: gsap.utils.random(0, window.innerWidth) });
        }
      });

      // Lateral sway
      gsap.to(span, {
        x: "+=50",
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Slight rotation
      gsap.to(span, {
        rotation: gsap.utils.random(-45, 45),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      items.forEach(item => item.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    />
  );
}
