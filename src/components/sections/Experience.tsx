
"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { TechStackBadge } from "@/components/shared/TechStackBadge";

// Updated Experience Data - Based on Latest CV
const experiences = [
  {
    title: "Software Engineer",
    company: "DuranIT Pvt Ltd | New Zealand",
    date: "08 months | 2026",
    description: [
      "Developed and maintained enterprise web applications across international projects in Australia and New Zealand, using C#, JavaScript, Next.js, Angular, .NET, ASP.NET Core, VB.NET and WordPress.",

      "Gained hands-on experience with Clean Architecture, Microservices, REST APIs, Repository Pattern, Dependency Injection, and Role-Based Access Control, alongside Azure OpenAI, Azure Cognitive Services, and LLM integration.",

      "Worked with SQL Server, MySQL, Azure services, Microsoft Graph API, and third-party integrations, focusing on application development, testing, debugging, and maintenance.",

      "Collaborated with international clients and team members on requirements, technical solutions, and project deliverables, using Git, Bitbucket, and Azure DevOps for version control and collaboration.",
    ],
    technologies: [
    "Angular",
    "Reactjs",
    "Nextjs",
    "Nodejs",
    "ASP.NET",
    "MVC",
    "EF Core",
    "PL/SQL",
    "Azure",
    "OpenAI",
    "Prompt Engineering",
    "LLM",
    "Typescript",
    "Git",
    "REST API",
    "CI/CD",
  ]
  },
  {
    title: "Junior Developer",
    company: "CUBE Global Limited | UK",
    date: "06 months | 2025",
    description: [
      "Developed backend solutions by analyzing domain-specific requirements and applying software engineering best practices using C#, JavaScript, .NET Framework and Angular.",

      "Supported web scraping, web crawling, and automated data extraction workflows to process structured regulatory content, alongside REST API integration and Azure cloud services.",

      "Tested, debugged, and documented software for quality, maintainability, and reliability.",

      "Collaborated with cross-functional teams and stakeholders in Agile/Scrum workflows, contributing to sprint planning and iterative delivery using Jira, Bitbucket, Git, and Microsoft Teams.",
    ],
    technologies: [
  "Angular",
  ".NET",
  "EF",
  "CSharp",
  "TypeScript",
  "Bitbucket",
  "MVC",
  "MSSQL",
  "REST API",
  "Jira",
  "MS Teams",
],
  },
  {
    title: "Intern - Fullstack-Developer",
    company: "United Nations | Sri Lanka",
    date: "10 months | 2023",
    description: [
      "Gathered business requirements from HR, Administration, Procurement, and Finance departments, developing tailored solutions and creating wireframes and prototypes using Figma to improve user experience.",

      "Developed web application frontends using MERN, Next.js, TypeScript, and Redux, collaborating with developers to maintain code quality while gaining exposure to AWS.",
    ],
    technologies: [
  "Reactjs",
  "Nodejs",
  "Expressjs",
  "MongoDB",
  "Redux",
  "Nextjs",
  "TypeScript",
  "Git",
  "Figma",
  "AWS",
],
  },
];

export function Experience() {
  // Reference for tracking scroll progress
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scrolling progress for the animated timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  return (
    <section id="experience" className="container py-20 lg:py-32">
      <h2 className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl">
        My <span className="text-primary">Experience</span>
      </h2>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative mx-auto max-w-6xl">

        {/* Static Gray Timeline */}
        <div className="absolute left-0 top-0 h-full w-1 -translate-x-1/2 bg-border md:left-1/2" />

        {/* Animated Orange Timeline */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-0 top-0 h-full w-1 origin-top -translate-x-1/2 bg-primary md:left-1/2"
        />

        {/* Experience Items */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <TimelineItem key={index} data={exp} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

// Individual Timeline Item Component
function TimelineItem({
  data,
  index,
}: {
  data: (typeof experiences)[number];
  index: number;
}) {
  // Alternate timeline cards on desktop
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative flex flex-col md:flex-row ${
        isEven ? "md:flex-row-reverse" : ""
      } items-center justify-between`}
    >
      {/* Spacer for desktop layout */}
      <div className="flex-1" />

      {/* Timeline Dot */}
      <div className="absolute left-0 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-primary shadow md:left-1/2">
        <div className="h-2 w-2 rounded-full bg-white" />
      </div>

      {/* Experience Content Card */}
      <div
  className={`ml-12 w-[calc(100%-3rem)] rounded-xl border border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-card md:ml-0 md:w-[calc(50%-1rem)]`}
>
        {/* Employment Duration */}
        <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {data.date}
        </span>

        {/* Job Title */}
        <h3 className="text-xl font-bold">
          {data.title}
        </h3>

        {/* Company */}
        <h4 className="text-base font-medium text-muted-foreground">
          {data.company}
        </h4>

        {/* Responsibilities */}
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {data.description.map((item, descriptionIndex) => (
            <li key={descriptionIndex}>
              {item}
            </li>
          ))}
        </ul>


{/* Technology Stack */}
<div className="mt-6 border-t border-border/60 pt-4">

  <h5 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
    Tech Stack
  </h5>

  <div className="flex flex-wrap gap-2">
    {data.technologies.map((tech) => (
      <TechStackBadge
        key={tech}
        name={tech}
      />
    ))}
  </div>

</div>


      </div>
    </motion.div>
  );
}
