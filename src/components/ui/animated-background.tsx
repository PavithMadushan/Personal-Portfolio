"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-background">
      {/* 
        This uses standard CSS blur filters to create the "Aurora" effect.
        We animate the position of these blobs.
      */}
      
      {/* Blob 1: Orange (Your primary color) */}
      <motion.div
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-20%", "20%", "-20%"],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-[10%] -top-[10%] h-[50vw] w-[50vw] rounded-full bg-primary/20 blur-[100px] md:blur-[120px]"
      />

      {/* Blob 2: Purple/Blue (Contrast) or Darker Orange */}
      <motion.div
        animate={{
          x: ["20%", "-20%", "20%"],
          y: ["20%", "-20%", "20%"],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-[10%] -bottom-[10%] h-[50vw] w-[50vw] rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-[100px] md:blur-[120px]"
      />

      {/* Blob 3: Center Highlight */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300/20 dark:bg-orange-900/20 blur-[90px]"
      />
      
      {/* Noise overlay for texture (optional, makes it look like film grain) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/noise.png")' }}></div>
    </div>
  );
}
