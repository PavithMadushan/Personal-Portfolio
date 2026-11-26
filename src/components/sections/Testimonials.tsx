"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

// 1. Data
const testimonials = [
  {
    name: "Lalindu Wenasara",
    role: "Software Engineer at Axiata Digital Labs",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop",
    text: "Lorem ipsum dolor sit amet consectetur. In enim cursus odio accumsan. Id leo urna velit neque mattis id tellus arcu condimentum. Augue dictum dolor elementum.",
  },
  {
    name: "Savindu Ilangakoon",
    role: "Analyst at CUBE Global LTD",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
    text: "I had the opportunity to work with Pavith at CUBE Global, and he was a great teammate. He is highly collaborative, dependable, and always approaches challenges with a positive attitude and strong analytical thinking. His excellent communication skills, willingness to help others, and commitment to delivering quality work made him a valuable member of the team. Alongside his solid technical skills in .NET, C#, Azure, and web technologies, he consistently demonstrated professionalism and a strong eagerness to learn. I highly recommend him for any software engineering role.",
  },
  {
    name: "Michael Brown",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
    text: "Great attention to detail and clean code. It was a pleasure working with him on the backend integration. A true professional.",
  },
  {
    name: "Binuri Lokubarana",
    role: "Former LCVP in AIESEC Colombo North",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
    text: "Pavith showcased exemplary leadership as the Team Leader and as a member of the Leadership Body.  His expertise is in Business-to-Business relations and Business-to-Customer relations having handled both sides of the line. Being highly engaging and developing his communication skills throughout the journey, he also empowered the members who worked with him by giving them the guidance needed to expand. Having had the opportunity to work with Pavith on multiple occasions, he goes above and beyond to ensure that his responsibilities are met. Working with Pavith had been a compelling experience and a learning for me as well..",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="container py-20 lg:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Testimonials
        </h2>
        <p className="mt-4 text-muted-foreground">
          The greatest wealth I’ve gathered throughout my journey is the trust,
          appreciation, and meaningful connections reflected in the words of
          those I’ve worked with.
        </p>
      </div>

      {/* 2. The Infinite Slider Container */}
      {/* "mask-image" creates a fade effect on the left and right edges so cards don't just disappear abruptly */}
      <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        <motion.div
          className="flex w-max gap-8"
          // We animate the 'x' (horizontal) position
          animate={{ x: "-50%" }}
          transition={{
            duration: 20, // Speed: 20 seconds for one full loop
            ease: "linear", // Constant speed, no easing (start/stop)
            repeat: Infinity, // Loop forever
          }}
        >
          {/* We render the list TWICE to create the seamless loop illusion */}
          {[...testimonials, ...testimonials].map((item, index) => (
            <div key={index} className="w-[300px] md:w-[400px] flex-shrink-0">
              <Card className="h-full border-none bg-muted/50 dark:bg-card/40">
                <CardContent className="flex flex-col gap-6 p-8">
                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 rotate-180 text-primary/40" />

                  <p className="flex-1 text-muted-foreground leading-relaxed italic">
                    "{item.text}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {item.name}
                      </h4>
                      <p className="text-sm text-primary">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Optional: Static Dots for visual cue (Purely decorative in auto-scroll) */}
      <div className="mt-8 flex justify-center gap-2">
        <div className="h-2 w-8 rounded-full bg-primary" />
        <div className="h-2 w-2 rounded-full bg-border" />
        <div className="h-2 w-2 rounded-full bg-border" />
        <div className="h-2 w-2 rounded-full bg-border" />
      </div>
    </section>
  );
}
