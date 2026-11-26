import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    // FIX 1: Added 'flex flex-col items-center' and 'mx-auto px-4' to center everything
    <div className="container mx-auto max-w-6xl px-4 py-20 lg:py-32">
      {/* Back Button */}
      <div className="w-full mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>
      </div>

      {/* Main Content Grid */}
      {/* FIX 2: Added 'items-center' to vertically center text with image */}
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* LEFT: Main Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT: Details */}
        <div className="flex flex-col gap-6">
          <div>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 px-3 py-1 text-sm">
              {project.category}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
          </div>

          <p className="text-muted-foreground leading-relaxed text-lg">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-muted rounded-full text-sm font-medium border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Links */}
          <div className="flex flex-wrap gap-4 mt-6">
            {/* Live Demo - Render only when a URL exists */}
            {project.liveUrl && (
              <Button
                asChild
                size="lg"
                className="gap-2 bg-primary hover:bg-orange-600 text-white shadow-lg shadow-primary/20"
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live demo in a new tab`}
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}

            {/* GitHub - Render only when a URL exists */}
            {project.githubUrl && (
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} GitHub repository in a new tab`}
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Key Insights Section - Render only when insights are available */}
      {project.keyInsights && project.keyInsights.length > 0 && (
        <section className="mt-24 w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">
              Key Insights
            </h2>

            <p className="mt-3 text-muted-foreground">
              A closer look at the architecture, technical decisions, and
              important features behind this project.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {project.keyInsights.map((insight, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg"
              >
                {/* Insight Number */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-lg font-bold text-foreground">
                    {insight.title}
                  </h3>
                </div>

                {/* Insight Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {insight.description}
                </p>

                {/* Optional Technical Details */}
                {insight.details && insight.details.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {insight.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {project.gallery && (
        <div className="mt-24 w-full">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4">
            Project Gallery
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((img, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted shadow-sm group"
              >
                <Image
                  src={img}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
