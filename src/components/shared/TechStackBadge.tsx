
"use client";

import { useState } from "react";
import { Code2 } from "lucide-react";

interface TechStackBadgeProps {
  name: string;
}

// Technology logo configuration
// Simple Icons CDN is used for available technology logos.
const techIcons: Record<string, { slug?: string; color: string }> = {
  Angular: { slug: "angular", color: "#fff0f0" },
  Reactjs: { slug: "react", color: "#e8f8ff" },
  Nextjs: { slug: "nextdotjs", color: "#eeeeee" },
  Nodejs: { slug: "nodedotjs", color: "#edf7eb" },
  "ASP.NET": { slug: "dotnet", color: "#f0eaff" },
  ".NET": { slug: "dotnet", color: "#f0eaff" },
  "EF Core": { slug: "dotnet", color: "#f0eaff" },
  EF: { slug: "dotnet", color: "#f0eaff" },
  CSharp: { slug: "csharp", color: "#f0eaff" },
  TypeScript: { slug: "typescript", color: "#e8f1ff" },
  Typescript: { slug: "typescript", color: "#e8f1ff" },
  Bitbucket: { slug: "bitbucket", color: "#eaf1ff" },
  Git: { slug: "git", color: "#fff0e9" },
  MSSQL: { slug: "microsoftsqlserver", color: "#ffeded" },
  Azure: { slug: "microsoftazure", color: "#e8f3ff" },
  OpenAI: { slug: "openai", color: "#e8f6f1" },
  PL_SQL: { slug: "oracle", color: "#fff0f0" },
  Expressjs: { slug: "express", color: "#eeeeee" },
  MongoDB: { slug: "mongodb", color: "#edf7eb" },
  Redux: { slug: "redux", color: "#f2eaff" },
  Figma: { slug: "figma", color: "#fff0ed" },
  AWS: { slug: "amazonaws", color: "#fff5df" },
  Jira: { slug: "jira", color: "#eaf1ff" },
  "MS Teams": { slug: "microsoftteams", color: "#eeeaff" },
    // Education and academic subjects
  "Software Engineering": { color: "#e8f1ff" },
  "Data Structures & Algorithms": { color: "#f0eaff" },
  "Web Technologies": { color: "#e8f8ff" },
  AI: { color: "#e8f6f1" },
  "Data Science": { color: "#eaf1ff" },
  QA: { color: "#fff0ed" },
  "Cloud Computing": { color: "#e8f3ff" },
  "Project Management": { color: "#fff5df" },
  "Data Mining and Warehousing": { color: "#edf7eb" },
  Cybersecurity: { color: "#f2eaff" },
  Networking: { color: "#e8f3ff" },
  DBMS: { color: "#fff0f0" },
  IoT: { color: "#e8f8ff" },
  "Business Information Systems": { color: "#f0eaff" },
  Java: { slug: "java", color: "#fff0ed" },
  "C#": { slug: "csharp", color: "#f0eaff" },
  OOP: { color: "#e8f1ff" },
  SQL: { color: "#ffeded" },
  SDLC: { color: "#edf7eb" },
  Chemistry: { color: "#e8f6f1" },
  "Combined Maths": { color: "#f2eaff" },
  Physics: { color: "#e8f3ff" },

    // Additional service technologies
  "Next.js": { slug: "nextdotjs", color: "#eeeeee" },
  "React.js": { slug: "react", color: "#e8f8ff" },
  "React Native": { slug: "react", color: "#e8f8ff" },
  NodeJs: { slug: "nodedotjs", color: "#edf7eb" },
  ExpressJs: { slug: "express", color: "#eeeeee" },
  "Tailwind CSS": { slug: "tailwindcss", color: "#e8f8ff" },
  PostgreSQL: { slug: "postgresql", color: "#e8f1ff" },
  Redis: { slug: "redis", color: "#ffeded" },
  Docker: { slug: "docker", color: "#e8f3ff" },
  Kubernetes: { slug: "kubernetes", color: "#eaf1ff" },

  // Concepts and practices without dedicated technology logos
  MVC: { color: "#f0eaff" },
  "Web API": { color: "#e8f1ff" },
  SOLID: { color: "#edf7eb" },
  Microservices: { color: "#e8f6f1" },
  "Clean Architecture": { color: "#f2eaff" },
  CQRS: { color: "#fff5df" },
  "Stored Procedures": { color: "#e8f1ff" },
  Indexing: { color: "#edf7eb" },
  "Query Optimization": { color: "#e8f6f1" },
  Normalization: { color: "#f0eaff" },
  "CI/CD": { color: "#fff5df" },
};

export function TechStackBadge({ name }: TechStackBadgeProps) {
  const icon = techIcons[name];
  const [logoAvailable, setLogoAvailable] = useState(!!icon?.slug);

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{
        backgroundColor: icon?.color || "var(--muted)",
      }}
    >
      {icon?.slug && logoAvailable ? (
        <img
          src={`https://cdn.simpleicons.org/${icon.slug}`}
          alt=""
          aria-hidden="true"
          className="h-4 w-4 object-contain"
          onError={() => setLogoAvailable(false)}
        />
      ) : (
        <Code2 className="h-4 w-4 text-primary" />
      )}

      {name}
    </span>
  );
}
