"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

// Data for the skills (Clean Separation of Data)
const skills = [
  { name: "Frontend Development", value: 90 },
  { name: "Backend Development", value: 85 },
  { name: "Database Management", value: 80 },
  { name: "Cloud & DevOps", value: 95 },
];

export function About() {
  return (
    <section id="about" className="container px-4 sm:px-6 py-20 lg:py-16">
      <div className="flex flex-col items-center gap-12 md:flex-row md:justify-between">
        
        {/* LEFT SIDE: Image */}
        <motion.div 
          className="relative flex flex-1 justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }} // Animates only the first time you scroll to it
        >
          <div className="relative h-72 w-72 md:h-96 md:w-96">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 bg-muted overflow-hidden">
               <Image 
                 src="/my/myback.png" // Put a different image here if you have one
                 alt="Pavith Rajapaksha" 
                 fill 
                 className="object-cover"
               />
            </div>
            {/* Decorative background circle */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-full bg-primary/10" />
          </div>
        </motion.div>

        {/* RIGHT SIDE: Content & Sliders */}
        <motion.div 
          className="flex flex-1 flex-col gap-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Drawing upon 1.5+ years of experience in software development and a strong passion for technological innovation, I am confident in my capacity to contribute effectively to your organization's dynamic and forward-thinking team.
            </p>
          </div>

          {/* Skill Sliders */}
          <div className="flex flex-col gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>{skill.name}</span>
                  <span className="text-primary">{skill.value}%</span>
                </div>
                {/* 
                  The Slider component handles the visual bar.
                  defaultValue = initial position
                  max = 100%
                  className = styling customization
                */}
                <Slider 
                  defaultValue={[skill.value]} 
                  max={100} 
                  step={1} 
                  className="[&>.absolute]:bg-primary" // This forces the "fill" track to be orange
                  disabled // Disabled so users can't change your skill level!
                />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
