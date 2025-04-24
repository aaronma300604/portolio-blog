"use client";
import { useEffect, useState } from "react";

export default function ZoomBlurBackground({ imageUrl, children }) {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className="fixed top-0 left-0 w-full h-full -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: `${100 + scroll / 10}%`,
          backgroundPosition: "center", 
          filter: `blur(${scroll / 100}px)`,
          opacity: 1 - scroll / 1000,
          transition: "background-size 0.2s, filter 0.2s, opacity 0.2s",
          position: "fixed",
          zIndex: -10,
        }}
      />
      <main>{children}</main>
    </div>
  );
}
