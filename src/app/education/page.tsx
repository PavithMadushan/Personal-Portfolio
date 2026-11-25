import { Certifications } from "@/components/sections/Certifications";
import { EducationTimeline } from "@/components/sections/EducationTimeline";

export const metadata = {
  title: "Education | Fawzi Sayed",
  description: "My academic journey and qualifications.",
};

export default function EducationPage() {
  return (
    <main className="container min-h-screen py-20 lg:py-32">
      {/* Page Header */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          My <span className="text-primary">Education</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          My academic background and the milestones that paved the way for my career in Software Engineering.
        </p>
      </div>

      {/* The Timeline */}
      <div className="mb-32">
        <EducationTimeline />
      </div>

      {/* The Certifications Slider */}
      <div className="bg-muted/30 w-full">
         <Certifications />
      </div>
      
    </main>
  );
}
