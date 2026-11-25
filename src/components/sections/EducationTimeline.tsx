"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TechStackBadge } from "@/components/shared/TechStackBadge";

// Education Data
const educationData = [
  {
    id: 1,
    degree: "BSc (Hons) in Management & Information Technology (Specializing in IT)",
    school: "University of Kelaniye",
    year: "2020 - 2024",
    location: "Kelaniye, Sri Lanka",
    description: "Acquired a robust foundation encompassing both software engineering and management. The program further imparted expertise in business management, research, analytics, and leadership, thereby fostering the capacity to develop technology-driven solutions while comprehending organizational and business imperatives.",
    skills: ["Software Engineering", "Data Structures & Algorithms", "Web Technologies", "AI", "Data Science", "QA", "Cloud Computing", "Project Management", "Data Mining and Warehousing", "Cybersecurity", "Networking", "DBMS", "IoT", "Business Information Systems"]
  },
  {
    id: 2,
    degree: "Diploma in Software Engineering",
    school: "Esoft Campus",
    year: "2019 - 2020",
    location: "Gampaha, Sri Lanka",
    description: "Esoft's Software Engineering program covers Systems Analysis & Design, Database Management, and Computer Programming, including Dynamic Web Applications, Programming Design Techniques, and Software Engineering modules. Graduates will master dynamic website development, programming methodologies, robust database design, OOP principles, SDLC models, and effective project management.",
    skills: ["Java","C#", "OOP", "SQL", "DBMS", "SDLC"]
  },
  {
    id: 3,
    degree: "GCE Advanced Level (Physical Science)",
    school: "Veyangoda Central College",
    year: "2018",
    location: "Gampaha, Sri Lanka",
    description: "Passed with A,B,B.",
    skills: ["Chemistry","Combined Maths", "Physics"]
  },
];

export function EducationTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  return (
    <div ref={containerRef} className="relative mx-auto max-w-6xl py-10">
      
      {/* Central Line */}
      <div className="absolute left-4 top-0 h-full w-1 origin-top bg-border md:left-1/2 md:-translate-x-1/2" />
      <motion.div 
        style={{ scaleY: scrollYProgress }}
        className="absolute left-4 top-0 h-full w-1 origin-top bg-primary md:left-1/2 md:-translate-x-1/2" 
      />

      <div className="space-y-16">
        {educationData.map((edu, index) => (
          <TimelineItem key={edu.id} data={edu} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ data, index }: { data: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative flex flex-col md:flex-row ${
        isEven ? "md:flex-row-reverse" : ""
      } items-start md:items-center gap-4`}
    >
      {/* Spacer for desktop layout */}
      <div className="hidden md:block flex-1" />

      {/* The Central Icon Node */}
      <div className="absolute left-4 -translate-x-1/2 md:left-1/2 md:static md:translate-x-0 z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary text-white shadow-xl">
        <GraduationCap className="h-6 w-6" />
      </div>

      {/* The Content Card */}
      <div className="ml-12 md:ml-0 flex-1 w-full md:w-auto">
        <div className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg">
          
          {/* Decorative Gradient Blob on Hover */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl" />

          {/* Header Info */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground">{data.degree}</h3>
              <p className="text-lg font-medium text-primary">{data.school}</p>
            </div>
            <div className="flex flex-col items-start gap-1 sm:items-end">
              <Badge variant="outline" className="flex items-center gap-1 border-primary/20 bg-primary/5">
                <Calendar className="h-3 w-3" /> {data.year}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {data.location}
              </span>
            </div>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            {data.description}
          </p>

          {/* Skills & Areas of Study */}
<div className="mt-6 border-t border-border/60 pt-4">
  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
    Skills & Areas of Study
  </h4>

  <div className="flex flex-wrap gap-2">
    {data.skills.map((skill: string) => (
      <TechStackBadge
        key={skill}
        name={skill}
      />
    ))}
  </div>
</div>
        </div>
      </div>

    </motion.div>
  );
}
