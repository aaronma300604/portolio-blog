import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Link from "next/link";
import ThemeSwitch from "../components/ThemeSwitch"; // Import the ThemeSwitch component

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* NavBar */}
        <nav className="fixed top-0 left-0 right-0 w-[60%] h-20 mx-auto z-10 bg-transparent text-[var(--navbar-options-text)] py-4 px-8 flex items-center justify-between">
          <ul className="flex space-x-2">
            <li className="group px-4 py-2 rounded transition-colors duration-200 hover:bg-[var(--navbar-options-hover)]">
              <Link href="/" className="block w-full h-full">
                About me
              </Link>
            </li>
            <li className="group px-4 py-2 rounded transition-colors duration-200 hover:bg-[var(--navbar-options-hover)]">
              <Link href="/blog/CART" className="block w-full h-full">
                Blog
              </Link>
            </li>
            <li className="group px-4 py-2 rounded transition-colors duration-200 hover:bg-[var(--navbar-options-hover)]">
              <a href="/projects" className="block w-full h-full">
                Projects
              </a>
            </li>
          </ul>
          {/* Theme Switch */}
          <ThemeSwitch />
        </nav>
        {/* Main Content */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}