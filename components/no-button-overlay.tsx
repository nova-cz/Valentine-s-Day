"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// ====================================================================
// CUSTOMIZE: Replace these GIF URLs with your own funny cat GIFs
// ====================================================================
const CAT_GIFS = [
  "/gifs/2.gif",
  "/gifs/kangoro.gif",
  "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
  "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
  "https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif",
  "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
  "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif",
  "https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif",
];

// ====================================================================
// CUSTOMIZE: Change or add playful messages here
// ====================================================================
const PLAYFUL_MESSAGES = [
  "Are you sure? \u{1F63C}",
  "Really really sure? \u{1F914}",
  "Maybe try again... \u{1F60F}",
  "I don't think that's the right answer \u{1F609}",
  "My heart is breaking! \u{1F494}",
  "Last chance to reconsider! \u{1F499}",
];

interface NoButtonOverlayProps {
  noCount: number;
  isVisible: boolean;
  onDismiss: () => void;
}

export function NoButtonOverlay({
  noCount,
  isVisible,
  onDismiss,
}: NoButtonOverlayProps) {
  const gifIndex = (noCount - 1) % CAT_GIFS.length;
  const messageIndex = (noCount - 1) % PLAYFUL_MESSAGES.length;

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm"
          onClick={onDismiss}
          role="dialog"
          aria-label="Playful response"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: -30 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="mx-4 flex max-w-sm flex-col items-center gap-4 rounded-2xl bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="overflow-hidden rounded-xl"
              initial={{ rotate: -3 }}
              animate={{ rotate: [3, -3, 3] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CAT_GIFS[gifIndex] || "/placeholder.svg"}
                alt="Funny cat reaction"
                className="h-48 w-48 rounded-xl object-cover"
              />
            </motion.div>

            <motion.p
              className="text-center text-xl font-sans font-bold text-foreground"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {PLAYFUL_MESSAGES[messageIndex]}
            </motion.p>

            <motion.div
              className="h-1 w-full rounded-full bg-muted overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 2.5, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
