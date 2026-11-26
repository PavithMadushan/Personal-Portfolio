"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Copy,
  Check,
} from "lucide-react";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error feedback

  // YOUR FORMSPREE ID HERE
  // Replace this URL with the one you got from step 1
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbdlnezr";

  const EMAIL_ADDRESS = "pavithmadushan@gmail.com";

  const [isCopied, setIsCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);

      setIsCopied(true);

      // Reset the button after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy email address:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Stop page reload
    setIsSubmitting(true);
    setErrorMessage(""); // Clear old errors

    // 1. Collect Form Data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // DEBUG: Log what we are sending
    console.log("Attempting to send data:", data);

    try {
      // 2. Send Real Request
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // DEBUG: Log the server response
      console.log("Server Response Status:", response.status);

      if (response.ok) {
        setIsSuccess(true);
        // Clear form (optional)
        (e.target as HTMLFormElement).reset();

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        // If server returns 400/500 error
        const errorData = await response.json();
        console.error("Formspree Error:", errorData);
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      // If network fails completely (e.g., adblocker, offline)
      console.error("Network Error:", error);
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="container py-20 lg:py-32">
      <div className="mx-auto max-w-4xl rounded-3xl bg-muted/30 px-6 py-12 md:px-12 md:py-20 dark:bg-card/30">
        {/* ... Title and Description (Same as before) ... */}
        <div className="flex flex-col items-center text-center">
          {/* ... (Keep your motion.h2 and motion.p here) ... */}
          <h2 className="text-3xl font-bold">Let's Develop Together</h2>

          <p className="mt-6 mb-6 max-w-lg text-muted-foreground">
            Turn your ideas into reality!
          </p>

          {/* Direct Email Contact */}
          <div className="mb-10 flex w-full max-w-md items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/70 p-4 shadow-sm transition-all hover:border-primary/40">
            {/* Email Address */}
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="group flex min-w-0 items-center gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Mail className="h-5 w-5" />
              </div>

              <div className="min-w-0 text-left">
                <p className="text-xs text-muted-foreground">Prefer email?</p>

                <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                  {EMAIL_ADDRESS}
                </p>
              </div>
            </a>

            {/* Copy Email Button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={isCopied ? "Email copied" : "Copy email address"}
              title={isCopied ? "Copied!" : "Copy email address"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>

          <p className="mb-6 text-sm text-muted-foreground">
            Or send me a message using the form below.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-4 text-left" // Added text-left for error msg
          >
            <div className="relative">
              <Input
                name="name" // IMPORTANT: Formspree needs 'name' attributes
                type="text"
                placeholder="Your Name"
                required
                className="h-12 bg-background/50 backdrop-blur"
              />
            </div>

            <div className="relative">
              <Input
                name="email" // IMPORTANT
                type="email"
                placeholder="Your Email"
                required
                className="h-12 bg-background/50 backdrop-blur"
              />
            </div>

            <div className="relative">
              <Textarea
                name="message" // IMPORTANT
                placeholder="Your Message"
                required
                className="min-h-[120px] resize-none bg-background/50 backdrop-blur"
              />
            </div>

            {/* Error Message Display */}
            {errorMessage && (
              <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 p-3 rounded-md">
                <AlertCircle className="h-4 w-4" />
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full h-12"
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? (
                "Sending..."
              ) : isSuccess ? (
                <span className="flex items-center gap-2 text-green-500 font-bold">
                  <CheckCircle2 className="h-5 w-5" /> Message Sent!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Contact Me <Send className="h-4 w-4" />
                </span>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
