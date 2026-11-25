"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";

// Animation variants to reuse (Clean Code)
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// 1. Create an array of objects linking the Icon to your personal URL
const socialLinks = [
    {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/pavith-rajapaksha-275b671b2/", // Replace with your link
  },
  {
    name: "Github",
    icon: Github,
    url: "https://github.com/PavithMadushan", // Replace with your link
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://web.facebook.com/pavith.madushan.1/", // Replace with your link
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/pavithmadushan/?hl=en", // Replace with your link
  },
  
];

export function Hero() {
  return (
    <section id="home" className="container flex min-h-[calc(100vh-4rem)] flex-col-reverse items-center justify-center gap-12 py-12 md:flex-row md:justify-between lg:py-20">
      
      {/* LEFT SIDE: Text Content */}
      <motion.div 
        className="flex flex-1 flex-col items-center text-center md:items-start md:text-left"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.span variants={fadeInUp} className="text-lg font-semibold text-primary">
          Hi I am ,
        </motion.span>
        
        <motion.h1 variants={fadeInUp} className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Pavith Rajapaksha
        </motion.h1>
        
        <motion.h2 variants={fadeInUp} className="mt-2 text-3xl font-extrabold text-foreground sm:text-5xl md:text-7xl">
          Software
        </motion.h2>
        
        <motion.h2 variants={fadeInUp} className="ml-0 text-3xl font-extrabold text-foreground sm:text-5xl md:ml-20 md:text-7xl">
          Engineer
        </motion.h2>

        <motion.p variants={fadeInUp} className="mt-6 max-w-lg text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa purus quis ipsum tellus. In aliquam sem at risus.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-8 flex gap-4">
          <Button size="lg" className="bg-primary hover:bg-orange-600">
            Hire Me
          </Button>
          <Button size="lg" variant="outline">
            Contact
          </Button>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE: Image & Socials */}
      <motion.div 
        className="flex flex-1 flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96">
          {/* Replace this src with your actual image path later */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 bg-muted overflow-hidden">
             {/* Placeholder for your photo */}
             <Image 
               src="/hero-placeholder.jpg" 
               alt="Pavith Rajapaksha" 
               fill 
               className="object-cover"
               priority
             />
          </div>
          
          {/* Decorative Circle behind (optional) */}
          <div className="absolute -inset-4 -z-10 rounded-full border border-border" />
        </div>

        {/* Social Icons */}
        <div className="mt-8 flex gap-6">
         {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}               // 3. Attach the specific URL
              target="_blank"                 // 4. Open in new tab (best practice)
              rel="noopener noreferrer"       // 5. Security for new tabs
              whileHover={{ scale: 1.1, color: "var(--primary)" }}
              className="text-muted-foreground transition-colors"
            >
              <social.icon className="h-6 w-6" /> {/* Render the icon component */}
            </motion.a>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
