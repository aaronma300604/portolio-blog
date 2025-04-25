"use client";

import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "./Icons";

export default function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDarkMode);

    if (prefersDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 text-[var(--navbar-options-text)] rounded transition-colors duration-200 hover:bg-[var(--navbar-options-hover)]"
    >
      {isDarkMode ? SunIcon : MoonIcon}
    </button>
  );
}