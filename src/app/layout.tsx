import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";
import { Navbar } from "@/components/shared/Navbar";
import { MovingShapes } from "@/components/ui/moving-shapes";

// 1. Define the Font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

// 2. Define Metadata
export const metadata: Metadata = {
  title: "Pavith | Full Stack Developer",
  description: "Portfolio of Pavith, Full Stack Developer.",
};

// 3. Root Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AppProviders>
          {/* <MovingShapes /> */}
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
