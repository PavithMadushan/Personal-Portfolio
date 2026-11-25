"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Import hook
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Import cn utility

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Me", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "/education" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const pathname = usePathname(); // 2. Get current URL path
  const isHomePage = pathname === "/"; // 3. Check if we are on home

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          My<span className="text-primary">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            // 4. Logic: If not on home, prepend '/' to the hash link
            // Example: "#about" becomes "/#about"
            const href = isHomePage ? link.href : `/${link.href}`;
            
            return (
              <Link
                key={link.name}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  // Optional: styling for active link could go here
                  "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
            asChild 
            className="hidden md:flex bg-primary text-white hover:bg-orange-600"
          >
            <a 
              href="/cv" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
