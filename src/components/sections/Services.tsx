"use client";

import { motion } from "framer-motion";
import { 
  Palette,      // For Graphic Design
  Layout,       // For Web Design
  Smartphone,   // For App Design
  Figma         // For UI/UX (using Figma icon as proxy or standard LayoutDashboard)
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TechStackBadge } from "@/components/shared/TechStackBadge";

// 1. Data Structure
const services = [
  {
    title: ".NET Development",
    technologies: [
      "MVC",
      "Web API",
      "SOLID",
      "Microservices",
      "Clean Architecture",
      "CQRS",
      "EF",
    ],
    icon: <Figma className="h-10 w-10 text-primary" />,
  },
  {
    title: "JS Stack",
    technologies: [
      "Next.js",
      "React.js",
      "React Native",
      "Angular",
      "NodeJs",
      "ExpressJs",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
    ],
    icon: <Layout className="h-10 w-10 text-primary" />,
  },
  {
    title: "Database",
    technologies: [
      "SQL",
      "MSSQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Indexing",
      "Stored Procedures",      
      "Query Optimization",
      "Normalization",
    ],
    icon: <Smartphone className="h-10 w-10 text-primary" />,
  },
  {
    title: "Cloud & DevOps",
    technologies: [
      "Git",
      "Azure",
      "AWS",
      "CI/CD",
      "Docker",
      "Kubernetes",
    ],
    icon: <Palette className="h-10 w-10 text-primary" />,
  },
];

// 2. Animation Variants
// This defines how the container and children animate
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card popping up
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Services() {
  return (
    <section id="services" className="container py-20 lg:py-32">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Services</h2>
        <p className="mt-4 text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa purus quis ipsum tellus. In aliquam sem at risus.
        </p>
      </div>

      {/* Grid of Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((service, index) => (
          <motion.div key={index} variants={cardVariants}>
            {/* 
              We use the Shadcn 'Card' component here.
              Added 'group' class to handle hover states on child elements.
            */}
            <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
              
              {/* Optional: Glow effect inside card on hover */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 transition-all duration-500 group-hover:from-primary/5 group-hover:to-primary/10" />

              <CardHeader>
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
  <div className="flex flex-wrap gap-2">
    {service.technologies.map((tech) => (
      <TechStackBadge
        key={tech}
        name={tech}
      />
    ))}
  </div>
</CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
