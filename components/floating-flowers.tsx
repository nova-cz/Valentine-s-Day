"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const FLOWER_IMAGES = [
  "/flowers/rose-pink.jpg",
  "/flowers/rose-red.jpg",
  "/flowers/peony.jpg",
  "/flowers/white-flower.jpg",
  "/flowers/lavender.jpg",
];

const FLOWER_EMOJIS = ["🌸", "🌹", "🌷", "🌻", "🌺", "🌼"];

export function FloatingFlowers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const flowerElements: HTMLDivElement[] = [];

    // Positions scattered around the edges
    const positions = [
      { left: "5%", top: "5%" }, { left: "15%", top: "10%" }, { left: "2%", top: "25%" },
      { left: "85%", top: "5%" }, { left: "95%", top: "15%" }, { left: "88%", top: "25%" },
      { left: "5%", top: "85%" }, { left: "15%", top: "90%" }, { left: "2%", top: "75%" },
      { left: "85%", top: "85%" }, { left: "95%", top: "90%" }, { left: "88%", top: "75%" },
    ];

    positions.forEach((pos, i) => {
      const wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.left = pos.left;
      wrapper.style.top = pos.top;
      wrapper.style.width = `${50 + (i % 3) * 20}px`;
      wrapper.style.height = `${50 + (i % 3) * 20}px`;
      wrapper.style.opacity = "0";

      // Add emoji as default/fallback
      const emoji = document.createElement("span");
      emoji.innerText = FLOWER_EMOJIS[i % FLOWER_EMOJIS.length];
      emoji.style.fontSize = "40px";
      wrapper.appendChild(emoji);

      container.appendChild(wrapper);
      flowerElements.push(wrapper);

      // Animation with GSAP
      gsap.fromTo(wrapper,
        { scale: 0, rotate: -30, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 0.8,
          duration: 1.5,
          delay: i * 0.2,
          ease: "back.out(1.7)"
        }
      );

      // Subtle floating movement
      gsap.to(wrapper, {
        y: "+=15",
        rotate: 15,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1
      });
    });

    return () => {
      flowerElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    />
  );
}
