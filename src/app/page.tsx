import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      {/* We will add About, Services, etc. here later */}
       <About />
       <Services />
       <Experience />
       <Projects />
        <Testimonials />
         <Contact />
    </main>
  );
}
