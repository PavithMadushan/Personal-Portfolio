"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/lib/data"; // Import centralized data

// Categories for filter buttons
const categories = [
  "All",
  "Software Development",
  "UI/UX",
  "Web Design",
  "App Design",
  "Graphic Design",
];
export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter logic
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="container py-20 lg:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">My Projects</h2>
        <p className="max-w-2xl text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur. Mollis erat duis aliquam mauris est risus lectus.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="mt-12 flex flex-wrap justify-center gap-2 md:gap-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-6 transition-all ${
              activeCategory === category 
                ? "bg-primary text-primary-foreground hover:bg-orange-600" 
                : "bg-background hover:bg-muted"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* The Animated Grid */}
      <motion.div 
        layout // Enables smooth shuffling animation
        className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout"> 
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Wrap the Card in a Link to the details page */}
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <Card className="group h-full overflow-hidden border-border/50 bg-card/50 transition-all hover:border-primary/50 cursor-pointer">
                  <CardContent className="p-0">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="font-semibold text-white">View Project</p>
                      </div>
                    </div>
                    
                    {/* Text Content */}
                    <div className="p-6">
                      <p className="text-xs font-medium text-primary uppercase tracking-wider">
                        {project.category}
                      </p>
                      <h3 className="mt-2 text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
