"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingElements } from "@/components/floating-elements";
import { HeartParticles } from "@/components/heart-particles";
import { NoButtonOverlay } from "@/components/no-button-overlay";
import { CelebrationScreen } from "@/components/celebration-screen";

// ====================================================================
// CUSTOMIZE: Replace the photo path with your own couple photo
// Put your photo in /public folder, e.g. /public/couple-photo.jpg
// ====================================================================
const COUPLE_PHOTO = "./vday-photos/1.jpg";

// ====================================================================
// CUSTOMIZE: Change the proposal question and subtitle text
// ====================================================================
const PROPOSAL_QUESTION = "Will you be my Valentine?";
const SUBTITLE_TEXT = "I have a very important question for you...";

export function ValentineProposal() {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [showNoOverlay, setShowNoOverlay] = useState(false);
  const [isEntered, setIsEntered] = useState(false);

  const handleYes = useCallback(() => {
    setHasAnswered(true);
  }, []);

  const handleReset = useCallback(() => {
    setHasAnswered(false);
    setIsEntered(false);
    setNoCount(0);
  }, []);

  const handleNo = useCallback(() => {
    setNoCount((prev) => prev + 1);
    setShowNoOverlay(true);
  }, []);

  const dismissOverlay = useCallback(() => {
    setShowNoOverlay(false);
  }, []);

  if (hasAnswered) {
    return <CelebrationScreen onBack={handleReset} />;
  }

  return (
    <>
      <HeartParticles />
      <FloatingElements />

      <NoButtonOverlay
        noCount={noCount}
        isVisible={showNoOverlay}
        onDismiss={dismissOverlay}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-12">
        {/* Entrance animation wrapper */}
        <AnimatePresence>
          {!isEntered ? (
            <motion.div
              key="entrance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-6xl md:text-8xl"
              >
                {"\u{1F36B}"}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl font-serif text-muted-foreground md:text-2xl text-center"
              >
                {"Something sweet for you..."}
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                onClick={() => setIsEntered(true)}
                className="mt-4 rounded-full bg-primary px-8 py-3 font-sans text-lg font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {"Open \u{1F49D}"}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="proposal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg font-serif text-muted-foreground italic md:text-xl"
              >
                {SUBTITLE_TEXT}
              </motion.p>

              {/* Couple photo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                  delay: 0.7,
                }}
                className="relative overflow-hidden rounded-2xl border-4 border-card shadow-2xl"
              >
                <div className="relative h-64 w-64 md:h-80 md:w-80">
                  <Image
                    src={COUPLE_PHOTO || "/placeholder.svg"}
                    alt="Our special photo together"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Photo frame sparkle */}
                <motion.div
                  className="absolute -right-1 -top-1 text-2xl"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                >
                  {"\u{2728}"}
                </motion.div>
              </motion.div>

              {/* Main question */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="text-balance text-center text-4xl font-sans font-bold leading-tight text-foreground md:text-6xl px-4 mt-12"
              >
                {PROPOSAL_QUESTION}
              </motion.h1>

              {/* Buttons and Hint Container */}
              <div className="flex flex-col items-center gap-8 justify-center">
                {/* Buttons Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="flex flex-wrap items-center justify-center gap-8"
                >
                  {/* YES button */}
                  <motion.button
                    onClick={handleYes}
                    style={{ scale: 1 + noCount * 0.2 }}
                    className="rounded-full bg-primary px-10 py-5 font-sans text-xl font-bold text-primary-foreground shadow-2xl transition-colors hover:bg-accent relative z-20"
                    whileHover={{ scale: (1 + noCount * 0.2) * 1.08 }}
                    whileTap={{ scale: (1 + noCount * 0.2) * 0.95 }}
                    aria-label="Yes, I will be your Valentine"
                  >
                    {"YES \u{2764}\u{FE0F}"}
                  </motion.button>

                  {/* NO button */}
                  {noCount < 3 && (
                    <motion.button
                      onClick={handleNo}
                      style={{ scale: Math.max(0.1, 1 - noCount * 0.15) }}
                      className="rounded-full bg-muted px-6 py-3 font-sans text-base font-semibold text-muted-foreground shadow transition-colors hover:bg-border relative z-10"
                      whileHover={{ scale: Math.max(0.1, 1 - noCount * 0.15) * 1.05 }}
                      whileTap={{ scale: Math.max(0.1, 1 - noCount * 0.15) * 0.95 }}
                      aria-label="No"
                    >
                      {"NO \u{1F643}"}
                    </motion.button>
                  )}
                </motion.div>

                {/* Hint after pressing NO */}
                {noCount > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={noCount}
                    className="text-lg font-serif text-muted-foreground italic text-center max-w-xs"
                  >
                    {noCount >= 3
                      ? "The correct answer is obviously YES \u{1F60C}"
                      : "Are you sure? Maybe think about it again... \u{1F914}"}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
