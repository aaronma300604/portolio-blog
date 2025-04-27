import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Link from "next/link";
import ThemeSwitch from "../components/ThemeSwitch"; 
import { GitHubIcon,LinkedInIcon } from "../components/Icons";
import ProgressScrollBar from "@/components/ProgressScrollBar";
import ParticlesBackground from "@/components/ParticleBackground";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import FloatingButtons from "@/components/FloatingButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: " Roth",
  description: "My personal portfolio that I also use as a blog to talk about tech, specially Machine Learning.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"
    className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <ParticlesBackground />
        <NavBar />
        <ProgressScrollBar />
        <main className="pt-20 flex-1 md:flex-grow">{children}</main>
        <FloatingButtons />
        <Footer />
      </body>
    </html>
  );
}