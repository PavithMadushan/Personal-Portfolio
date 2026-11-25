"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Helper to generate random number between min and max
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export function MovingShapes() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent hydration mismatch

  // We create 15 floating shapes with random properties
  const shapes = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: random(0, 100), // Random starting X position (%)
    y: random(0, 100), // Random starting Y position (%)
    size: random(20, 100), // Random size between 20px and 100px
    duration: random(20, 40), // Random animation duration (slow)
    delay: random(0, 10), // Random delay
    type: random(0, 2), // 0=Circle, 1=Square, 2=Outline
  }));

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute opacity-10 dark:opacity-[0.07] ${
            shape.type === 0
              ? "rounded-full bg-primary" // Circle
              : shape.type === 1
              ? "rounded-xl bg-primary" // Soft Square
              : "rounded-full border-2 border-primary bg-transparent" // Outline Circle
          }`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -100, 0], // Move up and down slightly
            x: [0, random(-50, 50), 0], // Drift sideways
            rotate: [0, 180, 360], // Rotate full circle
            scale: [1, 1.2, 1], // Pulse size
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "linear",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}
