"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";
import Image from "next/image";
import { FloatingFlowers } from "@/components/floating-flowers";
import { HeartParticles } from "@/components/heart-particles";
import { ImageCarousel } from "@/components/image-carousel";

interface CelebrationScreenProps {
  onBack?: () => void;
}

const ROMANTIC_MESSAGE = "I love you ";
const SUBTITLE = "To the moon and back <3";

export function CelebrationScreen({ onBack }: CelebrationScreenProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fireConfetti = useCallback(() => {
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ["#ff6b6b", "#ff99c8", "#ffc9c9", "#ffffff", "#ff8787"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  useEffect(() => {
    fireConfetti();

    // Try to play audio
    try {
      audioRef.current = new Audio("/iloveyouso.mp3");
      audioRef.current.volume = 0.55;
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => {
        // Audio autoplay blocked - that's okay
      });
    } catch {
      // Audio not available
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [fireConfetti]);

  return (
    <>
      <HeartParticles />
      <FloatingFlowers />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 px-4 py-20 text-center"
      >
        {/* Back Button */}
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            onClick={onBack}
            className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/20 p-3 text-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-110 active:scale-95 z-50 border border-white/30"
            aria-label="Go back to proposal"
          >
            <ArrowLeft className="h-6 w-6" />
          </motion.button>
        )}

        {/* Main Section */}
        <div className="flex flex-col items-center gap-8 md:gap-12">
          {/* Headline */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
          >
            <h1 className="text-6xl font-sans font-black text-primary md:text-8xl drop-shadow-2xl tracking-tighter">
              {"I LOVE YOU SO!"}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-4xl md:text-5xl font-serif text-foreground/80 font-bold mt-4"
            >
            </motion.p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <ImageCarousel />
          </motion.div>
        </div>

        {/* Interaction section: Mariachi & Kangaroo */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-16"
        >
          {/* Mexican Mariachi */}
          <div className="flex flex-col items-center">
            <motion.span
              animate={{ rotate: [-10, 10, -10], y: [0, -5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
              className="text-6xl md:text-8xl filter drop-shadow-lg"
            >
              {"\u{1F3BB}"}
            </motion.span>
            <span className="text-3xl md:text-4xl mt-2">{"\u{1F1F2}\u{1F1FD}"}</span>
          </div>

          {/* Center flower instead of huge heart */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{
              rotate: { repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" },
              scale: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }
            }}
            className="relative w-40 h-40 md:w-56 md:h-56 filter drop-shadow-xl"
          >
            <Image
              src="/gifs/f2.png"
              alt="Rose"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Australian Kangaroo */}
          <div className="flex flex-col items-center">
            <motion.span
              animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2, ease: "easeInOut" }}
              className="text-6xl md:text-8xl filter drop-shadow-lg"
            >
              {"\u{1F998}"}
            </motion.span>
            <span className="text-3xl md:text-4xl mt-2">{"\u{1F1E6}\u{1F1FA}"}</span>
          </div>
        </motion.div>

        {/* Romantic sub-text */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="max-w-2xl px-6"
        >
          <p className="text-lg font-serif text-primary font-bold uppercase tracking-[0.2em]">
            {SUBTITLE}
          </p>
        </motion.div>

        {/* Celebration Again Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          onClick={fireConfetti}
          className="rounded-full bg-primary px-12 py-5 font-sans text-xl font-black text-primary-foreground shadow-2xl transition-all hover:scale-110 active:scale-90 hover:brightness-110 border-b-4 border-black/10"
        >
          {"¡Confeti! \u{1F389}"}
        </motion.button>
      </motion.div>
    </>
  );
}
