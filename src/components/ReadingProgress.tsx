"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ReadingProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 z-50"
      style={{
        width: `${progress}%`,
        background: `linear-gradient(to right, var(--color-accent), #ff8a80)`,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.05 }}
    />
  );
}
